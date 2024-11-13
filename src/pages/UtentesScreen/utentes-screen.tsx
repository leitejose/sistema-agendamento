import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { MenuComponent } from "@/components/nav-user"

export default function Page() {
  // Estado para o item ativo
  const [activeItem, setActiveItem] = useState("Calendário")

  // Lista de itens de navegação
  const navigationItems = [
    { name: "Calendário", path: "/home-screen" },
    { name: "Utentes", path: "/utentes-screen" },
    { name: "Colaboradores", path: "/services" },
    { name: "Serviços", path: "/contact" },
    { name: "Estatística", path: "/statistics" },
    { name: "Definições", path: "/settings" },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex w-full justify-center">
            <MenuComponent/>
          </div>

          
        </header>

        
          
          
        
      </SidebarInset>
    </SidebarProvider>
  )
}
