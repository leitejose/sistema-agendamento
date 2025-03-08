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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateUtentesScreen({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Colaborador</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo colaborador.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome do Colaborador
            </Label>
            <Input id="name" placeholder="Digite o nome" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Digite um e-mail válido" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Telemóvel
            </Label>
            <Input id="telemovel" placeholder="Digite um telemovel válido" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Cargo
            </Label>
            <Input id="name" placeholder="Digite o Cargo" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Especialidade
            </Label>
            <Input id="name" placeholder="Digite a especialidade" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
              Permissão
            </Label>
          <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Permissões" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Utilizador Padrão">Utilizador Padrão</SelectItem>
    <SelectItem value="Moderador">Moderador</SelectItem>
    <SelectItem value="Administrador">Administrador</SelectItem>
  </SelectContent>
</Select>

          </div>
          
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
