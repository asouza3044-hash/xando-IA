# ESTRUTURA DE PASTAS PADRÃO - ORÇAMENTOS LASEC

## 📁 ESTRUTURA REAL EM DISCO

```
D:\IA MALELO\
│
├── orcamentos\
│   ├── 2026\                          ← ANO ATUAL
│   │   ├── BBOX\
│   │   │   └── 012_BBOX_1770339515539\  (último orçamento = 012)
│   │   ├── RFS\
│   │   │   ├── 001_RFS_363456\
│   │   │   └── ... até 009_RFS_363456\
│   │   ├── INOVA_PRODENTAL\
│   │   │   └── 010_INOVA_PRODENTAL_1770339271273\
│   │   ├── CLIENTE_X\
│   │   │   └── 011_CLIENTE_X_1770339479861\
│   │   └── MICROGEAR\
│   │       └── 001_MICROGEAR_1.04.13.260\
│   │
│   └── 2025\                          ← ANO ANTERIOR (referência)
│       └── MICROGEAR\
│           └── 008_MICROGEAR_TR1.07.02.033\  ← MODELO PERFEITO APROVADO
│
├── templates\
│   └── orcamento-lasec-hmtl\          ← TEMPLATES APROVADOS
│       ├── PROCESSO_FABRICACAO_PP01_00003.html
│       ├── ESTUDO_CUSTO_FABRICACAO.html
│       ├── ESTUDO_PRECO_VENDA_NFE.html
│       ├── ANALISE_VIABILIDADE_LOTES.html
│       ├── PROPOSTA_COMERCIAL.html
│       └── simbolo-lasec.jpg
│
├── banco_dados\                       ← DADOS TÉCNICOS
│   ├── PROG_CNC_DATABASE.json         (banco de programas CNC - 80MB)
│   ├── BD MINIPCP.xlsx                (banco completo ferramental)
│   ├── MINIPCP.csv                    (consulta rápida ferramental)
│   ├── custos_ferramentaria lasec.xls (hora-máquina atualizada)
│   ├── dados_completos_orcamentos.json
│   ├── biblioteca_cnc.json
│   └── padroes_cnc.json
│
└── agente\
    ├── commands\
    │   ├── orcamento-lasec.md
    │   ├── buscar-programa.md
    │   └── calcular-orcamento.md
    ├── knowledge\
    │   └── *.md (arquivos de conhecimento)
    └── rules\
        └── lasec-orcamentos.md
```

---

## 📝 NOMENCLATURA PADRÃO

### Pasta do Orçamento
```
[NUMERO]_[CLIENTE]_[CODIGO_PECA]
```
Exemplos:
- `013_NOVO_CLIENTE_ABC.123.456`
- `014_RFS_363456`

### Arquivos HTML (6 documentos obrigatórios)

#### 1. Processo de Fabricação ⭐ PRIMEIRO
```
PROCESSO_FABRICACAO_[CODIGO].html
```

#### 2. Estudo de Custo
```
ESTUDO_CUSTO_FABRICACAO_[CODIGO].html
```

#### 3. Estudo de Preço NF-e
```
ESTUDO_PRECO_VENDA_NFE_[CODIGO].html
```

#### 4. Análise de Viabilidade de Lotes
```
ANALISE_VIABILIDADE_LOTES_[NUMERO].html
```

#### 5. Análise Break-Even
```
ANALISE_BREAK_EVEN_[NUMERO].html
```

#### 6. Proposta Comercial
```
PROPOSTA_COMERCIAL_[NUMERO]_[CLIENTE].html
```

---

## 🔧 CRIAÇÃO DE NOVO ORÇAMENTO

### Passo a passo:

```
1. Descobrir próximo número:
   → Listar D:\IA MALELO\orcamentos\2026\
   → Encontrar maior número (atualmente 012)
   → Próximo = 013

2. Criar estrutura de pastas:
   D:\IA MALELO\orcamentos\2026\[CLIENTE]\013_[CLIENTE]_[CODIGO]\

3. Copiar logo para a pasta:
   D:\IA MALELO\templates\orcamento-lasec-hmtl\simbolo-lasec.jpg

4. Usar templates em:
   D:\IA MALELO\templates\orcamento-lasec-hmtl\

5. Gerar 6 HTMLs na pasta do orçamento
```

---

## 📂 LOCALIZAÇÃO DE RECURSOS

### Logo / Símbolo LASEC
```
D:\IA MALELO\templates\orcamento-lasec-hmtl\simbolo-lasec.jpg
```
Copiar para cada pasta de orçamento. Atenção: nome com hífen (simbolo-lasec.jpg).

### Ferramental MINIPCP
```
D:\IA MALELO\banco_dados\MINIPCP.csv          (consulta rápida)
D:\IA MALELO\banco_dados\BD MINIPCP.xlsx      (banco completo)
```

### Hora-Máquina
```
D:\IA MALELO\banco_dados\custos_ferramentaria lasec.xls
```

### Banco de Programas CNC
```
D:\IA MALELO\banco_dados\PROG_CNC_DATABASE.json
```
Usar comando `/buscar-programa` para consultar.

### Modelo de Referência Aprovado
```
D:\IA MALELO\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\
```
Contém os 6 HTMLs aprovados. Usar como modelo de estrutura e cálculos.

---

## 🚫 ERROS COMUNS

❌ Criar pasta sem número sequencial
   ✅ Sempre `013_CLIENTE_CODIGO/`

❌ Esquecer de copiar a logo
   ✅ `simbolo-lasec.jpg` na pasta do orçamento

❌ Usar nome de logo errado
   ✅ `simbolo-lasec.jpg` (com hífen, sem espaço)

❌ Misturar anos
   ✅ Novos orçamentos sempre em `2026\`

❌ Nome de cliente inconsistente
   ✅ Sempre maiúsculas, sem acentos

---

## 💾 BACKUP

Dados críticos em:
```
D:\IA MALELO\orcamentos\  (todos os orçamentos)
D:\IA MALELO\banco_dados\ (dados técnicos)
```
