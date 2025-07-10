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
    <div className="p-4 text-sm">
      <div
        className="font-semibold mb-2 text-sm flex items-center cursor-pointer select-none"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <span className="mr-2 ">Filtrar por Colaborador</span>
        {collapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>
      {!collapsed && (
        <div >
          {loadingColaboradores ? (
            <div>Carregando...</div>
          ) : (
            colaboradoresData?.colaboradores?.map((colab: any) => (
              <label
                key={colab.id}
                className="flex  items-center gap-3 mb-2 cursor-pointer rounded-md y-1 hover:bg-muted transition-colors"
              >
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
                {colab.imagem_url ? (
                  <img
                    src={
                      colab.imagem_url.startsWith("http")
                        ? colab.imagem_url
                        : `http://localhost:3000${colab.imagem_url}`
                    }
                    alt={colab.nome ?? colab.descricao ?? colab.id}
                    className="w-8 h-8 rounded-full object-cover"
                    style={{
                      border: `1px solid ${colab.cor || "#ccc"}`,
                    }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border"
                    style={{
                      border: `1px solid ${colab.cor || "#ccc"}`,
                    }}
                  >
                    <span>?</span>
                  </div>
                )}
                <span className="text-sm">{colab.nome ?? colab.descricao ?? colab.id}</span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
}