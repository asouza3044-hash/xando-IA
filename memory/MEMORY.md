# Memoria LASEC — INDICE PRINCIPAL
# Este arquivo e carregado automaticamente em TODA sessao
# Manter enxuto (<150 linhas) — detalhes nos arquivos tematicos
# Feedbacks
- [**CRÍTICO $$$** Preço apresentado = preço gerado](feedback_preco_apresentado_vs_gerado.md) — Se apresentei markup X no chat, HTMLs DEVEM ter markup X. Incidente 033/2026: gerei ×1,12 em vez de ×1,5147 (R$654 menor). DINHEIRO — nunca mais
- [Categorizacao](feedback_categorizacao.md) — duvida quando nao souber, aprender ao resolver, dedup maximo
- [Checkpoint por evento](feedback_checkpoint_95.md) — checkpoint OBRIGATORIO apos cada HTML/aprovacao/correcao/sync, NAO por % tokens (impossivel medir)
- [Output conciso](feedback_output_conciso.md) — max 3 bullets, só tabela/lista, sem texto, max 800 tokens
- [Proposta consolidada](feedback_proposta_consolidada.md) — múltiplas peças (qualquer cliente) → PERGUNTAR: proposta única ou individuais?
- [RECORRENTE: não pular ordens](feedback_processo_gate_batch.md) — **CRÍTICO**: agente tem padrão de ignorar gates/sequências. NUNCA otimizar pulando etapas do Alexandre
- [Precificação MICROGEAR](feedback_precificacao_microgear.md) — benchmarks reais do dump (eixo R$22-562, flange R$28-73, pinhão/coroa R$25-65). Subir +15% qdo fórmula sair conservadora
- [RFS Telecom — falida](projeto_rfs_telecom.md) — IGNORAR em repasse de custo (faliu). Mas USAR programas CNC dela como referência (joias técnicas). Top ativos: HASTE, MICROGEAR, SOHIPREN, INOVA, LUBRISYSTEM
- [Máquinas LASEC — ativas vs legado](projeto_maquinas_legado.md) — SÓ 4 ativas (GL280, LYNX, D760 3/4-eixos). Demais vendidas mas programas CNC = legado/referência
- [Reusinagem em peça pré-usinada](feedback_orcamento_acabamento_peca_fornecida.md) — modalidade: cliente fornece peça. Estratégia 3-etapas (torno barato+Doosan furos) -21%. ❌ NUNCA cláusula refugo na proposta. Markup default ×1,20. 034/2026 MICROGEAR CUBO
- [**Tempos fixos GL280 MICROGEAR calibrados**](feedback_tempos_fixos_gl280_microgear.md) — Prog GL280: **3,0h** (NÃO 5,5h). Setup GL280: **1,0h** (NÃO 1,5h). Lição 034/2026: estimativa antiga gerou preço recusado pelo cliente
- [**MICROGEAR MP sempre fornecida**](feedback_microgear_mp_fornecida.md) — Cliente envia blank pré-cortado. Custo material = ZERO em TODOS orçamentos MICROGEAR. Confirmado 01/05/2026
- [Não inferir bore de programas similares](feedback_nao_inferir_bore_de_programas.md) — Programas similares = referência de dados de corte APENAS. Geometria vem SÓ do desenho. Incidente 035/2026 pinhão cônico
- [**ANTI-ALUCINAÇÃO** Família ≠ tempo igual](feedback_familia_nao_e_tempo.md) — NUNCA copiar tempo de uma peça para outra mesmo família/cliente. Geometria define ciclo. Incidente 035→036 (peças "irmãs" totalmente diferentes geometricamente)
- [SEMPRE usar agente modular](feedback_agente_modular.md) — `/orcamento-lasec` → carregar `orcamento-lasec-modular.md` (7KB), NÃO o cheio (17KB). Economiza tokens.
- [Repo oficial xando-IA](feedback_caminho_repo_oficial.md) — `C:\Users\lasec\Documents\GitHub\xando-IA\` (NÃO OneDrive). GitHub = nuvem oficial. Branch local `lasec-orcamentos-local` → push `lasec-orcamentos`
- [Pinhão cônico compacto MICROGEAR — tempo](feedback_pinhao_conico_microgear_tempo.md) — Família 1.34.03.6xx faz em ~6 min/pç (10-12 pç/h). NÃO inflar com ×1,4. Benchmark Alexandre 02/05/2026.
- [LYNX 220LM RPM limite S4500](feedback_lynx_rpm_limite_4500.md) — NÃO S3000 (conservador). Confirma tempo real principalmente em bore Ø pequeno. Posso usinar peça virtualmente pelo G-code.

## Usuario
- Nome: Alexandre | Idioma: **SEMPRE Portugues Brasil** (regra explicita)
- Empresa: Malelo / Nome fantasia: **LASEC** | CNPJ: 07047619000109
- CNAE: 2543800 (usinagem CNC) | Simples Nacional | ERP: minipcp.com.br

## Arquivos de Memoria (LER conforme necessidade)
| Arquivo | Conteudo | Quando Ler |
|---------|----------|------------|
| `financeiro.md` | CEREBRO UNICO financeiro: 325 txs, 28 categorias, parser PicPay, regras categorizacao, pessoas conhecidas | Em qualquer assunto financeiro |
| `regras_usinagem.md` | Regras do Alexandre, sequencias, specs maquinas improdutivo | SEMPRE em orcamento |
| `maquinas_specs.md` | Specs completas LYNX, D760, GL280, Centur | Ao definir maquina/tempos |
| `pos_processador_regras.md` | Regras construcao pos SolidCAM, erros passados, estrutura vmid | Ao construir/editar pos-processador |
| `parametros_corte.md` | Vc/RPM/avanco validados por material | Ao definir dados de corte |
| `fluxo_trabalho.md` | Como trabalhar, retroalimentar, evitar perda | SEMPRE no inicio |
| `orcamentos_estado.md` | Orcamentos ativos, proximo numero | SEMPRE no inicio |
| `onedrive_dados.md` | Taxas maquina reais do OneDrive | Ao calcular custos |
| `roteiro_as_built.md` | Roteiro completo para orcar com tempos reais de producao | Ao receber apontamento de producao |
| `feedback_metodologia_orcamento_completa.md` | **CRITICO:** A pegada completa — BD progs + BD codigos + custo interno + GRV + limite desconto | **SEMPRE em QUALQUER orcamento** |
| `feedback_checkpoint_retomada.md` | Correcoes do Alexandre DEVEM sobreviver perda de contexto | Ao retomar sessao |

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
- Comandos: `/orcamento-lasec`, `/buscar-programa`, `/calcular-orcamento`, `/consultoria-impaktto`
- Regras: `C:\Users\lasec\.claude\rules\lasec-orcamentos.md`
- Templates: `D:\IA MALELO\templates\orcamento-lasec-hmtl\`
- Dados: `D:\IA MALELO\banco_dados\` (23 arquivos, indice em INDICE_BANCO_DADOS_LASEC.md)
- ANO ATUAL: 2026 | Proximo orcamento: 027/2026
- **CEREBRO UNICO:** `C:\Users\lasec\.claude\commands\orcamento-lasec.md` (NAO usar agents/)

## Projeto: Cronoanálise IMPAKTTO — `/consultoria-impaktto`
- **Raiz:** `D:\IA MALELO\consultoria\IMPAKTTO\`
- **Entregável:** `entregaveis/CRONOANALISE_IMPAKTTO_v2.html` (dashboard interativo diretoria)
- **Stack:** Python (openpyxl, csv) → CRONOANALISE.xlsx → HTML+Chart.js single-file
- **Estado:** 40 OPs | 2.340 pç | 81,1% atendimento | 21 paradas | 01/04–13/05/2026
- **Slash:** `/consultoria-impaktto` — agente modular (docs/ + state/ + tasks/)
- **Regra crítica:** "cj" = conjunto, multiplicar QTD ×2 | "matro" → "MATÃO"

## REGRAS RAPIDAS (detalhes em regras_usinagem.md)
1. Sem broca de centro — MD alto centrante direto
2. FURAR → CHANFRAR → ROSCAR (nunca inverter)
3. Furo axial = spindle direto (sem eixo C)
4. Setup minimo 1,0h (centro 4o eixo: 2,0h)
5. Improdutivo: calcular com specs reais (NAO chutar)
6. Manipulacao operador: separar do improdutivo maquina
7. HSS em Al: Vc 29-30 (broca), Vc 9-10 (macho)
8. Templates: COPIAR e editar, NUNCA criar do zero
9. Proposta: NUNCA incluir dados confidenciais (hora-maquina, tempo, markup)
10. Apos editar HTML: SEMPRE salvar + incluir link file://
11. 4o eixo: +25% sobre taxa 3 eixos
12. Custo interno (planilha) ≠ preco venda (GRV) — NUNCA confundir
13. CIF: 25% sobre (Setup+MOD) — era 58%, corrigido 08/03/2026 (dupla contagem)
14. Lote <10: SEMPRE incluir custos fixos (programacao, setup entre modelos, inspecao 1a peca)
- `feedback_versionamento_pos.md` — OBRIGATORIO: atualizar CHECKPOINT.md a cada Write/Edit em GPP/vmid/MAC
- **Regras de orçamento: FONTE ÚNICA em `.claude/rules/lasec-orcamentos.md`** (NÃO duplicar)

## AVISO PowerShell
- NUNCA usar `-replace` inline em bash com `$_`
- SEMPRE usar arquivos .ps1 com `[System.IO.File]::ReadAllText`

## VM Oracle Cloud (backup)
- IP: 137.131.140.7 | User: ubuntu
- Chave SSH: `D:\IA MALELO\ssh-key-2026-02-04.key`
- Backup em: `/home/ubuntu/backup_lasec/`

## Repositorios GitHub (SINCRONIZAR TODOS)
1. **xando-IA** — memorias, regras, agentes, banco dados
   - Local: `C:\Users\lasec\OneDrive\Documentos\GitHub\xando-IA`
   - Branch: `lasec-orcamentos-local` → push `origin/lasec-orcamentos`
2. **orcamento-lasec-hmtl** — HTMLs propostas, templates, script PDF
   - Local: `C:\Users\lasec\Documents\orcamento-lasec-hmtl`
   - Branch: `main` → push `origin/main`
3. **pos-processadores-lasec** — pos-processadores SolidCAM, vmid, docs, aprendizados
   - Notebook (lasec): `C:\Users\lasec\Documents\pos-processadores-lasec`
   - Desktop Engenharia (alexandresouza): `C:\Users\alexandresouza\pos-processadores-lasec`
   - Branch: `main` → push `origin/main`
- Git user: "Alexandre Souza - LASEC" <lasec@malelo.com.br>

## Taxas de Maquina LASEC 2026 (planilha corrigida IPCA+Dissidio)
- **Custo interno** (para calculo): LYNX R$ 96,35/h | D760 3-eixos R$ 121,49/h | D760 4-eixos R$ 151,86/h (+25%)
- **GRV mercado SP** (para validar preco): Torno CNC R$ 156,28/h | Centro 3-eixos R$ 189,78/h | Centro 4-eixos ~R$ 237,23/h
- Setup = 1,5x producao | Min: torno 1,0h, centro 3-eixos 1,0h, centro 4-eixos 2,0h
- **ATENCAO:** Valores R$ 121/R$ 260 do OneDrive eram PRECOS DE VENDA, NAO custo interno
- Fonte: `custos_ferramentaria lasec.xls` aba "Custos 2026" | Detalhes em `onedrive_dados.md`

## REGRA: Backup em 3 Destinos (sincronizar apos mudancas importantes)
1. **Local:** `D:\IA MALELO\` (fonte de verdade)
2. **GitHub:** `xando-IA` branch `lasec-orcamentos` (versionado, commit + push)
3. **VM Oracle:** `ubuntu@137.131.140.7:/home/ubuntu/backup_lasec/` (via SCP)
- Sincronizar apos: novo orcamento, correcoes grandes, novos aprendizados
- Chave SSH: `D:\IA MALELO\ssh-key-2026-02-04.key`

## REGRA: Sync Pos-Processadores — AUTOMATICO (OBRIGATORIO)
- **6 destinos** — TODOS sincronizados AUTOMATICAMENTE ao criar/atualizar:
  1. `E:\pos processador\PÓS FANUC\[MAQUINA]\` (teste SolidCAM)
  2. `E:\Users\Public\Documents\SolidCAM\SolidCAM2020\Gpptool\` (SolidCAM le daqui)
  3. `D:\Material SolidCAM\pos processador\` (fonte local)
  4. `C:\Users\lasec\Documents\pos-processadores-lasec\` (repo local)
  5. **GitHub:** `asouza3044-hash/pos-processadores-lasec` (commit + push)
  6. **VM Oracle:** `/home/ubuntu/backup_lasec/pos-processadores-lasec/` (git pull via SSH)
- **FAZER TUDO ANTES de avisar "pronto, pode testar"** — NAO esperar pedido
- Inclui: CHECKPOINT.md + memoria + docs/regras-vmid.md
- Detalhes: `feedback_sync_automatico_pos.md`

## Projeto: Organizador Financeiro — `/financeiro`
- **Producao:** http://137.131.140.7:8000 (VM Oracle — FONTE DE VERDADE)
- **Local:** `D:\IA MALELO\contas-pagar\` (dev, sync pra VM)
- **Stack:** Python FastAPI + SQLite + HTML/JS Bootstrap + Chart.js
- **Memoria:** `memory/financeiro.md` — CEREBRO UNICO (ler SEMPRE em sessao financeira)
- **325 transacoes** (Set/2025-Mar/2026) | 28 categorias | Descricoes+categorias reprocessadas 28/03
- **Marcar como pago:** endpoint criado | Backup DB: cron diario VM | Parser v2 validado
- **REGRA:** TODA alteracao de codigo/BD → sync VM → restart service → so entao "pronto"

## Contato LASEC (atualizado 17/03/2026)
- Tel: **(11) 3936-5041 (WhatsApp)** — UNICO numero ativo
- **3935-1271 DESATIVADO** — NUNCA usar
- E-mail: **orcamento@lasec.com.br** (NAO contato@)
- Detalhes: `contato_lasec.md`

## Preferencias do Usuario
- Falar sempre em portugues Brasil
- SEMPRE incluir link file:// clicavel apos criar/atualizar HTML
  - Formato: `file:///D:/IA%20MALELO/orcamentos/...`

## REGRA: Sync Repo Automatico
- SEMPRE commit+push ao final de sessoes com mudancas significativas
- NAO esperar o usuario pedir — fazer proativamente
- Detalhes: `feedback_sync_repo.md`

## Geracao de PDF (CRITICO)
- Proposta comercial DEVE caber em **1 unica pagina**
- NAO usar `--print-to-pdf` direto do Edge (ignora CSS scale/zoom)
- SEMPRE usar script CDP: `D:\IA MALELO\templates\gerar_pdf_proposta.py` (scale 0.78)
- Detalhes: `feedback_pdf_1pagina.md`
