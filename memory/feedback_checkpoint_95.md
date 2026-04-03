---
name: Checkpoint 95% falhou
description: Agente NAO fez checkpoint automatico ao chegar perto do limite de tokens — Alexandre cobrou em 02/04/2026
type: feedback
---

Regra: fazer checkpoint AUTOMATICO ao sentir que a sessao esta crescendo ou chegando perto do limite de tokens.

**Why:** Na sessao de 02/04/2026, o agente gastou tokens demais analisando programa CNC e consultando bases, sem fazer checkpoint intermediario. Quando os tokens acabaram, o PROCESSO estava salvo mas o STATE e checkpoint nao. Alexandre tinha visita observando e cobrou a demora.

**How to apply:**
- Apos gerar qualquer documento HTML: IMEDIATAMENTE salvar STATE + checkpoint (antes de qualquer outra acao)
- Nao gastar tokens excessivos em analise — ser direto e eficiente
- Se a sessao ja passou de ~60% do contexto e ainda tem trabalho: checkpoint intermediario
- NUNCA deixar documento salvo sem STATE e checkpoint atualizados
