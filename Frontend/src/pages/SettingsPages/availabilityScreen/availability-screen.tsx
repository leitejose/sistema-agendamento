import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DisponibilidadeForm } from "./availability-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_DISPONIBILIDADE, UPDATE_DISPONIBILIDADE, DELETE_DISPONIBILIDADE } from "@/graphql/mutations";
import { GET_COLABORADORES, GET_DISPONIBILIDADES } from "@/graphql/queries";
import CreateMarkingsDialog from "@/pages/MarkingsScreen/create-markings-dialog";
import { DisponibilidadeTable } from "./availability-table";

const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

interface Disponibilidade {
  id: number;
  id_colaborador: number;
  dia_da_semana: number;
  hora_inicio: string;
  hora_fim: string;
}

export default function DisponibilidadeScreen() {
  const { data: colaboradoresData, loading: loadingColaboradores } = useQuery(GET_COLABORADORES);
  const colaboradores = colaboradoresData?.colaboradores ?? [];
  const { data: disponibilidadesData } = useQuery(GET_DISPONIBILIDADES);
  const disponibilidades = disponibilidadesData?.disponibilidades ?? [];
  const [createDisponibilidade] = useMutation(CREATE_DISPONIBILIDADE, {
    refetchQueries: [{ query: GET_DISPONIBILIDADES }],
  });
  const [updateDisponibilidade] = useMutation(UPDATE_DISPONIBILIDADE, {
    refetchQueries: [{ query: GET_DISPONIBILIDADES }],
  });
  const [deleteDisponibilidade] = useMutation(DELETE_DISPONIBILIDADE, {
    refetchQueries: [{ query: GET_DISPONIBILIDADES }],
  });

  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar o diálogo
  const [disponibilidade, setDisponibilidade] = useState<{
    colaboradorId: string;
    dias: Array<Array<{ hora_inicio: string; hora_fim: string }>>;
  }>({
    colaboradorId: "",
    dias: [[], [], [], [], [], [], []],
  });
  const [disponibilidadeEditando, setDisponibilidadeEditando] = useState<Disponibilidade | null>(null);

  // Só inicializa quando colaboradores carregarem
  useEffect(() => {
    if (colaboradores.length > 0 && !disponibilidade.colaboradorId) {
      setDisponibilidade((prev) => ({
        ...prev,
        colaboradorId: colaboradores[0].id,
      }));
    }
  }, [colaboradores]);

  const handleColaboradorChange = (value: string) => {
    setDisponibilidade((prev) => ({
      ...prev,
      colaboradorId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novasDisponibilidades: Disponibilidade[] = [];

    disponibilidade.dias.forEach((horarios, diaIdx) => {
      horarios.forEach((horario: any) => {
        if (horario.hora_inicio && horario.hora_fim) {
          // Adicionar propriedade `id` ao criar novos objetos de disponibilidade
          novasDisponibilidades.push({
            id: 0, // Valor padrão para novos registros
            id_colaborador: Number(disponibilidade.colaboradorId),
            dia_da_semana: diaIdx,
            hora_inicio: `1970-01-01T${horario.hora_inicio.length === 5 ? horario.hora_inicio + ':00' : horario.hora_inicio}.000Z`,
            hora_fim: `1970-01-01T${horario.hora_fim.length === 5 ? horario.hora_fim + ':00' : horario.hora_fim}.000Z`,
          });
        }
      });
    });

    if (novasDisponibilidades.length > 0) {
      await createDisponibilidade({ variables: { data: novasDisponibilidades } });
    }

    setDisponibilidade({
      colaboradorId: colaboradores[0]?.id ?? "",
      dias: [[], [], [], [], [], [], []],
    });
  };

  const handleCancelEdit = () => {
    setDisponibilidadeEditando(null);
    setDisponibilidade({
      colaboradorId: colaboradores[0]?.id ?? "",
      dias: [[], [], [], [], [], [], []],
    });
  };

  const handleUpdateDisponibilidade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disponibilidadeEditando) return;

    const diaIdx = disponibilidade.dias.findIndex((d) => d.length > 0);
    const horario = disponibilidade.dias[diaIdx][0] as { hora_inicio: string; hora_fim: string };

    await updateDisponibilidade({
      variables: {
        updateDisponibilidadeInput: {
          id: disponibilidadeEditando.id,
          id_colaborador: Number(disponibilidade.colaboradorId),
          dia_da_semana: diaIdx,
          hora_inicio: `1970-01-01T${horario.hora_inicio.length === 5 ? horario.hora_inicio + ':00' : horario.hora_inicio}.000Z`,
          hora_fim: `1970-01-01T${horario.hora_fim.length === 5 ? horario.hora_fim + ':00' : horario.hora_fim}.000Z`,
        },
      },
    });

    handleCancelEdit();
  };

  const handleDeleteDisponibilidade = async (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir esta disponibilidade?");
    if (!confirmed) return;
    await deleteDisponibilidade({
      variables: { id },
    });
  };

  // Implementar lógica para adicionar horário
  const handleAddHorario = (diaIdx: number) => {
    setDisponibilidade((prev) => {
      const novosDias = [...prev.dias];
      novosDias[diaIdx].push({ hora_inicio: "", hora_fim: "" });
      return { ...prev, dias: novosDias };
    });
  };

  const handleChangeHorario = (
    diaIdx: number,
    hIdx: number,
    campo: string,
    valor: string
  ) => {
    console.log(`Changing horario for diaIdx: ${diaIdx}, hIdx: ${hIdx}, campo: ${campo}, valor: ${valor}`);
  };

  // Implementar lógica para remover horário
  const handleRemoveHorario = (diaIdx: number, hIdx: number) => {
    setDisponibilidade((prev) => {
      const novosDias = [...prev.dias];
      novosDias[diaIdx] = novosDias[diaIdx].filter((_, index) => index !== hIdx);
      return { ...prev, dias: novosDias };
    });
  };

  if (loadingColaboradores) return <div>Carregando colaboradores...</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header onNovaMarcacao={() => setOpenDialog(true)} /> {/* Botão Nova Marcação */}
        <CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} /> {/* Diálogo de Nova Marcação */}
        <main className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Disponibilidade de Colaboradores</CardTitle>
            </CardHeader>
            <CardContent>
              <DisponibilidadeForm
                disponibilidade={disponibilidade}
                colaboradores={colaboradores}
                diasSemana={diasSemana}
                onColaboradorChange={handleColaboradorChange}
                onSubmit={disponibilidadeEditando ? handleUpdateDisponibilidade : handleSubmit}
                onAddHorario={handleAddHorario}
                onChangeHorario={handleChangeHorario}
                onRemoveHorario={handleRemoveHorario}
                className="mt-8"
                disponibilidadeEditando={disponibilidadeEditando}
                onCancelEdit={handleCancelEdit}
              />
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Lista de Disponibilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <DisponibilidadeTable
                disponibilidades={disponibilidades}
                colaboradores={colaboradores}
                diasSemana={diasSemana}
                onEdit={(disp: Disponibilidade) => {
                  setDisponibilidadeEditando(disp);
                  setDisponibilidade({
                    colaboradorId: String(disp.id_colaborador),
                    dias: [[{ hora_inicio: disp.hora_inicio.slice(11, 16), hora_fim: disp.hora_fim.slice(11, 16) }]],
                  });
                }}
                onDelete={handleDeleteDisponibilidade}
              />
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}