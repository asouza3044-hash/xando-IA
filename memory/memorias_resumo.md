# MEMORIAS RESUMO (max 400 tokens)
# Versao compacta para carregamento rapido por fase

## Orcamentos Ativos
- 027/2026 SPEEDMAQ Flange Bomba CAV SSX-461 — COMPLETO (4/4+PDF, R$218,92/pç lote 5)
- 026/2026 MICROGEAR Pinhão 16 Dentes — COMPLETO
- 025/2026 MICROGEAR Eixo Z-23 — COMPLETO
- 028/2026 SPEEDMAQ Flange Bomba VE 2F SSX-462 — 4/4+PDF, R$246,28/pç lote 5
- 029/2026 SPEEDMAQ Flange Bomba VE 3F SSX-463 — 4/4+PDF, R$252,36/pç lote 5
- 030/2026 SPEEDMAQ Flange Espaç. Ford SSX-464 — 4/4+PDF, R$209,80/pç lote 5
- 031/2026 SPEEDMAQ Flange Espaç. SSX-465 — 4/4+PDF, R$173,31/pç lote 5
- 032/2026 SPEEDMAQ Engate Acopl. SSX-468 — 4/4+PDF, R$205,24/pç lote 5
- Proximo: 033/2026

## Regras Criticas (top 10)
1. SEM broca de centro — MD alto centrante direto
2. FURAR→CHANFRAR→ROSCAR (nunca inverter)
3. Furo axial = spindle direto (sem eixo C no LYNX)
4. Setup min: 1,0h (4o eixo: 2,0h)
5. Custos fixos (prog/setup/insp): TAXA 1,5× — NUNCA taxa producao
6. CIF: 25% sobre (Fixos+MOD)
7. Custo interno ≠ preco venda (planilha ≠ GRV)
8. Tempo custo: Alexandre define (cliente nao paga ineficiencia)
9. Agente DECIDE maquina autonomamente
10. Improdutivo: calcular com specs reais (LYNX ~0,3min, D760 ~1,8min)

## Taxas 2026
| Maquina | Producao | Setup 1,5× | Min |
|---------|----------|------------|-----|
| LYNX | R$96,35/h | R$144,53/h | 1,0h |
| D760-3x | R$121,49/h | R$182,24/h | 1,0h |
| D760-4x | R$151,86/h | R$227,79/h | 2,0h |

## GRV Mercado SP
- Torno CNC: R$156,28/h | Centro 3x: R$189,78/h | Centro 4x: ~R$237,23/h

## Formulas Chave
- Custos Fixos = (Setup+Prog+Insp) × Taxa_1,5×
- MOD = Qtd × (Tempo_min/60) × Taxa_producao
- CIF = 25% × (Fixos+MOD)
- PRECO = Custo_unit × 1,02 × markup × 1,10
- Preco minimo NFe = custo × 1,12
