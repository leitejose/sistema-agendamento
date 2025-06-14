import * as React from "react";
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function VacanceForm({
  onAddVacance,
  colaboradores = [],
  initialValues,
}: {
  onAddVacance: (vacance: any) => void;
  colaboradores?: { id: number; descricao: string }[];
  initialValues?: any;
}) {
  const [description, setDescription] = useState(initialValues?.descricao || "");
  const [collaborator, setCollaborator] = useState(initialValues?.colaborador_id || "");
  const [error, setError] = useState("");
  const [dataInicio, setDataInicio] = useState(initialValues?.data_inicio?.slice(0, 10) || "");
  const [dataFim, setDataFim] = useState(initialValues?.data_fim?.slice(0, 10) || "");

  useEffect(() => {
    setDescription(initialValues?.descricao || "");
    setCollaborator(initialValues?.colaborador_id || "");
    setDataInicio(initialValues?.data_inicio?.slice(0, 10) || "");
    setDataFim(initialValues?.data_fim?.slice(0, 10) || "");
  }, [initialValues]);

  const handleAdd = () => {
    if (!description || !collaborator || !dataInicio || !dataFim) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    // Se está editando, use o id real; se está criando, não envie id
    const payload: any = {
      descricao: description,
      colaborador: collaborator,
      data_inicio: dataInicio,
      data_fim: dataFim,
    };

    if (initialValues && initialValues.id) {
      payload.id = initialValues.id; // Use o id do banco
    }

    onAddVacance(payload);

    setDescription("");
    setCollaborator("");
    setDataInicio("");
    setDataFim("");
    setError("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Novas Férias</CardTitle>
        <CardDescription>Adicione novas férias com os dados solicitados abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Descrição</Label>
              <Input
                id="name"
                placeholder="Descreva as férias"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label>Início</Label>
                <Input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Fim</Label>
                <Input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Colaborador</Label>
              <Select
                onValueChange={(value) => setCollaborator(value)}
                value={collaborator}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Selecione um colaborador" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {colaboradores.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {initialValues && initialValues.id ? (
          <Button onClick={handleAdd}>Alterar</Button>
        ) : (
          <Button onClick={handleAdd}>Adicionar</Button>
        )}
      </CardFooter>
    </Card>
  );
}
