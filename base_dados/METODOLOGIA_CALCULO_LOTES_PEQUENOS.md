# METODOLOGIA DE CÁLCULO - LOTES PEQUENOS
**Data:** 2025-11-11
**Aprendizado:** Orçamento MICROGEAR 20 peças
**Aplicável:** TODOS os orçamentos com quantidade <50 peças

---

## 🎯 PROBLEMA IDENTIFICADO:

**Lotes pequenos encarecem MUITO o preço unitário!**

**Exemplo real:**
- 50 peças: R$ 34,16/peça
- 20 peças: R$ 87,23/peça
- **Aumento:** +155% (2,5x mais caro!)

**Motivo:** Setup fixo diluído em poucas peças

---

## 📊 IMPACTO DO SETUP EM LOTES PEQUENOS

### **Setup Fixo:**
- Tempo independente da quantidade
- Centro: ~0,5h (R$ 94,89)
- Torno: ~0,5h (R$ 95,00)

### **Diluição por Quantidade:**

| Quantidade | Setup/peça | % do Custo Total |
|------------|------------|------------------|
| **10 peças** | R$ 9,49 | ~12% |
| **20 peças** | R$ 4,74 | ~7% |
| **50 peças** | R$ 1,90 | ~3% |
| **100 peças** | R$ 0,95 | ~1,5% |
| **200 peças** | R$ 0,47 | ~0,8% |

**Conclusão:** Setup tem impacto CRÍTICO em lotes <50 peças!

---

## 💰 FÓRMULA COMPLETA - LOTES PEQUENOS

### **Estrutura de Cálculo:**

```
1. SETUP (fixo):
   Tempo_setup × Custo_hora = Custo_setup

2. PRODUÇÃO:
   Quantidade × Tempo_peça × Custo_hora = Custo_produção

3. MOD TOTAL:
   Custo_setup + Custo_produção = MOD

4. CUSTOS INDIRETOS:
   MOD × 58% = Indiretos

5. CUSTO TOTAL:
   MOD + Indiretos = Custo_fabricação

6. CUSTO UNITÁRIO:
   Custo_fabricação / Quantidade = Custo/peça

7. FORMAÇÃO PREÇO:
   a) Custo/peça × Markup = Preço_sem_imposto
   b) Preço_sem_imposto × 10% = Impostos
   c) Preço_sem_imposto + Impostos = PREÇO FINAL
```

---

## 📋 EXEMPLO PRÁTICO: MICROGEAR 20 PEÇAS

### **Dados de Entrada:**
- **Máquina:** Centro D760 (R$ 189,78/h)
- **Setup:** 0,5h
- **Tempo/peça:** 10,8 min = 0,18h
- **Quantidade:** 20 peças
- **Markup:** 1,290
- **Impostos:** 10%

### **Cálculo Passo a Passo:**

**1. Setup:**
```
0,5h × R$ 189,78 = R$ 94,89
```

**2. Produção:**
```
20 × 0,18h × R$ 189,78 = 3,6h × R$ 189,78 = R$ 683,21
```

**3. MOD Total:**
```
R$ 94,89 + R$ 683,21 = R$ 778,10
```

**4. Indiretos (58%):**
```
R$ 778,10 × 0,58 = R$ 451,30
```

**5. Custo Total:**
```
R$ 778,10 + R$ 451,30 = R$ 1.229,40
```

**6. Custo/peça:**
```
R$ 1.229,40 / 20 = R$ 61,47
```

**7. Preço Final:**
```
a) R$ 61,47 × 1,290 = R$ 79,30
b) R$ 79,30 × 0,10 = R$ 7,93
c) R$ 79,30 + R$ 7,93 = R$ 87,23/peça

Total 20 peças: R$ 87,23 × 20 = R$ 1.744,60
```

---

## 📊 TABELA DE REFERÊNCIA - IMPACTO QUANTIDADE

### **Mesma peça (10,8 min/pç, Centro D760):**

| Qtd | Setup | Prod | MOD | Indiretos | Total | Custo/pç | Preço/pç |
|-----|-------|------|-----|-----------|-------|----------|----------|
| 10 | R$ 94,89 | R$ 341,60 | R$ 436,49 | R$ 253,16 | R$ 689,65 | R$ 68,97 | **R$ 97,99** |
| 20 | R$ 94,89 | R$ 683,21 | R$ 778,10 | R$ 451,30 | R$ 1.229,40 | R$ 61,47 | **R$ 87,23** |
| 50 | R$ 94,89 | R$ 1.708,02 | R$ 1.802,91 | R$ 1.045,69 | R$ 2.848,60 | R$ 56,97 | **R$ 80,90** |
| 100 | R$ 94,89 | R$ 3.416,04 | R$ 3.510,93 | R$ 2.036,34 | R$ 5.547,27 | R$ 55,47 | **R$ 78,77** |
| 200 | R$ 94,89 | R$ 6.832,08 | R$ 6.926,97 | R$ 4.017,64 | R$ 10.944,61 | R$ 54,72 | **R$ 77,70** |

**Curva:** Preço reduz rapidamente até ~50 peças, depois estabiliza

---

## 📈 GRÁFICO CONCEITUAL (Preço vs Quantidade)

