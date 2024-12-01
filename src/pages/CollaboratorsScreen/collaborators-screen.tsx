import { AppSidebar } from "@/pages/CollaboratorsScreen/app-sidebar-collaborators-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export default function Page() {
  const [data, setData] = useState([
    { id: 1, nome: "Dr. João Silva", cargo: "Médico", especialidade: "Pediatria" },
    { id: 2, nome: "Dra. Maria Oliveira", cargo: "Médico", especialidade: "Ginecologia" },
    { id: 3, nome: "Enf. Pedro Costa", cargo: "Enfermeira", especialidade: "" },
    { id: 4, nome: "Enf. Ana Fernandes", cargo: "Enfermeira", especialidade: "" },
    { id: 5, nome: "Carlos Sousa", cargo: "Atendente de Consultório", especialidade: "" },
    { id: 6, nome: "Sofia Almeida", cargo: "Atendente de Consultório", especialidade: "" },
  ]);

  const handleEdit = (colaborador: any) => {
    console.log("Editando colaborador:", colaborador);
    // Aqui você pode abrir um modal para editar as informações
  };

  const handleDelete = (colaboradorId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este colaborador?");
    if (confirmed) {
      setData((prevData) => prevData.filter((colaborador) => colaborador.id !== colaboradorId));
    }
  };

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "cargo",
      header: "Cargo",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "especialidade",
      header: "Especialidade",
      cell: (info: { getValue: () => any }) =>
        info.getValue() || "N/A", // Exibe "N/A" se não houver especialidade
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
          <DataTable columns={columns} data={data} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
