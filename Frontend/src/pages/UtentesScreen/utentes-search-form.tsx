import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"
interface SearchFormProps {
  className?: string
  setSearchText: (text: string) => void
}

export function SearchForm({ className, setSearchText }: SearchFormProps) {
  return (
    <form className={className}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Buscar
          </Label>
          <SidebarInput
            id="search"
            placeholder="Buscar Serviço"
            onChange={(e) => setSearchText(e.target.value)} // Atualiza o estado no componente pai
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
