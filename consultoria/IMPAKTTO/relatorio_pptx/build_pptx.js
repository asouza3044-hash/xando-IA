// Cronoanalise IMPAKTTO - gera apresentacao executiva
// Le dados de dados_relatorio.json (produzido por gerar_dados.py)

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const DADOS_PATH = path.join(__dirname, "dados_relatorio.json");
if (!fs.existsSync(DADOS_PATH)) {
  console.error(`ERRO: ${DADOS_PATH} nao encontrado. Rode primeiro: python gerar_dados.py`);
  process.exit(1);
}
const D = JSON.parse(fs.readFileSync(DADOS_PATH, "utf-8"));

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Alexandre Souza";
pres.title = "Cronoanalise IMPAKTTO";

// Paleta
const NAVY = "1F3A5F", ORANGE = "E87722", GREEN = "2E933C", RED = "C0392B";
const GREY_DARK = "3C4858", GREY_LIGHT = "E5E7EB", BG_PAGE = "F5F7FA";
const WHITE = "FFFFFF", NAVY_LIGHT = "7DA0CA";
const FONT_HEADER = "Segoe UI", FONT_BODY = "Segoe UI";

function brNum(n) { return Number(n).toLocaleString("pt-BR"); }
function brPct(n) { return Number(n).toFixed(1).replace(".", ",") + "%"; }

// =====================================================================
// SLIDE 1 — CAPA (sem branding LASEC)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.4, h: 7.5, fill: { color: ORANGE }, line: { type: "none" } });
  s.addText("DIAGNÓSTICO DE PRODUTIVIDADE", {
    x: 0.9, y: 0.5, w: 11, h: 0.4,
    fontFace: FONT_HEADER, fontSize: 11, bold: true,
    color: ORANGE, charSpacing: 4,
  });
  s.addText("CRONOANÁLISE", {
    x: 0.9, y: 2.0, w: 11.5, h: 1.2,
    fontFace: FONT_HEADER, fontSize: 60, bold: true,
    color: WHITE, charSpacing: 2, margin: 0,
  });
  s.addText("IMPAKTTO", {
    x: 0.9, y: 3.2, w: 11.5, h: 1.0,
    fontFace: FONT_HEADER, fontSize: 60, bold: true,
    color: ORANGE, charSpacing: 2, margin: 0,
  });
  s.addText("Usinagem CNC · 1ª foto-teste", {
    x: 0.9, y: 4.4, w: 11.5, h: 0.5,
    fontFace: FONT_HEADER, fontSize: 22,
    color: WHITE, italic: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.9, y: 5.20, w: 4.0, h: 0.04,
    fill: { color: ORANGE }, line: { type: "none" },
  });
  const infoY = 5.5;
  s.addText([
    { text: "CLIENTE OBSERVADO\n", options: { fontSize: 10, color: NAVY_LIGHT, charSpacing: 2 } },
    { text: D.cliente_principal, options: { fontSize: 18, bold: true, color: WHITE } },
  ], { x: 0.9, y: infoY, w: 3.8, h: 1.0, fontFace: FONT_HEADER, margin: 0 });
  s.addText([
    { text: "PERÍODO\n", options: { fontSize: 10, color: NAVY_LIGHT, charSpacing: 2 } },
    { text: D.periodo, options: { fontSize: 17, bold: true, color: WHITE } },
  ], { x: 4.9, y: infoY, w: 4.5, h: 1.0, fontFace: FONT_HEADER, margin: 0 });
  s.addText([
    { text: "APONTAMENTOS OBSERVADOS\n", options: { fontSize: 10, color: NAVY_LIGHT, charSpacing: 2 } },
    { text: `${D.kpis.ops} OPs · ${brNum(D.kpis.produzido)} peças`, options: { fontSize: 18, bold: true, color: WHITE } },
  ], { x: 9.6, y: infoY, w: 3.5, h: 1.0, fontFace: FONT_HEADER, margin: 0 });
  s.addText(`${D.kpis.ops} OPs observadas · ${brNum(D.kpis.produzido)} peças produzidas · ${D.kpis.paradas} paradas registradas`, {
    x: 0.9, y: 6.85, w: 12.0, h: 0.4,
    fontFace: FONT_HEADER, fontSize: 11,
    color: NAVY_LIGHT, italic: true, margin: 0,
  });
}

// Helper — cabecalho padrao (sem branding LASEC no rodape)
function addContentHeader(s, title, subtitle, numSlide) {
  s.background = { color: BG_PAGE };
  s.addText(title.toUpperCase(), {
    x: 0.6, y: 0.4, w: 12.0, h: 0.55,
    fontFace: FONT_HEADER, fontSize: 26, bold: true,
    color: NAVY, charSpacing: 1, margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.6, y: 0.95, w: 12.0, h: 0.35,
      fontFace: FONT_BODY, fontSize: 12,
      color: GREY_DARK, italic: true, margin: 0,
    });
  }
  s.addShape(pres.shapes.RECTANGLE, {
    x: 12.45, y: 0.45, w: 0.35, h: 0.35,
    fill: { color: ORANGE }, line: { type: "none" },
  });
  // Rodape clean: so numero do slide e periodo
  if (numSlide) {
    s.addText(`${numSlide}`, {
      x: 0.6, y: 7.10, w: 0.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: GREY_DARK, margin: 0,
    });
  }
  s.addText(`Período observado: ${D.periodo}`, {
    x: 9.0, y: 7.10, w: 3.7, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9,
    color: GREY_DARK, italic: true, align: "right", margin: 0,
  });
}

