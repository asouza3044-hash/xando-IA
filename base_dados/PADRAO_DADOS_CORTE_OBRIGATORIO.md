# PADRÃO OBRIGATÓRIO - DADOS DE CORTE EM ORÇAMENTOS
**Data Implementação:** 2025-11-11
**Aplicável:** TODOS OS ORÇAMENTOS FUTUROS
**Motivo:** Permitir validação e correção de discrepâncias pelo usuário

---

## ⚠️ REGRA OBRIGATÓRIA:

**TODOS os estudos de custo DEVEM incluir dados de corte COMPLETOS para CADA operação!**

---

## 📋 DADOS OBRIGATÓRIOS POR OPERAÇÃO:

### Para CADA operação de usinagem, incluir:

#### 1. **IDENTIFICAÇÃO:**
- ✅ Nome da operação (ex: "Furo Ø12,7mm")
- ✅ Ferramenta específica (ex: "Broca HSS Ø12,7 DIN 338")
- ✅ Material da ferramenta (HSS, MD, inserto)

#### 2. **PARÂMETROS DE CORTE:**
- ✅ **Vc (velocidade de corte)** em m/min
- ✅ **RPM** calculado: (Vc × 1000) / (π × D)
- ✅ **Avanço** em mm/rot
- ✅ **Avanço** em mm/min (calculado: RPM × avanço)
- ✅ **Profundidade de corte** (ap) em mm
- ✅ **Profundidade de passada** (se múltiplas)

#### 3. **CICLOS E CÓDIGOS:**
- ✅ Ciclo CNC usado (G83, G85, G76, G1210, etc.)
- ✅ Parâmetros do ciclo (Q, R, P)
- ✅ Exemplo de código G

#### 4. **CONDIÇÕES:**
- ✅ Refrigeração (M8/M9, tipo fluido)
- ✅ Rotação sentido (M3/M4)
- ✅ Número de passadas (se aplicável)

#### 5. **TEMPO:**
- ✅ Tempo calculado por operação
- ✅ Fórmula usada no cálculo
- ✅ Tempo total incluindo setup/indexação

---

## 📊 FORMATO DE TABELA PADRÃO:

### **Exemplo para FURAÇÃO:**

| Parâmetro | Valor | Justificativa/Obs |
|-----------|-------|-------------------|
| **Ferramenta** | Broca HSS Ø12,7mm DIN 338 | Padrão para aço |
| **Material peça** | DIN 20MnCr5 (250-300 HB) | Aço tratado |
| **Vc (vel. corte)** | 20 m/min | HSS em aço tratado |
| **RPM** | 500 rpm | (20×1000)/(π×12,7) |
| **Avanço** | 0,12 mm/rot | Padrão HSS |
| **Avanço mm/min** | 60 mm/min | 500 × 0,12 |
| **Profundidade** | 25mm | Conforme desenho |
| **Ciclo** | G83 quebra cavaco | Q=3mm |
| **Refrigeração** | M8 (óleo) | Essencial HSS |
| **Tempo/furo** | 0,50 min | (25/60) + retrações |
| **Quantidade** | 12 furos | Padrão circular |
| **Tempo total** | 6,0 min | 12 × 0,50 |

---

### **Exemplo para TORNEAMENTO:**

| Parâmetro | Valor | Justificativa/Obs |
|-----------|-------|-------------------|
| **Ferramenta** | T0606 VNMG 160408 | Pastilha alumínio |
| **Material peça** | Al 6351-T6 | Alumínio tratado |
| **Operação** | Acabamento Ø23mm | Externo |
| **Vc (vel. corte)** | 280 m/min | Padrão Al |
| **RPM** | 3880 rpm | (280×1000)/(π×23) |
| **ap (prof. corte)** | 0,2mm | Acabamento |
| **f (avanço)** | 0,08 mm/rot | Acabamento fino |
| **Avanço mm/min** | 310 mm/min | 3880 × 0,08 |
| **Comprimento** | 20mm | Conforme desenho |
| **Tempo** | 0,06 min | (20/310) |

---

### **Exemplo para ROSCAMENTO G76:**

| Parâmetro | Valor | Obs |
|-----------|-------|-----|
| **Ferramenta** | T1313 RBH 1/8 BSP | Inserto rosca |
| **Rosca** | G1/8 BSP cônica | British Std Pipe |
| **Passo** | 0,907mm (28 TPI) | Padrão BSP |
| **Vc** | 80 m/min | Conservador rosca |
| **RPM** | 1000 rpm | Calculado |
| **Ciclo** | G76 | Threading |
| **Código** | G76P040060Q100R.05<br>G76X9.9Z-18P785Q150F.907 | 6 passadas |
| **Tempo** | 1,0 min | Inclui passes |

---

## 🎯 FÓRMULAS PRINCIPAIS:

### **1. RPM (Rotações por minuto):**
```
RPM = (Vc × 1000) / (π × D)

Onde:
- Vc = Velocidade de corte (m/min)
- D = Diâmetro ferramenta (mm)
- π = 3,14159
```

### **2. Avanço mm/min:**
```
F (mm/min) = RPM × f (mm/rot)
```

### **3. Tempo de furação:**
```
Tempo = (Profundidade / Avanço mm/min) + Tempo aproximação + Tempo retração

Aproximado:
Tempo ≈ (Prof / F) × 1,2  (20% margem)
```

