# INDICE DO BANCO DE DADOS LASEC
# Diretorio: D:\IA MALELO\banco_dados\
# Atualizado: 2026-07-27 (correcao de taxas erradas + integracao bd_cnc/ferramentas)
# CONSULTAR ESTE INDICE ao iniciar qualquer orcamento ou analise tecnica
# FONTE DE VERDADE de custo = custos_ferramentaria lasec.xls aba "Custos 2026" (ver secao 3)

---

## 1. PROGRAMAS CNC E FERRAMENTAS (fonte primaria de dados de corte)

### PROG_CNC_DATABASE_v3.json (100 MB) — PRINCIPAL
- 11.547 programas CNC catalogados de D:\PROG_CNC
- Dados de corte POR FERRAMENTA (RPM, avanco, ciclos especificos)
- Distribuicao: LYNX220 4006 | DISCO760 1882 | DISCO560 1453 | G240 2080 | GL280 120 | CENTU30D 1122 | CENTU30S 492 | VTC30A 259 | CAM 133
- **QUANDO USAR:** Buscar programas similares para estimar tempos e parametros

### BIBLIOTECA_FERRAMENTAS_CNC.json (6 MB)
- 2.060 ferramentas unicas com RPM/avanco min/max/mediana
- Classificadas por tipo: BROCA 484 | FRESA 330 | MACHO 118 | CHANFRO 32 | FACEAR 21 | OUTRO 1016
- **QUANDO USAR:** Validar parametros de corte, escolher ferramentas

### SolidCAM_ToolLibs\ (subpasta)
- 1.044 ferramentas em formato .sctools para SolidCAM 2020
- Instalado em: E:\Program Files\SolidCAM2020\Solidcam\CimcoEditor\ToolLibs\LASEC\
- **QUANDO USAR:** Importar ferramentas no SolidCAM para programacao CAM

### PROG_CNC_DATABASE_v2.json (28 MB) — versao anterior
### PROG_CNC_DATABASE.json (80 MB) — versao original
- Versoes anteriores, mantidas como backup
- v3 supersede ambas

---

## 2. CONHECIMENTO TECNICO E APRENDIZADOS (consultar ANTES de calcular)

### PADRAO_DADOS_CORTE_OBRIGATORIO.md (7.7 KB)
- Formato obrigatorio para dados de corte em orcamentos
- Tabelas de Vc/RPM/avanco para: Aluminio, Aco 1020/1045/tratado, Inox, Latao, Bronze
- Formulas: RPM, avanco mm/min, tempo furacao, tempo torneamento
- Checklist pre-envio orcamento
- **QUANDO USAR:** SEMPRE ao criar PROCESSO_FABRICACAO

### TABELA_DADOS_CORTE_CORRIGIDA_FONTES_TECNICAS.md (9.6 KB)
- Tabelas HSS, Carbide, HSS-Co, Machos, Insertos G76, Escareamento, Alargamento
- Corrigida com fontes: Machinery's Handbook, CNC Cookbook, ScienceDirect
- Fatores: Carbide 3-5x mais rapido que HSS
- Ajustes por diametro (<6mm -20%, >12mm tabela)
- Ajustes por profundidade (>3xD -20%, >5xD -30%)
- **QUANDO USAR:** Referencia primaria de Vc/avanco quando BD CNC nao tem similar

### ATUALIZACAO_APRENDIZADOS_20251111.md (6 KB)
- Licoes do orcamento 008/2025 LUBRISYSTEM VAM-0013 (APROVADO R$86.59/peca)
- ERROS CRITICOS: broca de centro (LASEC nao usa!), spot face 3.40mm ignorado, ball nose errado
- REGRAS PERMANENTES:
  1. NUNCA usar broca de centro — LASEC usa MD alto centrante direto
  2. SEMPRE verificar profundidades em TODAS secoes do desenho
  3. Furos com spot face profundo (>2mm) = NA MESA do centro
  4. Ball nose raramente usado — preferir fresas standard
  5. Rosca BSP: G76 inserto (torno) OU G1002 macho (centro)
  6. Setup otimizado: 0.5h cada maquina
