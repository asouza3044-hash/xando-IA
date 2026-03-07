# Parametros de Corte Validados LASEC
# Dados reais de producao > catalogos de fabricante > valores teoricos
# CONSULTAR antes de definir Vc/RPM/avanco em qualquer orcamento
# ATUALIZAR apos cada orcamento aprovado pelo Alexandre

## Aluminio 6351-T6 (liga mais comum LASEC)

### Furacao — Metal Duro (Carbide)
| Diametro | Vc (m/min) | RPM tipico | Avanco | Ciclo | Fonte |
|----------|-----------|------------|--------|-------|-------|
| O3,0 | 100-150 | 10600-15900 | F 0.05 | G83 | Sandvik |
| O6,2 | 100-200 | 5100-10300 | F 0.12 | G83 | Sandvik |
| O15,9 | 150-250 | 3000-5000 | F 0.15 | G83 | Orc.014 |
| O16 | 100-200 | 2000-4000 | F 0.15 | G83 | Orc.014 |
| NOTA: LYNX com bloco retangular limita RPM a 3000 (G92) |

### Furacao — HSS-Co
| Diametro | Vc (m/min) | RPM tipico | Avanco | Ciclo | Fonte |
|----------|-----------|------------|--------|-------|-------|
| O3,0 | 29-30 | 3000-3200 | F 0.05 | G83 | BD LASEC |
| O3,3 | 29 | 2800 | F 0.06 | G83/G87 | Orc.014 |
| O4,2 | 29 | 2200 | F 0.08 | G83 | Orc.014 |
| O5,0 | 30 | 1900 | F 0.10 | G83 | Orc.014 |
| NOTA: HSS em Al = Vc 29-30. NAO usar valores altos! |

### Rosqueamento — Machos HSS-E Helicoidais
| Rosca | Vc (m/min) | RPM | Avanco (=passo) | Ciclo | Fonte |
|-------|-----------|-----|-----------------|-------|-------|
| M4x0,7 | 10 | 800 | F 0.70 | G84 | BD Lubri |
| M5x0,8 | 9 | 600 | F 0.80 | G84 | BD Lubri (M5 S400 ref) |
| M6x1,0 | 9 | 500 | F 1.00 | G84 | BD Lubri |
| BSP | — | S300 | (passo BSP) | G84 | BD Lubri |
| NOTA: Vc 9-10 para machos em Al. NAO usar valores altos! |

### Mandrilamento — Carbide (inserto classe N)
| Diametro | Vc (m/min) | RPM | Avanco | Ciclo | Fonte |
|----------|-----------|-----|--------|-------|-------|
| O19,9 | 188 (ideal 300+) | 3000* | F 0.10 | G76 | Orc.014 |
| NOTA: *G92 S3000 LYNX bloco retangular. Inserto CCGT geometria positiva |

### Alargamento — HSS
| Diametro | Vc (m/min) | RPM | Avanco | Fonte |
|----------|-----------|-----|--------|-------|
| O18 | 15 | 265 | F 0.30 | Orc.014 |

### Faceamento — Carbide (fresa facear)
| Diametro | Vc (m/min) | RPM | Avanco | fz | Fonte |
|----------|-----------|-----|--------|-----|-------|
| O50 | 600 | 3800 | F 1200 | 0,063 | Sandvik Al |

### Fresamento Contorno — Carbide (fresa topo)
| Diametro | Vc (m/min) | RPM | Avanco | fz | Fonte |
|----------|-----------|-----|--------|-----|-------|
| O12 2-cortes | 283 (ideal 350+) | 7500* | F 1500 | 0,10 | Orc.014 |
| NOTA: *RPM max D760 = 7500 (spindle limit) |

### Chanfrar — Carbide
| Diametro | Vc (m/min) | RPM | Avanco | Fonte |
|----------|-----------|-----|--------|-------|
| O6 (LYNX acionada) | 75 | 4000 | F 0.05 | Orc.014 |
| O10 (Centro) | 236 | 7500 | F 500 | Orc.014 |

## Aco SAE 1020 (segundo material mais comum)
- (a preencher com dados de orcamentos futuros)

## Aco SAE 4140
- (a preencher com dados de orcamentos futuros)

## Historico de Validacao
| Orcamento | Material | Maquina | Validado | Notas |
|-----------|----------|---------|----------|-------|
| 014/2026 LUBRISYSTEM | Al 6351-T6 | LYNX + D760 | EM REVISAO | Parametros acima |