function addKpiCard(s, x, y, w, h, label, value, sub, accentColor) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.10, h, fill: { color: accentColor }, line: { type: "none" },
  });
  s.addText(label.toUpperCase(), {
    x: x + 0.25, y: y + 0.25, w: w - 0.35, h: 0.35,
    fontFace: FONT_HEADER, fontSize: 10, bold: true,
    color: GREY_DARK, charSpacing: 2, margin: 0,
  });
  s.addText(value, {
    x: x + 0.25, y: y + 0.65, w: w - 0.35, h: 1.0,
    fontFace: FONT_HEADER, fontSize: 44, bold: true,
    color: NAVY, margin: 0,
  });
  s.addText(sub, {
    x: x + 0.25, y: y + 1.65, w: w - 0.35, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11,
    color: GREY_DARK, margin: 0,
  });
}

// =====================================================================
// SLIDE 2 — KPIs PRINCIPAIS
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Indicadores-chave", `Visão executiva da produção observada · ${D.periodo} · cliente ${D.cliente_principal}`, "02");

  const cardW = 2.95, cardH = 2.2, gap = 0.15, cardY = 1.7, startX = 0.6;
  addKpiCard(s, startX + (cardW + gap) * 0, cardY, cardW, cardH,
    "OPs Registradas", String(D.kpis.ops), "ordens de produção observadas", NAVY);
  addKpiCard(s, startX + (cardW + gap) * 1, cardY, cardW, cardH,
    "Peças Produzidas", brNum(D.kpis.produzido), "soma da QTD_PROD no período", ORANGE);
  addKpiCard(s, startX + (cardW + gap) * 2, cardY, cardW, cardH,
    "% Atendido", brPct(D.kpis.pct_atendido), `${brNum(D.kpis.produzido)} produzidas / ${brNum(D.kpis.pedido)} pedidas`, GREEN);
  addKpiCard(s, startX + (cardW + gap) * 3, cardY, cardW, cardH,
    "Paradas Registradas", String(D.kpis.paradas), "ocorrências de COD_PARADA preenchido", RED);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.25, w: 12.20, h: 2.55,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.25, w: 0.10, h: 2.55,
    fill: { color: NAVY }, line: { type: "none" },
  });
  s.addText("LEITURA EXECUTIVA", {
    x: 0.85, y: 4.42, w: 11.0, h: 0.35,
    fontFace: FONT_HEADER, fontSize: 11, bold: true,
    color: NAVY, charSpacing: 3, margin: 0,
  });
  const topOp = D.operadores[0];
  const topPareto = D.pareto_paradas[0];
  s.addText([
    { text: "Amostra observada:", options: { bold: true, color: NAVY } },
    { text: ` ${D.kpis.ops} apontamentos no período ${D.periodo}.`, options: { color: GREY_DARK, breakLine: true } },
    { text: `% de atendimento (${brPct(D.kpis.pct_atendido)}):`, options: { bold: true, color: NAVY } },
    { text: ` ${brNum(D.kpis.produzido)} peças produzidas contra ${brNum(D.kpis.pedido)} pedidas — investigar mix de OPs e capacidade no período.`, options: { color: GREY_DARK, breakLine: true } },
    { text: `${D.kpis.paradas} paradas registradas:`, options: { bold: true, color: NAVY } },
    { text: topPareto ? ` ${topPareto.pct}% concentradas em ${topPareto.cod} (${topPareto.descricao}).` : " ver detalhamento no slide 8.", options: { color: GREY_DARK, breakLine: true } },
    { text: "Top operador:", options: { bold: true, color: NAVY } },
    { text: ` ${topOp.nome} com ${brNum(topOp.qtd)} peças (${brPct(topOp.pct)} do total).`, options: { color: GREY_DARK } },
  ], {
    x: 0.85, y: 4.85, w: 12.0, h: 1.90,
    fontFace: FONT_BODY, fontSize: 11.5,
    paraSpaceAfter: 6, margin: 0, valign: "top",
  });
}

