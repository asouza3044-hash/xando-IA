# ATUALIZAÇÃO CRÍTICA - APRENDIZADOS ORÇAMENTO 008/2025
**Data:** 2025-11-11
**Cliente:** LUBRISYSTEM
**Peça:** VAM-0013
**Status:** ✅ CONCLUÍDO

---

## 📊 RESUMO DO ORÇAMENTO

**Preço Final Aprovado:** R$ 86,59/peça
**Total 50 peças:** R$ 4.329,50
**Margem Líquida:** 15,53%

---

## ✅ CORREÇÕES CRÍTICAS APLICADAS

### 1. **Spot Face - Profundidade Correta**
- ❌ **ERRO ANTERIOR:** 1,20mm
- ✅ **CORRETO:** **3,40mm** (conforme SEÇÃO C-C do desenho)
- **Aprendizado:** SEMPRE verificar todas as seções do desenho!

### 2. **Broca de Centro - LASEC NÃO USA!**
- ❌ **ERRO ANTERIOR:** Usar broca de centro + broca MD
- ✅ **CORRETO:** **Broca MD alto centrante DIRETO!**
- **Padrão LASEC:** Metal duro alto centrante elimina operação de centro
- **Economia:** ~0,5 min/peça

### 3. **Furos Ø4mm - Localização Correta**
- ❌ **ERRO ANTERIOR:** Furos radiais no torno com live tooling
- ✅ **CORRETO:** **Furos NA MESA do centro de usinagem com dispositivo**
- **Motivo:** Maior precisão + spot face profundo (3,40mm)

### 4. **Ranhuras - Ferramenta Correta**
- ❌ **ERRO ANTERIOR:** Fresa ball nose Ø16mm
- ✅ **CORRETO:** **Fresa Ø3mm standard** (não ball nose!)
- **Padrão LASEC:** Ball nose raramente usado

### 5. **Rosca G1/8 BSP - Método Correto**
- ✅ **CORRETO:** Ciclo G76 com inserto RBH 1/8 BSP
- **Código:**
  ```gcode
  T1313 (RBH 1/8 BSP)
  G76P040060Q100R.05
  G76X9.9Z-18P785Q150F.907
  ```
- **Referência:** Programa O0007:112-113 (LUBRISYSTEM)

---

## 🎯 OTIMIZAÇÕES PARA PREÇO ~R$ 90/PEÇA

### OPÇÃO 5 APLICADA (APROVADA):

#### Setup Reduzido:
- **Antes:** 2,0h total (1,5h cada máquina)
- **Depois:** 1,0h total (0,5h cada máquina)
- **Economia:** R$ 189,89

#### Tempos Otimizados:
**TORNO:** 8,1 min → **6,0 min/peça**
- Face + desbaste: 1,2 → 0,8 min
- Broca MD direto: 1,8 → 1,3 min
- Desbaste interno: 1,0 → 0,7 min
- Acabamento ext: 0,8 → 0,6 min
- Acabamento int: 1,2 → 0,9 min
- Rosca G1/8: 1,0 → 0,7 min
- Rebaixos: 0,8 → 0,7 min
- Bedame: 0,3 min

**CENTRO:** 6,5 min → **5,0 min/peça**
- Fixar: 0,5 min
- 4 furos Ø4mm: 1,5 → 1,0 min
- 4 spot faces 3,40mm: 2,0 → 1,5 min
- Faces R16: 1,5 → 1,3 min
- Ranhuras Ø3mm: 1,0 → 0,7 min

**TOTAL:** 11 min/peça (0,183h)

---

## 💰 BREAKDOWN FINANCEIRO FINAL

| Item | Valor |
|------|-------|
| Setup Total | R$ 189,89 |
| MOD Torno (5,0h) | R$ 950,00 |
| MOD Centro (4,17h) | R$ 791,18 |
| **Total MOD** | **R$ 1.931,07** |
| Indiretos (58%) | R$ 1.120,02 |
| **Custo Total** | **R$ 3.051,09** |
| **Custo/peça** | **R$ 61,02** |
| Markup 1,290 | R$ 78,72 |
| Impostos 10% | R$ 7,87 |
| **PREÇO FINAL** | **R$ 86,59/peça** |

---

## 📋 PROCESSO CORRETO DOCUMENTADO

### SEQUÊNCIA:

