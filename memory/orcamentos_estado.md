# Estado dos Orcamentos LASEC
# ATUALIZAR sempre que estado mudar
# Proximo numero: 050/2026

## REGRA: Toda sessao nova DEVE ler este arquivo + state/STATE.json + state/LAST_CHECKPOINT.md + regras_usinagem.md ANTES de qualquer acao.

## Orcamentos em Andamento

### 036/2026 — MICROGEAR Pinhão Cônico (1.34.03.643)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\036_MICROGEAR_1.34.03.643\`
- **Estado:** COLETA DE DADOS — desenho lido, **TEMPO PENDENTE** (Alexandre: "não faz em 8 min, tem histórico 2010+")
- **Dados:** 54pç, LYNX 220LM, DIN 16MnCr5 (MP cliente)
- **Geometria:** L=26,5mm | Ø61,6 | bore Ø20 N7 | cone 51°16' | canal interno 3mm
- **Programas similares:** O0192 (1.34.08.808) e O0193 (1.34.03.645) — peça irmã
- **Pendência crítica:** localizar histórico no minipcp_12_18_2025.dump (PostgreSQL)
- **Erro corrigido:** copiei 8 min da 035 — alucinação. Regra anti-alucinação salva em feedback_familia_nao_e_tempo.md
- **Última sessão:** 2026-05-02

