# LAST_CHECKPOINT

## Data
18/07/2026

## FAMÍLIA ATIVA — Válvula de Alta Pressão SPEEDMAQ (VAP-U20xx)
Proposta comercial será **CONSOLIDADA** (decisão de Alexandre) cobrindo os 3 componentes, todos lote 10:

| # | Código | Peça | Estado | Preço NFe |
|---|---|---|---|---|
| 046 | VAP-U2007 | Manípulo | COMPLETO 4/4 + PDF, aprovado | R$73,74/pç |
| 047 | VAP-U2001 | Corpo da Válvula | 3/4 — falta PROPOSTA_COMERCIAL | R$244,37/pç |
| 048 | VAP-U2003 | Tampa da Válvula | 1/4 — PROCESSO gerado, aguardando aprovação | pendente |

## Histórico da sessão (resumo)
1. 047 (Corpo VAP-U2001): geometria completa obtida via 2 desenhos (OP70 detalhe + OP60 completo). PROCESSO aprovado, CUSTO e PRECO_NFE gerados (markup 35%, R$244,37/pç lote 10).
2. Ao comparar preços históricos SPEEDMAQ (tabela R$/min), Alexandre revelou que 046+047 são parte de uma família da válvula de alta pressão, e existe uma 3ª peça — **VAP-U2003 (Tampa)** — já produzida antes, mas **sem nenhum registro de processo/preço salvo no sistema**.
3. Confirmado com Alexandre: a decisão de mandar roscas radiais BSP para o D760 não é só por limite de potência da live tooling (Ø8mm) — também é por **falta de posição na torre BMT45P (24 posições)** quando a peça tem muitas ferramentas. Nova memória salva: `feedback_d760_capacidade_torre.md`.
4. Criado orçamento **048/2026** para VAP-U2003 do zero (mesma metodologia de estimativa de engenharia do 047), usando o desenho VAP-U2003 Rev.1 (completo, escala 1:2).
5. Alexandre decidiu: proposta comercial será **consolidada** para os 3 componentes da família, não 3 propostas separadas.

## VAP-U2003 — dados extraídos (048)
- Barra Ø63×49mm, alumínio, peso final 0,210kg
- OD Ø62,50 | boss Ø24 h14,80 | register precisão Ø36 (0/-0,02) | furo interno Ø31,50→Ø15,40→Ø10,02
- Flange 8 furos: 4×Ø7 passante + 4×Ø4,20/M5×0,8-6H
- 3 portas radiais: 2×M.BSP1/8" + 1×M.BSP3/8" → D760
- Tempo estimado: LYNX 9,3min + D760 3,2min = **12,5min/pç**
- Custo estimado: fixos R$1.033,73 + MOD R$214,13 + CIF R$311,97 = **R$1.559,83 lote10 → R$155,98/pç**

## Pendências
- Aprovação formal do Alexandre no PROCESSO_FABRICACAO do 048 (GATE)
- Gerar ESTUDO_CUSTO + ESTUDO_PRECO_NFE do 048 (markup 35%, mesma linha do 047)
- Montar PROPOSTA_COMERCIAL CONSOLIDADA (046+047+048) — documento único pro cliente, sem dados internos
- Códigos MINIPCP "a confirmar" em ambos 047 e 048 (ver documentos)
- Comparar ambos com as-built após 1ª produção real

## Próximo número disponível
**049/2026**

## Arquivos HTML
- 047: file:///D:/IA%20MALELO/orcamentos/2026/SPEEDMAQ/047_SPEEDMAQ_VAP-U2001/
- 048: file:///D:/IA%20MALELO/orcamentos/2026/SPEEDMAQ/048_SPEEDMAQ_VAP-U2003/048_SPEEDMAQ_PROCESSO_FABRICACAO.html
