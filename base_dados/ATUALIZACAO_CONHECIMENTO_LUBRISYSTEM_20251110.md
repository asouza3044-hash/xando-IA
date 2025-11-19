# ATUALIZAÇÃO CRÍTICA - CONHECIMENTO LUBRISYSTEM
**Data:** 2025-11-10
**Fonte:** 10 programas CNC reais analisados
**Aplicável para:** TODOS OS CLIENTES (conhecimento genérico)

---

## 📋 RESUMO EXECUTIVO

Foi criado arquivo completo `conhecimento_lubrisystem_completo.json` com TODO o conhecimento extraído de:
- **4 programas** de Centro de Usinagem (DISCO760)
- **6 programas** de Torno CNC (LYNX220)

Este conhecimento é **GENÉRICO** e deve ser usado para **TODOS OS ORÇAMENTOS FUTUROS**, não apenas LUBRISYSTEM.

---

## 🔑 DESCOBERTAS CRÍTICAS

### 1. ROSCA BSP 1/8 - DUAS FORMAS DE FAZER

#### Método 1: Centro de Usinagem (MACHO RÍGIDO)
```gcode
T7 (MACHO 1/8BSP)
G1002W1.D0.907I1.J10.L-10.5C2.P0.Z2.R2.S300.
```
- **RPM:** 300
- **Passo:** 0.907mm (28 TPI)
- **Programa referência:** O1904 (CORPO REGULADORA)

#### Método 2: Torno CNC (INSERTO DE ROSCAR)
```gcode
T1313 (RBH 1/8 BSP)
G76P040060Q100R.05
G76X9.9Z-18P785Q150F.907
```
- **RPM:** 1000
- **Passo:** 0.907mm (28 TPI)
- **Programa referência:** O0007 (VAM-0007)

**QUANDO USAR CADA UM:**
- **Macho:** Centro de usinagem, peça em dispositivo, produção alta
- **Inserto:** Torno, diâmetro externo acessível, mais seguro (não quebra)

---

### 2. LIVE TOOLING NO TORNO

**Ativação/Desativação:**
```gcode
M33  ; Liga live tooling
M35  ; Desliga live tooling
```

**Fresamento com coordenadas polares:**
```gcode
G12.1  ; Ativa modo polar
G94    ; Feed mm/min (para fresamento)
G42G1X13C0
C5.45  ; Rotação C-axis
G13.1  ; Cancela polar
G95    ; Retorna mm/rot (para torno)
```

**Programa referência:** O0003 (VAM-0010-02)

---

### 3. FUROS RADIAIS - DOIS MÉTODOS

#### Centro de Usinagem: G1210 (Padrão Circular)
```gcode
G1210B0.H19.V0.A44.C0.
```
- **H:** Raio (19mm)
- **A:** Ângulo incremento
- **Programa referência:** O1904

#### Torno com C-axis: G87 (Furação Radial)
```gcode
T0202 (BROCA Ø1MM)
G87X0Q1000R0F.1
C0   ; Primeira posição
C45  ; Segunda posição (8 furos = 45°)
```
- **8 furos:** Incremento 45°
- **16 furos:** Incremento 22.5°
- **Programa referência:** O0006 AMBEV (8 furos), O0023 AMBEV (16 furos)

---

### 4. WORK OFFSETS DUAS FACES

```gcode
G55  ; Primeira face (lado castanha)
G56  ; Segunda face (após virar)
```

**Programas referência:** O0003, O0006, O0007

---

### 5. BAR FEEDER (TRACI)

```gcode
T0808
G94           ; Feed mm/min
Z-35          ; Aproxima
M31           ; Comando 1
M69           ; Retrai
G4U1.         ; Pausa 1 seg
Z-final       ; Corte
M68           ; Avança
G95           ; Retorna mm/rot
```

**Programas referência:** O0004, O0005, O0006, O0007

---

## 📊 FERRAMENTAS PADRÃO LUBRISYSTEM