### 024/2026 — MICROGEAR Sincronizador 19 Dentes
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\024_MICROGEAR_1.34.20.016\`
- **Estado:** COMPLETO — 4/4 documentos (PROCESSO+CUSTO+PRECO_NFE+PROPOSTA)
- **Dados:** 60pç, LYNX, ciclo 9,27min, tempo custo 13,00min, MOD R$1.252,55
- **Custos fixos:** R$722,65 | NFe R$62,33/pç → R$3.739,80 total
- **Próximo:** Gerar PDF + enviar ao cliente
- **Ultima sessão:** 2026-04-01

## Orcamentos Concluidos (2026)
- 001 a 013: concluidos (ver pastas em `D:\IA MALELO\orcamentos\2026\`)

### 040/2026 — TAGLIA Power Performance Flange FG02M1E07O15
- **Diretório:** `D:\IA MALELO\orcamentos\2026\TAGLIA\040_TAGLIA_FG02M1E07O15\`
- **Estado:** COMPLETO — 4/4 documentos + SYNC GitHub + VM | PDF pendente (Alexandre gera)
- **Dados:** 4pç, LYNX 220LM + D760 3-eixos, AISI 1045 fornecido cliente
- **Tempos:** LYNX 62 min + D760 30 min = 92 min/peça
- **Preço NFe:** R$ 775,71/pç → R$ 3.102,84 total (markup ×1,350)
- **Custo:** R$ 522,36/pç | Piso: R$ 644,27/pç
- **Aprendizado:** live tool LYNX (3,7kW) não comporta furação ≥Ø9mm → 100% D760
- **Última sessão:** 2026-05-19

### 039/2026 — INOVA PRODENTAL RISE M24×1 CONJUNTO
- **Estado:** COMPLETO — 4/4 documentos + PDF | Aprovado Alexandre
- **Dados:** 5pç, LYNX 220LM, conjunto eixo+porca, CAST77 fornecido cliente
- **Última sessão:** 2026-05-09

### 014/2026 — LUBRISYSTEM LBD-0002
- **Estado:** COMPLETO — 6/6 documentos
- **NFe parceiro lote 50:** R$ 80,31 | **lote 100:** R$ 70,31
- **Ultima sessao:** 2026-03-08

### 022/2026 — SPEEDMAQ FLANGES S40
- **Estado:** COMPLETO — PROCESSO + CUSTO + PRECO_NFE + PROPOSTA
- **4 modelos:** S40-U2030/2031/2032/2033
- **Total pedido:** R$ 2.318,76 (16 peças)
- **Ultima sessao:** 2026-03-17

### 023/2026 — SPEEDMAQ SSX-460
- **Estado:** COMPLETO — APROVADO pelo Alexandre
- **Peça:** Corpo Acoplamento Rotativo SSX-460 R4
- **Máquina:** LYNX 220LM | Lote 5 pç | 12,45 min/pç
- **NFe:** R$ 338,87/pç → R$ 1.694,35 total
- **PDF:** Gerado (CDP scale 0.78, 1 página)
- **Próximo passo:** Enviar PDF ao cliente SPEEDMAQ
- **Ultima sessao:** 2026-03-25

### 025/2026 — MICROGEAR Eixo Acionamento Z-23
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\025_MICROGEAR_1.14.01.653\`
- **Estado:** COMPLETO — 4/4 documentos (PROCESSO+CUSTO+PRECO_NFE+PROPOSTA)
- **Dados:** 30pç, LYNX, ciclo 9,17min, tempo custo 13,00min
- **Preço:** R$58,11/pç (mínimo+10%) | Total R$1.743,30
- **PDF:** Adiado por decisão do Alexandre
- **Sync:** GitHub + VM Oracle concluído
- **Última sessão:** 2026-04-02

### 026/2026 — MICROGEAR Pinhão 16 Dentes (1.98.03.104)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\026_MICROGEAR_1.98.03.104\`
- **Estado:** COMPLETO — 4/4 documentos (PROCESSO+CUSTO+PRECO_NFE+PROPOSTA)
- **Dados:** 20pç, LYNX 220LM, ciclo 6,13min, tempo custo 9,50min (as-built)
- **Custos fixos:** R$505,86 (3,5h × R$144,53) | Custo: R$50,69/pç
- **Preço:** R$56,77/pç (mínimo ×1,12) | Total R$1.135,40 | Margem 12%
- **Ferramentas:** Live tool + eixo C para chaveta (fresa Ø3,5mm MD)
- **Próximo:** Gerar PDF + SYNC
- **Última sessão:** 2026-04-03

### 027/2026 — SPEEDMAQ Flange Bomba CAV (SSX-461)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\SPEEDMAQ\027_SPEEDMAQ_SSX-461\`
- **Estado:** COMPLETO — 4/4 documentos + PDF
- **Dados:** 5pç, LYNX 220LM, 9,0 min/pç, markup padrão 35%
- **Custos fixos:** R$505,86 (3,5h × R$144,53) | Custo: R$144,53/pç
- **Preço:** R$218,92/pç | Total R$1.094,60 | Margem 34%
- **Última sessão:** 2026-04-04

### 028/2026 — SPEEDMAQ Flange Bomba VE 2 Furos (SSX-462)
- **Estado:** 4/4+PDF | AGUARDANDO APROVAÇÃO PROCESSO
- **Dados:** 5pç, LYNX 220LM, 9,0 min/pç, markup 35%
- **Preço:** R$246,28/pç | Total R$1.231,42 | Margem 34%

### 029/2026 — SPEEDMAQ Flange Bomba VE 3 Furos (SSX-463)
- **Estado:** 4/4+PDF | AGUARDANDO APROVAÇÃO PROCESSO
- **Dados:** 5pç, LYNX 220LM, 11,0 min/pç, markup 35%
- **Preço:** R$252,36/pç | Total R$1.261,82 | Margem 34%

### 030/2026 — SPEEDMAQ Flange Espaçadora Ford (SSX-464)
- **Estado:** 4/4+PDF | AGUARDANDO APROVAÇÃO PROCESSO
- **Dados:** 5pç, LYNX 220LM, 6,0 min/pç, markup 35%
- **Preço:** R$209,80/pç | Total R$1.048,99 | Margem 34%

### 031/2026 — SPEEDMAQ Flange Espaçadora (SSX-465)
- **Estado:** 4/4+PDF | AGUARDANDO APROVAÇÃO PROCESSO
- **Dados:** 5pç, LYNX 220LM, 3,0 min/pç, markup 35%
- **Preço:** R$173,31/pç | Total R$866,56 | Margem 34%

### 032/2026 — SPEEDMAQ Engate do Acoplamento (SSX-468)
- **Estado:** 4/4+PDF | AGUARDANDO APROVAÇÃO PROCESSO
- **Dados:** 5pç, LYNX 220LM, 4,5 min/pç, markup 35%
- **Preço:** R$205,24/pç | Total R$1.026,18 | Margem 34%

### 034/2026 — MICROGEAR CUBO 1.60.20.958 (reusinagem)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\034_MICROGEAR_1.60.20.958\`
- **Estado:** COMPLETO — 4/4 documentos | **PREÇO REVISADO — aguardando fechamento cliente**
- **Dados:** 200pç, GL280×2 + LYNX (3 etapas), ciclo 11,5min, markup ×1,20
- **Custos fixos revisados:** prog 3,0h GL280 + 1,0h LYNX + setup 1,0h+1,0h = R$1.019,87
- **Custo:** R$26,55/pç | **Preço:** R$31,86/pç | Total R$6.371,90
- **Histórico negociação:** enviado R$34,31 (original) → cliente recusou → revisado R$31,86
- **Piso absoluto (×1,12):** R$29,74/pç
- **Última sessão:** 2026-05-01

### 033/2026 — MICROGEAR Pino da Articulação (1.14.09.031)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\033_MICROGEAR_1.14.09.031\`
- **Estado:** COMPLETO — 4/4 documentos + PDF
- **Dados:** 60pç, LYNX 220LM (DOOSAN), ciclo 7,25min, as-built 14,83min, tempo custo 10,00min (intermediário)
- **Programa:** O0416 — produção real 10-14/04/2026 (59 OK + 1 NC), operador André
- **Material:** SAE 1045 forjado com cabeça quadrada 97,3×97,3 (sem fresamento base)
- **Custos fixos:** R$361,33 (2,5h × R$144,53) | Custo: R$27,60/pç
- **Preço:** R$41,81/pç (×1,5147, markup 35%) | Total R$2.508,43 | Margem 35% | +4,3% vs GRV
- **Fixação única:** G55 com castanha mole quadrada customizada (CAT 1=12,2/2=9,3/3=9,3mm)
- **Aprovado PROCESSO:** 17/04/2026
- **Última sessão:** 2026-04-17

### 035/2026 — MICROGEAR Pinhão Cônico (1.34.03.642)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\035_MICROGEAR_1.34.03.642\`
- **Estado:** COMPLETO — 4/4 documentos + PDF + SYNC GitHub
- **Dados:** 54pç, LYNX 220LM, ciclo 8 min, prog 1h (reuso O0020)
- **Custos fixos:** R$361,33 | Custo: R$24,42/pç
- **Preço:** R$32,88/pç (markup 20% MICROGEAR ×1,3464) | Total R$1.775,52
- **Material:** SAE 4140 fornecido pelo cliente
- **Última sessão:** 2026-05-01

### 047/2026 — SPEEDMAQ VAP-U2001 (Corpo da Válvula de Alta Pressão)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\SPEEDMAQ\047_SPEEDMAQ_VAP-U2001\`
- **Estado:** 6/6 documentos gerados (PROCESSO+CUSTO+PRECO_NFE+VIABILIDADE_LOTES+BREAK_EVEN+PROPOSTA)
- **Torno LYNX (OP60/O6005):** AS-BUILT REAL — pedido de 10 peças finalizado 20/07/2026. Setup+prog+try-out 130min (17/07 14:20-16:30, inclui 1ª peça) + produção pura 390min/9pç (20/07 08:00-14:30) = 43,33 min/pç real (3,3× maior que estimativa inicial de 13,1 min/pç)
- **Centro D760 (OP70):** AINDA PENDENTE DE EXECUÇÃO — furos laterais, rosca 1/8" BSP, rosca 3/8" BSP a 180°, furo com rebaixo Ø13,80/rebaixo Ø25×12. Mantida estimativa de engenharia (2,3 min/pç, 1,5h prog + 1,0h setup) por decisão de Alexandre 21/07/2026 — revisar após execução
- **Custo real lote 10:** R$189,23/pç (R$1.892,34 total) | **Preço NFe:** R$286,63/pç (markup 35%, ×1,5147) → Total R$2.866,27
- **Break-even:** 6 peças — pedido de 10 fica 67% acima do ponto de equilíbrio, margem real 34%
- **Próximo passo:** aguardar execução do D760, revisar custo/preço final se necessário, gerar PDF 1 página (script CDP)
- **Última sessão:** 21/07/2026

### 048/2026 — SPEEDMAQ VAP-U2003 (Tampa da Válvula de Alta Pressão)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\SPEEDMAQ\048_SPEEDMAQ_VAP-U2003\`
- **Estado:** 6/6 documentos gerados (PROCESSO+CUSTO+PRECO_NFE+VIABILIDADE_LOTES+BREAK_EVEN+PROPOSTA) — 100% AS-BUILT REAL, gate aprovado retroativamente 23/07/2026
- **Torno LYNX (O6004/Doosan II P6004):** AS-BUILT REAL — pedido 10 peças finalizado 22/07/2026. Produção pura 10,00 min/pç (17/07 7:50-8:30, 4pç, regime estabilizado usado como referência). Setup+try-out 4,0h (15-16/07, fragmentado em blocos "SETUP 1º lado"+"SETUP 3D Hélio.DI"+"SETUP 2º lado")
- **Centro D760 (furos radiais BSP):** AS-BUILT REAL — finalizado 22/07/2026. Produção pura 14,50 min/pç (média ponderada 21/07: 4pç + 22/07: 6pç, 4,5× maior que estimativa de 3,2 min/pç). Setup+dispositivo de fixação novo 3,8333h (21/07, "Fazendo dispositivo TN") — cobrado integral neste lote, item NÃO recorrente
- **Programação CNC:** mantida estimativa original R$634,69 (blocos 3D/desenho da ficha são do dispositivo, não CAM)
- **Custo real lote 10:** R$304,73/pç (R$3.047,31 total) | **Preço NFe:** R$461,57/pç (markup 35%, ×1,5147) → Total R$4.615,70
- **Break-even:** 7 peças — pedido de 10 fica 63% acima do ponto de equilíbrio, margem real 34%
- **Aprendizado:** custo ~1,95× maior que a estimativa inicial (R$155,98/pç), puxado pelo dispositivo D760 (não recorrente) e setup real do torno (4h vs 1h estimado) — em reposições futuras, custo cai substancialmente (dispositivo e programa já prontos)
- **Próximo passo:** enviar proposta ao cliente; gerar PDF 1 página (script CDP) se solicitado
- **Última sessão:** 23/07/2026

### 049/2026 — ENGEPLAST Bico PCO38 IMC + Bico PCO38
- **Diretório:** `D:\IA MALELO\orcamentos\2026\ENGEPLAST\049_ENGEPLAST_BICO-PCO38\`
- **Estado (24/07/2026):** PROCESSO_FABRICACAO rev. 7 **APROVADO por Alexandre** ("pode seguir processo aprovado"). 6/6 documentos gerados (PROCESSO+CUSTO+PRECO_NFE+VIABILIDADE_LOTES+BREAK_EVEN+PROPOSTA)
- **Correção rev. 7 (24/07/2026):** Alexandre corrigiu RPM da broca Ø3mm (furo radial eixo C) de S8000 estimado para **S3000 — limite da própria broca**, não da máquina (LYNX vai a 6000 RPM, centro de usinagem a 7500 RPM, GL280 a 4500 RPM). N70(Item1)/N60(Item2) subiram de 1,2s para 2,7s cada
- **Ciclo final aprovado:** Item 1 (IMC) 169,5s/2,825min/pç, ~21,2 pç/h | Item 2 (padrão) 167,5s/2,792min/pç, ~21,5 pç/h
- **Custo:** Item1 R$20,47/pç (R$1.433,16, 70pç) | Item2 R$30,96/pç (R$990,81, 32pç) | Total R$2.423,97 — nota: material do Item2 corrigido de Ø38 (erro do doc antigo) para Ø40×33mm (R$179,17), conforme PROCESSO aprovado
- **Preço NFe (markup 35%, ×1,5147):** Item1 R$31,01/pç (R$2.170,81) | Item2 R$46,90/pç (R$1.500,79) | **Total pedido R$3.671,60**
- **Break-even:** Item1 33pç (pedido 70pç, +112%) | Item2 18pç (pedido 32pç, +78%) | margem real 34% em ambos
- **PROPOSTA_COMERCIAL:** consolidada (1 documento para os 2 itens, conforme preferência já confirmada do Alexandre) — CTA total R$3.671,60
- **Preço de MP:** R$50,00/kg alumínio 6351-T6 — CONFIRMADO por Alexandre (24/07/2026, "pode seguir com o valor do alumínio")
- **Histórico da sessão (23-24/07/2026):** 3 incidentes de processo corrigidos — (1) gate pulado 2ª vez (`feedback_processo_gate_batch.md`), (2) tempo calculado sem manipulação do operador, pç/h irreal (74-78 vs real 20-25), (3) RPM da broca Ø3mm superestimado (S8000 vs limite real S3000) — reforços aplicados na skill `/montar-processo-fabricacao`
- **Próximo passo:** SYNC feito (4 destinos) — falta só enviar proposta ao cliente
- **Última sessão:** 24/07/2026

## Proximo numero disponivel: 050/2026

## Banco de Dados CNC (atualizado 2026-03-06)
- `PROG_CNC_DATABASE_v3.json` — 11.547 programas com dados de corte
- `BIBLIOTECA_FERRAMENTAS_CNC.json` — 2.060 ferramentas unicas
- `SolidCAM_ToolLibs\` — 1.044 ferramentas .sctools