// =====================================================================
// SLIDE 3 — RANKING DE OPERADORES
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Ranking de operadores", "Quantidade produzida por operador · ordem decrescente", "03");

  const labels = D.operadores.map(o => o.nome);
  const values = D.operadores.map(o => o.qtd);

  s.addChart(pres.charts.BAR, [{ name: "Peças produzidas", labels, values }], {
    x: 0.6, y: 1.55, w: 7.6, h: 5.3,
    barDir: "bar", chartColors: [NAVY],
    chartArea: { fill: { color: WHITE } },
    catAxisLabelFontFace: FONT_BODY, catAxisLabelFontSize: 11, catAxisLabelColor: GREY_DARK,
    valAxisLabelFontSize: 10, valAxisLabelColor: GREY_DARK,
    valGridLine: { color: GREY_LIGHT, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontSize: 11, dataLabelFontBold: true, dataLabelColor: NAVY,
    showLegend: false, barGapWidthPct: 35,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.45, y: 1.55, w: 4.35, h: 5.3,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.45, y: 1.55, w: 0.10, h: 5.3,
    fill: { color: ORANGE }, line: { type: "none" },
  });
  s.addText("DESTAQUES", {
    x: 8.7, y: 1.75, w: 4.0, h: 0.35,
    fontFace: FONT_HEADER, fontSize: 11, bold: true,
    color: NAVY, charSpacing: 3, margin: 0,
  });
  const top = D.operadores[0];
  s.addText([
    { text: top.nome, options: { bold: true, color: NAVY, fontSize: 18, breakLine: true } },
    { text: `${brNum(top.qtd)} peças (${brPct(top.pct)} do total)`, options: { color: GREY_DARK, fontSize: 11 } },
  ], { x: 8.7, y: 2.15, w: 4.0, h: 0.85, fontFace: FONT_BODY, paraSpaceAfter: 2, margin: 0 });

  const ilegivel = D.operadores.find(o => o.nome === "Operador ilegível");
  if (ilegivel) {
    s.addText([
      { text: "Operador ilegível", options: { bold: true, color: RED, fontSize: 14, breakLine: true } },
      { text: `${brNum(ilegivel.qtd)} peças (${brPct(ilegivel.pct)}) — apontamentos sem operador legível na captura`, options: { color: GREY_DARK, fontSize: 10 } },
    ], { x: 8.7, y: 3.10, w: 4.0, h: 0.85, fontFace: FONT_BODY, paraSpaceAfter: 2, margin: 0 });
  }
  const totOp = D.operadores.length;
  s.addText([
    { text: `${totOp} operadores mapeados`, options: { bold: true, color: NAVY, fontSize: 13, breakLine: true } },
    { text: ilegivel ? "1 com leitura comprometida — confirmar lista oficial com cliente" : "todos com leitura legível", options: { color: GREY_DARK, fontSize: 10 } },
  ], { x: 8.7, y: 4.10, w: 4.0, h: 0.85, fontFace: FONT_BODY, paraSpaceAfter: 2, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.7, y: 5.3, w: 4.0, h: 0.02,
    fill: { color: GREY_LIGHT }, line: { type: "none" },
  });
  s.addText([
    { text: "AÇÃO IMEDIATA", options: { bold: true, color: ORANGE, fontSize: 10, charSpacing: 2, breakLine: true } },
    { text: ilegivel
        ? `Capturar nova foto em melhor resolução para resgatar os ${brNum(ilegivel.qtd)} pcs do operador ilegível.`
        : "Cronometrar ciclos das peças do top do mix para definir tempos-padrão.",
      options: { color: GREY_DARK, fontSize: 10 } },
  ], { x: 8.7, y: 5.45, w: 4.0, h: 1.3, fontFace: FONT_BODY, paraSpaceAfter: 2, margin: 0 });
}

// =====================================================================
// SLIDE 4 — MIX DE PRODUÇÃO POR PEÇA
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Mix de produção por peça", "Distribuição de QTD_PROD por número da peça (ID_OP)", "04");

  const labels = D.pecas.map(p => p.id);
  const values = D.pecas.map(p => p.qtd);
  const cores = [NAVY, ORANGE, GREEN, "F39C12", NAVY_LIGHT, "C0392B", "3C4858", "7DA0CA"];

  s.addChart(pres.charts.DOUGHNUT, [{ name: "Mix", labels, values }], {
    x: 0.6, y: 1.55, w: 6.5, h: 5.3,
    chartColors: cores.slice(0, labels.length),
    chartArea: { fill: { color: WHITE } },
    showPercent: true, showLegend: true, legendPos: "r",
    legendFontSize: 11, legendFontFace: FONT_BODY, legendColor: GREY_DARK,
    dataLabelFontSize: 11, dataLabelFontBold: true, dataLabelColor: WHITE,
    holeSize: 60,
  });

  const headerStyle = { bold: true, color: WHITE, fill: { color: NAVY }, valign: "middle", align: "center" };
  const corBase = [NAVY, ORANGE, GREEN, "92400E", GREY_DARK];
  const linhas = [[
    { text: "ID Peça", options: headerStyle },
    { text: "Qtd", options: headerStyle },
    { text: "% Mix", options: headerStyle },
  ]];
  D.pecas.forEach((p, i) => {
    linhas.push([
      { text: p.id, options: { color: corBase[i] || GREY_DARK, bold: i < 4 } },
      { text: brNum(p.qtd), options: {} },
      { text: brPct(p.pct), options: {} },
    ]);
  });
  linhas.push([
    { text: "TOTAL", options: { bold: true, fill: { color: BG_PAGE } } },
    { text: brNum(D.kpis.produzido), options: { bold: true, fill: { color: BG_PAGE } } },
    { text: "100,0%", options: { bold: true, fill: { color: BG_PAGE } } },
  ]);

  s.addTable(linhas, {
    x: 7.5, y: 1.85, w: 5.30, colW: [2.0, 1.6, 1.7],
    fontFace: FONT_BODY, fontSize: 12, color: GREY_DARK,
    border: { type: "solid", pt: 0.5, color: GREY_LIGHT },
    align: "center", valign: "middle", rowH: 0.42,
  });

  const top2 = D.pecas.slice(0, 2);
  const pct2 = top2.reduce((a, p) => a + p.pct, 0);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 5.20, w: 5.30, h: 1.55,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 5.20, w: 0.10, h: 1.55,
    fill: { color: GREEN }, line: { type: "none" },
  });
  s.addText([
    { text: "CONCENTRAÇÃO", options: { fontSize: 10, bold: true, color: GREEN, charSpacing: 2, breakLine: true } },
    { text: `${top2.length} peças (${top2.map(p => p.id).join(" e ")})`, options: { fontSize: 11, bold: true, color: NAVY, breakLine: true } },
    { text: `respondem por ${brPct(pct2)} da produção do período. Priorizar cronometragem dessas peças para o tempo-padrão.`, options: { fontSize: 10, color: GREY_DARK } },
  ], { x: 7.75, y: 5.30, w: 4.95, h: 1.40, fontFace: FONT_BODY, paraSpaceAfter: 2, margin: 0 });
}

