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
- Data: 06/03/2026

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
- Valor tipico centro (morsa): a definir por peca
- SEMPRE incluir como linha separada no PROCESSO_FABRICACAO

## RPM Limites por Maquina (Seguranca)

### LYNX 220LM com bloco retangular
- G92 S3000 (limite seguranca — desbalanceamento)
- Spindle max: 6.000 RPM (nao usar com bloco)
- Live tooling max: 6.000 RPM

### Discovery 760
- Spindle max: 7.500 RPM (ISO-40)
- Nao tem limitacao especial

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
