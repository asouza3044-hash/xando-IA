# Calcular Orçamento de Usinagem CNC

**ATENÇÃO:** Este comando gera 5 arquivos HTML com valores financeiros. Erros causam prejuízo real.

## Como usar:
```
/calcular-orcamento CLIENTE CODIGO_PECA
```

Exemplo:
```
/calcular-orcamento LIVENZA 2.0610.L082590
```

---

## PROCESSO COMPLETO

### 1. COLETA DE DADOS OBRIGATÓRIA

Você DEVE perguntar ao usuário e coletar:

#### Dados da Peça
- [ ] **Cliente:** Nome completo
- [ ] **Código da peça:** Ex: 2.0610.L082590
- [ ] **Número do orçamento:** Ex: 008/2025
- [ ] **Material:** (padrão: SAE 1020 - cliente fornece)
- [ ] **Acabamento:** (padrão: Zincagem - cliente fornece)

#### Dados de Usinagem
- [ ] **Tempo por operação:** Ler do programa CNC ou PROCESSO_FABRICACAO existente
- [ ] **Número de ferramentas:** Para calcular tempo improdutivo
- [ ] **Máquina:** Identificar PRIMEIRO para definir setup
- [ ] **Setup estimado:** ⚠️ DEPENDE DA MÁQUINA:
  - **TORNO CNC** (cilíndrica): 0,5h = R$ 90,00 (CENTU30D, CENTU30S, GL240, GL280, LYNX220)
  - **CENTRO DE USINAGEM** (prismática): 2h = R$ 360,00 (DISCO560, DISCO760, VTC30A)

#### Dados de Ferramental (Item 3)
⚠️ **SEMPRE pesquisar ferramentas adequadas:**
1. Sites fabricantes: Iscar, Hanita, Kennametal, ZCC, OSG
2. Cruzar com BD MINIPCP (`D:\lasec\MINIPCP.csv`)
3. Códigos BD: 08.06.xxx (brocas), 08.07.xxx (pastilhas), 08.08.xxx (suportes), 08.09.xxx (machos), 08.11.xxx (fresas)

- [ ] **Para cada ferramenta:**
  - Código da ferramenta (ex: T01, T02...)
  - Tipo de ferramenta (ex: Fresa Face Ø63, Fresa Topo Ø12)
  - Código BD Suporte (ex: 08.08.041) - buscar em MINIPCP
  - Nome do Suporte (ex: DWLNR2020K06)
  - Código BD Pastilha (ex: 08.07.096) - buscar em MINIPCP
  - Nome da Pastilha/Inserto (ex: WNMG 060408 WT TT8115 ou APKT 1604)
  - RPM (VALOR EXATO - ex: 1200) - conforme material
  - Avanço (VALOR EXATO - ex: F 0.15) - conforme material
  - Tempo da operação (ex: 1,5 min) - estimar baseado em complexidade
  - Descrição da operação (ex: Faceamento superior 51×51mm)

---

### 2. CÁLCULOS (ORDEM CRÍTICA)

#### Passo 1: Calcular Tempo Total/Peça
```
Tempo_produtivo = Soma de todos os tempos de operação

Tempo_improdutivo = (Número_ferramentas - 1) × tempo_troca
  - TORNO: 20 segundos por troca
  - CENTRO: 10 segundos por troca ⚠️

Tempo_total = Tempo_produtivo + Tempo_improdutivo
```

**VALIDAR COM USUÁRIO** antes de prosseguir!

#### Passo 2: Calcular Custos por Lote

Para cada lote (50, 100, 200, 500):

```
Setup_custo = Setup_h × R$ 180/h
  - TORNO: 0,5h × R$ 180/h = R$ 90,00
  - CENTRO: 2h × R$ 180/h = R$ 360,00 ⚠️

MOD_producao = (Qtd × Tempo_total_min / 60) × R$ 120/h
Indiretos = (Setup_custo + MOD_producao) × 58%
CUSTO_TOTAL = Setup_custo + MOD_producao + Indiretos
CUSTO_PEÇA = CUSTO_TOTAL / Qtd
```

#### Passo 3: Calcular Preços de Venda

Markups por lote:
- 50 peças: 1,240
- 100 peças: 1,290
- 200 peças: 1,350
- 500 peças: 1,408

```
PREÇO_PEÇA = CUSTO_PEÇA × Markup
TOTAL_NFE = PREÇO_PEÇA × Qtd
```

#### Passo 4: Calcular Ponto de Equilíbrio

```
CVp = (Tempo_total_min / 60) × R$ 120/h × 1,58
PE = R$ 90,00 / (Preço_minimo - CVp)
```

---

### 3. GERAR ARQUIVOS HTML (5 OBRIGATÓRIOS)

Gerar nesta ordem:

#### 3.1 PROCESSO_FABRICACAO_[CODIGO].html
- Item 1: Informações Gerais
- Item 2: Ferramental Utilizado (resumo)
- **Item 3: DADOS TÉCNICOS DE CORTE** (tabela principal)
  - 9 colunas (SEM coluna Ferr.)
  - Total larguras = 100%
  - Todas células centralizadas
  - RPM e Avanço: valores EXATOS
