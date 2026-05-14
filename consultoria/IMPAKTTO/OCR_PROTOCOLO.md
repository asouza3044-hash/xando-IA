# PROTOCOLO OCR — APONTAMENTO IMPAKTTO

**Objetivo:** transformar fotos de formulario manuscrito em CSV pronto pra colar na aba `02_APONTAMENTO_HIST` da planilha CRONOANALISE.xlsx.

---

## 1. PADRAO DE CAPTURA (operador / Alexandre)

| Item | Regra |
|---|---|
| Iluminacao | Luz branca direta (LED ou natural). Evitar sombra do celular. |
| Angulo | Camera **perpendicular** ao papel. Cabecalho IMPAKTTO no topo. |
| Enquadramento | Folha inteira na foto + 2 cm de margem em volta. Sem corte. |
| Foco | Tocar na tela pra focar antes de tirar. Conferir se le no zoom. |
| Papel | Plano. Sem dobra, curvatura ou objeto encima. |
| Resolucao | Maxima do celular (12 MP+). HEIC ou JPG. |
| Por foto | **1 formulario por foto**. Nao varias paginas juntas. |
| Cabecalho | Garantir que o campo MAQUINA do cabecalho esteja legivel. |
| Nome arquivo | `IMPAKTTO_AAAAMMDD_MAQ_NN.jpg`  (ex: `IMPAKTTO_20260509_LYNX01_01.jpg`) |

---

## 2. PROMPT-TEMPLATE (cole no chat com a foto)

```
Processa esta foto do formulario IMPAKTTO "Apontamento de Producao".

Cabecalho da folha (extrair UMA vez):
- MAQUINA (campo no topo esquerdo)

Por linha do corpo, extrair:
- DATA (DD/MM)
- CLIENTE
- ID_OP (numero)
- ITEM
- DESCRICAO_OP (texto manuscrito)
- N_PROG (numero)
- QTD_PROD
- QTD_PED
- H_INICIO (HH:MM)
- H_FIM (HH:MM)
- TOTAL_MIN (em minutos decimais — converter se vier HH:MM)
- NC (nao conforme - nro pecas)
- COD_PARADA (P01..Pxx)
- T_PARADA_MIN (minutos)
- OPERADOR

Saida:
1. Tabela CSV com separador `;` (ponto-virgula)
2. Cabecalho exatamente:
   DATA;CLIENTE;ID_OP;ITEM;DESCRICAO_OP;N_PROG;QTD_PROD;QTD_PED;H_INICIO;H_FIM;TOTAL_MIN;NC;COD_PARADA;T_PARADA_MIN;OPERADOR;MAQUINA;AUDIT
3. Coluna AUDIT vazia (sera preenchida na revisao humana)
4. Campos ilegiveis: marcar com `???` (nunca chutar)
5. Datas sem ano: assumir ano corrente da pasta da foto. Se ambiguo, marcar `???`
6. Se houver linha rasurada/cortada: incluir mesmo assim com nota na DESCRICAO_OP entre colchetes

Antes da tabela, listar:
- Quantas linhas extraidas
- Quais campos tiveram >2 ???  (sinal de foto ruim)
- Confianca geral (alta / media / baixa)
```

---

## 3. VALIDACAO HUMANA (Alexandre, antes de colar na planilha)

Para cada CSV gerado:

1. Abrir foto e CSV lado a lado
2. Conferir 100% das linhas com `???`
3. Conferir datas e somas QTD_PROD (devem bater com totais visiveis)
4. Marcar coluna AUDIT:
   - `OK` = revisado e correto
   - `AJ` = ajustado (alguma celula corrigida)
   - `??` = duvida persiste — pendente cliente

5. So linhas com AUDIT preenchida entram nas analises 05/06/07.

---

## 4. INSERCAO NA PLANILHA

Opcao A — copiar/colar:
- Abrir CSV no Excel (Dados > De Texto, separador `;`)
- Selecionar dados > copiar
- Colar como valores na aba `02_APONTAMENTO_HIST` (a partir da linha 2)

Opcao B — script:
- Salvar CSV em `D:\IA MALELO\consultoria\IMPAKTTO\ocr_output\AAAAMMDD_lote.csv`
- Rodar `python importar_csv.py AAAAMMDD_lote.csv` (a criar)

---

## 5. METRICAS DE QUALIDADE (acompanhar)

Apos cada lote, registrar em `OCR_LOG.md`:
- Data do lote
- Nro de fotos
- Nro de linhas extraidas
- % linhas com `???`
- Tempo de revisao humana
- Erros encontrados na revisao

Meta: <5% de erro pos-revisao. Se subir, repensar metodo de captura.
