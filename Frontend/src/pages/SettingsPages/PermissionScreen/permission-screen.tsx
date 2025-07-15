import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";

import { Edit, Trash2 } from "lucide-react";
import { PermissionForm } from "./permission-form";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PERMISSOES } from "@/graphql/queries";
import { CREATE_PERMISSAO, REMOVE_PERMISSAO, UPDATE_PERMISSAO } from "@/graphql/mutations";
import { useState } from "react";
import CreateMarkingsDialog from "@/pages/MarkingsScreen/create-markings-dialog";

export default function PermissionScreen() {
  const { data, loading } = useQuery(GET_PERMISSOES);
  const [createPermissao] = useMutation(CREATE_PERMISSAO, {
    refetchQueries: [{ query: GET_PERMISSOES }],
  });
  const [removePermissao] = useMutation(REMOVE_PERMISSAO, {
    refetchQueries: [{ query: GET_PERMISSOES }],
  });
  const [updatePermissao] = useMutation(UPDATE_PERMISSAO, {
    refetchQueries: [{ query: GET_PERMISSOES }],
  });
  const [editing, setEditing] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar o diálogo

  const handleCancelEdit = () => setEditing(null);

  const permissions = data?.permissoes ?? [];

  const handleAddPermission = async (descricao: string) => {
    setErrorMsg(null);
    if (editing) {
      await updatePermissao({
        variables: {
          id: editing.id,
          updatePermissoesInput: { descricao },
        },
      });
      setEditing(null);
    } else {
      await createPermissao({
        variables: { createPermissoesInput: { descricao } },
      });
    }
  };

  const handleEdit = (permission: any) => {
    setErrorMsg(null);
    setEditing(permission);
  };

  const handleDelete = async (permissionId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta permissão?");
    if (confirmed) {
      try {
        await removePermissao({ variables: { id: permissionId } });
        setErrorMsg(null);
      } catch (error: any) {
        if (
          error?.message?.includes("Foreign key constraint") ||
          error?.graphQLErrors?.some((e: any) =>
            String(e.message).includes("Foreign key constraint")
          )
        ) {
          alert(
            "Não é possível excluir: permissão está em uso por um colaborador ou outro registro."
          );
        } else {
          alert("Erro ao excluir permissão.");
        }
      }
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

  if (loading) return <div>Carregando permissões...</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header onNovaMarcacao={() => setOpenDialog(true)} /> {/* Botão Nova Marcação */}
        <CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} /> {/* Diálogo de Nova Marcação */}
        <main className="p-4">
          {errorMsg && (
            <div className="mb-4 text-red-600 text-center font-semibold">
              {errorMsg}
            </div>
          )}
          <div className="pb-4 flex justify-center w-full">
            <PermissionForm
              onAddPermission={handleAddPermission}
              initialValues={editing}
              onCancelEdit={handleCancelEdit}
            />
          </div>
          <h1 className="text-lg font-bold mb-4">Permissões do Sistema</h1>
          <DataTable columns={columns} data={permissions} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