### TORNO (LYNX220)
| Código | Descrição | Uso |
|--------|-----------|-----|
| T0101 | CB03RS-02B | Desbaste/acabamento interno |
| T0202 | Broca Ø1mm HSS | Furação pequena ou live tooling |
| T0404 | Bedame B0.8/B3 | Canais e cortes |
| T0505 | Bedame B2 | Face/corte principal |
| T0606 | VR.2 | Acabamento externo |
| T0707 | Broca Ø4.5mm | Furação média |
| T0808 | TRACI ou broca centro | Corte ou centro |
| T1010 | A06 | Desbaste interno ou especiais |
| T1111 | Fresa | Live tooling fresamento |
| T1212 | Broca Ø10.5MD/Ø3.2mm | Furação grande |
| T1313 | RBH 1/8 BSP ou Ø4.5mm | Rosca inserto ou broca |
| T1414 | Canal B1.4=1.07 | Canais externos precisos |

### CENTRO DE USINAGEM (DISCO760)
| Código | Descrição | Uso |
|--------|-----------|-----|
| T1 | Fresa Ø12mm | Desbaste geral |
| T2 | Spot face Ø19mm | Rebaixos |
| T4 | Broca Ø4.3mm | Furação |
| T7 | Macho 1/8 BSP | Rosca BSP |
| T8 | Fresa 2C D12 R1 | Acabamento com raio |
| T15 | Broca D1 | Furação pequena |
| T16 | Macho M3x0.5 | Rosca métrica |

---

## 🔧 CICLOS IMPORTANTES

| Ciclo | Nome | Uso |
|-------|------|-----|
| G74 | Desbaste face quebra cavaco | Desbaste pesado diâmetro |
| G75 | Sangramento/canal radial | Canais, ranhuras |
| G76 | Threading cycle | Rosca com inserto |
| G83 | Furação profunda quebra cavaco | Furos profundos torno |
| G84 | Rigid tapping | Rosca com macho (torno) |
| G87 | Furação radial | Furos radiais C-axis |
| G1002 | Rigid tapping centro | Rosca com macho (centro) |
| G1064 | Fresamento trochoidal | Desbaste pesado cavidades |
| G1210 | Circular bolt pattern | Padrão circular furos |

---

## ⏱️ ESTIMATIVA TEMPOS OPERAÇÕES

| Operação | Tempo Estimado |
|----------|----------------|
| Face/desbaste | 1-2 min |
| Furação profunda | 3-5 min |
| Desbaste interno | 2-4 min |
| Acabamento | 3-5 min |
| Roscas | 2-3 min |
| Canais | 2-3 min |
| Live tooling fresamento | 5-8 min |
| Furos radiais 8x | 4-6 min |

**Setup:**
- Torno: 10-15 min primeira peça
- Centro: 15-20 min com dispositivo

---

## 💡 APLICAÇÃO PRÁTICA EM ORÇAMENTOS

### Quando usar DOIS máquinas:
1. Faces paralelas não-cilíndricas
2. Operações radiais complexas
3. Fresamento perfis em corpo cilíndrico
4. Múltiplos furos radiais posicionados

### Exemplo VAM-0013 (atual):
- **Torno:** Operações cilíndricas + furos Ø4mm + spot face Ø6.3mm
- **Centro:** Fixação em dispositivo 4º eixo + ranhuras com fresa Ø3mm

---

## 📁 ARQUIVOS CRIADOS

1. **`conhecimento_lubrisystem_completo.json`**
   Base de conhecimento completa com todos os detalhes técnicos

2. **`ATUALIZACAO_CONHECIMENTO_LUBRISYSTEM_20251110.md`** (este arquivo)
   Resumo executivo para consulta rápida

---

## ✅ PRÓXIMOS PASSOS

1. ✅ Consolidar conhecimento em JSON completo
2. ✅ Criar resumo executivo (este arquivo)
3. 🔄 Aplicar conhecimento real ao orçamento VAM-0013
4. ⏳ Atualizar `biblioteca_cnc.json` com referência
5. ⏳ Criar processo detalhado VAM-0013 usando programas como base

---

## 🎯 IMPACTO NO SISTEMA

Este conhecimento agora está disponível para:
- ✅ Orçamento 008/2025 LUBRISYSTEM VAM-0013
- ✅ TODOS os orçamentos futuros (qualquer cliente)
- ✅ Estimativas de tempo mais precisas
- ✅ Seleção correta de processos
- ✅ Identificação quando usar 1 ou 2 máquinas
- ✅ Escolha método correto para roscas BSP
- ✅ Aplicação live tooling quando necessário

---

**IMPORTANTE:** Este conhecimento é **GENÉRICO** e **PERMANENTE**, aplicável a todos os clientes futuros, não apenas LUBRISYSTEM.