// =====================================================================
// SLIDE 5 — ATENDIMENTO POR PEÇA (NOVO - metas alcançadas)
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Atendimento por peça", "Produzido x Pedido por número da peça · quão longe da meta cada peça está", "05");

  const labels = D.atendimento_peca.map(a => a.id);
  const produzido = D.atendimento_peca.map(a => a.produzido);
  const pedido = D.atendimento_peca.map(a => a.pedido);

  s.addChart(pres.charts.BAR, [
    { name: "Produzido", labels, values: produzido },
    { name: "Pedido",    labels, values: pedido },
  ], {
    x: 0.6, y: 1.55, w: 7.6, h: 5.3,
    barDir: "col", barGrouping: "clustered",
    chartColors: [GREEN, NAVY_LIGHT],
    chartArea: { fill: { color: WHITE } },
    catAxisLabelFontSize: 12, catAxisLabelColor: GREY_DARK,
    valAxisLabelFontSize: 10, valAxisLabelColor: GREY_DARK,
    valGridLine: { color: GREY_LIGHT, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontSize: 9, dataLabelColor: GREY_DARK,
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: GREY_DARK,
    barGapWidthPct: 35,
  });

  // Tabela lateral com % atendimento
  const headerStyle = { bold: true, color: WHITE, fill: { color: NAVY }, valign: "middle", align: "center", fontSize: 10 };
  const linhas = [[
    { text: "Peça",  options: headerStyle },
    { text: "Ped.",  options: headerStyle },
    { text: "Prod.", options: headerStyle },
    { text: "% Met.",options: headerStyle },
  ]];
  D.atendimento_peca.forEach(a => {
    let corPct = GREEN;
    if (a.pct < 30) corPct = RED;
    else if (a.pct < 60) corPct = ORANGE;
    linhas.push([
      { text: a.id, options: { bold: true, color: NAVY } },
      { text: brNum(a.pedido), options: {} },
      { text: brNum(a.produzido), options: {} },
      { text: brPct(a.pct), options: { bold: true, color: corPct } },
    ]);
  });

  s.addTable(linhas, {
    x: 8.45, y: 1.55, w: 4.35, colW: [1.2, 1.05, 1.05, 1.05],
    fontFace: FONT_BODY, fontSize: 11, color: GREY_DARK,
    border: { type: "solid", pt: 0.5, color: GREY_LIGHT },
    align: "center", valign: "middle", rowH: 0.40,
  });

  // Bloco insight
  const piorPeca = D.atendimento_peca.reduce((m, a) => a.pct < m.pct ? a : m, D.atendimento_peca[0]);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.45, y: 4.95, w: 4.35, h: 1.85,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.45, y: 4.95, w: 0.10, h: 1.85,
    fill: { color: RED }, line: { type: "none" },
  });
  s.addText([
    { text: "PEÇA MAIS CRÍTICA", options: { fontSize: 10, bold: true, color: RED, charSpacing: 2, breakLine: true } },
    { text: piorPeca.id, options: { fontSize: 18, bold: true, color: NAVY, breakLine: true } },
    { text: `Atendimento de apenas ${brPct(piorPeca.pct)}: ${brNum(piorPeca.produzido)} de ${brNum(piorPeca.pedido)} pedidas.`, options: { fontSize: 10, color: GREY_DARK, breakLine: true } },
    { text: `Gap de ${brNum(piorPeca.gap)} peças no período.`, options: { fontSize: 10, bold: true, color: RED } },
  ], { x: 8.7, y: 5.10, w: 4.0, h: 1.65, fontFace: FONT_BODY, paraSpaceAfter: 3, margin: 0 });
}

