import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateServiceForm({
  onSubmit,
  initialData,
  onCancel,
}: {
  onSubmit: (data: any) => void;
  initialData?: any;
  onCancel?: () => void;
}) {
  const [descricao, setDescricao] = React.useState(initialData?.descricao || "");
  const [valor, setValor] = React.useState(initialData?.valor || "");
  const [duracao, setDuracao] = React.useState(initialData?.duracao || "");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setDescricao(initialData?.descricao || "");
    setValor(initialData?.valor || "");
    setDuracao(initialData?.duracao || "");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || !valor || !duracao) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    setError("");
    onSubmit({ descricao, valor, duracao });
  
    if (!initialData?.id) {
      setDescricao("");
      setValor("");
      setDuracao("");
    }
  };

  return (
    <Card className="w-full mx-auto mt-8">
      <CardHeader>
        <CardTitle>{initialData ? "Editar Serviço" : "Novo Serviço"}</CardTitle>
        <CardDescription>
          {initialData ? "Altere os dados abaixo." : "Preencha os dados para cadastrar um novo serviço."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid items-center gap-4">
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="descricao" className="text-right">
                Serviço
              </Label>
              <Input
                id="descricao"
                placeholder="Digite a descrição do serviço"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="flex w-full col-span-3"
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="grid space-y-1.5 items-center w-1/2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  placeholder="Digite o valor do serviço"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid space-y-1.5 w-1/2">
                <Label htmlFor="duracao">Duração</Label>
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
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
          <CardFooter className="flex justify-center gap-2 mt-4">
            <Button type="submit">
              {initialData ? "Alterar" : "Cadastrar"}
            </Button>
            {initialData && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
