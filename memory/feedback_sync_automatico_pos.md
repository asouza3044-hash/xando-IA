---
name: Sync Automatico Pos-Processadores
description: Ao criar/atualizar pos-processador e pedir para testar, sincronizar TUDO automaticamente nos 5 destinos + commit + push + VM sem esperar o usuario pedir
type: feedback
---

# Sync Automatico — Pos-Processadores

Ao criar ou atualizar qualquer arquivo de pos-processador (.vmid, .GPP, .MAC) e pedir ao Alexandre para testar:
**FAZER TUDO AUTOMATICAMENTE antes de avisar que está pronto:**

1. Salvar nos 5 destinos:
   - `E:\pos processador\PÓS FANUC\[MAQUINA]\` (teste SolidCAM)
   - `E:\Users\Public\Documents\SolidCAM\SolidCAM2020\Gpptool\` (SolidCAM lê daqui)
   - `D:\Material SolidCAM\pos processador\` (backup local)
   - Repo git local (`C:\Users\lasec\Documents\pos-processadores-lasec\`)
   - GitHub (commit + push)
2. Atualizar CHECKPOINT.md com estado atual
3. Atualizar memória se houve aprendizado novo
4. Sync VM Oracle (SCP ou git pull via SSH)
5. SÓ ENTÃO avisar "pronto, pode testar"

**Why:** Alexandre pediu explicitamente: "qdo vc criar e atualizar e pedir para testar vc ja faz tudo automatico". Ele não quer ter que pedir sync manual — é perda de tempo e risco de esquecer.

**How to apply:** SEMPRE que modificar .vmid/.GPP/.MAC, fazer o pipeline completo de sync ANTES de avisar o usuario. Não perguntar, não esperar — fazer proativamente.