```
R$ 100 │         ●
       │          \
R$ 90  │           ●
       │            \
R$ 80  │             ●──●──●
       │
R$ 70  │
       │
R$ 60  │
       └─────┬─────┬─────┬─────┬─────
            10    20    50   100   200
                 Quantidade
```

**Ponto ótimo:** 50-100 peças (melhor custo-benefício)

---

## 💡 ESTRATÉGIAS PARA LOTES PEQUENOS

### **1. NEGOCIAR LOTES MAIORES:**
- Mostrar economia ao cliente
- Propor: "50 peças economiza X%"
- Estoque programado

### **2. REDUZIR SETUP:**
- Dispositivos rápidos
- Programas salvos (reuso)
- Setup otimizado: 1,5h → 0,5h

### **3. AGRUPAR ORÇAMENTOS:**
- Múltiplos clientes
- Mesma máquina/processo
- Diluir setup entre lotes

### **4. MARKUP AJUSTADO:**
- Lotes <20: Markup 1,350 (compensar setup)
- Lotes 20-50: Markup 1,290 (padrão)
- Lotes >50: Markup 1,250 (agressivo)

---

## ⚠️ ALERTAS AUTOMÁTICOS

### **Quando Quantidade <30 peças:**

Incluir no orçamento:

```
⚠️ ATENÇÃO: LOTE PEQUENO

Este orçamento é para APENAS [X] peças.

Setup representa [Y]% do custo total.

ECONOMIA POSSÍVEL:
- 50 peças: -[Z]% (R$ [valor]/peça)
- 100 peças: -[W]% (R$ [valor]/peça)

Recomendamos avaliar lotes maiores para melhor custo-benefício!
```

---

## 📋 CHECKLIST LOTES PEQUENOS

Ao fazer orçamento com quantidade <50:

- [ ] Calcular setup corretamente (0,5-1,0h)?
- [ ] Setup diluído na quantidade certa?
- [ ] Apresentar comparativo de lotes?
- [ ] Alertar cliente sobre impacto?
- [ ] Considerar markup ajustado?
- [ ] Verificar viabilidade de agrupar?
- [ ] Calcular ponto de equilíbrio?
- [ ] Propor estoque programado?

---

## 🎯 PONTO DE EQUILÍBRIO

### **Quando vale a pena fazer lote pequeno?**

**Setup máximo aceitável:** 5-7% do custo total

```
Setup_aceitável = Custo_total × 0,06

Quantidade_mínima = Setup / (Custo_peça × 0,06)
```

**Exemplo:**
- Setup = R$ 94,89
- Custo/peça (sem setup) = R$ 56,73
- Qtd_mínima = 94,89 / (56,73 × 0,06) = **27,9 peças**

**Conclusão:** Lotes <28 peças têm setup muito alto!

---

## 📊 COMPARAÇÃO: SETUP NORMAL vs OTIMIZADO

| Setup | 10 pçs | 20 pçs | 50 pçs | Economia 50 pçs |
|-------|--------|--------|--------|-----------------|
| **1,5h (normal)** | R$ 105,80 | R$ 92,69 | R$ 83,76 | - |
| **0,5h (otimizado)** | R$ 97,99 | R$ 87,23 | R$ 80,90 | **-R$ 2,86 (3,4%)** |
| **Diferença** | -R$ 7,81 | -R$ 5,46 | -R$ 2,86 | - |

**Ganho setup otimizado:** Maior em lotes pequenos!

---

## ✅ PADRÃO ESTABELECIDO

### **Para TODOS os orçamentos futuros:**

**Lotes <50 peças:**
1. ✅ Calcular com setup 0,5h (otimizado)
2. ✅ Apresentar comparativo de quantidades
3. ✅ Alertar cliente sobre impacto
4. ✅ Propor lote maior (economia)
5. ✅ Considerar markup ajustado se <20 peças

**Lotes >50 peças:**
1. ✅ Setup 0,5h já dilui bem
2. ✅ Markup padrão 1,290
3. ✅ Foco em otimizar tempo/peça

---

## 📂 DADOS PARA REFERÊNCIA RÁPIDA

### **Setup Padrão LASEC:**

| Máquina | Setup Normal | Setup Otimizado | Quando Usar |
|---------|--------------|-----------------|-------------|
| **Torno Doosan** | 1,5h | 0,5h | Processo conhecido |
| **Centro D760** | 1,5h | 0,5h | Com dispositivo pronto |
| **Torno + Centro** | 3,0h | 1,0h | Ambos otimizados |

### **Indiretos LASEC:**
- **Padrão:** 58% sobre MOD
- Inclui: Energia, manutenção, ferramentas, overhead

### **Markup LASEC:**
- **Novo cliente:** 1,290 (29%)
- **Cliente regular:** 1,320 (32%)
- **Lote pequeno (<20):** 1,350 (35%)

### **Impostos:**
- **Simples Nacional:** 10%

---

## 🔄 ATUALIZAÇÃO CONTÍNUA

Este padrão deve ser atualizado com:
- ✅ Novos tempos de setup da produção real
- ✅ Feedback de orçamentos aprovados/reprovados
- ✅ Experiência em lotes pequenos
- ✅ Estratégias que funcionaram

---

**Status:** ✅ METODOLOGIA ESTABELECIDA E SALVA
**Aplicação:** IMEDIATA em todos orçamentos
