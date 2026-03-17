# Regras de Usinagem LASEC
# Fonte: Correcoes do Alexandre (maxima prioridade) + 25 anos producao CNC
# ATUALIZAR sempre que Alexandre corrigir algo

## Regras Permanentes (confirmadas pelo Alexandre)

### 1. Broca de Centro
- **LASEC NAO USA broca de centro** (regra absoluta)
- Usar MD alto centrante direto (metal duro)
- Motivo: MD alto centrante ja faz spotting + furacao em um passo
- Data: confirmado em multiplas sessoes

### 2. Sequencia de Operacoes para Furos Roscados
- **OBRIGATORIO: FURAR → CHANFRAR → ROSCAR**
- NUNCA: furar → roscar → chanfrar (ERRADO)
- Motivo: chanfro antes do macho garante entrada limpa, evita rebarbas na rosca
- Aplica para TODAS as maquinas (torno e centro)
- Data: 07/03/2026

### 3. Sequencia de Operacoes para Furos Simples
- **OBRIGATORIO: FURAR → CHANFRAR**
- Chanfrar sempre apos furar
- Data: 07/03/2026

### 4. Setup Minimo
- **1,0 hora para QUALQUER maquina** (regra absoluta Alexandre)
- Centro de usinagem com 4o eixo: 2,0 horas
- NAO existe setup abaixo de 1 hora
- Palavras do Alexandre: "nao existe setup abaixo de 1 hora, vamos deixar como padrao de minimo aplicado"
- Data: 06/03/2026

### 5. Operacao do Torno com Ferramenta Acionada (Doosan LYNX 220LM)
- **Furo AXIAL (face/fundo da peca):**
  - Spindle rotaciona a peca (operacao NORMAL de torno)
  - Ferramenta estacionaria no turret
  - NAO precisa eixo C
  - NAO precisa ferramenta acionada
  - Exemplos: bore central, pre-furo, furo passante no eixo Z
- **Furo RADIAL (perpendicular ao spindle):**
  - Eixo C trava o spindle no angulo desejado
  - Ferramenta acionada (M33/M35) rotaciona a ferramenta
  - G87 ciclo furacao radial
  - Exemplos: furos laterais, furos transversais
- **Furos OFF-CENTER AXIAIS (bolt circle na face):**
  - Eixo C posiciona o angulo
  - Ferramenta acionada rotaciona a broca
  - Mesmo conceito que radial (peca parada, ferramenta gira)
  - Exemplos: bolt circle 8xM4, furos fora do centro na face
- Palavras do Alexandre: "nao precisa acionar o eixo C no furo do fundo da peca no lynx, so aciona o eixo C em casos de furos radiais"
- **NOTA (07/03/2026):** Alexandre confirmou que no torno (LYNX) DIFICILMENTE usa eixo C por falta de ferramentas acionadas. Nos centros e demais maquinas, utiliza normalmente.
- Data: 06/03/2026, atualizado 07/03/2026

### 6. Ball Nose
- Raramente usado na LASEC
- Preferir fresas standard (flat end mill)
- Data: confirmado em banco de dados

### 7. Rosca BSP
- No torno: G76 com inserto de rosca
- No centro: G1002 macho rigido, S300
- Data: confirmado em BD Lubrisystem

### 8. Spot Face Profundo (>2mm)
- Fazer NA MESA do centro de usinagem
- NAO no torno
- Data: confirmado em aprendizados

### 9. Materiais HSS em Aluminio
- Broca HSS-Co: Vc 29-30 m/min (NAO usar valores altos)
- Macho HSS-E: Vc 9-10 m/min (NAO usar valores altos)
- Referencia: BD Lubrisystem (M5 S400, BSP S300)
- Data: 05/03/2026

### 10. Carbide vs HSS
- Carbide (metal duro) e 3-5x mais rapido que HSS
- Fonte: CNC Cookbook + dados reais LASEC
- SEMPRE preferir carbide quando disponivel

## Improdutivo por Maquina

### Doosan LYNX 220LM
- Turret servo 12 posicoes: **0,11s por estacao** (bidirecional)
- Troca completa (retract + index + approach): **~0,5s**
- Rapid X: 30 m/min (500 mm/s) | Rapid Z: 36 m/min (600 mm/s)
- C-axis: ~0,3s por posicao
- M33/M35 (acionada on/off): ~0,5s cada
- **NAO usar valores altos** (1 min de improdutivo = ERRADO para o LYNX)
- Calcular SEMPRE com specs reais do fabricante

### Romi Discovery 760
- ATC 22 ferramentas: **5,5s chip-to-chip** (carrossel bidirecional)
- Rapid X/Y: 30 m/min | Rapid Z: 20 m/min
- Spindle max: 7.500 RPM (ISO-40)
- 4o eixo: indexacao ~2s por posicao

