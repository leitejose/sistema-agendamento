import { Calendar } from "@/components/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

export function DatePicker({ selected, onChange }: DatePickerProps) {
  console.log("DatePicker selected:", selected);
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          selected={selected ?? undefined}
          onSelect={(date) => onChange(date ?? null)}
          mode="single"
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
