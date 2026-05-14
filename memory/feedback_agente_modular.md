---
name: SEMPRE usar agente modular (não o cheio)
description: Ao invocar /orcamento-lasec, SEMPRE carregar `orcamento-lasec-modular.md` (não `orcamento-lasec.md` nem o "- original"). É a versão mais recente, otimizada para economia de tokens.
type: feedback
originSessionId: 78bce960-93fa-46e8-b531-89ed31a98f4e
---
**Regra absoluta:** quando carregar o agente `/orcamento-lasec`, ler **`C:\Users\lasec\.claude\commands\orcamento-lasec-modular.md`** — NUNCA o cheio.

**Why:** Confirmado pelo Alexandre em 02/05/2026:
- `orcamento-lasec.md` (17 KB, Apr 1) = versão antiga, gasta tokens à toa
- `orcamento-lasec - original.md` (17 KB) = backup
- **`orcamento-lasec-modular.md`** (7 KB, Apr 5) = **última instrução, agiliza trabalho e economiza tokens** ← SEMPRE usar
- Carregar a versão errada (a cheia) é desperdício de tokens recorrente

**How to apply:**
1. Toda vez que o agente `/orcamento-lasec` for invocado → carregar SOMENTE o modular
2. Se o modular referenciar módulos externos, carregá-los sob demanda (não tudo de uma vez)
3. Se houver discrepância entre modular e cheio → modular vence (é o mais recente)
4. Aplicar a TODA sessão, sem exceção
