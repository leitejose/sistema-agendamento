import * as React from "react";
import { Plus } from "lucide-react";
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
import { SearchForm } from "./collaborators-search-form";
import { useState } from "react";
import CreateCollaboratorsDialog from "./create-collaborators-dialog";

export function AppSidebar({
  setData,
  setSearchText,
  dataList,
}: {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  dataList: any[];
}) {
  // Estado para controlar a abertura do diálogo
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser
          user={{
            name: "Carlos Sousa",
            email: "carlos@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SearchForm className="pt-4" setSearchText={setSearchText} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Botão para abrir o diálogo */}
            <SidebarMenuButton onClick={() => setIsOpen(true)}>
              <Plus />
              Novo Colaborador
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />

      {/* Diálogo para criar colaborador */}
      <CreateCollaboratorsDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setData={setData}
      />
    </Sidebar>
  );
}
