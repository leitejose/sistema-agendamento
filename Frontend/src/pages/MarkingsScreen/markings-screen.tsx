import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_AGENDAMENTO, UPDATE_AGENDAMENTO } from '@/graphql/mutations';
import { GET_AGENDAMENTOS, GET_UTENTES, GET_COLABORADORES, GET_SERVICOS, GET_STATUS } from '@/graphql/queries';
import { AppSidebar } from "@/pages/MarkingsScreen/app-sidebar-markings-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import EditMarkingsDialog from "@/pages/MarkingsScreen/edit-marking-dialog";
import { z } from "zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import React from "react";

const agendamentoSchema = z.object({
  id_utente: z.string().nonempty("O ID do utente é obrigatório."),
  id_colaborador: z.string().nonempty("O ID do colaborador é obrigatório."),
  id_servicos: z.string().nonempty("O ID do serviço é obrigatório."),
  data_agendamento: z.string().nonempty("A data do agendamento é obrigatória."),
  hora_inicio: z.string().nonempty("A hora de início é obrigatória."),
  hora_fim: z.string().optional(),
  status: z.string().nonempty("O status é obrigatório."),
  observacoes: z.string().optional(),
});

export default function Page() {
  const { loading, error, data } = useQuery(GET_AGENDAMENTOS);
  const { loading: loadingUtentes, data: utentesData } = useQuery(GET_UTENTES);
  const { loading: loadingColaboradores, data: colaboradoresData } = useQuery(GET_COLABORADORES);
  const { loading: loadingServicos, data: servicosData } = useQuery(GET_SERVICOS);
  const { loading: statusLoading, data: statusData } = useQuery(GET_STATUS);
  const [dataList, setData] = useState<any[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAgendamento, setCurrentAgendamento] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatusIds, setSelectedStatusIds] = React.useState<number[]>([]);
  const [selectedColaboradores, setSelectedColaboradores] = React.useState<number[]>([]);

  const [removeAgendamento] = useMutation(REMOVE_AGENDAMENTO, {
    onCompleted: (data) => {
      setData((prevData) => prevData.filter((agendamento) => agendamento.id !== data.removeAgendamento.id));
    },
    onError: (error) => {
      console.error("Erro ao excluir agendamento:", error);
    },
  });

  const [updateAgendamento] = useMutation(UPDATE_AGENDAMENTO, {
    onCompleted: (data) => {
      const updated = data?.updateAgendamento;
      if (updated) {
        setData((prev) =>
          prev.map((item) =>
            item.id === updated.id
              ? { ...item, ...updated }
              : item
          )
        );
      }
    },
    onError: (error) => {
      console.error("Erro ao atualizar agendamento:", error);
    },
  });

  useEffect(() => {
    if (data?.getAgendamentos) {
      setData(data.getAgendamentos);
    }
  }, [data]);

  if (loading || loadingUtentes || loadingColaboradores || loadingServicos) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (agendamento: any) => {
    setCurrentAgendamento(null);
    setIsEditDialogOpen(false);

    setTimeout(() => {
      setCurrentAgendamento(agendamento);
      setIsEditDialogOpen(true);
    }
    , 0);
  };

  const handleDelete = async (agendamentoId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este agendamento?");
    if (confirmed) {
      try {
        await removeAgendamento({ variables: { id: agendamentoId } });
        console.log("Agendamento excluído com sucesso.");
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        alert("Erro ao excluir agendamento. Verifique os logs para mais detalhes.");
      }
    }
  };

  const columns = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "id_utente",
      header: "Utente",
      cell: (info) => {
        const utente = utentesData?.utentes?.find((u) => u.id === info.getValue());
        return utente?.nome ?? "-";
      },
    },
    {
      accessorKey: "id_colaborador",
      header: "Colaborador",
      cell: (info) => {
        const colaborador = colaboradoresData?.colaboradores?.find((c) => c.id === info.getValue());
        return colaborador ? colaborador.descricao : "-";
      },
    },
    {
      accessorKey: "id_servicos",
      header: "Serviço",
      cell: (info) => {
        const servico = servicosData?.servicos?.find((s) => s.id === info.getValue());
        return servico ? servico.descricao : "-";
      },
    },
    { accessorKey: "data_agendamento", header: "Data", cell: (info) => new Date(info.getValue()).toLocaleDateString() },
    { 
      accessorKey: "hora_inicio", 
      header: "Hora Início",
      cell: (info) => {
        const value = info.getValue();
        return typeof value === "string" && value.includes("T")
          ? value.split("T")[1].slice(0, 5)
          : value;
      }
    },
    { accessorKey: "hora_fim", header: "Hora Fim", cell: (info) => extractTime(info.getValue()) },
    { 
      accessorKey: "statusId", 
      header: "Status",
      cell: (info) => {
        const agendamento = info.row.original;
        return (
          <Select
            value={String(agendamento.statusId)}
            onValueChange={async (value) => {
              const novoStatusId = Number(value);
              try {
                const result = await updateAgendamento({
                  variables: {
                    updateAgendamentoInput: {
                      id: agendamento.id,
                      data_agendamento: agendamento.data_agendamento,
                      hora_inicio: agendamento.hora_inicio,
                      hora_fim: agendamento.hora_fim,
                      observacoes: agendamento.observacoes,
                      utenteId: Number(agendamento.id_utente),
                      colaboradorId: Number(agendamento.id_colaborador),
                      servicoId: Number(agendamento.id_servicos),
                      statusId: novoStatusId,
                    }
                  }
                });
                const updated = result.data?.updateAgendamento;
                if (updated) {
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === updated.id
                        ? { ...item, ...updated }
                        : item
                    )
                  );
                }
              } catch (err) {
                alert("Erro ao atualizar status!");
              }
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {statusLoading ? (
                <SelectItem value="" disabled>Carregando...</SelectItem>
              ) : (
                statusData?.statusAgendamentos
                  ?.filter((status: any) => status.id !== undefined && status.id !== null && status.id !== "")
                  .map((status: any) => (
                    <SelectItem key={status.id} value={String(status.id)}>
                      <span
                        style={{
                          backgroundColor: status.cor,
                          color: "#fff", // ou escolha uma cor de texto que contraste com o fundo
                          fontWeight: "bold",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          display: "inline-block"
                        }}
                      >
                        {status.descricao}
                      </span>
                    </SelectItem>
                  ))
              )}
            </SelectContent>  
          </Select>
        );
      }
    },
    { accessorKey: "observacoes", header: "Observações" },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-500 hover:underline"
            aria-label="Editar agendamento"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:underline"
            aria-label="Excluir agendamento"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  function extractDate(dateStr: string) {
    if (!dateStr) return "";
    if (dateStr.includes("T")) return dateStr.split("T")[0];
    return dateStr;
  }

  function extractTime(timeStr: string) {
    if (!timeStr) return "";
    if (timeStr.includes("T")) return timeStr.split("T")[1].slice(0, 5);
    if (timeStr.length === 5) return timeStr;
    return timeStr.slice(0, 5);
  }

  const filteredData = dataList.filter((item) => {
    // Filtro por busca
    const utente = utentesData?.utentes?.find((u) => u.id === item.id_utente);
    const nomeUtente = utente?.nome?.toLowerCase() || "";
    const observacoes = item.observacoes?.toLowerCase() || "";
    const matchesSearch =
      nomeUtente.includes(searchText.toLowerCase()) ||
      observacoes.includes(searchText.toLowerCase());

    // Filtro por data
    let matchesDate = true;
    if (selectedDate) {
      const itemDate = new Date(item.data_agendamento);
      matchesDate =
        itemDate.toDateString() === selectedDate.toDateString();
    }

    const matchesStatus =
      selectedStatusIds.length === 0 || selectedStatusIds.includes(Number(item.statusId));
    const matchesColaborador =
      selectedColaboradores.length === 0 || selectedColaboradores.includes(Number(item.id_colaborador));
    return matchesSearch && matchesDate && matchesStatus && matchesColaborador;
  });

  return (
    <SidebarProvider>
     <AppSidebar
  setData={setData}
  setSearchText={setSearchText}
  dataList={dataList}
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  selectedStatusIds={selectedStatusIds}
  setSelectedStatusIds={setSelectedStatusIds}
  loadingColaboradores={loadingColaboradores}
  colaboradoresData={colaboradoresData}
  selectedColaboradores={selectedColaboradores}
  setSelectedColaboradores={setSelectedColaboradores}
/>

      <SidebarInset>
        <Header />
        <main className="p-4">
          <h1 className="text-lg font-bold mb-4">Agendamentos</h1>
          <DataTable columns={columns} data={filteredData} />
        </main>
      </SidebarInset>
      <EditMarkingsDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setCurrentAgendamento(null);
        }}
        agendamento={currentAgendamento}
        onSave={(updatedAgendamento) => {
          const data_agendamento = extractDate(updatedAgendamento.data_agendamento);
          const hora_inicio = extractTime(updatedAgendamento.hora_inicio);
          const hora_fim = extractTime(updatedAgendamento.hora_fim);

          // Valida campos obrigatórios
          const colaboradorId = Number(updatedAgendamento.id_colaborador);
          const servicoId = Number(updatedAgendamento.id_servicos);


          const input = {
            id: updatedAgendamento.id,
            data_agendamento,
            hora_inicio,
            hora_fim,
            observacoes: updatedAgendamento.observacoes,
            utenteId: Number(updatedAgendamento.id_utente),
            colaboradorId,
            servicoId,
            statusId: Number(updatedAgendamento.statusId),
          };

          updateAgendamento({
            variables: {
              updateAgendamentoInput: input
            }
          });

          setIsEditDialogOpen(false);
          setCurrentAgendamento(null);
        }}
      />
    </SidebarProvider>
  );
}
