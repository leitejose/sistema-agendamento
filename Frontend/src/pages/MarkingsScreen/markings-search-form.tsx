import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

interface SearchFormProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchForm({ setSearchText, ...props }: SearchFormProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);  // Atualiza o texto de pesquisa no estado pai
  };

  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Buscar
          </Label>
          <SidebarInput
            id="search"
            placeholder="Buscar Marcação"
            className="pl-8"
            onChange={handleSearchChange}  // Atualiza o valor do campo de pesquisa
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
