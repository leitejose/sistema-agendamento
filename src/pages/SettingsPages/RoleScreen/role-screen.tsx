import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { RoleForm } from "./role-form";

export default function RoleScreen() {
  const [roles, setRoles] = useState([
    { id: 1, descricao: "Ginecologista" },
    { id: 2, descricao: "Enfermeira Obstétrica" },
    { id: 3, descricao: "Recepcionista" },
    { id: 4, descricao: "Técnico em Enfermagem" },
    { id: 5, descricao: "Auxiliar Administrativo" },
    { id: 6, descricao: "Coordenador de Atendimento" },
    { id: 7, descricao: "Higienista" },
  ]);

  const handleAddRole = (descricao: string) => {
    const newRole = {
      id: roles.length + 1, // Gerar novo ID
      descricao,
    };

    setRoles((prevRoles) => [...prevRoles, newRole]);
  };

  const handleEdit = (role: any) => {
    console.log("Editando função:", role);
  };

  const handleDelete = (roleId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta função?");
    if (confirmed) {
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Código",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
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
            <Edit />
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
            <RoleForm onAddRole={handleAddRole} />
          </div>
          <h1 className="text-lg font-bold mb-4">Funções do Consultório</h1>
          <DataTable columns={columns} data={roles} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
