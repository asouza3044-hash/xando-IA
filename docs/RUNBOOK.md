# RUNBOOK - Operacao do Agente Orcamento LASEC

## Protocolo de inicio
1. Ler `memory/orcamentos_estado.md`
2. Ler `memory/regras_usinagem.md`
3. Ler `CHECKPOINT.md` do orcamento em questao, se existir
4. Descobrir o proximo numero do orcamento em `D:\IA MALELO\orcamentos\2026\`
5. Informar estado atual e numero identificado

---

## Etapa 1 - PROCESSO_FABRICACAO
### Objetivo
Construir o processo completo e tecnicamente consistente. Esta e a etapa gate.

### Acoes obrigatorias
1. Ler o desenho e extrair tudo o que estiver visivel
2. Nao perguntar o que ja estiver no desenho
3. Buscar programa similar em `PROG_CNC_DATABASE_v3.json`
4. Consultar `MINIPCP.csv`
5. Consultar `BIBLIOTECA_FERRAMENTAS_CNC.json`
6. Consultar:
   - `TABELA_DADOS_CORTE_CORRIGIDA_FONTES_TECNICAS.md`
   - `PADRAO_DADOS_CORTE_OBRIGATORIO.md`
7. Se lote < 50, consultar `METODOLOGIA_CALCULO_LOTES_PEQUENOS.md`
8. Definir a maquina de forma autonoma, salvo correcao posterior do Alexandre
9. Copiar template HTML aprovado
10. Copiar `simbolo-lasec.jpg`
11. Preencher o documento sem recriar a estrutura
12. Salvar o HTML
13. Aguardar aprovacao do Alexandre

### Saida esperada
- link local do HTML
- processo preenchido
- tempos e observacoes consistentes
- dados faltantes minimos e objetivos

---

## Etapa 2 - ESTUDO_CUSTO_FABRICACAO
### Objetivo
Transformar o processo aprovado em custo interno consistente.

### Acoes obrigatorias
1. Copiar template
2. Aplicar formulas oficiais
3. Calcular lotes alternativos
4. Mostrar impacto dos custos fixos no custo unitario
5. Fazer a secao obrigatoria de cruzamento:
   - custo interno
   - GRV mercado
   - diferenca
   - margem potencial
   - limite de desconto
   - preco minimo NFe

### Saida esperada
- custo por lote
- peso dos custos fixos
- cruzamento interno x GRV
- conclusao competitiva

---

## Etapa 3 - ESTUDO_PRECO_VENDA_NFE
### Objetivo
Formar o preco comercial com perdas, markup e impostos.

### Acoes obrigatorias
1. Copiar template
2. Aplicar formula oficial
3. Mostrar formacao de preco
4. Comparar lotes
5. Informar margem e economia percentual

---

## Etapa 4 - ANALISE_VIABILIDADE_LOTES
### Objetivo
Comparar economicamente os lotes possiveis.

### Acoes obrigatorias
1. Comparar custo e preco por lote
2. Mostrar economia percentual
3. Recomendar lote ideal

---

## Etapa 5 - ANALISE_BREAK_EVEN
### Objetivo
Mostrar quando vale a pena ampliar lote ou investir mais.

### Acoes obrigatorias
1. Determinar base de comparacao
2. Calcular economia por peca
3. Calcular ponto de equilibrio
4. Concluir quando o investimento se paga

---

## Etapa 6 - PROPOSTA_COMERCIAL
### Objetivo
Gerar documento comercial limpo, objetivo e sem dados confidenciais.

### Acoes obrigatorias
1. Copiar template/layout aprovado
2. Preencher dados comerciais
3. Garantir ausencia de dados internos
4. Aplicar condicoes comerciais padrao
5. Gerar PDF com script oficial
6. Garantir 1 pagina

---

## PDF
### Script oficial
`D:\IA MALELO\templates\gerar_pdf_proposta.py`

### Regra
- ajustar HTML e PDF_OUT
- usar scale 0.78
- proposta deve caber em 1 pagina

---

## Sync
### Regra central
Sync e sempre a ultima etapa antes de dizer que esta pronto.

### GitHub
1. Copiar memorias para o repositorio
2. Executar add, commit e push

### VM Oracle
1. Copiar pasta do orcamento
2. Copiar memoria atualizada

### Atencao
Se qualquer arquivo for alterado depois do sync, e obrigatorio sincronizar novamente.
