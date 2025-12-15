# 🎯 PADRÃO GLOBAL PARA ORÇAMENTOS LASEC 2025

**DOCUMENTO ÚNICO DE VERDADE** - Referência para todos os orçamentos criados por Claude Code ou agente /orcamento-lasec

---

## 📚 DIRETÓRIOS DE CONSULTA - ORDEM OBRIGATÓRIA

**Sempre consultar em ordem de prioridade:**

### **NÍVEL 0: Números de Orçamento - D:\lasec\orcamentos\2025\ ⭐ PRIMEIRA CONSULTA**

**REGRA:** Listar todos diretórios, encontrar MAIOR número, usar próximo (número + 1)
- NÃO PERGUNTAR o número - DESCOBRIR AUTOMATICAMENTE

```
D:\lasec\orcamentos\2025\
├── BBOX\011_BBOX_PP04_00002\              (Orçamento 011)
├── LIVENZA\009_LIVENZA_1.0055.0105650\    (Orçamento 009)
└── LIVENZA\011_LIVENZA_1.0055.0105650\    (Orçamento 011 - ÚLTIMO)
```

**Exemplo:** Encontrados 009, 011, 011 → Máximo 011 → **Próximo: 012/2025**

---

### **Nível 1: Programas CNC Reais**
```
D:\IA MALELO\PROG_CNC\
├── LYNX220\*.ALL          (Doosan Lynx 220LM)
├── D760\RECEBIDO\*.TXT    (Discovery 760)
├── GL280\                 (GL280 - torno)
└── GL240\                 (GL240 - torno)
```

### **Nível 2: Banco de Dados Técnicos**
```
D:\IA MALELO\banco_dados\
├── ferramentas_coromant.pdf    (Vc, RPM, avanço por material/operação)
├── ferramentas_iscar.pdf       (Especificações de ferramentas)
├── pastas_coolant.xlsx         (Fluidos por material/operação)
└── tolerancias_iso.pdf         (Validação de tolerâncias)
```

### **Nível 3: Referências Internet (se necessário)**
```
Coromant:  https://www.coromant.sandvik.com/pt-br
Iscar:     https://www.iscar.com/pt/home
Gühring:   https://www.guehring.de (brocas)
Taegutec:  https://www.taegutec.com (pastilhas)
```

### **Nível 4: Orçamentos Anteriores (Padrões e Tempos)**
```
D:\lasec\orcamentos\2025\
├── BBOX\011_BBOX_PP04_00002\          (Modelo aprovado - estrutura padrão)
├── LIVENZA\009_LIVENZA_1.0055.0105650\ (Referência anterior)
└── LIVENZA\011_LIVENZA_1.0055.0105650\ (Último orçamento - USAR COMO REFERÊNCIA)
```

**Usar para:**
- Copiar estrutura HTML aprovada
- Aprender tempos de operações similares
- Validar cálculos de custo/preço
- Copiar padrões de formatação

---

## 📋 FLUXO OBRIGATÓRIO - 6 DOCUMENTOS

```
1. PROCESSO_FABRICACAO ⚠️ [GATE APROVAÇÃO]
2. ESTUDO_CUSTO_FABRICACAO
3. ESTUDO_PRECO_VENDA_NFE
4. ANALISE_VIABILIDADE_LOTES
5. ANALISE_BREAK_EVEN
6. PROPOSTA_COMERCIAL
```

**NÃO pular etapas. NÃO prosseguir sem gate de aprovação no PROCESSO_FABRICACAO.**

---

## 🎨 TEMPLATES - DIRETÓRIO ÚNICO

**SEMPRE usar templates do diretório padronizado:**

```
D:\IA MALELO\templates\
├── PROCESSO_FABRICACAO_TORNO_CENTRO_TEMPLATE.html
├── ESTUDO_CUSTO_FABRICACAO_TEMPLATE.html
├── ESTUDO_PRECO_VENDA_NFE_TEMPLATE.html
├── ANALISE_VIABILIDADE_LOTES_TEMPLATE.html
├── PROPOSTA_COMERCIAL_TEMPLATE.html
└── simbolo lasec.jpg (✅ COPIAR PARA CADA ORÇAMENTO)
```

**REGRA ABSOLUTAMENTE CRÍTICA:**
- ✅ **NÃO criar HTML customizado** - Sempre copiar template
- ✅ **Símbolo LASEC obrigatório em TODOS** - Copiar arquivos para pasta do orçamento
- ✅ **Logo em todos documentos** - Referenciar `simbolo lasec.jpg` com src local

---

## 📁 ESTRUTURA DE PASTA PADRÃO

