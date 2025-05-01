import { useQuery, useMutation } from '@apollo/client';
import { GET_AGENDAMENTOS, DELETE_AGENDAMENTO, UPDATE_AGENDAMENTO } from '@/graphql/mutations';
import { AppSidebar } from "@/pages/MarkingsScreen/app-sidebar-markings-screen";
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
import { z } from "zod";

const agendamentoSchema = z.object({
  id_utente: z.string().nonempty("O ID do utente é obrigatório."),
  id_colaborador: z.string().nonempty("O ID do colaborador é obrigatório."),
  id_servicos: z.string().nonempty("O ID do serviço é obrigatório."),
  data_agendamento: z.string().nonempty("A data do agendamento é obrigatória."),
  hora_inicio: z.string().nonempty("A hora de início é obrigatória."),
  hora_fim: z.string().optional(),
  status: z.string().nonempty("O status é obrigatório."),
  observacoes: z.string().optional(),
});

export default function Page() {
  const { loading, error, data } = useQuery(GET_AGENDAMENTOS);
  const [dataList, setData] = useState<any[]>([]);
  const [currentAgendamento, setCurrentAgendamento] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [deleteAgendamento] = useMutation(DELETE_AGENDAMENTO, {
    onCompleted: (data) => {
      setData((prevData) => prevData.filter((agendamento) => agendamento.id !== data.removeAgendamento.id));
    },
    onError: (error) => {
      console.error("Erro ao excluir agendamento:", error);
    },
  });

  const [updateAgendamento] = useMutation(UPDATE_AGENDAMENTO, {
    onCompleted: (data) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === data.updateAgendamento.id ? { ...data.updateAgendamento } : item
        )
      );
    },
    onError: (error) => {
      console.error("Erro ao atualizar agendamento:", error);
    },
  });

  useEffect(() => {
    if (data?.getAgendamentos) {
      setData(data.getAgendamentos);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (agendamento: any) => {
    setCurrentAgendamento(agendamento);
    setIsSheetOpen(true);
  };

  const handleDelete = (agendamentoId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este agendamento?");
    if (confirmed) {
      deleteAgendamento({ variables: { id: agendamentoId } });
    }
  };

  const handleSave = () => {
    try {
      // Validação com Zod
      agendamentoSchema.parse({
        id_utente: currentAgendamento?.id_utente || "",
        id_colaborador: currentAgendamento?.id_colaborador || "",
        id_servicos: currentAgendamento?.id_servicos || "",
        data_agendamento: currentAgendamento?.data_agendamento || "",
        hora_inicio: currentAgendamento?.hora_inicio || "",
        hora_fim: currentAgendamento?.hora_fim || "",
        status: currentAgendamento?.status || "",
        observacoes: currentAgendamento?.observacoes || "",
      });

      // Se passar na validação, salva ou atualiza o agendamento
      if (currentAgendamento?.id) {
        updateAgendamento({
          variables: {
            id: currentAgendamento.id,
            id_utente: currentAgendamento.id_utente,
            id_colaborador: currentAgendamento.id_colaborador,
            id_servicos: currentAgendamento.id_servicos,
            data_agendamento: currentAgendamento.data_agendamento,
            hora_inicio: currentAgendamento.hora_inicio,
            hora_fim: currentAgendamento.hora_fim,
            status: currentAgendamento.status,
            observacoes: currentAgendamento.observacoes,
          },
        });
      } else {
        setData((prevData) => [
          ...prevData,
          { ...currentAgendamento, id: prevData.length + 1 },
        ]);
      }

      setIsSheetOpen(false);
      setCurrentAgendamento(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join("\n"));
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  };

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "id_utente", header: "ID Utente" },
    { accessorKey: "id_colaborador", header: "ID Colaborador" },
    { accessorKey: "id_servicos", header: "ID Serviço" },
    { accessorKey: "data_agendamento", header: "Data", cell: (info) => new Date(info.getValue()).toLocaleDateString() },
    { accessorKey: "hora_inicio", header: "Hora Início", cell: (info) => new Date(info.getValue()).toLocaleTimeString() },
    { accessorKey: "hora_fim", header: "Hora Fim", cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleTimeString() : "-" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "observacoes", header: "Observações" },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-500 hover:underline"
            aria-label="Editar agendamento"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:underline"
            aria-label="Excluir agendamento"
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
          <h1 className="text-lg font-bold mb-4">Agendamentos</h1>
          <DataTable columns={columns} data={dataList} />
        </main>
      </SidebarInset>

      {isSheetOpen && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{currentAgendamento ? "Editar Agendamento" : "Novo Agendamento"}</SheetTitle>
              <SheetDescription>
                {currentAgendamento ? "Faça alterações nas informações do agendamento." : "Preencha as informações para criar um novo agendamento."}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_utente" className="text-right">ID Utente</Label>
                <Input
                  id="id_utente"
                  value={currentAgendamento?.id_utente || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      id_utente: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_colaborador" className="text-right">ID Colaborador</Label>
                <Input
                  id="id_colaborador"
                  value={currentAgendamento?.id_colaborador || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      id_colaborador: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_servicos" className="text-right">ID Serviço</Label>
                <Input
                  id="id_servicos"
                  value={currentAgendamento?.id_servicos || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      id_servicos: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="data_agendamento" className="text-right">Data</Label>
                <Input
                  id="data_agendamento"
                  type="date"
                  value={currentAgendamento?.data_agendamento || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      data_agendamento: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hora_inicio" className="text-right">Hora Início</Label>
                <Input
                  id="hora_inicio"
                  type="time"
                  value={currentAgendamento?.hora_inicio || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      hora_inicio: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hora_fim" className="text-right">Hora Fim</Label>
                <Input
                  id="hora_fim"
                  type="time"
                  value={currentAgendamento?.hora_fim || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      hora_fim: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Input
                  id="status"
                  value={currentAgendamento?.status || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="observacoes" className="text-right">Observações</Label>
                <Input
                  id="observacoes"
                  value={currentAgendamento?.observacoes || ""}
                  onChange={(e) =>
                    setCurrentAgendamento((prev: any) => ({
                      ...prev,
                      observacoes: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooter>
              <Button onClick={handleSave}>
                {currentAgendamento ? "Salvar alterações" : "Criar Agendamento"}
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