- **QUANDO USAR:** Checklist de erros a evitar em QUALQUER orcamento

### ATUALIZACAO_CONHECIMENTO_LUBRISYSTEM_20251110.md (6.4 KB)
- Conhecimento de 10 programas CNC reais (DISCO760 + LYNX220)
- Rosca BSP 1/8: dois metodos (macho G1002 S300 ou inserto G76 S1000)
- Live tooling: M33/M35, polar G12.1/G13.1, G94 fresamento
- Furos radiais: G1210 (centro) ou G87 (torno C-axis)
- Work offsets: G55 (1o lado) G56 (2o lado)
- Bar feeder: M31/M68/M69
- **QUANDO USAR:** Qualquer peca com roscas BSP, live tooling, furos radiais

### conhecimento_lubrisystem_completo.json (20 KB)
- Versao JSON completa do conhecimento acima
- Ferramentas padrao LYNX220 (T0101 a T1414) e DISCO760 (T1 a T16)
- Ciclos: G74, G75, G76, G83, G84, G87, G1002, G1064, G1210
- Tempos estimados por operacao
- **QUANDO USAR:** Lookup rapido de ferramentas e ciclos

### METODOLOGIA_CALCULO_LOTES_PEQUENOS.md (7.5 KB)
- Impacto do setup em lotes <50 pecas (pode encarecer 155%!)
- Formula completa: Setup → Producao → MOD → Indiretos → Markup → Imposto
- Tabela de referencia: 10/20/50/100/200 pecas
- Estrategias: negociar lotes maiores, reduzir setup, agrupar, markup ajustado
- Ponto de equilibrio: Setup maximo aceitavel = 5-7% do custo total
- **QUANDO USAR:** Qualquer orcamento com <50 pecas

### ORCAMENTO_MICROGEAR_COROA_33_APRENDIZADOS.md (9.9 KB)
- Case completo: furacao/escareamento em 20MnCr5 (250-300 HB)
- Comparativo Torno vs Centro (Centro venceu por 12%)
- Dados de corte validados: Broca HSS Vc 20, Alargador Vc 12, Escareador Vc 15
- G1210 muito mais eficiente que C-axis manual para furos padrao circular
- **QUANDO USAR:** Orcamentos de furacao/escareamento em aco tratado

---

## 3. CUSTOS E PRECOS (consultar planilha ATUALIZADA)

### custos_ferramentaria lasec.xls (83 KB) — ⭐ FONTE DE VERDADE DE CUSTO (aba "Custos 2026")
- Hora-maquina LASEC 2026 (base pre-roubo × fator 1,1597 = IPCA23+IPCA24+Dissidio SP 25/26)
- **Taxas 2026 CORRETAS (custo 2026 R$/h) — ler direto da planilha, nunca de cabeca:**
  - GL 280: **86,86** (setup 130,29) | LYNX 220LM: **96,35** (setup 144,52)
  - Discovery 560: 112,65 | Discovery 760 3E: **121,49** (setup 182,24) | D760 4E: **151,86** (setup 227,79)
  - VTC 30A: 93,89 | Centur 30D: **62,22** | G240: 83,15 | Serra: 30,02 | Projeto CAD/CAM: 76,96
- ⚠️ **CORRECAO 27/07/2026:** versao anterior deste indice dizia GL280 R$76,95 e Centur R$60,48 — ERRADO.
  O R$76,95/96 e a taxa de CAD/CAM (nao GL280). Valores acima conferidos contra a planilha.
- So as 4 ATIVAS entram em custo (GL280, LYNX, D760 3E, D760 4E) — ver memory/projeto_maquinas_legado.md
- NOTA: Estes sao custos INTERNOS. Preco de VENDA usa referencia GRV
- **QUANDO USAR:** Calcular CUSTO de fabricacao (SEMPRE). Ler com python3+xlrd se precisar do numero exato.

