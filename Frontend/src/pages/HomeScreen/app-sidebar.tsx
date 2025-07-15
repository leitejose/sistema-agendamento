import * as React from "react";
import { NavUser } from "@/components/nav-user-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ColaboradoresFilter } from "../MarkingsScreen/Components/CollaboratorsFilter";
import { StatusFilter } from "../MarkingsScreen/Components/StatusFilter";
import { Button } from "@/components/ui/button";
import { FaFileDownload } from "react-icons/fa";

export function AppSidebar({
  selectedDate,
  setSelectedDate,
  statusData,
  statusLoading,
  safeSelectedStatusIds,
  setSelectedStatusIds,
  statusCollapsed,
  setStatusCollapsed,
  colaboradoresData,
  loadingColaboradores,
  safeSelectedColaboradores,
  setSelectedColaboradores,
  colabCollapsed,
  setColabCollapsed,
  setOpenPrint,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  statusData: any;
  statusLoading: boolean;
  safeSelectedStatusIds: number[];
  setSelectedStatusIds: (ids: number[]) => void;
  statusCollapsed: boolean;
  setStatusCollapsed: (collapsed: boolean) => void;
  colaboradoresData: any;
  loadingColaboradores: boolean;
  safeSelectedColaboradores: number[];
  setSelectedColaboradores: (ids: number[]) => void;
  colabCollapsed: boolean;
  setColabCollapsed: (collapsed: boolean) => void;
  setOpenPrint: (open: boolean) => void;
}) {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };
  const colaboradoresMedicos = colaboradoresData?.colaboradores?.filter(
    (c: any) =>
      typeof c.cargo?.descricao === "string" &&
      c.cargo.descricao.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === "medico"
  ) ?? [];

  function handleExport() {
    alert("Exportar não implementado");
  }

  console.log("Médicos filtrados:", colaboradoresMedicos);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
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
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button onClick={() => setOpenPrint(true)} className="w-full">
          <FaFileDownload className="mr-2" />
          Exportar
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
