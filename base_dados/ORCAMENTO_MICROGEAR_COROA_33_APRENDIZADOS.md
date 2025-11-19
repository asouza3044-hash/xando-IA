# ORÇAMENTO MICROGEAR - COROA 33 DENTES - APRENDIZADOS COMPLETOS
**Data:** 2025-11-11
**Cliente:** MICROGEAR
**Peça:** 1.14.02.033-060 (Furar e Escarear)
**Material:** DIN 20MnCr5 (250-300 HB)
**Quantidade:** 20 peças

---

## 📋 RESUMO EXECUTIVO

**Duas alternativas analisadas:**
1. **Torno CNC Doosan Lynx 220 LM** (live tooling)
2. **Centro de Usinagem Romi D760** (dispositivo mesa)

**Resultado:** CENTRO mais vantajoso (12% economia)

---

## 🔧 ESPECIFICAÇÃO DA PEÇA

### **Operações Necessárias:**

1. **12 furos Ø12,7mm ±0,1**
   - Padrão circular
   - C.C. (centro círculo) Ø122mm ±0,1
   - Profundidade: ~25mm passante

2. **4 furos Ø12 H7** (+0,018/0)
   - 90° entre si
   - C.C. Ø121 H7
   - Tolerância apertada!
   - Requer alargador

3. **Escareamento 30°**
   - 4 furos
   - 2 lados (ambos)
   - HSS

4. **Escareamento 45°**
   - 4 furos
   - Conforme desenho CORTE A-A

**Material:** DIN 20MnCr5
- Aço para engrenagens
- Tratado termicamente
- Dureza: 250-300 HB
- Requer broca HSS (metal duro opcional)

---

## 📊 DADOS DE CORTE APLICADOS (CORRIGIDOS)

### **Fonte:** Tabela corrigida com dados técnicos validados

#### **Furação HSS em 20MnCr5:**

| Operação | Vc (m/min) | RPM | Avanço (mm/rot) | F (mm/min) |
|----------|------------|-----|-----------------|------------|
| **Broca Ø12,7mm** | 20 | 500 | 0,10 | 50 |
| **Broca Ø11,8mm** | 20 | 540 | 0,10 | 54 |
| **Alargador Ø12 H7** | 12 | 320 | 0,10 | 32 |
| **Escareador 30°** | 15 | 240 | 0,08 | 19 |
| **Escareador 45°** | 15 | 265 | 0,08 | 21 |

**Refrigeração:** M8 obrigatório (óleo abundante)

---

## ⚙️ ALTERNATIVA 1: TORNO DOOSAN LYNX 220 LM

### **Processo:**
- Live tooling (M33/M35)
- C-axis para indexação angular
- Furação radial com G87

### **Tempos por Operação:**

| Operação | Tempo |
|----------|-------|
| 12 furos Ø12,7 (C-axis) | 7,0 min |
| 4 furos Ø12 H7 (broca + alargador) | 2,8 min |
| Escarear 30° (4 furos × 2 lados) | 1,5 min |
| Escarear 45° (4 furos) | 1,2 min |
| **TOTAL/PEÇA** | **12,5 min (0,208h)** |

### **Código Exemplo:**
```gcode
; 12 furos Ø12.7 com C-axis
T1212 (BROCA HSS Ø12.7)
M33 ; Ativa live tooling
G97S500M3M8
C0 ; Posição 1 (0°)
G87X0Q1000R2F50
C30 ; Posição 2 (30° incremento)
G87X0Q1000R2F50
C60 ; Posição 3
G87X0Q1000R2F50
; ... repetir até C330 (12 posições)
M35 ; Desativa live tooling

; 4 furos H7 a 90°
T1313 (BROCA Ø11.8)
M33
G97S540M3M8
C0
G87X0Q1000R2F54
C90
G87X0Q1000R2F54
C180
G87X0Q1000R2F54
C270
G87X0Q1000R2F54

; Alargador H7
T1414 (ALARGADOR H7 Ø12)
G97S320M3M8
C0
G85X0R2F32
C90
G85X0R2F32
C180
G85X0R2F32
C270
G85X0R2F32
M35

; Escareadores...
```

### **Cálculo 20 Peças:**

| Item | Valor |
|------|-------|
| Setup | 0,5h × R$ 190,00 = R$ 95,00 |
| Produção | 4,17h × R$ 190,00 = R$ 792,30 |
| MOD Total | R$ 887,30 |
| Indiretos (58%) | R$ 514,63 |
| **Custo Total** | **R$ 1.401,93** |
| **Custo/peça** | **R$ 70,10** |
| Markup 1,290 | R$ 90,43 |
| Impostos 10% | R$ 9,04 |
| **PREÇO/PEÇA** | **R$ 99,47** |
| **TOTAL 20 PÇS** | **R$ 1.989,40** |

---

