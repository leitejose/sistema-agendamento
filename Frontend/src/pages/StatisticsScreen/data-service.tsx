import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_AGENDAMENTOS, GET_SERVICOS } from "@/graphql/queries";

interface ProfileCardProps {
  service: string;
  amount: number;
}

const DataService: React.FC<ProfileCardProps> = ({ service, amount }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{ flex: 1 }}>
        <h2>{service}</h2>
      </div>
      <div
        style={{
          textAlign: 'center',
          minWidth: '50px',
        }}
      >
        <h2>{amount.toLocaleString("pt-PT", { minimumFractionDigits: 2 })} €</h2>
      </div>
    </div>
  );
};

export function CardService() {
  const { data: agendamentosData, loading: loadingAg } = useQuery(GET_AGENDAMENTOS);
  const { data: servicosData, loading: loadingServ } = useQuery(GET_SERVICOS);

  // Monta o total em euros por serviço
  const servicosTotais = React.useMemo(() => {
    if (!agendamentosData?.getAgendamentos || !servicosData?.servicos) return [];
    return servicosData.servicos.map((servico: any) => {
      const quantidade = agendamentosData.getAgendamentos.filter(
        (a: any) => a.id_servicos === servico.id
      ).length;
      const total = quantidade * (Number(servico.valor) || 0);
      return {
        id: servico.id,
        descricao: servico.descricao,
        total,
        quantidade,
      };
    })
    // Só mostra serviços com pelo menos 1 marcação
    .filter((servico: any) => servico.quantidade > 0);
  }, [agendamentosData, servicosData]);

  if (loadingAg || loadingServ) return <div>Carregando...</div>;

  return (
    <div>
      {servicosTotais.map((servico: any) => (
        <DataService
          key={servico.id}
          service={servico.descricao}
          amount={servico.total}
        />
      ))}
    </div>
  );
}

export default DataService;