### tabela_precos_hora_maquina_grv_2024.md (5.8 KB)
- Pesquisa GRV Software 2024 (480 empresas Brasil)
- Grande SP: Torno conv R$107.65 | Torno CNC R$156.28 | CU 3 eixos R$189.78
- Doosan Lynx 220LM (ferramenta acionada): estimado R$190/h
- **QUANDO USAR:** Referencia de preco de MERCADO para comparacao

### tabela_precos_mercado_sp_2024_COMPLETA.md (8.2 KB)
- Tabela expandida com estimativas: CU 4 eixos R$240-260, CU 5 eixos R$300-350
- Fatores de acrescimo: +1 eixo +15-25%, ferramenta acionada +20-30%
- Definicao LASEC: GL280 R$156/h, Lynx 220LM R$190/h
- **QUANDO USAR:** Justificar precos ao cliente, benchmark

### dados_completos_orcamentos.json (14 KB)
- Historico de orcamentos anteriores com precos e margens
- **QUANDO USAR:** Referencia de precos ja praticados

---

## 4. DADOS REAIS DE PRODUCAO (maior prioridade!)

### tempo_real_comprovado_1.60.01.548.json (2 KB)
- Peca MICROGEAR 1.60.01.548: TEMPO REAL = 8 min (operador ANDRE, Doosan)
- Estimativas erraram de 67% a 265% para mais!
- LICAO: Estimativas podem variar 150-265% da realidade
- **QUANDO USAR:** Calibrar estimativas — sempre que possivel usar dados reais

### dados_reais_validados_1.60.01.548.json (3.9 KB)
- Dados validados contra ordem de producao real
- **QUANDO USAR:** Referencia para pecas similares (haste Aco16mm com canal)

### programa_cnc_1.60.01.548.json (2.9 KB)
- Programa CNC real da peca acima
- **QUANDO USAR:** Referencia de codigo G para pecas similares

---

## 5. ERP E FERRAMENTAL

### ⭐ D:\IA MALELO\bd_cnc\ferramentas\*.json — LOOKUP RAPIDO DE FERRAMENTAL (usar ANTES do CSV)
- Banco MINIPCP JA PARSEADO e categorizado (759 ferramentas, arquivos 2-8 KB cada):
  brocas_md (63), brocas_hss (100), insertos (182), suportes (118), machos_alarg (136),
  fresas (142), fixacao (4), pincas (13). Indice: `bd_cnc/ferramentas/index.json`
- Formato: `{"c":"08.12.001","d":"Broca MD Ø3.2"}` — buscar por diametro/tipo direto no JSON da categoria
- **QUANDO USAR:** cruzamento de codigo de ferramenta no PROCESSO_FABRICACAO — MUITO mais rapido/limpo
  que grepar o CSV binario. So cair no MINIPCP.csv se a ferramenta nao estiver nestes JSONs.

### BD MINIPCP.xlsx (341 KB) / MINIPCP.csv (244 KB) — FONTE COMPLETA (fallback do lookup acima)
- Codigos de ferramental MINIPCP: 08.08.xxx (suportes), 08.07.xxx (insertos), 08.12.xxx (brocas), etc.
- CSV e binario/latin1 — usar `grep -a`. Preferir os JSONs de `bd_cnc/ferramentas/` quando possivel.
- **QUANDO USAR:** Coluna "Cod. BD" no PROCESSO_FABRICACAO (quando o JSON categorizado nao cobrir)

### minipcp_12_18_2025.dump (626 MB)
- Dump completo do sistema MINIPCP
- **QUANDO USAR:** Consultas avancadas quando CSV nao tem o dado

---

