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
  return d.toISOString().split("T")[0];
};

export default function EditMarkingsDialog({
  agendamento,
  isOpen,
  onClose,
  onSave,
}: {
  agendamento: FormData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAgendamento: FormData) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    id: agendamento?.id || 0,
    id_utente: agendamento?.id_utente || "",
    id_colaborador: agendamento?.id_colaborador || "",
    id_servicos: agendamento?.id_servicos || "",
    data_agendamento: agendamento?.data_agendamento
      ? formatDateForInput(agendamento.data_agendamento)
      : "",
    hora_inicio: agendamento?.hora_inicio || "",
    hora_fim: agendamento?.hora_fim || "",
    statusId: agendamento?.statusId || "",
    observacoes: agendamento?.observacoes || "",
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(
    agendamento?.hora_inicio?.slice(0, 5) || null
  );

  const [utenteInfo, setUtenteInfo] = useState<{ email: string; telemovel: string } | null>(null);

  const { data: utentesData, loading: utentesLoading } = useQuery(GET_UTENTES);
  const { data: colaboradoresData, loading: colaboradoresLoading } = useQuery(GET_COLABORADORES);
  const { data: servicosData, loading: servicosLoading } = useQuery(GET_SERVICOS);

  const [updateAgendamento, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_AGENDAMENTO);

  // Atualiza formData e selectedTime dinamicamente com base no agendamento
  useEffect(() => {
    if (agendamento) {
      setFormData({
        id: agendamento.id,
        id_utente: agendamento.id_utente || "",
        id_colaborador: agendamento.id_colaborador || "",
        id_servicos: agendamento.id_servicos || "",
        data_agendamento: agendamento.data_agendamento
          ? formatDateForInput(agendamento.data_agendamento)
          : "",
        hora_inicio: agendamento.hora_inicio || "",
        hora_fim: agendamento.hora_fim || "",
        statusId: agendamento.statusId || "",
        observacoes: agendamento.observacoes || "",
      });

      setSelectedTime(agendamento.hora_inicio?.slice(0, 5) || null);
    }
  }, [agendamento]);

  // Atualiza utenteInfo dinamicamente com base no id_utente
  useEffect(() => {
    if (formData.id_utente && utentesData?.utentes) {
      const selectedUtente = utentesData.utentes.find((u: any) => u.id === formData.id_utente);
      if (selectedUtente) {
        setUtenteInfo({
          email: selectedUtente.email,
          telemovel: selectedUtente.telemovel,
        });
      } else {
        setUtenteInfo(null); // Limpa caso não encontre o utente
      }
    }
  }, [formData.id_utente, utentesData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTimeSelect = (time: string) => {
    const start = `${time}:00`;
    let end = start;

    if (servicosData && formData.id_servicos) {
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

    setFormData((prev) => ({ ...prev, hora_inicio: start, hora_fim: end }));
    setSelectedTime(time);
  };

  const handleSave = async () => {
    try {
      // Validação: Verifique se os horários foram selecionados
      if (!formData.hora_inicio || !formData.hora_fim) {
        alert("Por favor, selecione um horário.");
        return;
      }

      const updatedData = {
        id: formData.id,
        utenteId: Number(formData.id_utente),
        colaboradorId: Number(formData.id_colaborador),
        servicoId: Number(formData.id_servicos),
        data_agendamento: new Date(formData.data_agendamento).toISOString(), // Converte para ISO string
        hora_inicio: formData.hora_inicio, // Mantém como string no formato HH:mm:ss
        hora_fim: formData.hora_fim, // Mantém como string no formato HH:mm:ss
        statusId: Number(formData.statusId), 
        statusAgendamentoId: Number(formData.statusId),
        observacoes: formData.observacoes,
      };

      const result = await updateAgendamento({
        variables: { updateAgendamentoInput: updatedData },
      });

      const updated = result.data?.updateAgendamento;
      if (!updated) {
        alert("Erro: atualização não retornou dados.");
        return;
      }

      onSave(updated);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      alert("Erro ao atualizar agendamento. Verifique os dados e tente novamente.");
    }
  };

  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                value={String(formData.id_colaborador)}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, id_colaborador: value }))}
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
                value={String(formData.id_servicos)}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, id_servicos: value }));
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
              <Input
                id="data_agendamento"
                type="date"
                value={formData.data_agendamento}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="data_agendamento" className="text-right">Hora</Label>
              <Input className="col-span-3"
              type="" value={(formData.hora_inicio.slice(11,16) ) || ""} disabled />
            </div>

            {/* Horários Disponíveis */}
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
                  value={String(formData.id_utente)}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, id_utente: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um utente" />
                  </SelectTrigger>
                  <SelectContent>
                    {utentesLoading ? (
                      <SelectItem value="" disabled>Carregando...</SelectItem>
                    ) : (
                      utentesData?.utentes.map((utente: any) => (
                        <SelectItem key={utente.id} value={String(utente.id)}>{utente.nome}</SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
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
