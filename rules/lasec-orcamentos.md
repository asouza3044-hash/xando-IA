# REGRAS LASEC — CARREGAMENTO AUTOMÁTICO
# Este arquivo é auto-loaded em TODA sessão. Mantido ENXUTO.
# CÉREBRO COMPLETO: `/orcamento-lasec` (commands/orcamento-lasec.md)
# NÃO duplicar regras — o agente é a fonte única de verdade.

## PROTOCOLO INÍCIO SESSÃO (OBRIGATÓRIO)
1. LER `memory/orcamentos_estado.md`
2. LER `memory/regras_usinagem.md`
3. LER CHECKPOINT.md do orçamento em questão
4. INFORMAR: "Li memória, estamos em [estado]"
5. Para orçamento novo/em andamento: invocar `/orcamento-lasec`

## REGRAS DE SEGURANÇA (sempre ativas, mesmo sem o agente)
- **SEMPRE salvar HTML** após alteração + link file:// clicável
- **NUNCA criar HTML do zero** — copiar template aprovado
- **PROCESSO é GATE** — só gerar outros docs após aprovação Alexandre
- **Custos fixos (prog/setup/inspeção): TAXA 1,5×** — NUNCA taxa produção
- **Leadtime: 28 DDL** — NUNCA 15
- **SYNC automático** antes de dizer "pronto" (GitHub + VM Oracle)
- **PDF via script CDP** (scale 0.78) — NUNCA print-to-pdf do Edge
- **Proposta: NUNCA incluir** hora-máquina, tempo, markup, custos internos

## PARA TUDO MAIS → `/orcamento-lasec`
Taxas, fórmulas, fluxo, regras de usinagem, condições comerciais,
contato LASEC, estrutura de pasta, sync detalhado — TUDO no agente.
