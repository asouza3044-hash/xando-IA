# Memoria LASEC — INDICE PRINCIPAL
# Este arquivo e carregado automaticamente em TODA sessao
# Manter enxuto (<150 linhas) — detalhes nos arquivos tematicos

## Feedbacks
- [**CRÍTICO $$$** Taxa de máquina vem da PLANILHA, não de cabeça](feedback_fonte_verdade_custos_planilha.md) — custo em `custos_ferramentaria lasec.xls` (aba Custos 2026); specs técnicas em `agente/knowledge/maquinas-lasec.md`. GL280 estava errado (76,95 vs 86,86 real). SEMPRE conferir a fonte
- [Origem do layout de proposta 1-página](template_proposta_1pagina.md) — layout aprovado nasceu na 022/SPEEDMAQ; hoje vive como template `PROPOSTA_COMERCIAL_PADRAO_1FOLHA.html`
- [**CRÍTICO** git checkout sem checar diff antes](feedback_git_checkout_sem_checar.md) — SEMPRE `git diff` antes de checkout/reset/clean em arquivo que não editei nesta sessão. Incidente 24/07/2026: descartei mudança não commitada de outra sessão (IMPAKTTO) sem checar
- [D760 também por falta de espaço na torre](feedback_d760_capacidade_torre.md) — não só limite Ø8mm de potência, torre BMT45P (24 pos.) pode saturar em peças com muitas ferramentas
- [**CRÍTICO** Códigos ferramentas MINIPCP — mapa completo](feedback_codigos_ferramentas_minipcp.md) — NUNCA inventar código. Mapa: mandrilar (08.08.008+08.07.031), bedame 2mm INOX (08.07.094+08.08.026), canal int (08.07.067), cabeçote Ø80 (08.11.137). S20R-SCLCR09 NÃO EXISTE
- [**BD CNC só cobre até 2023**](feedback_bd_cnc_cobertura_2023.md) — peças 2024+ NÃO indexadas. Não insistir, avisar direto
- [Broca pré-furo: cruzar com BD MINIPCP](feedback_broca_tmax_bd_cruzamento.md) — SEMPRE Tmax Ø29 (08.08.060/08.07.036) p/ furo final ≥31mm, nunca genérico
- [**CRÍTICO $$$** Preço apresentado = preço gerado](feedback_preco_apresentado_vs_gerado.md) — markup apresentado no chat DEVE bater com HTML. Incidente 033/2026: R$654 de diferença
- [Categorizacao](feedback_categorizacao.md) — duvida quando nao souber, aprender ao resolver, dedup maximo
- [Checkpoint por evento](feedback_checkpoint_95.md) — OBRIGATORIO apos cada HTML/aprovacao/correcao/sync, NAO por % tokens
- [Output conciso](feedback_output_conciso.md) — max 3 bullets, só tabela/lista, sem texto, max 800 tokens
- [Proposta consolidada](feedback_proposta_consolidada.md) — múltiplas peças → PERGUNTAR: proposta única ou individuais?
- [RECORRENTE: não pular ordens](feedback_processo_gate_batch.md) — **CRÍTICO**: NUNCA otimizar pulando etapas/gates do Alexandre
- [Precificação MICROGEAR](feedback_precificacao_microgear.md) — benchmarks reais (eixo R$22-562, flange R$28-73, pinhão/coroa R$25-65). +15% se fórmula conservadora
- [RFS Telecom — falida](projeto_rfs_telecom.md) — IGNORAR em repasse de custo. USAR só programas CNC como referência
- [Máquinas LASEC — ativas vs legado](projeto_maquinas_legado.md) — SÓ 4 ativas (GL280, LYNX, D760 3/4-eixos). Resto = legado
- [Reusinagem em peça pré-usinada](feedback_orcamento_acabamento_peca_fornecida.md) — cliente fornece peça, estratégia 3-etapas -21%. ❌ NUNCA cláusula refugo. Markup ×1,20
- [**Tempos fixos GL280 MICROGEAR calibrados**](feedback_tempos_fixos_gl280_microgear.md) — Prog GL280 **3,0h** (NÃO 5,5h). Setup **1,0h** (NÃO 1,5h)
- [**MICROGEAR MP sempre fornecida**](feedback_microgear_mp_fornecida.md) — blank pré-cortado, custo material = ZERO em TODOS orçamentos MICROGEAR
- [Não inferir bore de programas similares](feedback_nao_inferir_bore_de_programas.md) — programas similares = referência de dados de corte APENAS, geometria vem do desenho
- [**ANTI-ALUCINAÇÃO** Família ≠ tempo igual](feedback_familia_nao_e_tempo.md) — NUNCA copiar tempo entre peças mesma família/cliente. Geometria define ciclo
- [SEMPRE usar agente modular](feedback_agente_modular.md) — `/orcamento-lasec` → `orcamento-lasec-modular.md` (7KB), NÃO o cheio (17KB)
- [Repo oficial xando-IA](feedback_caminho_repo_oficial.md) — `C:\Users\lasec\Documents\GitHub\xando-IA\` (NÃO OneDrive)
- [Pinhão cônico compacto MICROGEAR — tempo](feedback_pinhao_conico_microgear_tempo.md) — Família 1.34.03.6xx ~6 min/pç (10-12 pç/h). NÃO inflar ×1,4
- [LYNX 220LM RPM limite S4500](feedback_lynx_rpm_limite_4500.md) — NÃO S3000 (conservador). Posso simular G-code
- [As-built: Alexandre envia os tempos direto](feedback_as_built_fluxo_tempos.md) — NÃO perguntar número de OP/fonte de dados no fluxo as-built, tempos vêm do Alexandre. Ver [[roteiro_as_built]]
- [Troca de castanha em peça 2 lados](feedback_troca_castanha_peca_2_lados.md) — bar work 2 fixações (G55+G56) SEMPRE troca castanha — estrutural, cabe no setup padrão 1,0h
- [Tempo alto pode ser experimento, não ciclo real](feedback_experimento_nao_e_ciclo_producao.md) — SEMPRE perguntar se tempo desproporcional no apontamento é produção normal ou teste. Incidente 046/2026 SPEEDMAQ: 2° lado media 15min, era experimento, real é 2,5min
- [Live tooling LYNX — limite ferramental](feedback_live_tool_limite_ferramental.md) — Furação ≥M10/Ø9mm vai pro D760. LYNX só torneia
- [Ponta tracejada no fundo de furo = broca, não cone funcional](feedback_drill_point_vs_cone.md) — símbolo padrão de fundo de furo, não assumir assento cônico sem cota de ângulo explícita

## Usuario
- Nome: Alexandre | Idioma: **SEMPRE Portugues Brasil** (regra explicita)
- Empresa: Malelo / Nome fantasia: **LASEC** | CNPJ: 07047619000109
- CNAE: 2543800 (usinagem CNC) | Simples Nacional | ERP: minipcp.com.br

## Arquivos de Memoria (LER conforme necessidade)
| Arquivo | Conteudo | Quando Ler |
|---------|----------|------------|
| `financeiro.md` | Financeiro: 325 txs, categorias, parser PicPay | Assunto financeiro |
| `regras_usinagem.md` | Regras Alexandre, sequencias, specs improdutivo | SEMPRE em orcamento |
| `maquinas_specs.md` | **CUSTO + specs (espelho da planilha-fonte)** — LYNX/GL280/D760/legado | **SEMPRE ao definir maquina/taxa/tempo** |
| `pos_processador_regras.md` | Regras pos SolidCAM, vmid | Ao editar pos-processador |
| `parametros_corte.md` | Vc/RPM/avanco validados | Ao definir dados de corte |
| `fluxo_trabalho.md` | Como trabalhar, retroalimentar | SEMPRE no inicio |
| `orcamentos_estado.md` | Orcamentos ativos, proximo numero | SEMPRE no inicio |
| `onedrive_dados.md` | Taxas maquina reais | Ao calcular custos |
| `roteiro_as_built.md` | Orcar com tempos reais de producao | Ao receber apontamento |
| `feedback_metodologia_orcamento_completa.md` | **CRITICO:** pegada completa BD+custo+GRV | SEMPRE em orcamento |
| `feedback_checkpoint_retomada.md` | Correcoes sobrevivem perda de contexto | Ao retomar sessao |
| `projeto_repos_github.md` | 3 repos GitHub, branches, paths | Ao sincronizar |
| `projeto_backup_infra.md` | VM Oracle, 3 destinos backup, 6 destinos pos | Ao sincronizar |
| `projeto_taxas_maquina_2026.md` | Taxas custo interno vs GRV detalhado | Ao calcular custos |
| `projeto_financeiro_organizador.md` | Stack organizador financeiro | Sessao financeira |
| `projeto_cronoanalise_impaktto.md` | Stack + estado IMPAKTTO | Sessao IMPAKTTO |

## PROTOCOLO INICIO DE SESSAO (OBRIGATORIO)
1. Ler `fluxo_trabalho.md` — saber como proceder
2. Ler `orcamentos_estado.md` — saber o que esta ativo
3. Ler `CHECKPOINT.md` do orcamento em questao
4. Ler `regras_usinagem.md` — NAO repetir erros
5. Informar usuario: "Li memoria, sei que estamos em [estado]"

## PROTOCOLO RETROALIMENTACAO (OBRIGATORIO)
- Correcao do Alexandre → salvar em `regras_usinagem.md` IMEDIATAMENTE
- Parametro validado → salvar em `parametros_corte.md`
- Mudanca de estado → atualizar `orcamentos_estado.md` + `CHECKPOINT.md`
- NUNCA esperar o fim da sessao para salvar — pode perder contexto

## Projeto Principal: ORCAMENTISTA.html
- Arquivo: `C:\Users\lasec\Documents\orcamento-lasec-hmtl\ORCAMENTISTA.html`
- App HTML single-file, sem build, sem dependencias
- Fluxo: 6 documentos (PROCESSO → CUSTO → PRECO_NFE → VIABILIDADE → BREAK_EVEN → PROPOSTA)

## Agente Claude Code
- **Ponto de entrada único: `/orcamento-lasec-modular`** — dizer "vamos fazer um orçamento" já aciona; ele roteia sozinho (Passo 0) entre peça nova vs as-built, sem precisar escolher comando. PROCESSO sempre via [`/montar-processo-fabricacao`](projeto_skill_montar_processo_fabricacao.md) (checklist BD CNC+MINIPCP+tempo com fórmula+gate visível no HTML). `/fechar-as-built` = mesma Rota B, cópia fina, ainda funciona se chamado por nome. Outros: `/orcamento-lasec` (fallback histórico), `/buscar-programa`, `/calcular-orcamento`, `/consultoria-impaktto`
- Regras: `C:\Users\lasec\.claude\rules\lasec-orcamentos.md`
- Templates: `D:\IA MALELO\templates\orcamento-lasec-hmtl\`
- Dados: `D:\IA MALELO\banco_dados\` (indice-mestre em `INDICE_BANCO_DADOS_LASEC.md` — CONSULTAR ao iniciar orçamento). Ferramental: lookup rápido em `D:\IA MALELO\bd_cnc\ferramentas\*.json` (JSON categorizado) antes do MINIPCP.csv. Specs técnicas de máquina: `D:\IA MALELO\agente\knowledge\maquinas-lasec.md`
- ANO ATUAL: 2026 | Proximo orcamento: **050/2026** (047 e 048 SPEEDMAQ fechados as-built; 049 ENGEPLAST fechado e enviado ao cliente 27/07/2026)
- **CEREBRO UNICO:** `C:\Users\lasec\.claude\commands\orcamento-lasec.md` (NAO usar agents/)

## REGRAS RAPIDAS DE USINAGEM (detalhes completos em regras_usinagem.md)
Sem broca de centro | FURAR→CHANFRAR→ROSCAR | Furo axial sem eixo C | Setup min 1,0h (4o eixo 2,0h) | Templates: COPIAR nunca criar do zero | Proposta: sem dados confidenciais | CIF 25% sobre (Fixos+MOD) | Lote <10: sempre incluir custos fixos
- `feedback_versionamento_pos.md` — atualizar CHECKPOINT.md a cada Write/Edit em GPP/vmid/MAC
- **Regras de orçamento: FONTE ÚNICA em `.claude/rules/lasec-orcamentos.md`** (NÃO duplicar)

## AVISO PowerShell
- NUNCA usar `-replace` inline em bash com `$_`
- SEMPRE usar arquivos .ps1 com `[System.IO.File]::ReadAllText`

## Contato LASEC (atualizado 17/03/2026)
- Tel: **(11) 3936-5041 (WhatsApp)** — UNICO ativo | 3935-1271 DESATIVADO
- E-mail: **orcamento@lasec.com.br** (NAO contato@) | Detalhes: `contato_lasec.md`

## Preferencias do Usuario
- Falar sempre em portugues Brasil
- SEMPRE incluir link file:// clicavel apos criar/atualizar HTML (`file:///D:/IA%20MALELO/orcamentos/...`)

## REGRA: Sync Repo Automatico
- SEMPRE commit+push ao final de sessoes com mudancas significativas, NAO esperar pedido
- Detalhes: `feedback_sync_repo.md`

## Geracao de PDF (CRITICO)
- Proposta comercial DEVE caber em **1 unica pagina**
- NAO usar `--print-to-pdf` direto do Edge (ignora CSS scale/zoom)
- SEMPRE usar script CDP: `D:\IA MALELO\templates\gerar_pdf_proposta.py` (scale 0.78)
- Detalhes: `feedback_pdf_1pagina.md`
