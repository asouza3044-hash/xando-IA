# CHECKLIST DE VALIDAÇÃO - ORÇAMENTO FINALIZADO

## ⚠️ IMPORTANTE
Erros em orçamentos causam **PREJUÍZO FINANCEIRO REAL**.
Use este checklist para validar TODOS os valores antes de enviar ao cliente.

---

## 1. VALORES BASE ✓

### Setup e Produção
- [ ] Setup: R$ 180/h (1,5x produção) - **NUNCA R$ 120/h!**
- [ ] Produção: R$ 120/h
- [ ] Custos indiretos: 58% sobre (Setup + MOD Produção)

### Tempo de Usinagem
- [ ] Tempo por peça calculado corretamente
- [ ] Incluiu tempo improdutivo (20s × nº trocas)
- [ ] Valores EXATOS (não intervalos tipo "F 0.15 - F 0.25")

---

## 2. CÁLCULO LOTE 50 PEÇAS ✓

### ESTUDO_CUSTO_FABRICACAO
- [ ] Setup: 0,5h × R$ 180/h = **R$ 90,00**
- [ ] MOD Produção: (50 × tempo/peça ÷ 60) × R$ 120/h = **R$ _____**
- [ ] Indiretos: (90 + MOD) × 58% = **R$ _____**
- [ ] CUSTO TOTAL = **R$ _____**
- [ ] CUSTO/PEÇA = **R$ _____**

### ESTUDO_PRECO_VENDA_NFE
- [ ] Custo/peça = **R$ _____** (mesmo valor acima)
- [ ] Markup: 1,240
- [ ] Preço NF-e/peça = **R$ _____**
- [ ] Total NF-e 50pçs = **R$ _____**

### PROPOSTA_COMERCIAL
- [ ] Lote 50: **R$ _____/peça** (mesmo valor acima)
- [ ] Total: **R$ _____** (mesmo valor acima)

### ANALISE_VIABILIDADE
- [ ] Custo total lote 50 = **R$ _____** (mesmo valor ESTUDO_CUSTO)
- [ ] Custo/peça = **R$ _____** (mesmo valor)

---

## 3. CÁLCULO LOTE 100 PEÇAS ✓

### ESTUDO_CUSTO_FABRICACAO
- [ ] Setup: 0,5h × R$ 180/h = **R$ 90,00**
- [ ] MOD Produção: (100 × tempo/peça ÷ 60) × R$ 120/h = **R$ _____**
- [ ] Indiretos: (90 + MOD) × 58% = **R$ _____**
- [ ] CUSTO TOTAL = **R$ _____**
- [ ] CUSTO/PEÇA = **R$ _____**

### ESTUDO_PRECO_VENDA_NFE
- [ ] Custo/peça = **R$ _____** (mesmo valor acima)
- [ ] Markup: 1,290
- [ ] Preço NF-e/peça = **R$ _____**
- [ ] Total NF-e 100pçs = **R$ _____**

### PROPOSTA_COMERCIAL
- [ ] Lote 100: **R$ _____/peça** (mesmo valor acima)
- [ ] Total: **R$ _____** (mesmo valor acima)

### ANALISE_VIABILIDADE
- [ ] Custo total lote 100 = **R$ _____** (mesmo valor ESTUDO_CUSTO)
- [ ] Custo/peça = **R$ _____** (mesmo valor)

---

## 4. CÁLCULO LOTE 200 PEÇAS ✓

### ESTUDO_CUSTO_FABRICACAO
- [ ] Setup: 0,5h × R$ 180/h = **R$ 90,00**
- [ ] MOD Produção: (200 × tempo/peça ÷ 60) × R$ 120/h = **R$ _____**
- [ ] Indiretos: (90 + MOD) × 58% = **R$ _____**
- [ ] CUSTO TOTAL = **R$ _____**
- [ ] CUSTO/PEÇA = **R$ _____**

### ESTUDO_PRECO_VENDA_NFE
- [ ] Custo/peça = **R$ _____** (mesmo valor acima)
- [ ] Markup: 1,350
- [ ] Preço NF-e/peça = **R$ _____**
- [ ] Total NF-e 200pçs = **R$ _____**

### PROPOSTA_COMERCIAL
- [ ] Lote 200: **R$ _____/peça** (mesmo valor acima)
- [ ] Total: **R$ _____** (mesmo valor acima)

### ANALISE_VIABILIDADE
- [ ] Custo total lote 200 = **R$ _____** (mesmo valor ESTUDO_CUSTO)
- [ ] Custo/peça = **R$ _____** (mesmo valor)

---

## 5. CÁLCULO LOTE 500 PEÇAS ✓

