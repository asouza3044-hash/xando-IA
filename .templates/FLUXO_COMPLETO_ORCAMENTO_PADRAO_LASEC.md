# 🔄 FLUXO COMPLETO - ORÇAMENTO PADRÃO LASEC

**Versão:** 1.0 - Janeiro 2025
**Base:** Orçamento 008/2025 MICROGEAR TR1.07.02.033 (APROVADO)
**Status:** ✅ PADRÃO OFICIAL COMPLETO

---

## 🎯 FILOSOFIA DO FLUXO

> "Cada HTML deve ser APROVADO antes de passar para o próximo. O Processo de Fabricação é a BASE de tudo - dele derivam os custos, preços e proposta comercial. Sem processo correto, todo o resto fica errado."

---

## 📋 ORDEM OBRIGATÓRIA DE CRIAÇÃO

### Sequência que DEVE ser seguida:

```
1. PROCESSO_FABRICACAO_[CODIGO].html ← COMEÇA AQUI (FONTE DA VERDADE)
   ↓ [APROVAÇÃO OBRIGATÓRIA]

2. ESTUDO_CUSTO_FABRICACAO_[CODIGO].html ← Usa tempos do processo
   ↓ [APROVAÇÃO OBRIGATÓRIA]

3. ESTUDO_PRECO_VENDA_NFE_[CODIGO].html ← Usa custos do estudo
   ↓ [APROVAÇÃO OBRIGATÓRIA]

4. ANALISE_VIABILIDADE_LOTES_[XXX].html ← Usa preços do estudo NFe
   ↓ [APROVAÇÃO OBRIGATÓRIA]

5. ANALISE_BREAK_EVEN_[XXX].html ← Análise de rentabilidade (OPCIONAL)
   ↓ [APROVAÇÃO OBRIGATÓRIA se criado]

6. PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].html ← DOCUMENTO FINAL PARA CLIENTE
   ↓ [APROVAÇÃO OBRIGATÓRIA]

7. PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].pdf ← Conversão final
   ✅ PRONTO PARA ENVIO AO CLIENTE
```

**⚠️ REGRA DE OURO:** Só avançar para o próximo documento após aprovação do atual!

---

## 📁 ESTRUTURA DE PASTAS PADRÃO

```
D:\lasec\orcamentos\
└── 2025\
    └── [CLIENTE]\
        └── [NNN]_[CLIENTE]_[CODIGO_PECA]\
            ├── PROCESSO_FABRICACAO_[CODIGO].html
            ├── ESTUDO_CUSTO_FABRICACAO_[CODIGO].html
            ├── ESTUDO_PRECO_VENDA_NFE_[CODIGO].html
            ├── ANALISE_VIABILIDADE_LOTES_[NNN].html
            ├── ANALISE_BREAK_EVEN_[NNN].html (opcional)
            ├── PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].html
            ├── PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].pdf
            ├── converter_para_pdf.ps1
            ├── [CODIGO_PECA].STEP (se houver)
            └── desenho_tecnico_[CODIGO].pdf (se houver)
```

**Exemplo real:**
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\
```

---

## 📄 DOCUMENTO 1: PROCESSO DE FABRICAÇÃO

### Template:
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROCESSO_FABRICACAO_TR1.07.02.033.html
```

### Documentação Completa:
```
D:\lasec\.claude\knowledge\processo-fabricacao-padrao-detalhado.md
```

### Características OBRIGATÓRIAS:

#### 1. Tabela Principal (10 colunas):
| Seq | Operação | Tool | **Cód. BD** | Ferramenta | Vc (m/min) | RPM | Avanço (mm/rot) | Ciclo (min) | Descrição |
|-----|----------|------|-------------|------------|------------|-----|-----------------|-------------|-----------|

