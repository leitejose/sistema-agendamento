import React, { useEffect, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useQuery } from "@apollo/client";
import { GET_UTENTES } from "@/graphql/queries";
import { useParams } from "react-router-dom";

function wrapText(text: string, font: any, fontSize: number, maxWidth: number) {
  const words = text.split(" ");
  let lines: string[] = [];
  let currentLine = "";

  for (let word of words) {
    const testLine = currentLine ? currentLine + " " + word : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export default function PdfCliente() {
  const { id } = useParams(); // Supondo que o id do cliente vem pela rota
  const { data: utentesData, loading } = useQuery(GET_UTENTES);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (loading || !utentesData?.utentes) return;
    const cliente = utentesData.utentes.find((u: any) => String(u.id) === String(id));
    if (!cliente) return;

    async function createPdf() {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // 1ª folha
      let page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
      const logoUrl = "/LogoMM.png";
      const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
      const logoImg = await pdfDoc.embedPng(logoBytes);

      // Logo centralizada
      page.drawImage(logoImg, {
        x: (595.28 - 120) / 2,
        y: 841.89 - 120,
        width: 120,
        height: 60,
      });

      // Título
      
      page.drawText("Ficha do Cliente", {
        x: 180,
        y: 700,
        size: 20,
        font,
        color: rgb(0, 0, 0),
      });

      // Dados do cliente
      const dados = [
        `Nome: ${cliente.nome}`,
        `Email: ${cliente.email}`,
        `Telemóvel: ${cliente.telemovel}`,
        `Morada: ${cliente.morada || ""}`,
        `Distrito: ${cliente.distrito || ""}`,
        `Concelho: ${cliente.concelho || ""}`,
        `Código Postal: ${cliente.codigo_postal || ""}`,
        `País: ${cliente.pais || ""}`,
      ];
      let y = 650;
      dados.forEach((linha) => {
        page.drawText(linha, { x: 80, y, size: 13, font, color: rgb(0.2, 0.2, 0.2) });
        y -= 28;
      });

      // 2ª folha
      let page2 = pdfDoc.addPage([595.28, 841.89]);

      // Título centralizado
      const titulo1 = "DECLARAÇÃO DE CONSENTIMENTO DO TRATAMENTO DE";
      const titulo2 = "DADOS PESSOAIS E DE SAÚDE";
      const fontSizeTitulo = 11;
      const pageWidth = 595.28;

      const titulo1Width = font.widthOfTextAtSize(titulo1, fontSizeTitulo);
      const titulo2Width = font.widthOfTextAtSize(titulo2, fontSizeTitulo);

      page2.drawText(titulo1, {
        x: (pageWidth - titulo1Width) / 2,
        y: 810,
        size: fontSizeTitulo,
        font,
        color: rgb(0, 0, 0),
      });
      page2.drawText(titulo2, {
        x: (pageWidth - titulo2Width) / 2,
        y: 795,
        size: fontSizeTitulo,
        font,
        color: rgb(0, 0, 0),
      });

      // Texto principal com quebra automática
      const textoProtecao = [
        "Declaro para os efeitos previstos no Regulamento Geral de Proteção de Dados (RGPD) (EU)2016/679 do Parlamento Europeu e do Conselho de 27 de abril de 2016 prestar, por este meio, o meu EXPRESSO CONSENTIMENTO para o tratamento dos meus dados pessoais e de saúde, os quais tenho direito ou responsabilidade informado, fornecido ou cedido à MM Medicina da Mulher Lda, Pessoa Coletiva nº 503 963 542, com sede na Av. Navarro e Sousa, 32, 2º, 3000-271 Coimbra, sob compromisso desta entidade manter a confidencialidade dos dados e a identidade das pessoas responsáveis pelo tratamento e recolha dos dados, nomeadamente: imagens em fotografia e vídeo, processo clínico, documentação administrativa, arquivos e ficheiros, exames clínicos, boletins e registos de informação, informação em redes sociais ou outros. Declaro permitir sem prejuízo do atrás disposto, ser contactado pela MM Medicina da Mulher Lda, por carta, ofício, SMS, email, telefone ou qualquer outra plataforma eletrónica ou digital e autorizo que a entidade trate os meus dados de saúde com entidades terceiras prestadoras de cuidados, acesso e realização de exames de saúde, a divulgação dos meus dados pessoais e de saúde de forma não nominativa sempre que tenham por finalidade divulgar a terceiros a atividade da instituição ou para fins de estudo, interesse público reconhecido, ensaios clínicos e atividade científica, salvo se por escrito manifestar vontade em contrário ou por motivo de força maior deixarem de estar reunidas as condições necessárias para a manutenção do tratamento dos meus dados, sendo que, neste último caso, os referidos dados poderão ser conservados para efeitos de estudo e investigação clínica, sem limite temporal para os efeitos descritos da lei. A MM Medicina da Mulher Lda. garante o cumprimento do disposto no Regulamento Geral de Proteção de Dados Pessoais, bem como na demais legislação aplicável, obrigando-se a respeitar e a cumprir o direito ao apagamento e à portabilidade dos meus dados, e a não colocar à disposição de terceiros os meus dados pessoais e/ou de saúde de forma nominativa, sem a minha autorização pessoal.",
        "",
        "Mais declaro, para os efeitos do Regulamento Geral de Proteção de Dados – RGPD, ter tomado pleno conhecimento e compreendido devidamente os direitos que me assistem relativamente aos meus dados pessoais e o teor completo da presente declaração:",
      ]
      ;
      let y2 = 780;
      const maxWidth = 500; // ajuste conforme necessário
      textoProtecao.forEach((linha) => {
        const wrapped = wrapText(linha, font, 9.5, maxWidth);
        wrapped.forEach((l) => {
          page2.drawText(l, { x: 40, y: y2, size: 9.5, font, color: rgb(0, 0, 0) });
          y2 -= 14;
        });
        y2 -= 4; // espaço extra entre parágrafos
      });

      // Campos para preenchimento
      page2.drawText("Nome:", { x: 40, y: y2 - 10, size: 10, font, color: rgb(0, 0, 0) });
      page2.drawLine({ start: { x: 80, y: y2 - 8 }, end: { x: 250, y: y2 - 8 }, thickness: 1, color: rgb(0, 0, 0) });

      page2.drawText("Nacionalidade:", { x: 270, y: y2 - 10, size: 10, font, color: rgb(0, 0, 0) });
      page2.drawLine({ start: { x: 350, y: y2 - 8 }, end: { x: 520, y: y2 - 8 }, thickness: 1, color: rgb(0, 0, 0) });

      page2.drawText("Portador do [ ] B.I. [ ] C.C. [ ] Tit. Res. com o número:", { x: 40, y: y2 - 35, size: 10, font, color: rgb(0, 0, 0) });
      page2.drawLine({ start: { x: 250, y: y2 - 33 }, end: { x: 400, y: y2 - 33 }, thickness: 1, color: rgb(0, 0, 0) });

      page2.drawText("válido até: ____/____/________", { x: 410, y: y2 - 35, size: 10, font, color: rgb(0, 0, 0) });

      page2.drawText("(Deverá ser assinado pelo próprio utente ou seu representante legal)", { x: 40, y: y2 - 60, size: 9, font, color: rgb(0.2, 0.2, 0.2) });

      page2.drawText("Assinatura igual ao Documento de identificação", { x: 160, y: y2 - 100, size: 10, font, color: rgb(0, 0, 0) });
      page2.drawLine({ start: { x: 120, y: y2 - 110 }, end: { x: 470, y: y2 - 110 }, thickness: 1, color: rgb(0, 0, 0) });

      // Área "A preencher pela MM"
      page2.drawText("A preencher pela MM", { x: 40, y: y2 - 150, size: 10, font, color: rgb(0, 0, 0) });
      page2.drawLine({ start: { x: 40, y: y2 - 155 }, end: { x: 520, y: y2 - 155 }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });

      page2.drawText("Identidade validada: [ ]Sim [ ]Não", { x: 40, y: y2 - 170, size: 10, font, color: rgb(0, 0, 0) });
      page2.drawText("Data de Validação: ____/____/____", { x: 220, y: y2 - 170, size: 10, font, color: rgb(0, 0, 0) });

      page2.drawText("Documento de identificação pessoal validado: [ ]B.I. [ ]C.C. [ ]Tit. Res", { x: 40, y: y2 - 190, size: 10, font, color: rgb(0, 0, 0) });

      page2.drawText("Rubrica:", { x: 400, y: y2 - 190, size: 10, font, color: rgb(0, 0, 0) });
      page2.drawLine({ start: { x: 440, y: y2 - 188 }, end: { x: 520, y: y2 - 188 }, thickness: 1, color: rgb(0, 0, 0) });

      // Salvar PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }
    createPdf();
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [loading, utentesData, id]);

  return (
    <div>
      {loading && <div>Carregando dados do cliente...</div>}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="800px"
          title="PDF Cliente"
          style={{ border: "1px solid #ccc" }}
        />
      )}
    </div>
  );
}