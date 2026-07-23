# Fechar Orçamento com As-Built — LASEC

Você é o agente responsável por reconciliar um orçamento LASEC já orçado (ciclo teórico/estimativa
de engenharia) com dados REAIS de produção (as-built) recém-chegados, e fechar o orçamento.

**Esta skill é fina por design — de propósito, não só de nome.** Ela NÃO reimplementa nada: a lógica de
como calcular um as-built (separar setup de produção pura, regra do gap >1,5×, etc.) vive inteira em
`/montar-processo-fabricacao` (Passo -1/Modo B), e a lógica de templates/taxas/CIF/markup/estrutura dos 6
documentos vive em `/orcamento-lasec-modular`. Esta skill só identifica o orçamento e orquestra a ordem:
processo → custo/preço → documentos finais → sync. Se algum dia a metodologia de as-built precisar mudar,
muda em UM lugar só (`/montar-processo-fabricacao`), não aqui.

## Quando usar

Alexandre diz algo como "chegou o as-built", "vamos fechar o pedido X", "acabou de finalizar a
produção da peça Y" — ele está trazendo dados reais de chão de fábrica para substituir ou validar
uma estimativa de engenharia já orçada.

## Passo 1 — Ler memória e identificar o orçamento

1. `memory/orcamentos_estado.md` — localizar o orçamento (número, diretório, estado atual)
2. Ler os documentos HTML já existentes do orçamento (`PROCESSO_FABRICACAO`, `ESTUDO_CUSTO_FABRICACAO`,
   `ESTUDO_PRECO_VENDA_NFE`, e demais se existirem) para saber a estrutura vigente (taxas, fixos, MOD,
   CIF, markup) — isso é o "antes" que será reconciliado com o "depois"

## Passo 2 — Reconciliar o PROCESSO com os dados as-built

Chamar `/montar-processo-fabricacao` em **Modo B (as-built)**, passando os dados recebidos do Alexandre
(G-code, ficha, tempo falado) e o PROCESSO existente como contexto. Essa skill cuida de: coletar os
dados, separar setup de produção pura, checar o gap vs estimativa (regra 14), cruzar ferramentas novas
com MINIPCP se necessário, e produzir o PROCESSO atualizado com a tabela de verificação preenchida —
incluindo o gate ("aprovado?") antes de qualquer coisa avançar.

**Não prosseguir para o Passo 3 sem aprovação explícita do processo reconciliado.**

## Passo 3 — Reconciliar custo e preço

Com os números validados (e aprovados) do Passo 2:
- Recalcular Custos Fixos, MOD, CIF (25% sobre Fixos+MOD) e Custo/peça no `ESTUDO_CUSTO_FABRICACAO`
- Recalcular Preço NFe no `ESTUDO_PRECO_VENDA_NFE` aplicando a MESMA fórmula de markup já usada
  (não trocar de markup sem pedido explícito)
- Marcar claramente no HTML o que é AS-BUILT REAL vs o que continua ESTIMATIVA (operação pendente)
- Atualizar tabelas comparativas por lote proporcionalmente à nova taxa real

## Passo 4 — Completar o fluxo de 6 documentos

Se o orçamento ainda não tiver os 6 documentos completos, gerar os que faltam
(`ANALISE_VIABILIDADE_LOTES`, `ANALISE_BREAK_EVEN`, `PROPOSTA_COMERCIAL`) usando SEMPRE os
templates aprovados de `D:\IA MALELO\templates\orcamento-lasec-hmtl\` (ou o orçamento de
referência `008_MICROGEAR_TR1.07.02.033` quando não houver template, ex: BREAK_EVEN) — nunca
criar HTML do zero. Isso segue exatamente as regras já definidas em `/orcamento-lasec-modular`,
não uma lógica nova.

Lembrar: `PROPOSTA_COMERCIAL` nunca expõe hora-máquina, tempo, nome de máquina, custo interno,
markup ou taxas indiretas.

## Passo 5 — Fechar

1. Atualizar `memory/orcamentos_estado.md` com o resultado as-built (custo/pç real, preço final,
   pendências restantes, data da sessão)
2. Checkpoint por evento (ver `feedback_checkpoint_95.md`)
3. SYNC nos 4 destinos (Local já é fonte de verdade + GitHub commit/push + VM Oracle via SCP +
   OneDrive via robocopy) — sempre ANTES de dizer "pronto" (`projeto_backup_infra.md`)
4. Se pedido, gerar PDF da proposta via script CDP (`D:\IA MALELO\templates\gerar_pdf_proposta.py`,
   scale 0.78) — nunca print-to-pdf do Edge

## O que esta skill explicitamente NÃO faz

- Não decide taxas, markup, CIF ou fórmulas — essas vêm de `/orcamento-lasec-modular` e
  `regras_usinagem.md`
- Não calcula o as-built em si — isso é `/montar-processo-fabricacao` Modo B (fonte única)
- Não pergunta número de OP ou fonte dos tempos — os tempos vêm do Alexandre
- Não sobrescreve custo sem confirmar quando o gap ciclo×as-built é grande
- Não fecha operações pendentes como se fossem as-built — mantém estimativa sinalizada até
  confirmação
- Não gera CUSTO/PRECO/VIABILIDADE/BREAK_EVEN/PROPOSTA antes do gate do processo ser aprovado
  explicitamente (ver `feedback_processo_gate_batch.md` — já errado 2×, não é pra ter uma 3ª vez)
