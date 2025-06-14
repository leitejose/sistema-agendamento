import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";

export function ColaboradoresFilter({
  colaboradoresData,
  loadingColaboradores,
  selectedColaboradores,
  setSelectedColaboradores,
  collapsed,
  setCollapsed,
}: {
  colaboradoresData: any;
  loadingColaboradores: boolean;
  selectedColaboradores: number[];
  setSelectedColaboradores: React.Dispatch<React.SetStateAction<number[]>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="p-4">
      <div
        className="font-semibold mb-2 flex items-center cursor-pointer select-none"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <span className="mr-2">Filtrar por Colaborador</span>
        {collapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>
      {!collapsed && (
        <div>
          {loadingColaboradores ? (
            <div>Carregando...</div>
          ) : (
            colaboradoresData?.colaboradores?.map((colab: any) => (
              <label key={colab.id} className="flex items-center gap-2 mb-1 cursor-pointer">
                <Checkbox
                  checked={selectedColaboradores.includes(Number(colab.id))}
                  onCheckedChange={(checked) => {
                    const isChecked = checked === true;
                    setSelectedColaboradores((prev) => {
                      const prevArr = prev ?? [];
                      if (isChecked) {
                        if (!prevArr.includes(Number(colab.id))) {
                          return [...prevArr, Number(colab.id)];
                        }
                        return prevArr;
                      } else {
                        return prevArr.filter((id) => id !== Number(colab.id));
                      }
                    });
                  }}
                />
                <span>{colab.nome ?? colab.descricao ?? colab.id}</span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
}