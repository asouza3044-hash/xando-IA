---
name: PDF proposta sempre 1 página
description: Propostas comerciais devem gerar PDF em 1 única página. Usar script CDP com Edge headless e scale 0.78.
type: feedback
---

Propostas comerciais DEVEM caber em 1 única página no PDF.

**Why:** Alexandre ficou muito frustrado quando o PDF saiu em 2 páginas. É requisito do cliente receber tudo em 1 folha.

**How to apply:**
- NUNCA usar `--print-to-pdf` direto do Edge (ignora scale/zoom CSS)
- SEMPRE usar o script Python CDP: `D:\IA MALELO\templates\gerar_pdf_proposta.py`
- Scale padrão: 0.78 (ajustar se necessário)
- Margins: top/bottom 0.08in, left/right 0.16in
- printBackground: true, displayHeaderFooter: false
- Matar processos Edge e leitor PDF antes de gerar
- Conferir o PDF gerado antes de entregar
