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
  const { data: disponibilidadesData, loading: loadingDisponibilidades } = useQuery(GET_DISPONIBILIDADES);
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
  const [disponibilidade, setDisponibilidade] = useState({
    colaboradorId: "",
    dias: [[], [], [], [], [], [], []],
  });
  const [disponibilidadesState, setDisponibilidades] = useState<Disponibilidade[]>([]);
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
      colaboradorId: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novasDisponibilidades = [];

    disponibilidade.dias.forEach((horarios, diaIdx) => {
      horarios.forEach((horario: any) => {
        if (horario.hora_inicio && horario.hora_fim) {
          novasDisponibilidades.push({
            id_colaborador: disponibilidade.colaboradorId,
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

    const diaIdx = disponibilidade.dias.findIndex(d => d.length > 0);
    const horario = disponibilidade.dias[diaIdx][0];

    await updateDisponibilidade({
      variables: {
        updateDisponibilidadeInput: {
          id: disponibilidadeEditando.id,
          id_colaborador: Number(disponibilidade.colaboradorId),
          dia_da_semana: diaIdx,
          hora_inicio: `1970-01-01T${horario.hora_inicio.length === 5 ? horario.hora_inicio + ':00' : horario.hora_inicio}.000Z`,
          hora_fim: `1970-01-01T${horario.hora_fim.length === 5 ? horario.hora_fim + ':00' : horario.hora_fim}.000Z`,
        }
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
                onAddHorario={(diaIdx) => {}}
                onChangeHorario={(diaIdx, hIdx, campo, valor) => {}}
                onRemoveHorario={(diaIdx, hIdx) => {}}
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
              {/* Tabela de Disponibilidades */}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}