```
D:\lasec\orcamentos\2025\[CLIENTE]\[NUM]_[CLIENTE]_[CODIGO]\
├── PROCESSO_FABRICACAO_[CODIGO].html
├── ESTUDO_CUSTO_FABRICACAO_[CODIGO].html
├── ESTUDO_PRECO_VENDA_NFE_[CODIGO].html
├── ANALISE_VIABILIDADE_LOTES_[NUM].html
├── ANALISE_BREAK_EVEN_[NUM].html
├── PROPOSTA_COMERCIAL_[NUM]_[CLIENTE].html
└── simbolo lasec.jpg ⭐ COPIADO DO TEMPLATE DIR
```

**Exemplo real:**
```
D:\lasec\orcamentos\2025\LIVENZA\011_LIVENZA_1.0055.0105650\
├── PROCESSO_FABRICACAO_1.0055.0105650.html
├── ESTUDO_CUSTO_FABRICACAO_1.0055.0105650.html
├── ESTUDO_PRECO_VENDA_NFE_1.0055.0105650.html
├── ANALISE_VIABILIDADE_LOTES_011.html
├── ANALISE_BREAK_EVEN_011.html
├── PROPOSTA_COMERCIAL_011_LIVENZA.html
└── simbolo lasec.jpg
```

---

## 💰 PARÂMETROS LASEC 2025

### Hora-Máquina

| Máquina | R$/h | Setup (h) | Setup (R$) |
|---------|------|-----------|------------|
| **Doosan Lynx 220LM** | 105,00 | 1,5 | 157,50 |
| **Discovery 760 3-eixos** | 104,76 | 1,0 | 104,76 |
| **GL280 / GL280M** | 83,08 | 0,5 | 41,54 |
| **GL240 / GL240M** | 75,00 | 0,5 | 37,50 |

**PROCESSOS COMBINADOS:** Setup = soma dos setups de cada máquina
- Ex: Doosan + Discovery = 1,5h + 1,0h = 2,5h total = R$ 262,26

### Custos Variáveis

- **CIF (Custos Indiretos Fabricação):** 58% sobre (Setup + MOD)
- **Perdas:** 2% do custo unitário
- **Markup Comercial:** 35% (padrão para clientes recorrentes)
- **Impostos (Simples Nacional):** 10%

### Lotes Padrão

Calcular SEMPRE para: **PILOTO (10-20), 30, 50, 100, 200, 500 peças**

**Lote Recomendado:** 100 peças (melhor custo/benefício)

---

## 📊 ETAPA 1: PROCESSO_FABRICACAO

### 1.1 Coleta de Dados

```
✅ Cliente (nome completo)
✅ Código peça (ex: 1.0055.0105650-M)
✅ Número orçamento (ex: 011/2025)
✅ Material (ex: Aço SAE 8620)
✅ Máquina(s) (Doosan, GL280, Discovery, etc)
✅ Desenho/PDF
```

### 1.2 Buscar Programa CNC Real ⭐ ESSENCIAL

**Diretórios de busca:**

```
D:\IA MALELO\PROG_CNC\LYNX220\*.ALL              (Doosan)
D:\IA MALELO\PROG_CNC\D760\RECEBIDO\*.TXT        (Discovery 760)
D:\IA MALELO\PROG_CNC\GL280\                     (GL280)
D:\IA MALELO\PROG_CNC\GL240\                     (GL240)
```

**Se encontrar:** Extrair operações reais do código Fanuc
**Se não encontrar:** Estimar baseado em peça similar

### 1.3 Estrutura HTML

**Deve conter (em ordem):**

1. **Header com logo LASEC**
   - Logo deve estar local: `<img src="simbolo lasec.jpg">`

2. **Watermark LASEC**
   - CSS `body::before` com `background-image: url('simbolo lasec.jpg')`
   - Opacity 0.03, z-index -1

3. **Seção 1: DADOS GERAIS**
   - Código peça, cliente, material
   - Máquinas, programas, setup
   - Tempo total

4. **Seção 2: DIMENSÕES FINAIS**
   - Especificação técnica da peça

5. **Seção 3+: OPERAÇÕES**
   - Uma seção por máquina
   - Tabela com: Operação | Ferramenta | Pastilha | Vc/RPM | Avanço | Tempo | Obs.

6. **CRONOMETRAGEM DETALHADA**
   - Breakdown de todos tempos

7. **FERRAMENTAS NECESSÁRIAS**
   - Uma seção por máquina

8. **OBSERVAÇÕES CRÍTICAS**
   - Pontos de atenção, riscos, validações

9. **Footer com contato LASEC**

### 1.4 Cores Padrão em Tabelas