// =====================================================================
// SLIDE 6 — MATRIZ OPERADOR × PEÇA (NOVO)
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Matriz Operador × Peça", "Quantidade produzida em cada cruzamento · identifica especialização e gargalos", "06");

  const M = D.matriz_op_peca;
  const ops = M.operadores;
  const pcs = M.pecas;

  // Constroi tabela
  const headerStyle = { bold: true, color: WHITE, fill: { color: NAVY }, valign: "middle", align: "center", fontSize: 11 };
  const linhas = [[
    { text: "Operador", options: headerStyle },
    ...pcs.map(p => ({ text: p, options: headerStyle })),
    { text: "Total", options: { ...headerStyle, fill: { color: ORANGE } } },
  ]];
  ops.forEach(op => {
    const totalLinha = pcs.reduce((a, p) => a + (M.celulas[op][p] || 0), 0);
    const linha = [{ text: op, options: { bold: true, color: NAVY, align: "left", valign: "middle", fontSize: 11 } }];
    pcs.forEach(p => {
      const v = M.celulas[op][p] || 0;
      // colorir celulas por intensidade
      let fill = WHITE;
      if (v >= 50) fill = "BBE0BC";       // verde fraco
      else if (v >= 20) fill = "E2EBC8";  // verde claro
      else if (v > 0)   fill = "F5F7FA";  // cinza muito claro
      linha.push({
        text: v > 0 ? brNum(v) : "—",
        options: { fill: { color: fill }, align: "center", valign: "middle", fontSize: 11,
                   color: v > 0 ? NAVY : "9CA3AF",
                   bold: v >= 50 },
      });
    });
    linha.push({ text: brNum(totalLinha), options: { bold: true, color: NAVY, fill: { color: "FFEDD5" }, align: "center", valign: "middle", fontSize: 11 } });
    linhas.push(linha);
  });
  // Linha total
  const totalLinha = [{ text: "Total", options: { bold: true, color: WHITE, fill: { color: NAVY }, align: "left", valign: "middle", fontSize: 11 } }];
  pcs.forEach(p => {
    const t = ops.reduce((a, op) => a + (M.celulas[op][p] || 0), 0);
    totalLinha.push({ text: brNum(t), options: { bold: true, color: WHITE, fill: { color: NAVY }, align: "center", valign: "middle", fontSize: 11 } });
  });
  totalLinha.push({ text: brNum(D.kpis.produzido), options: { bold: true, color: WHITE, fill: { color: ORANGE }, align: "center", valign: "middle", fontSize: 11 } });
  linhas.push(totalLinha);

  // Largura: 1ª coluna 2.5", peca cols repartidas, total 1.3"
  const wTab = 11.0;
  const wOp = 2.5, wTot = 1.3;
  const wPeca = (wTab - wOp - wTot) / pcs.length;

  s.addTable(linhas, {
    x: 1.0, y: 1.65, w: wTab,
    colW: [wOp, ...pcs.map(() => wPeca), wTot],
    fontFace: FONT_BODY,
    border: { type: "solid", pt: 0.5, color: GREY_LIGHT },
    rowH: 0.40,
  });

  // Legenda de cor
  const legY = 5.3;
  s.addText("Intensidade de cor proporcional ao volume produzido no cruzamento:", {
    x: 1.0, y: legY, w: 11.0, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, italic: true, color: GREY_DARK, margin: 0,
  });
  const legendaCores = [
    { fill: "F5F7FA", label: "1 a 19 pcs" },
    { fill: "E2EBC8", label: "20 a 49 pcs" },
    { fill: "BBE0BC", label: "50 pcs ou mais" },
  ];
  legendaCores.forEach((c, i) => {
    const lx = 1.0 + i * 2.5;
    s.addShape(pres.shapes.RECTANGLE, {
      x: lx, y: legY + 0.4, w: 0.3, h: 0.25,
      fill: { color: c.fill }, line: { color: GREY_LIGHT, width: 0.5 },
    });
    s.addText(c.label, {
      x: lx + 0.4, y: legY + 0.40, w: 2.0, h: 0.25,
      fontFace: FONT_BODY, fontSize: 10, color: GREY_DARK, margin: 0, valign: "middle",
    });
  });

  // Insight
  s.addText([
    { text: "LEITURA: ", options: { bold: true, color: NAVY, fontSize: 11 } },
    { text: `${ops[0]} concentra-se na peça ${pcs[0]}; ${pcs.length} peças e ${ops.length} operadores observados. Use a matriz para reatribuir cargas e equilibrar treinamento.`,
      options: { color: GREY_DARK, fontSize: 11 } },
  ], {
    x: 1.0, y: legY + 0.85, w: 11.0, h: 0.4,
    fontFace: FONT_BODY, margin: 0,
  });
}

