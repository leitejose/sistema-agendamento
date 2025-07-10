import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogDetalhesConsulta({
  open,
  onOpenChange,
  agendamento,
  onEdit,
  statusData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamento: any;
  onEdit: () => void;
  statusData: any;
}) {
  if (!agendamento) return null;
  const statusDesc =
    statusData?.statusAgendamentos?.find((s: any) => s.id === agendamento.statusId)?.descricao ??
    agendamento.statusId;

  const colaborador = agendamento.colaborador;
  const utente = agendamento.utente;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Consulta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          {/* Colaborador e Serviço */}
          <div className="flex items-center gap-4">
            {colaborador?.imagem_url ? (
              <img
                src={
                  colaborador.imagem_url.startsWith("http")
                    ? colaborador.imagem_url
                    : `http://localhost:3000${colaborador.imagem_url}`
                }
                alt={colaborador.descricao}
                className="w-16 h-16 rounded-full object-cover border"
                style={{
                  border: `3px solid ${colaborador.cor || "#ccc"}`,
                }}
              />
            ) : (
              <div
                className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"
                style={{
                  border: `3px solid ${colaborador?.cor || "#ccc"}`,
                }}
              >
                <span className="text-2xl">?</span>
              </div>
            )}
            <div>
              <div className="font-semibold text-base">{colaborador?.descricao ?? agendamento.id_colaborador}</div>
              <div className="text-muted-foreground">{agendamento.servico?.descricao ?? agendamento.id_servicos}</div>
            </div>
          </div>

          {/* ID, Utente, Telefone, Email */}
          <div className="flex flex-row justify-center gap-8">
            <div className="grid  gap-4">
              <div>
                <span className="font-semibold">Nº do Utente:</span> {agendamento.id}
              </div>
              <div>
                <span className="font-semibold">Utente:</span> {utente?.nome ?? agendamento.id_utente}
              </div>
              <div>
                <span className="font-semibold">Telefone:</span> {utente?.telemovel ?? "-"}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {utente?.email ?? "-"}
              </div>
            </div>

            {/* Data, Hora, Status, Observação */}
            <div className="grid gap-4">
              <div>
                <span className="font-semibold">Data:</span> {agendamento.data_agendamento?.slice(0, 10)}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Hora:</span> {agendamento.hora_inicio?.slice(11, 16)}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Status:</span> {statusDesc}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Observação:</span> {agendamento.observacoes || "-"}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onEdit}>Editar</Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
  );
  
}
