"use client"

import React from "react";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { useQuery } from "@apollo/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { GET_AGENDAMENTOS } from "@/graphql/queries";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BarComponent() {
  const { data, loading } = useQuery(GET_AGENDAMENTOS);

  // Agrupa marcações por mês
  const chartData = React.useMemo(() => {
    if (!data?.getAgendamentos) return [];
    const counts: Record<string, number> = {};
    data.getAgendamentos.forEach((agendamento: any) => {
      const date = new Date(agendamento.data_agendamento);
      const month = date.toLocaleString("default", { month: "long" });
      counts[month] = (counts[month] || 0) + 1;
    });
    // Ordena os meses corretamente
    const monthOrder = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    return monthOrder
      .filter((m) => counts[m])
      .map((month) => ({
        month,
        Marcações: counts[month],
      }));
  }, [data]);

  if (loading) return <div>Carregando gráfico...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marcações</CardTitle>
        <CardDescription>Marcações por mês</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Marcações" fill="var(--color-black)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total de marcações por mês <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
