import { AppSidebar } from "@/pages/HomeScreen/app-sidebar"
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
import { MenuComponent } from "@/components/nav-menu"
import  FullCalendarComponent  from "@/components/full-calendar-component"

export default function Page() {
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
              <BreadcrumbPage>
  {
    (() => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('pt-PT', { month: 'long', year: 'numeric' });
      const [mes, ano] = formatter.format(now).split(' de ');
      return `${mes.toUpperCase()} ${ano}`;
    })()
  }
</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex w-full justify-center">
            <MenuComponent/>
          </div>
        </header>
        <div>
          <FullCalendarComponent/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