**1º) TORNO Doosan Lynx 220 LM** (6 min/peça)
1. Face + desbaste externo Ø23mm (T0505 + T0606)
2. **Broca MD Ø7mm alto centrante direto** (T1212)
3. Desbaste interno até Ø7,9mm (T1010 - G74)
4. Acabamento externo (T0606 - S2500)
5. Acabamento interno Ø7,90 JS9 (T1010)
6. **Rosca G1/8 método G76 com inserto** (T1313)
7. Rebaixos múltiplos (T0505)
8. Bedame/corte (T0404 - B3)

**2º) CENTRO Romi D760** (5 min/peça)
1. Fixar peça em **dispositivo 4º eixo**
2. **4 furos Ø4mm NA MESA** (ciclo G1210)
3. **4 spot faces Ø6,5mm × 3,40mm prof**
4. Faces paralelas R16 (fresamento, 23mm total)
5. **4 ranhuras com fresa Ø3mm** (não ball nose!)

---

## 🔧 FERRAMENTAS PADRÃO LASEC

### TORNO:
- T0404: Bedame B3
- T0505: Bedame B2 - Face/corte
- T0606: VR.2 - Acabamento externo
- T1010: A06 - Desbaste/acabamento interno
- T1212: **Broca MD Ø7mm alto centrante** ⚠️
- T1313: RBH 1/8 BSP - Inserto rosca

### CENTRO:
- Broca Ø4mm
- Spot face Ø6,5mm
- Fresa topo (faces R16)
- **Fresa Ø3mm** (ranhuras)

---

## 📚 ATUALIZAR PARA FUTUROS ORÇAMENTOS

### ✅ REGRAS PERMANENTES:

1. **NUNCA usar broca de centro** - LASEC usa MD alto centrante direto
2. **SEMPRE verificar profundidades** em todas as seções do desenho
3. **Furos com spot face profundo** (>2mm) = NA MESA do centro
4. **Ball nose raramente usado** - preferir fresas standard
5. **Rosca BSP:** G76 com inserto no torno OU G1002 com macho no centro
6. **Setup otimizado:** 0,5h cada máquina (não 1,5h!)
7. **Tempos agressivos** mas realistas baseados em LUBRISYSTEM

### 📊 Tempos Referência (Alumínio):
- **Torno:** 5-8 min/peça (peças médias)
- **Centro:** 4-6 min/peça (operações secundárias)
- **Setup:** 0,5-1,0h por máquina (processos conhecidos)

### 💵 Meta de Preço:
- **Ideal:** R$ 80-100/peça (peças complexas alumínio)
- **Margem:** Mínimo 15% líquido
- **Markup:** 1,290 (novo cliente) a 1,350 (cliente regular)

---

## 📂 ARQUIVOS GERADOS

✅ **ESTUDO_CUSTO_FABRICACAO_VAM-0013_008.pdf** (uso interno)
✅ **ESTUDO_PRECO_VENDA_NFE_VAM-0013_008.pdf** (uso interno)
✅ **PROPOSTA_COMERCIAL_LUBRISYSTEM_VAM-0013_008.pdf** (enviar cliente)

---

## 🎓 LIÇÕES APRENDIDAS

1. **Validar com usuário:** Processo estava errado, usuário corrigiu 3x!
2. **Ler desenho completo:** Perdi spot face 3,40mm na primeira análise
3. **Conhecer padrões LASEC:** Broca MD alto centrante (não usa centro!)
4. **Programas reais são ouro:** LUBRISYSTEM foi essencial
5. **Otimizar sem mentir:** Tempos agressivos mas factíveis
6. **Preço ~R$ 90:** Competitivo + margem saudável 15,53%

---

## ⚠️ NÃO REPETIR ESTES ERROS:

❌ Assumir broca de centro (LASEC não usa!)
❌ Ignorar seções do desenho (perdi prof. 3,40mm)
❌ Ball nose sem necessidade
❌ Furos radiais no torno quando tem spot face profundo
❌ Setup de 1,5h (otimizar para 0,5h!)
❌ Tempos conservadores demais (inflam preço)

---

**IMPORTANTE:** Estes aprendizados se aplicam a **TODOS os orçamentos futuros**, não apenas LUBRISYSTEM!

---

**Status:** ✅ Orçamento aprovado e documentado
**Próximo:** Produção aguarda confirmação cliente