### ESTUDO_CUSTO_FABRICACAO
- [ ] Setup: 0,5h × R$ 180/h = **R$ 90,00**
- [ ] MOD Produção: (500 × tempo/peça ÷ 60) × R$ 120/h = **R$ _____**
- [ ] Indiretos: (90 + MOD) × 58% = **R$ _____**
- [ ] CUSTO TOTAL = **R$ _____**
- [ ] CUSTO/PEÇA = **R$ _____**

### ESTUDO_PRECO_VENDA_NFE
- [ ] Custo/peça = **R$ _____** (mesmo valor acima)
- [ ] Markup: 1,408
- [ ] Preço NF-e/peça = **R$ _____**
- [ ] Total NF-e 500pçs = **R$ _____**

### PROPOSTA_COMERCIAL
- [ ] Lote 500: **R$ _____/peça** (mesmo valor acima)
- [ ] Total: **R$ _____** (mesmo valor acima)

### ANALISE_VIABILIDADE
- [ ] Custo total lote 500 = **R$ _____** (mesmo valor ESTUDO_CUSTO)
- [ ] Custo/peça = **R$ _____** (mesmo valor)

---

## 6. PONTO DE EQUILÍBRIO ✓

### Fórmula Aplicada
- [ ] PE = Setup ÷ (Preço - CVp)
- [ ] Setup = R$ 90,00 (NÃO R$ 60!)
- [ ] CVp calculado corretamente
- [ ] Preço mínimo viável definido

### ANALISE_VIABILIDADE
- [ ] Ponto de equilíbrio calculado e apresentado
- [ ] Lote mínimo viável: 50 peças
- [ ] Lote recomendado: 100 peças
- [ ] Tabela detalhada de ponto de equilíbrio (6 quantidades)

---

## 7. PROCESSO_FABRICACAO ✓

### Item 3 - DADOS TÉCNICOS DE CORTE
- [ ] Tempo total/peça correto
- [ ] Tempo improdutivo incluído
- [ ] RPM: valores EXATOS
- [ ] Avanço: valores EXATOS (não intervalos)
- [ ] Tabela centralizada
- [ ] Total colunas = 100%
- [ ] Códigos BD MINIPCP corretos

---

## 8. CONSISTÊNCIA ENTRE ARQUIVOS ✓

### Validação Cruzada
- [ ] Custo/peça IDÊNTICO em: ESTUDO_CUSTO, ESTUDO_PRECO, ANALISE_VIABILIDADE
- [ ] Preço/peça IDÊNTICO em: ESTUDO_PRECO, PROPOSTA_COMERCIAL
- [ ] Tempo/peça IDÊNTICO em: PROCESSO_FABRICACAO, ESTUDO_CUSTO, ANALISE_VIABILIDADE
- [ ] Setup R$ 90,00 em TODOS os arquivos

---

## 9. ARQUIVOS GERADOS ✓

### 5 Arquivos Obrigatórios
- [ ] PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].html
- [ ] PROCESSO_FABRICACAO_[CODIGO].html
- [ ] ESTUDO_CUSTO_FABRICACAO_[CODIGO].html
- [ ] ANALISE_VIABILIDADE_LOTES_[NUMERO].html
- [ ] ESTUDO_PRECO_VENDA_NFE_[CODIGO].html

### Informações Corretas
- [ ] Nome cliente correto
- [ ] Código peça correto
- [ ] Data correta
- [ ] Número orçamento correto
- [ ] Logo LASEC presente
- [ ] Marca d'água presente

---

## 10. CONFERÊNCIA FINAL ✓

### Antes de Enviar ao Cliente
- [ ] Abrir todos os 5 HTMLs e verificar visualmente
- [ ] Comparar valores entre arquivos lado a lado
- [ ] Verificar se setup = R$ 180/h em TODOS
- [ ] Verificar se preços batem PROPOSTA × ESTUDO_PRECO
- [ ] Verificar se custos batem ESTUDO_CUSTO × ANALISE_VIABILIDADE
- [ ] Imprimir ou salvar em PDF para arquivo

---

## ❌ ERROS FATAIS QUE CAUSAM PREJUÍZO

1. **Setup R$ 120/h** → Preço 30% menor que deveria
2. **Esquecer tempo improdutivo** → Preço 20-40% menor
3. **Usar intervalos em vez de valores exatos** → Imprecisão ±15%
4. **Valores diferentes entre arquivos** → Contradição grave
5. **Esquecer algum arquivo** → Proposta incompleta

---

## 💡 DICA FINAL

**Sempre que tiver DÚVIDA em algum valor:**
1. PARE imediatamente
2. Pergunte ao usuário
3. NÃO adivinhe ou assuma
4. Documente a resposta para próxima vez

**Melhor perder 5 minutos perguntando do que causar prejuízo de R$ 1.000+**
