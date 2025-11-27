# 📋 FLUXO DE REFERÊNCIA CRUZADA - PROPOSTA COMERCIAL

## 🎯 OBJETIVO
Documentar o processo completo de criação de Proposta Comercial com **referência cruzada** a partir do Processo de Fabricação, garantindo consistência de dados em todos os documentos.

---

## 📊 ORDEM DE CRIAÇÃO DOS DOCUMENTOS

### 1️⃣ **PROCESSO_FABRICACAO** (FONTE DA VERDADE)
- **Arquivo**: `PROCESSO_FABRICACAO_[CÓDIGO].html`
- **Status**: SEMPRE CRIAR PRIMEIRO
- **Contém**: Todos os dados técnicos reais e aprovados

### 2️⃣ **ANALISE_VIABILIDADE_LOTES** (Documento Interno)
- **Arquivo**: `ANALISE_VIABILIDADE_LOTES_[NUM].html`
- **Referência**: PROCESSO_FABRICACAO
- **Contém**: Custos reais, lote mínimo, análise de viabilidade

### 3️⃣ **PROPOSTA_COMERCIAL** (Documento Cliente)
- **Arquivo**: `PROPOSTA_COMERCIAL_[CLIENTE]_[CÓDIGO].html`
- **Referência**: PROCESSO_FABRICACAO + ANALISE_VIABILIDADE
- **Contém**: Dados comerciais SEM informações confidenciais

---

## 🔗 REGRA DE OURO: REFERÊNCIA CRUZADA

### ⚠️ **TODOS OS DOCUMENTOS DEVEM TER OS MESMOS DADOS DO PROCESSO_FABRICACAO**

```
PROCESSO_FABRICACAO (fonte verdade)
    ↓
    ├─→ ANALISE_VIABILIDADE (copia dados técnicos)
    └─→ PROPOSTA_COMERCIAL (copia dados técnicos - remove confidenciais)
```

---

## 📝 DADOS QUE DEVEM SER IDÊNTICOS

### ✅ Dados Técnicos da Peça
- **Código do Desenho**: TR1.07.02.033
- **Material**: DIN 20MnCr5 (Aço de cementação)
- **Dimensões Principais**: Ø74 × 25±0,05mm altura
- **Tolerâncias Críticas**: IT7 em Ø24.83/24.87mm
- **Matéria-Prima Fornecida**: Blank Ø80×30mm

### ✅ Dados de Processo
- **Máquina**: Doosan Lynx 220LM
- **Tempo de Ciclo**: 7.0 min/peça
- **Setup**: 30 min
- **Número de Operações**: (do PROCESSO_FABRICACAO)

### ✅ Dados de Custo (calculados)
- **Custo Unitário por Lote**: (da ANALISE_VIABILIDADE)
- **Hora-Máquina Base**: R$ 148,00/h (GRV 2024)
- **Markup Aplicado**: 20% (cliente recorrente) ou 45% (padrão)
- **Imposto Simples Nacional**: 10%

---

## 🚫 INFORMAÇÕES CONFIDENCIAIS (NÃO MOSTRAR AO CLIENTE)

### ❌ Remover da PROPOSTA_COMERCIAL:
1. **Tempo de fabricação exato**: 7.0 min/peça → Usar "Torneamento CNC de Precisão"
2. **Máquina específica**: Doosan Lynx 220LM → Usar "Processo: Torneamento CNC de Precisão"
3. **Hora-máquina**: R$ 148,00/h → NÃO mencionar
4. **Custo unitário sem markup**: R$ 29,63 → NÃO mencionar
5. **Detalhes de ferramentas**: Cód. BD, Vc, RPM, avanços → NÃO mencionar
6. **Setup e tempos auxiliares**: NÃO mencionar

### ✅ Mostrar na PROPOSTA_COMERCIAL:
- Prazo de Entrega: 28 dias úteis
- Preço Final (com markup + imposto)
- Processo genérico: "Torneamento CNC de Precisão"
- Especificações dimensionais da peça
- Tolerâncias críticas (IT7)
- Material: DIN 20MnCr5

---

## 📐 PROCESSO DE CRIAÇÃO DA PROPOSTA COMERCIAL