- **Coluna "Cód. BD" (6% width):** Entre Tool e Ferramenta
  - Códigos MINIPCP: `08.08.xxx` (suporte) + `08.07.xxx` (inserto)
  - Fonte: `D:\lasec\MINIPCP.csv` ou `BD MINIPCP.xlsx`
  - Formato: Quebra de linha `<br>` entre códigos

#### 2. Linhas por Operação:
- N10, N20, N30, N40, N50, N60, N80, N100...
- **NUNCA agrupar operações!**
- Uma linha por cada passo do programa

#### 3. Cores Padrão:
- **Verde (#4CAF50):** Tempo PRODUTIVO (cavaco)
- **Amarelo (#FFC107):** Tempo IMPRODUTIVO (auxiliar, troca, medição)
- **Azul (#1976D2):** TOTAL

#### 4. Subtotais Separados:
- **G55 (1º lado):** Subtotal de tempos
- **G56 (2º lado):** Subtotal de tempos
- **TOTAL GERAL:** Soma de tudo

#### 5. Box Legenda Fanuc:
- Explicar: G71, G70, G74, G75, G83, G96, G92, G50
- Fundo azul claro, borda esquerda azul

#### 6. Informações no Cabeçalho:
- Cliente, Peça, Material, Máquina
- Blank fornecido, Tempo total por peça
- Data do orçamento

### ⚠️ APROVAÇÃO OBRIGATÓRIA antes de prosseguir!

---

## 📄 DOCUMENTO 2: ESTUDO CUSTO FABRICAÇÃO

### Template:
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\ESTUDO_CUSTO_FABRICACAO_TR1.07.02.033.html
```

### Fontes de Dados:

#### Hora-Máquina (CRÍTICO):
```
Arquivo: D:\lasec\henrique\custos_ferramentaria lasec.xls
Planilha: Custos 2025 (atualizada com inflação + dissídio)
```

**Máquinas LASEC 2025:**
- 33 - DOOSAN Lynx 220LM: **R$ 83,08/h**
- 35 - ROMI GL 280M: R$ 76,95/h
- (Outros conforme planilha)

**⚠️ SEMPRE consultar a planilha atualizada!**

### Estrutura Obrigatória:

#### 1. Cabeçalho:
- Cliente, Peça, Material
- **Hora-Máquina:** R$ XX,XX/h (identificar máquina)
- Tempo setup, Tempo ciclo (do PROCESSO_FABRICACAO)

#### 2. Cálculo por Lote (mínimo 4 lotes):
- 50, 100, 200, 500 peças

**Fórmula padrão:**
```
Setup Total = 1,0h × R$ 83,08/h = R$ 83,08

MOD (Mão de Obra Direta):
  = (Qtd peças × Tempo ciclo min) ÷ 60 × Hora-máquina
  = (100 × 7,0 min) ÷ 60 × R$ 83,08/h
  = 11,67h × R$ 83,08/h
  = R$ 970,00

CIF (Custos Indiretos de Fabricação):
  = 58% × (Setup + MOD)
  = 58% × (R$ 83,08 + R$ 970,00)
  = R$ 610,79

CUSTO TOTAL = Setup + MOD + CIF
  = R$ 83,08 + R$ 970,00 + R$ 610,79
  = R$ 1.663,87

CUSTO POR PEÇA = Custo Total ÷ Quantidade
  = R$ 1.663,87 ÷ 100
  = R$ 16,64/peça
```

#### 3. Tabela Resumo:
| Lote | Setup | MOD | CIF (58%) | Custo Total | Custo/peça |
|------|-------|-----|-----------|-------------|------------|

#### 4. Observações:
- Material fornecido pelo cliente (se aplicável)
- CIF = 58% sobre (Setup + MOD)
- Valores base para precificação

### ⚠️ APROVAÇÃO OBRIGATÓRIA antes de prosseguir!

---

## 📄 DOCUMENTO 3: ESTUDO PREÇO VENDA NFe

### Template:
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\ESTUDO_PRECO_VENDA_NFE_TR1.07.02.033.html
```

### Estrutura Obrigatória:

#### 1. Cabeçalho:
- Cliente, Peça, Orçamento nº
- Data, Hora-máquina usada

#### 2. Fórmula de Precificação:

```
1. CUSTO BASE (do Estudo Custo Fabricação)
   Exemplo: R$ 16,64/peça (lote 100)

2. + PERDAS (4%)
   = R$ 16,64 × 1,04
   = R$ 17,31/peça

3. + MARKUP (30%)
   = R$ 17,31 × 1,30
   = R$ 22,50/peça

4. + IMPOSTO (Simples Nacional 10%)
   = R$ 22,50 × 1,10
   = R$ 24,76/peça ✅ PREÇO VENDA NFe
```

#### 3. Tabela de Cálculo Visual:
| Lote | Custo Base | + Perdas 4% | + Markup 30% | + Imposto 10% | **Preço NFe** |
|------|------------|-------------|--------------|---------------|---------------|

#### 4. Box Destaque por Lote:
- Investimento total = Preço NFe × Quantidade
- Lucro bruto estimado
- Margem de contribuição

#### 5. Observações Finais:
- Todos os impostos inclusos
- Pronto para faturamento
- Validade 30 dias

### ⚠️ APROVAÇÃO OBRIGATÓRIA antes de prosseguir!

---

## 📄 DOCUMENTO 4: ANÁLISE VIABILIDADE LOTES

### Template:
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\ANALISE_VIABILIDADE_LOTES_008.html
```

### Estrutura Obrigatória:

#### 1. Resumo Executivo (topo):
- Cliente, Peça, Material
- Máquina, Hora-máquina
- Recomendação: **Lote XXX peças - R$ XX,XX/peça** ⭐

#### 2. Análise Detalhada por Lote:

**Para cada lote (50, 100, 200, 500):**

```html
<div class="lote-box">
    <h3>📦 LOTE 50 PEÇAS</h3>

    💰 CUSTO DE FABRICAÇÃO
    - Setup: R$ 83,08
    - MOD: R$ XXX
    - CIF (58%): R$ XXX
    - CUSTO TOTAL: R$ XXX
    - CUSTO/PEÇA: R$ XX,XX

    💵 PRECIFICAÇÃO
    - Custo base: R$ XX,XX
    - + Perdas 4%: R$ XX,XX
    - + Markup 30%: R$ XX,XX
    - + Imposto 10%: R$ XX,XX
    - PREÇO FINAL: R$ XX,XX/peça ✅

    📊 ANÁLISE FINANCEIRA
    - Receita total: R$ XXX
    - Custo total: R$ XXX
    - Lucro bruto: R$ XXX
    - Margem: XX%

    ✅/⚠️ VIABILIDADE
    - Status e comentários
</div>
```

#### 3. Tabela Comparativa:
| Lote | Preço/peça | Custo/peça | Lucro/peça | Margem % | Investimento Total |
|------|------------|------------|------------|----------|-------------------|

#### 4. Comparação com Limite do Cliente (se fornecido):
- Nosso preço vs Limite cliente
- % Diferença
- Status competitividade

#### 5. Recomendação Final:
- Box verde destacado
- Lote recomendado com justificativa
- Vantagens estratégicas

### ⚠️ APROVAÇÃO OBRIGATÓRIA antes de prosseguir!

---

## 📄 DOCUMENTO 5: ANÁLISE BREAK EVEN (Opcional)

### Template:
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\ANALISE_BREAK_EVEN_008.html
```

### Quando Criar:
- Cliente questiona viabilidade de lotes menores
- Análise de risco necessária
- Justificar preços diferentes por lote

### Estrutura:

#### 1. Explicação Break Even:
```
Break Even = Custos Fixos ÷ (Preço Venda - Custo Variável)

Onde:
- Custos Fixos = Setup (R$ 83,08)
- Preço Venda = R$ 24,76/peça (lote 100)
- Custo Variável = R$ 15,81/peça (MOD + CIF proporcional)

Resultado: ~10 peças (ponto de equilíbrio)
```

#### 2. Interpretação:
- Abaixo de X peças: Prejuízo
- X peças: Equilíbrio (0% lucro)
- Acima de X peças: Lucro

#### 3. Tabela Break Even por Lote:
| Lote | Receita | Custo | Lucro | Margem % | Status |
|------|---------|-------|-------|----------|--------|

#### 4. Gráfico Visual (opcional):
- Linha de custos fixos
- Linha de custos totais
- Linha de receita
- Ponto de intersecção = Break Even

### ⚠️ APROVAÇÃO OBRIGATÓRIA se criado!

---

## 📄 DOCUMENTO 6: PROPOSTA COMERCIAL (HTML)

### Template:
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROPOSTA_COMERCIAL_MICROGEAR_TR1.07.02.033.html
```

### Documentação Completa:
```
D:\lasec\.templates\TEMPLATE_PROPOSTA_COMERCIAL_PADRAO_LASEC.md
```

### Características OBRIGATÓRIAS:

#### **EXATAMENTE 2 PÁGINAS!**

### PÁGINA 1:
1. Cabeçalho azul gradiente LASEC
2. Dados Fornecedor + Cliente (grid 2 colunas)
3. **[Espaço 40px]**
4. 💰 Tabela de Preços (4 lotes mínimo)
5. Observação impostos (box verde)

### PÁGINA 2:
1. 🎯 Nossa Recomendação (box verde, lote ⭐)
2. **[Espaço 40px]**
3. 📋 Condições Comerciais (tabela)
4. 📅 Validade (30 dias)
5. **[Espaço 35px]**
6. 📞 Entre em Contato (box azul, contato dourado)

### ❌ NUNCA INCLUIR:
- Hora-máquina
- Custos internos
- Metodologia de cálculo
- Seção "Por que escolher LASEC"
- Especificações técnicas detalhadas

### Fontes:
- Título (16px), Tabela headers (11px), Células (12px)
- Recomendação: título "Por que" (13px), texto (12px)
- Contato: título (16px), texto (12px)

### ⚠️ APROVAÇÃO OBRIGATÓRIA antes de gerar PDF!

---

## 📄 DOCUMENTO 7: PROPOSTA COMERCIAL (PDF)

### Script de Conversão:
```powershell
# converter_para_pdf.ps1
Write-Host "Convertendo HTML para PDF..."

$htmlFile = Get-ChildItem -Filter "PROPOSTA_COMERCIAL_*.html" | Select-Object -First 1
$pdfFile = $htmlFile.FullName -replace '\.html$', '.pdf'

$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"

if (Test-Path $chromePath) {
    Write-Host "Usando Google Chrome..."
    & $chromePath --headless --disable-gpu --print-to-pdf="$pdfFile" --print-to-pdf-no-header "$($htmlFile.FullName)"
} else {
    Write-Error "Chrome não encontrado!"
    exit 1
}

if (Test-Path $pdfFile) {
    Write-Host "PDF criado com sucesso em: $pdfFile"
    $fileSize = (Get-Item $pdfFile).Length
    Write-Host "$fileSize bytes written to file $pdfFile"
} else {
    Write-Error "Falha ao criar PDF!"
    exit 1
}
```

### Execução:
```bash
cd "[diretório do orçamento]"
powershell -ExecutionPolicy Bypass -File converter_para_pdf.ps1
```

### Validação Final:
- [ ] PDF tem exatamente 2 páginas
- [ ] Tamanho < 2 MB
- [ ] Todas as informações visíveis
- [ ] Sem quebras no meio de seções
- [ ] Box de contato destacado

### ✅ PRONTO PARA ENVIO AO CLIENTE!

---

## 📊 FONTES DE CONSULTA PERMANENTES

### 1. Hora-Máquina LASEC (CRÍTICO):
```
Arquivo: D:\lasec\henrique\custos_ferramentaria lasec.xls
Planilha: Custos 2025
Atualização: Com IPCA + Dissídio Metalúrgicos SP
```

**Máquinas Principais (2025):**
- **33 - DOOSAN Lynx 220LM:** R$ 83,08/h
- **35 - ROMI GL 280M:** R$ 76,95/h
- 28 - ROMI Centur 30D: R$ 60,48/h
- 01 - Torno Universal: R$ 38,62/h

**⚠️ SEMPRE consultar antes de calcular custos!**

### 2. Códigos MINIPCP (Ferramentas):
```
Arquivo 1: D:\lasec\MINIPCP.csv
Arquivo 2: D:\lasec\BD MINIPCP.xlsx
```

**Categorias:**
- 08.08.xxx: Suportes de ferramenta
- 08.07.xxx: Insertos
- 05.05.xxx: Pastilhas
- 10.01.xxx: Brocas

### 3. Parâmetros de Corte:
```
Fonte: Catálogos fabricantes
- Sandvik: www.sandvik.coromant.com
- Iscar: www.iscar.com
- Taegutec: www.taegutec.com
```

### 4. Materiais e Blanks:
```
Cliente fornece: Indicar no processo
LASEC fornece: Calcular custo na planilha
```

### 5. Prazo Padrão:
- Setup + Produção: 28 dias úteis após recebimento MP
- Ajustar conforme carga de máquina

### 6. Condições Comerciais Padrão:
- Pagamento: 28 DDL (dias data líquida)
- Frete: FOB LASEC (CIF consultar)
- Validade: 30 dias
- Imposto: Simples Nacional 10%

---

## ⚙️ PARÂMETROS DE CÁLCULO PADRÃO

### Custos Indiretos (CIF):
- **58%** sobre (Setup + MOD)
- Inclui: energia, depreciação, manutenção, ferramental

### Perdas:
- **4%** sobre custo base
- Cobre: retrabalho, refugo, variações

### Markup:
- **30%** sobre (custo + perdas)
- Cobre: administrativo, comercial, lucro

### Imposto:
- **10%** Simples Nacional
- Já incluso no preço final NFe

---

## 🔄 FLUXO DE APROVAÇÃO

### Para CADA documento:

```
1. CRIAR documento HTML
   ↓
2. ABRIR no navegador (Bash start)
   ↓
3. REVISAR com usuário
   ↓
4. CORRIGIR se necessário (Edit/Write)
   ↓
5. ✅ OBTER APROVAÇÃO EXPLÍCITA
   ↓
6. Só então AVANÇAR para próximo documento
```

**⚠️ NUNCA pular aprovação! NUNCA criar múltiplos documentos de uma vez!**

---

## 📝 NOMENCLATURA PADRÃO

### Arquivos:
```
PROCESSO_FABRICACAO_[CODIGO_PECA].html
ESTUDO_CUSTO_FABRICACAO_[CODIGO_PECA].html
ESTUDO_PRECO_VENDA_NFE_[CODIGO_PECA].html
ANALISE_VIABILIDADE_LOTES_[NUM_ORC].html
ANALISE_BREAK_EVEN_[NUM_ORC].html
PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO_PECA].html
PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO_PECA].pdf
```

### Pastas:
```
[NNN]_[CLIENTE]_[CODIGO_PECA]

Exemplos:
008_MICROGEAR_TR1.07.02.033
009_AUTOTECH_BH2.15.45.120
010_METALPLUS_FL3.08.25.075
```

---

## 🎯 CHECKLIST FINAL DO ORÇAMENTO

Antes de considerar o orçamento completo:

- [ ] ✅ PROCESSO_FABRICACAO criado e aprovado
- [ ] ✅ ESTUDO_CUSTO_FABRICACAO criado e aprovado
- [ ] ✅ ESTUDO_PRECO_VENDA_NFE criado e aprovado
- [ ] ✅ ANALISE_VIABILIDADE_LOTES criada e aprovada
- [ ] ✅ ANALISE_BREAK_EVEN criada e aprovada (se aplicável)
- [ ] ✅ PROPOSTA_COMERCIAL HTML criada e aprovada
- [ ] ✅ PROPOSTA_COMERCIAL PDF gerada (exatamente 2 páginas)
- [ ] ✅ Hora-máquina correta consultada na planilha
- [ ] ✅ Códigos MINIPCP incluídos no processo
- [ ] ✅ Todos os cálculos validados
- [ ] ✅ Nenhuma informação confidencial na proposta
- [ ] ✅ Arquivo PDF < 2 MB
- [ ] ✅ Cliente pode receber a proposta

---

## 🚀 EXEMPLO COMPLETO DE REFERÊNCIA

### Orçamento 008/2025 MICROGEAR TR1.07.02.033

**Localização:**
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\
```

**Arquivos:**
1. ✅ PROCESSO_FABRICACAO_TR1.07.02.033.html (245 KB)
2. ✅ ESTUDO_CUSTO_FABRICACAO_TR1.07.02.033.html (78 KB)
3. ✅ ESTUDO_PRECO_VENDA_NFE_TR1.07.02.033.html (92 KB)
4. ✅ ANALISE_VIABILIDADE_LOTES_008.html (156 KB)
5. ✅ ANALISE_BREAK_EVEN_008.html (65 KB)
6. ✅ PROPOSTA_COMERCIAL_MICROGEAR_TR1.07.02.033.html (42 KB)
7. ✅ PROPOSTA_COMERCIAL_MICROGEAR_TR1.07.02.033.pdf (1,79 MB, 2 páginas)

**Resultado:**
- Cliente: MICROGEAR
- Peça: TR1.07.02.033 (BUCHA/FLANGE)
- Material: DIN 20MnCr5 (fornecido)
- Máquina: Doosan Lynx 220LM (R$ 83,08/h)
- Tempo: 7,0 min/peça
- Preço recomendado: **R$ 24,76/peça** (lote 100) ⭐
- Status: ✅ APROVADO - Pronto para envio

**Este é o modelo perfeito a ser seguido em TODOS os orçamentos futuros!**

---

## 📚 DOCUMENTAÇÃO DE REFERÊNCIA

### Templates:
- `D:\lasec\.templates\TEMPLATE_PROPOSTA_COMERCIAL_PADRAO_LASEC.md`
- `D:\lasec\.templates\FLUXO_COMPLETO_ORCAMENTO_PADRAO_LASEC.md` (este arquivo)

### Knowledge Base:
- `D:\lasec\.claude\knowledge\processo-fabricacao-padrao-detalhado.md`

### Regras:
- `D:\lasec\.claude\rules\lasec-orcamentos.md`

### Fontes de Dados:
- `D:\lasec\henrique\custos_ferramentaria lasec.xls` (Hora-máquina)
- `D:\lasec\MINIPCP.csv` (Códigos ferramentas)
- `D:\lasec\BD MINIPCP.xlsx` (Banco de dados completo)

---

**Criado em:** 28/11/2025
**Aprovado por:** Usuário LASEC
**Base:** Orçamento 008/2025 MICROGEAR (100% completo)
**Status:** ✅ PADRÃO OFICIAL COMPLETO - Usar em TODOS os orçamentos

---

## 💡 LEMBRE-SE SEMPRE

1. **Processo de Fabricação é a FONTE DA VERDADE** - Tudo parte dele
2. **Uma aprovação por vez** - Nunca pular etapas
3. **Consultar hora-máquina atualizada** - Sempre na planilha LASEC 2025
4. **Proposta comercial = 2 páginas** - Sem informações confidenciais
5. **Qualidade > Velocidade** - Melhor demorar e fazer certo

🎯 **Vamos trabalhar com excelência!**
