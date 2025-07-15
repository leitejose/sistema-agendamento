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
import { useQuery, useMutation } from "@apollo/client";
import { GET_CARGOS, GET_PERMISSOES } from "@/graphql/queries";
import { CREATE_CARGO, UPDATE_CARGO, REMOVE_CARGO } from "@/graphql/mutations";
import CreateMarkingsDialog from "../../MarkingsScreen/create-markings-dialog";

export default function RoleScreen() {
  const { data: cargosData, loading: loadingCargos } = useQuery(GET_CARGOS);
  const { data: permissoesData, loading: loadingPerms } = useQuery(GET_PERMISSOES);

  const [createCargo] = useMutation(CREATE_CARGO, { refetchQueries: [{ query: GET_CARGOS }] });
  const [updateCargo] = useMutation(UPDATE_CARGO, { refetchQueries: [{ query: GET_CARGOS }] });
  const [removeCargo] = useMutation(REMOVE_CARGO, { refetchQueries: [{ query: GET_CARGOS }] });

  const cargos = cargosData?.cargos ?? [];
  const permissoes = permissoesData?.permissoes ?? [];

  const [cargoEditando, setCargoEditando] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar o diálogo

  const handleAddRole = async ({ descricao, permissoesIds }) => {
    await createCargo({
      variables: {
        createCargoInput: {
          descricao,
          permissoesIds,
        },
      },
    });
  };

  const handleEdit = (cargo) => {
    setCargoEditando(cargo);
  };

  const handleCancelEdit = () => {
    setCargoEditando(null);
  };

  const handleDelete = async (roleId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta função?");
    if (confirmed) {
      try {
        await removeCargo({ variables: { id: roleId } });
      } catch (error: any) {
        alert("Erro ao excluir função.");
      }
    }
  };

  const handleUpdateRole = async ({ id, descricao, permissoesIds }) => {
    await updateCargo({
      variables: {
        id, // id separado
        updateCargoInput: {
          descricao,
          permissoesIds,
        },
      },
    });
    setCargoEditando(null); // Limpa o estado de edição após atualizar
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
        <Header onNovaMarcacao={() => setOpenDialog(true)} /> {/* Botão Nova Marcação */}
        <CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} /> {/* Diálogo de Nova Marcação */}
        <main className="p-4">
          <div className="pb-4 flex justify-center w-full">
            <RoleForm
              onAddRole={handleAddRole}
              onUpdateRole={handleUpdateRole}
              onCancelEdit={handleCancelEdit}
              permissoes={permissoes}
              cargoEditando={cargoEditando}
            />
          </div>
          <h1 className="text-lg font-bold mb-4">Funções do Consultório</h1>
          <DataTable columns={columns} data={cargos} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
