---
name: feedback-fonte-verdade-custos-planilha
description: Taxa/custo de máquina SEMPRE vem da planilha custos_ferramentaria lasec.xls (aba Custos 2026) — nunca de número copiado à mão na memória. Specs técnicas vêm de agente/knowledge/maquinas-lasec.md
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d62f2772-e7fb-4f19-9d96-202795cc3680
  modified: 2026-07-27T14:03:11.372Z
---

## As taxas de máquina e os dados técnicos têm FONTE DE VERDADE em arquivo — consultar, não decorar

**Custo hora-máquina:** `D:\IA MALELO\banco_dados\custos_ferramentaria lasec.xls`, aba **"Custos 2026"**
(ler com `python3` + `xlrd`; se faltar: `python3 -m pip install xlrd`).
**Dados técnicos** (rotação, avanço, potência, cursos, torre): `D:\IA MALELO\agente\knowledge\maquinas-lasec.md`.
Espelho consolidado das duas fontes: `memory/maquinas_specs.md` (re-sincronizar se divergir do original).

**Why:** Em 27/07/2026 o Alexandre apontou que essas tabelas "já deveriam estar sendo sempre consultadas" —
e ao abrir a planilha, confirmaram-se erros que estavam na memória por terem sido copiados à mão:
- **GL 280 estava R$76,95/h na `maquinas_specs.md` — o correto é R$86,86/h.** O R$76,95 na verdade é a
  taxa de **Projeto CAD/CAM** (código 30 da planilha, R$76,96) — alguém confundiu as linhas. Por sorte os
  orçamentos reais que usaram GL280 (034/2026) usaram o valor certo (R$86,86), então NÃO houve prejuízo
  emitido — mas o risco era real se o valor errado tivesse sido puxado.
- **Centur 30D estava R$60,48/h — o correto é R$62,22/h.**
- **Setup torno:** o correto é **R$144,52/h** (a planilha calcula do valor sem arredondar:
  83,08 × 1,1597 × 1,5 = 144,52). Eu tinha "corrigido" para R$144,53 inventando arredondamento — errado.
- **D760 é Romi (Discovery), não Doosan** — só o LYNX é Doosan. A memória de legado dizia "Doosan D760".
- O arquivo técnico `maquinas-lasec.md` (rotação/avanço/potência das 8 máquinas) EXISTIA mas não estava
  referenciado em nenhuma skill nem memória — não estava sendo consultado.

**How to apply:**
1. Antes de escrever QUALQUER taxa de máquina num orçamento, conferir contra `memory/maquinas_specs.md`
   (espelho) e, na menor dúvida ou divergência, reabrir a planilha `custos_ferramentaria lasec.xls`.
2. NUNCA copiar taxa de cabeça ou de um orçamento antigo sem conferir a fonte.
3. Só as 4 máquinas ATIVAS (GL280 86,86 / LYNX 96,35 / D760-3E 121,49 / D760-4E 151,86) entram em custo.
4. Se a planilha for atualizada (novo dissídio/IPCA), re-sincronizar `maquinas_specs.md` e avisar o Alexandre.

Ver [[especificacoes-maquinas-cnc-lasec]] e [[projeto_maquinas_legado]].
