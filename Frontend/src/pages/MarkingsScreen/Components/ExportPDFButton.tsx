import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";

interface ExportPDFButtonProps {
  dataList: any[];
  utentes: any[]; // <-- Adicione esta linha
  colaboradores: any[];
  servicos: any[];
  statusList: any[];
}

function formatTime(timeStr: string): string {
  if (!timeStr) return "";
  const date = new Date(timeStr);
  return date.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}

export function ExportPDFButton({ dataList, utentes, colaboradores, servicos, statusList }: ExportPDFButtonProps) {
  const handlePrint = () => {
    const doc = new jsPDF();

    const headers = [["ID", "Utente", "Colaborador", "Serviço", "Data", "Hora Início", "Status", "Observações"]];

    const rows = dataList.map((item) => [
      item.id,
      (utentes ?? []).find(u => u.id === item.id_utente)?.nome ?? item.id_utente,
      (colaboradores ?? []).find(c => c.id === item.id_colaborador)?.descricao ?? item.id_colaborador,
      (servicos ?? []).find(s => s.id === item.id_servicos)?.descricao ?? item.id_servicos,
      item.data_agendamento ? new Date(item.data_agendamento).toLocaleDateString() : "N/A",
      formatTime(item.hora_inicio),
      (statusList ?? []).find(st => st.id === item.statusId)?.descricao ?? item.statusId,
      item.observacoes ?? "",
    ]);

    console.log("item.id_utente", dataList.map(item => item.id_utente), "utentes", utentes);
    console.log("item.id_servicos", dataList.map(item => item.id_servicos), "servicos", servicos);

    autoTable(doc, {
      head: headers,
      body: rows,
    });

    doc.save("agendamentos.pdf");
  };

  return (
    <Button onClick={handlePrint}>Imprimir</Button>
  );
}