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

export function PermissionForm({
  onAddPermission,
  initialValues,
  onCancelEdit,
}: {
  onAddPermission: (descricao: string) => void;
  initialValues?: any;
  onCancelEdit?: () => void;
}) {
  const [descricao, setDescricao] = React.useState(initialValues?.descricao || "");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setDescricao(initialValues?.descricao || "");
  }, [initialValues]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!descricao.trim()) {
      setError("A descrição da permissão é obrigatória.");
      return;
    }

    onAddPermission(descricao);
    setDescricao("");
    setError(""); 
  };
  const handleCancelEdit = () => {
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Novas permissões</CardTitle>
        <CardDescription>Adicione novas permissões</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Descrição</Label>
              <Input
                id="name"
                placeholder="Descreva a permissão a ser adicionada"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>
          <CardFooter className="flex justify-center gap-2 mt-4">
            {initialValues && initialValues.id ? (
              <>
                <Button type="submit">Alterar</Button>
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button type="submit">Adicionar</Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
