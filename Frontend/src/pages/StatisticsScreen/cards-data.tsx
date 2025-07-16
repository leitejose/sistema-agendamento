import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AGENDAMENTOS, GET_SERVICOS } from "@/graphql/queries";
import { BadgeEuro, ShoppingCart, UserPlus, Banknote, SquareX } from "lucide-react";
import { parse } from "date-fns";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${
          color || "bg-blue-500"
        } text-white`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
};

// Adicionando lógica para filtrar agendamentos com base no intervalo de datas
export function CardsData({ startDate, endDate }: { startDate: string; endDate: string }) {
  const { data: agendamentosData, loading } = useQuery(GET_AGENDAMENTOS);
  const { data: servicosData } = useQuery(GET_SERVICOS);

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("Agendamentos Data:", agendamentosData?.getAgendamentos);
  console.log("StartDate recebido:", startDate);
  console.log("EndDate recebido:", endDate);
  console.log("Agendamentos recebidos:", agendamentosData?.getAgendamentos);

  const parseDate = (dateString: string) => {
    // Attempt to parse ISO format first
    let parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) return parsedDate;

    // Attempt to parse custom format (e.g., DD/MM/YYYY)
    if (!dateString || typeof dateString !== "string") {
      console.warn("Invalid or undefined date string:", dateString);
      return null;
    }

    parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const filteredAgendamentos = React.useMemo(() => {
    if (!agendamentosData?.getAgendamentos) return [];
    return agendamentosData.getAgendamentos.filter((agendamento: any) => {
      const agendamentoDate = parseDate(agendamento.data_agendamento); // Corrigido para usar o campo correto
      if (!agendamentoDate) {
        console.warn("Invalid date encountered:", agendamento.data_agendamento);
        return false;
      }
      const start = new Date(startDate + "T00:00:00");
      const end = new Date(endDate + "T23:59:59");
      return agendamentoDate >= start && agendamentoDate <= end;
    });
  }, [agendamentosData, startDate, endDate]);

  console.log("Filtered Agendamentos:", filteredAgendamentos);

  // Total em euros
  const totalEuros = React.useMemo(() => {
    if (!filteredAgendamentos || !servicosData?.servicos) return 0;
    return filteredAgendamentos.reduce((sum: number, agendamento: any) => {
      const servico = servicosData.servicos.find((s: any) => s.id === agendamento.id_servicos);
      return sum + (Number(servico?.valor) || 0);
    }, 0);
  }, [filteredAgendamentos, servicosData]);

  const cancelamentos = React.useMemo(() => {
    if (!filteredAgendamentos) return 0;
    return filteredAgendamentos.filter((a: any) => a.statusId === 3).length;
  }, [filteredAgendamentos]);

  const quantidade = React.useMemo(() => {
    return filteredAgendamentos.length;
  }, [filteredAgendamentos]);

  const totalClientes = React.useMemo(() => {
    if (!filteredAgendamentos) return 0;
    const clientesSet = new Set(filteredAgendamentos.map((a: any) => a.id_utente));
    return clientesSet.size;
  }, [filteredAgendamentos]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
      <StatCard
        title="Marcações"
        value={loading ? "..." : quantidade}
        icon={<ShoppingCart size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Taxa de Cancelamento"
        value={loading ? "..." : `${((cancelamentos / quantidade) * 100).toFixed(2)}%`}
        icon={<SquareX size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Clientes"
        value={loading ? "..." : totalClientes}
        icon={<UserPlus size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Total de Receita"
        value={loading ? "..." : `€ ${totalEuros.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={<BadgeEuro size={24} />}
        color="bg-black"
      />
    </div>
  );
}
