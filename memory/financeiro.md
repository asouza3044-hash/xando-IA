# Memoria Financeira — Alexandre / LASEC
# CEREBRO UNICO — fonte de verdade para TUDO do financeiro
# Atualizada automaticamente pelo agente /financeiro
# Ultima atualizacao: 2026-03-30

---

## PROTOCOLO (OBRIGATORIO a cada sessao)
1. LER esta memoria INTEIRA
2. Verificar servidor VM: `curl -s http://137.131.140.7:8000/`
3. Verificar alertas: `GET /api/lembretes/alertas`
4. Mostrar resumo mes: `GET /api/analise/resumo-completo?ano=YYYY&mes=M`
5. Informar: "Li memoria, servidor [OK/down], [N] alertas, saldo mes R$ X"

## PROTOCOLO RETROALIMENTACAO (OBRIGATORIO)
- Correcao do Alexandre → salvar AQUI imediatamente
- Novo extrato importado → atualizar tabela de extratos
- Novo aprendizado/bug → adicionar na secao correspondente
- NUNCA esperar fim de sessao — salvar a cada mudanca

## PROTOCOLO SYNC (OBRIGATORIO)
- **VM Oracle e a PRODUCAO** — toda alteracao de codigo/BD vai pra la
- Sync arquivos: `scp -i "D:\IA MALELO\ssh-key-2026-02-04.key" [arquivo] ubuntu@137.131.140.7:/home/ubuntu/backup_lasec/contas-pagar/backend/`
- Reiniciar servico: `ssh ... "sudo systemctl restart financeiro"`
- Sync DB de volta: `scp ... ubuntu@VM:/path/contas.db local/contas.db` (VM e fonte de verdade)
- **NUNCA dizer "pronto" sem ter sincronizado a VM**

---

## Infraestrutura

### Producao (VM Oracle)
- **URL:** http://137.131.140.7:8000
- **IP:** 137.131.140.7 | User: ubuntu
- **Chave SSH:** `D:\IA MALELO\ssh-key-2026-02-04.key`
- **Servicos systemd:** `financeiro.service` + `telegram-bot.service` (habilitados no boot)
- **Cron WhatsApp:** 11:00 UTC = 8:00 BRT
- **Cron Backup DB:** 03:00 UTC = meia-noite BRT (diario, script `/home/ubuntu/backup_lasec/backup_db.sh`)
- **Backups em:** `/home/ubuntu/backup_lasec/backups/contas_YYYY-MM-DD.db` (retencao 30 dias)
- **Python:** 3.10 | Pacotes: fastapi, uvicorn, sqlalchemy, pdfplumber, python-telegram-bot
- **EasyOCR:** NAO funciona (956MB RAM insuficiente) — OCR so local
- **Firewall UFW:** ativo — porta 8000 acessivel externamente
- **REGRA:** NUNCA usar nohup manual — APENAS systemd (`sudo systemctl restart financeiro`)

