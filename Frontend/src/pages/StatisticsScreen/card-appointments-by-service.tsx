import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DataService from "./data-service"

export function CardService(){
  return (
    <Card>
    <CardHeader>
      <CardTitle>Marcações por serviço</CardTitle>
      <CardDescription>Marcações realizada filtradas por tipo de serviço</CardDescription>
    </CardHeader>
    <CardContent>
    <div className="flex flex-col">
      <DataService service="Citologia" amount={1850}/>
      <DataService service="Implanon" amount={3250}/>
      <DataService service="Consulta Ginecologica" amount={580}/>
    </div>
    </CardContent>
  </Card>
  
  )
}