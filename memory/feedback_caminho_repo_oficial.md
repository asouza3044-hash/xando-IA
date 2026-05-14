---
name: Caminho oficial do repo xando-IA (GitHub = nuvem)
description: Sempre usar C:\Users\lasec\Documents\GitHub\xando-IA\ (NÃO OneDrive). GitHub é a nuvem oficial do projeto.
type: feedback
originSessionId: 78bce960-93fa-46e8-b531-89ed31a98f4e
---
# Repo oficial xando-IA

**Caminho local:** `C:\Users\lasec\Documents\GitHub\xando-IA\`
**NÃO usar:** `C:\Users\lasec\OneDrive\Documentos\GitHub\xando-IA` (caminho legado, errado)

**Branch local:** `lasec-orcamentos-local`
**Branch remoto:** `origin/lasec-orcamentos`
**Push:** `git push origin lasec-orcamentos-local:lasec-orcamentos`

**GitHub é a nuvem oficial do projeto** — confirmado por Alexandre 02/05/2026.

## Estrutura modular (sempre nesse repo):
- `docs/SYSTEM_BLUEPRINT.md`
- `docs/RUNBOOK.md`
- `docs/TAXAS_E_REGRAS_2026.md`
- `state/STATE.json`
- `state/LAST_CHECKPOINT.md`
- `tasks/TASK.md`
- `memory/` (memórias sincronizadas)
- `.claude/rules/lasec-orcamentos.md`

## Regra:
- Toda alteração de STATE/CHECKPOINT/memória → PRIMEIRO no caminho oficial
- Sync GitHub = última etapa do orçamento (commit + push)
- VM Oracle (137.131.140.7) = backup secundário
