---
name: feedback-live-tool-limite-ferramental
description: Ferramenta acionada LYNX 220LM não comporta brocas/machos grandes — furação vai para centro de usinagem
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c5d505ba-9c52-4a77-8744-5ec72780a0bd
---

Furação com ferramentas grandes (M16×2, M10×1 e similares) NÃO deve ser feita na ferramenta acionada do LYNX 220LM.

**Why:** A live tooling BMT45P do LYNX tem potência de 3,7kW — não comporta brocas Ø14mm (pré-furo M16) nem machos M16×2 e M10×1 de peças estruturais. Alexandre corrigiu durante orçamento 040/2026 TAGLIA.

**How to apply:** Toda furação que não seja furo piloto/pequeno (broca ≤ Ø8mm, machos ≤ M8) deve ir para o centro de usinagem (D760). Torno LYNX faz só o torneamento. Furação fica 100% no D760.
