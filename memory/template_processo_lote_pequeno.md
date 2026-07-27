---
name: Template PROCESSO para lotes pequenos
description: Formato aprovado de PROCESSO_FABRICACAO para peças novas de baixo volume — inclui programação CNC, setup diferenciado, inspeção 1ª peça nos dados gerais
type: feedback
---

Em PROCESSO_FABRICACAO para peças novas de baixo volume (lote <10), SEMPRE incluir nos Dados Gerais:

1. **Setup:** tempo + **taxa 1,5× produção** (ex: R$ 144,52/h no LYNX)
2. **Programação CNC:** tempo estimado (mínimo 4h = meio dia para peça nova complexa)
3. **Inspeção 1ª peça:** 0,5h para tolerâncias K6/h6
4. **Custos fixos totais:** soma de setup + prog + inspeção (rateados no lote)

**Why:** Alexandre corrigiu 2× que programação CNC é custo significativo em peças novas e não pode ser omitida. Setup tem preço diferenciado (1,5× produção) e isso deve estar visível no PROCESSO, não só no custo.

**How to apply:** Sempre que criar PROCESSO para peça nova ou lote pequeno, incluir essas 4 linhas extras na tabela de Dados Gerais, após o tempo total/peça e antes de fechar a seção. Referência: orçamento 023/2026 SPEEDMAQ SSX-460.
