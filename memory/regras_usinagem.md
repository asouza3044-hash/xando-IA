# Regras de Usinagem LASEC
# Fonte: Correcoes do Alexandre (maxima prioridade) + 25 anos producao CNC
# ATUALIZAR sempre que Alexandre corrigir algo
# Numeracao RENUMERADA em 27/07/2026 (estava com 11/14/15 duplicados e 19/20 fora de ordem
# — ver feedback_regras_usinagem_renumeracao.md). Se citar "regra N" em qualquer lugar, usar ESTA numeracao.

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

### 10. Furo em Peça Maciça — PRÉ-FURO OBRIGATÓRIO
- Material vem MACIÇO (sem furo) → OBRIGATÓRIO furar com broca Tmax primeiro
- Sequência: FURAR com broca Tmax (pré-furo) → DESBASTAR interno → ACABAR interno
- Broca Tmax: usar maior diâmetro disponível que caiba no furo final (ex: Ø29 Tmax para furo Ø52)
- NUNCA tentar desbastar furo a partir de material maciço só com inserto — impossível
- Motivo: barra de mandrilar não entra em material sólido
- Data: 04/04/2026 — correção Alexandre no orçamento 027

### 11. Carbide vs HSS
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
(Ver tambem `memory/maquinas_specs.md` — fonte mais completa, inclui GL280 e limite de ferramenta)

### LYNX 220LM com bloco retangular
- G92 S3000 (limite seguranca — desbalanceamento)
- Spindle max: 6.000 RPM (nao usar com bloco)
- Live tooling max: 6.000 RPM

### Discovery 760
- Spindle max: 7.500 RPM (ISO-40)
- Nao tem limitacao especial

### GL 280M
- Spindle max: 4.500 RPM

### Limite da FERRAMENTA (pode ser menor que o da maquina)
- Broca Ø3mm: maximo 3.000 RPM, mesmo em maquina que suporta mais (ex: D760 a 7.500)
- Sempre checar o menor dos dois limites (maquina × ferramenta) antes de aceitar o RPM calculado

### 12. Taxa Hora-Maquina com 4o Eixo
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

### 14. Custo Interno vs Preco de Venda
- **Custo interno** (planilha LASEC corrigida): para calcular custo de producao
- **GRV mercado** (pesquisa preco/hora): para validar preco de venda (referencia competitividade)
- NUNCA usar GRV como custo interno (infla custo, distorce margem)
- NUNCA usar custo interno como preco de venda (vende abaixo do mercado)
- Valores R$ 121/R$ 260 do OneDrive eram PRECOS DE VENDA ao cliente (NAO custo)
- Data: 08/03/2026

### 15. Cruzamento Custo Interno × GRV no ESTUDO_CUSTO (OBRIGATORIO)
- **O ESTUDO_CUSTO DEVE incluir seção de cruzamento custo interno vs GRV mercado**
- A diferença entre custo interno LASEC e GRV = BASE DO LUCRO
- Mostrar: taxa/h interna vs taxa/h GRV, custo total interno vs custo total GRV, diferença = margem
- É no CUSTO que começa o cruzamento, não no PREÇO_NFE
- Fonte custo interno: `custos_ferramentaria lasec.xls` aba "Custos 2026"
- Fonte GRV: tabela GRV 2024 (Torno CNC R$ 156,28 | Centro 3-eixos R$ 189,78)
- Data: 31/03/2026 (regra perdida, recuperada 01/04/2026)

### 16. Tempo para Custo vs As-Built Bruto
- **As-built bruto** (apontamento) pode incluir ineficiência operacional (operador lento, paradas não descontadas, curva de aprendizado)
- **Tempo para custo** é definido pelo Alexandre — pode ser MENOR que o as-built bruto
- Motivo: "o cliente não vai pagar pela minha ineficiência"
- Exemplo: 024/2026 MICROGEAR — as-built 17,33 min → custo 13,00 min
- **SEMPRE perguntar ao Alexandre qual tempo usar para custo quando houver grande diferença entre ciclo e as-built**
- **Regra de bolso: se o as-built divergir >1,5× do ciclo/estimativa original, PARAR e confirmar com Alexandre antes de escrever qualquer número para custo**
- Data: 31/03/2026

### 17. Autonomia na Escolha de Maquina
- **O agente DECIDE qual maquina usar com base no desenho/peca**
- Criterios: dimensoes, operacoes, complexidade, material
- Alexandre apenas CORRIGE se discordar
- NAO perguntar "qual maquina?" — DEFINIR e apresentar
- Data: 10/03/2026

### 18. Custos Fixos em Lotes Pequenos — REGRA CRITICA (PREJUIZO REAL 022/2026)
- **Lote <10 pecas: SEMPRE incluir custos fixos separados**
- **TODAS atividades fixas cobradas na TAXA SETUP (1,5× producao), NUNCA taxa producao:**
  - Programacao CNC/CAM: minimo 4,0h peca nova complexa (meio dia) — **taxa 1,5×**
  - Setup maquina: minimo 1,0h torno, 2,0h centro 4o eixo — **taxa 1,5×**
  - Inspecao 1a peca: ~0,5h por modelo (tolerancias K6/h6) — **taxa 1,5×**
  - Validacao qualidade: incluir no tempo de inspecao — **taxa 1,5×**
