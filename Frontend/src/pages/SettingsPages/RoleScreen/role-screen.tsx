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
  const { data: cargosData, loading: loadingCargos, error: errorCargos } = useQuery(GET_CARGOS);
  const { data: permissoesData, loading: loadingPerms, error: errorPerms } = useQuery(GET_PERMISSOES);

  const [createCargo] = useMutation(CREATE_CARGO, { refetchQueries: [{ query: GET_CARGOS }] });
  const [updateCargo] = useMutation(UPDATE_CARGO, { refetchQueries: [{ query: GET_CARGOS }] });
  const [removeCargo] = useMutation(REMOVE_CARGO, { refetchQueries: [{ query: GET_CARGOS }] });

  const [cargoEditando, setCargoEditando] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar o diálogo

  if (loadingCargos || loadingPerms) {
    return <div>Carregando...</div>;
  }

  if (errorCargos || errorPerms) {
    return <div>Erro ao carregar dados.</div>;
  }

  const cargos = cargosData?.cargos ?? [];
  const permissoes = permissoesData?.permissoes ?? [];

  const handleAddRole = async ({ descricao, permissoesIds }) => {
    try {
      await createCargo({
        variables: {
          createCargoInput: {
            descricao,
            permissoesIds,
          },
        },
      });
    } catch (error) {
      alert("Erro ao adicionar função.");
    }
  };

  const handleEdit = (cargo) => {
    setCargoEditando(cargo);
  };

  const handleCancelEdit = () => {
    setCargoEditando(null);
  };

  const handleDelete = async (roleId) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta função?");
    if (confirmed) {
      try {
        await removeCargo({ variables: { id: roleId } });
      } catch (error) {
        alert("Erro ao excluir função.");
      }
    }
  };

  const handleUpdateRole = async ({ id, descricao, permissoesIds }) => {
    try {
      await updateCargo({
        variables: {
          id,
          updateCargoInput: {
            descricao,
            permissoesIds,
          },
        },
      });
      setCargoEditando(null);
    } catch (error) {
      alert("Erro ao atualizar função.");
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Código",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
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
