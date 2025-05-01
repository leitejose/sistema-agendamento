import { Combobox} from "@/components/combobox"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CREATE_UTENTE, GET_UTENTES } from "@/graphql/queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { z } from 'zod';

const CreateUtenteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  telemovel: z.string().regex(/^\d+$/, 'Número de telemóvel inválido'),
  morada: z.string().optional(),
  distrito: z.string().optional(),
  concelho: z.string().optional(),
  codigo_postal: z.string().regex(/^\d+$/, 'Código postal inválido').optional(),
  pais: z.string().min(1, 'País é obrigatório'),
});

export default function CreateUtentesDialog({ children }: { children: React.ReactNode }) {
  const [createUtente] = useMutation(CREATE_UTENTE);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telemovel: "",
    morada: "",
    distrito: "",
    concelho: "",
    codigo_postal: "",
    pais: "Portugal", // País fixo
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async () => {
    try {
      // Validação com Zod
      const parsedData = CreateUtenteSchema.safeParse(formData);
      if (!parsedData.success) {
        alert(parsedData.error.errors.map((err) => err.message).join('\n'));
        return;
      }

      // Envia os dados ao backend
      await createUtente({
        variables: {
          data: formData,
        },
        refetchQueries: [{ query: GET_UTENTES }],
      });

      alert('Utente criado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        telemovel: '',
        morada: '',
        distrito: '',
        concelho: '',
        codigo_postal: '',
        pais: 'Portugal',
      });

      // Fecha o diálogo
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Erro ao criar utente:', error);
      alert('Erro ao criar utente.');
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Utente</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo utente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome do utente
            </Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Digite o nome"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Digite o e-mail"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telemovel" className="text-right">
              Telemóvel
            </Label>
            <Input
              id="telemovel"
              value={formData.telemovel}
              onChange={(e) => setFormData({ ...formData, telemovel: e.target.value })}
              placeholder="Digite o telemóvel"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="morada" className="text-right">
              Endereço
            </Label>
            <Input
              id="morada"
              value={formData.morada}
              onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
              placeholder="Digite a morada"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pais" className="text-right">
              País
            </Label>
            <Combobox
              items={[
                { value: "PT", label: "Portugal" },
                { value: "ES", label: "Espanha" },
                { value: "FR", label: "França" },
                { value: "IT", label: "Itália" },
              ]}
              value={formData.pais}
              onChange={(value) => setFormData({ ...formData, pais: value })}
              placeholder="Selecione o país"
              
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="distrito" className="text-right">
              Distrito
            </Label>
            <Combobox
              items={[
                { value: "Li", label: "Lisboa" },
                { value: "Co", label: "Coimbra" },
                { value: "Br", label: "Braga" },
                { value: "Ev", label: "Évora" },
              ]}
              value={formData.distrito}
              onChange={(value) => setFormData({ ...formData, distrito: value })}
              placeholder="Selecione um distrito"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="concelho" className="text-right">
              Concelho
            </Label>
            <Combobox
              items={[
                { value: "CNT", label: "Cantanhede" },
                { value: "FDF", label: "Figueira da Foz" },
              ]}
              value={formData.concelho}
              onChange={(value) => setFormData({ ...formData, concelho: value })}
              placeholder="Selecione um concelho"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="codigo_postal" className="text-right">
              Código Postal
            </Label>
            <Input
              id="codigo_postal"
              value={formData.codigo_postal}
              onChange={(e) => setFormData({ ...formData, codigo_postal: e.target.value })}
              placeholder="Digite o código postal"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
