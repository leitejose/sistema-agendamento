import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function PdfFilterDialog({ colaboradores, onApply, open, onOpenChange }) {
  const hoje = new Date().toISOString().slice(0, 10);
  const [colaboradoresSelecionados, setColaboradoresSelecionados] = React.useState<string[]>([]);
  const [dataInicio, setDataInicio] = React.useState(hoje);
  const [dataFim, setDataFim] = React.useState(hoje);

  const handleCheckboxChange = (id: string) => {
    setColaboradoresSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  // Função para selecionar ou desmarcar todos
  const handleSelectAll = () => {
    if (colaboradoresSelecionados.length === colaboradores.length) {
      setColaboradoresSelecionados([]);
    } else {
      setColaboradoresSelecionados(colaboradores.map((c) => String(c.id)));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Filtros do Relatório</DialogTitle>
          <DialogDescription>
            Escolha os filtros desejados para gerar o relatório.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm">Colaboradores</label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                type="button"
              >
                {colaboradoresSelecionados.length === colaboradores.length ? "Desmarcar Todos" : "Selecionar Todos"}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-72 overflow-y-auto">
              {colaboradores.map((colab) => (
                <label
                  key={colab.id}
                  className="flex items-center gap-3 border rounded-lg p-3 shadow-sm bg-white cursor-pointer hover:bg-muted transition-colors"
                >
                  <Checkbox
                    checked={colaboradoresSelecionados.includes(String(colab.id))}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setColaboradoresSelecionados((prev) => {
                        if (isChecked) {
                          if (!prev.includes(String(colab.id))) {
                            return [...prev, String(colab.id)];
                          }
                          return prev;
                        } else {
                          return prev.filter((id) => id !== String(colab.id));
                        }
                      });
                    }}
                    id={`colab-${colab.id}`}
                  />
                  {colab.imagem_url ? (
                    <img
                      src={
                        colab.imagem_url.startsWith("http")
                          ? colab.imagem_url
                          : `http://localhost:3000${colab.imagem_url}`
                      }
                      alt={colab.nome ?? colab.descricao ?? colab.id}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border">
                      <span>?</span>
                    </div>
                  )}
                  <span className="text-sm">{colab.nome ?? colab.descricao ?? colab.id}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm mb-1">Data início</label>
              <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Data fim</label>
              <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onApply({
                colaboradores: colaboradoresSelecionados,
                dataInicio ,
                dataFim
              });
              onOpenChange(false);
            }}
          >
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}