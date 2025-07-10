"use client";

import { useQuery, useMutation } from '@apollo/client';
import { GET_SERVICOS } from '@/graphql/queries';
import { DELETE_SERVICO, UPDATE_SERVICO, CREATE_SERVICO } from '@/graphql/mutations';
import { GetServicosData } from '@/graphql/types';
import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { CreateServiceForm } from "./create-services-form";

export default function Page() {
  const { loading, error, data } = useQuery<GetServicosData>(GET_SERVICOS);
  const [dataList, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [editing, setEditing] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [deleteServico] = useMutation(DELETE_SERVICO, {
    onCompleted: (data) => {
      setData((prevData) => prevData.filter((service) => service.id !== data.removeServico.id));
    },
    onError: (error) => {
      console.error("Erro ao excluir serviço:", error);
    },
  });

  const [updateServico] = useMutation(UPDATE_SERVICO, {
    onCompleted: (data) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === data.updateServico.id ? { ...data.updateServico } : item
        )
      );
    },
    onError: (error) => {
      console.error("Erro ao atualizar serviço:", error);
    },
  });

  const [createServico] = useMutation(CREATE_SERVICO, {
    onCompleted: (data) => {
      setData((prevData) => [...prevData, data.createServico]);
    },
    onError: (error) => {
      console.error("Erro ao criar serviço:", error);
    },
  });

  useEffect(() => {
    if (data?.servicos) {
      setData(data.servicos);
    }
  }, [data]);

  useEffect(() => {
    setFilteredData(
      dataList.filter((service) =>
        service.descricao.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, dataList]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (service) => setEditing(service);

  const handleDelete = (serviceId: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este serviço?");
    if (confirmed) {
      deleteServico({ variables: { id: serviceId } });
    }
  };

  const handleSave = (formData) => {
    if (editing?.id) {
      updateServico({
        variables: {
          id: editing.id,
          descricao: formData.descricao,
          valor: parseFloat(formData.valor),
          duracao: parseFloat(formData.duracao),
        },
      });
    } else {
      createServico({
        variables: {
          descricao: formData.descricao,
          valor: parseFloat(formData.valor),
          duracao: parseFloat(formData.duracao),
        },
      });
    }
    setEditing(null);
  };

  const columns = [
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "valor",
      header: "Valor",
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      accessorKey: "duracao",
      header: "Duração",
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
      <AppSidebar setData={setData} setSearchText={setSearchText} dataList={dataList} />
      <SidebarInset>
        <Header />
        <main className="p-4">
          <div className="pb-4 flex justify-center w-full">
            <CreateServiceForm
              initialData={editing}
              onSubmit={handleSave}
              onCancel={() => setEditing(null)}
              setData={setData}
            />
          </div>
          <h1 className="text-lg font-bold mb-4">Serviços</h1>
          <DataTable columns={columns} data={filteredData} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
