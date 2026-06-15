---
name: Checkpoint por evento — NÃO por token
description: Agente NÃO consegue medir tokens próprios. Checkpoint obrigatório POR EVENTO, não por percentual.
type: feedback
---

PROBLEMA RECORRENTE: regra "checkpoint ao atingir 95% dos tokens" NUNCA funcionou porque o agente não tem acesso ao próprio contador de tokens. Alexandre cobrou múltiplas vezes (02/04, 05/04/2026).

SOLUÇÃO: checkpoint POR EVENTO, não por percentual.

**Checkpoints OBRIGATÓRIOS (imediatos, sem exceção):**
1. Após salvar QUALQUER documento HTML → STATE + CHECKPOINT
2. Após aprovação do Alexandre em qualquer etapa
3. Após correção do Alexandre (regra de usinagem, tempo, etc.)
4. Após completar cada fase do fluxo (processo/custo/preço/proposta)
5. Após SYNC (GitHub/VM)
6. A cada 3 tool calls de Write/Edit em documentos do orçamento

**Formato checkpoint mínimo (3 linhas):**
```
027/2026 SPEEDMAQ SSX-461 | FASE: CUSTO | 2/4 docs | próximo: PRECO
```

**Why:** O agente não tem API para medir tokens. Checkpoints por evento são determinísticos e confiáveis. Checkpoints por % são impossíveis de implementar.

**How to apply:** Após cada evento listado acima, IMEDIATAMENTE atualizar STATE.json + LAST_CHECKPOINT.md ANTES de qualquer outra ação. Se perder contexto entre eventos, o checkpoint anterior garante retomada.
