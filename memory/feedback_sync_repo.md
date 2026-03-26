---
name: Sync Repo + Backup VM — IMPERATIVO AUTOMATICO
description: SEMPRE commit+push+backup VM ao finalizar trabalho. NUNCA esperar o usuario pedir. Falhou em 25/03/2026 no 023 — Alexandre cobrou de novo.
type: feedback
---

SEMPRE sincronizar os 3 destinos após mudanças significativas:
1. **GitHub xando-IA** — commit + push (memórias, regras, templates)
2. **VM Oracle** — scp backup (orçamentos + memórias)
3. **OneDrive** — auto-sync via pasta local

**NAO esperar o usuário pedir — fazer proativamente. IMPERATIVO.**

**Why:** Alexandre já cobrou DUAS vezes:
- 17/03/2026: repo ficou desatualizado 03/03→17/03 sem push
- 25/03/2026: orçamento 023 finalizado, PDF aprovado, e eu NÃO fiz o sync automaticamente

**How to apply:**
- Sync é a ÚLTIMA etapa de qualquer tarefa com mudanças — fazer ANTES de dizer "pronto"
- Se PDF foi gerado e aprovado → sync IMEDIATAMENTE
- Branch xando-IA: `lasec-orcamentos-local` → push `origin/lasec-orcamentos`
- Copiar memórias de `.claude/projects/.../memory/` para `xando-IA/memory/`
- scp orçamentos para `ubuntu@137.131.140.7:/home/ubuntu/backup_lasec/`
- Mensagens de commit descritivas
- **NUNCA MAIS esquecer — é a 2ª vez que Alexandre cobra**
