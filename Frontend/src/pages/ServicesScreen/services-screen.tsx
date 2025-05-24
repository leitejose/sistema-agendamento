"use client";

import { useQuery, useMutation } from '@apollo/client';
import { GET_SERVICOS } from '@/graphql/queries';
import { DELETE_SERVICO, UPDATE_SERVICO } from '@/graphql/mutations';
import { GetServicosData } from '@/graphql/types';
import { AppSidebar } from "@/pages/ServicesScreen/app-sidebar-services-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState, useEffect } from "react";
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
  const { loading, error, data } = useQuery<GetServicosData>(GET_SERVICOS);
  const [dataList, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentService, setCurrentService] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [deleteServico] = useMutation(DELETE_SERVICO, {
    onCompleted: (data) => {
      setData((prevData) => prevData.filter((service) => service.id !== data.removeServico.id));
    },
    onError: (error) => {
      console.error("Erro ao excluir serviço:", error);
    },
  });

  const [updateServico] = useMutation(UPDATE_SERVICO, {
    onCompleted: (data) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === data.updateServico.id ? { ...data.updateServico } : item
        )
      );
    },
    onError: (error) => {
      console.error("Erro ao atualizar serviço:", error);
    },
  });

  useEffect(() => {
    if (data?.servicos) {
      setData(data.servicos);
    }
  }, [data]);

  useEffect(() => {
    setFilteredData(
      dataList.filter((service) =>
        service.descricao.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, dataList]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (service: any) => {
    setCurrentService(service);
    setIsSheetOpen(true);
  };

  const handleDelete = (serviceId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este serviço?");
    if (confirmed) {
      deleteServico({ variables: { id: serviceId } });
    }
  };

  const handleSave = () => {
    if (currentService?.id) {
      const valor = parseFloat(currentService.valor);  // Converte para float
      const duracao = parseFloat(currentService.duracao); // Converte para float
  
      if (isNaN(valor) || isNaN(duracao)) {
        alert("Por favor, insira valores numéricos válidos para Valor e Duração.");
        return;
      }
  
      updateServico({
        variables: {
          id: currentService.id,
          descricao: currentService.descricao,
          valor: valor,  // Valor convertido para número
          duracao: duracao,  // Duração convertida para número
        },
      });
    } else {
      setData((prevData) => [
        ...prevData,
        { ...currentService, id: prevData.length + 1 },
      ]);
    }
    setIsSheetOpen(false);
    setCurrentService(null);
  };
  
  const columns = [
    {
      accessorKey: "descricao",
      header: "Descrição",
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
      <AppSidebar setData={setData} setSearchText={setSearchText} dataList={dataList} />
      <SidebarInset>
        <Header />
        <main className="p-4">
          <div className="print-header">
            
            <h1 className="text-lg font-bold mb-4">Serviços</h1>
          </div>
          <div className="print-content">
            <DataTable columns={columns} data={filteredData} />
          </div>
        </main>
      </SidebarInset>

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
                <Label htmlFor="descricao" className="text-right">Descrição</Label>
                <Input
                  id="descricao"
                  value={currentService?.descricao || ""}
                  onChange={(e) =>
                    setCurrentService((prev: any) => ({
                      ...prev,
                      descricao: e.target.value,
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
              <Button onClick={handleSave}>
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