// =====================================================================
// SLIDE 7 — TENDÊNCIA DIÁRIA (NOVO)
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Tendência diária de produção", "Quantidade de peças produzidas por dia no período observado", "07");

  const labels = D.tendencia_diaria.map(t => t.data);
  const values = D.tendencia_diaria.map(t => t.qtd);

  s.addChart(pres.charts.LINE, [{ name: "Peças/dia", labels, values }], {
    x: 0.6, y: 1.55, w: 8.3, h: 5.3,
    chartColors: [NAVY],
    chartArea: { fill: { color: WHITE } },
    catAxisLabelFontSize: 11, catAxisLabelColor: GREY_DARK,
    valAxisLabelFontSize: 10, valAxisLabelColor: GREY_DARK,
    valGridLine: { color: GREY_LIGHT, size: 0.5 }, catGridLine: { style: "none" },
    lineSize: 3, lineSmooth: false,
    lineDataSymbol: "circle", lineDataSymbolSize: 10, lineDataSymbolLineColor: NAVY,
    showValue: true, dataLabelPosition: "t",
    dataLabelFontSize: 11, dataLabelFontBold: true, dataLabelColor: NAVY,
    showLegend: false,
  });

  // Card resumo lateral
  const total = values.reduce((a, b) => a + b, 0);
  const dias = values.length;
  const media = dias > 0 ? Math.round(total / dias) : 0;
  const max = values.reduce((m, v, i) => v > m.v ? { v, dia: labels[i] } : m, { v: 0, dia: "" });
  const min = values.reduce((m, v, i) => (m.v === null || v < m.v) ? { v, dia: labels[i] } : m, { v: null, dia: "" });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.15, y: 1.55, w: 3.65, h: 5.3,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.15, y: 1.55, w: 0.10, h: 5.3,
    fill: { color: NAVY }, line: { type: "none" },
  });
  s.addText("RESUMO TEMPORAL", {
    x: 9.4, y: 1.75, w: 3.3, h: 0.35,
    fontFace: FONT_HEADER, fontSize: 11, bold: true,
    color: NAVY, charSpacing: 3, margin: 0,
  });

  s.addText([
    { text: `${dias}`, options: { fontSize: 30, bold: true, color: NAVY, breakLine: true } },
    { text: "dias com produção", options: { fontSize: 10, color: GREY_DARK } },
  ], { x: 9.4, y: 2.20, w: 3.3, h: 0.85, fontFace: FONT_BODY, margin: 0 });

  s.addText([
    { text: `${brNum(media)}`, options: { fontSize: 26, bold: true, color: ORANGE, breakLine: true } },
    { text: "peças/dia (média)", options: { fontSize: 10, color: GREY_DARK } },
  ], { x: 9.4, y: 3.20, w: 3.3, h: 0.85, fontFace: FONT_BODY, margin: 0 });

  s.addText([
    { text: "MELHOR DIA  ", options: { bold: true, color: GREEN, fontSize: 9, charSpacing: 1 } },
    { text: `${max.dia}: ${brNum(max.v)} peças`, options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 4, breakLine: true } },
    { text: "PIOR DIA  ", options: { bold: true, color: RED, fontSize: 9, charSpacing: 1 } },
    { text: `${min.dia}: ${brNum(min.v)} peças`, options: { color: GREY_DARK, fontSize: 10 } },
  ], { x: 9.4, y: 4.30, w: 3.3, h: 2.0, fontFace: FONT_BODY, paraSpaceAfter: 2, margin: 0, valign: "top" });
}

// =====================================================================
// SLIDE 8 — PARETO DE PARADAS (com descrições)
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Pareto de paradas", `Frequência por código de parada com descrições oficiais do formulário (${D.kpis.paradas} registros)`, "08");

  const codigos = D.pareto_paradas.map(p => p.cod);
  const ocorr = D.pareto_paradas.map(p => p.ocorr);
  const acumulado = D.pareto_paradas.map(p => p.acum);

  s.addChart([
    { type: pres.charts.BAR, data: [{ name: "Ocorrências", labels: codigos, values: ocorr }],
      options: { barDir: "col", chartColors: [NAVY] } },
    { type: pres.charts.LINE, data: [{ name: "% Acumulado", labels: codigos, values: acumulado }],
      options: { secondaryValAxis: true, secondaryCatAxis: true, chartColors: [ORANGE] } },
  ], {
    x: 0.6, y: 1.55, w: 8.3, h: 5.3,
    chartArea: { fill: { color: WHITE } },
    catAxisLabelFontSize: 12, catAxisLabelColor: GREY_DARK,
    valAxes: [
      { showValAxisTitle: true, valAxisTitle: "Ocorrências", valAxisTitleFontSize: 10, valAxisTitleColor: NAVY,
        valAxisLabelFontSize: 10, valAxisLabelColor: NAVY,
        valGridLine: { color: GREY_LIGHT, size: 0.5 } },
      { showValAxisTitle: true, valAxisTitle: "% Acumulado", valAxisTitleFontSize: 10, valAxisTitleColor: ORANGE,
        valAxisLabelFontSize: 10, valAxisLabelColor: ORANGE,
        valGridLine: { style: "none" }, valAxisMinVal: 0, valAxisMaxVal: 100 },
    ],
    catAxes: [
      { catAxisLabelFontSize: 12, catAxisLabelColor: GREY_DARK },
      { catAxisHidden: true },
    ],
    showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontSize: 11, dataLabelFontBold: true, dataLabelColor: NAVY,
    lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 8,
    showLegend: true, legendPos: "b", legendFontSize: 11, legendColor: GREY_DARK,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.15, y: 1.55, w: 3.65, h: 5.3,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.15, y: 1.55, w: 0.10, h: 5.3,
    fill: { color: RED }, line: { type: "none" },
  });
  s.addText("CÓDIGOS DETALHADOS", {
    x: 9.4, y: 1.75, w: 3.3, h: 0.35,
    fontFace: FONT_HEADER, fontSize: 11, bold: true,
    color: NAVY, charSpacing: 3, margin: 0,
  });

  const blocos = [];
  D.pareto_paradas.slice(0, 6).forEach((p, idx) => {
    const cor = idx === 0 ? RED : (idx === 1 ? NAVY : ORANGE);
    blocos.push(
      { text: `${p.cod} — ${p.descricao}`, options: { bold: true, color: cor, fontSize: 10, breakLine: true } },
      { text: `${p.ocorr} ocorr. (${p.pct}%) · acum. ${p.acum}%`, options: { color: GREY_DARK, fontSize: 9, breakLine: true } },
      { text: " ", options: { fontSize: 4, breakLine: true } }
    );
  });
  s.addText(blocos, {
    x: 9.4, y: 2.10, w: 3.30, h: 4.7,
    fontFace: FONT_BODY, paraSpaceAfter: 2, margin: 0, valign: "top",
  });
}

