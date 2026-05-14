# CHECKPOINT — Cronoanálise IMPAKTTO
# Última atualização: 14/05/2026

## Estado Atual

- **40 OPs** importadas na planilha `CRONOANALISE.xlsx`
- **2.340 peças** produzidas · **81,1% atendimento** · **21 paradas**
- **Período:** 01/04/2026 → 13/05/2026
- **Máquinas:** LO-40, Centro Usinagem, CE-440 (3 máquinas — Cepha unificada)
- **Operadores:** Clayton, Wendell, Vanildo, Danilo, Vita, Andrei (6 — Cleiton unificado)

## Dashboard

- `entregaveis/CRONOANALISE_IMPAKTTO_v2.html` — **PRONTO**
- Filtros interativos por período/operador/máquina/cliente
- KPI cards, tendência diária Chart.js, ranking operadores com pç/h, Pareto paradas, donut mix peças
- Coluna da tabela: **ID** (era "Peça") — código de controle interno

## Normalizações Implementadas

| Entrada | Valor normalizado | Onde |
|---------|------------------|------|
| `cj` (conjunto) | ×2 em QTD_PROD e QTD_PED | importar_csv.py + gerar_dados_html.py |
| `matro`, `matao` | **MATÃO** | gerar_dados_html.py `_CLIENTES_MAP` |
| `Cepha Usinagem`, `cepha`, `centro` | **Centro Usinagem** | gerar_dados_html.py `_MAQUINAS_MAP` + Excel + CSVs |
| `Cleiton` | **Clayton** | gerar_dados_html.py `_OPERADORES_MAP` + Excel |
| CSV sempre via `csv.writer` (17 campos exatos) | — evita deslocamento de colunas |
| Datas comparadas via ISO format | — evita erro léxico DD/MM/YYYY |

## Fontes dos Dados

| Arquivo | Linhas | Máquina | Período |
|---|---|---|---|
| 20260509_teste_foto1.csv | 18 | (sem nome) | 06/04–15/04 |
| 20260514_ccf13_LO40.csv | 8 | LO-40 | 18/04–13/05 |
| 20260514_whatsapp_centro.csv | 14 | Centro Usinagem | 01/04–13/05 |

## Estrutura Modular (criada 14/05/2026)

```
docs/SYSTEM_BLUEPRINT.md   ← missão, estrutura, schema
docs/RUNBOOK.md            ← fluxo operacional passo a passo
docs/REGRAS_DADOS.md       ← regras de normalização (cj, clientes, etc.)
state/STATE.json           ← estado atual do projeto
state/LAST_CHECKPOINT.md   ← este arquivo
tasks/TASK.md              ← pendências
```

Slash command: `/consultoria-impaktto`

## Sync Realizado (14/05/2026)

- ✅ GitHub: `xando-IA` branch `lasec-orcamentos` — commit `8a4840c`
- ✅ VM Oracle: `/home/ubuntu/backup_lasec/consultoria/IMPAKTTO/`

## Pendências

1. WhatsApp Scan 14/05 — p4 e p5 ilegíveis (aguardar reenvio)
2. Confirmar nomes reais das máquinas com IMPAKTTO
3. Confirmar descrições de P07, P11, P12, P13, P15, P16
4. Aguardar novos formulários para atualizar dashboard
