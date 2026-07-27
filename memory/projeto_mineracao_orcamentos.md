---
name: projeto-mineracao-orcamentos
description: "Projeto de aprender com orçamentos passados: mineração disciplinada (extrai dado real, cruza com fonte limpa, não absorve cego). Piloto feito nos as-built; resto pendente."
metadata: 
  node_type: memory
  type: project
  originSessionId: d62f2772-e7fb-4f19-9d96-202795cc3680
  modified: 2026-07-27T16:56:20.779Z
---

## Mineração dos orçamentos passados para calibrar a base de dados

**Objetivo:** aprender com o dado REAL dos orçamentos já feitos (tempo as-built, ferramenta usada, Vc/S/F
validado, preço/margem aceita) para calibrar estimativas e memórias. **Não é absorção cega** — parte dos
orçamentos antigos foi feita com as referências podres que limpamos em 27/07/2026, então cada dado é
cruzado com a fonte limpa e conflito vira pergunta ao Alexandre, nunca sobrescrita silenciosa.

### Piloto CONCLUÍDO (27/07/2026) — orçamentos as-built + ref 008
Minerados: 024, 026, 033, 047, 048 (as-built real) + 008 MICROGEAR (modelo de referência aprovado).
**Achado principal:** estimativa de engenharia subestima produção real 1,5×–4,5× → gerou
[[feedback-calibracao-asbuilt-vs-estimativa]] (calibração de tempo + tempo-para-custo + ferramental por
tipo de peça). Todos os códigos de ferramenta do piloto conferem no banco `bd_cnc/ferramentas` (nenhum
inventado). Nenhuma divergência de custo grave; o 024 (memória 13,00 vs "12,14" no processo) foi falso
alarme — o CUSTO usou 13,00 corretamente.

### VARREDURA COMPLETA CONCLUÍDA (27/07/2026) — 54 orçamentos (2025+2026)
Script de extração (`scratchpad/minerar.py`) varreu todos, validando 86 códigos únicos de ferramenta.
Achados consolidados:
1. **3 códigos de ferramenta INVENTADOS** (não existem no MINIPCP): `08.12.086` (027), `08.12.106`
   (028/029), `08.06.110` (014) — fabricados casando diâmetro com número. Documentado em
   [[feedback-codigos-ferramentas-minipcp]] com o real mais próximo. Os outros 83 conferem.
2. **Padrão material/máquina/markup por cliente** → [[referencia-material-maquina-por-cliente]]
   (MICROGEAR aço MP-cliente, R2 100% D760, SPEEDMAQ válvula alumínio D760 p/ BSP, etc.)
3. **Calibração as-built** confirmada e ampliada ([[feedback-calibracao-asbuilt-vs-estimativa]]) — 039
   ~1,4×, 046 teve experimento (15min vs 2,5 real, ver `feedback_experimento_nao_e_ciclo_producao`).
4. Orçamentos com as-built REAL (maior confiança de tempo): 006, 008, 024, 025, 026, 033, 039, 046,
   047, 048, 049.
5. Nenhuma taxa errada (76,95/60,48) encontrada nos HTMLs dos orçamentos — o erro ficou só na memória/
   índice (já corrigidos); os orçamentos usaram as taxas certas.

### PENDENTE (refinamento futuro, opcional)
- Extrair Vc/S/F operação-a-operação dos as-built para engordar `parametros_corte.md` (hoje só alumínio,
  "em revisão"). O parsing por regex do HTML é ruidoso — faria com script dedicado por família de peça.
- Preço/margem numérico por cliente (benchmark) — capturado qualitativamente; refinar com valores exatos
  se o Alexandre quiser tabela de piso por tipo de peça.

### Como retomar
Ler este arquivo + as 3 memórias-filhas acima. A base já está calibrada; refinamentos são incrementais.
