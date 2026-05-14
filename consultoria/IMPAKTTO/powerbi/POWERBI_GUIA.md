# GUIA DE CONSTRUÇÃO — POWER BI CRONOANÁLISE IMPAKTTO

Tempo estimado: **30–45 minutos** do zero ao primeiro relatório pronto.

---

## ETAPA 1 — INSTALAR POWER BI DESKTOP (5 min)

**É grátis.** Duas opções:

1. **Microsoft Store** (recomendado — atualiza sozinho):
   - Abre Microsoft Store → busca "Power BI Desktop" → Instalar

2. **Site oficial:**
   - https://powerbi.microsoft.com/desktop/

**Versão:** 64-bit (padrão atual). Reinicia o computador depois da instalação.

---

## ETAPA 2 — APLICAR TEMA CORPORATIVO (1 min)

Antes de qualquer coisa, aplica o tema com a paleta LASEC:

1. Abre Power BI Desktop → arquivo em branco
2. Menu **Exibir → Temas → Procurar temas**
3. Seleciona: `D:\IA MALELO\consultoria\IMPAKTTO\powerbi\tema_lasec.json`
4. Pronto — todos os visuais usarão azul-marinho/laranja/verde/vermelho corporativos

---

## ETAPA 3 — CONECTAR AOS DADOS (3 min)

1. **Página inicial → Obter dados → Excel pasta de trabalho**
2. Seleciona `D:\IA MALELO\consultoria\IMPAKTTO\CRONOANALISE.xlsx`
3. No **Navegador**, marca apenas:
   - ☑ `4_APONTAMENTO_HIST`
4. Clica em **Transformar Dados** (não em "Carregar")

Vai abrir o **Power Query Editor** — etapa 4.

---

## ETAPA 4 — LIMPAR DADOS NO POWER QUERY (5 min)

Na janela do Power Query:

1. **Renomear consulta:** clica com botão direito em `4_APONTAMENTO_HIST` → Renomear → `Apontamento`

2. **Promover cabeçalhos:** Página inicial → Usar primeira linha como cabeçalhos
   (a 1ª linha do Excel é título da aba; pode ter que clicar 2× pra pular o título e pegar a linha de cabeçalhos reais)

3. **Remover linhas vazias:** Página inicial → Reduzir Linhas → Remover linhas vazias

4. **Tipos de coluna** — confere/ajusta:
   | Coluna | Tipo |
   |---|---|
   | DATA | Data |
   | CLIENTE | Texto |
   | ID_OP | Número Inteiro |
   | ITEM | Texto |
   | DESCRICAO_OP | Texto |
   | N_PROG | Número Inteiro |
   | QTD_PROD | Número Inteiro |
   | QTD_PED | Número Inteiro |
   | H_INICIO | Texto (por enquanto) |
   | H_FIM | Texto |
   | TOTAL_MIN | Número Decimal |
   | NC | Número Inteiro |
   | COD_PARADA | Texto |
   | T_PARADA_MIN | Número Decimal |
   | OPERADOR | Texto |
   | MAQUINA | Texto |
   | AUDIT | Texto |

5. **Limpar campo OPERADOR** — remove sufixo " [???]":
   - Seleciona coluna OPERADOR → botão direito → Substituir Valores
   - Valor a localizar: ` [???]` (com espaço antes)
   - Substituir por: (vazio)
   - Repete pra "[???]" sem espaço

6. **Filtrar `???`:** clica na seta da coluna OPERADOR → desmarca `???` → OK

7. **Página inicial → Fechar e Aplicar**

---

## ETAPA 5 — CRIAR MEDIDAS DAX (5 min)

Abre `D:\IA MALELO\consultoria\IMPAKTTO\powerbi\medidas_dax.txt`.

Para cada medida:
1. **Modelagem → Nova medida**
2. Cola o nome e a fórmula DAX
3. Enter

**Comece pelas 7 medidas principais:**
- OPs Registradas
- Qtd Produzida Total
- Qtd Pedida Total
- Pct Atendido
- Paradas Registradas
- Operadores Únicos
- Peças Diferentes

Depois adiciona as outras conforme for construindo cada visual.

**Formatar Pct Atendido:**
- Seleciona a medida no painel Dados → aba **Ferramentas de medida** → Formato: Porcentagem, 1 casa decimal

---

## ETAPA 6 — LAYOUT DA APRESENTAÇÃO (15 min)

### Página 1 — VISÃO EXECUTIVA

```
┌────────────────────────────────────────────────────────────┐
│  CRONOANÁLISE IMPAKTTO                          [logo]      │
│  Diagnóstico de produtividade · 06–15/04/2026               │
├──────────┬──────────┬──────────┬──────────┬───────────────┤
│  KPI     │  KPI     │  KPI     │  KPI     │   filtros     │
│  OPs     │  Qtd     │  % Atend │  Paradas │   (data,      │
│   18     │  497     │  21,2%   │   14     │   operador)   │
├──────────┴──────────┴──────────┴──────────┴───────────────┤
│                                                              │
│   PRODUÇÃO POR OPERADOR  │  PRODUÇÃO POR PEÇA              │
│   (barra horizontal)      │  (donut ou barra vertical)      │
│                           │                                  │
├───────────────────────────┴──────────────────────────────────┤
│   TENDÊNCIA DIÁRIA — qtd produzida por dia (linha)           │
└──────────────────────────────────────────────────────────────┘
```

**Como construir cada visual:**

