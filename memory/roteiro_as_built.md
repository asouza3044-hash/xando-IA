---
name: Roteiro As-Built para Orçamentos
description: Procedimento padrão para orçar com tempos reais de produção (as-built) em vez de ciclo CNC teórico
type: feedback
---

Quando Alexandre fornecer apontamento real de produção (ordem de serviço), usar o tempo AS-BUILT como base de custo — NUNCA o ciclo CNC.

**Why:** O ciclo CNC (tempo programa) subestima drasticamente o custo real. No caso 024/2026 MICROGEAR, ciclo era 9,27 min mas as-built foi 17,33 min (1,87×). Se orçasse pelo ciclo, perderia R$ 776/lote.

**How to apply:**

### ROTEIRO AS-BUILT (passo a passo):

1. **Coletar apontamento do operador:**
   - Data, horário início/fim, peças produzidas
   - Paradas a descontar: almoço (1h), café (15min), manutenção, etc.

2. **Calcular tempo real por peça:**
   ```
   Tempo bruto = Horário fim − Horário início (em minutos)
   Tempo ajustado = Bruto − Paradas
   Tempo/peça = Ajustado ÷ Peças produzidas
   ```

3. **Se múltiplos dias/operadores:** somar TODOS os dias
   ```
   Tempo total ajustado = Σ (cada dia ajustado)
   Peças totais = Σ (cada dia peças)
   AS-BUILT = Total ajustado ÷ Peças totais
   ```

4. **Incluir AMBOS tempos no PROCESSO:**
   - Ciclo CNC (referência técnica) — para o cliente entender a operação
   - As-built (para custo) — tempo real máquina ocupada

5. **MOD = horas máquina ocupada × taxa produção**
   - NÃO usar: ciclo × qtd × taxa (subestima)
   - USAR: (total min ajustado ÷ 60) × taxa produção

6. **Apresentar no documento:**
   - Tabela de apontamento por dia/operador
   - Diferença ciclo vs as-built (fator multiplicador)
   - Nota explicando o que a diferença inclui (medição, ajustes, desgaste, conferência)

### Exemplo real (024/2026):
- Ciclo: 9,27 min | As-built: 17,33 min | Fator: 1,87×
- MOD ciclo: R$ 893 vs MOD real: R$ 1.670 — diferença R$ 777
