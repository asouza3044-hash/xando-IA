---
name: feedback-broca-tmax-bd-cruzamento
description: "Ao especificar broca de pré-furo em PROCESSO_FABRICACAO, SEMPRE cruzar com BD MINIPCP — usar Tmax e código real, não \"Broca MD\" genérico"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 37bb328d-9b1a-42f4-900a-78356712d304
---

Toda broca de pré-furo especificada num PROCESSO_FABRICACAO DEVE ser cruzada com `D:\IA MALELO\banco_dados\MINIPCP.csv` (ou BD MINIPCP.xlsx) ANTES de finalizar o documento — código de ferramenta + pastilha real, não "Broca MD ØXX" genérico.

**Why:** Correção de Alexandre no orçamento 044/2026 (15/06/2026): "BROCA TMAX DE 29MM VC NÃO CRUZOU COM O BD DA MALELO, FICA ESPERTO". Eu tinha especificado "Broca MD Ø29-30" (043) e "Broca MD Ø33-34" (044) sem código BD e sem confirmar que o Vc proposto correspondia à ferramenta real disponível na LASEC.

**Ferramentas Tmax disponíveis no BD MINIPCP (pré-furo em torno):**
- Maior Tmax disponível = **Ø29mm** — código suporte `08.08.060` ("Tmax Ø29 Taegu Tec")
- Pastilhas: `08.07.034` (SPGG 090408 DA K10 Tmax 29 — Iscar/TaeguTec, não revestida) ou `08.07.036` (SPMG 090408 DG TT9030 Tmax 29 — revestida, melhor p/ aço)
- Outros tamanhos Tmax no BD: Ø23 (08.08.063), Ø20 (08.08.061), Ø18 (08.08.096), Ø14,5/12 etc — usar apenas se Ø29 não couber no furo final

**Regra já existente (regras_usinagem.md):** "Broca Tmax: usar maior diâmetro disponível que caiba no furo final (ex: Ø29 Tmax para furo Ø52)" — ou seja, **Ø29 é o padrão de pré-furo sempre que o furo final for ≥ ~31mm** (deixar parede suficiente p/ mandrilamento).

**How to apply:**
- Em QUALQUER operação de furação/pré-furo no PROCESSO_FABRICACAO, usar código Tmax Ø29 (08.08.060 + 08.07.036) como padrão quando o furo final ≥ ~31mm, com Vc/RPM compatível com pastilha TT9030 em aço (Vc ~120-150 m/min)
- NUNCA escrever "Broca MD ØXX" sem código — sempre indicar código de suporte + pastilha do BD MINIPCP
- Corrigido nos orçamentos 043/2026 (bore Ø33,7) e 044/2026 (bore Ø35,4) — ambos agora usam Tmax Ø29 (08.08.060/08.07.036)
