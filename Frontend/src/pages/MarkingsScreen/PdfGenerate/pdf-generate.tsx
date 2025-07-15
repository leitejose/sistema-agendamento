import React, { useEffect, useState, useMemo } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useQuery } from "@apollo/client";
import { GET_AGENDAMENTOS, GET_UTENTES, GET_COLABORADORES, GET_SERVICOS, GET_STATUS } from "@/graphql/queries";
import { format, parseISO } from "date-fns";
import { useLocation } from "react-router-dom";

interface RowData {
  id: number;
  utenteId: string; // <-- Adicione aqui
  utente: string;
  telefone: string;
  colaborador: string;
  servico: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  status: string;
  observacoes: string;
}

const agrupaPorColaborador = (dataList: RowData[]) => {
  const grupos: { [key: string]: RowData[] } = {};
  dataList.forEach((item) => {
    if (!grupos[item.colaborador]) {
      grupos[item.colaborador] = [];
    }
    grupos[item.colaborador].push(item);
  });
  return Object.keys(grupos).map((key) => ({ colaborador: key, rows: grupos[key] }));
};

export default function PdfGenerate() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const filtros = {
    colaborador: params.get("colaborador") || "",
    dataInicio: params.get("dataInicio") || "",
    dataFim: params.get("dataFim") || "",
  };

  const colaboradoresSelecionados = params.get("colaboradores")
  ? params.get("colaboradores").split(",").map(id => id.trim())
  : [];

  const { data: agData, loading: loadingAg } = useQuery(GET_AGENDAMENTOS);
  const { data: utentesData } = useQuery(GET_UTENTES);
  const { data: colaboradoresData } = useQuery(GET_COLABORADORES);
  const { data: servicosData } = useQuery(GET_SERVICOS);
  const { data: statusData } = useQuery(GET_STATUS);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Monta os dados com nomes em vez de IDs
  const dataList: RowData[] = useMemo(() => {
    if (!agData?.getAgendamentos) return [];
    return agData.getAgendamentos
      .filter((ag: any) => {
        // Filtro por colaborador (agora aceita vários)
        if (
          colaboradoresSelecionados.length > 0 &&
          !colaboradoresSelecionados.includes(String(ag.id_colaborador))
        ) {
          return false;
        }
        // Filtro por data início
        if (filtros.dataInicio && ag.data_agendamento < filtros.dataInicio) {
          return false;
        }
        // Filtro por data fim
        if (filtros.dataFim && ag.data_agendamento > filtros.dataFim) {
          return false;
        }
        return true;
      })
      .map((ag: any) => {
        const utenteObj = utentesData?.utentes?.find((u: any) => u.id === ag.id_utente);
        return {
          id: ag.id,
          utenteId: ag.id_utente, // <-- Aqui
          utente: utenteObj?.nome || ag.id_utente,
          telefone: utenteObj?.telemovel || "", // <-- Adicione esta linha
          colaborador: colaboradoresData?.colaboradores?.find((c: any) => c.id === ag.id_colaborador)?.descricao || ag.id_colaborador,
          servico: servicosData?.servicos?.find((s: any) => s.id === ag.id_servicos)?.descricao || ag.id_servicos,
          data: ag.data_agendamento ? format(parseISO(ag.data_agendamento), 'dd/MM/yyyy') : "",
          horaInicio: ag.hora_inicio ? format(parseISO(ag.hora_inicio), "HH:mm") : "",
          horaFim: ag.hora_fim ? format(parseISO(ag.hora_fim), "HH:mm") : "",
          status: statusData?.statusAgendamentos?.find((s: any) => s.id === ag.statusId)?.descricao || ag.statusId,
          observacoes: ag.observacoes,
        };
      });
  }, [agData, utentesData, colaboradoresData, servicosData, statusData]);

  const grouped = useMemo(() => agrupaPorColaborador(dataList), [dataList]);

  useEffect(() => {
    if (loadingAg || !dataList.length) return;

    async function createPdf() {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([841.89, 595.28]); // landscape
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const logoUrl = "/LogoMM.png";
      const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
      const logoImg = await pdfDoc.embedPng(logoBytes);

      function drawHeader(page, font, pdfDoc) {
        // Logo
        page.drawImage(logoImg, { x: 40, y: 540, width: 80, height: 40 });
        // Título
        page.drawText("Relatório de Agendamentos", {
          x: 300, y: 570, size: 16, font, color: rgb(0, 0, 0)
        });
        // Data de geração
        page.drawText(`Gerado em: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, {
          x: 650, y: 570, size: 9, font, color: rgb(0.3, 0.3, 0.3)
        });
        // Período filtrado
        let periodo = "";
        if (filtros.dataInicio && filtros.dataFim) {
          periodo = `Período: ${format(parseISO(filtros.dataInicio), "dd/MM/yyyy")} até ${format(parseISO(filtros.dataFim), "dd/MM/yyyy")}`;
        } else if (filtros.dataInicio) {
          periodo = `A partir de: ${format(parseISO(filtros.dataInicio), "dd/MM/yyyy")}`;
        } else if (filtros.dataFim) {
          periodo = `Até: ${format(parseISO(filtros.dataFim), "dd/MM/yyyy")}`;
        }
        if (periodo) {
          page.drawText(periodo, {
            x: 300, y: 550, size: 11, font, color: rgb(0.2, 0.2, 0.2)
          });
        }
      }

      drawHeader(page, font, pdfDoc);

      // Espaçamento extra após a logo/cabeçalho
      let y = 510; // por exemplo, antes estava 550. Ajuste conforme desejar.
      const minY = 40;

      const headers = ["Hora", "ID Utente", "Utente", "Telefone", "Serviço", "Data", "Status", "Observações"];
      const colWidths = [60, 60, 120, 100, 120, 80, 80, 180];

      grouped.forEach(group => {
        // Título do colaborador
        page.drawText(`Colaborador: ${group.colaborador}`, { x: 40, y, size: 10, font, color:rgb(0, 0, 0)});
        y -= 10;

        // Linha de separação
        page.drawLine({
          start: { x: 40, y },
          end: { x: 800, y }, // ajuste o valor de x final conforme a largura da sua tabela
          thickness: 1,
          color: rgb(0.7, 0.7, 0.7),
        });
        y -= 12;

        // Cabeçalho da tabela
        let x = 40;
        headers.forEach((header, i) => {
          page.drawText(header, { x, y, size: 9, font, color: rgb(0,0,0) });
          x += colWidths[i];
        });
        y -= 18;
            // Linha de separação
        page.drawLine({
          start: { x: 40, y },
          end: { x: 800, y }, // ajuste o valor de x final conforme a largura da sua tabela
          thickness: 1,
          color: rgb(0.7, 0.7, 0.7),
        });
        y -= 12;


        group.rows.forEach(row => {
          if (y < minY) {
            page = pdfDoc.addPage([841.89, 595.28]);
            y = 550;
            page.drawText(`Colaborador: ${group.colaborador}`, { x: 40, y, size: 8, font, color: rgb(0.1,0.1,0.5) });
            y -= 10;

            // Linha de separação
            page.drawLine({
              start: { x: 40, y },
              end: { x: 800, y }, // ajuste o valor de x final conforme a largura da sua tabela
              thickness: 1,
              color: rgb(0.7, 0.7, 0.7),
            });
            y -= 12;

            let x = 40;
            headers.forEach((header, i) => {
              page.drawText(header, { x, y, size: 8, font, color: rgb(0,0,0) });
              x += colWidths[i]; // ajuste as larguras conforme necessário
            });
            y -= 18;
          }
          let x = 40;
          [
            row.horaInicio,
            row.utenteId,   // <-- ID do utente aqui!
            row.utente,
            row.telefone,
            row.servico,
            row.data,
            row.status,
            row.observacoes
          ].forEach((cell, i) => {
            page.drawText(String(cell), { x, y, size: 9, font, color: rgb(0,0,0) });
            x += colWidths[i];
          });
          y -= 16;
        });
        page.drawLine({
            start: { x: 40, y },
            end: { x: 800, y }, // ajuste o valor de x final conform
            
            color: rgb(0.7, 0.7, 0.7),
            });
        y -= 12;

        // Adiciona o total de consultas do colaborador
        page.drawText(
          `Total de Consultas: ${group.rows.length}`,
          { x: 650, y, size: 10, font, color: rgb(0, 0, 0) } // ajuste x conforme necessário
        );
        y -= 8;

        page.drawLine({
            start: { x: 40, y },

            end: { x: 800, y }, // ajuste o valor de x final conforme a largura da sua tabela
            thickness: 1,   
            color: rgb(0.7, 0.7, 0.7),
            });
        y -= 16;
    
        
    
    });

    // Adiciona rodapé com informações da empresa e número da página
    page.drawText("MM Medicina da Mulher - www.medicinadamulher.pt | Tel: +351 239841100", {
      x: 40, y: 20, size: 9, font, color: rgb(0.4, 0.4, 0.4)
    });
    page.drawText(`Página 1`, {
      x: 750, y: 20, size: 9, font, color: rgb(0.4, 0.4, 0.4)
    });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }
    createPdf();
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [grouped, loadingAg]);

  return (
    <div>
      <h2>Agendamento</h2>
      {loadingAg && <div>Carregando agendamentos...</div>}
      {pdfUrl && (
        <div style={{ marginBottom: 16 }}>
      
            
          <iframe
            src={pdfUrl}
            width="100%"
            height="800px"
            title="PDF Preview"
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
}