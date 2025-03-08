import * as React from "react";
import { useState } from "react";
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
import { DateFilterVacance } from "./date-filter-vacance";

export function VacanceForm({ onAddVacance }: { onAddVacance: (vacance: any) => void }) {
  const [description, setDescription] = useState("");
  const [collaborator, setCollaborator] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!description || !collaborator) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    // Gerar um período fictício para teste
    const period = "2024-01-01 até 2024-01-15";

    // Chamar a função de callback para adicionar as férias
    onAddVacance({
      id: Date.now(),
      descricao: description,
      colaborador: collaborator,
      periodo: period,
    });

    // Resetar o formulário
    setDescription("");
    setCollaborator("");
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
            <DateFilterVacance />
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
                  <SelectItem value="Dr. João Pereira">Dr. João Pereira</SelectItem>
                  <SelectItem value="Dra. Maria Oliveira">Dra. Maria Oliveira</SelectItem>
                  <SelectItem value="Dra. Ana Fernandes">Dra. Ana Fernandes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleAdd}>Adicionar</Button>
      </CardFooter>
    </Card>
  );
}
