import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { PermissionForm } from "./permission-form";
import { CheckboxPermissions } from "../RoleScreen/checkbox-permissions";

export default function PermissionScreen() {
  const [permissions, setPermissions] = useState([
    { id: 1, descricao: "Acesso ao prontuário médico" },
    { id: 2, descricao: "Agendamento de consultas" },
    { id: 3, descricao: "Visualizar relatórios financeiros" },
    { id: 4, descricao: "Gerenciar usuários do sistema" },
    { id: 5, descricao: "Cadastrar novos pacientes" },
    { id: 6, descricao: "Emitir receitas médicas" },
    { id: 7, descricao: "Editar permissões de usuários" },
  ]);

  const handleAddPermission = (descricao: string) => {
    const newPermission = {
      id: permissions.length + 1, // Gera um novo ID
      descricao,
    };
    setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
  };

  const handleEdit = (permission: any) => {
    console.log("Editando permissão:", permission);
  };

  const handleDelete = (permissionId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta permissão?");
    if (confirmed) {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission.id !== permissionId)
      );
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
            <PermissionForm onAddPermission={handleAddPermission} />
          </div>
          <h1 className="text-lg font-bold mb-4">Permissões do Sistema</h1>
          <DataTable columns={columns} data={permissions} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