- Item 4: Tempo total e setup

#### 3.2 ESTUDO_CUSTO_FABRICACAO_[CODIGO].html
- Parâmetros base (tempo/peça, setup, hora/máquina)
  - **Setup: R$ 180/h**
  - **Produção: R$ 120/h**
- Cálculo detalhado lote 50
- Cálculo detalhado lote 100
- Cálculo detalhado lote 200
- Cálculo detalhado lote 500
- Tabela comparativa
- Observações importantes (destacar setup 1,5x produção)

#### 3.3 ANALISE_VIABILIDADE_LOTES_[NUMERO].html
- Dados técnicos
- Ponto de equilíbrio calculado
- Lote mínimo viável
- Comparação detalhada 4 lotes
- **Tabela de ponto de equilíbrio detalhada** (6 quantidades)
- Recomendações comerciais
- Conclusões da análise

#### 3.4 ESTUDO_PRECO_VENDA_NFE_[CODIGO].html
- Formação de preço lote 50
- Formação de preço lote 100 (RECOMENDADO)
- Formação de preço lote 200
- Formação de preço lote 500
- Composição de markup para cada lote

#### 3.5 PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].html
- Cabeçalho profissional com logo
- Dados do cliente
- Descrição da peça
- **Tabela de opções** (4 lotes com preços)
- Condições comerciais
- Prazo de entrega
- Forma de pagamento

---

### 4. VALIDAÇÃO CRUZADA OBRIGATÓRIA

**ANTES de declarar conclusão**, validar:

✓ Setup = R$ 180/h em TODOS os arquivos
✓ Tempo/peça IDÊNTICO em todos os arquivos
✓ Custo/peça lote 50 IDÊNTICO em: ESTUDO_CUSTO, ESTUDO_PRECO, ANALISE_VIABILIDADE
✓ Custo/peça lote 100 IDÊNTICO em: ESTUDO_CUSTO, ESTUDO_PRECO, ANALISE_VIABILIDADE
✓ Custo/peça lote 200 IDÊNTICO em: ESTUDO_CUSTO, ESTUDO_PRECO, ANALISE_VIABILIDADE
✓ Custo/peça lote 500 IDÊNTICO em: ESTUDO_CUSTO, ESTUDO_PRECO, ANALISE_VIABILIDADE
✓ Preço/peça lote 50 IDÊNTICO em: ESTUDO_PRECO, PROPOSTA_COMERCIAL
✓ Preço/peça lote 100 IDÊNTICO em: ESTUDO_PRECO, PROPOSTA_COMERCIAL
✓ Preço/peça lote 200 IDÊNTICO em: ESTUDO_PRECO, PROPOSTA_COMERCIAL
✓ Preço/peça lote 500 IDÊNTICO em: ESTUDO_PRECO, PROPOSTA_COMERCIAL

---

### 5. APRESENTAÇÃO DE RESULTADOS

Ao finalizar, mostrar ao usuário:

```
✅ ORÇAMENTO [NUMERO]/2025 - [CLIENTE] CONCLUÍDO

📊 RESUMO DE PREÇOS:
Lote 50:  R$ XX,XX/peça | Total: R$ XXX,XX
Lote 100: R$ XX,XX/peça | Total: R$ XXX,XX ⭐ RECOMENDADO
Lote 200: R$ XX,XX/peça | Total: R$ XXX,XX
Lote 500: R$ XX,XX/peça | Total: R$ XXX,XX

📁 ARQUIVOS GERADOS:
✅ PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].html
✅ PROCESSO_FABRICACAO_[CODIGO].html
✅ ESTUDO_CUSTO_FABRICACAO_[CODIGO].html
✅ ANALISE_VIABILIDADE_LOTES_[NUMERO].html
✅ ESTUDO_PRECO_VENDA_NFE_[CODIGO].html

⚠️ VALIDAÇÃO CRUZADA:
✅ Setup R$ 180/h em todos os arquivos
✅ Valores consistentes entre arquivos
✅ Todos os 5 arquivos gerados

📍 PONTO DE EQUILÍBRIO: XX peças
```

---

## REGRAS ABSOLUTAS (NUNCA VIOLAR)

1. **Setup = R$ 180/h** (NUNCA R$ 120/h)
   - TORNO: 0,5h = R$ 90,00
   - CENTRO: 2h = R$ 360,00 ⚠️
2. **Produção = R$ 120/h**
3. **Custos indiretos = 58%** sobre (Setup + MOD)
4. **Tempo improdutivo** = (nº ferramentas - 1) × tempo_troca
   - TORNO: 20s por troca
   - CENTRO: 10s por troca ⚠️
5. **Pesquisar ferramentas** em fabricantes + BD MINIPCP
6. **Valores EXATOS** em RPM e Avanço (não intervalos)
7. **5 arquivos HTML** sempre
8. **Valores IDÊNTICOS** entre arquivos relacionados
9. **Validação cruzada** antes de finalizar

---

## EM CASO DE DÚVIDA

**SEMPRE perguntar ao usuário. NUNCA adivinhar.**

Melhor perder 5 minutos perguntando do que causar prejuízo.
