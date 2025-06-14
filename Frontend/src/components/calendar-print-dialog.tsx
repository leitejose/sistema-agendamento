// components/calendar-print-dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function CalendarPrintDialog({ events }: { events: any[] }) {
  const [interval, setInterval] = useState({ start: "09:00", end: "17:00" });

  function handlePrint() {
    window.print();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          Imprimir Calendário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full p-6">
        <DialogHeader>
          <DialogTitle>Imprimir Calendário</DialogTitle>
        </DialogHeader>

        {/* Intervalo de horário */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium">De:</label>
            <input
              type="time"
              value={interval.start}
              onChange={(e) => setInterval({ ...interval, start: e.target.value })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Até:</label>
            <input
              type="time"
              value={interval.end}
              onChange={(e) => setInterval({ ...interval, end: e.target.value })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Miniatura visual do calendário (simplificada) */}
        <div className="border rounded p-4 max-h-[500px] overflow-auto bg-white">
          <div className="grid grid-cols-7 text-sm font-semibold text-center mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          {/* Aqui você pode mapear seus `events` agrupando por data */}
          {/* Este é um exemplo simplificado */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="border h-24 p-1 overflow-auto text-xs">
                <div className="font-bold text-[10px] mb-1">{i + 1} Junho</div>
                {events
                  .filter((e) => new Date(e.start).getDate() === i + 1)
                  .map((ev) => (
                    <div
                      key={ev.id}
                      className="truncate text-white px-1 py-0.5 rounded"
                      style={{ backgroundColor: ev.backgroundColor }}
                      title={ev.title}
                    >
                      {ev.title.split(" - ")[1]}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handlePrint}>Imprimir</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
