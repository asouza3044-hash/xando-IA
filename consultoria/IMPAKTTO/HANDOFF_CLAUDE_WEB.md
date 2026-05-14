# HANDOFF — Cronoanálise IMPAKTTO

Documento para continuar este projeto em outra sessão (Claude web ou outra).
Cole o "PROMPT INICIAL" abaixo na nova conversa, anexe os arquivos listados.

---

## CONTEXTO RÁPIDO

**Quem sou:** Alexandre Souza, consultor (LASEC). Tenho experiência em usinagem CNC, orçamentação e análise industrial.

**Cliente:** IMPAKTTO — fábrica de usinagem CNC, pequeno porte (≤10 máquinas, ≤15 operadores).

**Objetivo:** Cronoanálise da fábrica para gerar:
1. Tempo-Padrão por peça/operação
2. Carga-Máquina / capacidade da célula
3. Produtividade Operador × Máquina × Peça
4. Plano de Melhoria

**Entregável principal para reunião / slide:** **TABELAS E GRÁFICOS DE PRODUTIVIDADE** (foco no slide).

**Forma de coleta de dados em campo:** o cliente já mantém apontamento manual em formulário de papel "IMPAKTTO — Apontamento de Produção" (logo IMPAKTTO no topo, formato fixo). Quero **fotografar o formulário via Telegram/celular** e que o assistente:
1. Faça OCR do manuscrito
2. Estruture em CSV
3. Importe para a planilha Excel
4. Atualize KPIs e gráficos do dashboard automaticamente

---

## ESTRUTURA DO FORMULÁRIO IMPAKTTO

Cabeçalho:
- **MÁQUINA** (campo único, no topo da folha — uma folha = uma máquina)

Bloco "DADOS DO PEDIDO E OPERAÇÃO":
- DATA · CLIENTE · **ID** (= número da peça/desenho, ex. 30809) · **ITEM** (= posição, ex. 2,2) · DESCRIÇÃO DO PROG. OPERAÇÃO · Nº PROG · QUANT PRODUZIDA · QUANT PEDIDO

Bloco "DADOS DA OPERAÇÃO":
- HORÁRIO INÍCIO · FIM · TOTAL · NÃO CONFORME Nº PEÇAS · PARADA (código) · OPERADOR

Rodapé:
- CÓDIGOS HS PARADAS — P01 (falta de energia elétrica), P02 (falta material/MP), P03 (saída de funcionário), P09 (inspeção/CQ), P10 (falta serviço) — outros códigos a mapear com cliente
- DADOS DO PROCESSO: HORAS NORMAIS (vi "153.00" — meta mensal? a confirmar)

**ATENÇÃO:** No formulário, "ID" é o número da peça (ex. 30809) e "ITEM" é a posição (ex. 2,2). NÃO confundir.

---

## O QUE JÁ FOI FEITO

### Pasta de trabalho
`D:\IA MALELO\consultoria\IMPAKTTO\`

### Arquivos
| Arquivo | Função |
|---|---|
| `CRONOANALISE.xlsx` | Planilha entregável principal (10 abas) |
| `gerar_planilha.py` | Script Python que gera a planilha do zero |
| `importar_csv.py` | Script que importa CSV gerado pelo OCR direto na aba 4 |
| `PLANO_COLETA_CRONOANALISE.md` | Plano metodológico (5 etapas) |
| `OCR_PROTOCOLO.md` | Padrão de captura de fotos + prompt-template OCR |
| `ocr_output\20260509_teste_foto1.csv` | CSV gerado da 1ª foto (18 linhas — confiança baixa) |
| `fotos_apontamento\` | Pasta para salvar fotos novas |
| `CRONOANALISE_bkp_*.xlsx` | Backups automáticos |

### Estrutura da planilha (10 abas)
| # | Aba | Conteúdo |
|---|---|---|
| 0 | CAPA | Banda lateral azul-marinho, título grande, sumário |
| 1 | DASHBOARD | **FOCO** — KPI cards + tabelas/gráficos de produtividade + Pareto |
| 2 | INSTRUÇÕES | Guia de uso |
| 3 | CADASTROS | Máquinas, operadores, peças, códigos parada, turnos |
| 4 | APONTAMENTO_HIST | OCR digitalizado do formulário IMPAKTTO |
| 5 | COLETA_CRONO | Cronometragem de calibração |
| 6 | COLETA_AMOSTRAGEM | Work sampling |
| 7 | TEMPOS_PADRAO | TP oficial + Fator de Apontamento |
| 8 | CARGA_MAQUINA | Capacidade × demanda × ocupação |
| 9 | PRODUTIVIDADE | Matriz O×M×P |
| 10 | PLANO_MELHORIA | Ações priorizadas |
| -- | _AGREG | (oculta) Agregações dinâmicas — base do dashboard |

### Aba 4 já contém os 18 apontamentos da 1ª foto teste
Período: 06/04 a 15/04/2026 · Cliente predominante: MATRO

### Paleta visual aplicada (consultoria industrial)
- Azul-marinho `#1F3A5F` (headers, títulos)
- Laranja `#E87722` (accent)
- Verde `#2E933C` (meta atingida)
- Vermelho `#C0392B` (abaixo meta)
- Cinza claro `#F5F7FA` (fundo zebra)
- Fonte: Calibri

