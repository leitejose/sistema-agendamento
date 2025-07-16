import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@apollo/client";
import { GET_COLABORADORES, GET_AGENDAMENTOS } from "@/graphql/queries";
import DataDoctor from "./data-doctors";

export function CardDoctor({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const { data, loading, error } = useQuery(GET_COLABORADORES);
  const {
    data: appointmentsData,
    loading: loadingAppointments,
    error: errorAppointments,
  } = useQuery(GET_AGENDAMENTOS);

  if (loading || loadingAppointments) {
    return <p>Carregando...</p>;
  }

  if (error || errorAppointments) {
    return <p>Erro ao carregar dados dos médicos ou agendamentos.</p>;
  }

  const doctors = data?.colaboradores.filter((colaborador: any) => {
    const hasAppointments = appointmentsData?.getAgendamentos.some(
      (appointment: any) => appointment.id_colaborador === colaborador.id
    );
    return colaborador.cargo.id === 20 && hasAppointments;
  });

  const filteredAppointments = appointmentsData?.getAgendamentos.filter(
    (appointment: any) => {
      const date = new Date(appointment.data_agendamento);
      const start = new Date(startDate + "T00:00:00");
      const end = new Date(endDate + "T23:59:59");
      return date >= start && date <= end;
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marcações por Médicos</CardTitle>
        <CardDescription>Marcações realizadas para cada médico</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {doctors.map((doctor: any) => {
            const appointmentCount = filteredAppointments?.filter(
              (appointment: any) => appointment.id_colaborador === doctor.id
            ).length;

            return (
              <DataDoctor
                key={doctor.id}
                name={doctor.descricao}
                specialty={doctor.cargo.descricao}
                amount={appointmentCount}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}