# 📋 TEMPLATE PADRÃO - PROPOSTA COMERCIAL LASEC

**Versão:** 1.0 - Janeiro 2025
**Base:** Orçamento 008/2025 MICROGEAR TR1.07.02.033
**Status:** ✅ APROVADO PELO USUÁRIO

---

## 🎯 CARACTERÍSTICAS ESSENCIAIS

### Layout Geral
- **Páginas:** EXATAMENTE 2 PÁGINAS (não mais, não menos)
- **Formato:** A4 (210mm)
- **Margens:** 15mm topo/baixo, 10mm laterais
- **Cores corporativas:**
  - Azul primário: #1e3c72
  - Azul secundário: #2a5298
  - Verde destaque: #28a745
  - Dourado contato: #ffd700

---

## 📄 ESTRUTURA PÁGINA 1

### 1. Cabeçalho Principal
```css
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)
padding: 20px 15px
```
- Logo LASEC (simbolo lasec.jpg)
- Nome: "LASEC USINAGEM"
- Tagline: "Usinagem de Precisão CNC"
- Título documento: "📄 PROPOSTA COMERCIAL"
- Subtítulo: Nome da peça
- Subtítulo: Orçamento Nº XXX/2025 - CLIENTE | Mês Ano
- Validade: 30 dias

### 2. Dados Fornecedor + Cliente
```css
display: grid
grid-template-columns: 1fr 1fr
gap: 15px
padding: 15px
```

**Box Fornecedor (esquerda):**
- 🏭 FORNECEDOR
- Razão Social: MALELO INDÚSTRIA E COMÉRCIO FERRAMENTAS LTDA ME
- Nome Fantasia: LASEC USINAGEM DE PRECISÃO
- CNPJ, IE, Endereço, Telefones, Email, Site

**Box Cliente (direita):**
- 🏢 CLIENTE
- Nome do cliente
- Número do orçamento
- Data, Validade, Contato

**Estilos dos boxes:**
```css
padding: 12px
border-left: 3px solid #1e3c72
font-size título: 14px
font-size texto: 11px
margin entre parágrafos: 5px
```

### 3. Espaço de Separação
```html
<div style="margin-top: 40px;"></div>
```

### 4. 💰 Tabela de Preços

**Título da seção:**
```css
font-size: 16px
margin-top: 12px
margin-bottom: 10px
border-bottom: 2px solid #1e3c72
```

**Tabela:**
- Colunas: Quantidade (Lote) | Preço Unitário | Valor Total | Economia vs Lote Menor | Prazo de Entrega
- Headers (th):
  ```css
  font-size: 11px
  padding: 10px
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)
  ```
- Células (td):
  ```css
  font-size: 12px
  padding: 8px
  ```
- Linha destaque (lote recomendado):
  ```css
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)
  border: 2px solid #28a745
  badge: ⭐ RECOMENDADO
  ```

### 5. Observação sobre Impostos
```css
background-color: #d4edda
padding: 12px
border-left: 4px solid #28a745
font-size: 10px
margin: 10px 0
```
Texto: "💡 Observação: Todos os preços já incluem impostos (Simples Nacional 10%) e estão prontos para faturamento em NFe."

---

## 📄 ESTRUTURA PÁGINA 2

### Quebra de Página
```html
<div style="page-break-before: always;"></div>
```

### 1. 🎯 Nossa Recomendação para [CLIENTE]

**Box CTA (Call-to-Action):**
```css
background: linear-gradient(135deg, #28a745 0%, #20c997 100%)
padding: 15px
border-radius: 8px
```

**Conteúdo:**
- Título: "📦 LOTE RECOMENDADO: XXX PEÇAS" (16px)
- Valor destaque: "R$ XX,XX por peça" (22px, negrito)
- Investimento Total
- Linha separadora (hr)
- "✅ Por que este lote é ideal:" (13px, negrito)
- Lista de benefícios:
  ```css
  font-size: 12px
  line-height: 1.6
  padding: 0 20px
  text-align: left
  ```
  - 🔹 Melhor custo-benefício
  - 🔹 Flexibilidade
  - 🔹 Prazo
  - 🔹 Pagamento

### 2. Espaço de Separação
```html
<div style="margin-top: 40px;"></div>
```

### 3. 📋 Condições Comerciais

**Tabela com 2 colunas:**
- Item (30% largura) | Condição (70% largura)
- Headers: 11px
- Células: 12px

**Linhas padrão:**
1. 💵 Forma de Pagamento: 28 DDL
2. ⏰ Prazo de Entrega: 28 dias após MP
3. 📦 Matéria-Prima: (especificar)
4. 📅 Validade da Proposta: 30 dias
5. ✅ Garantia de Qualidade: IT7 garantido
6. 📦 Embalagem: Caixas com proteção
7. 🚚 Frete: FOB LASEC
8. 📊 Programação de Entregas: Fracionamento possível

### 4. 📅 Validade da Proposta
```css
padding: 10px
background-color: #f8f9fa
border: 1px dashed #1e3c72
font-size: 10px
margin-top: 12px
```

### 5. Espaço de Separação (Destaque Final)
```html
<div style="margin-top: 35px;"></div>
```

