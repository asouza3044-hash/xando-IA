# REGRAS LASEC — ORÇAMENTOS CNC (versão enxuta)
# Detalhes completos: docs/TAXAS_E_REGRAS_2026.md, memory/regras_usinagem.md, memory/MEMORY.md
# Última atualização: 02/05/2026

## REGRA CRÍTICA: SEMPRE SALVAR HTML
- Fez alteração? → Edit/Write para SALVAR
- Após salvar → incluir link file:// clicável
- NUNCA apenas descrever sem implementar

## PROTOCOLO INÍCIO SESSÃO
1. Ler `state/STATE.json` (estado real do orçamento atual)
2. Ler `state/LAST_CHECKPOINT.md`
3. Ler `memory/orcamentos_estado.md`
4. Ler `memory/regras_usinagem.md`
5. Informar: "Li memória, estamos em [estado]"
6. Correção do Alexandre → salvar IMEDIATAMENTE no arquivo de memória

## AGENTE: SEMPRE USAR MODULAR
- `/orcamento-lasec` → carregar `commands/orcamento-lasec-modular.md` (7 KB)
- NUNCA carregar `orcamento-lasec.md` cheio (17 KB) — desperdiça tokens

## PROCESSO_FABRICACAO (criar PRIMEIRO — GATE)
- Tabela 10 colunas: Seq|Operação|Tool|Cód.BD|Ferramenta|Vc|RPM|Avanço|Ciclo|Descrição
- Cód. BD: MINIPCP (08.08.xxx suporte, 08.07.xxx inserto)
- Cores: Verde=produtivo, Amarelo=improdutivo, Azul=total
- Subtotais por lado (G55/G56)
- Modelo: `D:\IA MALELO\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\`
- **GATE:** Aguardar aprovação Alexandre antes de gerar outros docs

## PROPOSTA COMERCIAL (documento CLIENTE)
- **1 página** (regra PDF CDP scale 0.78)
- COPIAR template, editar só dados (NUNCA recriar layout)
- Templates: `D:\IA MALELO\templates\orcamento-lasec-hmtl\`

### NUNCA incluir (confidencial):
Hora-máquina, tempo fabricação, nome máquina específica, custos internos, markup, setup, taxa indiretos, metodologia cálculo

## CUSTOS LASEC 2026 (fonte: docs/TAXAS_E_REGRAS_2026.md)

| Máquina | Produção (MOD) | Setup/Prog/Inspeção (1,5×) | Setup mín |
|---|---|---|---|
| LYNX 220LM | R$ 96,35/h | R$ 144,53/h | 1,0h |
| D760 3-eixos | R$ 121,49/h | R$ 182,24/h | 1,0h |
| D760 4-eixos | R$ 151,86/h | R$ 227,79/h | 2,0h |

### Fórmulas:
```
Custos Fixos = (Setup + Prog + Inspeção) × Taxa_1,5×
MOD = Qtd × (Tempo/60) × Taxa_produção
CIF = 25% × (Custos_Fixos + MOD)        ← (Fixos+MOD), NÃO (Setup+MOD)
CUSTO_FAB = Fixos + MOD + CIF
PREÇO_NFe = Custo × 1,02 × markup × 1,10
Preço_min_NFe = custo × 1,12 (impostos+perdas, sem markup)
```

### Markups:
- **MICROGEAR (parceiro estratégico): 20% → ×1,3464**
- Parceiro recorrente padrão: 35% → ×1,5147
- Cliente novo: 45% → ×1,6434
- Reusinagem com volume real: 20% (default) → ×1,3464

## REGRA ANTI-ALUCINAÇÃO (incidente 035→036, 02/05/2026)
- **NUNCA copiar tempo de uma peça para outra** mesmo que sejam da mesma família/cliente
- Geometria + operações = define ciclo. Não o prefixo do código.
- Em peças com bore N7 / canal interno / chanfros internos: **DOBRAR** atenção ao tempo
- Sem dado real (programa, as-built, histórico) → **PERGUNTAR** ao Alexandre

## FLUXO REFERÊNCIA CRUZADA
```
PROCESSO_FABRICACAO (fonte verdade) ← GATE
  ├→ ESTUDO_CUSTO (cruzamento Custo Interno × GRV obrigatório)
  ├→ ESTUDO_PRECO_NFE
  ├→ ANALISE_VIABILIDADE (opcional)
  ├→ ANALISE_BREAK_EVEN (opcional)
  └→ PROPOSTA_COMERCIAL (sem dados confidenciais)
       └→ PDF (script CDP scale 0.78, 1 página)
            └→ SYNC (GitHub + VM Oracle) → PRONTO
```

## CONTATO LASEC
- Rua Álvaro Silva, 233 - Limão, SP - CEP 02723-020
- **Tel: (11) 3936-5041 (WhatsApp)** — único ativo (3935-1271 DESATIVADO)
- E-mail: orcamento@lasec.com.br
- Todos orçamentos: CONFIDENCIAL
