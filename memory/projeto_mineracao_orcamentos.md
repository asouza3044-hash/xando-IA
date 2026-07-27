---
name: projeto-mineracao-orcamentos
description: "Projeto de aprender com orçamentos passados: mineração disciplinada (extrai dado real, cruza com fonte limpa, não absorve cego). Piloto feito nos as-built; resto pendente."
metadata: 
  node_type: memory
  type: project
  originSessionId: d62f2772-e7fb-4f19-9d96-202795cc3680
  modified: 2026-07-27T15:26:15.664Z
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

### PENDENTE (expandir se o Alexandre quiser)
- Demais orçamentos 2026 (014, 022, 023, 025, 027-032, 034-036, 039, 040, 043, 046, 049) — maioria
  estimativa, menor confiança para tempo, mas úteis para: preço/margem por cliente, escolha de máquina,
  padrões de ferramental por tipo de peça.
- Orçamentos 2025 (001-013) — históricos, taxas antigas (R$83,08 etc), usar só p/ ferramental e leitura
  de desenho, NUNCA para taxa.
- Extrair Vc/S/F detalhado por operação para enriquecer `parametros_corte.md` (hoje só tem alumínio, e
  "em revisão") — o piloto pegou tempos, falta varrer os params de corte operação a operação.

### Como retomar
Ler este arquivo + [[feedback-calibracao-asbuilt-vs-estimativa]], escolher próximo lote, extrair
dado-ponto (tempo as-built/estimativa, ferramentas, params, preço), cruzar com fonte limpa, registrar
com carimbo de origem+confiança. Priorizar sempre os que têm as-built real.
