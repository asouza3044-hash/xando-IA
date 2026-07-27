---
name: feedback-calibracao-asbuilt-vs-estimativa
description: "CALIBRAÇÃO REAL: minha estimativa de engenharia SUBESTIMA a produção real em ~1,5× a 4,5×. Dado dos orçamentos as-built (024/026/033/047/048). Sempre avisar que a estimativa é otimista."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d62f2772-e7fb-4f19-9d96-202795cc3680
  modified: 2026-07-27T15:25:51.192Z
---

## A estimativa de engenharia (Modo A) SUBESTIMA sistematicamente a produção real

Minerado dos orçamentos com as-built REAL (piloto 27/07/2026: 024, 026, 033, 047, 048 + ref 008).
Este é o dado que explica o problema dos "tempos irreais / processos incoerentes": **meus ciclos
calculados por fórmula saem otimistas demais.** A realidade de chão de fábrica é bem mais lenta.

### Ledger — estimativa × as-built real (min/pç)
| Orç | Peça | Material | Máq | Estimativa | As-built REAL | Gap | Tempo p/ custo |
|-----|------|----------|-----|-----------|---------------|-----|----------------|
| 024 | 1.34.20.016 sincron. 19d | aço | LYNX | 9,27 | **17,33** | 1,87× | 13,00 (−25%) |
| 026 | 1.98.03.104 pinhão 16d | SAE 4140 | LYNX | 6,13 | **9,50** | 1,55× | 9,50 (0%) |
| 033 | 1.14.09.031 pino artic. | SAE 1045 forj | LYNX | 7,25 | **14,83** | 2,05× | 10,00 (−33%) |
| 047 | VAP-U2001 corpo válv. | alumínio | LYNX | 13,1 | **43,33** | 3,31× | 43,33 |
| 048 | VAP-U2003 tampa válv. (D760) | alumínio | D760 | 3,2 | **14,50** | 4,53× | 14,50 |

**Gap médio ~2,7× | faixa 1,5× a 4,5×.** Quanto mais complexa/multi-feature a peça (várias fixações,
furos coordenados, roscas BSP), MAIOR o gap — o improdutivo real (troca de ferramenta, medição, ajuste,
curva de aprendizado) domina, não o tempo de corte teórico.

### Regras de aplicação (Modo A — peça nova, sem as-built)
1. **Nunca apresentar o ciclo calculado por fórmula como se fosse o tempo real.** Marcar sempre
   "ESTIMATIVA DE ENGENHARIA — a produção real tende a ser 1,5× a 4,5× maior, calibrar na 1ª peça".
2. **Teste de plausibilidade obrigatório:** o pç/h calculado bate com a experiência do Alexandre? Se der
   um rendimento alto demais (peça complexa saindo em segundos), FALTA improdutivo/manipulação — ver
   `regras_usinagem.md` (manipulação operador: torno ~2,0 min, centro ~3,0 min como linha separada).
3. **Para peça com furos coordenados / multi-fixação / rosca:** já partir do topo da faixa (gap ~3-4×),
   não do fundo.

### O "tempo para custo" (Modo B) é decisão do Alexandre — entre estimativa e as-built
Ele desconta a ineficiência ("cliente não paga minha ineficiência") em grau variável, caso a caso:
- 024: as-built 17,33 → custo 13,00 (desconto 25%)
- 033: as-built 14,83 → custo 10,00 (desconto 33%)
- 026: as-built 9,50 → custo 9,50 (sem desconto)
- 047/048: usou as-built cheio (produção já estabilizada)
→ **SEMPRE perguntar qual tempo usar para custo quando as-built diverge >1,5× da estimativa** (regra 16).
Nunca presumir o desconto. Ver [[feedback_experimento_nao_e_ciclo_producao]] (as-built pode conter
experimento, não ciclo normal — perguntar).

### Ferramental por tipo de peça (padrão observado)
- **MICROGEAR aço torneado (pinhão/pino — 026 e 033 usaram o MESMO conjunto):** 08.07.060 (bedame DGR),
  08.07.096 (WNMG 060408), 08.07.173 (VNMG160404), 08.08.029 (bedame DGTR 1,4mm), 08.08.035 (MVJNR desb
  ext), 08.08.040 (DWLNR desb ext rebaixado). Serve de ponto de partida — confirmar geometria no desenho.
- **SPEEDMAQ válvula alumínio (047/048):** 08.07.001 (VCGT160404), 08.07.093 (CCGT060202), 08.08.032
  (SVJCR ext), 08.08.001/008 (boring A12M/S16R), machos BSP 08.09.045 (1/8") + 08.09.134 (3/8") + M5/M6.
- Todos os códigos históricos do piloto conferem no banco `bd_cnc/ferramentas` — nenhum inventado.

**Origem:** piloto de mineração dos orçamentos as-built (27/07/2026). Ver [[projeto_mineracao_orcamentos]].
