import { MenuComponent } from "@/components/nav-menu";
import { CardsData } from "./cards-data";
import { BarComponent } from "./bar-chart";
import { CardDoctor } from "./card-appointments-by-doctor";
import { DateFilter } from "@/components/date-filter";
import { Button } from "@/components/ui/button"
import { CardService } from "./card-appointments-by-service";



export default function Page() {
  return (
    <>
      <header>
        <MenuComponent />
      </header>
        <div className="flex flex-col items-center justify-center">
        <DateFilter/>
        <div className="flex justify-center p-2">
          <div className="pr-5">
        <Button>Download</Button>
          </div>
          <div className="pl-5">
        <Button>Imprimir</Button>
          </div>
        </div>
        </div>
      <div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <CardsData />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="p-4 w-1/2">
          <BarComponent />
        </div>
        <div className="flex w-1/2 flex-line gap-4 p-4">
          <div className="w-1/2">
            <CardDoctor />
          </div>
          <div className="w-1/2 ">
            <CardService />
          </div>
        </div>
      </div>
    </>
  );
}