**Cabeçalho (texto):**
- Inserir → Caixa de texto: "CRONOANÁLISE IMPAKTTO" (fonte Segoe UI 24, cor #1F3A5F)
- Subtítulo embaixo: "Diagnóstico de produtividade · 06–15/04/2026" (Segoe UI 11 itálico)

**KPI Cards (4):**
- Visualização: **Cartão**
- Arrasta a medida correspondente para o campo
- Formato → Rótulo de dados: 36pt, cor #1F3A5F
- Formato → Categoria: 10pt, cor #3C4858

**Produção por Operador (barra horizontal):**
- Visualização: **Gráfico de barras agrupadas**
- Eixo Y: `OPERADOR`
- Eixo X: `Qtd Produzida Total`
- Formato → Cor: gradiente azul-marinho → laranja
- Ordenação: por `Qtd Produzida Total` decrescente
- Rótulos de dados: ON

**Produção por Peça (donut):**
- Visualização: **Gráfico de rosca (Donut)**
- Legenda: `ID_OP`
- Valores: `Qtd Produzida Total`
- Formato → Rótulos de detalhe: Categoria + porcentagem total

**Tendência diária (linha):**
- Visualização: **Gráfico de linhas**
- Eixo X: `DATA`
- Eixo Y: `Qtd Produzida Total`
- Formato → Linha: cor #1F3A5F, espessura 3
- Marcadores: ON

**Filtros (segmentações):**
- Visualização: **Segmentação de dados**
- Campo: `DATA` → estilo "Entre" (range slider)
- Outra segmentação: `OPERADOR` → estilo "Lista"

---

### Página 2 — ANÁLISE DE PARADAS

```
┌────────────────────────────────────────────────────┐
│  PARETO DE PARADAS                                  │
├────────────────────────┬───────────────────────────┤
│  Pareto (combo bar+    │   Tabela detalhada        │
│  line) com barras de   │   código × descrição ×    │
│  frequência e linha    │   ocorrências × % acum    │
│  de % acumulado        │                           │
├────────────────────────┴───────────────────────────┤
│  Mapa de calor: paradas por operador × código      │
└────────────────────────────────────────────────────┘
```

**Pareto (gráfico combo):**
- Visualização: **Gráfico de linhas e colunas agrupadas**
- Eixo X: `COD_PARADA`
- Coluna (eixo Y): `Frequência por Código`
- Linha (eixo Y secundário): `Pct Acumulado Paradas` (formato %)
- Ordena por Frequência desc

**Tabela:**
- Visualização: **Tabela**
- Colunas: `COD_PARADA`, `Frequência por Código`, `Pct Acumulado Paradas`

**Mapa de calor (matriz):**
- Visualização: **Matriz**
- Linhas: `OPERADOR`
- Colunas: `COD_PARADA`
- Valores: `Frequência por Código`
- Formato → Cores condicionais: escala 3-cor (vermelho-amarelo-verde)

---

### Página 3 — DETALHE OPERAÇÃO

Tabela completa do `Apontamento` com filtros — pra reunião onde alguém pergunta "e aquela OP de 09/04?"

- Visualização: **Tabela**
- Todas as colunas relevantes
- Filtros laterais: DATA, OPERADOR, ID_OP

---

## ETAPA 7 — REFINAR VISUAL (5 min)

Para cada visual:
1. **Formato → Bordas:** ON, cor #E5E7EB, raio 4
2. **Formato → Sombra:** ON, suave
3. **Título:** font Segoe UI Semibold 14, cor #1F3A5F
4. **Espaçamento:** alinhe usando guias (Exibição → Mostrar grade)

**Plano de fundo da página:**
- Página → Tela de fundo → Cor #F5F7FA, transparência 0%

---

## ETAPA 8 — EXPORTAR PDF (1 min)

**Para entregar ao cliente após a reunião:**

1. **Arquivo → Exportar → PDF**
2. Selecione todas as páginas
3. Salva como `D:\IA MALELO\consultoria\IMPAKTTO\entregaveis\CRONOANALISE_IMPAKTTO_v1.pdf`

**Para apresentar ao vivo:**
- Modo apresentação: **Exibir → Modo de Tela Cheia (F11)**
- Setas pra navegar entre páginas

---

## ETAPA 9 — ATUALIZAR COM NOVAS FOTOS

Quando você adicionar novos apontamentos via OCR (importar_csv.py na CRONOANALISE.xlsx):

1. Abre o `.pbix`
2. **Página inicial → Atualizar**
3. Power BI relê a planilha → KPIs e gráficos atualizam sozinhos

---

## CHECKLIST FINAL

- [ ] Power BI Desktop instalado
- [ ] Tema `tema_lasec.json` aplicado
- [ ] Dados conectados, tabela `Apontamento` carregada
- [ ] 7 medidas principais criadas
- [ ] Página 1 — Visão executiva (KPIs + 2 gráficos + tendência)
- [ ] Página 2 — Pareto de paradas
- [ ] Página 3 — Detalhe operação
- [ ] PDF exportado
- [ ] Salvar como `CRONOANALISE_IMPAKTTO.pbix`

---

## DICAS PARA REUNIÃO

1. **Use o foco:** clica num operador no gráfico → o resto da página filtra automaticamente
2. **Hover revelador:** passa o mouse nos visuais — Power BI mostra tooltips contextuais
3. **Drill-through:** crie navegação da Página 1 → Página 3 com clique-direito
4. **Fixe o fone:** desativa notificações antes de apresentar (Power BI exibe avisos do Windows na tela cheia)

---

*Guia criado em 2026-05-09 · LASEC Consultoria*
