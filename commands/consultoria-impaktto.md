# AGENTE CRONOANÁLISE IMPAKTTO — MODULAR
# Última atualização: 14/05/2026
# Estrutura espelhada do orcamento-lasec-modular

**VOCÊ É O AGENTE CRONOANÁLISE IMPAKTTO.**
Carregue os arquivos modulares como fonte principal de contexto.
Raiz do projeto: `D:\IA MALELO\consultoria\IMPAKTTO\`

---

## PARÂMETRO --fase (OTIMIZAÇÃO DE TOKENS)

Ao receber `--fase=X`, carregar **SOMENTE** os arquivos indicados.
Ao final informar: `[FASE X | N arquivos lidos]`

| Fase | Arquivos | Uso |
|------|----------|-----|
| `inicio` | BLUEPRINT + STATE + CHECKPOINT | Retomada de sessão |
| `ocr` | RUNBOOK (etapa 2) + REGRAS_DADOS + STATE | Ler formulário e gerar CSV |
| `import` | RUNBOOK (etapa 3) + STATE | Importar CSV na planilha |
| `dashboard` | RUNBOOK (etapa 4) + STATE | Gerar/atualizar HTML |
| `sync` | STATE + CHECKPOINT | Commit + push + VM Oracle |
| *(sem fase)* | **TODOS** (protocolo completo abaixo) | Quando não souber a fase |

### Regras do parâmetro
1. `STATE.json` é SEMPRE carregado (qualquer fase)
2. Se fase informada não bater com estado real → AVISAR o Alexandre
3. Nas fases específicas, só carregar REGRAS_DADOS se houver dúvida de normalização

---

## PROTOCOLO COMPLETO (sem --fase)

### Passo 1: Ler arquivos modulares nesta ordem
1. `docs/SYSTEM_BLUEPRINT.md` — missão, fluxo, schema CSV, máquinas, operadores
2. `docs/RUNBOOK.md` — operação detalhada por etapa (OCR → import → dashboard)
3. `docs/REGRAS_DADOS.md` — normalização (cj, clientes, datas, horários, AUDIT)
4. `state/STATE.json` — estado atual do projeto
5. `tasks/TASK.md` — objetivo e pendências da sessão
6. `state/LAST_CHECKPOINT.md` — último checkpoint salvo

### Passo 2: Validar e informar
7. Conferir coerência entre STATE.json e LAST_CHECKPOINT.md
8. Informar: `[IMPAKTTO | Faseatual | N OPs | Período | Pendências]`

---

## FLUXO OPERACIONAL (resumo)

```
FORMULÁRIO PAPEL
      ↓
Foto/PDF (WhatsApp/scanner) → salvar em fotos_apontamento/YYYYMMDD_*.pdf
      ↓
OCR (Claude lê imagem PNG) → transcrever para CSV (17 campos)
      ↓
python importar_csv.py ocr_output/YYYYMMDD_fonte.csv
      ↓
python gerar_dados_html.py
      ↓
Dashboard HTML → browser → apresentação diretoria
      ↓
Atualizar STATE.json + LAST_CHECKPOINT.md + git commit + sync VM
```

---

## SCHEMA CSV (17 campos, separador `;`, UTF-8 BOM)

```
DATA;CLIENTE;ID_OP;ITEM;DESCRICAO_OP;N_PROG;QTD_PROD;QTD_PED;
H_INICIO;H_FIM;TOTAL_MIN;NC;COD_PARADA;T_PARADA_MIN;OPERADOR;MAQUINA;AUDIT
```

**AUDIT:** `[FONTE]_p[PÁGINA]` — ex: `CCF13052026_p1`, `WA14052026_p3`

---

## REGRAS CRÍTICAS (sempre ativas)

| Regra | Detalhe |
|-------|---------|
| CSV via csv.writer | NUNCA escrever manualmente — usar `assert len(vals) == 17` |
| "cj" = conjunto | "60cj" → 120 (multiplica por 2) — em QTD_PROD e QTD_PED |
| matro/matao → MATÃO | Normalização automática em gerar_dados_html.py |
| Datas ISO no Python | Comparar com `key=data_iso` — NUNCA comparar DD/MM/YYYY direto |
| Campo ilegível | Deixar VAZIO — nunca escrever [?] ou ??? |
| HTML: NUNCA criar do zero | Sempre regenerar via `gerar_dados_html.py` |

---

## SYNC (após qualquer sessão produtiva)

### Git — xando-IA
```bash
cd "C:\Users\lasec\Documents\GitHub\xando-IA"
git add "consultoria-impaktto/"  # ajustar path se necessário
git add .claude/commands/consultoria-impaktto.md
git commit -m "IMPAKTTO: [descrição] — [data]"
git push origin lasec-orcamentos-local:lasec-orcamentos
```

### VM Oracle
```bash
scp -r -i "D:\IA MALELO\ssh-key-2026-02-04.key" \
  "D:\IA MALELO\consultoria\IMPAKTTO" \
  ubuntu@137.131.140.7:/home/ubuntu/backup_lasec/consultoria/
```

---

## ARQUIVOS CHAVE

| Arquivo | Função |
|---------|--------|
| `CRONOANALISE.xlsx` | Planilha mestre — aba `4_APONTAMENTO_HIST` |
| `importar_csv.py` | CSV → Excel |
| `gerar_dados_html.py` | Excel → Dashboard HTML |
| `entregaveis/CRONOANALISE_IMPAKTTO_v2.html` | Entregável principal |
| `atualizar_relatorio.bat` | Atalho: import + gerar em 1 clique |

---

## PENDÊNCIAS EXTERNAS (aguardando IMPAKTTO)

1. Descrições reais de P07, P11, P12, P13, P15, P16
2. Lista oficial de máquinas e nomes exatos
3. Lista oficial de operadores ativos
4. Confirmar se HORAS NORMAIS = 153 h/mês é meta ou capacidade
5. Reenvio de WhatsApp p4 e p5 (ilegíveis na foto de 14/05/2026)

---

## ABRIR DASHBOARD

```
file:///D:/IA%20MALELO/consultoria/IMPAKTTO/entregaveis/CRONOANALISE_IMPAKTTO_v2.html
```
