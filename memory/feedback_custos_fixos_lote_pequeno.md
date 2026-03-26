---
name: CRITICO - Custos fixos em lotes pequenos e prototipos
description: REGRA OBRIGATORIA — Programação, setup e inspeção em lotes pequenos (<10 pç) SEMPRE cobrados a taxa SETUP (1,5× produção), NUNCA a taxa produção. Erro causou prejuízo real no orçamento 022/2026 SPEEDMAQ.
type: feedback
---

## REGRA CRÍTICA — CUSTOS FIXOS EM LOTES PEQUENOS / PROTOTIPAGEM

**TODAS as atividades fixas (não-produtivas) devem ser cobradas na taxa SETUP (1,5× produção):**

| Atividade | Taxa CORRETA | Taxa ERRADA (nunca usar) |
|-----------|-------------|--------------------------|
| Setup máquina | 1,5× produção ✅ | — |
| **Programação CNC/CAM** | **1,5× produção ✅** | ~~taxa produção~~ ❌ |
| **Inspeção 1ª peça** | **1,5× produção ✅** | ~~taxa produção~~ ❌ |
| Validação qualidade | 1,5× produção ✅ | ~~taxa produção~~ ❌ |

### TAXAS LASEC 2026:
- Produção LYNX: R$ 96,35/h
- **Setup/Prog/Inspeção LYNX: R$ 144,53/h (1,5×)**
- Produção D760 3-eixos: R$ 121,49/h
- **Setup/Prog/Inspeção D760: R$ 182,24/h (1,5×)**

### POR QUÊ:
- Programação CNC é trabalho de ENGENHARIA (programador CAM qualificado), não operação de máquina
- Inspeção de 1ª peça com tolerâncias K6/h6 requer metrologista, instrumentos de precisão
- Em lotes pequenos (<10 pç), custos fixos representam 60-70% do custo unitário
- Cobrar essas atividades a taxa produção significa SUBSIDIAR o cliente com trabalho qualificado a preço de operador
- **PREJUÍZO REAL:** Orçamento 022/2026 SPEEDMAQ foi enviado com programação a R$ 96,35/h — Alexandre perdeu dinheiro

### COMO APLICAR:
1. **SEMPRE** que calcular custos fixos para qualquer orçamento:
   - Setup → taxa 1,5×
   - Programação CNC/CAM → taxa 1,5×
   - Inspeção 1ª peça → taxa 1,5×
   - Qualquer atividade que NÃO seja máquina rodando peça → taxa 1,5×
2. **SOMENTE** MOD (tempo de ciclo com máquina produzindo peças) usa taxa produção
3. Em lotes < 10 peças, CONFERIR que custos fixos estão ~60-70% do custo unitário
4. Se custos fixos parecem baixos demais → VERIFICAR se usou taxa correta

### EXEMPLO CORRETO (LYNX 2026):
```
Setup:       1,0h × R$ 144,53/h = R$ 144,53
Programação: 4,0h × R$ 144,53/h = R$ 578,12  (NÃO R$ 385,40!)
Inspeção:    0,5h × R$ 144,53/h = R$  72,27  (NÃO R$  48,18!)
TOTAL FIXOS: R$ 794,92            (NÃO R$ 578,11!)
```

### NUNCA MAIS:
- Usar taxa produção para programação
- Usar taxa produção para inspeção
- Enviar orçamento sem conferir taxa dos custos fixos
- Repetir o erro do 022/2026 que causou prejuízo ao Alexandre
