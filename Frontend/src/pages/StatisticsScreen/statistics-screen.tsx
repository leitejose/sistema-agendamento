import { CardsData } from "./cards-data";
import { BarComponent } from "./bar-chart";
import { CardDoctor } from "./card-appointments-by-doctor";
import { DateFilter } from "@/components/date-filter";
import { CardService } from "./card-appointments-by-service";
import { Header } from "@/components/header";
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import CreateMarkingsDialog from "../MarkingsScreen/create-markings-dialog";
import { useQuery } from "@apollo/client";
import { GET_COLABORADORES, GET_AGENDAMENTOS, GET_SERVICOS } from "@/graphql/queries";

// Este componente é a página principal de estatísticas do sistema de agendamento.
// Ele utiliza vários componentes para exibir gráficos e dados filtrados.

export default function Page() {
  // Estado para controlar a abertura do diálogo de criação de marcações.
  const [openDialog, setOpenDialog] = useState(false);

  // Estados para armazenar as datas de início e fim do filtro.
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().substring(0, 10));

  const { data: colaboradoresData } = useQuery(GET_COLABORADORES);
  const { data: agendamentosData } = useQuery(GET_AGENDAMENTOS);
  const { data: servicosData } = useQuery(GET_SERVICOS);

  // Função chamada ao clicar no botão de filtro. Pode ser expandida para incluir lógica adicional.
  const handleFilter = () => {
    console.log('Filtrando dados entre:', startDate, 'e', endDate);
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <Header onNovaMarcacao={() => setOpenDialog(true)} />
        <CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} />
        
        <div className="flex flex-col items-center justify-center">
           <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFilter={handleFilter}
      />
        </div>

        <div className="flex flex-col p-4 items-center justify-center">
          <CardsData startDate={startDate} endDate={endDate} />
        </div>

        <div className="flex flex-1">
          <div className="p-4 w-1/2">
            <BarComponent startDate={startDate} endDate={endDate} />
          </div>
          <div className="flex w-1/2 flex-line gap-4 p-4">
            <div className="w-1/2">
              <CardDoctor startDate={startDate} endDate={endDate} />
            </div>
            <div className="w-1/2">
              <CardService startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
