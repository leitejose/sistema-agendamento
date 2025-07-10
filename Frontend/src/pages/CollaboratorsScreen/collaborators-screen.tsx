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
      if (!uploadedUrl) return; // Abort if upload failed
      imagem_url = uploadedUrl;
    }

    const payload = {
      descricao: colab.descricao,
      email: colab.email,
      telemovel: colab.telemovel,
      cargoId: Number(colab.cargoId),
      imagem_url,
      senha: colab.senha || undefined,
      cor: colab.cor, // <-- este campo é obrigatório!
    };

    try {
      if (colab.id) {
        await updateColaborador({
          variables: {
            id: colab.id,
            descricao: colab.descricao,
            email: colab.email,
            telemovel: colab.telemovel,
            cargoId: Number(colab.cargoId),
            imagem_url,
            cor: colab.cor, // <-- este campo é obrigatório!
          },
        });
      } else {
        await createColaborador({
          variables: payload,
        });
      }
      setEditing(null);
    } catch (error) {
      alert('Erro ao salvar colaborador');
      console.error(error);
    }
  };

  const handleEdit = (colab) => setEditing(colab);

  const handleDelete = async (id) => {
    console.log('ID enviado para remoção:', id);
    if (confirm("Tem certeza que deseja excluir este colaborador?")) {
      try {
        await deleteColaborador({ variables: { id } });
        setEditing(null); // Limpa edição se estava editando esse colaborador
      } catch (error) {
        alert('Erro ao excluir colaborador');
        console.error('Erro detalhado:', error);
        if (error.networkError && error.networkError.result && error.networkError.result.errors) {
          console.error('GraphQL errors:', error.networkError.result.errors);
        }
      }
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
          <button onClick={() => handleDelete(row.original.id)} className="text-red-500 hover:underline">
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
        <Header />
        <main className="p-4">
          <div className="pb-4 flex justify-center w-full">
            <ColaboradorForm
              initialData={editing}
              onSubmit={handleAddOrEditColaborador}
              onCancel={handleCancelEdit}
            />
          </div>
          <h1 className="text-lg font-bold mb-4">Colaboradores</h1>
          <DataTable columns={columns} data={colaboradores} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
