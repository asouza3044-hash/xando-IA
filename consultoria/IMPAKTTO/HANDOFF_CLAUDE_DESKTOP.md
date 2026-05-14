# HANDOFF — Cronoanálise IMPAKTTO (Claude Desktop)

Use este documento para continuar o projeto no **Claude Desktop**.
Diferente do Claude web, o Desktop pode ler arquivos locais via MCP filesystem
e interagir com Excel/Power BI no seu computador.

---

## PROMPT INICIAL — cole no Claude Desktop

```
Estou continuando um projeto de cronoanálise para o cliente IMPAKTTO
(fábrica de usinagem CNC pequena, ≤10 máquinas, ≤15 operadores).
Sou Alexandre Souza, consultor (LASEC). Estou migrando esta conversa
de outro Claude.

Antes de qualquer coisa, lê este arquivo:
D:\IA MALELO\consultoria\IMPAKTTO\HANDOFF_CLAUDE_DESKTOP.md

Tem todo o contexto, estado atual do projeto, estrutura do formulário
do cliente, o que já foi entregue e o que falta.

Resumo do que precisa saber:
- Pasta do projeto: D:\IA MALELO\consultoria\IMPAKTTO\
- Já existe planilha Excel pronta: CRONOANALISE.xlsx (10 abas, paleta corporativa,
  KPIs e gráficos de produtividade já calculados)
- Aba 4_APONTAMENTO_HIST tem 18 apontamentos da 1ª foto-teste
- Estou migrando para Power BI — guia, tema e medidas DAX já preparados
  em D:\IA MALELO\consultoria\IMPAKTTO\powerbi\

Workflow desejado:
1. Eu fotografo o formulário IMPAKTTO via Telegram/WhatsApp
2. Você aplica OCR (manuscrito) e devolve CSV pronto
3. Importo via importar_csv.py para CRONOANALISE.xlsx (aba 4)
4. Power BI conectado à planilha atualiza sozinho ao Refresh
5. Apresento ao vivo ao cliente + entrego PDF exportado do Power BI

Foco do entregável: TABELAS E GRÁFICOS DE PRODUTIVIDADE para slide.

Por favor:
- Use o MCP filesystem para ler os arquivos diretamente em vez de me pedir
  pra colar conteúdo
- Se algo no handoff estiver ambíguo, pergunte em vez de adivinhar
- Trabalhe na pasta D:\IA MALELO\consultoria\IMPAKTTO\ (não crie arquivos
  fora dela sem me consultar)
```

---

## CONTEXTO DO PROJETO

**Cliente:** IMPAKTTO — usinagem CNC pequena
**Consultor:** Alexandre Souza (LASEC)
**Data início:** 2026-05-09
**Cliente das peças observadas no apontamento:** MATRO

### Objetivo
Cronoanálise gerando:
1. Tempo-Padrão por peça/operação
2. Carga-Máquina / capacidade da célula
3. Produtividade Operador × Máquina × Peça
4. Plano de Melhoria

### Entregável principal
**Apresentação Power BI** (mix: ao vivo + PDF executivo).
Foco em tabelas e gráficos de produtividade.

---

## ESTRUTURA DO FORMULÁRIO IMPAKTTO

Cliente já mantém apontamento manual em papel. Layout fixo:

**Cabeçalho:**
- MÁQUINA (uma folha = uma máquina)

**Bloco "DADOS DO PEDIDO E OPERAÇÃO":**
- DATA · CLIENTE · **ID** (número da peça/desenho, ex. 30809) · **ITEM** (posição, ex. 2,2) · DESCRIÇÃO DO PROG. OPERAÇÃO · Nº PROG · QUANT PRODUZIDA · QUANT PEDIDO

**Bloco "DADOS DA OPERAÇÃO":**
- HORÁRIO INÍCIO · FIM · TOTAL · NÃO CONFORME Nº PEÇAS · PARADA (código) · OPERADOR

**Rodapé:**
- CÓDIGOS DE PARADA: P01 (energia), P02 (falta MP), P03 (saída func), P09 (CQ), P10 (falta serviço) · outros a mapear
- DADOS DO PROCESSO: HORAS NORMAIS (vi "153.00" — meta mensal? confirmar)

⚠️ **ATENÇÃO:** "ID" = peça (número grande) · "ITEM" = posição (número pequeno tipo 2,2). NÃO confundir.

---

## ARQUIVOS NA PASTA `D:\IA MALELO\consultoria\IMPAKTTO\`

### Documentos
| Arquivo | Função |
|---|---|
| `HANDOFF_CLAUDE_DESKTOP.md` | Este arquivo |
| `HANDOFF_CLAUDE_WEB.md` | Versão para Claude web (pode ignorar) |
| `PLANO_COLETA_CRONOANALISE.md` | Plano metodológico (5 etapas) |
| `OCR_PROTOCOLO.md` | Padrão de captura de fotos + prompt-template OCR |

### Excel
| Arquivo | Função |
|---|---|
| `CRONOANALISE.xlsx` | Planilha principal (10 abas) |
| `gerar_planilha.py` | Regenera a planilha do zero |
| `importar_csv.py` | Importa CSV de OCR para a aba 4 |
| `CRONOANALISE_bkp_*.xlsx` | Backups automáticos (cada importação cria um) |

