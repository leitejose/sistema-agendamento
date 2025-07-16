"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateFilter({
  className,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}: React.HTMLAttributes<HTMLDivElement> & {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
}) {
  return (
    <div className={cn("grid gap-2 flex justify-end p-5", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !startDate && !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {startDate && endDate ? (
              <>
                {format(new Date(startDate), "LLL dd, y")} -{" "}
                {format(new Date(endDate), "LLL dd, y")}
              </>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date(startDate)}
            selected={{ from: new Date(startDate), to: new Date(endDate) }}
            onSelect={(range) => {
              if (range?.from)
                onStartDateChange(range.from.toISOString().split("T")[0]);
              if (range?.to)
                onEndDateChange(range.to.toISOString().split("T")[0]);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={onFilter}>Filtrar</Button>
    </div>
  );
}