- **Verde (#28a745 ou #d4edda):** Tempo PRODUTIVO (corte com cavaco)
- **Amarelo (#ffc107 ou #fff3cd):** Tempo IMPRODUTIVO (auxiliar, troca ferramenta)
- **Azul (#1976d2):** Tempo TOTAL (subtotais)

### 1.5 Gate: Aguardar Aprovação

**NÃO PROSSEGUIR SEM APROVAÇÃO EXPLÍCITA DO USUÁRIO**

Validações esperadas:
- ✅ Sequência de operações correta
- ✅ Ferramentas adequadas
- ✅ Tempos realistas
- ✅ Máquinas corretas

---

## 💰 ETAPA 2: ESTUDO_CUSTO_FABRICACAO

### Fórmulas

```
SETUP_CUSTO = Setup_horas × Hora_máquina

MOD_LOTE = (Quantidade × Tempo_total_min) ÷ 60 × Hora_máquina

CIF_LOTE = (Setup_custo + MOD_lote) × 0,58

CUSTO_TOTAL_LOTE = Setup_custo + MOD_lote + CIF_lote

CUSTO_UNITARIO = CUSTO_TOTAL_LOTE ÷ Quantidade
```

### Lotes Obrigatórios

Calcular e exibir em tabela:

| Lote | Setup | MOD | CIF | Total | Unitário |
|------|-------|-----|-----|-------|----------|
| PILOTO (10-20) | R$ | R$ | R$ | R$ | R$ |
| 30 | R$ | R$ | R$ | R$ | R$ |
| 50 | R$ | R$ | R$ | R$ | R$ |
| **100** | R$ | R$ | R$ | R$ | **R$** |
| 200 | R$ | R$ | R$ | R$ | R$ |
| 500 | R$ | R$ | R$ | R$ | R$ |

**Recomendação:** Sempre destacar lote 100 como recomendado

---

## 💵 ETAPA 3: ESTUDO_PRECO_VENDA_NFE

### Fórmula Precificação

```
CUSTO_COM_PERDAS = CUSTO_UNITARIO × 1,02
                   (aplicar 2% de perdas)

PRECO_SEM_IMPOSTO = CUSTO_COM_PERDAS × 1,35
                    (aplicar 35% markup)

PRECO_NFE = PRECO_SEM_IMPOSTO × 1,10
            (aplicar 10% impostos Simples Nacional)
```

### Aplicação Passo a Passo

1. Pegar custo unitário de ETAPA 2
2. Multiplicar por 1,02 (perdas)
3. Multiplicar por 1,35 (markup)
4. Multiplicar por 1,10 (impostos)

### Tabela de Saída

Mesmo formato de lotes que ETAPA 2, mas com:

| Lote | Preço NFe/Peça | Total NFe |
|------|---|---|
| PILOTO (10-20) | R$ | R$ |
| 30 | R$ | R$ |
| 50 | R$ | R$ |
| **100** | **R$** | **R$** |
| 200 | R$ | R$ |
| 500 | R$ | R$ |

---

## 📊 ETAPA 4: ANALISE_VIABILIDADE_LOTES

### Análise Incluir

- Comparação custo/lote
- Economia percentual vs lote mínimo
- Recomendação clara de lote ideal
- Gráfico comparativo (barras)
- Breakdown por cenário (teste, produção regular, seriada)

### Exemplo Cálculo

```
Lote 20:  R$ 46,28/pç
Lote 100: R$ 29,71/pç  (-35,78% vs lote 20)

Economia por peça: R$ 46,28 - R$ 29,71 = R$ 16,57
```

---

## 💹 ETAPA 5: ANALISE_BREAK_EVEN

### Conceito

Quando investimento extra em lote maior se justifica economicamente?

### Fórmula

```
INVESTIMENTO_EXTRA = Total_Lote_Grande - Total_Lote_Pequeno

ECONOMIA_POR_PEÇA = Preço_Lote_Pequeno - Preço_Lote_Grande

BREAK_EVEN_PÇAS = INVESTIMENTO_EXTRA ÷ ECONOMIA_POR_PEÇA
```

### Exemplo Real (Orçamento 011 LIVENZA)

```
Lote 20:  20 pçs × R$ 70,11 = R$ 1.402,20
Lote 100: 100 pçs × R$ 45,00 = R$ 4.500,00
Diferença: +R$ 3.097,80

Economia por peça: R$ 70,11 - R$ 45,00 = R$ 25,11
Break-even: R$ 3.097,80 ÷ R$ 25,11 = 123 peças
```

**Interpretação:** Após comprar 123 peças adicionais em lote 100, recupera investimento extra.

### Cenários Incluir

1. **Teste (1º pedido):** 20 peças
2. **Primeira produção:** 20 peças
3. **Produção regular recomendada:** 100 peças a cada 2-3 meses
4. **Produção seriada:** 200-500 peças (se demanda anual > 500)

---

## 📄 ETAPA 6: PROPOSTA_COMERCIAL

### Estrutura HTML

- ✅ Logo LASEC (local reference)
- ✅ Símbolo LASEC (watermark)
- ✅ Dados cliente e fornecedor
- ✅ Especificações peça
- ✅ Tabela 5 lotes com badge "RECOMENDADO"
- ✅ Box CTA (Call-to-Action) verde
- ✅ Condições comerciais
- ✅ Contato comercial
- ✅ Validade: 30 dias
- ✅ Footer LASEC

### Remover (CONFIDENCIAL)

- ❌ Hora-máquina específica
- ❌ Tempo de fabricação (ciclo)
- ❌ Nome máquina específico
- ❌ Setup details
- ❌ CIF
- ❌ Custos internos

### Exemplos de Remoção

**ERRADO (manter confidencial):**
```
Tempo/peça: 9,25 min
Setup Doosan: 1,5h @ R$ 105/h
```

**CORRETO:**
```
Usinagem CNC de alta precisão
Programas validados em produção
```

---

## ✅ VALIDAÇÃO CRUZADA FINAL

Antes de finalizar orçamento:

- [ ] **Pasta criada** com número e código correto
- [ ] **Logo LASEC copiado** para pasta
- [ ] **Todos 6 documentos gerados** com nomes corretos
- [ ] **Tempos idênticos** em PROCESSO, CUSTO, PREÇO, VIABILIDADE, BREAK-EVEN
- [ ] **Preços idênticos** entre CUSTO → PREÇO → PROPOSTA
- [ ] **Confidenciais removidos** de PROPOSTA_COMERCIAL
- [ ] **Logo aparece** em todos 6 HTMLs
- [ ] **Lotes padrão** PILOTO (10-20), 30, 50, 100, 200, 500 em todos
- [ ] **Badge "RECOMENDADO"** apenas em lote 100
- [ ] **Setup fixo por projeto** (não varia por lote)
- [ ] **CIF = 58%** consistente
- [ ] **Markup = 35%** consistente
- [ ] **Perdas = 2%** consistente
- [ ] **Impostos = 10%** consistente

---

## 🚨 REGRAS ABSOLUTAS (NUNCA QUEBRAR)

1. **TEMPLATES** - Sempre usar D:\IA MALELO\templates\ NUNCA criar customizado
2. **SÍMBOLO LASEC** - Obrigatório em TODOS os 6 documentos
3. **LOGO LOCAL** - Copiar simbolo lasec.jpg para pasta do orçamento
4. **PROGRAMA CNC REAL** - Buscar ANTES de estimar (D:\IA MALELO\PROG_CNC\*)
5. **GATE PROCESSO** - Aguardar aprovação ANTES de prosseguir
6. **LOTES PADRÃO** - SEMPRE PILOTO (10-20), 30, 50, 100, 200, 500
7. **RECOMENDAÇÃO** - SEMPRE lote 100 (melhor custo/benefício)
8. **VALORES FIXOS** - Setup é fixo por projeto, NÃO varia por lote
9. **CIF 58%** - Sobre (Setup + MOD), NUNCA muda
10. **MARKUP 35%** - Padrão para clientes recorrentes, ajustável para novos
11. **PERDAS 2%** - Padrão, pode ajustar apenas com aprovação
12. **IMPOSTOS 10%** - Simples Nacional, aplicar por ÚLTIMO
13. **INCONSISTÊNCIA ZERO** - Mesmos valores em todos documentos
14. **CONFIDENCIAIS** - Remover de PROPOSTA, manter em ANÁLISES internas

---

## 📚 MODELO DE REFERÊNCIA APROVADO

Use como exemplo estrutura correta:

```
D:\lasec\orcamentos\2025\BBOX\011_BBOX_PP04_00002\
D:\lasec\orcamentos\2025\LIVENZA\011_LIVENZA_1.0055.0105650\
```

Todos os 6 documentos destes orçamentos seguem padrão correto de:
- Símbolo LASEC
- Templates corretos
- Estrutura padronizada
- Valores consistentes

---

## 🎯 RESPONSABILIDADE

**Claude Code (ou agente /orcamento-lasec) é responsável por:**

✅ Garantir ZERO divergência entre documentos
✅ Usar SEMPRE templates corretos
✅ Copiar SEMPRE logo LASEC
✅ Validar SEMPRE valores cruzados
✅ Remover SEMPRE confidenciais de PROPOSTA
✅ Manter SEMPRE padrões consistentes

**Se quebrar qualquer regra absoluta = RETRABALHO ZERO TOLERÂNCIA**

---

**DATA ATUALIZAÇÃO:** 15/12/2025
**VERSÃO:** 2.0.0
**STATUS:** ATIVO - TODOS ORÇAMENTOS DEVEM SEGUIR