### Manipulacao do Operador
- Tempo de carga/descarga/fixacao/medicao: **separar do improdutivo maquina**
- Valor tipico torno (bloco em castanha mole): ~2,0 min
- Valor tipico centro (morsa + 4o eixo): **3,0 min** (remover peca + montar proxima + fixar morsa + conferir zero)
- SEMPRE incluir como linha separada no PROCESSO_FABRICACAO

## RPM Limites por Maquina (Seguranca)

### LYNX 220LM com bloco retangular
- G92 S3000 (limite seguranca — desbalanceamento)
- Spindle max: 6.000 RPM (nao usar com bloco)
- Live tooling max: 6.000 RPM

### Discovery 760
- Spindle max: 7.500 RPM (ISO-40)
- Nao tem limitacao especial

### 11. Taxa Hora-Maquina com 4o Eixo
- **Centro de usinagem com 4o eixo: +25% sobre taxa 3 eixos**
- D760 3 eixos: R$ 121,49/h → D760 4 eixos: R$ 151,86/h
- Motivo: divisor/mesa rotativa (depreciacao), operador mais qualificado, programacao mais complexa
- Setup 4 eixos: 2,0h (vs 1,0h do 3 eixos)
- Referencia: proporcao GRV mercado SP
- Data: 08/03/2026

### 13. CIF (Custos Indiretos de Fabricacao)
- **CIF = 25% sobre (Setup + MOD)** — revisado 08/03/2026
- Era 58% — causava dupla contagem (taxa-base ja inclui energia, depreciacao, manutencao)
- CIF 25% cobre apenas: administrativo, qualidade, seguro, TI, treinamento
- Referencia mercado: 15-25% (industria geral), 35% (media manufatura EUA)
- Resultado: LASEC agora competitiva vs GRV (antes era +31% acima)
- Data: 08/03/2026

### 12. Custo Interno vs Preco de Venda
- **Custo interno** (planilha LASEC corrigida): para calcular custo de producao
- **GRV mercado** (pesquisa preco/hora): para validar preco de venda (referencia competitividade)
- NUNCA usar GRV como custo interno (infla custo, distorce margem)
- NUNCA usar custo interno como preco de venda (vende abaixo do mercado)
- Valores R$ 121/R$ 260 do OneDrive eram PRECOS DE VENDA ao cliente (NAO custo)
- Data: 08/03/2026

## Historico de Correcoes (para NAO repetir)

| Data | Erro | Correcao | Regra Gerada |
|------|------|----------|-------------|
| 03/2026 | Broca de centro no PROCESSO | Remover, usar MD alto centrante | Regra 1 |
| 03/2026 | Eixo C para furo axial | Remover, spindle direto | Regra 5 |
| 03/2026 | Furar→roscar→chanfrar | Inverter: furar→chanfrar→roscar | Regra 2 |
| 03/2026 | Setup torno 0,5h | Minimo 1,0h | Regra 4 |
| 03/2026 | Improdutivo LYNX 1,0 min | Recalcular: ~0,3 min (specs reais) | Improdutivo LYNX |
| 03/2026 | Furo O3 face frontal | Mover para face lateral (4o eixo) | Especifico peca |
| 03/2026 | HSS Vc alto em Al | Vc 29-30 broca, Vc 9-10 macho | Regra 9 |
| 03/2026 | Centro improd 1,5 min (12 trocas) | Recalcular: 1,8 min (14 trocas ATC) | Improdutivo Centro |
| 03/2026 | Centro sem manipulacao | Adicionar 3,0 min manipulacao operador | Manipulacao Centro |
| 10/03/2026 | Perguntar maquina ao Alexandre | Agente DECIDE a maquina autonomamente, Alexandre so corrige se necessario | Regra 14 |

### 14. Autonomia na Escolha de Maquina
- **O agente DECIDE qual maquina usar com base no desenho/peca**
- Criterios: dimensoes, operacoes, complexidade, material
- Alexandre apenas CORRIGE se discordar
- NAO perguntar "qual maquina?" — DEFINIR e apresentar
- Data: 10/03/2026

### 15. Custos Fixos em Lotes Pequenos (OBRIGATORIO)
- **Lote <10 pecas: SEMPRE incluir custos fixos separados**
- Programacao CNC: ~1,0h por modelo novo (CAM, simulacao, try-out)
- Setup entre modelos: ~0,5h por troca (ajustar ferramenta, re-zero)
- Inspecao 1a peca: ~0,5h por modelo (tridimensional, validar tolerancia)
- **Custos fixos = 30-50% do preco total em lotes pequenos** (referencia mercado)
- NUNCA orcar lote <10 apenas com setup de maquina — incluir TODOS custos de engenharia
- Data: 17/03/2026

### 16. Leitura de Secao A-A em Flanges
- **Ø5 no corte A-A NAO e furo** — e a cota do REBAIXO de face (5mm de profundidade x Ø162)
- O que parece "furo Ø5" na secao e a rosca (ex: M8) vista em corte
- SEMPRE interpretar cotas da secao no contexto da geometria da peca
- Data: 17/03/2026
