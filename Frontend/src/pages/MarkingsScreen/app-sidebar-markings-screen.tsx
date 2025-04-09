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
import { SearchForm } from "./markings-search-form";

export function AppSidebar({ setData, setSearchText, dataList }: { setData: React.Dispatch<React.SetStateAction<any[]>>, setSearchText: React.Dispatch<React.SetStateAction<string>>, dataList: any[] }) {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={{ name: "Carlos Sousa", email: "carlos@example.com", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarHeader>
      <SidebarContent>
        <SearchForm className="pt-4" setSearchText={setSearchText} />
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
