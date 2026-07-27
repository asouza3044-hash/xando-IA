---
name: especificacoes-maquinas-cnc-lasec
description: "Specs e CUSTO das maquinas CNC LASEC — espelho das 2 fontes de verdade (planilha de custo + knowledge tecnico). Consultar SEMPRE antes de definir taxa/parametro em orcamento"
metadata: 
  node_type: memory
  type: reference
  originSessionId: d62f2772-e7fb-4f19-9d96-202795cc3680
  modified: 2026-07-27T14:00:55.657Z
---

# Especificacoes + Custo das Maquinas CNC LASEC

## ⚠️ FONTES DE VERDADE (consultar o original em caso de duvida — NUNCA inventar taxa)
1. **CUSTO hora-maquina:** `D:\IA MALELO\banco_dados\custos_ferramentaria lasec.xls`, aba **"Custos 2026"**
   (ler com `python3 + xlrd`; instalar com `python3 -m pip install xlrd` se faltar). Este arquivo abaixo é
   um ESPELHO — se divergir da planilha, a PLANILHA vence e este arquivo deve ser re-sincronizado.
2. **Dados TECNICOS** (rotacao, avanco, potencia, cursos, torre): `D:\IA MALELO\agente\knowledge\maquinas-lasec.md`
   (8 maquinas, specs de fabricante). Improdutivo/tempos de troca abaixo vem de catalogo DN Solutions/Romi.
- Ultima sincronizacao deste espelho com a planilha: **27/07/2026**.

## CUSTO HORA-MAQUINA 2026 (espelho fiel da aba "Custos 2026")
Base: planilha original "Centro de Custo Produtivo" (pre-roubo) × fator 1,1597 (IPCA 2023 4,62% + IPCA 2024
4,83% + Dissidio Metalurgicos SP 2025/2026 5,74%). Atualizado 08/03/2026.

| Cod | Recurso | Tipo | Original R$/h | Custo 2026 R$/h | Ativa? |
|---|---|---|---:|---:|---|
| 30 | Projeto CAD/CAM | CAD/CAM (nao e maquina) | 66,36 | **76,96** | — |
| 31 | GL 280 | Torno/Centro Torneamento | 74,90 | **86,86** | ✅ ATIVA |
| 32 | G240 | Torno CNC | 71,70 | **83,15** | legado |
| 33 | DOOSAN LYNX 220LM | Torno CNC + Eixo C (live tool) | 83,08 | **96,35** | ✅ ATIVA |
| 34 | DISCOVERY 560 | Centro Usinagem 3 eixos | 97,14 | **112,65** | legado |
| 35 | DISCOVERY 760 | Centro Usinagem 3 eixos | 104,76 | **121,49** | ✅ ATIVA |
| 35-4E | DISCOVERY 760 + 4º EIXO | Centro Usinagem 4 eixos | 104,76 | **151,86** | ✅ ATIVA (+25% s/ 3E) |
| 36 | VTC 30A | Centro Usinagem 3 eixos | 80,96 | **93,89** | legado |
| 37 | CENTUR 30D | Torno CNC | 53,65 | **62,22** | legado |
| 38 | Serra | Serra | 25,89 | **30,02** | apoio |

> **SO as 4 ATIVAS entram em custo de orcamento novo** (GL280, LYNX, D760 3E, D760 4E) — ver
> [[projeto_maquinas_legado]]. As legado servem so como referencia tecnica dos programas CNC historicos.

### Taxas de SETUP (1,5× producao) — direto da planilha (aba "Custos 2026", secao TAXAS DE SETUP)
| Tipo | Producao R$/h | Setup R$/h (1,5×) | Setup min | Custo setup min |
|---|---:|---:|---|---:|
| Tornos CNC (GL, G240, CENTUR, LYNX) | 96,35 | **144,52** | 1,0h | 144,52 |
| Centro Usinagem 3 eixos (D560, D760, VTC) | 121,49 | **182,24** | 1,0h | 182,24 |
| Centro Usinagem 4 eixos (D760+4E) | 151,86 | **227,79** | 2,0h | 455,58 |

> **Atencao ao arredondamento:** setup torno = 144,52 (a planilha calcula do valor sem arredondar:
> 83,08 × 1,1597 × 1,5 = 144,52). NAO usar 144,53 (erro de arredondar 96,35 antes de multiplicar).
> GL280 setup = 86,86 × 1,5 = 130,29. Centur setup = 62,22 × 1,5 = 93,33.

### GRV 2024 — preco de mercado Grande SP (SO para validar competitividade, NUNCA como custo)
| Tipo | GRV R$/h | LASEC custo | Margem potencial |
|---|---:|---:|---:|
| Torno CNC | 156,28 | 96,35 | +62,2% |
| Centro 3 eixos | 189,78 | 121,49 | +56,2% |
| Centro 4 eixos (est. +25%) | 237,22 | 151,86 | +56,2% |

---

## DADOS TECNICOS (das 4 ATIVAS — fonte: `agente/knowledge/maquinas-lasec.md` + catalogo)

