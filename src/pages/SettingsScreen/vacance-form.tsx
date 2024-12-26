import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DateFilter } from "@/components/date-filter"
import { DateFilterVacance } from "./date-filter-vacance"

export function VacanceForm() {
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
              <Input id="name" placeholder="Descreva as férias" />
            </div>
            <DateFilterVacance/>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Colaborador</Label>
              <Select>
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>Adicionar</Button>
      </CardFooter>
    </Card>
  )
}
