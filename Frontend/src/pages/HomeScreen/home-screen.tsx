import { AppSidebar } from "@/pages/HomeScreen/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useQuery } from "@apollo/client"
import { GET_AGENDAMENTOS, GET_UTENTES, GET_SERVICOS, GET_COLABORADORES, GET_STATUS } from "@/graphql/queries"
import FullCalendarComponent from "@/components/full-calendar-component"
import { EventDetailsTooltip } from "@/pages/HomeScreen/EventDetailsDialog";
import { Header } from "@/components/header"

import CreateMarkingsDialog from "../MarkingsScreen/create-markings-dialog"
import { useState, useRef, useEffect } from "react"
import { DayMarkingsSheet } from "@/components/DayMarkingsSheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PdfFilterDialog } from "@/pages/MarkingsScreen/PdfFilterDialog";
import PdfGenerate from "@/pages/MarkingsScreen/PdfGenerate/pdf-generate";


export default function Page() {
  const { data, loading } = useQuery(GET_AGENDAMENTOS)
  const { data: utentesData } = useQuery(GET_UTENTES)
  const { data: servicosData } = useQuery(GET_SERVICOS)
  const { data: colaboradoresData } = useQuery(GET_COLABORADORES)
  const { data: statusData } = useQuery(GET_STATUS)

  // Estados para filtros do sidebar
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [safeSelectedStatusIds, setSelectedStatusIds] = useState<number[]>([]);
  const [statusCollapsed, setStatusCollapsed] = useState(false);
  const [safeSelectedColaboradores, setSelectedColaboradores] = useState<number[]>([]);
  const [colabCollapsed, setColabCollapsed] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // <-- MOVER PARA CIMA
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [openPrint, setOpenPrint] = useState(false);
  const [openPdfDialog, setOpenPdfDialog] = useState(false); // Estado para controlar a abertura
  const [marcacoesParaExportar, setMarcacoesParaExportar] = useState<any[]>([]);
  const [filtrosParaExportar, setFiltrosParaExportar] = useState({
    colaboradores: [],
    dataInicio: "",
    dataFim: ""
  });
  const calendarRef = useRef<any>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (calendarRef.current) {
        calendarRef.current.getApi().updateSize();
      }
    });
    observer.observe(calendarContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Quando o usuário seleciona uma data no DatePicker, abre a sheet
  useEffect(() => {
    if (selectedDate) {
      setDrawerOpen(true);
      setSelectedDay(selectedDate);
    }
  }, [selectedDate]);

  function handleDayClick(info: { date: Date }) {
    setSelectedDay(info.date);
    setDrawerOpen(true);
  }

  const STATUS_CANCELADO = 3;

  const agendamentosFiltrados = (data?.getAgendamentos ?? []).filter((agendamento: any) => {
    // Filtro por status selecionado
    if (
      safeSelectedStatusIds.length > 0 &&
      !safeSelectedStatusIds.includes(agendamento.statusId)
    ) {
      return false;
    }
    // Se não houver filtro de status, não mostra cancelados
    if (
      safeSelectedStatusIds.length === 0 &&
      agendamento.statusId === STATUS_CANCELADO
    ) {
      return false;
    }
    // Filtro por colaborador
    if (
      safeSelectedColaboradores.length > 0 &&
      !safeSelectedColaboradores.includes(agendamento.id_colaborador)
    ) {
      return false;
    }
    return true;
  });

  // Transforma os agendamentos em eventos do calendário
  const events =
    data?.getAgendamentos
      ?.filter((agendamento: any) => {
        // Filtro por status selecionado
        if (
          safeSelectedStatusIds.length > 0 &&
          !safeSelectedStatusIds.includes(agendamento.statusId)
        ) {
          return false;
        }
        // Se não houver filtro de status, não mostra cancelados
        if (
          safeSelectedStatusIds.length === 0 &&
          agendamento.statusId === STATUS_CANCELADO
        ) {
          return false;
        }
        // Filtro por colaborador
        if (
          safeSelectedColaboradores.length > 0 &&
          !safeSelectedColaboradores.includes(agendamento.id_colaborador)
        ) {
          return false;
        }
        return true;
      })
      .map((agendamento: any) => {
        // Se vier como UTC, converte para local
        const start = agendamento.hora_inicio?.endsWith("Z")
          ? new Date(agendamento.hora_inicio).toISOString().slice(0, 16)
          : agendamento.hora_inicio;

        const end = agendamento.hora_fim?.endsWith("Z")
          ? new Date(agendamento.hora_fim).toISOString().slice(0, 16)
          : agendamento.hora_fim;

        const utente = utentesData?.utentes?.find((u: any) => u.id === agendamento.id_utente)
        const servico = servicosData?.servicos?.find((s: any) => s.id === agendamento.id_servicos)
        const colaborador = colaboradoresData?.colaboradores?.find((c: any) => c.id === agendamento.id_colaborador)
        const status = statusData?.statusAgendamentos?.find((st: any) => st.id === agendamento.statusId)
        const hora = agendamento.hora_inicio?.slice(11, 16) // pega HH:mm

        return {
          id: agendamento.id,
          title: `${utente?.nome ?? ""} - ${servico?.descricao ?? ""} - ${colaborador?.descricao ?? ""} - ${hora ?? ""}`,
          start,
          end,
          backgroundColor: status?.cor ?? "#1976d2",
          borderColor: status?.cor ?? "#1976d2",
          textColor: "#fff"
        }
      }) ?? []

  if (loading) return <div>Carregando calendário...</div>

  // Renderiza cada evento com a tooltip informativa
  function renderEventContent(eventInfo: any) {
    const parts = eventInfo.event.title.split(" - ");
    const bgColor = eventInfo.event.backgroundColor || "#1976d2";
    return (
      <EventDetailsTooltip event={eventInfo.event}>
        <div
          className="flex flex-row p-1 rounded shadow text-xs font-bold cursor-pointer"
          style={{
            backgroundColor: bgColor,
            color: "#fff",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.75rem", // menor
            minHeight: "18px",   // menor
            padding: "2px 4px",  // menor
          }}
          title={`${parts[1]} ${parts[3]}`}
        >
          <div className="mr-2">{parts[3]}</div>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{parts[1]}</div>
        </div>
      </EventDetailsTooltip>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        statusData={statusData}
        statusLoading={false}
        safeSelectedStatusIds={safeSelectedStatusIds}
        setSelectedStatusIds={setSelectedStatusIds}
        statusCollapsed={statusCollapsed}
        setStatusCollapsed={setStatusCollapsed}
        colaboradoresData={colaboradoresData}
        loadingColaboradores={false}
        safeSelectedColaboradores={safeSelectedColaboradores}
        setSelectedColaboradores={setSelectedColaboradores}
        colabCollapsed={colabCollapsed}
        setColabCollapsed={setColabCollapsed}
        setOpenPrint={setOpenPdfDialog} // Passe setOpenPdfDialog para o AppSidebar
      />
      <SidebarInset>
        <Header onNovaMarcacao={() => setOpenDialog(true)} />
   
        <CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} />
        <div className="flex flex-col">
          <div className="flex-1 rounded px-4 overflow-auto min-h-[550px] min-w-[1200px] flex justify-center items-center">
            <div
              ref={calendarContainerRef}
              className="h-full w-full max-w-[auto] max-h-[auto] mx-auto p-2"
            >
              <FullCalendarComponent
                ref={calendarRef}
                events={events}
                initialView="dayGridMonth"
                aspectRatio={1.2}
                headerToolbar={false}
                eventContent={renderEventContent}
                dateClick={handleDayClick}
              />
            </div>
          </div>
        </div>
        <DayMarkingsSheet
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          date={selectedDay}
          agendamentos={agendamentosFiltrados}
          utentesData={utentesData}
          colaboradoresData={colaboradoresData}
          servicosData={servicosData}
          statusData={statusData}
        />
      </SidebarInset>
      {/* Dialog/modal de exportação */}
      <Dialog open={openPrint} onOpenChange={setOpenPrint}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Dados</DialogTitle>
          </DialogHeader>
          {/* Substitua o pre pelo componente de PDF */}
          <PdfGenerate
            marcacoes={marcacoesParaExportar}
            utentesData={utentesData}
            colaboradoresData={colaboradoresData}
            servicosData={servicosData}
            statusData={statusData}
            filtros={filtrosParaExportar}
          />
        </DialogContent>
      </Dialog>
      <PdfFilterDialog
        colaboradores={colaboradoresData?.colaboradores || []}
        open={openPdfDialog}
        onOpenChange={setOpenPdfDialog}
        onApply={({ colaboradores, dataInicio, dataFim }) => {
          const marcacoesFiltradas = (data?.getAgendamentos ?? []).filter((m) => {
            const dataMarc = m.data_agendamento?.slice(0, 10); // pega só a parte YYYY-MM-DD
            return (
              colaboradores.includes(String(m.id_colaborador)) &&
              (!dataInicio || dataMarc >= dataInicio) &&
              (!dataFim || dataMarc <= dataFim)
            );
          });
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
          setOpenPdfDialog(false);
          return marcacoesFiltradas;
        }}
      />
    </SidebarProvider>
  )
}
