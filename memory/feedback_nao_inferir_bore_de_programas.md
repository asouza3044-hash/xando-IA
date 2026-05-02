---
name: Não inferir bore interno de programas similares — confirmar no desenho
description: Programas similares podem ter bore interno mesmo que a peça atual não tenha — SEMPRE verificar o desenho antes de incluir operação de furação/mandrilamento
type: feedback
originSessionId: 78bce960-93fa-46e8-b531-89ed31a98f4e
---
# Nunca inferir operações de programas similares sem confirmar no desenho

**Regra:** Se programa similar tem T-TMAX + barra de mandrilar → NÃO assumir que a peça atual tem bore interno. Confirmar SEMPRE no desenho.

**Why:** Incidente 035/2026 MICROGEAR Pinhão Cônico 1.34.03.642 (01/05/2026):
- Encontrei O0192/O0193 "PINHÃO CÔNICO MICROGEAR" com T1212 TMAX + T0606 torneamento interno
- Assumi que a peça 1.34.03.642 também tinha bore interno
- Alexandre corrigiu: "não tem nada de furo nessa peça a não ser os furos de centro, atenção erro é igual a prejuízo"
- A peça só tem: torneamento externo + canal + furos de centro (feature)

**How to apply:**
1. Leu o desenho → extrair lista de features SÓ do desenho
2. Programas similares = referência de dados de corte (Vc, avanço) — NÃO de geometria
3. Se o desenho não mostrar bore/furo interno → não incluir na lista de operações, ponto final
4. "Furos de centro" no desenho = feature da peça (para fixação/centragem em operações posteriores), não confundir com furo passante/cego interno
