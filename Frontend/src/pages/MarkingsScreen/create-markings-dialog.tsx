import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_UTENTES, GET_COLABORADORES, GET_SERVICOS } from "@/graphql/queries";
import CreateServiceDialog from "../ServicesScreen/create-services-dialog";
import CreateUtenteDialog from "../UtentesScreen/create-utente-dialog";

export default function CreateMarkingsDialog({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState({
    id_utente: "",
    id_colaborador: "",
    id_servicos: "",
    data_agendamento: "",
    hora_inicio: "",
    hora_fim: "",
    status: "",
    observacoes: "",
  });

  // Queries para buscar dados do backend
  const { data: utentesData, loading: utentesLoading } = useQuery(GET_UTENTES);
  const { data: colaboradoresData, loading: colaboradoresLoading } = useQuery(GET_COLABORADORES);
  const { data: servicosData, loading: servicosLoading } = useQuery(GET_SERVICOS);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log("Novo Agendamento:", formData);
    // Aqui você pode adicionar a lógica para enviar os dados ao backend usando uma mutation GraphQL
  };

  const handleAddUtente = () => {
    // Lógica para adicionar um novo utente (pode abrir outro modal ou redirecionar para outra página)
    console.log("Adicionar novo utente");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo agendamento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campo Utente */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_utente" className="text-right">
              Utente
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, id_utente: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um utente" />
              </SelectTrigger>
              <SelectContent>
                {utentesLoading ? (
                  <SelectItem value="" disabled>
                    Carregando...
                  </SelectItem>
                ) : (
                  utentesData?.utentes.map((utente: any) => (
                    <SelectItem key={utente.id} value={utente.id}>
                      {utente.nome}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 text-right">
              <CreateUtenteDialog >
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddUtente}
                className="mt-2"
              >
                Adicionar Novo Utente
              </Button>
              </CreateUtenteDialog>
              
            </div>
          </div>

          {/* Campo Colaborador */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_colaborador" className="text-right">
              Colaborador
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, id_colaborador: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um colaborador" />
              </SelectTrigger>
              <SelectContent>
                {colaboradoresLoading ? (
                  <SelectItem value="" disabled>
                    Carregando...
                  </SelectItem>
                ) : (
                  colaboradoresData?.colaboradores.map((colaborador: any) => (
                    <SelectItem key={colaborador.id} value={colaborador.id}>
                      {colaborador.descricao}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Campo Serviço */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_servicos" className="text-right">
              Serviço
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, id_servicos: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {servicosLoading ? (
                  <SelectItem value="" disabled>
                    Carregando...
                  </SelectItem>
                ) : (
                  servicosData?.servicos.map((servico: any) => (
                    <SelectItem key={servico.id} value={servico.id}>
                      {servico.descricao}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Campo Data */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="data_agendamento" className="text-right">
              Data
            </Label>
            <Input
              id="data_agendamento"
              type="date"
              value={formData.data_agendamento}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          {/* Campo Hora Início */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hora_inicio" className="text-right">
              Hora Início
            </Label>
            <Input
              id="hora_inicio"
              type="time"
              value={formData.hora_inicio}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          {/* Campo Hora Fim */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hora_fim" className="text-right">
              Hora Fim
            </Label>
            <Input
              id="hora_fim"
              type="time"
              value={formData.hora_fim}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          {/* Campo Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              placeholder="Digite o status"
              value={formData.status}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          {/* Campo Observações */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="observacoes" className="text-right">
              Observações
            </Label>
            <Input
              id="observacoes"
              placeholder="Digite observações (opcional)"
              value={formData.observacoes}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
