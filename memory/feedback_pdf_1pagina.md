---
name: PDF proposta - 1 página + preencher folha por diagramação
description: Propostas em 1 página via CDP scale 0.78. Preencher folha por espaçamento HTML, não por scale.
type: feedback
---

Propostas comerciais DEVEM caber em 1 única página no PDF E preencher a folha toda.

**Why:** Alexandre reclamou que HTML preenchia a folha mas PDF não. Solução NÃO é aumentar scale — é melhorar a diagramação (espaçamento entre seções no HTML).

**How to apply:**
- NUNCA usar `--print-to-pdf` direto do Edge (ignora scale/zoom CSS)
- SEMPRE usar o script Python CDP: `D:\IA MALELO\templates\gerar_pdf_proposta.py`
- Scale padrão: **0.78** (NÃO alterar para resolver espaço em branco)
- Margins: top/bottom 0.08in, left/right 0.16in
- printBackground: true, displayHeaderFooter: false
- Para preencher a folha: ajustar margins/padding entre seções no HTML
- Matar processos Edge e leitor PDF antes de gerar
- Conferir o PDF gerado antes de entregar
