# RUNBOOK — Operação do Projeto IMPAKTTO
# Como executar cada etapa do fluxo

---

## ETAPA 1 — Receber formulário

**Entrada:** foto/PDF via WhatsApp ou scanner
**Salvar em:** `fotos_apontamento/` com nome `YYYYMMDD_descricao.pdf`

**Padrão de foto para boa qualidade OCR:**
- Sem reflexos, papel plano (não amassado)
- Resolução mínima 12 MP
- Iluminação ambiente, sem flash direto

---

## ETAPA 2 — OCR (Claude lê a imagem)

1. Converter PDF em PNG via Python:
```python
import fitz
doc = fitz.open("formulario.pdf")
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5))
    pix.save(f"ocr_work_p{i+1}.png")
```

2. Claude lê cada imagem PNG e transcreve para CSV

3. **Regras de transcrição:**
   - Se campo ilegível: deixar vazio (não usar [?])
   - QTD com "cj" (conjunto): `importar_csv.py` multiplica por 2 automaticamente
   - Datas: sempre no formato DD/MM/YYYY
   - Horários: HH:MM

4. Salvar CSV em `ocr_output/YYYYMMDD_fonte.csv` com exatamente 17 campos

---

## ETAPA 3 — Importar CSV na planilha

```bash
python importar_csv.py ocr_output/YYYYMMDD_fonte.csv
```

- Faz backup automático antes de gravar
- Adiciona linhas no final da aba `4_APONTAMENTO_HIST`
- Trata "cj" (multiplica por 2)

**Verificar após importação:**
```python
# Últimas linhas: DATA e OPERADOR corretos?
import openpyxl
wb = openpyxl.load_workbook("CRONOANALISE.xlsx", data_only=True)
ws = wb["4_APONTAMENTO_HIST"]
for r in range(max_row-5, max_row+1):
    print(ws.cell(r,1).value, ws.cell(r,15).value)
```

---

## ETAPA 4 — Gerar dashboard

```bash
python gerar_dados_html.py
```

Atualiza `entregaveis/CRONOANALISE_IMPAKTTO_v2.html` com todos os dados da planilha.

**Verificar saída:**
- OPs: número total de registros
- Produzido: total de peças
- Período: deve incluir datas mais recentes
- Máquinas: deve listar todas as máquinas

---

## ETAPA 5 — Apresentar / entregar

Abrir no browser:
```
file:///D:/IA%20MALELO/consultoria/IMPAKTTO/entregaveis/CRONOANALISE_IMPAKTTO_v2.html
```

**Funcionalidades do dashboard:**
- Filtros: período, operador, máquina, cliente (recalcula em tempo real)
- KPIs: OPs, peças produzidas, % atendimento, paradas, pç/h médio
- Gráficos: tendência diária (Chart.js), ranking operadores, Pareto paradas, mix peças
- Tabela: buscável e ordenável por qualquer coluna

---

## ETAPA 6 — Atualizar STATE.json

Após cada sessão produtiva, atualizar `state/STATE.json` com:
- `total_ops`: novo total
- `ultima_importacao`: data e arquivo CSV
- `periodo`: novo período dos dados
- `proxima_acao`: o que falta fazer

---

## REGRAS DE CSV — ARMADILHAS CONHECIDAS

| Problema | Causa | Solução |
|---|---|---|
| Colunas deslocadas | Número errado de campos | Usar `csv.writer` no Python, nunca escrever manualmente |
| Datas de maio não aparecem | Comparação léxica DD/MM/YYYY | `gerar_dados_html.py` usa `key=data_iso` — já corrigido |
| "matro" no lugar de "MATÃO" | Variação de escrita no formulário | `limpar_str()` normaliza automaticamente |
| QTD errada para conjuntos | "60cj" lido como 60 | `limpar_int()` detecta "cj" e multiplica por 2 |
| Operador na coluna MAQUINA | CSV com 18 campos em vez de 17 | Sempre gerar CSV via `csv.writer` com assert |
