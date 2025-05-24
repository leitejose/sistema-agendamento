import { useQuery, useMutation } from '@apollo/client';
import { DELETE_COLABORADOR, UPDATE_COLABORADOR } from '@/graphql/mutations';
import { GET_COLABORADORES } from '@/graphql/queries';
import { AppSidebar } from "@/pages/CollaboratorsScreen/app-sidebar-collaborators-screen";
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
} from "@/components/ui/sheet";
import CreateCollaboratorsDialog from "./create-collaborators-dialog";

export default function Page() {
  const { loading, error, data } = useQuery(GET_COLABORADORES);
  const [dataList, setData] = useState<any[]>([]);
  const [currentColaborador, setCurrentColaborador] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [deleteColaborador] = useMutation(DELETE_COLABORADOR, {
    onCompleted: (data) => {
      const removedColaborador = data.removeColaborador;
      if (removedColaborador) {
        setData((prevData) =>
          prevData.filter((colaborador) => colaborador.id !== removedColaborador.id)
        );
        console.log("Colaborador excluído com sucesso:", removedColaborador.id);
      }
    },
    onError: (error) => {
      console.error("Erro ao excluir colaborador:", error);
    },
  });
  
  const handleDelete = async (colaboradorId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este colaborador?");
    if (confirmed) {
      try {
        const response = await deleteColaborador({
          variables: { id: colaboradorId },
        });
        console.log("Resposta da exclusão:", response.data);
      } catch (error) {
        console.error("Erro ao excluir colaborador:", error);
      }
    }
  };

  const [updateColaborador] = useMutation(UPDATE_COLABORADOR, {
    onCompleted: (data) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === data.updateColaborador.id ? { ...data.updateColaborador } : item
        )
      );
    },
    onError: (error) => {
      console.error("Erro ao atualizar colaborador:", error);
    },
  });

  useEffect(() => {
    if (data?.colaboradores) {
      setData(data.colaboradores);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (colaborador: any) => {
    setCurrentColaborador(colaborador);
    setIsSheetOpen(true);
  };

  const handleSave = async () => {
    if (currentColaborador?.id) {
      // Atualizar colaborador existente
      try {
        await updateColaborador({
          variables: {
            id: currentColaborador.id,
            descricao: currentColaborador.descricao,
            email: currentColaborador.email,
            telemovel: currentColaborador.telemovel,
            cargoId: parseInt(currentColaborador.cargoId, 10),
            permissaoId: parseInt(currentColaborador.permissaoId, 10),
          },
        });
        setIsSheetOpen(false);
      } catch (error) {
        console.error("Erro ao atualizar colaborador:", error);
      }
    } else {
      // Criar novo colaborador
      try {
        await createColaborador({
          variables: {
            descricao: currentColaborador.descricao,
            email: currentColaborador.email,
            telemovel: currentColaborador.telemovel,
            cargoId: parseInt(currentColaborador.cargoId, 10),
            permissaoId: parseInt(currentColaborador.permissaoId, 10),
            senha: currentColaborador.senha || "senha123", // Adicione uma senha padrão se necessário
          },
        });
        setIsSheetOpen(false);
      } catch (error) {
        console.error("Erro ao salvar colaborador:", error);
      }
    }
  };

  const columns = [
    {
      accessorKey: "descricao",
      header: "Nome",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "cargo.descricao", // Acesse a descrição do cargo
      header: "Cargo",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "permissao.descricao", // Acesse a descrição da permissão
      header: "Permissão",
      cell: ({ row }: { row: { original: any } }) =>
        row.original.permissao?.descricao || "Sem Permissão",
    },
    {
      accessorKey: "telemovel",
      header: "Telemóvel",
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
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:underline"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="p-4">
          <h1 className="text-lg font-bold mb-4">Colaboradores</h1>
          <button onClick={() => setIsDialogOpen(true)}>Novo Colaborador</button>
          <CreateCollaboratorsDialog
            setData={setData} // Passa a função para atualizar a lista de colaboradores
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
          <DataTable columns={columns} data={dataList} />
        </main>
      </SidebarInset>

      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{currentColaborador ? "Editar Colaborador" : "Novo Colaborador"}</SheetTitle>
              <SheetDescription>
                {currentColaborador ? "Faça alterações nas informações do colaborador." : "Preencha as informações para criar um novo colaborador."}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">Nome</Label>
                <Input
                  id="descricao"
                  value={currentColaborador?.descricao || ""}
                  onChange={(e) =>
                    setCurrentColaborador((prev: any) => ({
                      ...prev,
                      descricao: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  value={currentColaborador?.email || ""}
                  onChange={(e) =>
                    setCurrentColaborador((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_cargo" className="text-right">Cargo</Label>
                <select
                  id="id_cargo"
                  value={currentColaborador?.id_cargo || ""}
                  onChange={(e) =>
                    setCurrentColaborador((prev: any) => ({
                      ...prev,
                      id_cargo: e.target.value,
                    }))
                  }
                  className="col-span-3 border rounded p-2"
                >
                  <option value="">Selecione um cargo</option>
                  {data?.cargos?.map((cargo: any) => (
                    <option key={cargo.id} value={cargo.id}>
                      {cargo.descricao}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_permissao" className="text-right">Permissão</Label>
                <select
                  id="id_permissao"
                  value={currentColaborador?.id_permissao || ""}
                  onChange={(e) =>
                    setCurrentColaborador((prev: any) => ({
                      ...prev,
                      id_permissao: e.target.value,
                    }))
                  }
                  className="col-span-3 border rounded p-2"
                >
                  <option value="">Selecione uma permissão</option>
                  {data?.permissoes?.map((permissao: any) => (
                    <option key={permissao.id} value={permissao.id}>
                      {permissao.descricao}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telemovel" className="text-right">Telemóvel</Label>
                <Input
                  id="telemovel"
                  value={currentColaborador?.telemovel || ""}
                  onChange={(e) =>
                    setCurrentColaborador((prev: any) => ({
                      ...prev,
                      telemovel: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
             
            </div>
            <SheetFooter>
              <Button onClick={handleSave}>
                {currentColaborador ? "Salvar alterações" : "Criar Colaborador"}
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