import * as React from "react";
import { Plus } from "lucide-react";
import { NavUser } from "@/components/nav-user-dropdown";
import CreateServiceDialog from "@/pages/ServicesScreen/create-services-dialog";
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
import { Button } from "@/components/ui/button";
import { SearchForm } from "./services-search-form";

export function AppSidebar({ setData }: { setData: React.Dispatch<React.SetStateAction<any[]>> }) {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={{ name: "Carlos Sousa", email: "carlos@example.com", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarHeader>
      <SidebarContent>
      <SearchForm className="pt-4"/>
        <div className="flex justify-center direction-row">
          <div className="p-1">
            <Button>Exportar PDF</Button>
          </div>
          <div className="p-1">
            <Button>Imprimir</Button>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <CreateServiceDialog setData={setData}>
              <SidebarMenuButton>
                <Plus />
                Novo Serviço
              </SidebarMenuButton>
            </CreateServiceDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
