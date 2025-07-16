"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { agendamentoSchema } from "../../lib/validationSchemas";

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  council: string;
  postalCode: string;
}

export default function NewAppointmentScreen({
  children,
  onSave,
}: {
  children: React.ReactNode;
  onSave: (newAppointment: Appointment) => void;
}) {
  const [appointmentData, setAppointmentData] = useState<Partial<Appointment>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    council: "",
    postalCode: "",
  });

  const handleInputChange = (
    field: keyof Appointment,
    value: string
  ) => {
    setAppointmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now(), // Gera um ID único
    } as Appointment;

    const validationResult = agendamentoSchema.safeParse(newAppointment);

    if (!validationResult.success) {
      console.error(validationResult.error.errors);
      alert("Por favor, corrija os erros antes de salvar.");
      return;
    }

    onSave(newAppointment); // Salva o agendamento
    setAppointmentData({
      name: "",
      email: "",
      phone: "",
      address: "",
      district: "",
      council: "",
      postalCode: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Marcação</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar uma nova marcação.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome do Utente
            </Label>
            <Input
              id="name"
              value={appointmentData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
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
              type="email"
              value={appointmentData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Digite um e-mail válido"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Telemóvel
            </Label>
            <Input
              id="phone"
              value={appointmentData.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Digite um telemóvel válido"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Endereço
            </Label>
            <Input
              id="address"
              value={appointmentData.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Digite o endereço de residência"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="district" className="text-right">
              Distrito
            </Label>
            <Input
              id="district"
              value={appointmentData.district || ""}
              onChange={(e) => handleInputChange("district", e.target.value)}
              placeholder="Digite o distrito"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="council" className="text-right">
              Concelho
            </Label>
            <Input
              id="council"
              value={appointmentData.council || ""}
              onChange={(e) => handleInputChange("council", e.target.value)}
              placeholder="Digite o concelho em que reside"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="postalCode" className="text-right">
              Código Postal
            </Label>
            <Input
              id="postalCode"
              value={appointmentData.postalCode || ""}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              placeholder="Digite o código postal"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
