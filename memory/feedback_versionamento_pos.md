---
name: Versionamento Obrigatorio Pos-Processadores
description: SEMPRE manter historico de versoes atualizado no CHECKPOINT.md a cada Write/Edit no GPP/vmid/MAC - Alexandre exigiu isso explicitamente
type: feedback
---

# Versionamento Obrigatório — Pós-Processadores

A cada Write ou Edit em arquivo .GPP, .vmid ou .MAC:
**ATUALIZAR IMEDIATAMENTE o CHECKPOINT.md com a nova versão.**

Formato da tabela de versões:
| # | Tipo (Write/Edit) | O que mudou |

- Write completo = nova versão major (v1, v2, v3...)
- Edit parcial = incremento (v2.1, v2.2, v2.3...)

**Why:** Alexandre cobrou que o versionamento estava errado (dizia v3 quando eram 12+ alterações). Ele exigiu memória justamente para não ter que lembrar — o sistema deve rastrear tudo.

**How to apply:** Após QUALQUER modificação em arquivo de pós-processador, antes de avisar "pronto", atualizar o CHECKPOINT.md com a nova entrada na tabela de versões. Nunca pular esse passo.
