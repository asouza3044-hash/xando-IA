---
name: Sempre commit e push no GitHub
description: Após qualquer alteração nos pós-processadores, sempre fazer commit e push para o GitHub automaticamente
type: feedback
---

Sempre fazer commit e push para o GitHub após qualquer alteração nos pós-processadores, sem precisar que o usuário peça.

**Why:** O usuário pediu explicitamente: "faça sempre" quando perguntei se devia fazer commit e push do D760-Fanuc.

**How to apply:** Após salvar/corrigir qualquer arquivo de pós-processador (vmid, gpp, xml, etc.), automaticamente:
1. Copiar para o repositório local (`C:/Users/alexandresouza/pos-processadores-lasec/`)
2. git add + git commit com mensagem descritiva
3. git push para o GitHub (asouza3044-hash/pos-processadores-lasec)