// =====================================================================
// SLIDE 9 — DETALHE DAS OPs
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, `Detalhe das ${D.kpis.ops} ordens de produção`, "Apontamentos importados e consolidados · campos limpos para apresentação", "09");

  const headerStyle = { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: 10, valign: "middle", align: "center" };
  const cellBase = { fontSize: 9, color: GREY_DARK, valign: "middle" };
  const rows = [[
    { text: "Data", options: headerStyle },
    { text: "Cliente", options: headerStyle },
    { text: "ID Peça", options: headerStyle },
    { text: "Qtd Prod.", options: headerStyle },
    { text: "Qtd Ped.", options: headerStyle },
    { text: "Operador", options: headerStyle },
    { text: "Parada", options: headerStyle },
  ]];
  D.detalhe.forEach((row, idx) => {
    const isTeste = (row[1] || "").toLowerCase() !== "matro";
    rows.push(row.map((c, i) => ({
      text: String(c),
      options: {
        ...cellBase,
        fill: { color: isTeste ? "FFF7ED" : (idx % 2 === 0 ? WHITE : BG_PAGE) },
        align: i === 5 ? "left" : "center",
        bold: i === 3 && !isTeste,
        italic: isTeste,
        color: c === "—" ? "6B7280" : (isTeste ? "92400E" : (i === 3 ? NAVY : GREY_DARK)),
      },
    })));
  });
  const espacoDisponivel = 4.9;
  const rowH = Math.min(0.28, espacoDisponivel / rows.length);
  s.addTable(rows, {
    x: 0.6, y: 1.55, w: 12.20,
    colW: [1.1, 1.4, 1.6, 1.7, 1.6, 2.6, 2.20],
    fontFace: FONT_BODY,
    border: { type: "solid", pt: 0.5, color: GREY_LIGHT },
    rowH,
  });
  s.addText([
    { text: "Notas: ", options: { bold: true, color: NAVY } },
    { text: "(1) '—' = leitura comprometida na foto. ", options: { color: GREY_DARK } },
    { text: "(2) Linhas em destaque laranja são OPs fora do cliente principal. ", options: { color: "92400E" } },
    { text: "(3) '[?]' em códigos de parada = sem correspondência na legenda do formulário.", options: { color: GREY_DARK } },
  ], {
    x: 0.6, y: 6.45, w: 12.2, h: 0.60,
    fontFace: FONT_BODY, fontSize: 9, italic: true, margin: 0,
  });
}

