---
name: LYNX 220LM — limite RPM = S4500 (não S3000)
description: Para cálculo de tempo de usinagem na LYNX 220LM, usar limite G92 S4500 (não S3000 que estava sendo usado conservador). Importante em Ø pequeno onde RPM teórico ultrapassa 3000.
type: feedback
originSessionId: 78bce960-93fa-46e8-b531-89ed31a98f4e
---
# LYNX 220LM — Limite RPM real

**Regra:** Para cálculo de tempo de usinagem virtual, usar **limite G92 S4500** na LYNX 220LM. NÃO S3000.

**Why:** Confirmado por Alexandre 02/05/2026. Usar S3000 (conservador) subestima a velocidade real e infla o tempo calculado. A máquina é capaz de S4500 sem problema com castanha bem balanceada.

**Where matters:**
- Operações em Ø pequeno (X<28mm para Vc 250) — RPM teórico ultrapassa 3000
- Bore interno (Ø20 N7): RPM teórico ~3811 — limite S4500 libera, antes limitado S2500/S3000
- Acabamento de pequenos diâmetros (chanfros, canal)

**Onde não muda:**
- G97 (RPM constante) — usado em drilling e tapping
- Operações em Ø grande (X>28mm) — RPM teórico já é menor
- Desbaste pesado em material duro (limitado por torque/Vc, não por RPM)

**Impacto típico:** redução de 10-15% no tempo de máquina puro (especialmente bore interno pequeno).

## Capacidade reconhecida pelo Alexandre (02/05/2026):

> "vc tem o poder tb de usinar a peça virtualmente baseado nos programas armazenados aprendendo como faz, to certo"

**Confirmado:** posso calcular tempo de usinagem virtualmente com:
- G-code do programa (linhas G0/G1/G2/G3/G70/G71/G74/G75)
- Fórmulas: RPM = (Vc × 1000) / (π × D), Avanço = F × RPM
- Tempo por movimento de corte: distância / avanço
- Tempo de retornos rapid: distância / 30000 mm/min (X) ou 36000 mm/min (Z)
- Trocas turret: 0,5s/troca (LYNX 220LM)

**How to apply:** ao calcular tempo de usinagem, ler G-code completo e somar tempo de cada movimento. Apresentar tabela detalhada com cálculo por operação.