### **4. Tempo de torneamento:**
```
Tempo = (Comprimento / Avanço mm/min) + Aproximações
```

### **5. Tempo de roscamento G76:**
```
Tempo = (Número de passes × Comprimento rosca) / Vel média

Aproximado para BSP 1/8:
Tempo ≈ 1,0 a 1,5 min (6-8 passes)
```

---

## 📚 TABELAS DE REFERÊNCIA:

### **Velocidades de Corte Padrão LASEC:**

#### **FURAÇÃO HSS:**
| Material | Dureza | Vc (m/min) | Avanço (mm/rot) |
|----------|--------|------------|-----------------|
| Alumínio | - | 40-60 | 0,15-0,25 |
| Aço 1020 | <150 HB | 25-35 | 0,12-0,18 |
| Aço tratado | 200-300 HB | 15-25 | 0,08-0,12 |
| Inox 304 | - | 10-18 | 0,06-0,10 |

#### **FURAÇÃO METAL DURO:**
| Material | Dureza | Vc (m/min) | Avanço (mm/rot) |
|----------|--------|------------|-----------------|
| Alumínio | - | 120-180 | 0,20-0,35 |
| Aço 1020 | <150 HB | 80-120 | 0,15-0,25 |
| Aço tratado | 200-300 HB | 50-80 | 0,10-0,18 |
| Inox 304 | - | 40-60 | 0,08-0,15 |

#### **TORNEAMENTO (PASTILHAS):**
| Material | Vc desbaste | Vc acabamento | f desbaste | f acab |
|----------|-------------|---------------|------------|--------|
| Alumínio | 280-350 m/min | 220-300 m/min | 0,15-0,25 | 0,05-0,10 |
| Aço 1020 | 180-250 | 150-200 | 0,20-0,35 | 0,08-0,15 |
| Aço tratado | 120-180 | 100-150 | 0,15-0,25 | 0,06-0,12 |
| Inox 304 | 80-120 | 60-100 | 0,12-0,20 | 0,05-0,10 |

#### **FRESAMENTO:**
| Material | Vc (m/min) | Avanço/dente (mm) | Obs |
|----------|------------|-------------------|-----|
| Alumínio | 280-400 | 0,08-0,15 | Alta velocidade |
| Aço 1020 | 150-250 | 0,06-0,12 | Padrão |
| Aço tratado | 100-180 | 0,04-0,10 | Conservador |
| Inox 304 | 80-150 | 0,04-0,08 | Baixa Vc |

---

## ⚠️ VALIDAÇÃO PELO USUÁRIO:

Com dados completos, o usuário pode:

1. ✅ **Verificar RPM:** Se estão dentro da faixa da máquina
2. ✅ **Validar avanços:** Se são factíveis para o material
3. ✅ **Corrigir Vc:** Baseado em experiência LASEC
4. ✅ **Ajustar tempos:** Se cálculos estão realistas
5. ✅ **Identificar erros:** Antes de aprovar orçamento

---

## 📋 CHECKLIST PRÉ-ENVIO ORÇAMENTO:

Antes de finalizar QUALQUER orçamento, verificar:

- [ ] Todas operações têm ferramenta especificada?
- [ ] Todas operações têm Vc e RPM?
- [ ] Todas operações têm avanço (mm/rot E mm/min)?
- [ ] Profundidades estão especificadas?
- [ ] Ciclos CNC estão documentados?
- [ ] Refrigeração está especificada?
- [ ] Tempos foram calculados com fórmula?
- [ ] Tabela de dados de corte está completa?
- [ ] Código G exemplo está presente?

**Se QUALQUER item for "NÃO", o orçamento está INCOMPLETO!**

---

## 🎓 BENEFÍCIOS:

1. ✅ **Transparência:** Usuário vê exatamente como foi calculado
2. ✅ **Validação:** Permite correção antes de enviar cliente
3. ✅ **Aprendizado:** Dados ficam documentados para futuros orçamentos
4. ✅ **Rastreabilidade:** Sempre possível revisar decisões
5. ✅ **Profissionalismo:** Mostra domínio técnico completo
6. ✅ **Confiança:** Cliente pode confiar nos tempos/preços

---

## 📂 ONDE INCLUIR:

**Dados de corte devem aparecer em:**

1. ✅ **Estudo de Custo de Fabricação** (confidencial) - COMPLETO
2. ✅ **Estudo de Preço NFe** (interno) - RESUMIDO
3. ❌ **Proposta Comercial** (cliente) - NÃO incluir (muito técnico)

---

## 🔄 ATUALIZAÇÃO CONTÍNUA:

- Dados de corte devem ser atualizados conforme:
  - ✅ Novos materiais usinados
  - ✅ Novas ferramentas adquiridas
  - ✅ Experiência prática LASEC
  - ✅ Feedback de produção real

---

## ✅ IMPLEMENTAÇÃO IMEDIATA:

**A partir de agora (11/11/2025):**

**TODOS** os orçamentos DEVEM incluir dados de corte completos conforme este padrão!

**Nenhum orçamento será considerado completo sem estas informações!**

---

**Status:** ✅ PADRÃO IMPLEMENTADO E OBRIGATÓRIO
