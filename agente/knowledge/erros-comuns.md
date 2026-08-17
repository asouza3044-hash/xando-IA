# ERROS COMUNS E COMO EVITAR

## 🚨 ERROS QUE CAUSAM PREJUÍZO FINANCEIRO

### 1. SETUP COM TAXA ERRADA
**Erro:** Usar R$ 120/h para setup
**Correto:** R$ 180/h (1,5x produção)
**Impacto:** -30% no preço final
**Como evitar:** SEMPRE verificar setup = R$ 180/h antes de finalizar

---

### 2. ESQUECER TEMPO IMPRODUTIVO
**Erro:** Usar apenas tempo de corte
**Correto:** Tempo de corte + (nº ferramentas - 1) × 20s
**Impacto:** -20% a -40% no preço
**Como evitar:** Sempre perguntar "quantas ferramentas?" e calcular

---

### 3. USAR INTERVALOS EM VEZ DE VALORES EXATOS
**Erro:** "RPM: 1500 - 2500" ou "F 0.15 - F 0.25"
**Correto:** "RPM: 2500" e "F 0.25"
**Impacto:** Imprecisão de ±15% nos cálculos
**Como evitar:** Sempre pedir valores EXATOS do programa CNC

---

### 4. VALORES DIFERENTES ENTRE ARQUIVOS
**Erro:** ESTUDO_CUSTO diz R$ 11,85, PROPOSTA diz R$ 11,38
**Correto:** Valores IDÊNTICOS em todos os arquivos
**Impacto:** Contradição grave, cliente perde confiança
**Como evitar:** Validação cruzada obrigatória antes de finalizar

---

### 5. ESQUECER ARQUIVOS
**Erro:** Gerar só 4 arquivos em vez de 5
**Correto:** SEMPRE gerar os 5 arquivos
**Impacto:** Proposta incompleta, cliente não tem informação completa
**Como evitar:** Checklist dos 5 arquivos obrigatórios

---

## ⚠️ ERROS DE DIAGRAMAÇÃO

### 6. TOTAL DE COLUNAS ≠ 100%
**Erro:** Larguras somam 105% ou 95%
**Correto:** Sempre somar exatamente 100%
**Impacto:** Tabela quebrada ou desproporcional
**Como evitar:** Calcular soma antes de aplicar

---

### 7. NÃO CENTRALIZAR CÉLULAS
**Erro:** Deixar células alinhadas à esquerda
**Correto:** text-align: center em todas as células
**Impacto:** Visual ruim, difícil leitura
**Como evitar:** Aplicar centralização no <tr> do header

---

### 8. INSISTIR EM AJUSTAR PORCENTAGENS
**Erro:** Ficar tentando adivinhar larguras de colunas
**Correto:** Pedir Excel do usuário OU deixar ele ajustar
**Impacto:** Perda de tempo, frustração do usuário
**Como evitar:** Após 2 tentativas, pedir Excel ou deixar usuário ajustar

---

## 🔢 ERROS DE CÁLCULO

### 9. CUSTOS INDIRETOS ERRADOS
**Erro:** Calcular 58% só sobre MOD produção
**Correto:** 58% sobre (Setup + MOD produção)
**Impacto:** -10% no preço final
**Como evitar:** Base = Setup + MOD, depois × 58%

---

### 10. MARKUP ERRADO
**Erro:** Usar markup fixo para todos os lotes
**Correto:** Markup progressivo (1,240 → 1,408)
**Impacto:** Margem inconsistente
**Como evitar:**
- 50 pçs: 1,240
- 100 pçs: 1,290
- 200 pçs: 1,350
- 500 pçs: 1,408

---

### 11. PONTO DE EQUILÍBRIO CALCULADO ERRADO
**Erro:** Usar custo fixo COM indiretos na fórmula
**Correto:** CF = R$ 90,00 (setup sem indiretos)
**Impacto:** Ponto de equilíbrio errado
**Como evitar:** PE = 90 / (Preço - CVp)

---

## 📝 ERROS DE DOCUMENTAÇÃO

### 12. DADOS DO CLIENTE ERRADOS
**Erro:** Nome, código ou número de orçamento errado
**Correto:** Validar TODOS os dados antes de gerar
**Impacto:** Orçamento inválido, retrabalho
**Como evitar:** Confirmar com usuário antes de gerar

---

### 13. DATA ERRADA
**Erro:** Data de orçamento desatualizada
**Correto:** Usar data atual (verificar em <env>)
**Impacto:** Orçamento parece antigo
**Como evitar:** SEMPRE usar Today's date do <env>