### PASSO 1: Copiar Cabeçalho Profissional
```html
<!-- Copiar do PROCESSO_FABRICACAO: -->
- Logo LASEC (simbolo lasec.jpg)
- Cabeçalho com gradiente azul
- Nome da empresa e tagline
- Título do documento
```

### PASSO 2: Puxar Dados Técnicos do PROCESSO_FABRICACAO
**SEMPRE ler o arquivo PROCESSO_FABRICACAO para obter:**
- Material correto
- Máquina correta (para depois substituir por processo genérico)
- Tempo correto (para depois REMOVER)
- Dimensões e tolerâncias
- Matéria-prima fornecida

### PASSO 3: Puxar Custos da ANALISE_VIABILIDADE
**SEMPRE ler o arquivo ANALISE_VIABILIDADE para obter:**
- Custo unitário por lote
- Markup aplicado
- Preços finais com imposto
- Lote recomendado

### PASSO 4: Remover Informações Confidenciais
- ❌ Remover tempo de fabricação
- ❌ Substituir máquina específica por "Processo: Torneamento CNC de Precisão"
- ❌ Remover hora-máquina
- ❌ Remover detalhes de custo sem markup

### PASSO 5: Criar Tabela de Preços
```
Lote 50 peças   → R$ 42,72/pç → R$ 2.136,00
Lote 100 peças ⭐ → R$ 39,51/pç → R$ 3.951,00 (RECOMENDADO)
Lote 200 peças  → R$ 38,04/pç → R$ 7.608,00
Lote 500 peças  → R$ 37,10/pç → R$ 18.550,00
```

### PASSO 6: Otimizar Layout para PDF
**CSS para impressão profissional:**
```css
@page {
    size: A4;
    margin: 15mm 10mm; /* Margens laterais mínimas */
}

@media print {
    body { font-size: 10pt; }
    .section-title { margin-top: 15px; margin-bottom: 15px; }
    .empresa-info, .peca-especificacoes, .cta-box { page-break-inside: avoid; }
    table { font-size: 9pt; }
}
```

**Espaçamentos reduzidos:**
- Header padding: 20px 15px
- Content wrapper: 20px 15px
- Section margins: 25px
- Table margins: 20px

### PASSO 7: Gerar PDF
```powershell
# Script converter_para_pdf.ps1
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
& $chrome --headless --disable-gpu --print-to-pdf="$pdfPath" "$htmlPath"
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Antes de enviar ao cliente:
- [ ] Material está IDÊNTICO ao PROCESSO_FABRICACAO
- [ ] Dimensões estão IDÊNTICAS ao PROCESSO_FABRICACAO
- [ ] Matéria-prima fornecida está IDÊNTICA
- [ ] Tolerâncias críticas estão IDÊNTICAS
- [ ] Preços estão ATUALIZADOS da ANALISE_VIABILIDADE
- [ ] TODOS os preços na tabela E no CTA estão IGUAIS
- [ ] Tempo de fabricação foi REMOVIDO
- [ ] Máquina específica foi SUBSTITUÍDA por processo genérico
- [ ] Hora-máquina NÃO aparece no documento
- [ ] PDF foi gerado e revisado
- [ ] Layout está elegante (margens corretas, sem quebras ruins)

---

## 🎨 TEMPLATE DE CABEÇALHO PROFISSIONAL

```html
<div class="main-header">
    <div class="header-content">
        <div class="logo-container">
            <img src="simbolo lasec.jpg" alt="LASEC">
        </div>
        <div class="company-info-header">
            <div class="company-name-main">LASEC USINAGEM</div>
            <div class="company-tagline">Usinagem de Precisão CNC</div>
        </div>
    </div>
    <div class="document-title-container">
        <div class="document-title">📄 PROPOSTA COMERCIAL</div>
        <div class="document-subtitle">[NOME DA PEÇA]</div>
        <div class="document-subtitle">Orçamento Nº [NUM]/2025 - [CLIENTE] | [MÊS] 2025</div>
        <div class="document-subtitle" style="font-size: 11pt;">Validade: 30 dias a partir da data de emissão</div>
    </div>