## 5b. BASE DE CONHECIMENTO SECUNDARIA — D:\IA MALELO\agente\knowledge\ (pre-sistema de memoria)
Base de conhecimento anterior ao sistema de memoria (`memory/*.md`). Consultar como referencia
SECUNDARIA — em conflito de taxa/setup/regra, **memoria + este indice VENCEM** (a knowledge tem dados
antigos, ex: "setup 0,5h" que hoje e 1,0h min). Arquivos uteis:
- `maquinas-lasec.md` — ⭐ FONTE de specs TECNICAS das maquinas (rotacao, avanco, potencia, cursos, torre).
  Este e LIVE — espelhado em `memory/maquinas_specs.md`.
- `diferencas-torno-centro.md`, `calculos-referencia.md`, `processo-fabricacao-padrao-detalhado.md`,
  `checklist-validacao-orcamento.md`, `erros-comuns.md`, `decisoes-importantes.md` — referencia secundaria
- ⚠️ `agente/commands/` e `agente/rules/` sao DUPLICATAS ANTIGAS dos comandos reais (`.claude/commands/`
  + repo `xando-IA/commands/`) — NAO editar/usar; candidatos a remocao (confirmar com Alexandre).

## 6. BIBLIOTECAS LEGADAS

### biblioteca_cnc.json (268 KB) — superseded por BIBLIOTECA_FERRAMENTAS_CNC.json
### padroes_cnc.json (48 KB) — padroes CNC consolidados (versao anterior)
- Mantidos como referencia historica
- Usar v3 para dados atualizados

---

## HIERARQUIA DE CONSULTA (em ordem de prioridade)

1. **Correcao direta do Alexandre** → atualizar CHECKPOINT e memoria
2. **Dados reais de producao** (tempo_real_comprovado, ordens)
3. **Banco CNC LASEC** (PROG_CNC_DATABASE_v3 + BIBLIOTECA_FERRAMENTAS)
4. **Aprendizados documentados** (ATUALIZACAO_APRENDIZADOS, ORCAMENTO_MICROGEAR)
5. **Tabelas tecnicas corrigidas** (TABELA_DADOS_CORTE_CORRIGIDA)
6. **Especificacoes do fabricante** (DN Solutions, Romi, Sandvik, Dormer)
7. **Valores teoricos/calculados** (formulas padrao)

---

## 7. TEMPLATES HTML (NUNCA criar do zero — copiar e preencher!)

### D:\IA MALELO\templates\orcamento-lasec-hmtl\
- `PROCESSO_FABRICACAO_PP01_00003.html` — Template com placeholders [[VARIAVEL]]
- `ESTUDO_CUSTO_FABRICACAO.html` — Template com placeholders
- `ESTUDO_PRECO_VENDA_NFE.html` — Template com placeholders
- `ANALISE_VIABILIDADE_LOTES.html` — Template com placeholders
- `PROPOSTA_COMERCIAL_PADRAO_1FOLHA.html` — ⭐ USAR ESTE p/ proposta (1 pagina, testado 047/048/049)
- `PROPOSTA_COMERCIAL.html` — layout ANTIGO multi-pagina, NAO usar (quebra a regra de 1 pagina)
- ANALISE_BREAK_EVEN: sem template fixo — copiar de orcamento recente (ex: 048 SPEEDMAQ)
- `simbolo-lasec.jpg` — Logo LASEC (copiar para pasta do orcamento)

**Fluxo:** Copiar HTML para pasta do orcamento → Read → Edit (substituir dados) → Save
**NUNCA** recriar layout, CSS ou estrutura — ECONOMIZA TOKENS e mantém padrão aprovado

---

## SCRIPTS DE MANUTENCAO

- `D:\IA MALELO\scripts\catalogar_prog_cnc_v3.ps1` — Recatalogar programas CNC
- `D:\IA MALELO\scripts\gerar_biblioteca_solidcam.ps1` — Regenerar .sctools
- `D:\IA MALELO\scripts\buscar_programa_similar.ps1` — Busca rapida por similar
- `D:\IA MALELO\scripts\SISTEMA_PROGRAMAS_CNC.ps1` — Sistema interativo
