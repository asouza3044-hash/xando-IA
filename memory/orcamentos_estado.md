# Estado dos Orcamentos LASEC
# ATUALIZAR sempre que estado mudar
# Proximo numero: 041/2026

## REGRA: Toda sessao nova DEVE ler este arquivo + state/STATE.json + state/LAST_CHECKPOINT.md + regras_usinagem.md ANTES de qualquer acao.

## Orcamentos em Andamento

### 036/2026 — MICROGEAR Pinhão Cônico (1.34.03.643)
- **Diretório:** `D:\IA MALELO\orcamentos\2026\MICROGEAR\036_MICROGEAR_1.34.03.643\`
- **Estado:** COLETA DE DADOS — TEMPO PENDENTE (histórico no dump PostgreSQL)
- **Dados:** 54pç, LYNX 220LM, DIN 16MnCr5 (MP cliente)
- **Pendência:** localizar histórico no minipcp_12_18_2025.dump
- **Última sessão:** 2026-05-02

## Orcamentos Concluidos (2026)
- 001 a 035: concluidos (ver pastas em `D:\IA MALELO\orcamentos\2026\`)

### 040/2026 — TAGLIA Flange FG02M1E07O15
- **Diretório:** `D:\IA MALELO\orcamentos\2026\TAGLIA\040_TAGLIA_FG02M1E07O15\`
- **Estado:** COMPLETO — 4/4 documentos | PDF pendente (Alexandre gera)
- **Dados:** 4pç, LYNX 220LM + D760 3-eixos, AISI 1045 fornecido cliente
- **Tempos:** LYNX 62 min + D760 30 min = 92 min/peça
- **Preço NFe:** R$ 775,71/pç → R$ 3.102,84 total (markup ×1,350)
- **Custo:** R$ 522,36/pç | Piso: R$ 644,27/pç
- **Ferramentas a comprar:** Macho M10×1 HSS + Fresa Ø26 MD
- **Tolerâncias críticas:** Ø255 H7, Ø170 interferência, Ø310 h7
- **Aprendizado:** live tool LYNX (3,7kW) não comporta furação ≥Ø9mm → D760
- **Última sessão:** 2026-05-19

### 039/2026 — INOVA PRODENTAL RISE M24×1 CONJUNTO
- **Estado:** COMPLETO — 4/4 documentos + PDF | Aprovado Alexandre
- **Dados:** 5pç, LYNX 220LM, conjunto eixo+porca, CAST77 fornecido cliente
- **Última sessão:** 2026-05-09

### 035/2026 — MICROGEAR Pinhão Cônico (1.34.03.642)
- **Estado:** COMPLETO — 4/4 documentos + PDF + SYNC
- **Dados:** 54pç, LYNX 220LM, ciclo 8 min | R$ 32,88/pç
- **Última sessão:** 2026-05-01

## Proximo numero disponivel: 041/2026

## Banco de Dados CNC (atualizado 2026-03-06)
- `PROG_CNC_DATABASE_v3.json` — 11.547 programas com dados de corte
- `BIBLIOTECA_FERRAMENTAS_CNC.json` — 2.060 ferramentas unicas
- `SolidCAM_ToolLibs\` — 1.044 ferramentas .sctools
