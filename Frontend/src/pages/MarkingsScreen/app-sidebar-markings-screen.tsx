import * as React from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { NavUser } from "@/components/nav-user-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SearchForm } from "./markings-search-form";
import CreateMarkingsDialog from "@/pages/MarkingsScreen/create-markings-dialog";
import { DatePicker } from "@/components/date-picker";
import { useQuery } from "@apollo/client";
import { GET_STATUS } from "@/graphql/queries";
import { Button } from "@/components/ui/button";
import { StatusFilter } from "./Components/StatusFilter";
import { ColaboradoresFilter } from "./Components/CollaboratorsFilter";
import { ExportPDFButton } from "./Components/ExportPDFButton";


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

  console.log("colaboradoresData", colaboradoresData);

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={{ name: "Carlos Sousa", email: "carlos@example.com", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarHeader>
      <SidebarContent>
        <SearchForm className="pt-4" setSearchText={setSearchText} />
        <DatePicker selected={selectedDate} onChange={setSelectedDate} />
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
          colaboradoresData={colaboradoresData}
          loadingColaboradores={loadingColaboradores}
          selectedColaboradores={safeSelectedColaboradores}
          setSelectedColaboradores={setSelectedColaboradores}
          collapsed={colabCollapsed}
          setCollapsed={setColabCollapsed}
        />
        <SidebarSeparator className="mx-0" />
        <div className="p-4">
         <ExportPDFButton
  dataList={dataList}
  utentes={utentesData?.utentes ?? []} // ✅ corrigido
  colaboradores={colaboradoresData?.colaboradores ?? []}
  servicos={servicosData?.servicos ?? []}
  statusList={statusData?.statusAgendamentos ?? []}
/>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <CreateMarkingsDialog setData={setData}>
              <SidebarMenuButton>
                <Plus />
                Nova Marcação
              </SidebarMenuButton>
            </CreateMarkingsDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
