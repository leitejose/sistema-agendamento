import { AppSidebar } from "@/pages/UtentesScreen/app-sidebar-utente-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useQuery, useMutation } from "@apollo/client";
import { GET_UTENTES, UPDATE_UTENTE, DELETE_UTENTE } from "@/graphql/queries";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Combobox} from "@/components/combobox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const exampleDistricts = [
  { label: "Lisboa", value: "LI" },
  { label: "Porto", value: "PO" },
  { label: "Setúbal", value: "SE" },
];

const exampleMunicipalities = {
  LI: [
    { label: "Lisboa", value: "LI1" },
    { label: "Sintra", value: "LI2" },
  ],
  PO: [
    { label: "Porto", value: "PO1" },
    { label: "Vila Nova de Gaia", value: "PO2" },
  ],
  SE: [
    { label: "Setúbal", value: "SE1" },
    { label: "Almada", value: "SE2" },
  ],
};

export function ComboboxField({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-[200px] justify-between",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Pesquisar ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const FormSchema = z.object({
  pais: z.string().nonempty("Selecione um país."),
  distrito: z.string().nonempty("Selecione um distrito."),
  concelho: z.string().nonempty("Selecione um concelho."),
});

// ... seus imports continuam iguais

// FormSchema e ComboboxField também continuam iguais

export default function Page() {
  const { loading, error, data } = useQuery(GET_UTENTES);
  const [updateUtente] = useMutation(UPDATE_UTENTE);
  const [removeUtente] = useMutation(DELETE_UTENTE);

  const [currentUtente, setCurrentUtente] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Estados para busca e filtragem
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    pais: "",
    distrito: "",
    concelho: "",
  });

  useEffect(() => {
    if (data?.utentes) {
      const filtered = data.utentes.filter(
        (utente: any) =>
          utente.nome.toLowerCase().includes(searchText.toLowerCase()) ||
          utente.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchText]);

  const handleEdit = (utente: any) => {
    setCurrentUtente(utente);
    setFormData({
      pais: utente.pais || "",
      distrito: utente.distrito || "",
      concelho: utente.concelho || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUtente = async (utenteId: number) => {
    if (!utenteId) {
      alert("ID do utente inválido!");
      return;
    }
  
    const confirmed = confirm("Tem certeza que deseja excluir este utente?");
    if (confirmed) {
      try {
        const { data } = await removeUtente({
          variables: { id: utenteId },
          refetchQueries: [{ query: GET_UTENTES }],
        });
  
        console.log("Utente removido:", data.removeUtente);
        alert("Utente removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover utente:", error);
        
        // Exiba detalhes do erro para depuração
        if (error instanceof Error) {
          alert(`Erro ao remover utente: ${error.message}`);
        } else {
          alert("Erro desconhecido ao remover utente.");
        }

        // Adicione esta linha para exibir o erro completo no console
        console.log("Erro completo:", error);
      }
    }
  };
  

  const handleSaveEdit = async () => {
    console.log("Dados enviados para atualização:", {
      input: {
        id: parseInt(currentUtente.id, 10),
        nome: currentUtente.nome,
        email: currentUtente.email,
        telemovel: currentUtente.telemovel.toString(),
        morada: currentUtente.morada,
        concelho: formData.concelho,
        distrito: formData.distrito,
        pais: formData.pais,
        codigo_postal: currentUtente.codigo_postal.toString(),
      },
    });
    try {
      await updateUtente({
        variables: {
          id: parseInt(currentUtente.id, 10),
          updateUtenteInput: {
            nome: currentUtente.nome,
            email: currentUtente.email,
            telemovel: currentUtente.telemovel.toString(),
            morada: currentUtente.morada,
            concelho: formData.concelho,
            distrito: formData.distrito,
            pais: formData.pais,
            codigo_postal: currentUtente.codigo_postal.toString(),
          },
        },
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar utente:", error);
      alert("Erro ao atualizar utente. Verifique os logs para mais detalhes.");
    }
  };

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "telemovel",
      header: "Telemóvel",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-500 hover:underline"
            aria-label="Editar utente"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDeleteUtente(row.original.id)}
            className="text-red-500 hover:underline"
            aria-label="Excluir utente"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar utentes: {error.message}</p>;

  return (
    <SidebarProvider>
      <AppSidebar setSearchText={setSearchText} />
      <SidebarInset>
        <Header />
        <main className="p-4">
          <h1 className="text-lg font-bold mb-4">Utentes</h1>
          <DataTable columns={columns} data={filteredData} />
        </main>
      </SidebarInset>

      {/* Sheet para Editar Utente */}
      {isEditDialogOpen && (
        <Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <SheetContent side="right"> {/* Adicione o atributo side="right" */}
            <SheetHeader>
              <SheetTitle>Editar Utente</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {/* Nome */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="nome" className="text-right">
                  Nome
                </label>
                <Input
                  id="nome"
                  value={currentUtente?.nome || ""}
                  onChange={(e) =>
                    setCurrentUtente((prev: any) => ({
                      ...prev,
                      nome: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>

              {/* Email */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  E-mail
                </label>
                <Input
                  id="email"
                  value={currentUtente?.email || ""}
                  onChange={(e) =>
                    setCurrentUtente((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>

              {/* Telemóvel */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="telemovel" className="text-right">
                  Telemóvel
                </label>
                <Input
                  id="telemovel"
                  value={currentUtente?.telemovel || ""}
                  onChange={(e) =>
                    setCurrentUtente((prev: any) => ({
                      ...prev,
                      telemovel: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>

              {/* País */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pais" className="text-right">
                  País
                </Label>
                <Combobox
                  items={[
                    { value: "PT", label: "Portugal" },
                    { value: "ES", label: "Espanha" },
                    { value: "FR", label: "França" },
                    { value: "IT", label: "Itália" },
                  ]}
                  value={formData.pais}
                  onChange={(value) => setFormData({ ...formData, pais: value })}
                  placeholder="Selecione o país"
                />
              </div>

              {/* Distrito */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="distrito" className="text-right">
                  Distrito
                </Label>
                <Combobox
                  items={[
                    { value: "LI", label: "Lisboa" },
                    { value: "CO", label: "Coimbra" },
                    { value: "BR", label: "Braga" },
                    { value: "EV", label: "Évora" },
                  ]}
                  value={formData.distrito}
                  onChange={(value) => setFormData({ ...formData, distrito: value })}
                  placeholder="Selecione um distrito"
                />
              </div>

              {/* Concelho */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="concelho" className="text-right">
                  Concelho
                </Label>
                <Combobox
                  items={[
                    { value: "CNT", label: "Cantanhede" },
                    { value: "FDF", label: "Figueira da Foz" },
                  ]}
                  value={formData.concelho}
                  onChange={(value) => setFormData({ ...formData, concelho: value })}
                  placeholder="Selecione um concelho"
                />
              </div>

              {/* Morada */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="morada" className="text-right">
                  Morada
                </label>
                <Input
                  id="morada"
                  value={currentUtente?.morada || ""}
                  onChange={(e) =>
                    setCurrentUtente((prev: any) => ({
                      ...prev,
                      morada: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>

              {/* Código Postal */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="codigo_postal" className="text-right">
                  Código Postal
                </label>
                <Input
                  id="codigo_postal"
                  value={currentUtente?.codigo_postal || ""}
                  onChange={(e) =>
                    setCurrentUtente((prev: any) => ({
                      ...prev,
                      codigo_postal: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <Button onClick={handleSaveEdit}>Salvar</Button>
              <SheetClose asChild>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </SidebarProvider>
  );
}
