import { useState } from "react";
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

import { useQuery, useMutation } from "@apollo/client";
import { GET_CARGOS, GET_PERMISSOES, CREATE_COLABORADOR } from "@/graphql/queries";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreateCollaboratorsDialog({
  children,
  setData,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  setData: React.Dispatch<React.SetStateAction<any[]>>; // Certifique-se de que setData seja uma função válida
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    descricao: "",
    email: "",
    telemovel: "",
    cargoId: null as number | null,
    permissaoId: null as number | null,
    senha: "",
  });

  // Consultas para cargos e permissões
  const { data: cargosData, loading: cargosLoading, error: cargosError } = useQuery(GET_CARGOS);
  const { data: permissoesData, loading: permissoesLoading, error: permissoesError } = useQuery(GET_PERMISSOES);

  // Mutação para criar colaborador
  const [createColaborador, { loading: saving, error: saveError }] = useMutation(CREATE_COLABORADOR, {
    onCompleted: (data) => {
      console.log("Colaborador criado:", data.createColaborador);
      if (setData) {
        setData((prev) => [...prev, data.createColaborador]); // Atualiza a lista de colaboradores
        setIsOpen(false); // Fecha o diálogo
      } else {
        console.error("setData não está definido corretamente");
      }
    },
    onError: (error) => {
      console.error("Erro ao criar colaborador:", error);
    },
  });

  // Se o diálogo não estiver aberto, retorna null
  if (!isOpen) {
    return null;
  }

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Função para salvar os dados do colaborador
  const handleSave = async () => {
    try {
      await createColaborador({
        variables: {
          descricao: formData.descricao,
          email: formData.email,
          telemovel: formData.telemovel,
          cargoId: formData.cargoId!,
          permissaoId: formData.permissaoId!,
          senha: formData.senha,
        },
        update: (cache, { data }) => {
          console.log("Colaborador criado:", data.createColaborador);
        },
      });
    } catch (error) {
      console.error("Erro ao salvar colaborador:", error);
    }
  };

  // Carregamento de dados
  if (cargosLoading || permissoesLoading) return <p>Carregando dados...</p>;
  if (cargosError || permissoesError) {
    console.error("Erro ao carregar dados:", cargosError || permissoesError);
    return <p>Erro ao carregar dados: {cargosError?.message || permissoesError?.message}</p>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Colaborador</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo colaborador.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campo Nome */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="descricao" className="text-right">
              Nome do Colaborador
            </label>
            <input
              id="descricao"
              placeholder="Digite o nome"
              className="col-span-3"
              value={formData.descricao}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite um e-mail válido"
              className="col-span-3"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Telemóvel */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="telemovel" className="text-right">
              Telemóvel
            </label>
            <input
              id="telemovel"
              placeholder="Digite um telemóvel válido"
              className="col-span-3"
              value={formData.telemovel}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Cargo */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="cargo" className="text-right">
              Cargo
            </label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, cargoId: parseInt(value, 10) }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {cargosData?.cargos.map((cargo: any) => (
                  <SelectItem key={cargo.id} value={String(cargo.id)}>
                    {cargo.descricao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campo Permissão */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="permissao" className="text-right">
              Permissão
            </label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, permissaoId: parseInt(value, 10) }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione uma permissão" />
              </SelectTrigger>
              <SelectContent>
                {permissoesData?.permissoes.map((permissao: any) => (
                  <SelectItem key={permissao.id} value={String(permissao.id)}>
                    {permissao.descricao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campo Senha */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="senha" className="text-right">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              placeholder="Digite uma senha"
              className="col-span-3"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
          {saveError && <p className="text-red-500">Erro ao salvar colaborador: {saveError.message}</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