</div>
```

---

## 💡 DICAS IMPORTANTES

### 1. SEMPRE começar pelo PROCESSO_FABRICACAO
- É a FONTE DA VERDADE
- Todos os outros documentos derivam dele
- NUNCA criar proposta sem ter o processo primeiro

### 2. Markup por Tipo de Cliente
- **Cliente recorrente/parceria**: 20% (preço mais competitivo)
- **Cliente novo/esporádico**: 45% (margem padrão)

### 3. Imposto Simples Nacional
- **Alíquota**: 10%
- **Cálculo**: Preço com markup ÷ 0.90
- Exemplo: R$ 35,56 ÷ 0.90 = R$ 39,51

### 4. Prazo de Entrega Padrão
- **28 dias úteis** após recebimento da matéria-prima
- **Pagamento**: 28 DDL (28 dias da data da NFe)

### 5. Lote Recomendado
- Geralmente **lote 100 peças** oferece melhor relação custo-benefício
- Destacar economia percentual vs lote menor
- Mostrar possibilidade de fracionamento

---

## 🔄 ROTINA PÓS-APROVAÇÃO

### Quando o cliente aprovar a proposta:
1. ✅ Criar checkpoint com toda documentação
2. ✅ Atualizar regras do agente
3. ✅ Fazer commit git com mensagem descritiva
4. ✅ Push para repositório lasec-orcamentos na nuvem
5. ✅ Arquivar PDF aprovado
6. ✅ Preparar para próximo orçamento

---

## 📂 ESTRUTURA DE ARQUIVOS PADRÃO

```
D:\lasec\orcamentos\2025\[CLIENTE]\[NUM]_[CLIENTE]_[CÓDIGO]\
├── PROCESSO_FABRICACAO_[CÓDIGO].html          ← FONTE DA VERDADE
├── ANALISE_VIABILIDADE_LOTES_[NUM].html       ← DOCUMENTO INTERNO
├── PROPOSTA_COMERCIAL_[CLIENTE]_[CÓDIGO].html ← DOCUMENTO CLIENTE
├── PROPOSTA_COMERCIAL_[CLIENTE]_[CÓDIGO].pdf  ← PDF FINAL
├── converter_para_pdf.ps1                      ← SCRIPT CONVERSÃO
└── simbolo lasec.jpg                           ← LOGO

Arquivos de suporte:
├── [DESENHO].pdf                               ← Desenho técnico cliente
└── ESTUDO_CUSTO_FABRICACAO_[CÓDIGO].html      ← Cálculos detalhados (opcional)
```

---

## 🎯 EXEMPLO COMPLETO: ORÇAMENTO 008/2025 MICROGEAR

### Dados do PROCESSO_FABRICACAO:
- **Código**: TR1.07.02.033
- **Material**: DIN 20MnCr5
- **Máquina**: Doosan Lynx 220LM
- **Tempo**: 7.0 min/peça
- **Setup**: 30 min

### Transformação para PROPOSTA_COMERCIAL:
- **Código**: TR1.07.02.033 ✅ (mantido)
- **Material**: DIN 20MnCr5 ✅ (mantido)
- **Processo**: "Torneamento CNC de Precisão" ✅ (genérico)
- **Tempo**: REMOVIDO ❌
- **Máquina específica**: REMOVIDA ❌
- **Prazo**: 28 dias úteis ✅ (adicionado)

### Preços (markup 20% + imposto 10%):
- Lote 50: R$ 42,72/pç
- Lote 100: R$ 39,51/pç ⭐
- Lote 200: R$ 38,04/pç
- Lote 500: R$ 37,10/pç

---

## 📌 LEMBRE-SE SEMPRE:

> **"REFERÊNCIA CRUZADA É OBRIGATÓRIA!"**
>
> Todo dado técnico na proposta comercial DEVE vir do PROCESSO_FABRICACAO.
> Qualquer divergência pode causar problemas de produção, custo e confiança do cliente.

---

**Criado**: Janeiro 2025
**Projeto**: Orçamento 008/2025 - MICROGEAR TR1.07.02.033
**Status**: ✅ Aprovado e Testado
