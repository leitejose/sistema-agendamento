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

export default function CreateServiceDialog({
  setData, // Recebe a função setData
  children,
}: {
  children: React.ReactNode;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [duracao, setDuracao] = useState("");

  const handleSave = () => {
    const newService = {
      id: Date.now(), // ID único gerado com base no timestamp
      nome,
      valor,
      duracao,
    };
    setData((prevData) => [...prevData, newService]); // Adiciona o novo serviço à lista
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
            <Label htmlFor="name" className="text-right">
              Serviço
            </Label>
            <Input
              id="name"
              placeholder="Digite a descrição do serviço"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
