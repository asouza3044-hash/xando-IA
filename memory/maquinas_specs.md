# Especificacoes Maquinas CNC LASEC
# Dados confirmados: fabricante + chao de fabrica LASEC
# CONSULTAR antes de definir parametros em qualquer orcamento

## Doosan LYNX 220LM (Torno CNC)
- **Tipo:** Torno CNC 3 eixos (X, Z, C) + ferramentas acionadas
- **Turret:** Servo 12 posicoes, bidirecional
  - Indexacao: 0,11s por estacao (caminho mais curto)
  - Troca completa (retract + index + approach): ~0,5s
- **Spindle:** Max 6.000 RPM
  - G92 S3000 para blocos retangulares (seguranca desbalanceamento)
- **Live tooling:** Max 6.000 RPM (M33 liga / M35 desliga)
- **Eixo C:** Resolucao 0,001 grau, posicionamento ~0,3s
- **Rapids:** X = 30 m/min (500 mm/s) | Z = 36 m/min (600 mm/s)
- **Capacidade:** Diametro max torneamento ~300mm
- **Hora-maquina:** R$ 83,08/h (custos_ferramentaria 2026)
- **Taxa real OneDrive:** R$ 121/h
- **Setup minimo:** 1,0h
- **Operadores:** ANDRE, VITOR
- **Programas CNC:** D:\PROG_CNC\LYNX220\

## Romi Discovery 760 (Centro de Usinagem Vertical)
- **Tipo:** Centro de usinagem vertical + 4o eixo divisor
- **ATC:** 22 ferramentas, carrossel bidirecional
  - Troca chip-to-chip: 5,5s
- **Spindle:** Max 7.500 RPM, ISO-40
- **Rapids:** X/Y = 30 m/min | Z = 20 m/min
- **4o eixo:** Divisor automatico, indexacao ~2s por posicao
- **Hora-maquina:** (consultar planilha custos)
- **Setup minimo:** 2,0h (com 4o eixo)
- **Programas CNC:** D:\PROG_CNC\DISCO760\

## Romi GL 280M (Centro de Torneamento)
- **Hora-maquina:** R$ 76,95/h
- **Programas CNC:** D:\PROG_CNC\GL280\

## Romi Centur 30D (Torno CNC)
- **Hora-maquina:** R$ 60,48/h
- **Capacidade:** Diametro max ~430mm
- **Programas CNC:** D:\PROG_CNC\CENTU30D\

## Torno Universal (01)
- **Hora-maquina:** R$ 38,62/h

## Selecao de Maquina (regras)
- Pecas cilindricas simples: Tornos (CENTU, GL, LYNX)
- Pecas prismaticas/fresamento: Centros (DISCO, VTC)
- Torneamento + fresamento combinado: LYNX 220LM (ferramenta acionada)
- Furacoes multi-face com 4o eixo: Discovery 760

## Fontes de Dados
- Planilha custos: D:\IA MALELO\banco_dados\custos_ferramentaria lasec.xls
- Specs fabricante: Sites DN Solutions (Doosan) e Romi
- Programas historicos: D:\PROG_CNC\[MAQUINA]\
- Banco CNC: D:\IA MALELO\banco_dados\PROG_CNC_DATABASE_v3.json
