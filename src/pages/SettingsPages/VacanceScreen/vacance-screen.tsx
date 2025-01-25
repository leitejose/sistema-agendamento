import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { VacanceForm } from "./vacance-form";

export default function SettingsScreen() {
  const [data, setData] = useState([
    { id: 1, colaborador: "João Silva", descricao: "Férias de verão", periodo: "2024-06-01 até 2024-06-30" },
    { id: 2, colaborador: "Maria Oliveira", descricao: "Férias de inverno", periodo: "2024-12-01 até 2024-12-15" },
    // Outros dados...
  ]);

  const handleAddVacance = (vacance: any) => {
    setData((prevData) => [...prevData, vacance]);
  };

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
            <VacanceForm onAddVacance={handleAddVacance} />
          </div>
          <h1 className="text-lg font-bold mb-4">Férias</h1>
          <DataTable columns={columns} data={data} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
