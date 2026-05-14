# SYSTEM BLUEPRINT — Consultoria IMPAKTTO
# Fonte única de verdade sobre missão, estrutura e regras do projeto

## MISSÃO
Cronoanálise da fábrica IMPAKTTO (usinagem CNC, ≤10 máquinas, ≤15 operadores).
Consultor: Alexandre Souza (LASEC).

**Objetivo final:** Dashboard de produtividade para a diretoria — por operador, máquina, peça e cliente.

---

## ESTRUTURA DE PASTAS

```
D:\IA MALELO\consultoria\IMPAKTTO\
├── docs/                        ← regras, blueprint, runbook (ESTE ARQUIVO)
├── state/                       ← STATE.json + LAST_CHECKPOINT.md
├── tasks/                       ← TASK.md (tarefa atual)
├── fotos_apontamento/           ← PDFs/fotos recebidos pelo cliente
├── ocr_output/                  ← CSVs gerados pelo OCR
├── entregaveis/                 ← HTML dashboard + PDF
│   └── CRONOANALISE_IMPAKTTO_v2.html  ← ENTREGÁVEL PRINCIPAL
├── CRONOANALISE.xlsx            ← planilha mestre (aba 4_APONTAMENTO_HIST)
├── importar_csv.py              ← importa CSV → planilha
├── gerar_dados_html.py          ← planilha → dashboard HTML
└── atualizar_relatorio.bat      ← script de atualização (1 clique)
```

---

## FLUXO OPERACIONAL

```
FORMULÁRIO PAPEL
      ↓
Foto/PDF (WhatsApp/scanner)
      ↓
OCR (Claude lê imagem diretamente)
      ↓
CSV (ocr_output/YYYYMMDD_nome.csv)
      ↓
python importar_csv.py → CRONOANALISE.xlsx (aba 4_APONTAMENTO_HIST)
      ↓
python gerar_dados_html.py → CRONOANALISE_IMPAKTTO_v2.html
      ↓
Dashboard aberto no browser → apresentação diretoria
```

---

## ESTRUTURA DO FORMULÁRIO IMPAKTTO

**Cabeçalho:** MÁQUINA (uma folha = uma máquina)

**Bloco "DADOS DO PEDIDO E OPERAÇÃO":**
DATA · CLIENTE · ID (número da peça) · ITEM (posição) · DESCRIÇÃO PROG/OPERAÇÃO · N° PROG · QUANT PRODUZIDA · QUANT PEDIDO

**Bloco "DADOS DA OPERAÇÃO":**
HORÁRIO INÍCIO · FIM · TOTAL · NÃO CONFORME · PARADA (código) · OPERADOR

**ATENÇÃO:** ID = número da peça (ex: 30809) · ITEM = posição (ex: 2,2). NÃO confundir.

---

## SCHEMA CSV (17 campos obrigatórios)

```
DATA;CLIENTE;ID_OP;ITEM;DESCRICAO_OP;N_PROG;QTD_PROD;QTD_PED;
H_INICIO;H_FIM;TOTAL_MIN;NC;COD_PARADA;T_PARADA_MIN;OPERADOR;MAQUINA;AUDIT
```

**AUDIT:** identificador da fonte (ex: CCF13052026_p1, WA14052026_p2)
**Separador:** ponto-e-vírgula (`;`)
**Encoding:** UTF-8 com BOM

---

## MÁQUINAS CONHECIDAS

| Nome no formulário | Nome normalizado | Tipo |
|---|---|---|
| (não informada) | (em branco) | Torno |
| LO-40 | LO-40 | Torno |
| Centro Usinagem | **Centro Usinagem** | Centro |
| Cepha Usinagem | **Centro Usinagem** | Centro |
| cepha, centro | **Centro Usinagem** | Centro |
| CE-440 | CE-440 | Centro |

**Atenção:** Cepha Usinagem = Centro Usinagem — mesma máquina, nomes diferentes no formulário.
Normalização automática em `gerar_dados_html.py` → `_MAQUINAS_MAP`.

---

## OPERADORES CONHECIDOS

Clayton, Wendell, Vanildo, Danilo, Vita, Andrei, Dilma, Ulton

**Atenção:** "Cleiton" = Clayton — normalizado automaticamente via `_OPERADORES_MAP`.

---

## CÓDIGOS DE PARADA

| Código | Descrição |
|---|---|
| P01 | Falta de energia elétrica |
| P02 | Falta material / matéria-prima |
| P03 | Saída de funcionário |
| P04 | Falta de ferramenta |
| P05 | Manutenção |
| P06 | Falta de componentes |
| P07 | (confirmar com IMPAKTTO) |
| P08 | Preparação |
| P09 | Inspeção / controle de qualidade |
| P10 | Falta de serviço |
| P11 | (confirmar com IMPAKTTO) |
| P12 | (confirmar com IMPAKTTO) |
| P13 | (confirmar com IMPAKTTO) |
| P14 | Manutenção preventiva |
| P15 | (confirmar com IMPAKTTO) |
| P16 | (confirmar com IMPAKTTO) |

HORAS NORMAIS no rodapé = **153,00 h/mês** (meta mensal confirmada).

---

## PENDÊNCIAS EXTERNAS (cliente IMPAKTTO)

1. Descrições reais de P07, P11, P12, P13, P15, P16
2. Lista oficial de máquinas ativas e seus nomes exatos
3. Lista oficial de operadores ativos
4. Confirmar se HORAS NORMAIS = 153 h/mês é meta ou capacidade instalada
5. Cronometragem de calibração das peças Pareto (31552 e 30809 são prioridade)
