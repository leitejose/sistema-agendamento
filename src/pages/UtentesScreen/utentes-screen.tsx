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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

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

          {/* Menu de navegação centralizado */}
          <div className="flex w-full justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4 p-2 rounded-sm">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.path}
                      onClick={() => setActiveItem(item.name)} // Atualiza o item ativo ao clicar
                      className={`p-2 rounded-sm transition-colors duration-200 ${
                        activeItem === item.name
                          ? "bg-black text-white" // Estilo ativo para o item selecionado
                          : "text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>

        
          
          
        
      </SidebarInset>
    </SidebarProvider>
  )
}
