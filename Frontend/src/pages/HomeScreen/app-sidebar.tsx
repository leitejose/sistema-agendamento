import * as React from "react";
import { Printer, Download, Plus } from "lucide-react";
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
} from "@/components/ui/sidebar";
import NewAppointmentScreen from "@/pages/HomeScreen/create-new-appointment";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar> & { setOpenPrint: (open: boolean) => void }) {
  // Dados do usuário (pode vir de contexto ou props futuramente)
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  function handleExport() {
    alert("Exportar não implementado");
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
      {/*  <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleExport}>
              <Download />
              <span>Exportar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => props.setOpenPrint(true)}>
              <Printer />
              <span>Imprimir</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>*/}
          </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NewAppointmentScreen>
              <SidebarMenuButton>
                <Plus />
                <span>Nova Marcação</span>
              </SidebarMenuButton>
            </NewAppointmentScreen>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
