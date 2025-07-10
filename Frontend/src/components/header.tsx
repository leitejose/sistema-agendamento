import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DateBreadcrumb } from "@/components/DateBreadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MenuComponent } from "@/components/nav-menu";

type MainHeaderProps = {
  onNovaMarcacao: () => void;
};

export function Header({ onNovaMarcacao }: MainHeaderProps) {
  return (
    <header className="top-0 flex h-16 items-center border-b bg-background px-4 relative">
      <SidebarTrigger className="-ml-1 flex" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <DateBreadcrumb />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
        <Button onClick={onNovaMarcacao}>
          <Plus />
          Nova Marcação
        </Button>
      </div>
      <div className="flex-1" />
      <div className="flex items-center ml-auto">
        <MenuComponent />
      </div>
    </header>
  );
}