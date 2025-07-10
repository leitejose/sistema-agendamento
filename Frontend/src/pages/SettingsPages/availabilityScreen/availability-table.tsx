import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DisponibilidadeTable({ disponibilidades, colaboradores, diasSemana }: any) {
  // Agrupa as disponibilidades por colaborador
  const disponibilidadesPorColaborador = colaboradores.map((colab: any) => ({
    ...colab,
    disponibilidades: disponibilidades.filter((d: any) => d.id_colaborador === colab.id),
  }));

  function formatHora(hora: any) {
    if (!hora) return "";
    const date = typeof hora === "string" ? new Date(hora) : hora;
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  console.log("disponibilidades:", disponibilidades);
  console.log("colaboradores:", colaboradores);

  return (
    <div className="space-y-8">
      {disponibilidadesPorColaborador.map((colab: any) => (
        <div key={colab.id}>
          <div className="flex items-center gap-4 mb-2">
            {colab.imagem_url && (
              <img
                src={colab.imagem_url}
                alt={colab.descricao}
                className="w-12 h-12 rounded-full object-cover border"
              />
            )}
            <span className="font-bold text-md">{colab.descricao}</span>
          </div>
          <Table className="text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">Dia</TableHead>
                <TableHead className="text-sm">Horário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colab.disponibilidades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground text-sm">
                    Nenhuma disponibilidade cadastrada.
                  </TableCell>
                </TableRow>
              ) : (
                [...colab.disponibilidades]
                  .sort((a, b) => a.dia_da_semana - b.dia_da_semana)
                  .map((disp: any) => (
                    <TableRow key={disp.id}>
                      <TableCell className="text-sm">{diasSemana[disp.dia_da_semana]}</TableCell>
                      <TableCell className="text-sm">
                        {formatHora(disp.hora_inicio)} - {formatHora(disp.hora_fim)}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}