- **SOMENTE MOD (maquina rodando pecas) usa taxa producao**
- **Custos fixos = 60-70% do custo unitario em lotes pequenos** (confirmado 023/2026)
- NUNCA orcar lote <10 apenas com setup de maquina — incluir TODOS custos de engenharia
- **ERRO GRAVE 022/2026:** Programacao cobrada a taxa producao (R$ 96,35/h) em vez de setup (R$ 144,53/h) — causou prejuizo real ao Alexandre
- **VERIFICACAO:** Se custos fixos < 60% do custo unitario em lote <10 → PARAR e conferir taxas
- Data: 17/03/2026, CORRIGIDO CRITICAMENTE 25/03/2026

### 19. Leitura de Secao A-A em Flanges
- **Ø5 no corte A-A NAO e furo** — e a cota do REBAIXO de face (5mm de profundidade x Ø162)
- O que parece "furo Ø5" na secao e a rosca (ex: M8) vista em corte
- SEMPRE interpretar cotas da secao no contexto da geometria da peca
- Data: 17/03/2026

### 20. Reusinagem em Peca Pre-Usinada — Estrategia de Distribuicao de Etapas
- **Etapa 1 deve absorver MAXIMO POSSIVEL de operacoes** — quanto mais a peca sai pronta na 1a fixacao, menor o custo total
- **Pegar pelo Ø INTERNO grande na 1a etapa** (se geometria permitir) = estabilidade alta = passes agressivos
- **GL280 (R$86,86/h) é MAIS BARATA que LYNX (R$96,35/h)** — distribuir MOD pesado pra GL280
- **LYNX só faz o que e especialista:** furos coordenados (eixo C + live tool), ferramentas acionadas
- **Castanha customizada serve multiplas fixacoes** da mesma peca — sem custo extra de dispositivo
- **Resultado:** 3 etapas (GL280×2 + LYNX) economiza 15-25% vs 2 fixacoes na maquina cara
- Aplicado: 034/2026 MICROGEAR CUBO 1.60.20.958 — economia 21% (R$36 → R$28,59/pç)
- Data: 27/04/2026

### 21. Cláusulas a EVITAR em Proposta Comercial
- **❌ NUNCA incluir "% refugo aceitável" ou "risco compartilhado refugo" na proposta**
- Motivo: cliente pode SE APEGAR à clausula em caso de problema causado pela LASEC, virando gancho contratual contra nós
- Se houver problema real, tratar caso a caso por bom senso comercial — NAO dar gatilho contratual
- Cláusulas seguras: "material/peça fornecida pelo cliente NÃO inclusa", "controle dimensional 100%", "inspeção 1a peça inclusa"
- Aplicado: 034/2026 — Alexandre removeu clausula de refugo apos eu ter incluido
- Data: 27/04/2026

### 22. Markup Confortavel ×1,20 em Reusinagem
- **DEFAULT para reusinagem em peca pre-usinada com muita usinagem real:** markup ×1,20 (margem 20%)
- Apesar de "peça pré-usinada" sugerir markup baixo, o **VOLUME REAL DE USINAGEM** (refazer todos Ø em multiplas fixacoes) justifica markup confortavel
- NAO confundir "sem MP" com "pouco trabalho"
- Tabela markup por contexto:
  - ×1,12: ultima cartada estrategica
  - ×1,15: orcamento apertado / pegar servico
  - **×1,20: DEFAULT reusinagem com muita usinagem** ✅
  - ×1,35: parceiro recorrente padrao
  - ×1,50: peca critica/exclusiva
- Aplicado: 034/2026 — markup ×1,15 inicial → ×1,20 confortavel apos avaliacao do volume
- Data: 27/04/2026

### 23. Dispositivo de Fixação Novo — Cobrar Integral no 1º Lote
- **Fabricação de dispositivo/ferramental novo (ex: castanha customizada, gabarito) = custo fixo do lote que o originou, à taxa SETUP (1,5×)**
- Cobrar 100% no lote que motivou a fabricação, NÃO diluir/estimar em lotes futuros a priori
- Reposições futuras da mesma peça NÃO pagam esse custo de novo (dispositivo já existe) — preço cai naturalmente
- Aplicado: 048/2026 SPEEDMAQ VAP-U2003 — dispositivo D760 (3,8333h, R$698,59) cobrado integral no lote 10, decisão Alexandre 23/07/2026
- Data: 23/07/2026

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
| 10/03/2026 | Perguntar maquina ao Alexandre | Agente DECIDE a maquina autonomamente, Alexandre so corrige se necessario | Regra 17 |
| 25/03/2026 | Prog+Inspecao cobrados a taxa producao | **TODAS atividades fixas a taxa SETUP (1,5×)** — PREJUIZO REAL no 022 | Regra 18 CRITICA |
| 31/03/2026 | Usar as-built bruto (17,33) como custo | Alexandre corrigiu para 13 min — "cliente não paga ineficiência" | Regra 16 |
| 24/07/2026 | RPM broca Ø3mm estimado S8000 (nem maquina nem broca aguentam) | Corrigido para S3000 (limite real da broca) | RPM Limites (ver acima) |

## Fontes de Dados
- Planilha custos: D:\IA MALELO\banco_dados\custos_ferramentaria lasec.xls
- Specs fabricante: Sites DN Solutions (Doosan) e Romi
- Programas historicos: D:\PROG_CNC\[MAQUINA]\
