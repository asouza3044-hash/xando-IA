---
name: Pinhão cônico compacto MICROGEAR — tempo real
description: Pinhão cônico compacto (família 1.34.03.6xx, ~Ø60×L25-30) faz em ~6 min/pç na LYNX 220LM, NÃO 8+ min. Benchmark Alexandre: 10-12 pç/h.
type: feedback
originSessionId: 78bce960-93fa-46e8-b531-89ed31a98f4e
---
# Pinhão Cônico Compacto MICROGEAR — Tempo de Produção

**Regra:** Pinhão cônico compacto MICROGEAR (família 1.34.03.6xx — L=25-30mm, Ø60-65 ext, bore Ø20 N7) faz em **~6 min/pç na LYNX 220LM** somando as 2 fixações + virada.

**Benchmark direto Alexandre (02/05/2026):** "estava estimando entre 10 a 12 peças por hora" → 5-6 min/pç

**Why:** Em 02/05/2026, no orçamento 036/2026 (1.34.03.643), eu havia chutado 14,5 min/pç (superestimei +140%). Alexandre corrigiu para ~6 min, citando produção real 10-12 pç/h. Antes disso eu havia copiado 8 min da 035 (peça diferente, mais longa). Ambos errados.

**How to apply:**
- Para 1.34.03.643 / 1.34.03.645 / similares (pinhão cônico compacto MICROGEAR): partir de **6 min/pç**
- Razão "ciclo programa × 1,4 = tempo custo" NÃO se aplica aqui — a peça é simples e rápida
- O programa real O0193 (1.34.03.645, peça irmã) calcula em ~5,8 min de G-code + manipulação realista
- Não confundir com pinhões mais longos (ex: 1.34.03.642 = eixo L=129mm, sem bore, 8 min)

**Indicadores de complexidade que alteram o tempo:**
- Comprimento (L>50mm): +50% tempo
- Sem bore interno: -20% tempo
- Bore N7 longo (>30mm): +20% tempo
- Material cementado (16MnCr5): igual aos comuns (não cementado ainda na usinagem LASEC)
- Lote menor que 30: +1-2 min/pç (overhead de troca menor amortizado)

**Sintomas de que estou alucinando o tempo (de novo):**
- Multipliquei × 1,4 mecanicamente sem saber se aplicava → ❌
- Adicionei "improdutivo + manipulação" generoso (1+ min por fixação) → ❌ na realidade é menos
- Não cruzei com a regra Alexandre "10-12 pç/h" → ❌

**Corretamente:**
- Olhar G-code do programa irmão (O0193) → ~5-6 min
- Validar com benchmark de produção (10-12 pç/h)
- Apresentar tempo curto e PEDIR confirmação
- Não inflar arbitrariamente
