import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DisponibilidadeForm({
  disponibilidade = { colaboradorId: "", dias: [] },
  colaboradores = [],
  onColaboradorChange,
  onChangeHorario,
  onAddHorario,
  onRemoveHorario,
  onSubmit, // <-- Adicione esta prop!
}: any) {
  const diasSemana = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
  ];

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* Select do médico */}
      <select
        className="border rounded p-2 w-full md:w-1/3"
        value={disponibilidade.colaboradorId}
        onChange={(e) => onColaboradorChange(e.target.value)}
      >
        <option value="" disabled>
          Selecione um médico
        </option>
        {colaboradores.map((colab: any) => (
          <option key={colab.id} value={colab.id}>
            {colab.descricao}
          </option>
        ))}
      </select>

      {/* Dias da semana e horários em grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {diasSemana.map((dia, idx) => {
          const horarios = disponibilidade.dias[idx] || [];

          return (
            <div key={idx} className="border rounded p-4 bg-white">
              <div className="font-semibold mb-2">{dia}</div>

              {horarios.length > 0 ? (
                horarios.map((horario: any, hIdx: number) => {
                  const isErro =
                    horario.hora_inicio && horario.hora_fim &&
                    horario.hora_inicio >= horario.hora_fim;

                  return (
                    <div key={hIdx} className="flex items-center gap-2 mb-2">
                      <Input
                        type="time"
                        value={horario.hora_inicio}
                        onChange={(e) =>
                          onChangeHorario(idx, hIdx, "hora_inicio", e.target.value)
                        }
                        className={`w-24 ${isErro ? "border-red-500" : ""}`}
                      />
                      <Input
                        type="time"
                        value={horario.hora_fim}
                        onChange={(e) =>
                          onChangeHorario(idx, hIdx, "hora_fim", e.target.value)
                        }
                        className={`w-24 ${isErro ? "border-red-500" : ""}`}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onRemoveHorario(idx, hIdx)}
                      >
                        🗑️
                      </Button>

                      {hIdx === horarios.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => onAddHorario(idx)}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fechado</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onAddHorario(idx)}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botão para adicionar os horários na tabela */}
      <div className="flex justify-center">
        <Button type="submit" variant="default">
          Salvar Disponibilidade
        </Button>
      </div>
    </form>
  );
}
