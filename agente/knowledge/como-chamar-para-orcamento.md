# COMO CHAMAR O CLAUDE PARA ORÇAMENTO

## 🎯 FORMAS DE SOLICITAR

### Opção 1: Comando Direto
```
/calcular-orcamento LIVENZA 2.0610.L082590
```

### Opção 2: Frase Natural
```
Preciso criar orçamento para LIVENZA - peça 2.0610.L082590
```

### Opção 3: Contextual
```
Novo orçamento 009/2026 - Cliente XPTO - Peça ABC.123.DEF
```

### Opção 4: Com Dados Já Prontos
```
Gerar orçamento CLIENTE XXX peça YYY com os seguintes dados:
- Tempo/peça: 4,5 min
- 6 ferramentas
- Programas CNC em anexo
```

---

## 📋 O QUE VOU PERGUNTAR

Prepare estas informações ANTES de me chamar:

### Dados Essenciais
1. **Nome do cliente**
2. **Código da peça**
3. **Número do orçamento** (ex: 009/2026)
4. **Tempo por operação** (de cada ferramenta)
5. **Número de ferramentas** (para calcular tempo improdutivo)

### Dados de Ferramental (Item 3)
Para cada ferramenta, preciso de:
- Código ferramenta (T0101, T0202, etc)
- Tipo (WR.4, VR.2, Broca, etc)
- Código BD Suporte
- Nome do Suporte
- Código BD Pastilha
- Nome da Pastilha
- RPM (valor EXATO)
- Avanço (valor EXATO, ex: F 0.25)
- Tempo da operação (em minutos)
- Descrição (ex: "Faceamento externo")

### Opcional (tem padrão)
- Material: SAE 1020 (cliente fornece)
- Acabamento: Zincagem (cliente providencia)
- Máquina: Doosan Lynx 220 LM
- Setup: 0,5h (30 minutos)

---

## ✅ CHECKLIST ANTES DE ME CHAMAR

- [ ] Tenho o código da peça
- [ ] Tenho o nome do cliente
- [ ] Tenho os tempos de cada operação OU programa CNC
- [ ] Sei quantas ferramentas são usadas
- [ ] Tenho os códigos BD (ou acesso à planilha BD MINIPCP)
- [ ] Sei RPM e Avanço de cada ferramenta

---

## ⚠️ SE FALTAR ALGUMA INFORMAÇÃO

**NÃO TEM PROBLEMA!**

Me chame mesmo assim. Vou perguntar o que falta.

Exemplo:
```
Você: "Preciso orçamento LIVENZA peça 2.0610.L082590"
Claude: "Entendido! Preciso dos seguintes dados:
1. Número do orçamento (XXX/2026)?
2. Tempo de cada operação de usinagem?
3. Quantas ferramentas são usadas?
..."
```

---

## 🚫 O QUE NÃO FAZER

❌ "Faz igual ao último"
   → Cada peça tem tempos e ferramentas diferentes

❌ "Usa valores aproximados"
   → Preciso de valores EXATOS

❌ "Deixa assim mesmo, depois corrijo"
   → Erro em orçamento = prejuízo real

---

## 📊 O QUE VOU ENTREGAR

Ao final, você terá:

1. **5 arquivos HTML profissionais:**
   - PROPOSTA_COMERCIAL (para enviar ao cliente)
   - PROCESSO_FABRICACAO (técnico detalhado)
   - ESTUDO_CUSTO (custos por lote)
   - ANALISE_VIABILIDADE (ponto de equilíbrio)
   - ESTUDO_PRECO_VENDA (preços NF-e)

2. **Valores validados e consistentes** entre todos os arquivos

3. **Preços para 4 lotes:** 50, 100, 200, 500 peças

4. **Análise de ponto de equilíbrio** e recomendações

---

## 🔄 APÓS GERAR O ORÇAMENTO

Vou abrir os HTMLs para você verificar.

**VOCÊ DEVE CONFERIR:**
- ✓ Valores batem entre os arquivos?
- ✓ Dados do cliente corretos?
- ✓ Código da peça correto?
- ✓ Preços fazem sentido?

**Se encontrar QUALQUER erro, me avise IMEDIATAMENTE**

---

## 💡 EXEMPLO COMPLETO

```
Você: "Preciso orçamento 009/2026 - METALURGICA XYZ - peça ABC.456.DEF"

Claude: "Vou precisar dos dados de usinagem. Você tem:
1. Programa CNC ou tempo de cada operação?
2. Lista de ferramentas?"

Você: "Sim, são 5 ferramentas:
- T0101: Faceamento, 0,4 min, 2500 RPM, F 0.30
- T0202: Desbaste, 0,8 min, 1800 RPM, F 0.25
..."

Claude: [Gera os 5 arquivos com cálculos]

Você: [Confere os valores]

Claude: "Tudo certo? Posso salvar como final?"

Você: "Sim, aprovado!"
```

---

## 📝 DOCUMENTAÇÃO GERADA

Após cada orçamento, vou criar:
```
D:/lasec/orcamentos/2026/[CLIENTE]/[NUMERO]_[CLIENTE]_[CODIGO]/
├── PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].html
├── PROCESSO_FABRICACAO_[CODIGO].html
├── ESTUDO_CUSTO_FABRICACAO_[CODIGO].html
├── ANALISE_VIABILIDADE_LOTES_[NUMERO].html
└── ESTUDO_PRECO_VENDA_NFE_[CODIGO].html
```

---

## ⏱️ TEMPO ESTIMADO

- Coleta de dados: 5-10 min
- Geração dos arquivos: 3-5 min
- Validação: 2-3 min

**Total: ~15 minutos** para orçamento completo e validado
