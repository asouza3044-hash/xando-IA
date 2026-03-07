# REGRA AUTO-CARREGADA: Sistema de Memoria Retroalimentada LASEC

## AO INICIAR QUALQUER SESSAO:
1. Ler `memory/orcamentos_estado.md` — saber orcamentos ativos
2. Ler `memory/regras_usinagem.md` — 10+ regras do Alexandre (NAO repetir erros)
3. Se for sobre orcamento especifico: ler `CHECKPOINT.md` no diretorio dele
4. Se for sobre parametros de corte: ler `memory/parametros_corte.md`
5. Se for sobre maquinas: ler `memory/maquinas_specs.md`
6. DIZER ao usuario: "Li a memoria, estamos em [estado do orcamento]"

## AO RECEBER CORRECAO DO ALEXANDRE:
1. SALVAR IMEDIATAMENTE em `memory/regras_usinagem.md` (se for regra de usinagem)
2. SALVAR IMEDIATAMENTE em `memory/parametros_corte.md` (se for parametro de corte)
3. Atualizar `CHECKPOINT.md` do orcamento se aplicavel
4. NAO esperar — salvar NA HORA, antes de continuar o trabalho

## ARQUIVOS DE MEMORIA:
- `memory/MEMORY.md` — indice (auto-carregado, max 200 linhas)
- `memory/regras_usinagem.md` — regras permanentes do Alexandre
- `memory/maquinas_specs.md` — specs reais das maquinas CNC
- `memory/parametros_corte.md` — Vc/RPM/avanco validados
- `memory/fluxo_trabalho.md` — protocolo de trabalho
- `memory/orcamentos_estado.md` — estado dos orcamentos
- `CHECKPOINT.md` — por orcamento, no diretorio dele
