---
name: Correções do Alexandre devem sobreviver a perda de contexto
description: CHECKPOINT.md DEVE ser atualizado IMEDIATAMENTE após qualquer correção — é a ÚNICA fonte que sobrevive entre sessões
type: feedback
---

Ao retomar sessão após perda de contexto, NUNCA reconstruir docs sem verificar se houve correção posterior ao CHECKPOINT.

**Why:** Em 01/04/2026, Alexandre corrigiu tempo as-built de 17,33 para 13,00 min/pç na sessão anterior. O CHECKPOINT não foi atualizado com a correção. Na retomada, os docs foram regenerados com o valor errado (17,33), desperdiçando tokens e frustrando o Alexandre.

**How to apply:**
1. Toda correção do Alexandre → atualizar CHECKPOINT.md NO MESMO INSTANTE (não no fim da sessão)
2. Ao retomar sessão: PERGUNTAR "houve alguma correção desde o último CHECKPOINT?" se o transcript anterior não for legível
3. Se o CHECKPOINT tiver data antiga, DESCONFIAR e perguntar antes de gerar docs
4. NUNCA assumir que o CHECKPOINT está atualizado — ele pode ter sido escrito ANTES de uma correção
