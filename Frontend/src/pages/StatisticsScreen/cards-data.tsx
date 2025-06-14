import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AGENDAMENTOS, GET_SERVICOS } from "@/graphql/queries";
import { BadgeEuro, ShoppingCart, UserPlus, Banknote } from "lucide-react";

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

export function CardsData() {
  const { data: agendamentosData, loading } = useQuery(GET_AGENDAMENTOS);
  const { data: servicosData } = useQuery(GET_SERVICOS);

  // Total em euros
  const totalEuros = React.useMemo(() => {
    if (!agendamentosData?.getAgendamentos || !servicosData?.servicos) return 0;
    return agendamentosData.getAgendamentos.reduce(
      (sum: number, agendamento: any) => {
        const servico = servicosData.servicos.find(
          (s: any) => s.id === agendamento.id_servicos
        );
        return sum + (Number(servico?.valor) || 0);
      },
      0
    );
  }, [agendamentosData, servicosData]);

  // Quantidade total de marcações
  const quantidade = React.useMemo(() => {
    if (!agendamentosData?.getAgendamentos) return 0;
    return agendamentosData.getAgendamentos.length;
  }, [agendamentosData]);

  // Valor médio por marcação
  const valorMedio = React.useMemo(() => {
    if (quantidade === 0) return 0;
    return totalEuros / quantidade;
  }, [totalEuros, quantidade]);

  // Quantidade de serviços diferentes
  const totalServicos = React.useMemo(() => {
    if (!servicosData?.servicos) return 0;
    return servicosData.servicos.length;
  }, [servicosData]);

  // Quantidade de clientes únicos (utentes)
  // Supondo que cada agendamento tem um id_utente
  const totalClientes = React.useMemo(() => {
    if (!agendamentosData?.getAgendamentos) return 0;
    const clientesSet = new Set(agendamentosData.getAgendamentos.map((a: any) => a.id_utente));
    return clientesSet.size;
  }, [agendamentosData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Marcações em Euros"
        value={loading ? "..." : `€ ${totalEuros.toLocaleString("pt-PT")}`}
        icon={<BadgeEuro size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Quantidade de Marcações"
        value={loading ? "..." : quantidade}
        icon={<ShoppingCart size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Valor médio por marcação"
        value={loading ? "..." : `€ ${valorMedio.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={<Banknote size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Clientes únicos"
        value={loading ? "..." : totalClientes}
        icon={<UserPlus size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Serviços diferentes"
        value={loading ? "..." : totalServicos}
        icon={<ShoppingCart size={24} />}
        color="bg-black"
      />
    </div>
  );
}
