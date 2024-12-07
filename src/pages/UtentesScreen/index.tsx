import { AppSidebar } from "@/pages/UtentesScreen/app-sidebar-utente-screen";
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
    { id: 1, nome: "João Silva", telemovel: "912345678", email: "joao.silva@example.com" },
    { id: 2, nome: "Maria Oliveira", telemovel: "913456789", email: "maria.oliveira@example.com" },
    { id: 3, nome: "Pedro Costa", telemovel: "914567890", email: "pedro.costa@example.com" },
    { id: 4, nome: "Ana Fernandes", telemovel: "915678901", email: "ana.fernandes@example.com" },
    { id: 5, nome: "Carlos Sousa", telemovel: "916789012", email: "carlos.sousa@example.com" },
    { id: 6, nome: "Sofia Almeida", telemovel: "917890123", email: "sofia.almeida@example.com" },
    { id: 7, nome: "Miguel Santos", telemovel: "918901234", email: "miguel.santos@example.com" },
    { id: 8, nome: "Beatriz Rocha", telemovel: "919012345", email: "beatriz.rocha@example.com" },
    { id: 9, nome: "Ricardo Marques", telemovel: "910123456", email: "ricardo.marques@example.com" },
    { id: 10, nome: "Helena Lima", telemovel: "911234567", email: "helena.lima@example.com" },
  ]);

  
  const handleEdit = (user: any) => {
    console.log("Editando usuário:", user);
    
  };

  
  const handleDelete = (userId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmed) {
      setData((prevData) => prevData.filter((user) => user.id !== userId));
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
          <h1 className="text-lg font-bold mb-4">Utentes</h1>
          <DataTable columns={columns} data={data} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
