import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_UTENTE, DELETE_UTENTE } from "@/graphql/mutations";
import { GET_UTENTES } from "@/graphql/queries";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";

import CreateUtentesForm from "./create-utente-dialog";
import { FaFileContract } from "react-icons/fa";
import CreateMarkingsDialog from "../MarkingsScreen/create-markings-dialog";

export default function Page() {
  const { loading, error, data } = useQuery(GET_UTENTES);
  const [updateUtente] = useMutation(UPDATE_UTENTE);
  const [removeUtente] = useMutation(DELETE_UTENTE);

  const [editingUtente, setEditingUtente] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telemovel: "",
    morada: "",
    distrito: "",
    concelho: "",
    codigo_postal: "",
    pais: "Portugal",
  });

  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar o diálogo

  useEffect(() => {
    if (data?.utentes) {
      const filtered = data.utentes.filter(
        (utente: any) =>
          utente.nome.toLowerCase().includes(searchText.toLowerCase()) ||
          utente.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchText]);

  const handleEdit = (utente: any) => {
    setEditingUtente(utente);
    setFormData({
      nome: utente.nome || "",
      email: utente.email || "",
      telemovel: utente.telemovel || "",
      morada: utente.morada || "",
      distrito: utente.distrito || "",
      concelho: utente.concelho || "",
      codigo_postal: utente.codigo_postal || "",
      pais: utente.pais || "Portugal",
    });
  };
  const handlePrintSignature = (utenteId: number) => {
    if (!utenteId) {
      alert("ID do utente inválido!");
      return;
    }
    window.open(`/pdf-cliente/${utenteId}`, "_blank");
  };

  const handleDeleteUtente = async (utenteId: number) => {
    if (!utenteId) {
      alert("ID do utente inválido!");
      return;
    }
    const confirmed = confirm("Tem certeza que deseja excluir este utente?");
    if (confirmed) {
      try {
        const { data } = await removeUtente({
          variables: { id: utenteId },
          refetchQueries: [{ query: GET_UTENTES }],
        });
        console.log("Utente removido:", data.removeUtente);
        alert("Utente removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover utente:", error);
        alert("Erro ao remover utente.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUtente) {
      // Atualizar utente
      try {
        await updateUtente({
          variables: {
            id: parseInt(editingUtente.id, 10),
            updateUtenteInput: {
              ...formData,
              telemovel: formData.telemovel.toString(),
              codigo_postal: formData.codigo_postal.toString(),
            },
          },
          refetchQueries: [{ query: GET_UTENTES }],
        });
        handleCancelEdit();
        alert("Utente alterado com sucesso!");
      } catch (error) {
        alert("Erro ao alterar utente.");
        console.error(error);
      }
    } else {
      // Criar novo utente
      try {
        await createUtente({
          variables: { data: formData },
          refetchQueries: [{ query: GET_UTENTES }],
        });
        setFormData({
          nome: "",
          email: "",
          telemovel: "",
          morada: "",
          distrito: "",
          concelho: "",
          codigo_postal: "",
          pais: "Portugal",
        });
        alert("Utente criado com sucesso!");
      } catch (error) {
        alert("Erro ao criar utente.");
        console.error(error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUtente(null);
    setFormData({
      nome: "",
      email: "",
      telemovel: "",
      morada: "",
      distrito: "",
      concelho: "",
      codigo_postal: "",
      pais: "Portugal",
    });
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Nº do Utente",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
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
            aria-label="Editar utente"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDeleteUtente(row.original.id)}
            className="text-red-500 hover:underline"
            aria-label="Excluir utente"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => handlePrintSignature(row.original.id)}
            className="text-gray- hover:underline"
            aria-label="Imprimir termo de assinatura"
          >
            <FaFileContract className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar utentes: {error.message}</p>;

  return (
    <SidebarProvider>
      <AppSidebar setSearchText={setSearchText} />
      <SidebarInset>
        <Header onNovaMarcacao={() => setOpenDialog(true)} /> {/* Botão Nova Marcação */}
        <CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} /> {/* Diálogo de Nova Marcação */}
        <main className="p-4">
          <div className="flex flex-col gap-6">
            <CreateUtentesForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              editingUtente={editingUtente}
              onCancelEdit={handleCancelEdit}
            />
            <div>
              <h1 className="text-lg font-bold mb-4">Utentes</h1>
              <DataTable columns={columns} data={filteredData} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
