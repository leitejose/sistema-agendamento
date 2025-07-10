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
import { useQuery } from "@apollo/client";
import { GET_CARGOS} from "@/graphql/queries";
import { ColorPicker } from "@/components/ColorPicker";

export function ColaboradorForm({
  onSubmit,
  initialData,
  onCancel,
}: {
  onSubmit: (colab: any) => void;
  initialData?: any;
  onCancel?: () => void;
}) {
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [telemovel, setTelemovel] = useState(initialData?.telemovel || "");
  const [cargoId, setCargoId] = useState(initialData?.cargoId || "");
 const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [imagemUrl, setImagemUrl] = useState(initialData?.imagem_url || "");
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [cor, setCor] = useState(initialData?.cor || "#1976d2");

  const { data: cargosData } = useQuery(GET_CARGOS);

  useEffect(() => {
    setDescricao(initialData?.descricao || "");
    setEmail(initialData?.email || "");
    setTelemovel(initialData?.telemovel || "");
    setCargoId(initialData?.cargoId || "");
    setSenha("");
    setImagemUrl(initialData?.imagem_url || "");
    setCor(initialData?.cor || "#1976d2");
    setImagemFile(null);
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagemFile(e.target.files[0]);
      setImagemUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || !email || !cargoId || (!initialData?.id && !senha)) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    let imagem_url = initialData?.imagem_url || "";
    if (imagemFile) {
      const formData = new FormData();
      formData.append("file", imagemFile);
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      imagem_url = data.url; // URL retornada pelo backend
    }

    // Só envie imagem_url se for uma URL válida do backend
    if (!imagem_url || imagem_url.startsWith("blob:")) {
      imagem_url = null;
    }

    const payload: any = {
      descricao,
      email,
      telemovel,
      cargoId: Number(cargoId),
      senha,
      imagem_url,
      cor,
    };
    if (imagem_url) payload.imagem_url = imagem_url;
    if (senha) payload.senha = senha;
    if (initialData?.id) payload.id = initialData.id;

    onSubmit(payload);
    setError("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData?.id ? "Editar Colaborador" : "Novo Colaborador"}</CardTitle>
        <CardDescription>
          {initialData?.id
            ? "Altere os dados do colaborador abaixo."
            : "Preencha os dados para cadastrar um novo colaborador."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
             
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col w-1/6">
              <Label>Cor do Colaborador</Label>
              <ColorPicker value={cor} onChange={setCor} label="Cor do Colaborador" />
            </div>
            <div className="flex flex-col space-y-1.5 w-2/6">
              <Label>Imagem do Colaborador</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagemUrl && (
                <img
                  src={imagemUrl}
                  alt="Preview"
                  className="w-20 h-20 rounded-full mt-2 object-cover border"
                />
              )}
            </div>
            <div className="flex flex-col space-y-1.5 w-3/6">
              <Label>Nome</Label>
              <Input
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                placeholder="Nome do colaborador"
                required
              />
            </div>


            </div>
            <div className="flex flex-row space-x-4">
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label>Telemóvel</Label>
              <Input
                value={telemovel}
                onChange={e => setTelemovel(e.target.value)}
                placeholder="Telemóvel"
              />
            </div>
            </div>
            <div className="flex flex-row space-x-4">
            <div className="flex flex-col space-y-1.5 w-1/2">
              <Label>Cargo</Label>
              <Select
  value={cargoId}
  onValueChange={setCargoId}
>
  <SelectTrigger>
    <SelectValue placeholder="Selecione um cargo" />
  </SelectTrigger>
  <SelectContent>
    {cargosData?.cargos?.map((cargo) => (
      <SelectItem key={cargo.id} value={String(cargo.id)}>
        {cargo.descricao}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
            </div>
            {!initialData?.id && (
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>Senha</Label>
                <Input
                  type="password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="Senha"
                  required
                />
              </div>
            )}
            </div>
           
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
          <CardFooter className="flex justify-center mt-4">
      <Button type="submit">
        {initialData?.id ? "Alterar" : "Cadastrar"}
      </Button>
      {initialData?.id && onCancel && (
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
