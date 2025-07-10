import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { DialogDetalhesConsulta } from "./DialogDetalhesConsulta";
import  EditMarkingsDialog from "../pages/MarkingsScreen/edit-marking-dialog";

function getStatusColor(statusId: number, statusData: any) {
  const status = statusData?.statusAgendamentos?.find((s: any) => s.id === statusId);
  return status?.cor || "#1976d2";
}

export function DayMarkingsSheet({
  open,
  onOpenChange,
  date,
  agendamentos,
  utentesData,
  colaboradoresData,
  servicosData,
  statusData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
  agendamentos: any[];
  utentesData: any;
  colaboradoresData: any;
  servicosData: any;
  statusData: any;
}) {
  if (!date) return null;

  const markingsOfDay = agendamentos?.filter((agendamento: any) => {
    const agendamentoDate = new Date(agendamento.data_agendamento);
    return (
      agendamentoDate.getFullYear() === date.getFullYear() &&
      agendamentoDate.getMonth() === date.getMonth() &&
      agendamentoDate.getDate() === date.getDate()
    );
  }) ?? [];

  // Ordena por hora de início
  markingsOfDay.sort((a: any, b: any) =>
    a.hora_inicio.localeCompare(b.hora_inicio)
  );

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = React.useState<any>(null);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle>
              {date.toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </SheetTitle>
            <SheetClose />
          </SheetHeader>
          <div className="p-4 space-y-4">
            {markingsOfDay.length === 0 && (
              <div>Nenhuma marcação para este dia.</div>
            )}
            {markingsOfDay.map((agendamento: any) => {
              const utente = utentesData?.utentes?.find((u: any) => u.id === agendamento.id_utente);
              const colaborador = colaboradoresData?.colaboradores?.find((c: any) => c.id === agendamento.id_colaborador);
              const servico = servicosData?.servicos?.find((s: any) => s.id === agendamento.id_servicos);
              const horaInicio = agendamento.hora_inicio?.slice(11, 16);

              return (
                <div
                  key={agendamento.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted rounded p-2 transition"
                  onClick={() => {
                    setSelectedAgendamento({
                      ...agendamento,
                      utente,
                      colaborador,
                      servico,
                    });
                    setDialogOpen(true);
                  }}
                >
                  <div
                    className="w-1.5 h-20 rounded-full"
                    style={{ background: colaborador?.cor }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{horaInicio}</span>
                    </div>
                    <div className="text-sm">{colaborador?.descricao ?? agendamento.id_colaborador}</div>
                    <div className="text-sm">{servico?.descricao ?? agendamento.id_servicos}</div>
                    <div className="text-sm">{utente?.nome ?? agendamento.id_utente}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </SheetContent>

        {/* Dialog de detalhes da consulta */}
        <DialogDetalhesConsulta
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          agendamento={selectedAgendamento}
          onEdit={() => {
            setDialogOpen(false);
            setEditDialogOpen(true);
          }}
          statusData={statusData}
        />
      </Sheet>

      {/* Dialog de edição de agendamento */}
      <EditMarkingsDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        agendamento={selectedAgendamento}
        onSave={(updatedAgendamento) => {
          setEditDialogOpen(false);
          // Atualize sua lista se necessário
        }}
      />
    </>
  );
}