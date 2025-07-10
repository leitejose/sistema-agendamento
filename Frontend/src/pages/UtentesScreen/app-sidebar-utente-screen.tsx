"use client";
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
import { Plus } from "lucide-react";
import * as React from "react";
import { NavUser } from "@/components/nav-user-dropdown";
import { SearchForm } from "./utentes-search-form";
import CreateUtentesDialog from "@/pages/UtentesScreen/create-utente-dialog";

interface AppSidebarProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export function AppSidebar({ setSearchText }: { setSearchText: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={{ name: "Carlos Sousa", email: "carlos@example.com", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarHeader>
      <SidebarContent>
        <SearchForm
          className="pt-4"
          setSearchText={setSearchText} // Certifique-se de passar a função aqui
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <CreateUtentesDialog>
              <SidebarMenuButton>
                <Plus />
                Novo Utente
              </SidebarMenuButton>
            </CreateUtentesDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// Dentro do AppSidebar:
function AppSidebar({ setSearchText }) {
  // ...código...
  return (
    <div>
      {/* NÃO faça isso: */}
      {/* <div setSearchText={setSearchText}> */}
      {/* CORRETO: */}
      <input onChange={(e) => setSearchText(e.target.value)} />
      {/* ...restante do sidebar... */}
    </div>
  );
}

