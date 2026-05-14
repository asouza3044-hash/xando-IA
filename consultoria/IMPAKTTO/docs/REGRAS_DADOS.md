# REGRAS DE DADOS — IMPAKTTO
# Normalização e limpeza aplicadas automaticamente pelo sistema

---

## CLIENTES — MAPA DE NORMALIZAÇÃO

| Como aparece no formulário | Valor normalizado |
|---|---|
| matro, matao, matão, MATRO | **MATÃO** |
| vimin, VIMIN | **VIMIN** |
| rod, ROD | **ROD** |

**Onde está implementado:** `gerar_dados_html.py` → `_CLIENTES_MAP`

---

## MÁQUINAS — MAPA DE NORMALIZAÇÃO

| Como aparece no formulário | Valor normalizado |
|---|---|
| Cepha Usinagem, cepha, cepho | **Centro Usinagem** |
| centro | **Centro Usinagem** |

**Onde está implementado:** `gerar_dados_html.py` → `_MAQUINAS_MAP`

---

## OPERADORES — MAPA DE NORMALIZAÇÃO

| Como aparece no formulário | Valor normalizado |
|---|---|
| Cleiton, cleiton | **Clayton** |

**Onde está implementado:** `gerar_dados_html.py` → `_OPERADORES_MAP`

---

## QUANTIDADES — REGRA "cj" (CONJUNTO)

**Regra:** quando QTD_PROD ou QTD_PED contiver "cj" (conjunto = par):
- Remover "cj" do texto
- Multiplicar o número por **2**

**Exemplos:**
| Valor no formulário | Valor processado |
|---|---|
| 60cj | 120 |
| 30 cj | 60 |
| 5CJ | 10 |
| 100 | 100 (sem alteração) |

**Onde está implementado:**
- `importar_csv.py` → função `to_num()` — salva valor já multiplicado no Excel
- `gerar_dados_html.py` → função `limpar_int()` — aplica ao ler dados do Excel

---

## CAMPOS ILEGÍVEIS — TRATAMENTO

- No CSV: deixar campo **vazio** (não usar `[?]`, `???`, etc.)
- `limpar_str()` remove automaticamente `[???]`, `???`, `[?]`
- Registros com operador vazio aparecem como `"?"` no dashboard

---

## DATAS — FORMATO OBRIGATÓRIO

- **CSV:** `DD/MM/YYYY` (ex: 18/04/2026)
- **Comparação interna:** convertida para `YYYY-MM-DD` via `data_iso()`
- **NUNCA usar formato `DD/MM/YY`** — causa erros de ordenação

---

## HORÁRIOS — FORMATO ACEITO

- `HH:MM` (ex: 08:30)
- `HH.MM` (ex: 08.30) — aceito pelo parser
- Cálculo pç/h: só executado quando H_INICIO e H_FIM válidos e H_FIM > H_INICIO

---

## AUDIT — RASTREABILIDADE

Cada linha importada deve ter o campo AUDIT preenchido com a origem:
- Formato: `[FONTE]_p[PÁGINA]` (ex: `CCF13052026_p1`, `WA14052026_p3`)
- Permite rastrear qual formulário originou cada registro
- Permite re-importar seletivamente sem duplicar

---

## ADICIONANDO NOVAS REGRAS

Ao descobrir nova normalização (ex: novo apelido de cliente, nova unidade):
1. Atualizar este arquivo (`REGRAS_DADOS.md`)
2. Implementar em `gerar_dados_html.py` (função adequada)
3. Implementar em `importar_csv.py` se aplicável
4. Registrar no `state/LAST_CHECKPOINT.md`
