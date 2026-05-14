---
name: Família de peça ≠ tempo igual — geometria define ciclo
description: REGRA ANTI-ALUCINAÇÃO — NUNCA copiar tempo de ciclo de uma peça para outra mesmo que sejam da mesma família/cliente/prefixo. Geometria e operações é que definem o tempo, não o código.
type: feedback
originSessionId: 78bce960-93fa-46e8-b531-89ed31a98f4e
---
# Família de peça ≠ tempo igual

**Regra absoluta:** o tempo de ciclo de uma peça **não transfere** para outra mesmo que tenham o mesmo prefixo de código, mesma família, mesmo cliente ou mesmo nome genérico.

**Why:** Incidente 035→036 MICROGEAR (02/05/2026):
- 035 = **1.34.03.642** Pinhão Cônico → eixo **longo** L=129mm, **sem bore**, cone 26°, furos centro
- 036 = **1.34.03.643** Pinhão Cônico → peça **compacta** L=26,5mm, **com bore Ø20 N7 passante**, cone 51°16', canal interno, chanfros internos 2x

Mesmo nome ("Pinhão Cônico"), mesma família ("1.34.03.64x"), mesmo cliente. Mas peças **completamente diferentes** geometricamente. Eu copiei 8 min da 035 para a 036 sem analisar diferença de operações. Alexandre disse: **"essa peça não faz em 8 minutos jamais, tem histórico desde 2010"** — alucinação direta minha.

**How to apply:**
1. Para cada peça nova: **listar TODAS as operações reais a partir do desenho** (não do código nem da família)
2. Operações que **mudam radicalmente** o tempo:
   - Bore N7 / N6 (precisão alta, requer múltiplos passes)
   - Canal interno (operação separada com ferramenta dedicada)
   - Chanfros internos múltiplos
   - Cone agressivo (>45°) — mais passes que cone leve (<30°)
   - Acabamento espelhado (Ra<1,6)
3. Mesmo com programa "irmão" no BD (ex: O0193 para 1.34.03.645) — **NUNCA assumir** que o tempo se aplica
4. Se não houver dado real (apontamento, as-built, histórico de produção): **PERGUNTAR ao Alexandre** antes de chutar
5. **Em peças MICROGEAR específicamente:** o histórico interno do cliente vai além de 2010 — sempre buscar no dump SQL bruto (`minipcp_12_18_2025.dump`) antes de chutar

**Sintomas de que estou alucinando o tempo:**
- "São da mesma família, então deve ser parecido" → ❌
- "O programa similar X tem tempo Y, então uso Y" → ❌
- "Lote igual, máquina igual, vou usar o mesmo tempo" → ❌
- Não verifiquei se a 2ª peça tem operações que a 1ª não tem → ❌

**Correto:**
- Listar operações da 2ª peça do desenho
- Comparar com operações da 1ª peça
- Se houver diferença → NÃO transferir tempo
- Se não houver dado real → PERGUNTAR