### Local (Windows)
- **Pasta:** `D:\IA MALELO\contas-pagar\`
- **BD:** `D:\IA MALELO\contas-pagar\backend\contas.db`
- **Iniciar tudo:** `D:\IA MALELO\contas-pagar\iniciar_tudo.bat`
- **Tarefa agendada:** `Financeiro_Alertas_WhatsApp` (daily 8:00AM)
- **Script alertas:** `D:\IA MALELO\contas-pagar\enviar_alertas.bat`

### Stack
- Backend: Python FastAPI + SQLite + SQLAlchemy (~1.240 linhas main.py)
- Frontend: HTML + Bootstrap 5 + Chart.js (~766 + 1.490 linhas)
- Parsers: OFX, CSV, XLSX, PDF PicPay/Nubank (~840 linhas)
- Bot Telegram: OCR recibos (~425 linhas)
- WhatsApp: CallMeBot (alertas automaticos)

---

## Banco de Dados — Estado Atual (30/03/2026)

| Tabela | Registros | Status |
|--------|-----------|--------|
| **transacoes** | **33** | 4 contas fixas (Intermedica, SABESP, ENEL, XP) + 29 Nubank cartao credito |
| **lembretes** | **7** | ATIVO — todos reativados |
| **contas_bancarias** | **1** (PicPay) | ATIVO |
| **cartoes** | **1** | PARCIAL — sem lancamentos |
| **contas** | **7** | ATIVO — todas vinculadas a lembretes (despesas da casa) |
| **pagamentos** | **4** | Intermedica, SABESP, ENEL, XP — pagos 30/03/2026 |
| **receitas** | **2** | ATIVO — Salario MALELO + Andre Luiz David |
| recebimentos | 0 | MANTER — usar para rastrear recebimentos |
| lancamentos_cartao | 0 | MANTER — usar quando importar Nubank/XP |
| orcamentos (limites) | 0 | MANTER — usar para definir limites por categoria |
| **BACKUP** | | `contas_backup_antes_limpeza_20260330.db` (local + VM) — 325 txs historicas |

### Endpoints Novos (28/03/2026)
- `POST /api/lembretes/{lid}/pago` — marca lembrete como pago no mes
- `DELETE /api/lembretes/{lid}/pago` — desfaz marcacao do mes
- `POST /api/categorias/aprender` — ensina nova regra (keyword + categoria)
- `GET /api/categorias/aprendidas` — lista regras aprendidas
- `GET /api/transacoes/duvidas` — lista txs com categoria "duvida"

### Sistema de Aprendizado de Categorias
- Transacoes sem regra recebem categoria **"duvida"** (nao "outros")
- `POST /api/categorias/aprender` com `{descricao, categoria, keyword(opcional)}`
  - Salva regra em `regras_aprendidas.json`
  - Recategoriza automaticamente txs existentes com duvida que matcham
- Regras aprendidas sao carregadas APOS regras fixas no `_REGRAS_CATEGORIA`
- Normalizacao de acentos: `_normalizar()` remove acentos para comparacao

### Dedup na Importacao
- Preview (`POST /api/importar-extrato`) marca txs duplicadas (`duplicada: true`)
- Confirmar (`POST /api/importar-extrato/confirmar`) PULA duplicatas automaticamente
- Chave de dedup: `(data, abs(valor), tipo)` — checada contra BD inteiro
- Dedup intra-lote tambem (evita duplicar dentro do mesmo extrato)

---

## Contas Bancarias
| Banco | Tipo | Agencia | Conta | Obs |
|-------|------|---------|-------|-----|
| PicPay | Digital | 0001 | 90201197-9 | Conta principal, CPF 162.971.088-11 |

## Cartoes de Credito
| Cartao | Limite | Fechamento | Vencimento | Obs |
|--------|--------|------------|------------|-----|
| Nubank | ? | ? | dia 2 | Fatura via NU PAGAMENTOS |
| XP | ? | ? | dia 15 | Fatura BANCO XP S/A |

## Lembretes Cadastrados (contas recorrentes)
| ID | Conta | Valor | Dia Venc | Categoria |
|----|-------|-------|----------|-----------|
| 1 | ENEL - Energia | R$ 233,61 | 16 | moradia_energia |
| 2 | SABESP - Agua | R$ 81,24 | 27 | moradia_agua | (agua R$40,42 + esgoto R$40,42 + TRCF R$0,40) |
| 3 | Claro - Internet | R$ 150,00 | 15 | moradia_telecom |
| 4 | Intermedica - Saude | R$ 1.640,93 | 30 | saude | (base R$2.051 com desconto, Hapvida/Notre Dame) |
| 5 | Cartao XP - Fatura | R$ 3.019,08 | 15 | financeiro |
| 7 | Nubank - Fatura | R$ 2.659,42 | 2 | financeiro |

## Receitas Fixas Identificadas
| Descricao | Valor Medio | Frequencia | Obs |
|-----------|-------------|------------|-----|
| Salario MALELO | R$ 2.700-3.500 | Mensal | "MALELO INDUSTRIA E COMERCIO FERRAMENTAS" |
| Andre Luiz David | R$ 3.000-6.400 | Irregular | Cliente (receita_cliente) |
| Emilia Andrade Paiva | R$ 4.000 | Irregular | Transferencia pessoal |
| Elizabete Barros O Souza | R$ 200-1.000 | Irregular | Transferencia pessoal |

---

## Extratos Importados
| Arquivo | Periodo | Transacoes | Obs |
|---------|---------|------------|-----|
| extrato-2025-09-10-2026-03-08.pdf | Set/2025 a 08/Mar/2026 | 302 | Descricoes REPROCESSADAS com parser v2 (28/03) |
| extrato-2026-02-25-2026-03-26.pdf | 25/Fev a 26/Mar/2026 | 22 novas | Parser v2 nativo, dedup aplicado |

### Resumo por Mes (BD atual — ZERADO 30/03/2026)
BD limpo. Alexandre vai enviar comprovantes para lancar certinho a partir de agora.
Historico Set/25-Mar/26 disponivel no backup `contas_backup_antes_limpeza_20260330.db`.

---

## Categorizacao — Regras e Aprendizados

### Estrutura das Regras (main.py `_REGRAS_CATEGORIA`)
- ~35 regras, checadas em ORDEM (primeiro match ganha)
- Funcao `_categorizar(desc)` faz `.lower()` e busca substring
- **ORDEM IMPORTA:** regras especificas ANTES das genericas

### Armadilhas de Substring (NUNCA REPETIR)
- **'merci'** dentro de 'co**merci**o' → FALSO POSITIVO. Removida a keyword 'merci'
- **'bar '** dentro de 'Barros', 'Barueri' → CUIDADO com espacos
- **'loja'** dentro de nomes proprios → pode dar falso positivo
- **Regra:** ao adicionar keyword curta (<5 chars), testar contra TODAS as descricoes antes

### Categorias Ativas (28 categorias)
alimentacao_restaurante, alimentacao_mercado, saude, moradia_energia,
moradia_agua, moradia_telecom, moradia, transporte_combustivel,
transporte_estacionamento, transporte_veiculo, transporte,
empresa_malelo, salario_malelo, receita_cliente, financeiro,
financeiro_cartao, impostos, servicos, beleza, vestuario, lazer,
transferencia_pessoal, transferencia_propria, outros, educacao

### Recategorizacao 28/03/2026
- **254 descricoes** corrigidas (parser v2 reprocessou extrato original)
- **204 categorias** corrigidas com regras melhoradas
- Removidas duplicatas nas regras (banco xp, pmsp apareciam 2x)
- Adicionados: mariana de oliveira, felipe gomes, portoseg, caixa loterias,
  cafeteria, padaria, celestino, oceano pescados, alevar comercial, autopass, etc.
- **"outros" restantes:** 56 despesas — sao compras em lojas sem regra especifica.
  Se Alexandre quiser categorizar, identificar padroes e adicionar regras.

---

## Parser PicPay — CORRIGIDO 27/03/2026, VALIDADO 28/03/2026

### O que era o bug
O PDF do PicPay tem tabela com colunas (Hora | Tipo | Origem/Destino | Pagamento | Valor).
O nome do destino aparece em linhas ANTES e DEPOIS da linha HH:MM.
O parser antigo juntava TUDO que vinha depois como continuacao, grudando transacoes.

### Como foi corrigido
Algoritmo de 3 passos:
1. **Classificar** cada linha (date/tx/dest/skip)
2. **Distribuir destinos** entre transacoes usando regra de lacunas:
   - 0 linhas entre 2 HH:MM: ambas tem destino inline
   - 1 linha: se anterior NAO tem inline → pos da anterior; se TEM → pre da proxima
   - 2+ linhas: 1a = pos da anterior, resto = pre da proxima
   - Mudanca de dia: boundary natural (pos/pre separados)
3. **Montar** descricao: pre + inline + pos

### Tipos reconhecidos
Compra realizada, Pix enviado/recebido, Pagamento realizado,
Debito automatico realizado, Pagamento agendado realizado,
Transferencia enviada/recebida, Deposito recebido,
Resgate/Aplicacao rendimento, Estorno, Cashback, Devolucao

### Filtros de linha
- Nome do usuario (1a linha PDF, repetido em cada pagina)
- Rodapes (documento emitido, CNPJ, 0800, dias uteis)
- Cabecalhos (CPF, agencia, hora tipo, periodo)
- Periodo ("25 de fevereiro de 2026 a...")
- Numeracao de pagina ("1 de 6")

---

## Pessoas Conhecidas (para categorizar transferencias)
| Nome | Categoria | Tipo |
|------|-----------|------|
| JUCELI LORENA DE SOUZA | transferencia_pessoal | despesa |
| VALDIR DA SILVA | transferencia_pessoal | despesa |
| EMILIA ANDRADE PAIVA | transferencia_pessoal | despesa |
| ELIZABETE BARROS O SOUZA | transferencia_pessoal | receita e despesa |
| ANDRE LUIZ DAVID | receita_cliente | receita |
| TANIA VITALINA DA CRUZ | transferencia_pessoal | despesa |
| DIEGO CARVALHO MALTA | transferencia_pessoal | despesa |
| NATALIA COSTA RIBEIRO | transferencia_pessoal | despesa |
| MARIANA DE OLIVEIRA SOUZA | transferencia_pessoal | despesa (novo 27/03) |
| FELIPE GOMES DA SILVA | transferencia_pessoal | receita |
| MARLENE GONCALVES SOUZA | outros | receita (parentesco?) |
| JOAO PEDRO DE OLIVEIRA SOUZA | outros | receita (parentesco?) |
| ENGEPLAST IND. DE EMBALAGENS | receita_cliente | receita |
| EDUARDO FERNANDES DA SILVA | outros | despesa |

---

## Regras do Alexandre
- Importar extratos automaticamente (OFX/CSV/XLSX/PDF)
- Categorizar transacoes automaticamente — reprocessar se necessario
- Intermedica: vence ultimo dia util do mes (dia 28 como referencia)
- Se fevereiro cair em fds, paga primeiro dia util de marco
- Muito desorganizado com contas — precisa de lembretes fortes
- Prefere automacao maxima: foto recibo → bot Telegram → lanca
- **VM e producao** — TODA alteracao de codigo/BD sincroniza pra la
- **Memoria sempre em dia** — nunca perder aprendizado entre sessoes
- **Manter TODAS as tabelas** — usar progressivamente (decisao 28/03)
- **Auth: aberto** por enquanto ate acabar todas as funcionalidades
- **PicPay primeiro** — acertar tudo antes de importar Nubank/XP
- **Dedup MAXIMO** — nunca duplicar lancamentos ao importar extrato
- **Categorizar ANTES de lancar** — mostrar preview com categorias
- **Categoria "duvida"** — quando nao souber, marca duvida (NAO outros)
- **Aprender ao categorizar** — resolver duvida ensina regra pro futuro
- **Normalizar acentos** — comparar sem acentos (Natalia = Natália)

## Correcoes do Alexandre
| # | Erro | Correcao | Data |
|---|------|----------|------|
| 1 | Parser grudava transacoes ("Souza Drogasil") | Reescrito com logica de lacunas pre/pos | 27/03/2026 |
| 2 | Transacao R$3999 + R$4000 = par reembolso | Confirmar valores altos antes de categorizar | 09/03/2026 |
| 3 | pdfplumber faltava na VM | Instalado, import PDF funcionando | 27/03/2026 |
| 4 | Keyword 'merci' pegava 'comercio' | Removida — testar keywords curtas contra todo BD | 28/03/2026 |
| 5 | Categorias erradas em cascata (descricoes ruins → categorias ruins) | Reprocessar descricoes PRIMEIRO, depois recategorizar | 28/03/2026 |

---

## Erros Conhecidos / Cuidados
- **Alerta WhatsApp 8h:** precisa de Task Scheduler no Windows — NAO basta o app
- **Windows encoding:** sempre usar sys.stdout UTF-8 em scripts Python
- **Emojis no print():** crasham no Windows — usar io.TextIOWrapper
- **Servidor uvicorn local:** `start //b cmd /c` para processo separado
- **EasyOCR:** demora ~20s na primeira foto (carrega modelo). NAO funciona na VM
- **VM:** NUNCA nohup manual — APENAS `sudo systemctl restart financeiro`
- **Keyword substring:** NUNCA usar keywords curtas (<5 chars) sem testar. Ex: 'merci' em 'comercio'
- **Ordem de regras _REGRAS_CATEGORIA:** primeiro match ganha — especificas ANTES de genericas
- **Duplicata de regras:** banco xp/pmsp apareciam 2x — sempre checar antes de adicionar

