---
name: feedback-codigos-ferramentas-minipcp
description: Regra crítica — NUNCA inventar código de ferramenta. Mapeamento operações comuns → códigos MINIPCP reais (torno LYNX). Incidente 043/044 MICROGEAR.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ae8a3d11-e4b4-4a86-8164-70cce6544f9e
  modified: 2026-07-27T16:55:36.048Z
---

## REGRA ABSOLUTA — Código de ferramenta

NUNCA preencher campo "Cód. BD" com nome genérico, "(similar)", "(int. similar)" ou qualquer variação inventada.

**Por quê:** Incidente 043/044/2026 — suporte "S20R-SCLCR09" não existe no MINIPCP. Canal interno e bedame sem código foram inventados.

**Como aplicar:** Para CADA ferramenta no PROCESSO_FABRICACAO:
1. **Lookup rápido** em `bd_cnc/ferramentas/<categoria>.json` (categorizado) → fallback `MINIPCP.csv` (`grep -a`)
2. Se achar → usar o código real
3. Se NÃO achar o diâmetro exato → usar o mais PRÓXIMO real (confirmar com Alexandre) ou deixar pendência. Nunca inventar.

## ⚠️ CÓDIGOS INVENTADOS ENCONTRADOS EM ORÇAMENTOS ANTIGOS (mineração 27/07/2026)
Varredura dos 54 orçamentos contra o MINIPCP achou **3 códigos fabricados** (não existem no catálogo) —
todos criados casando o diâmetro com o número do código (erro de padrão). Orçamentos afetados já
enviados/fechados; sinalizados ao Alexandre para eventual correção, NÃO editados silenciosamente:
| Código inventado | Rótulo | Orçamento(s) | Real mais próximo |
|---|---|---|---|
| `08.12.086` | Broca MD Ø8,6 | 027 SPEEDMAQ | Ø8,5 = `08.12.002` (ou Ø8,9 = `08.12.009`) |
| `08.12.106` | Broca MD Ø10,6 | 028, 029 SPEEDMAQ | Ø10,2 = `08.12.058` (ou Ø10,1 = `08.12.006`) |
| `08.06.110` | Broca HSS (014) | 014 LUBRISYSTEM | prefixo 08.06 vai só até .105 — confirmar diâmetro no processo |
**Sinal de alerta:** se o número do código "espelha" o diâmetro (Ø8,6→...086; Ø10,6→...106), quase certo
que foi inventado — conferir no banco. Os outros 83 códigos históricos do parque conferem (não inventados).

---

## Mapeamento operações comuns → MINIPCP (LYNX 220LM / aço)

### Torneamento externo / facear
| Operação | Pastilha | Cód. | Suporte | Cód. |
|---|---|---|---|---|
| Desb./acab. ext. (aço) | WNMG 060408 | 08.07.096 | DWLNR2525M06 | 08.08.040 |

### Furação (eixo Z, spindle)
| Operação | Ferramenta | Cód. pastilha | Cód. suporte |
|---|---|---|---|
| Pré-furo Ø29mm | Tmax Ø29 Taegu Tec | 08.07.036 (SPMG090408) | 08.08.060 |
| Regra Tmax | Sempre Tmax Ø29 para furo final ≥31mm | — | — |

### Mandrilar / desbaste interno
| Operação | Pastilha | Cód. | Suporte | Cód. |
|---|---|---|---|---|
| Mandrilar bore int. (aço, Ø ≥16mm) | CCMT060204 TT8020 | 08.07.031 | S16R-SCLCR06 | 08.08.008 |
| Mandrilar bore int. (aço, Ø ≥16mm) | CCMT060204 IC3028 | 08.07.029 | S16R-SCLCR06 | 08.08.008 |
| Mandrilar bore int. INOX | CCGT 060202 FL K10 | 08.07.093 | S16R-SCLCR06 | 08.08.008 |
| Desb.Int. Ø mín 12mm | — | — | A12M-SCLCR06-D140 | 08.08.001 |
| Desb.Int. Ø mín 16mm | — | — | A16Q-STUPR1103-D180 | 08.08.003 |
| Desb.Int. Ø mín 20mm | — | — | A20R-SVUBR11-D250 | 08.08.017 |

**ATENÇÃO:** S20R-SCLCR09 **NÃO EXISTE** no MINIPCP — era nome inventado.

### Bedame / corte
| Pastilha | Cód. | Material | Suporte | Cód. |
|---|---|---|---|---|
| TDJ 2 TT8020 | 08.07.094 | INOX/interrompido | TTER 2020-3T25 | 08.08.026 |
| TDJ 2 K10 | 08.07.047 | Não ferroso | TTER 2020-3T25 | 08.08.026 |
| TDJ 3 TT8020 | 08.07.049 | INOX | TTER 2525-3T25 | 08.08.027 |
| DGN 4003C IC20 | 08.07.068 | Aço geral | — | — |
| DGR 2202C (2,2mm) | 08.07.056 | — | — | — |

**ATENÇÃO:** "Pastilha corte 2mm (bedame)" sem código = INVENÇÃO — nunca fazer.

### Canal interno
| Ferramenta | Cód. | Obs. |
|---|---|---|
| GEPI 3.0-0.20 (canal 3mm) | 08.07.067 | Iscar |
| GEPI 1.20 (canal 1.2mm) | 08.07.070 | Iscar |
| CG06RS-20B VP15TF | 08.07.103 | Barra canal interno |

### Fresas de topo (D760)
| Ferramenta | Cód. | Material |
|---|---|---|
| Fresa Topo MD Ø12×26×83 4C | 08.11.057 | Aço geral |
| Fresa Topo Ø10 4C INOX | 08.11.143 | INOX |
| Fresa Topo Ø8 4C INOX | 08.11.016 | INOX |
| Cabeçote Ø80×4F×45° Mitsubishi | 08.11.137 | Facear geral |
| Cabeçote Ø50×5F×45° | 08.11.147 | Facear geral |
| Inserto APMT1135PDER-H2 F7030 | 08.07.126 | Facear geral |

### Escareadores / chanfros (D760)
| Ferramenta | Cód. |
|---|---|
| Escareador MD Ø16×6C×90° | 08.12.045 |
| Escareador MD Ø16×3C×90° | 08.12.075 |
| Escareador HSS Ø16.5×3C×90° | 08.06.101 |

### Brocas (D760 / LYNX)
| Ferramenta | Cód. | Obs. |
|---|---|---|
| Broca Ø12 HSS | 08.06.069 | Aço Rápido |

**ATENÇÃO:** Brocas Ø24/Ø25 **NÃO EXISTEM** no MINIPCP → usar interpolação circular ou perguntar.

---

## Verificação obrigatória antes de fechar PROCESSO_FABRICACAO

- [ ] Cada linha tem código confirmado no MINIPCP?
- [ ] Nenhum campo com "(similar)", "(a conf.)", "a confirmar"?
- [ ] Se faltou código → campo em branco + anotação "confirmar com Alexandre"?
