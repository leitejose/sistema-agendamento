import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataService from "./data-service";
import { useQuery } from "@apollo/client";
import { GET_AGENDAMENTOS, GET_SERVICOS } from "@/graphql/queries";
import React from "react";

export function CardService({ startDate, endDate }: { startDate: string; endDate: string }) {
  const { data: agendamentosData, loading: loadingAg } = useQuery(GET_AGENDAMENTOS);
  const { data: servicosData, loading: loadingServ } = useQuery(GET_SERVICOS);

  // Monta o total em euros por serviço dentro do intervalo de datas
  const servicosTotais = React.useMemo(() => {
    if (!agendamentosData?.getAgendamentos || !servicosData?.servicos) return [];
    return servicosData.servicos.map((servico: any) => {
      const quantidade = agendamentosData.getAgendamentos.filter((a: any) => {
        const date = new Date(a.data_agendamento);
        const start = new Date(startDate + "T00:00:00");
        const end = new Date(endDate + "T23:59:59");
        return a.id_servicos === servico.id && date >= start && date <= end;
      }).length;
      const total = quantidade * (Number(servico.valor) || 0);
      return {
        id: servico.id,
        descricao: servico.descricao,
        total,
        quantidade,
      };
    }).filter((servico: any) => servico.quantidade > 0); // Só mostra serviços com marcação
  }, [agendamentosData, servicosData, startDate, endDate]);

  if (loadingAg || loadingServ) return <div>Carregando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marcações por serviço</CardTitle>
        <CardDescription>Marcações realizadas filtradas por tipo de serviço</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {servicosTotais.map((servico: any) => (
            <DataService
              key={servico.id}
              service={servico.descricao}
              amount={servico.quantidade}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}