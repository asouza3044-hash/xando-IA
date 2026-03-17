# REGRAS LASEC — ORÇAMENTOS CNC (versão enxuta)
# Detalhes completos: memory/regras_usinagem.md, memory/MEMORY.md
# Backup original: .claude/BACKUP_REGRAS_2026-03-08/

## REGRA CRÍTICA: SEMPRE SALVAR HTML
- Fez alteração? → Edit/Write para SALVAR
- Após salvar → incluir link file:// clicável
- NUNCA apenas descrever sem implementar

## PROTOCOLO INÍCIO SESSÃO
1. Ler `memory/orcamentos_estado.md`
2. Ler `memory/regras_usinagem.md`
3. Ler CHECKPOINT.md do orçamento em questão
4. Informar: "Li memória, estamos em [estado]"
5. Correção do Alexandre → salvar IMEDIATAMENTE no arquivo de memória

## PROCESSO_FABRICACAO (criar PRIMEIRO)
- Tabela 10 colunas: Seq|Operação|Tool|Cód.BD|Ferramenta|Vc|RPM|Avanço|Ciclo|Descrição
- Cód. BD: MINIPCP (08.08.xxx suporte, 08.07.xxx inserto) — fonte: `D:\IA MALELO\banco_dados\`
- Cores: Verde=produtivo, Amarelo=improdutivo, Azul=total
- Subtotais por lado (G55/G56)
- Modelo: `D:\IA MALELO\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\`

## PROPOSTA COMERCIAL (documento CLIENTE)
- EXATAMENTE 2 páginas
- COPIAR template, editar só dados (NUNCA recriar layout)
- Templates: `D:\IA MALELO\templates\ORCAMENTO_PADRAO_LASEC\`

### NUNCA incluir (confidencial):
Hora-máquina, tempo fabricação, nome máquina específica, custos internos, markup, setup, taxa indiretos, metodologia cálculo

## CUSTOS (consultar memory/regras_usinagem.md para detalhes)
- Setup: R$ 180/h (1,5x produção) | Mínimo 1,0h (centro 4º eixo: 2,0h)
- Produção: R$ 120/h
- CIF: 25% sobre (Setup+MOD) — revisado 08/03/2026
- Impostos Simples: 10%
- Markup: parceiro 20%, novo 45%

## FLUXO REFERÊNCIA CRUZADA
```
PROCESSO_FABRICACAO (fonte verdade)
  ├→ ANALISE_VIABILIDADE (copia dados completos)
  └→ PROPOSTA_COMERCIAL (copia dados - remove confidenciais)
```

## CONTATO LASEC
- Rua Álvaro Silva, 233 - Limão, SP - CEP 02723-020
- Tel: (11) 3936-5041 (WhatsApp)
- Todos orçamentos: CONFIDENCIAL
