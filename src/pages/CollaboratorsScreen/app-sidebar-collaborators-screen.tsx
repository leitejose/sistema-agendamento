import * as React from "react"
import { Plus } from "lucide-react"
import { NavUser } from "@/components/nav-user-dropdown"
import CreateUtentesDialog from "@/pages/CollaboratorsScreen/create-collaborators-dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SearchForm } from "@/pages/CollaboratorsScreen/collaborators-search-form"
import { Button } from "@/components/ui/button"

// Dados de exemplo
const data = {
  user: {
    name: "Carlos Sousa",
    email: "carlos@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
      <SearchForm className="pt-4"/>
      <div className="flex justify-center direction-row">
        <div className="p-1"><Button>Exportar PDF</Button></div>
        <div className="p-1"><Button>Imprimir</Button></div>
      </div>
      
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
          <CreateUtentesDialog>
              <SidebarMenuButton>
                <Plus />
                Novo Colaborador
              </SidebarMenuButton>
            </CreateUtentesDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
