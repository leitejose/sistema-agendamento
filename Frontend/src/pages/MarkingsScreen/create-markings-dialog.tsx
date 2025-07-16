import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  GET_STATUS,
  GET_AGENDAMENTOS,
  GET_FERIAS,
} from "@/graphql/queries";

import { Card, CardContent } from "@/components/ui/card";
import { CREATE_AGENDAMENTO } from "@/graphql/mutations";
import { useNavigate } from "react-router-dom";

// Tipagem do estado do formulário
type FormData = {
  id_utente: string;
  id_colaborador: string;
  id_servicos: string;
  data_agendamento: string;
  hora_inicio: string;
  hora_fim: string;
  statusId: string;
  observacoes: string;
};

export default function CreateMarkingsDialog({
  open,
  onOpenChange,
  onAgendamentoCriado, // <-- adicione aqui
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgendamentoCriado?: (novo: any) => void; // <-- adicione aqui
}) {
  const today = new Date().toISOString().split("T")[0]; // Formato de data no formato 'YYYY-MM-DD'

  const [formData, setFormData] = useState<FormData>({
    id_utente: "",
    id_colaborador: "",
    id_servicos: "",
    data_agendamento: today,
    hora_inicio: "",
    hora_fim: "",
    statusId: "1", // Valor padrão; será atualizado via useEffect se o status "Agendado" for encontrado
    observacoes: "",
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [utenteInfo, setUtenteInfo] = useState<{ email: string; telemovel: string } | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const { data: utentesData, loading: utentesLoading } = useQuery(GET_UTENTES);
  const { data: colaboradoresData, loading: colaboradoresLoading } = useQuery(GET_COLABORADORES);
  const { data: servicosData, loading: servicosLoading } = useQuery(GET_SERVICOS);
  const { data: statusData, loading: statusLoading } = useQuery(GET_STATUS);
  const { data: agendamentosData } = useQuery(GET_AGENDAMENTOS);
  const { data: feriasData } = useQuery(GET_FERIAS);

  const [createAgendamento, { loading: createLoading, error: createError }] = useMutation(CREATE_AGENDAMENTO, {
    refetchQueries: [{ query: GET_AGENDAMENTOS }],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (statusData?.statusAgendamentos?.length) {
      const agendado = statusData.statusAgendamentos.find(
        (s: any) => s.descricao?.toLowerCase().trim() === "agendado"
      );

      if (agendado?.id) {
        setFormData((prev) => ({
          ...prev,
          statusId: agendado.id.toString(),
        }));
      } else {
        console.error("Status 'Agendado' não encontrado na lista.");
      }
    }
  }, [statusData]);

  useEffect(() => {
    if (formData.id_utente && utentesData) {
      const selectedUtente = utentesData.utentes.find((u: any) => u.id === formData.id_utente);
      if (selectedUtente) {
        setUtenteInfo({
          email: selectedUtente.email,
          telemovel: selectedUtente.telemovel,
        });
      }
    }
  }, [formData.id_utente, utentesData]);

useEffect(() => {
  if (!colaboradoresData || !formData.id_colaborador || !formData.data_agendamento) {
    setAvailableTimes([]);
    return;
  }

  // Verificação de férias ANTES de calcular horários
  const feriasColaborador = (feriasData?.ferias || []).filter(
    (f: any) => f.colaborador_id.toString() === formData.id_colaborador.toString()
  );
  const dataSelecionada = new Date(formData.data_agendamento);
  const emFerias = feriasColaborador.some((f: any) => {
    const inicio = new Date(f.data_inicio);
    const fim = new Date(f.data_fim);
    return dataSelecionada >= inicio && dataSelecionada <= fim;
  });

  if (emFerias) {
    setAvailableTimes([]);
    return; // <-- Sai do useEffect, impedindo geração de horários
  }

  const colaborador = colaboradoresData.colaboradores.find(
    (c: any) => c.id === formData.id_colaborador
  );

  if (colaborador && colaborador.disponibilidades) {
    let diaSemanaJS = new Date(formData.data_agendamento).getDay();
    let diaSemana = diaSemanaJS === 0 ? 6 : diaSemanaJS - 1;

    const dispDia = colaborador.disponibilidades.filter(
      (d: any) => Number(d.dia_da_semana) === Number(diaSemana)
    );

    const horarios: string[] = [];
    dispDia.forEach((disp: any) => {
      const inicio = disp.hora_inicio.substring(11, 16);
      const fim = disp.hora_fim.substring(11, 16);
      let [h, m] = inicio.split(":").map(Number);
      const [hFim, mFim] = fim.split(":").map(Number);

      while (h < hFim || (h === hFim && m < mFim)) {
        horarios.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
        m += 30;
        if (m >= 60) {
          h += 1;
          m = m % 60;
        }
      }
    });

    const agendamentosDia = (agendamentosData?.getAgendamentos || []).filter(
      (a: any) =>
        a.id_colaborador.toString() === formData.id_colaborador.toString() &&
        a.data_agendamento.slice(0, 10) === formData.data_agendamento
    );

    const horariosOcupados = new Set(
      agendamentosDia.map((a: any) => {
        const date = new Date(a.hora_inicio);
        const hh = date.getUTCHours().toString().padStart(2, "0");
        const mm = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hh}:${mm}`;
      })
    );

    const horariosDisponiveis = horarios.filter((h) => !horariosOcupados.has(h));
    setAvailableTimes(horariosDisponiveis);
  } else {
    setAvailableTimes([]);
  }
}, [colaboradoresData, feriasData, formData.id_colaborador, formData.data_agendamento, agendamentosData]);

  // Verificação de férias ANTES de calcular horários
  let emFerias = false;
  if (feriasData && formData.id_colaborador && formData.data_agendamento) {
    const feriasColaborador = (feriasData.ferias || []).filter(
      (f: any) =>
        f.colaborador_id.toString() === formData.id_colaborador.toString()
    );
    const dataSelecionada = new Date(formData.data_agendamento);
    emFerias = feriasColaborador.some((f: any) => {
      const inicio = new Date(f.data_inicio);
      const fim = new Date(f.data_fim);
      return dataSelecionada >= inicio && dataSelecionada <= fim;
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Atualiza os campos de hora com formatação correta e remove espaços extras
  const handleTimeSelect = async (time: string) => {
    // Use apenas hora:minuto, sem segundos
    const start = time; // "10:00" em vez de "10:00:00"
    let end = "";

    if (servicosData && formData.id_servicos) {
      const selectedServico = servicosData.servicos.find((s: any) => s.id === formData.id_servicos);
      if (selectedServico) {
        const duracao = Number(selectedServico.duracao);
        const [hour, minute] = time.split(":").map(Number);
        const endMinutes = minute + duracao;
        const endHour = hour + Math.floor(endMinutes / 60);
        const finalMinutes = endMinutes % 60;
        // Formato HH:MM sem segundos
        end = `${endHour.toString().padStart(2, "0")}:${finalMinutes.toString().padStart(2, "0")}`;
      }
    }

    console.log("Definindo horários => Início:", start, "Fim:", end);
    setFormData((prev) => ({ ...prev, hora_inicio: start, hora_fim: end }));
    setSelectedTime(time);
  };

  const handleSave = async () => {
    console.log("Novo Agendamento:", formData);

    if (!formData.id_utente || !formData.id_colaborador || !formData.id_servicos || !formData.data_agendamento || !formData.hora_inicio) {
      console.error("Campos obrigatórios não preenchidos");
      return;
    }

    try {
      const inicio = formData.hora_inicio.trim();
      const fim = formData.hora_fim ? formData.hora_fim.trim() : null;

      const formattedData = {
        utenteId: parseInt(formData.id_utente),
        colaboradorId: parseInt(formData.id_colaborador),
        servicoId: parseInt(formData.id_servicos),
        data_agendamento: formData.data_agendamento,
        hora_inicio: inicio,
        hora_fim: fim || null,
        statusAgendamentoId: parseInt(formData.statusId), // Correct field name
        observacoes: formData.observacoes || "",
      };

      const { data } = await createAgendamento({
        variables: {
          createAgendamentoInput: formattedData,
        },
      });

      if (onAgendamentoCriado && data?.createAgendamento) {
        onAgendamentoCriado(data.createAgendamento);
      }

      // Limpa o formulário e o horário selecionado
      setFormData({
        id_utente: "",
        id_colaborador: "",
        id_servicos: "",
        data_agendamento: today,
        hora_inicio: "",
        hora_fim: "",
        statusId: "1",
        observacoes: "",
      });
      setSelectedTime(null);

      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  const handleAddUtente = () => {
    navigate("/utentes-screen");
  };

  // Definir uniqueAvailableTimes para garantir valores únicos
  const uniqueAvailableTimes = Array.from(new Set(availableTimes));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
          <DialogDescription>Preencha as informações para criar um novo agendamento.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda */}
          <div className="space-y-4">
            {/* Colaborador */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id_colaborador" className="text-right">Colaborador</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, id_colaborador: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um colaborador" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradoresLoading ? (
                    <SelectItem value="" disabled>Carregando...</SelectItem>
                  ) : (
                    colaboradoresData?.colaboradores.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>{c.descricao}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Serviço */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id_servicos" className="text-right">Serviço</Label>
              <Select onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, id_servicos: value }));
                if (selectedTime) handleTimeSelect(selectedTime);
              }}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {servicosLoading ? (
                    <SelectItem value="" disabled>Carregando...</SelectItem>
                  ) : (
                    servicosData?.servicos.map((s: any) => (
                      <SelectItem key={s.id} value={s.id}>{s.descricao}</SelectItem>
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

            {/* Horários Disponíveis */}
            <div>
              <Label>Horários Disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {uniqueAvailableTimes.length === 0 && emFerias ? (
                  <span className="text-red-500">
                    O médico está indisponível para esta data (férias).
                  </span>
                ) : uniqueAvailableTimes.length === 0 ? (
                  <span className="text-muted-foreground">Nenhum horário disponível</span>
                ) : (
                  uniqueAvailableTimes.map((time) => (
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
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="space-y-4">
            {/* Utente */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_utente" className="text-right">Utente</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, id_utente: value }))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um utente" />
                  </SelectTrigger>
                  <SelectContent>
                    {utentesLoading ? (
                      <SelectItem value="" disabled>Carregando...</SelectItem>
                    ) : (
                      utentesData?.utentes
                        ?.filter((utente: any) => utente && utente.nome)
                        .map((utente: any) => (
                          <SelectItem key={utente.id} value={utente.id}>
                            {utente.nome}
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4 text-right">
               
                  <Button variant="outline" size="sm" onClick={handleAddUtente} className="mt-2">
                    Adicionar Novo Utente
                  </Button>
              
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
          <Button type="button" onClick={handleSave} disabled={createLoading}>
            {createLoading ? "Salvando..." : "Salvar"}
          </Button>
          {createError && <p className="text-red-500">Erro ao criar agendamento.</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
