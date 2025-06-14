import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

export function RoleForm({
  onAddRole,
  onUpdateRole,
  onCancelEdit,
  permissoes,
  cargoEditando,
  handleEdit,
}: {
  onAddRole: (data: { descricao: string; permissoesIds: number[] }) => void;
  onUpdateRole: (data: { id: number; descricao: string; permissoesIds: number[] }) => void;
  onCancelEdit: () => void;
  permissoes: { id: number; descricao: string }[];
  cargoEditando?: { id: number; descricao: string; permissoes: { id: number }[] };
  handleEdit: (data: any) => void;
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (cargoEditando) {
      reset({
        descricao: cargoEditando.descricao,
        permissoesIds: cargoEditando.permissoes?.map((p) => p.id) ?? [],
      });
    } else {
      reset({ descricao: "", permissoesIds: [] });
    }
  }, [cargoEditando, reset]);

  const onSubmit = (data: { descricao: string; permissoesIds: number[] }) => {
    if (cargoEditando) {
      onUpdateRole({ ...data, id: cargoEditando.id });
    } else {
      onAddRole(data);
    }
    reset();
    onCancelEdit();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Novas Funções</CardTitle>
        <CardDescription>Adicione novas funções</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Descrição</Label>
              <Input
                id="name"
                placeholder="Descreva a função"
                {...register("descricao")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              {permissoes.map((p) => (
                <label key={p.id} className="flex items-center gap-2 mb-1">
                  <Checkbox
                    {...register("permissoesIds")}
                    value={p.id}
                    checked={cargoEditando?.permissoes?.some((perm) => perm.id === p.id)}
                  />
                  {p.descricao}
                </label>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSubmit(onSubmit)}>
          {cargoEditando ? "Alterar" : "Adicionar"}
        </Button>
        {cargoEditando && (
          <Button variant="outline" onClick={onCancelEdit}>
            Cancelar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
