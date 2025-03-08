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
import { CheckboxPermissions } from "./checkbox-permissions";

export function RoleForm({ onAddRole }: { onAddRole: (descricao: string) => void }) {
  const [descricao, setDescricao] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!descricao.trim()) {
      setError("A descrição da função é obrigatória.");
      return;
    }

    onAddRole(descricao);
    setDescricao(""); // Limpa o campo após adicionar
    setError(""); // Limpa o erro
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Novas Funções</CardTitle>
        <CardDescription>Adicione novas funções</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Descrição</Label>
              <Input
                id="name"
                placeholder="Descreva a função"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <CheckboxPermissions />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSubmit}>Adicionar</Button>
      </CardFooter>
    </Card>
  );
}
