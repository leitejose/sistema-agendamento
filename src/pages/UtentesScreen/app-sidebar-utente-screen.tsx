import * as React from "react"
import { Plus } from "lucide-react"
import { NavUser } from "@/components/nav-user-dropdown"
import CreateUtentesDialog from "@/pages/UtentesScreen/create-utente-dialog"
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
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
                Novo Utente
              </SidebarMenuButton>
            </CreateUtentesDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
