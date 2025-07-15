import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

export function DisponibilidadeTable({ disponibilidades, colaboradores, diasSemana, onEdit, onDelete }: any) {
  // Agrupa as disponibilidades por colaborador
  const disponibilidadesPorColaborador = colaboradores.map((colab: any) => ({
    ...colab,
    disponibilidades: disponibilidades.filter((d: any) => d.id_colaborador === colab.id),
  }));

  function formatHora(hora: any) {
    if (!hora) return "";
    // Se vier como "1970-01-01T14:00:00.000Z", pega só HH:mm
    if (typeof hora === "string" && hora.length >= 16) {
      return hora.slice(11, 16);
    }
    return hora; // Se já for string HH:mm
  }

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
                <TableHead className="text-sm">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colab.disponibilidades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground text-sm">
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
                      <TableCell className="text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => onEdit && onEdit(disp)}
                            className="text-500 hover:underline"
                          >
                            <Edit />
                          </button>
                          <button
                            onClick={() => onDelete && onDelete(disp.id)}
                            className="text-red-500 hover:underline"
                          >
                            <Trash2 />
                          </button>
                        </div>
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