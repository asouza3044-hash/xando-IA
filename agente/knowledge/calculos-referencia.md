# CÁLCULOS DE REFERÊNCIA - ORÇAMENTOS LASEC

## EXEMPLO COMPLETO: LIVENZA 008/2025 - Peça 2.0610.L082590

### Dados Base
- **Tempo por peça:** 3,3 minutos
- **Setup:** 0,5h (30 min)
- **Trocas de ferramenta:** 4 (T0505, T0606, T1212, T1010, T0404 = 5 ferramentas - 1)
- **Tempo improdutivo:** 4 × 20s = 1,3 min

### Composição do Tempo Total
```
Tempo produtivo:
- T0505: 0,3 min (Faceamento/desbaste)
- T0606: 0,4 min (Acabamento externo)
- T1212: 0,5 min (Furação)
- T1010: 0,5 min (Rebaixo interno)
- T0404: 0,3 min (Corte/sangramento)
TOTAL PRODUTIVO: 2,0 min

Tempo improdutivo:
- 4 trocas × 20s = 1,3 min

TEMPO TOTAL/PEÇA: 2,0 + 1,3 = 3,3 min
```

### Cálculo Lote 100 Peças

#### 1. Tempo Total de Produção
```
Setup: 0,5h
Produção: 100 pçs × 3,3min = 330min = 5,5h
TOTAL: 0,5h + 5,5h = 6,0h
```

#### 2. Custo MOD
```
Setup: 0,5h × R$ 180/h = R$ 90,00
Produção: 5,5h × R$ 120/h = R$ 660,00
TOTAL MOD: R$ 750,00
```

#### 3. Custos Indiretos (58%)
```
Base: R$ 90 + R$ 660 = R$ 750,00
Indiretos: R$ 750 × 58% = R$ 435,00
```

#### 4. Custo Total
```
Setup: R$ 90,00
MOD Produção: R$ 660,00
Indiretos: R$ 435,00
TOTAL: R$ 1.185,00
```

#### 5. Custo por Peça
```
R$ 1.185,00 / 100 = R$ 11,85/peça
```

#### 6. Preço Venda (markup 1,290)
```
R$ 11,85 × 1,290 = R$ 15,29/peça
Total NF-e: R$ 15,29 × 100 = R$ 1.529,00
Margem: ~12%
```

## FÓRMULAS RÁPIDAS

### Custo Variável por Peça
```
CVp = (Tempo_min/peça / 60) × R$ 120/h × 1,58
```
Onde 1,58 = 1 + 0,58 (indiretos)

Exemplo:
```
CVp = (3,3 / 60) × 120 × 1,58
CVp = 0,055 × 120 × 1,58
CVp = R$ 10,43/peça
```

### Custo Fixo (Setup)
```
CF = 0,5h × R$ 180/h × 1,58
CF = 90 × 1,58
CF = R$ 142,20
```

### Custo Total Lote
```
CT = CF + (CVp × Quantidade)
```

Exemplo lote 100:
```
CT = 142,20 + (10,43 × 100)
CT = 142,20 + 1.043,00
CT = R$ 1.185,20 ✓
```

## PONTO DE EQUILÍBRIO

### Fórmula
```
PE = CF / (Preço - CVp)
```

### Exemplo (preço mínimo R$ 15,00)
```
PE = 142,20 / (15,00 - 10,43)
PE = 142,20 / 4,57
PE = 31,1 ≈ 32 peças
```

Mas considerando custo fixo SEM indiretos:
```
PE = 90 / (15,00 - 10,43)
PE = 90 / 4,57
PE = 19,7 ≈ 20 peças ✓
```

## VALIDAÇÃO RÁPIDA

### Checklist de Cálculos
- [ ] Setup = R$ 180/h (NÃO R$ 120/h!)
- [ ] Produção = R$ 120/h
- [ ] Indiretos = 58% sobre (Setup + MOD)
- [ ] Tempo inclui improdutivo
- [ ] Total colunas = 100%
- [ ] Todos valores centralizados
- [ ] Ponto equilíbrio calculado

## REFERÊNCIAS EXTERNAS

### Hora-Máquina Brasil (GRV 2024)
- Centro usinagem 3 eixos SP: R$ 189,78/h
- Torno convencional SP: R$ 107,65/h
- **LASEC competitivo:** R$ 120/h

### Multiplicador Setup
- **Padrão indústria:** 1,5x a 2,0x produção
- **LASEC:** 1,5x (R$ 180/h)
