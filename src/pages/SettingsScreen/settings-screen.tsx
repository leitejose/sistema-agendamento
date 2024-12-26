import { AppSidebar } from "@/pages/SettingsScreen/app-sidebar-utente-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { VacanceForm } from "./vacance-form";
import { Card } from "@/components/ui/card";

export default function SettingsScreen() {
  const [data, setData] = useState([
    { id: 1, colaborador: "João Silva", descricao: "Férias de verão", periodo: "2024-06-01 até 2024-06-30" },
    { id: 2, colaborador: "Maria Oliveira", descricao: "Férias de inverno", periodo: "2024-12-01 até 2024-12-15" },
    { id: 3, colaborador: "Pedro Costa", descricao: "Férias de Natal", periodo: "2024-12-20 até 2024-12-31" },
    { id: 4, colaborador: "Ana Fernandes", descricao: "Férias na praia", periodo: "2024-07-15 até 2024-08-15" },
    { id: 5, colaborador: "Carlos Sousa", descricao: "Férias de viagem", periodo: "2024-05-10 até 2024-05-20" },
    { id: 6, colaborador: "Sofia Almeida", descricao: "Férias no campo", periodo: "2024-08-01 até 2024-08-10" },
    { id: 7, colaborador: "Miguel Santos", descricao: "Férias no exterior", periodo: "2024-09-05 até 2024-09-25" },
    { id: 8, colaborador: "Beatriz Rocha", descricao: "Férias de descanso", periodo: "2024-10-01 até 2024-10-14" },
    { id: 9, colaborador: "Ricardo Marques", descricao: "Férias de recuperação", periodo: "2024-11-10 até 2024-11-20" },
    { id: 10, colaborador: "Helena Lima", descricao: "Férias de repouso", periodo: "2024-12-05 até 2024-12-25" },
  ]);
  const handleEdit = (vacation: any) => {
    console.log("Editando férias:", vacation);
  };

  const handleDelete = (vacationId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir estas férias?");
    if (confirmed) {
      setData((prevData) => prevData.filter((vacation) => vacation.id !== vacationId));
    }
  };

  const columns = [
    {
      accessorKey: "colaborador",
      header: "Colaborador",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "periodo",
      header: "Período",
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
            <Edit className="" />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:underline"
          >
            <Trash2 />
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
          <div className="pb-4 flex justify-center w-full">
            <VacanceForm />
          </div>
          <h1 className="text-lg font-bold mb-4">Férias</h1>
          <DataTable columns={columns} data={data} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
