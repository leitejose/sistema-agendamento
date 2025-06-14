import { AppSidebar } from "@/pages/HomeScreen/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { MenuComponent } from "@/components/nav-menu"
import { useQuery } from "@apollo/client"
import { GET_AGENDAMENTOS, GET_UTENTES, GET_SERVICOS, GET_COLABORADORES, GET_STATUS } from "@/graphql/queries"
import { useState } from "react"
import FullCalendarComponent from "@/components/full-calendar-component"
import { EventDetailsTooltip } from "@/pages/HomeScreen/EventDetailsDialog";


export default function Page() {
  const { data, loading } = useQuery(GET_AGENDAMENTOS)
  const { data: utentesData } = useQuery(GET_UTENTES)
  const { data: servicosData } = useQuery(GET_SERVICOS)
  const { data: colaboradoresData } = useQuery(GET_COLABORADORES)
  const { data: statusData } = useQuery(GET_STATUS)

  // Transforma os agendamentos em eventos do calendário
  const events =
    data?.getAgendamentos?.map((agendamento: any) => {
      const utente = utentesData?.utentes?.find((u: any) => u.id === agendamento.id_utente)
      const servico = servicosData?.servicos?.find((s: any) => s.id === agendamento.id_servicos)
      const colaborador = colaboradoresData?.colaboradores?.find((c: any) => c.id === agendamento.id_colaborador)
      const status = statusData?.statusAgendamentos?.find((st: any) => st.id === agendamento.statusId)
      const hora = agendamento.hora_inicio?.slice(11, 16) // pega HH:mm

      return {
        id: agendamento.id,
        title: `${utente?.nome ?? ""} - ${servico?.descricao ?? ""} - ${colaborador?.descricao ?? ""} - ${hora ?? ""}`,
        start: agendamento.hora_inicio,
        end: agendamento.hora_fim,
        backgroundColor: status?.cor ?? "#1976d2", // cor do status, fallback azul
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
          className="flex flex-row p-2 rounded shadow text-xs font-bold cursor-pointer"
          style={{
            backgroundColor: bgColor,
            color: "#fff",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
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
      <AppSidebar/>
      <SidebarInset>
        <header className=" top-0 flex h-16 shrink-0 items-center border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {(() => {
                    const now = new Date()
                    const formatter = new Intl.DateTimeFormat("pt-PT", {
                      month: "long",
                      year: "numeric",
                    })
                    const [mes, ano] = formatter.format(now).split(" de ")
                    return `${mes.toUpperCase()} ${ano}`
                  })()}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex w-full justify-center">
            <MenuComponent />
          </div>
        </header>
        <div className="flex h-full w-full flex-col p-4">
          <div className="flex-1 bg-gray-100 rounded p-4 overflow-auto min-h-[550px] min-w-[1200px] flex justify-center items-center">
            <div className="w-full h-full">
              <FullCalendarComponent
                events={events}
                initialView="dayGridMonth"
                aspectRatio={1.8}
                headerToolbar={false}
                eventContent={renderEventContent}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
