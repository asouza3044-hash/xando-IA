# Memoria Financeira — Alexandre / LASEC
# Atualizada automaticamente pelo agente /financeiro
# Ultima atualizacao: 2026-03-09

## Status Geral
- Sistema: `D:\IA MALELO\contas-pagar\` (FastAPI + SQLite)
- Banco de dados: `D:\IA MALELO\contas-pagar\backend\contas.db`
- Servidor: http://localhost:8000
- Telegram Bot: `telegram_bot.py` (token: 8620...ULg)
- WhatsApp: CallMeBot ativo (phone: 5511991867504, apikey: 8001479)
- Alertas: todo dia 8h via WhatsApp + sininho no app
- **Tarefa agendada Windows:** `Financeiro_Alertas_WhatsApp` (daily 8:00AM) — IMPLEMENTADO 2026-03-10
- Script: `D:\IA MALELO\contas-pagar\enviar_alertas.bat` (verifica servidor + envia alertas)

## Contas Bancarias
| Banco | Tipo | Agencia | Conta | Observacao |
|-------|------|---------|-------|------------|
| PicPay | Digital | 0001 | 90201197-9 | Conta principal, CPF 162.971.088-11 |

## Cartoes de Credito
| Cartao | Limite | Fechamento | Vencimento | Obs |
|--------|--------|------------|------------|-----|
| Nubank | ? | ? | dia 2 | Fatura via NU PAGAMENTOS |
| XP | ? | ? | dia 15 | Fatura BANCO XP S/A |

## Lembretes Cadastrados (contas recorrentes)
| # | Conta | Valor | Dia Venc | Categoria | Aviso |
|---|-------|-------|----------|-----------|-------|
| 1 | ENEL - Energia | R$ 253,25 | 16 | moradia_energia | 5 dias |
| 2 | SABESP - Agua | R$ 83,18 | 27 | moradia_agua | 5 dias |
| 3 | Claro - Internet | R$ 150,00 | 15 | moradia_telecom | 3 dias |
| 4 | Intermedica - Saude | R$ 2.051,15 | 28 | saude | 5 dias (ultimo dia util) |
| 5 | Cartao XP - Fatura | R$ 3.019,08 | 15 | financeiro | 5 dias |
| 7 | Nubank - Fatura | R$ 1.155,83 | 2 | financeiro | 5 dias |

## Receitas Fixas Identificadas
| Descricao | Valor Medio | Frequencia | Obs |
|-----------|-------------|------------|-----|
| Salario MALELO (Pix) | R$ 2.700-3.500 | Mensal | Varia. "COMERCIO FERRAMENTAS SOCIEDADE LIMITADA" |
| Andre Luiz David | R$ 3.000-6.400 | Irregular | Cliente ou socio? |
| Emilia Andrade Paiva | R$ 4.000 | Irregular | Transferencia pessoal |

## Extratos Importados
| Arquivo | Periodo | Transacoes | Receitas | Despesas |
|---------|---------|------------|----------|----------|
| extrato-2025-09-10-2026-03-08.pdf | Set/2025 a Mar/2026 | 302 | R$ 67.750,30 | R$ 67.774,15 |

## Contas Importadas (faturas)
| Conta | Valor | Vencimento | Arquivo |
|-------|-------|------------|---------|
| SABESP fev/2026 | R$ 83,18 | 27/02/2026 | fatura-9110924938214.pdf |
| ENEL fev/2026 | R$ 253,25 | 16/03/2026 | Boleto_1773089623476.pdf |

## Categorias Configuradas (20+)
- saude, financeiro_cartao, compras_gerais, alimentacao_restaurante
- alimentacao_mercado, moradia_energia, moradia_agua, moradia_telecom
- impostos, transporte_combustivel, transporte_veiculo, transporte_estacionamento
- servicos, lazer, vestuario, salario_malelo, receita_cliente
- transferencia_pessoal, transferencia_propria, pagamentos_diversos

## Formato Extrato PicPay
- Sempre PDF, formato texto (nao tabela)
- Padrao: "DD de mes YYYY Saldo ao final do dia: R$ X"
- Transacoes: "HH:MM Tipo Descricao Com saldo [+-]R$ valor"
- Parser customizado: `_parse_pdf_picpay_nubank()` em parsers.py

## Regras do Alexandre
- Importar extratos automaticamente (OFX/CSV/XLSX/PDF)
- Categorizar transacoes automaticamente
- Intermedica: vence ultimo dia util do mes (dia 28 como referencia)
- Se fevereiro cair em fds, paga primeiro dia util de marco
- Muito desorganizado com contas — precisa de lembretes fortes
- Prefere automacao maxima: foto recibo → bot Telegram → lanca

## Pessoas Conhecidas (para categorizar transferencias)
- JUCELI LORENA DE SOUZA — pessoal
- VALDIR DA SILVA — pessoal
- EMILIA ANDRADE PAIVA — pessoal
- ELIZABETE BARROS O SOUZA — pessoal
- ANDRE LUIZ DAVID — cliente/socio
- TANIA VITALINA DA CRUZ — pessoal
- DIEGO CARVALHO MALTA — pessoal
- NATALIA COSTA RIBEIRO — pessoal

## Historico de Sessoes
- 2026-03-09: Criado sistema completo. Importado extrato PicPay (302 tx). Adicionado PDF parser, categorizador, lembretes, sininho, WhatsApp, Telegram bot com OCR, aba Analise com graficos.
- 2026-03-10: Corrigido alerta WhatsApp 8h — nao estava agendado no Windows. Criado tarefa `Financeiro_Alertas_WhatsApp` + script `enviar_alertas.bat`. Repo GitHub separado criado: `financeiro-pessoal`.
- 2026-03-13: CORRECAO GRANDE na VM Oracle. Processo zumbi (nohup manual de 10/03) ocupava porta 8000 impedindo systemd service. Systemd ficou em loop 34mil restarts. Matei processo, service assumiu. Telegram bot: faltava python-telegram-bot na VM, instalado + criado service systemd. Banco de dados sincronizado local→VM. Firewall UFW ativado (so SSH). EasyOCR NAO funciona na VM (956MB RAM insuficiente).

## Correcoes do Alexandre
- Parser PicPay as vezes gruda 2 transacoes numa linha so (ex: "Pix enviado Souza Drogasil1855" era Pix + compra separados)
- Transacao #5 (R$ 3999,02 despesa) + #4 (R$ 4000 receita reembolso) = par correto, saldo quase zero
- Quando aparecer valor alto (~4000) com descricao estranha, confirmar com Alexandre antes de categorizar

## Erros Conhecidos / Cuidados
- Alerta WhatsApp 8h: precisa de tarefa agendada no Windows (Task Scheduler) — NAO basta configurar no app, precisa do agendamento externo
- Windows encoding: sempre usar sys.stdout UTF-8 em scripts Python
- Emojis no print() crasham no Windows — usar io.TextIOWrapper
- Servidor uvicorn: `start //b cmd /c` para rodar como processo separado
- EasyOCR: demora ~20s na primeira foto (carrega modelo)
- VM Oracle: NUNCA iniciar uvicorn com nohup manual — usar APENAS systemd service (`sudo systemctl restart financeiro`)
- VM Oracle: EasyOCR nao roda (956MB RAM). OCR de recibos so funciona local (Windows)
- VM Oracle: Firewall UFW ativo — porta 8000 so acessivel localmente (cron/services OK, internet bloqueada)
- VM Oracle: Services habilitados no boot: `financeiro.service` + `telegram-bot.service`
- VM Oracle: Cron WhatsApp 11:00 UTC = 8:00 BRT (correto)
