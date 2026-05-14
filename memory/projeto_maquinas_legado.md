---
name: Máquinas LASEC — ativas vs legado vendido
description: Apenas 4 máquinas ativas no chão (LYNX, D760 3/4-eixos, GL280). Demais foram vendidas mas programas CNC delas são patrimônio histórico
type: project
---

## Máquinas ATIVAS (chão de fábrica 2026)

| Máquina | Tipo | Custo interno | Setup mín |
|---|---|---:|---:|
| **Romi GL 280M** | Centro de torneamento | R$ 86,86/h | 1,0h |
| **Doosan LYNX 220LM** | Torno CNC c/ live tooling | R$ 96,35/h | 1,0h |
| **Doosan D760** (3 eixos) | Centro vertical | R$ 121,49/h | 1,0h |
| **Doosan D760** (4 eixos) | Centro vertical c/ 4º eixo (+25%) | R$ 151,86/h | 2,0h |

→ **Toda formulação de custo deve usar SOMENTE estas 4 taxas**.

## Máquinas LEGADO (vendidas, NÃO usar para custo)

G240, VTC 30A, Discovery 560, Centur 30D, DOOSAN 2, Romi C420, etc — listadas em `onedrive_dados.md`.

**Why:** essas máquinas saíram do parque mas os programas CNC criados nelas (em `D:\PROG_CNC\` e `PROG_CNC_DATABASE.json`) são **patrimônio histórico da LASEC** — Alexandre considera "a história viva da empresa, um legado que me orgulha".

**How to apply:**
- **NÃO** usar taxa hora/máquina dessas máquinas em cálculo de custo de orçamento novo (sempre converter para uma das 4 ativas).
- **SIM** usar os programas CNC delas como **referência técnica** ao programar peça nova: estratégias de usinagem, sequências de operação, escolha de ferramental, dados de corte validados em produção real.
- Fontes: `PROG_CNC_DATABASE.json`, `INDICE_PROGRAMAS_POR_CLIENTE.json`, pastas `D:\PROG_CNC\[NOME_MAQUINA]\`.
- Junto com os programas RFS (cliente falido — `projeto_rfs_telecom.md`), formam o **acervo técnico LASEC** — sempre consultar antes de programar do zero.