### Doosan LYNX 220LM (Torno CNC com Ferramenta Acionada) — cod 33
- **Tipo:** Torno CNC 3 eixos (X, Z, C) + live tooling | **CNC:** Fanuc 0i-TF | **Ano:** 2016
- **Spindle:** 6.000 RPM max | 15 kW (20 HP) | torque 127 Nm | nariz A2-5 | furo/passagem barra Ø51mm
- **Limite seguranca bloco retangular:** G92 S3000 (desbalanceamento)
- **Live tooling:** 6.000 RPM max | 3,7 kW (5 HP) | M33 liga / M35 desliga | (vmid MaxSpin estacoes = 6000)
- **Turret:** BMT45P, **24 posicoes** (confirmado Alexandre) | indexacao 0,11s/estacao | troca completa ~0,5s
  | tool OD 20×20mm | max boring bar 32mm
- **Eixo C:** resolucao 0,001° | posicionamento ~0,3s
- **Cursos/rapids:** X 175mm(raio) rapid 30 m/min | Z 550mm rapid 36 m/min | C continuo 6.000 deg/min
- **Capacidade:** swing 510mm | Ø max corte 320mm | comp. torneamento 510mm | peca max 130kg | contra-ponto MT-4
- **Custo:** R$96,35/h (setup R$144,52/h) | setup min 1,0h | operadores: ANDRE, VITOR | progs: `D:\PROG_CNC\LYNX220\`

### Romi GL 280M (Centro de Torneamento) — cod 31
- **Cabecote:** A2-6" → **4.500 RPM** | A2-8" → 3.500 RPM
- **Motor:** 25 HP / 18,5 kW (alto torque) | guias lineares X e Z
- **Torre:** 12 ferramentas | **Rapids:** X 30 m/min | Z 30 m/min | **CNC:** GE Fanuc 0i-TC
- **Aplicacao:** pecas de maior diametro, cortes pesados, producao seriada
- **Custo:** R$86,86/h (setup R$130,29/h) | setup min 1,0h | progs: `D:\PROG_CNC\GL280\`

### Romi Discovery 760 (Centro de Usinagem Vertical) — cod 35 / 35-4E
- **Spindle:** 7.500 RPM max, ISO-40 | **CNC:** Fanuc | serie Discovery (robusta, > que D560)
- **ATC:** 22 ferramentas, carrossel bidirecional, troca chip-to-chip 5,5s
- **Rapids:** X/Y 30 m/min | Z 20 m/min | **4º eixo:** divisor automatico, indexacao ~2s/posicao
- **Fabricante: ROMI** (NAO Doosan — corrigido 27/07/2026 pela planilha/knowledge)
- **Custo:** 3 eixos R$121,49/h (setup R$182,24/h, min 1,0h) | 4 eixos R$151,86/h (setup R$227,79/h, min 2,0h)
- **Progs:** `D:\PROG_CNC\DISCO760\`

> Specs tecnicas das maquinas LEGADO (CENTUR 30D/30S, G240, DISCOVERY 560, VTC 30A) estao em
> `D:\IA MALELO\agente\knowledge\maquinas-lasec.md` — consultar so como referencia de programa historico.

## RPM: limite da MAQUINA vs limite da FERRAMENTA (o MENOR vence)
| Maquina | RPM max spindle |
|---|---|
| LYNX 220LM | 6.000 |
| Discovery 760 | 7.500 |
| GL 280M | 4.500 |

**Limite da ferramenta pode ser MENOR que o da maquina.** Ex.: broca Ø3mm — maximo **3.000 RPM** mesmo no
D760 (7.500). Nunca aceitar o RPM que sai puro da formula (Vc×1000/πD) sem checar contra os dois limites.
Incidente 049/2026 ENGEPLAST: calculei S8000 para broca Ø3,2mm (nem maquina nem broca aguentam) — Alexandre
corrigiu para S3000.

## Improdutivo por maquina (para calculo de ciclo)
- **LYNX:** turret 0,11s/estacao, troca completa ~0,5s, rapid X 30 / Z 36 m/min, C-axis ~0,3s/pos, M33/M35 ~0,5s
- **D760:** ATC 5,5s chip-to-chip, rapid X/Y 30 / Z 20 m/min, 4º eixo ~2s/pos
- **Manipulacao do operador (linha SEPARADA):** torno em castanha ~2,0 min | centro morsa+4ºeixo ~3,0 min
  — NAO usar "1 min" de improdutivo por chute (ver `regras_usinagem.md`)

## Selecao de Maquina
- Cilindricas simples → tornos (GL280, LYNX) | prismaticas/fresamento → centro (D760)
- Torneamento + fresamento combinado → LYNX 220LM (live tool) | furacao multi-face com 4º eixo → D760
- Furacao ≥M10/Ø9mm no torno → vai pro D760 (live tool LYNX 3,7kW nao comporta) — ver `feedback_live_tool_limite_ferramental.md`