### Agregados calculados (das 18 OPs reais)

**KPIs:**
- 18 OPs · 497 peças produzidas · 21,2% atendido · 14 paradas

**Por operador (qtd produzida):**
| Operador | Qtd | % mix |
|---|---|---|
| Clayton | 183 | 36,8% |
| Ulton | 65 | 13,1% |
| Vanildo | 61 | 12,3% |
| dilma | 24 | 4,8% |
| Vita | 16 | 3,2% |
| ??? (ilegível) | 148 | 29,8% |

**Por ID/peça:**
| ID | Qtd | % mix |
|---|---|---|
| 31552 | 216 | 43,5% |
| 30809 | 184 | 37,0% |
| 31553 | 55 | 11,1% |
| (teste) | 37 | 7,4% |
| 31652 | 5 | 1,0% |

**Pareto paradas (frequência — sem horas legíveis na foto):**
| Cód | Ocorr |
|---|---|
| P07 | 9 (64%) |
| P01 | 2 (14%) |
| P11 | 1 |
| P16 | 1 |

---

## O QUE AINDA FALTA / PRÓXIMOS PASSOS

1. **Foto melhor do formulário** — a 1ª foto teve baixa nitidez, MÁQUINA do cabeçalho ficou ilegível, vários operadores marcados `[???]`. Padrão de captura no OCR_PROTOCOLO.md.
2. **Confirmar com IMPAKTTO** lista completa de códigos de parada (vi P01, P07, P11, P16; descrições de P11/P16 desconhecidas).
3. **Ler valor "153.00" do rodapé** — confirmar se é meta mensal de horas.
4. **Cronometragem de calibração** — 5 a 8 peças Pareto (31552 e 30809 são os candidatos pelo volume).
5. **Lista oficial de máquinas e operadores ativos** do cliente.
6. **Refazer dashboard com fotos legíveis** para apresentação em reunião/slide.

---

## ESTADO TÉCNICO ATUAL

- Planilha **funcionando** com fórmulas dinâmicas — KPI cards, tabelas e gráficos de produtividade alimentam-se da aba 4_APONTAMENTO_HIST.
- O `importar_csv.py` está corrigido para gravar números como número (não texto) e fórmulas SUMIF/COUNTIF estão na coluna correta (ID_OP = coluna C).
- Última verificação: B2=18, B3=497, F3=183 (Clayton), Q4=9 (P07) — tudo conforme.
- Limitação openpyxl: ele grava fórmulas mas não calcula; precisa abrir/recalcular no Excel real (ou via COM PowerShell — comando exemplo no histórico do chat).

---

## PROMPT INICIAL (cole na nova sessão Claude web)

```
Estou continuando um projeto de cronoanálise para o cliente IMPAKTTO (fábrica de
usinagem CNC pequena, ≤10 máquinas, ≤15 operadores). Sou Alexandre Souza,
consultor (LASEC). Estou migrando esta conversa de outro Claude.

LEIA PRIMEIRO o documento de handoff que estou anexando:
HANDOFF_CLAUDE_WEB.md — tem todo o contexto, estado atual, estrutura do
formulário do cliente, paleta visual aplicada, e o que falta fazer.

Estado:
- Pasta do projeto: D:\IA MALELO\consultoria\IMPAKTTO\
- Já existe planilha CRONOANALISE.xlsx funcional com 10 abas, paleta corporativa,
  dashboard com KPIs e gráficos de produtividade
- Aba 4 já tem 18 apontamentos da 1ª foto-teste (qualidade baixa)
- Foco do entregável: TABELAS E GRÁFICOS DE PRODUTIVIDADE para slide

Workflow desejado:
1. Eu fotografo o formulário via Telegram
2. Você faz OCR e devolve CSV pronto
3. Importo via script importar_csv.py
4. Dashboard atualiza sozinho

Preciso que você assuma este projeto a partir daqui. Se algo no handoff estiver
ambíguo, me pergunte em vez de adivinhar.
```

---

## ARQUIVOS PARA ANEXAR NA NOVA SESSÃO

1. Este `HANDOFF_CLAUDE_WEB.md`
2. `CRONOANALISE.xlsx` (estado atual)
3. `gerar_planilha.py` (caso queira regenerar)
4. `importar_csv.py` (importador)
5. `PLANO_COLETA_CRONOANALISE.md` (metodologia)
6. `OCR_PROTOCOLO.md` (padrão de OCR)
7. Foto original do formulário IMPAKTTO (a primeira que me enviou)

---

*Handoff escrito em 2026-05-09 às 20:55 BRT.*