---

## Pendencias / Melhorias (28/03/2026)
1. ~~**Marcar como pago**~~ — RESOLVIDO (endpoint POST/DELETE criado)
2. ~~**Reprocessar 302 txs antigas**~~ — RESOLVIDO (254 descricoes + 204 categorias corrigidas)
3. ~~**Backup automatico .db**~~ — RESOLVIDO (cron diario 3h UTC na VM)
4. ~~**"duvida" (44 txs)**~~ — RESOLVIDO: aba Duvidas no frontend + ensinar inline (30/03)
5. **Autenticacao** — API aberta (DEIXAR por enquanto — decisao Alexandre)
6. ~~**Importar Nubank/XP**~~ — PARCIAL: Nubank importado (29 txs), XP pago registrado
7. ~~**Tabelas vazias**~~ — RESOLVIDO: 7 contas + 2 receitas criadas
8. **Frontend: botao "marcar como pago"** — ja existe no sininho de alertas
9. ~~**Frontend: tela de duvidas**~~ — RESOLVIDO: aba Duvidas com botao Ensinar (30/03)
10. **Orcamentos (limites)** — definir limites por categoria
11. **Claro** — comprovante pendente (dia 15, R$150, vencida)
12. **Nubank pagamento** — fatura R$2.659,42 vence 02/04 — URGENTE

