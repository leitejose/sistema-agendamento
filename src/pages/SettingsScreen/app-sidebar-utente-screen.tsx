import * as React from "react"
import { Key, TicketsPlane, User } from "lucide-react"
import { NavUser } from "@/components/nav-user-dropdown"
import CreateUtentesDialog from "@/pages/UtentesScreen/create-utente-dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"


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
      <SidebarMenu className="pt-5">
          <SidebarMenuItem>
          <CreateUtentesDialog>
              <SidebarMenuButton>
                <TicketsPlane/>
                Férias
              </SidebarMenuButton>
            </CreateUtentesDialog>
          </SidebarMenuItem>
          <SidebarMenuItem>
          <CreateUtentesDialog>
              <SidebarMenuButton>
                <User/>
                Funções
              </SidebarMenuButton>
            </CreateUtentesDialog>
          </SidebarMenuItem>
          <SidebarMenuItem>
          <CreateUtentesDialog>
              <SidebarMenuButton>
                <Key/>
                Permissões
              </SidebarMenuButton>
            </CreateUtentesDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
