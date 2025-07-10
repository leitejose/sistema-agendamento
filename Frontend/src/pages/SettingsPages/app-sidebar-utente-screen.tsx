import * as React from "react";
import { Key, TicketsPlane, User, Contact, Clock, Clipboard } from "lucide-react";
import { NavUser } from "@/components/nav-user-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="pt-5">
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/utentes-screen")}>
              <User />
              Utentes
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Colaboradores*/}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/collaborators-screen")}>
              <Contact />
              Colaboradores
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Serviços */}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/services-screen")}>
              <Clipboard />
              Serviços
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/vacance-screen")}>
              <TicketsPlane />
              Férias
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/role-screen")}>
              <User />
              Funções
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/permission-screen")}>
              <Key />
              Permissões
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/availability-screen")}>
              <Clock />
              Disponibilidade
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
