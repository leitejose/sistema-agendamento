import { AppSidebar } from "@/pages/SettingsPages/app-sidebar-utente-screen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { VacanceForm } from "./vacance-form";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FERIAS, GET_COLABORADORES } from "@/graphql/queries";
import { CREATE_FERIAS, REMOVE_FERIAS, UPDATE_FERIAS } from "@/graphql/mutations";
import { format, parseISO } from "date-fns";
import CreateMarkingsDialog from "../../MarkingsScreen/create-markings-dialog";

export default function SettingsScreen() {
	const { data: colaboradoresData, loading: loadingColaboradores } = useQuery(GET_COLABORADORES);
	const { data: feriasData, loading: loadingFerias } = useQuery(GET_FERIAS);
	const [createFerias] = useMutation(CREATE_FERIAS, {
		refetchQueries: [{ query: GET_FERIAS }],
	});
	const [removeFerias] = useMutation(REMOVE_FERIAS, {
		refetchQueries: [{ query: GET_FERIAS }],
	});
	const [updateFerias] = useMutation(UPDATE_FERIAS, {
		refetchQueries: [{ query: GET_FERIAS }],
	});
	const [editing, setEditing] = useState<any | null>(null);
	const [openDialog, setOpenDialog] = useState(false); // Estado para controlar o diálogo

	const colaboradores = colaboradoresData?.colaboradores ?? [];
	const ferias = feriasData?.ferias ?? [];

	const handleAddVacance = async (vacance: any) => {
		await createFerias({
			variables: {
				data: {
					descricao: vacance.descricao,
					data_inicio: vacance.data_inicio,
					data_fim: vacance.data_fim,
					colaborador_id: Number(vacance.colaborador),
				},
			},
		});
	};

	const handleEdit = (vacation: any) => {
		setEditing(vacation);
	};

	const handleSaveEdit = async (vacance: any) => {
		await updateFerias({
			variables: {
				data: {
					id: vacance.id,
					descricao: vacance.descricao,
					data_inicio: vacance.data_inicio,
					data_fim: vacance.data_fim,
					colaborador_id: Number(vacance.colaborador_id),
				},
			},
		});
		setEditing(null);
	};

	const handleDelete = async (vacationId: number) => {
		const confirmed = confirm("Tem certeza que deseja excluir estas férias?");
		if (confirmed) {
			await removeFerias({ variables: { id: vacationId } });
		}
	};

	const columns = [
		{
			accessorKey: "colaborador_id",
			header: "Colaborador",
			cell: (info: any) => {
				const colab = colaboradores.find(c => String(c.id) === String(info.getValue()));
				return colab ? colab.descricao : "-";
			},
		},
		{
			accessorKey: "descricao",
			header: "Descrição",
			cell: (info: { getValue: () => any }) => info.getValue(),
		},
		{
			id: "periodo",
			header: "Período",
			cell: ({ row }: { row: { original: any } }) =>
				`${format(parseISO(row.original.data_inicio), "dd/MM/yyyy")} até ${format(parseISO(row.original.data_fim), "dd/MM/yyyy")}`,
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

	if (loadingColaboradores || loadingFerias) return <div>Carregando...</div>;

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header onNovaMarcacao={() => setOpenDialog(true)} /> {/* Botão Nova Marcação */}
				<CreateMarkingsDialog open={openDialog} onOpenChange={setOpenDialog} /> {/* Diálogo de Nova Marcação */}
				<main className="p-4">
					<div className="pb-4 flex justify-center w-full">
						<VacanceForm
							onAddVacance={editing ? handleSaveEdit : handleAddVacance}
							colaboradores={colaboradores}
							initialValues={editing}
						/>
					</div>
					<h1 className="text-lg font-bold mb-4">Férias</h1>
					<DataTable columns={columns} data={ferias} />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