// =====================================================================
// SLIDE 10 — LIMITAÇÕES + PRÓXIMOS PASSOS (CONSOLIDADO)
// =====================================================================
{
  const s = pres.addSlide();
  addContentHeader(s, "Limitações da 1ª coleta + próximos passos", "Transparência sobre o que ficou pendente e plano de ação", "10");

  // BLOCO ESQUERDO: Limitações (vermelho)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.55, w: 6.0, h: 5.30,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.55, w: 6.0, h: 0.10,
    fill: { color: RED }, line: { type: "none" },
  });
  s.addText("LIMITAÇÕES DESTA COLETA", {
    x: 0.85, y: 1.80, w: 5.5, h: 0.4,
    fontFace: FONT_HEADER, fontSize: 13, bold: true, color: RED, charSpacing: 2, margin: 0,
  });
  s.addText("Análises bloqueadas pela ausência de dados no formulário:", {
    x: 0.85, y: 2.20, w: 5.5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, italic: true, color: GREY_DARK, margin: 0,
  });

  s.addText([
    { text: "Coluna MÁQUINA não preenchida", options: { bold: true, color: NAVY, fontSize: 12, breakLine: true } },
    { text: "Campo em branco no formulário em 100% dos apontamentos. Bloqueia análises Máquina × Operador, Máquina × Peça e produtividade por equipamento.",
      options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "Tempo real de parada (T_PARADA_MIN) ausente", options: { bold: true, color: NAVY, fontSize: 12, breakLine: true } },
    { text: "Os códigos de parada estão registrados, mas a duração não. Impede calcular tempo perdido em cada categoria.",
      options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "Tempo-padrão (TP) ainda não definido", options: { bold: true, color: NAVY, fontSize: 12, breakLine: true } },
    { text: "Sem o TP é impossível calcular eficiência real (produção esperada vs realizada). Requer cronometragem de campo.",
      options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 6, breakLine: true } },
    { text: "4 operadores ilegíveis (148 peças)", options: { bold: true, color: NAVY, fontSize: 12, breakLine: true } },
    { text: "29,8% da produção atribuída a 'Operador ilegível' — perde-se ranqueamento e responsabilização individual.",
      options: { color: GREY_DARK, fontSize: 10 } },
  ], {
    x: 0.85, y: 2.65, w: 5.5, h: 4.15,
    fontFace: FONT_BODY, paraSpaceAfter: 3, margin: 0, valign: "top",
  });

  // BLOCO DIREITO: Próximos Passos (verde)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 1.55, w: 5.95, h: 5.30,
    fill: { color: WHITE }, line: { color: GREY_LIGHT, width: 1 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.08 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 1.55, w: 5.95, h: 0.10,
    fill: { color: GREEN }, line: { type: "none" },
  });
  s.addText("PRÓXIMOS PASSOS", {
    x: 7.10, y: 1.80, w: 5.5, h: 0.4,
    fontFace: FONT_HEADER, fontSize: 13, bold: true, color: GREEN, charSpacing: 2, margin: 0,
  });
  s.addText("O que destrava as análises na 2ª coleta:", {
    x: 7.10, y: 2.20, w: 5.5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, italic: true, color: GREY_DARK, margin: 0,
  });

  const topPar = D.pareto_paradas[0];
  s.addText([
    { text: "CURTO PRAZO (1-2 sem)  ", options: { bold: true, color: ORANGE, fontSize: 10, charSpacing: 1, breakLine: true } },
    { text: "• Preencher MÁQUINA em todos os formulários", options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: "• Padronizar campo OPERADOR (letra legível)", options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: "• Anotar tempo de cada parada (col. PARADA)", options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 5, breakLine: true } },
    { text: "MÉDIO PRAZO (3-4 sem)  ", options: { bold: true, color: NAVY, fontSize: 10, charSpacing: 1, breakLine: true } },
    { text: "• Cronometrar 5-8 ciclos das peças 31552 e 30809", options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: "• Definir tempo-padrão por peça", options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: `• Atacar causa-raiz de ${topPar ? topPar.cod + " (" + topPar.descricao + ")" : "P07"}`, options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: " ", options: { fontSize: 5, breakLine: true } },
    { text: "LONGO PRAZO (1-3 meses)  ", options: { bold: true, color: GREEN, fontSize: 10, charSpacing: 1, breakLine: true } },
    { text: "• Calcular produtividade Operador × Máquina × Peça", options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: "• Migrar relatório para Power BI (já preparado)", options: { color: GREY_DARK, fontSize: 10, breakLine: true } },
    { text: "• Treinar equipe no preenchimento padronizado", options: { color: GREY_DARK, fontSize: 10 } },
  ], {
    x: 7.10, y: 2.65, w: 5.5, h: 4.15,
    fontFace: FONT_BODY, paraSpaceAfter: 1, margin: 0, valign: "top",
  });
}

// =====================================================================
// SLIDE 11 — CRÉDITOS / CONTATO
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.4, h: 7.5, fill: { color: ORANGE }, line: { type: "none" } });

  s.addText("OBRIGADO.", {
    x: 0.9, y: 2.0, w: 11.5, h: 1.0,
    fontFace: FONT_HEADER, fontSize: 56, bold: true,
    color: WHITE, charSpacing: 2, margin: 0,
  });
  s.addText("Vamos transformar dados em decisões na fábrica.", {
    x: 0.9, y: 3.0, w: 11.5, h: 0.5,
    fontFace: FONT_HEADER, fontSize: 18,
    color: NAVY_LIGHT, italic: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.9, y: 3.80, w: 4.0, h: 0.04,
    fill: { color: ORANGE }, line: { type: "none" },
  });

  s.addText("APRESENTAÇÃO PREPARADA POR", {
    x: 0.9, y: 4.30, w: 11.5, h: 0.35,
    fontFace: FONT_HEADER, fontSize: 11, bold: true,
    color: ORANGE, charSpacing: 4, margin: 0,
  });
  s.addText("Alexandre Souza", {
    x: 0.9, y: 4.70, w: 11.5, h: 0.7,
    fontFace: FONT_HEADER, fontSize: 36, bold: true,
    color: WHITE, margin: 0,
  });
  s.addText("Consultor em cronoanálise e produtividade industrial", {
    x: 0.9, y: 5.45, w: 11.5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 13,
    color: NAVY_LIGHT, italic: true, margin: 0,
  });

  s.addText([
    { text: "CONTATO\n", options: { fontSize: 10, color: NAVY_LIGHT, charSpacing: 2 } },
    { text: "a.souza3044@gmail.com", options: { fontSize: 16, bold: true, color: WHITE } },
  ], { x: 0.9, y: 6.20, w: 11.5, h: 0.7, fontFace: FONT_HEADER, margin: 0 });
}

// =====================================================================
// SAVE
// =====================================================================
const SAIDA = path.join(__dirname, "..", "entregaveis", "CRONOANALISE_IMPAKTTO_v1.pptx");
pres.writeFile({ fileName: SAIDA })
  .then(name => console.log(`OK  PPTX gerado em ${name}`))
  .catch(err => { console.error("Erro:", err); process.exit(1); });
