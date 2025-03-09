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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_SERVICO } from '@/graphql/mutations';

export default function CreateServiceDialog({
  setData, // Recebe a função setData
  children,
}: {
  children: React.ReactNode;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [duracao, setDuracao] = useState("");

  const [createServico] = useMutation(CREATE_SERVICO, {
    onCompleted: (data) => {
      setData((prevData) => [...prevData, data.createServico]); // Adiciona o novo serviço à lista
    },
    onError: (error) => {
      console.error("Erro ao criar serviço:", error);
    },
  });

  const handleSave = () => {
    createServico({
      variables: {
        descricao,
        valor: parseFloat(valor),
        duracao: parseFloat(duracao), // Certifique-se de que duracao é um número
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Serviço</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo Serviço.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">
              Serviço
            </Label>
            <Input
              id="descricao"
              placeholder="Digite a descrição do serviço"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="valor" className="text-right">
              Valor
            </Label>
            <Input
              id="valor"
              type="number"
              placeholder="Digite o valor do serviço"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duracao" className="text-right">
              Duração
            </Label>
            <Input
              id="duracao"
              type="number"
              placeholder="Duração do serviço"
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
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
