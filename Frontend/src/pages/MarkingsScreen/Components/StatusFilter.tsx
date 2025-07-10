import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";

export function StatusFilter({
  statusData,
  statusLoading,
  selectedStatusIds,
  setSelectedStatusIds,
  collapsed,
  setCollapsed,
}: {
  statusData: any;
  statusLoading: boolean;
  selectedStatusIds: number[];
  setSelectedStatusIds: React.Dispatch<React.SetStateAction<number[]>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="p-4 text-sm">
      <div
        className="font-semibold mb-2 flex items-center cursor-pointer select-none"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <span className="mr-2 ">Filtrar por Status</span>
        {collapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>
      {!collapsed && (
        <div>
          {statusLoading ? (
            <div>Carregando...</div>
          ) : (
            statusData?.statusAgendamentos?.map((status: any) => (
              <div
                key={status.id}
                className="flex items-center gap-2 cursor-pointer py-1"
                onClick={() => {
                  const isChecked = !selectedStatusIds.includes(Number(status.id));
                  setSelectedStatusIds((prev) => {
                    const prevArr = prev ?? [];
                    if (isChecked) {
                      if (!prevArr.includes(Number(status.id))) {
                        return [...prevArr, Number(status.id)];
                      }
                      return prevArr;
                    } else {
                      return prevArr.filter((id) => id !== Number(status.id));
                    }
                  });
                }}
              >
                <Checkbox
                  checked={selectedStatusIds.includes(Number(status.id))}
                  tabIndex={-1}
                  className="mr-2"
                  readOnly
                />
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: status.cor,
                    border: "1px solid #ccc",
                    marginRight: 6,
                  }}
                />
                <span className="text-sm text-foreground">{status.descricao}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}