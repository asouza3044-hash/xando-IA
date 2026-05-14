---
name: Reusinagem em Peça Pré-Usinada — Cliente Fornece Peça
description: Modalidade quando cliente envia peça pré-usinada e LASEC REUSINA (não é "acabamento simples" — pode refazer Ø todos em múltiplas fixações). Inclui estratégia 3 etapas otimizada e cláusulas a EVITAR na proposta.
type: feedback
originSessionId: 1d2e6277-aeaf-4ac7-b8d7-9ee6c5b3e975
---
# Modalidade: REUSINAGEM em peça pré-usinada fornecida pelo cliente

**CORREÇÃO (Alexandre 27/04/2026):** NÃO chamar de "acabamento" mesmo com sobremetal pequeno. Se for refazer todos os Ø em múltiplas fixações = REUSINAGEM. Tempos de máquina rodando (não passes leves de acabamento).

**Why:** Cliente (ex: MICROGEAR) envia peça pré-usinada de operação anterior. LASEC executa operação(ões) finais para entregar peça pronta. Não há matéria-prima. Inaugurado em 27/04/2026 com orçamento 034/2026 MICROGEAR CUBO 1.60.20.958.

**How to apply:** Quando cliente disser "peça pré-usinada", "vou enviar a peça em bruto", "operação de acabamento/reusinagem", aplicar este modelo. NUNCA tratar como "acabamento simples" se houver múltiplas fixações.

---

## DIFERENÇAS vs Orçamento Padrão LASEC

### O que NÃO incluir
- ❌ **Matéria-prima** (cliente fornece — custo zero de MP)
- ❌ **Corte de matéria-prima** (não aplica)
- ❌ **Desbaste pesado** (já feito pelo cliente — mas atenção: muitas vezes a "pré-usinagem" deixa MUITO sobremetal e é praticamente reusinagem completa)
- ❌ **Furação inicial Tmax pré-furo** (já feito)

### O que MANTER (custos fixos — taxa setup 1,5×)
- ✅ **Programação CNC/CAM** — pode ser MAIS complexa (múltiplas fixações, programa por máquina)
  - 3 etapas (GL280×2 + LYNX) = ~6,5h programação total
  - Live tool, eixo C, tolerâncias finas (H8, h8, h12)
- ✅ **Setup máquina** — 1,0h por fixação (mín. absoluto regra 4)
  - Inclui zeragem, montagem castanha, prova de programa
  - Setup parcial (virar peça mesma castanha): 0,5h
- ✅ **Inspeção 1ª peça** — 0,5-1,5h dependendo da quantidade de cotas críticas
- ✅ **Castanha/dispositivo** — se reaproveitar (custom existente), CUSTO ZERO; se nova, contar separado

### MOD (taxa produção da máquina específica)
- ✅ **Ciclo de REUSINAGEM** — peça praticamente refeita, não passes leves
  - Tempos típicos GL280 reusinagem completa: **8-12 min/peça**
  - LYNX só furos coord: **1-2 min/peça**
- ✅ **Improdutivo proporcional** — usar specs reais da máquina
- ✅ **Manipulação operador** — 2,0 min torno (carga/descarga/medição entre fixações)

---

## ⚠️ CLÁUSULAS A EVITAR NA PROPOSTA (lição Alexandre 27/04/2026)

### ❌ NÃO incluir cláusula de "% refugo aceitável"
**Why:** Cliente pode SE APEGAR a essa cláusula em caso de problema na usinagem causado pela LASEC, exigindo aplicação do limite. Vira gancho contra a LASEC.

**How to apply:**
- NÃO escrever "Refugo até X% por defeito da pré-usinagem sem débito"
- NÃO escrever "Risco compartilhado de peças refugadas"
- Se houver problema real (peça do cliente veio fora de especificação), tratar caso a caso por bom senso comercial — não dar gatilho contratual.
- Se quiser proteger a LASEC, manter o controle nos contratos/condições gerais — NÃO na proposta principal.

### ✅ Manter cláusulas que protegem sem dar gancho:
- "Material/peça fornecida pelo cliente — não inclusa no preço"
- "Controle dimensional 100%, relatório sob demanda"
- "Inspeção dimensional 1ª peça inclusa"

---

## 💰 ESCOLHA DE MARKUP — Quando usar cada um

| Markup | Quando aplicar |
|--------|----------------|
| **×1,12** (mínimo, margem 12%) | Última cartada para pegar serviço estratégico ou parceiro recorrente sem outras opções |
| **×1,15** (agressivo, margem 15%) | Orçamento apertado, prazo curto, cliente exigente — pegar serviço |
| **×1,20** (confortável, margem 20%) ✅ | **DEFAULT para reusinagem com muita usinagem real** (mesmo "peça pré-usinada"). Margem saudável + ainda competitivo. Aprovado 034/2026 |
| **×1,35** (parceiro recorrente padrão) | Peça inteira, novo cliente, ou parceiro com volume regular |
| **×1,50** (peça crítica/exclusiva) | Tolerâncias muito apertadas, pequeno volume, alta complexidade |

**Lição 034/2026:** Apesar de "peça pré-usinada" sugerir markup baixo, o **volume real de usinagem** (refazer todos Ø em 3 etapas) justifica markup confortável. Não confundir "sem MP" com "pouco trabalho".

---

## 🎯 ESTRATÉGIA INTELIGENTE — Otimização por Distribuição de Etapas

**Aprendizado CUBO MICROGEAR (034/2026):** Dividir em 3 etapas SAI MAIS BARATO que 2 fixações na máquina mais cara.

