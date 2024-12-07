"use client";

import { AppSidebar } from "@/pages/ServicesScreen/app-sidebar-services-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Page() {
  const [data, setData] = useState([
    { id: 1, nome: "Consulta Inicial", valor: "50€", duracao: "30 minutos" },
    { id: 2, nome: "Ultrassonografia", valor: "75€", duracao: "45 minutos" },
    { id: 3, nome: "Exame Preventivo (Papanicolau)", valor: "30€", duracao: "20 minutos" },
    { id: 4, nome: "Consulta de Retorno", valor: "40€", duracao: "20 minutos" },
    { id: 5, nome: "Colposcopia", valor: "90€", duracao: "50 minutos" },
    { id: 6, nome: "Inserção de DIU", valor: "120€", duracao: "60 minutos" },
  ]);

  const [currentService, setCurrentService] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Controla o estado de abertura da sheet

  const handleEdit = (service: any) => {
    setCurrentService(service); // Define o serviço a ser editado
    setIsSheetOpen(true); // Abre a sheet
  };

  const handleDelete = (serviceId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este serviço?");
    if (confirmed) {
      setData((prevData) => prevData.filter((service) => service.id !== serviceId));
    }
  };

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "valor",
      header: "Valor",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "duracao",
      header: "Duração",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button
                onClick={() => handleEdit(row.original)}
                className="text-500 hover:underline"
              >
                <Edit className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500 hover:underline"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </Sheet>
        </div>
      ),
    },
  ];

  return (
    <SidebarProvider>
      {/* Passando o setData para o AppSidebar */}
      <AppSidebar setData={setData} />
      <SidebarInset>
        <Header />
        <main className="p-4">
          <h1 className="text-lg font-bold mb-4">Serviços</h1>
          <DataTable columns={columns} data={data} />
        </main>
      </SidebarInset>

      {/* Sheet com controle para não fechar automaticamente */}
      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{currentService ? "Editar Serviço" : "Novo Serviço"}</SheetTitle>
              <SheetDescription>
                {currentService ? "Faça alterações nas informações do serviço." : "Preencha as informações para criar um novo serviço."}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">Nome</Label>
                <Input
                  id="nome"
                  value={currentService?.nome || ""}
                  onChange={(e) =>
                    setCurrentService((prev: any) => ({
                      ...prev,
                      nome: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="valor" className="text-right">Valor</Label>
                <Input
                  id="valor"
                  value={currentService?.valor || ""}
                  onChange={(e) =>
                    setCurrentService((prev: any) => ({
                      ...prev,
                      valor: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duracao" className="text-right">Duração</Label>
                <Input
                  id="duracao"
                  value={currentService?.duracao || ""}
                  onChange={(e) =>
                    setCurrentService((prev: any) => ({
                      ...prev,
                      duracao: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <Button
                onClick={() => {
                  if (currentService?.id) {
                    setData((prevData) =>
                      prevData.map((item) =>
                        item.id === currentService.id ? { ...currentService } : item
                      )
                    );
                  } else {
                    setData((prevData) => [
                      ...prevData,
                      { ...currentService, id: prevData.length + 1 },
                    ]);
                  }
                  setIsSheetOpen(false);
                  setCurrentService(null); 
                }}
              >
                {currentService ? "Salvar alterações" : "Criar Serviço"}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" onClick={() => setIsSheetOpen(false)}>Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </SidebarProvider>
  );
}
