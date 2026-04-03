# TAXAS_E_REGRAS_2026 - Agente Orcamento LASEC

## Taxas LASEC 2026

| Maquina | Producao (MOD) | Setup/Prog/Inspecao (1,5x) | Setup minimo |
|---------|----------------|----------------------------|--------------|
| LYNX 220LM | R$ 96,35/h | R$ 144,53/h | 1,0h |
| D760 3-eixos | R$ 121,49/h | R$ 182,24/h | 1,0h |
| D760 4-eixos | R$ 151,86/h | R$ 227,79/h | 2,0h |

---

## Regras criticas de custos fixos
- Programacao CNC usa taxa 1,5x
- Inspecao 1a peca usa taxa 1,5x
- Setup usa taxa 1,5x
- Somente MOD usa taxa de producao
- Programacao de peca nova complexa: minimo 4h
- Inspecao com tolerancias K6/h6: minimo 0,5h
- Setup minimo:
  - maquinas padrao: 1,0h
  - 4o eixo: 2,0h

---

## Formulas de custo

```text
Custos Fixos = (Setup_h + Prog_h + Inspecao_h) x Taxa_1,5x
MOD_lote = Qtd x (Tempo_total_min / 60) x Taxa_producao
CIF = 25% x (Custos_Fixos + MOD_lote)
CUSTO_FABRICACAO = Custos_Fixos + MOD + CIF
CUSTO_UNITARIO = CUSTO_FABRICACAO / Qtd
PRECO = CUSTO_UNITARIO x 1,02 x markup x 1,10
Preco minimo NFe = custo interno x 1,12
```
