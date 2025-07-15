import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { ColaboradorForm } from "./create-collaborators-dialog";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COLABORADORES } from "@/graphql/queries";
import { CREATE_COLABORADOR, DELETE_COLABORADOR, UPDATE_COLABORADOR } from "@/graphql/mutations";
import { ConfirmDialog } from "@/components/alert-dialog-remove";
import CreateMarkingsDialog from "@/pages/MarkingsScreen/create-markings-dialog";

export default function ColaboradoresScreen() {
  const { data, loading } = useQuery(GET_COLABORADORES);
  const [createColaborador] = useMutation(CREATE_COLABORADOR, {
    refetchQueries: [{ query: GET_COLABORADORES }],
  });
  const [deleteColaborador] = useMutation(DELETE_COLABORADOR, {
    refetchQueries: [{ query: GET_COLABORADORES }],
  });
  const [updateColaborador] = useMutation(UPDATE_COLABORADOR, {
    refetchQueries: [{ query: GET_COLABORADORES }],
  });
  const [editing, setEditing] = useState(null);
  const [colaboradorParaRemover, setColaboradorParaRemover] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const colaboradores = data?.colaboradores ?? [];

  // Função para upload da imagem
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload falhou');
      const json = await response.json();
      return json.url; // URL retornada pelo backend
    } catch (error) {
      alert('Erro ao fazer upload da imagem');
      console.error(error);
      return null;
    }
  };

  // Função unificada para criar ou atualizar colaborador com upload da imagem
  const handleAddOrEditColaborador = async (colab: any) => {
    let imagem_url = colab.imagem_url;

    if (colab.imagem_file) {
      const uploadedUrl = await uploadImage(colab.imagem_file);
      if (!uploadedUrl) return { success: false, message: "Erro ao fazer upload da imagem." };
      imagem_url = uploadedUrl;
    }

    const payload = {
      descricao: colab.descricao,
      email: colab.email,
      telemovel: colab.telemovel,
      cargoId: Number(colab.cargoId),
      imagem_url,
      senha: colab.senha || undefined,
      cor: colab.cor,
    };

    try {
      if (colab.id) {
        await updateColaborador({ variables: { ...payload, id: colab.id } });
        return { success: true };
      } else {
        await createColaborador({ variables: payload });
        return { success: true };
      }
    } catch (error: any) {
      let msg = "Erro ao salvar colaborador";
      if (error?.graphQLErrors?.[0]?.message) {
        const backendMsg = error.graphQLErrors[0].message;
        // Personalize para erro de e-mail duplicado
        if (
          backendMsg.includes("Unique constraint failed") ||
          backendMsg.includes("IDX_2c7cab1392c28313e5880d941b")
        ) {
          msg = "Já existe um colaborador cadastrado com este e-mail.";
        } else {
          msg = backendMsg;
        }
      } else if (error?.message) {
        msg = error.message;
      }
      return { success: false, message: msg };
    }
  };

  const handleEdit = (colab) => {
    setEditing({
      ...colab,
      cargoId: colab.cargo?.id ? String(colab.cargo.id) : "",
      imagem_url: colab.imagem_url || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteColaborador({ variables: { id } });
      setEditing(null); // Limpa edição se estava editando esse colaborador
    } catch (error) {
      // Se quiser mostrar erro, use setError ou um toast, não alert!
      console.error('Erro ao excluir colaborador:', error);
      // Exemplo: setError("Erro ao excluir colaborador");
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const columns = [
    {
      accessorKey: "imagem_url",
      header: "Foto",
      cell: ({ row }) => {
        console.log("Caminho da imagem:", row.original.imagem_url);
        return row.original.imagem_url ? (
          <img
            src={
              row.original.imagem_url.startsWith("http")
                ? row.original.imagem_url
                : `http://localhost:3000${row.original.imagem_url}`
            }
            alt={row.original.descricao}
            className="w-12 h-12 rounded-full object-cover border"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
            <span>?</span>
          </div>
        );
      },
    },
    { accessorKey: "descricao", header: "Nome" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "telemovel", header: "Telemóvel" },
    {
      accessorKey: "cargo",
      header: "Cargo",
      cell: (info) => info.row.original.cargo?.descricao || "-",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(row.original)} className="text-500 hover:underline">
            <Edit />
          </button>
          <button onClick={() => setColaboradorParaRemover(row.original.id)} className="text-red-500 hover:underline">
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Carregando...</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header onNovaMarcacao={() => setOpenDialog(true)} />
        <CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} />
        <main className="p-4">
          <div className="pb-4 flex justify-center w-full">
            <ColaboradorForm
             key={editing ? editing.id : "new"}// <-- força recriação sempre que cadastrar ou editar/cancelar
              initialData={editing}
              onSubmit={handleAddOrEditColaborador}
              onCancel={handleCancelEdit}
            />
          </div>
          <h1 className="text-lg font-bold mb-4">Colaboradores</h1>
          <DataTable columns={columns} data={colaboradores} />
        </main>
      </SidebarInset>
      <ConfirmDialog
        open={!!colaboradorParaRemover}
        title="Excluir colaborador?"
        description="Tem certeza que deseja excluir este colaborador? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={async () => {
          if (colaboradorParaRemover) {
            await handleDelete(colaboradorParaRemover);
            setColaboradorParaRemover(null);
          }
        }}
        onCancel={() => setColaboradorParaRemover(null)}
      />
    </SidebarProvider>
  );
}
