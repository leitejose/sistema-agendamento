import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_UTENTES,
  GET_COLABORADORES,
  GET_SERVICOS,
} from "@/graphql/queries";
import { UPDATE_AGENDAMENTO } from "@/graphql/mutations";
import { Card, CardContent } from "@/components/ui/card";
import CreateUtenteDialog from "../UtentesScreen/create-utente-dialog";

type FormData = {
  id: number;
  id_utente: string;
  id_colaborador: string;
  id_servicos: string;
  data_agendamento: string;
  hora_inicio: string;
  hora_fim: string;
  statusId: string;
  observacoes: string;
};

const formatDateForInput = (date: string): string => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export default function EditMarkingsDialog({
  agendamento,
  onSave,
}: {
  agendamento: FormData | null;
  onSave: (updatedAgendamento: FormData) => void;
}) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: utentesData, loading: utentesLoading } = useQuery(GET_UTENTES);
  const { data: colaboradoresData, loading: colaboradoresLoading } = useQuery(GET_COLABORADORES);
  const { data: servicosData, loading: servicosLoading } = useQuery(GET_SERVICOS);

  const [updateAgendamento, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_AGENDAMENTO);

  useEffect(() => {
    if (agendamento) {
      setFormData({
        ...agendamento,
        id_colaborador: String(agendamento.id_colaborador ?? ""),
        id_servicos: String(agendamento.id_servicos ?? ""),
        id_utente: String(agendamento.id_utente ?? ""),
        statusId: String(agendamento.statusId ?? ""),
        data_agendamento: formatDateForInput(agendamento.data_agendamento),
      });
      setIsDialogOpen(true);
    }
  }, [agendamento]);

  if (!formData) return null;

  const utenteInfo = utentesData?.utentes.find(
    (u: any) => String(u.id) === String(formData.id_utente)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => prev ? { ...prev, [id]: value } : prev);
  };

  const handleTimeSelect = (time: string) => {
    const start = `${time}:00`;
    let end = start;

    if (servicosData && formData?.id_servicos) {
      const servico = servicosData.servicos.find((s: any) => s.id === formData.id_servicos);
      if (servico) {
        const duracao = Number(servico.duracao);
        const [h, m] = time.split(":").map(Number);
        const totalMin = h * 60 + m + duracao;
        const endH = Math.floor(totalMin / 60);
        const endM = totalMin % 60;
        end = `${endH.toString().padStart(2, "0")}:${endM.toString().padStart(2, "0")}:00`;
      }
    }

    setFormData((prev) => prev ? { ...prev, hora_inicio: start, hora_fim: end } : prev);
    setSelectedTime(time);
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      const extractDateOnly = (dateString: string): string => {
        return dateString.split('T')[0];
      };
      const extractTimeOnly = (timeString: string): string => {
        if (timeString.includes('T')) {
          return timeString.split('T')[1].split(':').slice(0, 2).join(':');
        }
        return timeString.split(':').slice(0, 2).join(':');
      };
      const combineDateTime = (date: string, time: string): string => {
        return `${date}T${extractTimeOnly(time)}:00.000Z`;
      };
      const baseDate = extractDateOnly(formData.data_agendamento);

      const dadosAtualizados = {
        id: Number(formData.id),
        data_agendamento: `${baseDate}T00:00:00.000Z`,
        hora_inicio: combineDateTime(baseDate, formData.hora_inicio),
        hora_fim: formData.hora_fim ? combineDateTime(baseDate, formData.hora_fim) : undefined,
        observacoes: formData.observacoes || "",
        utenteId: Number(formData.id_utente),
        colaboradorId: formData.id_colaborador ? Number(formData.id_colaborador) : undefined,
        servicoId: formData.id_servicos ? Number(formData.id_servicos) : undefined,
        statusId: Number(formData.statusId)
      };

      console.log("Dados formatados para envio (formato exato do playground):", dadosAtualizados);

      const result = await updateAgendamento({
  variables: {
    updateAgendamentoInput: dadosAtualizados
  }
});

console.log("Resultado da atualização:", result);

const updated = result.data?.updateAgendamento;
if (!updated) {
  alert("Erro: atualização não retornou dados.");
  return;
}

onSave(updated); // ✅ Corrigido aqui
setIsDialogOpen(false);

} catch (error) {
  console.error("Erro ao atualizar agendamento:", error);
  alert("Erro ao atualizar agendamento. Verifique os dados e tente novamente.");
  
}
};

  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
          <DialogDescription>Atualize as informações do agendamento.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda */}
          <div className="space-y-4">
            {/* Colaborador */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id_colaborador" className="text-right">Colaborador</Label>
              <Select
                value={formData.id_colaborador}
                onValueChange={(value) =>
                  setFormData((prev) => prev ? { ...prev, id_colaborador: value } : prev)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um colaborador" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradoresLoading ? (
                    <SelectItem value="" disabled>Carregando...</SelectItem>
                  ) : (
                    colaboradoresData?.colaboradores.map((c: any) => (
                      <SelectItem key={c.id} value={String(c.id)}>{c.descricao}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Serviço */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id_servicos" className="text-right">Serviço</Label>
              <Select
                value={formData.id_servicos}
                onValueChange={(value) => {
                  setFormData((prev) => prev ? { ...prev, id_servicos: value } : prev);
                  if (selectedTime) handleTimeSelect(selectedTime);
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {servicosLoading ? (
                    <SelectItem value="" disabled>Carregando...</SelectItem>
                  ) : (
                    servicosData?.servicos.map((s: any) => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.descricao}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Data */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="data_agendamento" className="text-right">Data</Label>
              <input
                type="date"
                value={formatDateForInput(formData.data_agendamento)}
                onChange={(e) => setFormData({ ...formData, data_agendamento: e.target.value })}
                className="col-span-3"
              />
            </div>

            {/* Horários */}
            <div>
              <Label>Horários Disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {availableTimes.map((time) => (
                  <Card
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`cursor-pointer hover:shadow-md ${
                      selectedTime === time ? "border-2 border-green-500 bg-green-400" : "bg-green-300"
                    }`}
                  >
                    <CardContent className="p-2">
                      <Button variant="none" size="sm">{time}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="space-y-4">
            {/* Utente */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_utente" className="text-right">Utente</Label>
                <Select
                  value={formData.id_utente}
                  onValueChange={(value) =>
                    setFormData((prev) => prev ? { ...prev, id_utente: value } : prev)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um utente" />
                  </SelectTrigger>
                  <SelectContent>
                    {utentesLoading ? (
                      <SelectItem value="" disabled>Carregando...</SelectItem>
                    ) : (
                      utentesData?.utentes.map((utente: any) => (
                        <SelectItem key={utente.id} value={String(utente.id)}>
                          {utente.nome}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-4 text-right">
                <CreateUtenteDialog>
                  <Button variant="outline" size="sm" className="mt-2">
                    Adicionar Novo Utente
                  </Button>
                </CreateUtenteDialog>
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input className="col-span-3" value={utenteInfo?.email || ""} disabled />
            </div>

            {/* Telemóvel */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Telemóvel</Label>
              <Input className="col-span-3" value={utenteInfo?.telemovel || ""} disabled />
            </div>

            {/* Observações */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="observacoes" className="text-right">Observações</Label>
              <Input
                id="observacoes"
                placeholder="Digite observações (opcional)"
                value={formData.observacoes}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={updateLoading}>
            {updateLoading ? "Salvando..." : "Salvar"}
          </Button>
          {updateError && <p className="text-red-500">Erro ao atualizar agendamento.</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