---

### 14. CONFIDENCIALIDADE FALTANDO
**Erro:** Esquecer nota "CONFIDENCIAL - NÃO DISTRIBUIR"
**Correto:** Incluir em todos os documentos
**Impacto:** Informação pode vazar
**Como evitar:** Verificar rodapé de todos os HTMLs

---

## 🗂️ ERROS DE ESTRUTURA

### 15. PASTA COM NOME ERRADO
**Erro:** `008_LIVENZA/` ou `LIVENZA_008/`
**Correto:** `008_LIVENZA_2.0610.L082590/`
**Impacto:** Dificulta organização e busca
**Como evitar:** Padrão: [NUM]_[CLIENTE]_[CODIGO]

---

### 16. IMAGENS NÃO COPIADAS
**Erro:** Gerar HTMLs sem copiar logo/símbolo
**Correto:** Copiar imagens para pasta do orçamento
**Impacto:** HTMLs não exibem logo
**Como evitar:** Copiar antes de gerar HTMLs

---

### 17. ARQUIVOS EM PASTAS DIFERENTES
**Erro:** Cada HTML em pasta diferente
**Correto:** Todos os 5 HTMLs na mesma pasta
**Impacto:** Dificulta entrega ao cliente
**Como evitar:** Criar pasta única antes de gerar

---

## 🔄 ERROS DE PROCESSO

### 18. NÃO VALIDAR COM USUÁRIO
**Erro:** Assumir valores sem confirmar
**Correto:** Sempre perguntar quando tiver dúvida
**Impacto:** Pode fazer cálculo todo errado
**Como evitar:** "Confirma que são 5 ferramentas?"

---

### 19. NÃO FAZER VALIDAÇÃO CRUZADA
**Erro:** Gerar arquivos e declarar pronto
**Correto:** Validar valores entre arquivos
**Impacto:** Valores inconsistentes
**Como evitar:** Checklist de validação cruzada

---

### 20. NÃO ABRIR HTMLs PARA VERIFICAR
**Erro:** Confiar só no código gerado
**Correto:** Abrir cada HTML e verificar visualmente
**Impacto:** Erros visuais não detectados
**Como evitar:** Sempre abrir os 5 HTMLs ao final

---

## 📊 EXEMPLOS DE ERRO × CORRETO

### Exemplo 1: Setup
```
❌ ERRADO:
Setup: 0,5h × R$ 120/h = R$ 60,00

✅ CORRETO:
Setup: 0,5h × R$ 180/h = R$ 90,00
```

### Exemplo 2: Tempo
```
❌ ERRADO:
Tempo/peça: 2,0 min (só corte)

✅ CORRETO:
Tempo produtivo: 2,0 min
Tempo improdutivo: 1,3 min (4 trocas)
Tempo total: 3,3 min
```

### Exemplo 3: Custos Indiretos
```
❌ ERRADO:
Base: R$ 660,00 (só MOD)
Indiretos: 660 × 58% = R$ 382,80

✅ CORRETO:
Base: R$ 90 + R$ 660 = R$ 750,00
Indiretos: 750 × 58% = R$ 435,00
```

### Exemplo 4: Valores Exatos
```
❌ ERRADO:
RPM: 1500 - 2500
Avanço: F 0.15 - F 0.25

✅ CORRETO:
RPM: 2500
Avanço: F 0.25
```

---

## 🎯 COMO EVITAR TODOS ESSES ERROS

### 1. USE O CHECKLIST
Sempre seguir `.claude/knowledge/checklist-validacao-orcamento.md`

### 2. VALIDE CRUZADO
Comparar valores entre arquivos antes de finalizar

### 3. PERGUNTE QUANDO EM DÚVIDA
Melhor perguntar que errar

### 4. ABRA OS HTMLs
Verificação visual é essencial

### 5. DOCUMENTE VALORES APROVADOS
Guardar em `.claude/knowledge/valores-[CLIENTE]-[NUM]-corretos.md`

---

## 💡 LIÇÃO PRINCIPAL

**Erros em orçamentos custam dinheiro real.**

Melhor:
- ✅ Perder 5 minutos validando
- ✅ Perguntar 10 vezes
- ✅ Conferir 3 vezes

Do que:
- ❌ Enviar orçamento errado
- ❌ Causar prejuízo de R$ 1.000+
- ❌ Perder credibilidade com cliente
