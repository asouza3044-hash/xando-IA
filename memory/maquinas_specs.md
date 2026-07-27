---
name: especificacoes-maquinas-cnc-lasec
description: "Specs completas das maquinas CNC da LASEC - Lynx 220LM, D760, GL280, Centur 30D - RPM, potencias, eixos, turret, live tooling"
metadata: 
  node_type: memory
  type: reference
  originSessionId: d62f2772-e7fb-4f19-9d96-202795cc3680
  modified: 2026-07-27T12:46:27.746Z
---

# Especificacoes Maquinas CNC LASEC
# Dados confirmados: fabricante DN Solutions/Romi + chao de fabrica LASEC
# CONSULTAR antes de definir parametros em qualquer orcamento ou pos-processador

## Doosan LYNX 220LM (Torno CNC com Ferramenta Acionada)
- **Tipo:** Torno CNC 3 eixos (X, Z, C) + ferramentas acionadas
- **CNC:** Fanuc 0i-TF
- **Ano:** 2016

### Spindle Principal (Eixo-arvore)
- **RPM max:** 6.000 RPM (confirmado catalogo DN Solutions)
- **Potencia:** 15 kW (20 HP) continuo
- **Torque:** 127 Nm (variante A / 6000 RPM)
- **Nariz:** A2-5
- **Furo spindle:** 51 mm
- **Passagem barra:** 51 mm
- **Limite seguranca blocos retangulares:** G92 S3000 (desbalanceamento)

### Ferramenta Acionada (Live Tooling)
- **RPM max:** 6.000 RPM (confirmado catalogo DN Solutions)
- **Potencia:** 3,7 kW (5 HP)
- **Acionamento:** Servo driven
- **Ligar:** M33 | **Desligar:** M35
- **IMPORTANTE para vmid:** MaxSpin estacoes = 6000 (aceita acionada)

### Turret (Revolver)
- **Tipo:** BMT45P
- **Estacoes:** 24 posicoes (confirmado pelo Alexandre)
- **Indexacao:** Servo, bidirecional (caminho mais curto)
- **Tempo indexacao:** 0,11s por estacao
- **Troca completa:** ~0,5s (retract + index + approach)
- **Tool size OD:** 20mm x 20mm
- **Max boring bar:** 32mm

### Eixo C
- **Resolucao:** 0,001 grau
- **Posicionamento:** ~0,3s

### Cursos e Rapids
| Eixo | Curso | Rapido |
|------|-------|--------|
| X | 175 mm (raio) = 350 mm (diametro) | 30 m/min |
| Z | 550 mm (modelo LM bed longo) | 36 m/min |
| C | +-100.000 graus (continuo) | 6.000 deg/min |

### Capacidade
- **Swing sobre barramento:** 510 mm
- **Diametro max corte:** 320 mm
- **Comprimento max torneamento:** 510 mm
- **Contra-ponto:** Cone MT-4, quill 80mm

### Custos e Operacao
- **Custo interno:** R$ 96,35/h (planilha 2026 corrigida IPCA+Dissidio)
- **Setup minimo:** 1,0h
- **Operadores:** ANDRE, VITOR
- **Programas CNC:** D:\PROG_CNC\LYNX220\

---

## Romi Discovery 760 (Centro de Usinagem Vertical)
- **Tipo:** Centro de usinagem vertical + 4o eixo divisor
- **ATC:** 22 ferramentas, carrossel bidirecional
  - Troca chip-to-chip: 5,5s
- **Spindle:** Max 7.500 RPM, ISO-40
- **Rapids:** X/Y = 30 m/min | Z = 20 m/min
- **4o eixo:** Divisor automatico, indexacao ~2s por posicao
- **Custo interno 3-eixos:** R$ 121,49/h
- **Custo interno 4-eixos:** R$ 151,86/h (+25%)
- **Setup minimo:** 1,0h (3-eixos) | 2,0h (com 4o eixo)
- **Programas CNC:** D:\PROG_CNC\DISCO760\

## Romi GL 280M (Centro de Torneamento)
- **RPM max:** 4.500 RPM (confirmado por Alexandre 24/07/2026)
- **Custo interno:** R$ 76,95/h
- **Programas CNC:** D:\PROG_CNC\GL280\

## RPM máximo por máquina (resumo rápido — confirmado por Alexandre 24/07/2026)
| Máquina | RPM máx (spindle/live tool) |
|---|---|
| Doosan LYNX 220LM | 6.000 |
| Romi Discovery 760 (centro) | 7.500 |
| Romi GL 280M | 4.500 |

**IMPORTANTE — limite da FERRAMENTA pode ser menor que o da máquina:** brocas pequenas (Ø≤3mm) têm limite
prático de RPM bem abaixo do spindle máximo da máquina, mesmo em máquinas rápidas (D760 chega a 7.500 RPM,
mas a broca de Ø3mm não aguenta isso). **Regra validada: brocas de Ø3mm — máximo 3.000 RPM**, independente
da máquina usada. Nunca calcular RPM só a partir de Vc de tabela sem checar contra o limite real da
ferramenta E da máquina — o menor dos dois vence. Incidente 049/2026 ENGEPLAST: assumi S8000 para broca
Ø3,2mm (nem a máquina nem a broca suportam), Alexandre corrigiu para S3000.

## Romi Centur 30D (Torno CNC)
- **Custo interno:** R$ 60,48/h
- **Capacidade:** Diametro max ~430mm
- **Programas CNC:** D:\PROG_CNC\CENTU30D\

## Torno Universal (01)
- **Custo interno:** R$ 38,62/h

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
