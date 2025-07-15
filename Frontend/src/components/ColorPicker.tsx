import { Input } from "@/components/ui/input";


export function ColorPicker({ value, onChange}: { value: string, onChange: (v: string) => void, label?: string }) {
  return (
    <div className="flex flex-col space-y-1.5 w-1/2">

      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="h-10 w-16 p-0 border-none bg-transparent cursor-pointer"
          style={{ minWidth: 48 }}
        />
        <span className="text-xs">{value}</span>
      </div>
    </div>
  );
}