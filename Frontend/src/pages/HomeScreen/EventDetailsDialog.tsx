import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export function EventDetailsTooltip({
  children,
  event,
}: {
  children: React.ReactNode;
  event: any;
}) {
  if (!event) return children;
  const parts = event.title.split(" - ");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1 text-xs">
            <div><span className="font-semibold">Utente:</span> {parts[0]}</div>
            <div><span className="font-semibold">Serviço:</span> {parts[1]}</div>
            <div><span className="font-semibold">Colaborador:</span> {parts[2]}</div>
            <div><span className="font-semibold">Hora:</span> {parts[3]}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}