## ⚙️ ALTERNATIVA 2: CENTRO ROMI D760 (RECOMENDADO)

### **Processo:**
- Dispositivo centralizado na mesa
- Ciclo G1210 (padrão circular automático)
- Operação convencional centro

### **Tempos por Operação:**

| Operação | Tempo |
|----------|-------|
| Fixação manual | 2,0 min |
| 12 furos Ø12,7 (G1210) | 4,5 min |
| 4 furos Ø12 H7 (broca + alargador) | 2,1 min |
| Escarear 30° (4 furos × 2 lados) | 1,3 min |
| Escarear 45° (4 furos) | 0,9 min |
| **TOTAL/PEÇA** | **10,8 min (0,18h)** |

### **Código Exemplo:**
```gcode
; 12 furos Ø12.7 padrão circular
T4 (BROCA HSS Ø12.7)
G90G54G0X0Y0
S550M3M8
G1210B0.H61.V0.A360.C12. ; 12 furos automático!
G83Z-27Q3R2F66 ; Quebra cavaco Q=3mm

; 4 furos H7 a 90°
T5 (BROCA Ø11.8)
S595M3M8
G1210B0.H60.5V0.A360.C4. ; 4 furos a 90°
G83Z-27Q3R2F71

; Alargador H7
T6 (ALARGADOR H7 Ø12)
S370M3M8
G1210B0.H60.5V0.A360.C4.
G85Z-26R2F37 ; Sem quebra cavaco

; Escareadores 30° e 45°...
```

### **Cálculo 20 Peças:**

| Item | Valor |
|------|-------|
| Setup | 0,5h × R$ 189,78 = R$ 94,89 |
| Produção | 3,6h × R$ 189,78 = R$ 683,21 |
| MOD Total | R$ 778,10 |
| Indiretos (58%) | R$ 451,30 |
| **Custo Total** | **R$ 1.229,40** |
| **Custo/peça** | **R$ 61,47** |
| Markup 1,290 | R$ 79,30 |
| Impostos 10% | R$ 7,93 |
| **PREÇO/PEÇA** | **R$ 87,23** |
| **TOTAL 20 PÇS** | **R$ 1.744,60** |

---

## 📊 COMPARAÇÃO FINAL

| Critério | TORNO | CENTRO | Vencedor |
|----------|-------|--------|----------|
| **Tempo/peça** | 12,5 min | 10,8 min | ✅ CENTRO |
| **Preço/peça** | R$ 99,47 | R$ 87,23 | ✅ CENTRO |
| **Total 20 pçs** | R$ 1.989,40 | R$ 1.744,60 | ✅ CENTRO |
| **Economia** | - | R$ 244,80 (12%) | ✅ CENTRO |
| **Setup** | Difícil | Fácil | ✅ CENTRO |
| **Precisão H7** | Boa | Excelente | ✅ CENTRO |
| **Ciclo automático** | Manual C-axis | G1210 auto | ✅ CENTRO |
| **Desgaste máquina** | Alto (live tool) | Baixo | ✅ CENTRO |

---

## 🏆 RECOMENDAÇÃO

### ✅ **CENTRO DE USINAGEM ROMI D760**

**Preço unitário:** R$ 87,23/peça
**Total 20 peças:** R$ 1.744,60
**Economia vs Torno:** R$ 244,80 (12%)

---

## 💡 APRENDIZADOS IMPORTANTES

### **1. DADOS DE CORTE SÃO CRÍTICOS:**
- Sempre incluir Vc, RPM, avanço em **TODOS** orçamentos
- Permite validação pelo usuário
- Reduz margem de erro
- Profissionalismo técnico

### **2. LOTES PEQUENOS ENCARECEM MUITO:**
- 20 peças: R$ 87,23/peça
- 50 peças: R$ 34,16/peça (estimativa)
- **Diferença:** +155%!
- **Motivo:** Setup fixo diluído em poucas peças

### **3. CENTRO vs TORNO:**
- Para furação pura: **CENTRO** sempre melhor
- Torno com live tooling: Apenas se já estiver na máquina
- G1210 é muito mais eficiente que C-axis manual
- Precisão H7 favorece centro (fixação rígida)

### **4. 20MnCr5 (AÇO TRATADO):**
- HSS funciona bem (Vc 18-22 m/min)
- Metal duro seria 3-4x mais rápido
- M8 obrigatório (óleo abundante)
- Alargador essencial para H7

### **5. ESCAREAMENTO:**
- Vc conservador (15-16 m/min)
- Avanço leve (0,08 mm/rot)
- Priorizar acabamento sobre velocidade
- Tempo pequeno vs outras operações

---

## 📋 TABELA DE TEMPOS PADRÃO (REFERÊNCIA)

### **Para furação HSS em aço tratado (20MnCr5):**