### 6. 📞 Entre em Contato para Fechar Negócio!

**Box de Contato (DESTAQUE FINAL):**
```css
padding: 15px
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)
border-radius: 8px
box-shadow: 0 4px 15px rgba(0,0,0,0.2)
```

**Conteúdo:**
- Título: "📞 Entre em Contato para Fechar Negócio!" (16px, branco, uppercase)
- Informações (12px, branco):
  - Tel: (11) 3936-5041 (WhatsApp) | Tel: (11) 3935-1271
  - E-mail: compras@lasec.com.br | Site: www.lasec.com.br
  - **Contato Comercial: Alexandre Souza** (cor #ffd700 - dourado)

---

## ❌ O QUE NÃO INCLUIR (Informações Confidenciais)

### Nunca incluir na proposta ao cliente:
- ❌ Hora-máquina LASEC (R$ 83,08/h ou qualquer valor)
- ❌ Custos internos de fabricação
- ❌ Metodologia de cálculo (MOD, CIF, perdas, markup)
- ❌ Referências a planilhas internas
- ❌ Inflação/dissídio aplicados
- ❌ Custos de setup
- ❌ Tempo de usinagem por peça
- ❌ Seção "Por que escolher a LASEC"
- ❌ Especificações técnicas detalhadas da peça (já estão no desenho)
- ❌ Rodapé com dados duplicados

---

## 📐 ESPAÇAMENTOS CRÍTICOS (Garantem 2 Páginas)

### Entre seções principais:
- Dados Cliente → Tabela Preços: **40px**
- Recomendação → Condições: **40px**
- Validade → Contato: **35px**

### Margens internas (compactas):
- Section titles: `margin-top: 12px; margin-bottom: 10px`
- Tabelas: `margin: 10px 0`
- Boxes informativos: `padding: 12-15px`

### Line-heights:
- Texto corrido: 1.4-1.6
- Benefícios CTA: 1.6
- Tabelas: padrão

---

## 🎨 HIERARQUIA VISUAL

### Ordem de destaque (do maior para o menor):
1. **Valor recomendado** (22px, verde, negrito)
2. **Título "Entre em Contato"** (16px, branco, fundo azul)
3. **Títulos de seção** (16px, azul #1e3c72)
4. **Lote recomendado na tabela** (fundo verde claro, badge)
5. **Contato comercial** (dourado #ffd700)

---

## 📋 CHECKLIST PRÉ-ENTREGA

Antes de enviar ao cliente, verificar:

- [ ] PDF tem EXATAMENTE 2 páginas
- [ ] Tabela de preços está completa na página 1
- [ ] Nenhuma informação confidencial (hora-máquina, custos internos)
- [ ] Lote recomendado está destacado com ⭐
- [ ] Box de contato está visível e destacado
- [ ] Todos os valores estão corretos e consistentes
- [ ] Nome do cliente correto em todos os lugares
- [ ] Validade de 30 dias mencionada
- [ ] Layout não quebra no meio de seções
- [ ] Arquivo PDF < 2 MB (ideal)

---

## 🔧 ARQUIVOS DE REFERÊNCIA

### Template Base:
`D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROPOSTA_COMERCIAL_MICROGEAR_TR1.07.02.033.html`

### PDF Final Aprovado:
`D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROPOSTA_COMERCIAL_MICROGEAR_TR1.07.02.033.pdf`

### Script de Conversão:
`D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\converter_para_pdf.ps1`

---

## 📝 NOTAS IMPORTANTES

1. **2 PÁGINAS É MANDATÓRIO**: Se ultrapassar, reduzir espaçamentos, nunca remover informações
2. **Fundo azul no contato**: Sempre usar gradiente LASEC (#1e3c72 → #2a5298)
3. **Contato comercial em dourado**: Sempre destacar Alexandre Souza em #ffd700
4. **Lote recomendado**: Sempre marcar com ⭐ e fundo verde
5. **Sucinta e objetiva**: Cliente quer preço, prazo, condições - nada mais
6. **Separação visual**: Espaços entre seções são críticos para legibilidade

---

## 🎯 FILOSOFIA DO DESIGN

> "A proposta comercial deve ser **clara, objetiva e profissional**. O cliente precisa encontrar rapidamente: quanto custa, quando entrega, como paga. Tudo em 2 páginas, sem informações confidenciais, com destaque para a recomendação e contato fácil."

---

**Criado em:** 28/11/2025
**Aprovado por:** Usuário LASEC
**Base:** Orçamento 008/2025 MICROGEAR
**Status:** ✅ PADRÃO OFICIAL LASEC

---

## 🚀 COMO USAR ESTE TEMPLATE

Para criar uma nova proposta comercial:

1. Copiar o HTML do orçamento 008/2025 como base
2. Substituir dados do cliente e peça
3. Atualizar tabela de preços com novos valores
4. Ajustar condições comerciais específicas
5. Verificar que mantém 2 páginas
6. Gerar PDF com `converter_para_pdf.ps1`
7. Validar com checklist acima
8. Enviar ao cliente

**LEMBRE-SE:** Este formato foi aprovado e deve ser mantido em TODOS os orçamentos futuros!
