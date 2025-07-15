import * as React from "react";
import { NavUser } from "@/components/nav-user-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { DatePicker } from "@/components/date-picker";
import { useQuery } from "@apollo/client";
import { GET_STATUS } from "@/graphql/queries";
import { StatusFilter } from "./Components/StatusFilter";
import { ColaboradoresFilter } from "./Components/CollaboratorsFilter";


export function AppSidebar({
  setData,
  setSearchText,
  dataList,
  selectedDate,
  setSelectedDate,
  selectedStatusIds,
  setSelectedStatusIds,
  selectedColaboradores,
  setSelectedColaboradores,
  loadingColaboradores,
  colaboradoresData,
  servicosData,
  utentesData,
  selectedDay,
  setSelectedDay,
}: {
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  dataList: any[],
  selectedDate: Date | null,
  setSelectedDate: (date: Date | null) => void,
  selectedStatusIds: any[],
  setSelectedStatusIds: React.Dispatch<React.SetStateAction<any[]>>,
  selectedColaboradores: any[],
  setSelectedColaboradores: React.Dispatch<React.SetStateAction<any[]>>,
  loadingColaboradores: boolean,
  colaboradoresData: any,
  servicosData: any,
  utentesData: any,
}) {
  const { data: statusData, loading: statusLoading } = useQuery(GET_STATUS);
  const safeSelectedStatusIds = selectedStatusIds ?? [];
  const safeSelectedColaboradores = selectedColaboradores ?? [];
  const [statusCollapsed, setStatusCollapsed] = React.useState(false);
  const [colabCollapsed, setColabCollapsed] = React.useState(false);

  // Filtra apenas colaboradores cujo cargo é "Médico"
  const colaboradoresMedicos = colaboradoresData?.colaboradores?.filter(
    (c: any) =>
      typeof c.cargo?.descricao === "string" &&
      c.cargo.descricao.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === "medico"
  ) ?? [];

  console.log("colaboradoresData", colaboradoresData);

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={{ name: "Carlos Sousa", email: "carlos@example.com", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarHeader>
      <SidebarContent >
        <DatePicker
          selected={selectedDay}
          onChange={(date) => {
            setSelectedDay(date);
            if (date) {
              setSelectedMonth(date.getMonth());
              setSelectedYear(date.getFullYear());
            }
          }}
        />
        <SidebarSeparator className="mx-0" />
        <StatusFilter
          statusData={statusData}
          statusLoading={statusLoading}
          selectedStatusIds={safeSelectedStatusIds}
          setSelectedStatusIds={setSelectedStatusIds}
          collapsed={statusCollapsed}
          setCollapsed={setStatusCollapsed}
        />
        <SidebarSeparator className="mx-0" />
        <ColaboradoresFilter
          colaboradoresData={{ colaboradores: colaboradoresMedicos }}
          loadingColaboradores={loadingColaboradores}
          selectedColaboradores={safeSelectedColaboradores}
          setSelectedColaboradores={setSelectedColaboradores}
          collapsed={colabCollapsed}
          setCollapsed={setColabCollapsed}
        />
       
      </SidebarContent>
     
      <SidebarRail />
    </Sidebar>
  );
}