### OCR
| Arquivo | Função |
|---|---|
| `fotos_apontamento\` | Salvar fotos novas dos formulários |
| `ocr_output\` | CSVs gerados pelo OCR |
| `ocr_output\20260509_teste_foto1.csv` | CSV da 1ª foto teste (18 linhas, baixa confiança) |

### Power BI
| Arquivo | Função |
|---|---|
| `powerbi\POWERBI_GUIA.md` | Passo a passo de construção |
| `powerbi\tema_lasec.json` | Tema corporativo (paleta navy/laranja/verde/vermelho) |
| `powerbi\medidas_dax.txt` | Medidas DAX prontas pra colar |

---

## ESTADO ATUAL

### Excel (CRONOANALISE.xlsx)
✅ 10 abas estruturadas com paleta corporativa
✅ Capa profissional + Dashboard com KPI cards e gráficos
✅ Aba 4 com 18 apontamentos da 1ª foto teste já importados
✅ Fórmulas dinâmicas — quando entrar mais foto, atualiza sozinho
✅ Verificação técnica: B2=18, B3=497, F3=183 (Clayton), Q4=9 (P07)

### Power BI
✅ Tema corporativo (`tema_lasec.json`) — aplicar em Exibir > Temas
✅ Medidas DAX prontas (`medidas_dax.txt`) — colar em Modelagem > Nova medida
✅ Guia passo a passo (`POWERBI_GUIA.md`) — 30-45 min do zero ao relatório
⏳ Power BI Desktop sendo instalado via `winget install Microsoft.PowerBI`

### Dados reais já calculados (das 18 OPs)

**KPIs:**
- 18 OPs · 497 peças produzidas · 21,2% atendido · 14 paradas
- Período: 06/04 a 15/04/2026
- 1 cliente: MATRO

**Por operador (qtd produzida):**
| Operador | Qtd | % mix |
|---|---|---|
| Clayton | 183 | 36,8% |
| ??? (ilegível) | 148 | 29,8% |
| Ulton | 65 | 13,1% |
| Vanildo | 61 | 12,3% |
| dilma | 24 | 4,8% |
| Vita | 16 | 3,2% |

**Por ID/peça:**
| ID | Qtd | % mix |
|---|---|---|
| 31552 | 216 | 43,5% |
| 30809 | 184 | 37,0% |
| 31553 | 55 | 11,1% |
| (teste) | 37 | 7,4% |
| 31652 | 5 | 1,0% |

**Pareto paradas (frequência — sem horas legíveis):**
| Cód | Ocorr | % | % acum |
|---|---|---|---|
| P07 | 9 | 64% | 64% |
| P01 | 2 | 14% | 78% |
| P11 | 1 | 7% | 85% |
| P16 | 1 | 7% | 92% |

---

## PRÓXIMOS PASSOS (em ordem)

1. **[Em andamento]** Aguardar instalação do Power BI Desktop
2. **Aplicar tema_lasec.json** no Power BI
3. **Conectar à CRONOANALISE.xlsx** (aba `4_APONTAMENTO_HIST`)
4. **Limpar dados no Power Query** (remover `[???]` do operador, filtrar `???`)
5. **Criar 7 medidas DAX principais**
6. **Construir Página 1 (Visão Executiva)** — KPIs + produtividade
7. **Construir Página 2 (Pareto Paradas)**
8. **Construir Página 3 (Detalhe Operação)**
9. **Exportar PDF** para entrega ao cliente
10. **Quando tiver foto melhor** → OCR → import → refresh Power BI

### Pendências externas (cliente)
- Foto melhor do formulário (a 1ª teve baixa nitidez, máquina ilegível, vários `[???]`)
- Lista oficial de máquinas e operadores ativos
- Descrições reais dos códigos P11 e P16 (vistos mas sem legenda no rodapé do formulário fotografado)
- Confirmar significado do "153.00" em DADOS DO PROCESSO > HORAS NORMAIS
- Cronometragem de calibração de 5–8 peças Pareto (31552 e 30809 são prioridade)

---

## REGRAS IMPORTANTES (preferências do Alexandre)

1. **Idioma:** sempre português Brasil
2. **Foco do entregável:** Power BI — tabelas e gráficos de produtividade para slide de reunião
3. **Não inventar dados:** usar exclusivamente o que vem do apontamento real do cliente. Sem placeholders de máquinas/operadores que não estão na foto.
4. **Não otimizar pulando etapas:** seguir o plano passo a passo
5. **Output conciso:** máx 3 bullets, tabelas/listas, sem texto longo

---

## LIMITAÇÃO CONHECIDA

`openpyxl` (gerador da planilha) escreve fórmulas mas não calcula.
Para os valores aparecerem na CRONOANALISE.xlsx após `importar_csv.py`,
precisa abrir/recalcular no Excel real ou via PowerShell COM:

```powershell
$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false; $xl.DisplayAlerts = $false
$wb = $xl.Workbooks.Open("D:\IA MALELO\consultoria\IMPAKTTO\CRONOANALISE.xlsx")
$xl.CalculateFullRebuild(); $wb.Save(); $wb.Close(); $xl.Quit()
```

Power BI não tem essa limitação — ele recalcula tudo no Refresh.

---

*Handoff escrito em 2026-05-09 · 21:05 BRT · LASEC Consultoria*
