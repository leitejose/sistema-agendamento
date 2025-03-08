import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DataDoctor from "./data-doctors"

export function CardDoctor(){
  return (
    <Card>
    <CardHeader>
      <CardTitle>Marcações por Médicos</CardTitle>
      <CardDescription>Marcações realizadas para cada médico</CardDescription>
    </CardHeader>
    <CardContent>
    <div className="flex flex-col">
      <DataDoctor name="Dr. João Pereira" specialty="Ginecologia" amount={350}/>
      <DataDoctor name="Dra. Marta Carvalho" specialty="Ginecologia" amount={240}/>
      <DataDoctor name="Dra. Helena Silva" specialty="Pediatria" amount={80}/>
    </div>
    </CardContent>
  </Card>
  
  )
}