import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DisponibilidadeForm } from "./availability-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DisponibilidadeTable } from "./availability-table";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_DISPONIBILIDADE } from "@/graphql/mutations";
import { GET_COLABORADORES, GET_DISPONIBILIDADES } from "@/graphql/queries";

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

  // Só inicializa quando colaboradores carregarem
  const [disponibilidade, setDisponibilidade] = useState({
    colaboradorId: "",
    dias: [[], [], [], [], [], [], []],
  });
  const [disponibilidadesState, setDisponibilidades] = useState<Disponibilidade[]>([]);

  // Atualiza colaboradorId inicial quando colaboradores carregarem
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

  const onAddHorario = (diaIdx: number) => {
    setDisponibilidade(prev => {
      const novo = { ...prev };
      novo.dias = novo.dias.map((d, i) =>
        i === diaIdx ? [...(d || []), { hora_inicio: "", hora_fim: "" }] : d || []
      );
      return novo;
    });
  };

  const onChangeHorario = (diaIdx: number, hIdx: number, campo: string, valor: string) => {
    setDisponibilidade(prev => {
      const novo = { ...prev };
      novo.dias = novo.dias.map((d, i) =>
        i === diaIdx
          ? d.map((h: any, j: number) =>
              j === hIdx ? { ...h, [campo]: valor } : h
            )
          : d
      );
      return novo;
    });
  };

  const onRemoveHorario = (diaIdx: number, hIdx: number) => {
    setDisponibilidade(prev => {
      const novo = { ...prev };
      novo.dias = novo.dias.map((d, i) =>
        i === diaIdx ? d.filter((_, j: number) => j !== hIdx) : d
      );
      return novo;
    });
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
          hora_inicio: `1970-01-01T${horario.hora_inicio.length === 5 ? horario.hora_inicio + ':00' : horario.hora_inicio}.000Z`, // <- 👈 adiciona os segundos
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


  if (loadingColaboradores) return <div>Carregando colaboradores...</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
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
                onSubmit={handleSubmit}
                onAddHorario={onAddHorario}
                onChangeHorario={onChangeHorario}
                onRemoveHorario={onRemoveHorario}
                className="mt-8"
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
              />
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}