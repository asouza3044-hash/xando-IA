# Memoria LASEC — INDICE PRINCIPAL
# Este arquivo e carregado automaticamente em TODA sessao
# Manter enxuto (<150 linhas) — detalhes nos arquivos tematicos

## Usuario
- Nome: Alexandre | Idioma: **SEMPRE Portugues Brasil** (regra explicita)
- Empresa: Malelo / Nome fantasia: **LASEC** | CNPJ: 07047619000109
- CNAE: 2543800 (usinagem CNC) | Simples Nacional | ERP: minipcp.com.br

## Arquivos de Memoria (LER conforme necessidade)
| Arquivo | Conteudo | Quando Ler |
|---------|----------|------------|
| `financeiro.md` | Contas, saldos, cartoes, metas financeiras | Em qualquer assunto financeiro |
| `regras_usinagem.md` | Regras do Alexandre, sequencias, specs maquinas improdutivo | SEMPRE em orcamento |
| `maquinas_specs.md` | Specs completas LYNX, D760, GL280, Centur | Ao definir maquina/tempos |
| `parametros_corte.md` | Vc/RPM/avanco validados por material | Ao definir dados de corte |
| `fluxo_trabalho.md` | Como trabalhar, retroalimentar, evitar perda | SEMPRE no inicio |
| `orcamentos_estado.md` | Orcamentos ativos, proximo numero | SEMPRE no inicio |
| `onedrive_dados.md` | Taxas maquina reais do OneDrive | Ao calcular custos |

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
- Comandos: `/orcamento-lasec`, `/buscar-programa`, `/calcular-orcamento`
- Regras: `C:\Users\lasec\.claude\rules\lasec-orcamentos.md`
- Templates: `D:\IA MALELO\templates\orcamento-lasec-hmtl\`
- Dados: `D:\IA MALELO\banco_dados\` (23 arquivos, indice em INDICE_BANCO_DADOS_LASEC.md)
- ANO ATUAL: 2026 | Proximo orcamento: 023/2026

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
- `template_multipecas.md` — Layout aprovado para orcamentos com multiplos modelos similares
- `template_proposta_1pagina.md` — Proposta 022/SPEEDMAQ: layout aprovado, referencia para futuras propostas

## AVISO PowerShell
- NUNCA usar `-replace` inline em bash com `$_`
- SEMPRE usar arquivos .ps1 com `[System.IO.File]::ReadAllText`

## VM Oracle Cloud (backup)
- IP: 137.131.140.7 | User: ubuntu
- Chave SSH: `D:\IA MALELO\ssh-key-2026-02-04.key`
- Backup em: `/home/ubuntu/backup_lasec/`

## Repositorio GitHub
- Repo: `C:\Users\lasec\OneDrive\Documentos\GitHub\xando-IA`
- Branch: `lasec-orcamentos-local` → push para `origin/lasec-orcamentos`
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

## Projeto: Organizador Financeiro — `/financeiro`
- **Criado:** 03-04/03/2026 | **Evoluido:** 09/03/2026
- **Local:** `D:\IA MALELO\contas-pagar\`
- **Stack:** Python FastAPI + SQLite + HTML/JS Bootstrap + Chart.js
- **Iniciar tudo:** `D:\IA MALELO\contas-pagar\iniciar_tudo.bat` (servidor + telegram)
- **Perifericos:** Servidor web :8000 | Bot Telegram (OCR recibos) | WhatsApp (alertas 8h)
- **Memoria:** `memory/financeiro.md` (contas, lembretes, categorias, pessoas, regras)
- **Backups:** Documents, Desktop, OneDrive, GitHub (repo xando-IA), VM Oracle
- **305 transacoes** importadas (Set/2025-Mar/2026), 20+ categorias, 7 lembretes

## Contato LASEC (atualizado 17/03/2026)
- Tel: **(11) 3936-5041 (WhatsApp)** — UNICO numero ativo
- **3935-1271 DESATIVADO** — NUNCA usar
- E-mail: **orcamento@lasec.com.br** (NAO contato@)
- Detalhes: `contato_lasec.md`

## Preferencias do Usuario
- Falar sempre em portugues Brasil
- SEMPRE incluir link file:// clicavel apos criar/atualizar HTML
  - Formato: `file:///D:/IA%20MALELO/orcamentos/...`

## Geracao de PDF (CRITICO)
- Proposta comercial DEVE caber em **1 unica pagina**
- NAO usar `--print-to-pdf` direto do Edge (ignora CSS scale/zoom)
- SEMPRE usar script CDP: `D:\IA MALELO\templates\gerar_pdf_proposta.py` (scale 0.78)
- Detalhes: `feedback_pdf_1pagina.md`
