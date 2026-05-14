---
name: Checkpoint OBRIGATÓRIO entre fases de qualquer projeto multi-etapa
description: Entre cada fase de implementação salvar memória + checkpoint. Perda de contexto = prejuízo financeiro
type: feedback
---

**Regra:** em **TODO** projeto multi-fase (formulação custo v2, ORCAMENTISTA front/back, sync de pos-processadores, qualquer roadmap com 2+ etapas), ao concluir cada fase fazer **3 ações obrigatórias antes de iniciar a próxima**:

1. **Atualizar memória relevante** — salvar aprendizados, decisões, valores validados, justificativas
2. **Atualizar/criar CHECKPOINT.md** do projeto — estado atual, próxima fase, como retomar
3. **Confirmar ao Alexandre** — "Fase X concluída, memória + checkpoint salvos, posso prosseguir para fase X+1?"

**Why:** Alexandre disse explicitamente em 07/04/2026: *"não quero correr o risco de perda de histórico e memoria, de forma alguma, perda é igual a prejuízo"*. Cada perda de contexto entre fases custa retrabalho real e pode comprometer fatos validados (taxas, fórmulas, decisões aprovadas). O custo de salvar memória é zero; o custo de perder é alto.

**How to apply:**
- **NÃO** emendar fase X+1 direto sem fazer os 3 passos acima
- **NÃO** confiar em "lembro do contexto" — sempre persistir
- O CHECKPOINT.md deve ficar **junto ao artefato do projeto** (não no diretório raiz):
  - Formulação custo v2 → `D:\IA MALELO\banco_dados\CHECKPOINT_FORMULA_v2.md`
  - ORCAMENTISTA → `C:\Users\lasec\Documents\orcamento-lasec-hmtl\CHECKPOINT.md`
  - Pos-processadores → na pasta da máquina
- O CHECKPOINT deve conter: data, fase concluída, próxima fase, arquivos criados/modificados, decisões pendentes, comando exato para retomar.
- Esta regra **complementa** `feedback_checkpoint_95.md` (checkpoint por evento) — checkpoint por fase é mais granular ainda.