### Cenário A — 2 fixações na LYNX (descartado)
- Tudo na LYNX 220LM (taxa R$96,35/h)
- 2 programas + 2 setups + virada de peça
- Ciclo 15 min/pç
- **Custo: R$36,16/pç**

### Cenário B — 3 etapas (APROVADO)
- **Etapa 1 GL280** (fix interna Ø grande, castanha customizada): peça INTEIRA — Ø externos + canais Detalhe D + Ø internos completos (Ø46H8 + Ø41,11) + raios — ~7,5 min
- **Etapa 2 GL280** (mesma castanha custom, fix Ø externo): SOMENTE face frontal + Detalhe A — ~2,5 min
- **Etapa 3 LYNX 220LM**: furos coord (eixo C + live tool) + gravação — ~1,5 min
- Castanha customizada serve as 2 fixações da GL280 (custo ZERO se já existe)
- Ciclo 11,5 min/pç (10min GL280 + 1,5min LYNX)
- **Custo: R$28,59/pç → -21% vs Cenário A**

### Princípios da otimização (regra geral)
1. **Pegar pelo Ø INTERNO grande na 1ª etapa** = peça super estável → passes agressivos → peça quase pronta na 1ª fixação
2. **Etapa 1 deve ABSORVER MÁXIMO POSSÍVEL** — incluir Ø internos críticos (H8) se a fixação permitir
3. **GL280 é mais barata que LYNX** (R$86,86 vs R$96,35/h) → mandar MOD pesado pra GL280
4. **LYNX só faz o que ela é especialista** (furos coord eixo C + live tool, ferramentas acionadas)
5. **Reaproveitar castanha customizada** quando existir — pode servir múltiplas fixações da mesma peça

**Regra geral:** Quando peça aceitar fixação interna estável + tiver furos coordenados, **dividir em torno principal (mais barato) + Doosan só pra furos** geralmente reduz custo 15-25%.

---

## ESTRUTURA DO PROCESSO_FABRICACAO (adaptado para reusinagem)

1. **Cabeçalho** — identificar como "REUSINAGEM em peça pré-usinada fornecida pelo cliente — N etapas"
2. **Dimensões da peça recebida** vs **Dimensões finais** (tabela comparativa)
3. **Sobremetal a remover** — diferença entre recebido e final
4. **Por etapa, em ordem:**
   - Máquina + fixação + castanha
   - Operações executadas (com dados de corte por ferramenta)
   - Tempo de máquina (MOD)
   - Improdutivo (com specs reais)
5. **Manipulação operador** entre etapas (separado da MOD)
6. **Gravação rastreabilidade** — obrigatório quando o cliente exigir (laser ou eletro-pneumático)

---

## CRUZAMENTO CUSTO INTERNO × GRV (mantém regra 15 do manual LASEC)

Mesmo sendo reusinagem, fazer cruzamento no ESTUDO_CUSTO:
- **Custo interno LASEC:** taxa máquina × ciclo + setup R$130-145/h × tempo
- **GRV mercado:** taxa torno CNC R$156,28/h
- Diferença = margem competitiva
- Para reusinagem em GL280: custo R$86,86 vs GRV R$156,28 = potencial +80% margem (não confundir com markup final)

---

## EXEMPLO REAL — CUBO MICROGEAR 1.60.20.958 (034/2026, 200 peças)

### Custos por máquina

| Item | GL280 (R$86,86 prod / R$130,29 setup) | LYNX (R$96,35 prod / R$144,52 setup) | Total |
|------|---------------------------------------|--------------------------------------|-------|
| Programação | 5,5h × R$130,29 = R$716,60 | 1,0h × R$144,52 = R$144,52 | **R$861,12** |
| Setup | 1,5h × R$130,29 = R$195,44 | 1,0h × R$144,52 = R$144,52 | **R$339,96** |
| Inspeção 1ª pç | 0,5h × R$130,29 = R$65,15 | 1,0h × R$144,52 = R$144,52 | **R$209,67** |
| MOD (200pç) | 33,33h × R$86,86 = R$2.895,33 | 5h × R$96,35 = R$481,75 | **R$3.377,08** |

- Custos fixos: R$1.410,75 (24,7% do custo total — OK p/ lote 200)
- MOD: R$3.377,08
- CIF 25% (Setup+MOD): R$929,26
- **CUSTO TOTAL: R$5.717,09 → R$28,59/pç**

### Preço (markup ×1,20 confortável aprovado)
- Preço/pç: **R$34,31**
- Total lote 200: **R$6.862,00**
- Margem efetiva: ~20%

### Tabela escalonada (preço para reposição/lotes maiores)
| Lote | Custo/pç | Preço/pç (×1,20) | Total |
|------|----------|------------------|-------|
| 200 | R$28,59 | R$34,31 | R$6.862,00 |
| 300 | R$26,10 | R$31,32 | R$9.395,99 |
| 500 | R$24,11 | R$28,93 | R$14.463,59 |
| 1000 | R$22,61 | R$27,13 | R$27.129,89 |

---

## Histórico da Modalidade

| Data | Orçamento | Cliente | Peça | Estratégia | Custo/pç | Preço/pç | Status |
|------|-----------|---------|------|-----------|----------|----------|--------|
| 27/04/2026 | 034/2026 | MICROGEAR | CUBO 1.60.20.958 | 3 etapas (GL280×2 + LYNX) | R$28,59 | R$34,31 (×1,20) | PROPOSTA APROVADA |
