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
import { Combobox } from "@/components/combobox";
import { GET_UTENTES } from "@/graphql/queries";
import { CREATE_UTENTE } from "@/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { utenteSchema } from '../../lib/validationSchemas';

export default function CreateUtentesForm({
  formData,
  setFormData,
  onSubmit,
  editingUtente,
  onCancelEdit,
}: {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  editingUtente: any;
  onCancelEdit: () => void;
}) {
  const [createUtente] = useMutation(CREATE_UTENTE);
  const [error, setError] = useState("");
  const { data: utentesData } = useQuery(GET_UTENTES);

  useEffect(() => {
    if (editingUtente) {
      setFormData({
        ...formData, // Preserve existing form data
        nome: editingUtente.nome || "",
        email: editingUtente.email || "",
        telemovel: editingUtente.telemovel || "",
        morada: editingUtente.morada || "",
        distrito: editingUtente.distrito || "",
        concelho: editingUtente.concelho || "",
        codigo_postal: editingUtente.codigo_postal || "",
        pais: editingUtente.pais || "Portugal",
        nif: editingUtente.nif || "",
        sns: editingUtente.sns || "",
      });
    }
  }, [editingUtente, setFormData]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsedData = utenteSchema.safeParse(formData);
    if (!parsedData.success) {
      setError(parsedData.error.errors.map((err) => err.message).join("\n"));
      return;
    }
    const isDuplicate = utentesData?.utentes?.some(
      (utente) =>
        utente.email === formData.email ||
        utente.telemovel === formData.telemovel ||
        utente.nif === formData.nif ||
        utente.sns === formData.sns
    );

    if (isDuplicate) {
      setError(
        `<ul><li>Já existe um utente com o mesmo email, telemóvel, NIF ou SNS.</li></ul>`
      );
      return;
    }

    try {
      await createUtente({
        variables: { data: formData },
        refetchQueries: [{ query: GET_UTENTES }],
      });
      alert("Utente criado com sucesso!");
      setFormData({
        nome: "",
        email: "",
        telemovel: "",
        morada: "",
        distrito: "",
        concelho: "",
        codigo_postal: "",
        pais: "Portugal",
        nif: "",
        sns: "",
      });
      setError("");
    } catch (error) {
      setError("Erro ao criar utente.");
      console.error("Erro ao criar utente:", error);
    }
  };

  return (
    <Card className="w-full text-sm">
      <CardHeader>
        <CardTitle>{editingUtente ? "Editar Utente" : "Novo Utente"}</CardTitle>
        <CardDescription>
          {editingUtente
            ? "Altere os dados do utente abaixo."
            : "Preencha os dados para cadastrar um novo utente."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>Nome</Label>
                <Input
                  value={formData?.nome ?? ""}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome do utente"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData?.email ?? ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>Telemóvel</Label>
                <Input
                  value={formData?.telemovel ?? ""}
                  onChange={(e) => setFormData({ ...formData, telemovel: e.target.value })}
                  placeholder="Telemóvel"
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>Morada</Label>
                <Input
                  value={formData?.morada ?? ""}
                  onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
                  placeholder="Morada"
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>NIF</Label>
                <Input
                  value={formData?.nif ?? ""}
                  onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                  placeholder="NIF"
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>SNS</Label>
                <Input
                  value={formData?.sns ?? ""}
                  onChange={(e) => setFormData({ ...formData, sns: e.target.value })}
                  placeholder="SNS"
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col space-y-1.5 w-1/3">
                <Label>País</Label>
                <Combobox
                  items={[
                    { value: "Portugal", label: "Portugal" },
                    { value: "Espanha", label: "Espanha" },
                    { value: "França", label: "França" },
                    { value: "Itália", label: "Itália" },
                  ]}
                  value={formData?.pais ?? "Portugal"}
                  onChange={value => setFormData({ ...formData, pais: value })}
                  placeholder="Selecione o país"
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/3">
                <Label>Distrito</Label>
                <Combobox
                  items={[
                    { value: "Lisboa", label: "Lisboa" },
                    { value: "Coimbra", label: "Coimbra" },
                    { value: "Braga", label: "Braga" },
                    { value: "Évora", label: "Évora" },
                  ]}
                  value={formData?.distrito ?? ""}
                  onChange={value => setFormData({ ...formData, distrito: value })}
                  placeholder="Selecione um distrito"
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/3">
                <Label>Concelho</Label>
                <Combobox
                  items={[
                    { value: "Cantanhede", label: "Cantanhede" },
                    { value: "Figueira da Foz", label: "Figueira da Foz" },
                  ]}
                  value={formData?.concelho ?? ""}
                  onChange={value => setFormData({ ...formData, concelho: value })}
                  placeholder="Selecione um concelho"
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label>Código Postal</Label>
                <Input
                  value={formData?.codigo_postal ?? ""}
                  onChange={e => setFormData({ ...formData, codigo_postal: e.target.value })}
                  placeholder="Código Postal"
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4">
              
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
          <CardFooter className="flex justify-center mt-4">
            <Button type="submit">
              {editingUtente ? "Alterar" : "Cadastrar"}
            </Button>
            {editingUtente && (
              <Button className="m-4" type="button" variant="outline" onClick={onCancelEdit}>
                Cancelar
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}