---

## Historico de Sessoes
- **2026-03-09:** Criado sistema completo. Importado extrato PicPay (302 tx). PDF parser, categorizador, lembretes, sininho, WhatsApp, Telegram bot OCR, aba Analise graficos.
- **2026-03-10:** Corrigido alerta WhatsApp 8h (Task Scheduler). Repo GitHub `financeiro-pessoal`.
- **2026-03-13:** VM Oracle: matei processo zumbi, systemd assumiu. Telegram bot: instalado python-telegram-bot + service. BD sincronizado. UFW ativado.
- **2026-03-27:** PARSER REESCRITO — corrigido bug que grudava transacoes PicPay. Importado extrato fev-mar (22 novas tx, total 325). Deletada tx com data 2028 errada. Instalado pdfplumber na VM. Sync completo (parser + BD + restart). Analise profunda do sistema: 53 endpoints, ~30% em uso real. Memoria reescrita como cerebro unico.
- **2026-03-28:** RECATEGORIZACAO COMPLETA — 254 descricoes reprocessadas com parser v2, 204 categorias corrigidas. Regras reescritas (removidas duplicatas, +15 regras, ordem corrigida). Endpoint marcar-como-pago (POST/DELETE). Backup auto DB (cron VM). Bug 'merci' corrigido.
- **2026-03-28 (cont):** SISTEMA DE APRENDIZADO — categoria "duvida" substitui "outros", endpoint /api/categorias/aprender ensina novas regras (salvas em regras_aprendidas.json), normalizacao de acentos na categorizacao. DEDUP reforçado na importacao (preview marca duplicatas, confirmar pula automaticamente). DESPESAS DA CASA: 7 contas criadas e vinculadas a lembretes, 2 receitas cadastradas (salario + cliente). Todos lembretes reativados. Sync completo VM.
- **2026-03-30:** RESET + RECONSTRUCAO — 325 txs apagadas, começo limpo. Comprovantes: Notre Dame R$1.640,93, SABESP R$81,24, ENEL R$233,61 (lembretes atualizados). XP pago R$3.019,08. Nubank CSV importado (29 txs, fatura R$2.659,42 vence 02/04). 17 regras aprendidas salvas. **FRONTEND MELHORADO:** aba Duvidas com botao "Ensinar" inline, busca por texto nos Lancamentos, 28 categorias completas com badges, badge contador de duvidas. Todas as 33 txs categorizadas (0 duvidas). Sync completo VM (DB + backend + frontend). Alexandre pediu VM autonoma — frontend agora cobre importacao+categorizacao+duvidas+alertas.
