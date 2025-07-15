import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_AGENDAMENTO, UPDATE_AGENDAMENTO } from '@/graphql/mutations';
import { GET_AGENDAMENTOS, GET_UTENTES, GET_COLABORADORES, GET_SERVICOS, GET_STATUS } from '@/graphql/queries';
import { AppSidebar } from "@/pages/MarkingsScreen/app-sidebar-markings-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import EditMarkingsDialog from "@/pages/MarkingsScreen/edit-marking-dialog";
import CreateMarkingsDialog from "@/pages/MarkingsScreen/create-markings-dialog";
import { z } from "zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import React from "react";
import { SearchForm } from './markings-search-form';
import { parseISO } from "date-fns";
import { PdfFilterDialog } from "./PdfFilterDialog";
import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";
import { ConfirmDialog } from "@/components/alert-dialog-remove";




const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const currentYear = new Date().getFullYear();

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

// Função utilitária para agrupar por data
function groupByDate(data) {
  return data.reduce((acc, item) => {
    const date = new Date(item.data_agendamento).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
}

export default function Page() {
  const [previousStatusId, setPreviousStatusId] = useState<number | null>(null); // Estado para armazenar o status anterior
  const { loading, error, data } = useQuery(GET_AGENDAMENTOS);
  const { loading: loadingUtentes, data: utentesData } = useQuery(GET_UTENTES);
  const { loading: loadingColaboradores, data: colaboradoresData } = useQuery(GET_COLABORADORES);
  const { loading: loadingServicos, data: servicosData } = useQuery(GET_SERVICOS);
  const { loading: statusLoading, data: statusData } = useQuery(GET_STATUS);
  const [dataList, setDataList] = useState<any[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAgendamento, setCurrentAgendamento] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedStatusIds, setSelectedStatusIds] = React.useState<number[]>([]);
  const [selectedColaboradores, setSelectedColaboradores] = React.useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterType, setFilterType] = useState<"mes" | "todos">("mes");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);
  const [pdfFiltros, setPdfFiltros] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<any>(null);

  const [removeAgendamento] = useMutation(REMOVE_AGENDAMENTO, {
    onCompleted: (data) => {
      setDataList((prevData) => prevData.filter((agendamento) => agendamento.id !== data.removeAgendamento.id));
    },
    onError: (error) => {
      console.error("Erro ao excluir agendamento:", error);
    },
  });

  const [updateAgendamento] = useMutation(UPDATE_AGENDAMENTO, {
    onCompleted: (data) => {
      const updated = data?.updateAgendamento;
      if (updated) {
        setDataList((prev) =>
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
      setDataList(data.getAgendamentos);
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
            onValueChange={(value) => {
              const novoStatusId = Number(value);
              const STATUS_CANCELADO = 3; // ID do status "Cancelado"

              if (novoStatusId === STATUS_CANCELADO) {
                // Armazena o status anterior
                setPreviousStatusId(agendamento.statusId);

                // Define o agendamento para cancelar
                setAgendamentoParaCancelar({
                  ...agendamento,
                  statusId: STATUS_CANCELADO,
                });
              } else {
                // Atualiza o status normalmente
                updateAgendamento({
                  variables: {
                    updateAgendamentoInput: {
                      id: agendamento.id,
                      data_agendamento: agendamento.data_agendamento,
                      hora_inicio: agendamento.hora_inicio,
                      hora_fim: agendamento.hora_fim,
                      observacoes: agendamento.observacoes,
                      utenteId: agendamento.id_utente,
                      colaboradorId: agendamento.id_colaborador,
                      servicoId: agendamento.id_servicos,
                      statusId: novoStatusId,
                    },
                  },
                });
              }
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {statusLoading ? (
                <div className="px-2 py-1 text-muted-foreground">Carregando...</div>
              ) : (
                statusData?.statusAgendamentos
                  ?.filter((status: any) => status.id !== undefined && status.id !== null && status.id !== "")
                  .map((status: any) => (
                    <SelectItem key={status.id} value={String(status.id)}>
                      <span
                        style={{
                          backgroundColor: status.cor,
                          color: "#fff",
                          fontWeight: "bold",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          display: "inline-block",
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

  const STATUS_CANCELADO = 3; // ajuste para o ID correto do status cancelado

  const filteredData = dataList.filter((item) => {
    // Filtro por status selecionado
    if (
      selectedStatusIds.length > 0 &&
      !selectedStatusIds.includes(Number(item.statusId))
    ) {
      return false;
    }
    // Se não houver filtro de status, não mostra cancelados
    if (
      selectedStatusIds.length === 0 &&
      Number(item.statusId) === STATUS_CANCELADO
    ) {
      return false;
    }

    // Filtro por busca
    const utente = utentesData?.utentes?.find((u) => u.id === item.id_utente);
    const nomeUtente = utente?.nome?.toLowerCase() || "";
    const observacoes = item.observacoes?.toLowerCase() || "";
    const matchesSearch =
      nomeUtente.includes(searchText.toLowerCase()) ||
      observacoes.includes(searchText.toLowerCase());

    // Filtro por data
    let matchesDate = true;
    const itemDate = typeof item.data_agendamento === "string"
      ? parseISO(item.data_agendamento)
      : item.data_agendamento;

    if (selectedDay) {
      // Filtro por dia
      matchesDate = itemDate.toDateString() === selectedDay.toDateString();
    } else if (selectedMonth !== null) {
      // Filtro por mês
      matchesDate =
        itemDate.getMonth() === selectedMonth &&
        itemDate.getFullYear() === selectedYear;
    }
    // Se selectedMonth for null e selectedDay for null, mostra todos

    const matchesStatus =
      selectedStatusIds.length === 0 || selectedStatusIds.includes(Number(item.statusId));
    const matchesColaborador =
      selectedColaboradores.length === 0 || selectedColaboradores.includes(Number(item.id_colaborador));
    return matchesSearch && matchesDate && matchesStatus && matchesColaborador;
  });

  const groupedData = groupByDate(filteredData);

  // Exemplo de callback para aplicar filtros
  const handleApplyFilters = (filtros) => {
    const params = new URLSearchParams();
    if (filtros.colaboradores && filtros.colaboradores.length > 0)
      params.append("colaboradores", filtros.colaboradores.join(","));
    if (filtros.dataInicio) params.append("dataInicio", filtros.dataInicio);
    if (filtros.dataFim) params.append("dataFim", filtros.dataFim);

    window.open(`/relatorio-pdf?${params.toString()}`, "_blank");
    setIsPdfDialogOpen(false);
  };

  return (
    <SidebarProvider >
      <AppSidebar
        setData={setDataList}
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
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <SidebarInset>
        <Header onNovaMarcacao={() => setOpenDialog(true)} />
        <CreateMarkingsDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onAgendamentoCriado={novo => setDataList(prev => [...prev, novo])}
        />
        <main className="p-4 text-sm">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold">Agendamentos</h1>
            <Button onClick={() => setIsPdfDialogOpen(true)}>
              <FaFileDownload />
              Exportar
            </Button>
          </div>
          <div className="mb-4 flex gap-2">
            <PdfFilterDialog
              colaboradores={colaboradoresData?.colaboradores || []}
              open={isPdfDialogOpen}
              onOpenChange={setIsPdfDialogOpen}
              onApply={({ colaboradores, dataInicio, dataFim }) => {
                // Filtra as marcações conforme os filtros
                const marcacoesFiltradas = dataList.filter(
                  (m) =>
                    colaboradores.includes(String(m.id_colaborador)) &&
                    m.data_agendamento >= dataInicio &&
                    m.data_agendamento <= dataFim
                );

                if (marcacoesFiltradas.length === 0) {
                  alert("Não há marcações para o período ou médico indicado.");
                  return false;
                }

                const params = new URLSearchParams();
                if (colaboradores && colaboradores.length > 0)
                  params.append("colaboradores", colaboradores.join(","));
                if (dataInicio) params.append("dataInicio", dataInicio);
                if (dataFim) params.append("dataFim", dataFim);

                window.open(`/relatorio-pdf?${params.toString()}`, "_blank");
                setIsPdfDialogOpen(false);
              }}
            />
          </div>
          <SearchForm className="pt-2 pb-4" setSearchText={setSearchText} />
          <div className="flex gap-2 items-center justify-center mb-4 flex-wrap bg-muted p-2 rounded">
            <button
              className={`px-3 py-1 rounded ${selectedMonth === null ? "bg-primary text-white" : "bg-muted"}`}
              onClick={() => {
                setSelectedMonth(null);
                setSelectedDay(null); // Limpa filtro de dia
              }}
            >
              Todos
            </button>
            {monthNames.map((name, idx) => (
              <button
                key={name}
                className={`px-3 py-1 rounded ${selectedMonth === idx ? "bg-primary text-white" : "bg-muted"}`}
                onClick={() => {
                  setSelectedMonth(idx);
                  setSelectedDay(null); // Limpa filtro de dia
                }}
              >
                {name}
              </button>
            ))}
            {/* Se quiser permitir trocar de ano: */}
            <input
              type="number"
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="w-20 ml-2 border rounded px-2 py-1"
              min={2000}
              max={2100}
            />
          </div>
          <div className="border rounded-md overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.accessorKey || col.id}
                      className="px-4 py-2 border-b font-semibold bg-background"
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedData).map(([date, items]) => (
                  <React.Fragment key={date}>
                    <tr>
                      <td colSpan={columns.length} className="bg-muted px-4 py-2 font-semibold">
                        {date}
                      </td>
                    </tr>
                    {items.map((row, idx) => (
                      <tr key={row.id || idx} className="even:bg-muted/50">
                        {columns.map((col) => (
                          <td key={col.accessorKey || col.id} className="px-4 py-2 border-b align-middle">
                            {col.cell
                              ? col.cell({ row: { original: row }, getValue: () => row[col.accessorKey] })
                              : row[col.accessorKey]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </SidebarInset>
      <EditMarkingsDialog
        agendamento={currentAgendamento}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setCurrentAgendamento(null);
        }}
        onSave={(updatedAgendamento) => {
          const data_agendamento = extractDate(updatedAgendamento.data_agendamento);
          const hora_inicio = extractTime(updatedAgendamento.hora_inicio);
          const hora_fim = extractTime(updatedAgendamento.hora_fim);

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
              updateAgendamentoInput: input,
            },
          });

          setIsEditDialogOpen(false);
          setCurrentAgendamento(null);
        }}
      />
      <ConfirmDialog
        open={!!agendamentoParaCancelar}
        title="Cancelar consulta?"
        description="Tem certeza que deseja cancelar este agendamento?"
        confirmLabel="Sim, cancelar"
        cancelLabel="Não"
        onConfirm={async () => {
          if (agendamentoParaCancelar) {
            try {
              const result = await updateAgendamento({
                variables: {
                  updateAgendamentoInput: {
                    id: agendamentoParaCancelar.id,
                    data_agendamento: agendamentoParaCancelar.data_agendamento,
                    hora_inicio: agendamentoParaCancelar.hora_inicio,
                    hora_fim: agendamentoParaCancelar.hora_fim,
                    observacoes: agendamentoParaCancelar.observacoes,
                    utenteId: Number(agendamentoParaCancelar.id_utente),
                    colaboradorId: Number(agendamentoParaCancelar.id_colaborador),
                    servicoId: Number(agendamentoParaCancelar.id_servicos),
                    statusId: STATUS_CANCELADO,              // Campo obrigatório
                    statusAgendamentoId: STATUS_CANCELADO,   // Campo obrigatório
                  },
                },
              });
              const updated = result.data?.updateAgendamento;
              if (updated) {
                setDataList((prev) =>
                  prev.map((item) =>
                    item.id === updated.id ? { ...item, ...updated } : item
                  )
                );
              }
              setAgendamentoParaCancelar(null);
            } catch (err) {
              setAgendamentoParaCancelar(null);
            }
          }
        }}
        onCancel={() => {
          // Restaura o status anterior
          setDataList((prev) =>
            prev.map((item) =>
              item.id === agendamentoParaCancelar.id
                ? { ...item, statusId: previousStatusId }
                : item
            )
          );
          setAgendamentoParaCancelar(null);
        }}
      />
    </SidebarProvider>
  );
}
