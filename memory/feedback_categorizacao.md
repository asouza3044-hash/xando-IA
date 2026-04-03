---
name: Regras de categorizacao financeira
description: Como categorizar transacoes - usar duvida quando nao souber, aprender ao resolver, dedup maximo na importacao
type: feedback
---

Ao importar extratos, prestar MAXIMA atencao para nao duplicar lancamentos e categorizar ANTES de lancar.

**Why:** Alexandre e desorganizado com contas e precisa confiar que o sistema esta correto. Duplicatas e categorias erradas destroem a confianca.

**How to apply:**
- SEMPRE mostrar preview com categorias ANTES de confirmar importacao
- Dedup por (data, valor, tipo) — checado contra BD inteiro
- Quando nao souber categorizar → usar "duvida" (NUNCA "outros" generico)
- Ao resolver uma duvida, usar /api/categorias/aprender para ensinar o sistema
- O sistema salva regras em regras_aprendidas.json e recategoriza automaticamente
- Normalizar acentos na comparacao (Natalia = Natália)
- Keywords curtas (<4 chars) sao proibidas — risco de falso positivo (ex: 'merci' em 'comercio')