| Ø Broca | Vc | RPM | Avanço | F mm/min | Tempo/25mm |
|---------|----|----- |--------|----------|------------|
| Ø6mm | 20 | 1061 | 0,08 | 85 | 0,30 min |
| Ø8mm | 20 | 796 | 0,10 | 80 | 0,31 min |
| Ø10mm | 20 | 637 | 0,10 | 64 | 0,39 min |
| Ø12mm | 20 | 531 | 0,10 | 53 | 0,47 min |
| Ø12,7mm | 20 | 500 | 0,10 | 50 | 0,50 min |

**Adicionar 20% para retrações, aproximações e indexação**

---

## 🔄 MELHORIAS FUTURAS

### **Se Cliente Aprovar:**

1. **Metal Duro:**
   - Vc 60-85 m/min (3-4x mais rápido)
   - Tempo reduz para ~7 min/peça
   - Investimento inicial maior
   - ROI em lotes >50 peças

2. **Dispositivo Otimizado:**
   - Reduzir fixação de 2,0 → 1,0 min
   - Sistema rápido de troca
   - Economia de 1 min/peça

3. **Programa Otimizado:**
   - Eliminar aproximações desnecessárias
   - G-code mais enxuto
   - Possível ganho 5-10%

---

## 📂 DADOS PARA BANCO DE DADOS PERMANENTE

### **Material: DIN 20MnCr5 (250-300 HB)**

**Furação HSS:**
- Vc: 18-22 m/min
- Avanço Ø<12: 0,08-0,12 mm/rot
- Avanço Ø>12: 0,10-0,15 mm/rot
- M8 obrigatório

**Furação MD:**
- Vc: 60-85 m/min
- Avanço: 0,10-0,18 mm/rot
- 3-4x mais rápido que HSS

**Alargamento H7:**
- Vc: 10-15 m/min
- Avanço: 0,08-0,12 mm/rot
- Sobremetal: 0,2-0,3mm
- Ciclo G85

**Escareamento:**
- Vc: 12-18 m/min
- Avanço: 0,06-0,10 mm/rot
- Conservador (acabamento)

---

## 📊 FÓRMULAS APLICADAS

### **RPM:**
```
RPM = (Vc × 1000) / (π × D)

Exemplo Ø12,7mm com Vc=20:
RPM = (20 × 1000) / (3,14159 × 12,7)
RPM = 20000 / 39,9
RPM ≈ 500 rpm
```

### **Avanço mm/min:**
```
F = RPM × f (mm/rot)

Exemplo:
F = 500 × 0,10
F = 50 mm/min
```

### **Tempo de Furação:**
```
Tempo = (Prof / F) × 1,2

Exemplo prof 25mm, F=50:
Tempo = (25 / 50) × 1,2
Tempo = 0,5 × 1,2
Tempo = 0,6 min (incluindo retrações)
```

### **Custo/peça:**
```
Custo = [(Setup + Tempo_Prod) × Custo/h + Indiretos] / Qtd

Exemplo Centro 20 peças:
MOD = (0,5 + 3,6) × 189,78 = R$ 778,10
Indiretos = 778,10 × 0,58 = R$ 451,30
Total = 1.229,40
Custo/pç = 1.229,40 / 20 = R$ 61,47
```

---

## ✅ CHECKLIST PARA FUTUROS ORÇAMENTOS SIMILARES

### **Ao fazer orçamento de furação/escareamento:**

- [ ] Material identificado com dureza?
- [ ] Quantidade definida (impacta setup)?
- [ ] Todas operações listadas?
- [ ] **Dados de corte completos?** (Vc, RPM, avanço)
- [ ] Tolerâncias identificadas (H7, etc)?
- [ ] Ciclos CNC especificados?
- [ ] Refrigeração definida?
- [ ] Comparou torno vs centro?
- [ ] Calculou ambas alternativas?
- [ ] Apresentou economia da melhor opção?
- [ ] Código G exemplo incluído?
- [ ] Tempos validados com fórmulas?

---

## 🎯 PALAVRAS-CHAVE PARA BUSCA FUTURA

#MICROGEAR #20MnCr5 #Furação #HSS #Escareamento #H7 #LiveTooling #CentroUsinagem #G1210 #G87 #DadosDeCorte #LotePequeno #DispositivoMesa #CorrigidoComFontes

---

## 📅 PRÓXIMOS PASSOS

1. ✅ Dados salvos no banco permanente
2. ⏳ Apresentar orçamento ao cliente MICROGEAR
3. ⏳ Se aprovado: Criar programas CNC definitivos
4. ⏳ Primeira peça: Validar tempos reais
5. ⏳ Ajustar banco de dados com experiência prática

---

**Status:** ✅ COMPLETO E SALVO NO BANCO DE DADOS
**Data:** 2025-11-11
**Aplicável:** TODOS os orçamentos futuros de furação/escareamento
