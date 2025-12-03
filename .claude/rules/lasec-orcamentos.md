# REGRAS DE NEGÓCIO LASEC - ORÇAMENTOS CNC

## 🚨 REGRA CRÍTICA - NUNCA ESQUECER! 🚨

**⚠️ SEMPRE ATUALIZAR O HTML APÓS ALTERAÇÕES!**

- Se fizer mudanças nos arquivos HTML, SEMPRE use o tool Edit/Write para SALVAR!
- NUNCA apenas descrever o que precisa ser feito - FAZER E SALVAR!
- Informação que não é salva no HTML = INFORMAÇÃO PERDIDA!
- Documentação sem implementação = ERRO GRAVE!

**Fluxo correto:**
1. ✅ Ler HTML (Read)
2. ✅ Fazer alterações (Edit/Write)
3. ✅ Abrir no navegador (Bash start) para verificar
4. ❌ NUNCA apenas documentar sem implementar!

---

## 🤖 AGENTE ORÇAMENTO LASEC - USE SEMPRE! 🤖

**⚠️ NOVO FLUXO AUTOMÁTICO - RECOMENDADO PARA TODOS OS ORÇAMENTOS!**

### Como Usar:
```bash
/orcamento-lasec
```

### O Que o Agente Faz:
✅ Conduz através das **7 etapas obrigatórias** sequencialmente
✅ Respeita os **3 gates de aprovação** (não pula etapas)
✅ Cria **todos os 7 arquivos** com padronização total
✅ Faz **validação cruzada automática** entre documentos
✅ Remove **informações confidenciais** da proposta cliente
✅ Pesquisa **ferramentas adequadas** (Iscar, Sandvik, MINIPCP)
✅ Integra com `/buscar-programa` para tempos históricos
✅ Gera **commit Git padronizado** ao final

### Vantagens:
- 🚫 **Sem agente:** Risco de esquecer etapas, valores inconsistentes, dados confidenciais vazados
- ✅ **Com agente:** Processo completo garantido, qualidade assegurada, zero erros

### Documentação Completa:
```
D:\lasec\AGENTE-ORCAMENTO-LASEC-GUIA-USO.md
D:\lasec\.claude\commands\orcamento-lasec.md (arquivo do agente)
```

**Para novos orçamentos: SEMPRE use `/orcamento-lasec` como ponto de partida!**

---

## 📋 PADRÃO PROCESSO DE FABRICAÇÃO - OBRIGATÓRIO!

**⚠️ SEMPRE criar PROCESSO_FABRICACAO com TABELA DETALHADA!**

### Estrutura OBRIGATÓRIA:
1. **Tabela com 10 colunas:** Seq | Operação | Tool | **Cód. BD** | Ferramenta | Vc | RPM | Avanço | Ciclo | Descrição
2. **Coluna Cód. BD (6% width):** Códigos MINIPCP entre Tool e Ferramenta
   - Formato: `08.08.xxx<br>08.07.xxx` (suporte/inserto)
   - Fonte: D:\lasec\MINIPCP.csv ou BD MINIPCP.xlsx
3. **Linha por operação:** N10, N20, N30, N40, N50, N60, N80, N100... (NUNCA agrupar!)
4. **Cores padrão:**
   - Verde (#4CAF50): Tempo PRODUTIVO (cavaco)
   - Amarelo (#FFC107): Tempo IMPRODUTIVO (auxiliar)
   - Azul (#1976D2): Tempo TOTAL
5. **Subtotais por lado:** G55 (1º lado) e G56 (2º lado) separados
6. **Legenda Fanuc:** Box explicando G71, G70, G74, G75, G83, G96, G92...

### Arquivo de Referência (MODELO PERFEITO):
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROCESSO_FABRICACAO_TR1.07.02.033.html
```

### Documentação Completa:
```
D:\lasec\.claude\knowledge\processo-fabricacao-padrao-detalhado.md
```

**NUNCA fazer tabela resumida! SEMPRE detalhar operação por operação!**

---

## 📄 PADRÃO PROPOSTA COMERCIAL - OBRIGATÓRIO!

**⚠️ REGRA CRÍTICA: ORÇAMENTO 008 É O PADRÃO UNIVERSAL PARA TODOS!**

### Workflow Correto:
1. ✅ COPIAR os 7 HTMLs do orçamento 008 para novo diretório
2. ✅ Usar Edit tool para substituir APENAS os dados específicos
3. ❌ NUNCA recriar layouts, estruturas ou templates
4. ❌ NUNCA modificar CSS ou espaçamentos

### Templates Padrão:
```
D:\lasec\.templates\ORCAMENTO_PADRAO_LASEC\
7 HTMLs + logo - copiar para novos orçamentos
```

### Características OBRIGATÓRIAS:

1. **EXATAMENTE 2 PÁGINAS** (não mais, não menos!)
2. **Página 1:** Cabeçalho + Dados + Tabela de Preços + Observação
3. **Página 2:** Recomendação + Condições + Validade + Contato (destaque azul)
4. **Lote recomendado:** Badge ⭐ com fundo verde
5. **Contato final:** Box azul gradiente com "Alexandre Souza" em dourado

### O QUE NUNCA INCLUIR (Confidencial):
- ❌ Hora-máquina (R$ 83,08/h)
- ❌ Tempo de fabricação (8,5 min/peça, 13,5 min/peça, etc.)
- ❌ Nome específico da máquina (Doosan Lynx 220LM, Romi GL 280M, etc.)
- ❌ Custos internos (MOD, CIF, setup)
- ❌ Metodologia de cálculo
- ❌ Markup aplicado (18%, 20%, 45%, etc.)
- ❌ Tempo de setup (0,5h, 2h, etc.)
- ❌ Taxa de indiretos (58%)
- ❌ Custo/peça antes do markup
- ❌ Seção "Por que escolher LASEC"
- ❌ Especificações técnicas detalhadas
- ❌ Informações duplicadas em rodapé

### Conversão para PDF:
**⚠️ CONVERSÃO MANUAL PELO USUÁRIO**
- ❌ NÃO criar scripts de conversão automática (salvo se usuário solicitar)
- ❌ NÃO tentar converter PDF de volta para HTML
- ✅ Criar HTML perfeito e completo
- ✅ Abrir HTML no navegador para revisão
- ✅ Informar que HTML está pronto para conversão manual pelo usuário

### Espaçamentos Críticos (garantem 2 páginas):
- Entre dados e tabela: 40px
- Entre recomendação e condições: 40px
- Entre validade e contato: 35px

**Este formato foi testado e aprovado. Usar em TODOS os orçamentos futuros!**

---

## 📊 FONTES DE CONSULTA PERMANENTES - OBRIGATÓRIO CONSULTAR!

### 1. Banco de Dados CNC - Programas Similares (NOVO! 🆕):
```
Banco: D:\lasec\PROG_CNC_DATABASE.json (11.592 programas catalogados)
Sistema: D:\lasec\SISTEMA_PROGRAMAS_CNC.ps1
Busca: D:\lasec\buscar_programa_similar.ps1
Comando: /buscar-programa
```

**QUANDO USAR:**
- ✅ **SEMPRE** ao iniciar novo orçamento - buscar programas similares
- ✅ Para estimar tempo de ciclo baseado em histórico real
- ✅ Para identificar ferramentas necessárias
- ✅ Para determinar complexidade da peça
- ✅ Para escolher máquina adequada

**COMO USAR:**
```powershell
# Durante orçamento, buscar similar:
.\buscar_programa_similar.ps1 -Material "Aço" -Maquina "LYNX220" -Operacoes @("ROSCA")

# Ou usar comando slash:
/buscar-programa
```

**INFORMAÇÕES FORNECIDAS:**
- Tempo estimado de ciclo (2-5 min SIMPLES, 5-10 min MEDIA, 10-30 min COMPLEXA)
- Número típico de ferramentas
- Complexidade (SIMPLES/MEDIA/COMPLEXA)
- Operações padrão
- Parâmetros de corte típicos

**⚠️ INTEGRAÇÃO COM ORÇAMENTO:**
1. `/buscar-programa` → Encontrar similar
2. Analisar tempo e complexidade retornados
3. Usar dados para criar PROCESSO_FABRICACAO
4. Calcular custos baseado em tempos reais

### 2. Hora-Máquina LASEC (CRÍTICO):
```
Arquivo: D:\lasec\henrique\custos_ferramentaria lasec.xls
Planilha: Custos 2025 (atualizada com IPCA + Dissídio Metalúrgicos SP)
```

**Máquinas Principais LASEC 2025:**
- **33 - DOOSAN Lynx 220LM:** R$ 83,08/h ⭐ (Torno CNC alta precisão)
- **35 - ROMI GL 280M:** R$ 76,95/h (Torno CNC médio porte)
- **28 - ROMI Centur 30D:** R$ 60,48/h (Torno CNC pequeno porte)
- **01 - Torno Universal:** R$ 38,62/h (Torno convencional)

**⚠️ SEMPRE consultar planilha atualizada antes de calcular custos!**
**⚠️ NÃO usar valores fixos ou desatualizados!**

### 3. Códigos MINIPCP (Ferramentas):
```
Arquivo 1: D:\lasec\MINIPCP.csv (Rápido consulta)
Arquivo 2: D:\lasec\BD MINIPCP.xlsx (Banco completo)
```

**Categorias principais:**
- 08.08.xxx: Suportes de ferramenta
- 08.07.xxx: Insertos
- 05.05.xxx: Pastilhas
- 10.01.xxx: Brocas

**Uso:** Incluir na coluna "Cód. BD" do PROCESSO_FABRICACAO

### 4. Parâmetros de Corte:
- Catálogos Sandvik: www.sandvik.coromant.com
- Catálogos Iscar: www.iscar.com
- Catálogos Taegutec: www.taegutec.com

### 5. Templates Completos:
```
D:\lasec\.templates\FLUXO_COMPLETO_ORCAMENTO_PADRAO_LASEC.md (FLUXO COMPLETO)
D:\lasec\.templates\TEMPLATE_PROPOSTA_COMERCIAL_PADRAO_LASEC.md (PROPOSTA)
D:\lasec\.claude\knowledge\processo-fabricacao-padrao-detalhado.md (PROCESSO)
```

### 6. Orçamento Referência (PERFEITO):
```
D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\
```
**Todos os 7 HTMLs aprovados - Usar como modelo!**

---

## ⚠️ CUSTOS HORÁRIOS - CRÍTICO!

### Setup vs Produção
- **Setup:** R$ 180/h (1,5x produção)
  - MOTIVO: Não gera peças, custo de oportunidade maior
  - Requer operador especializado
  - Programação, ajustes, calibrações, primeira peça

- **Produção:** R$ 120/h
  - Hora-máquina durante usinagem
  - Operador + máquina gerando peças

### Custos Indiretos
- **Taxa:** 58% sobre (MOD Setup + MOD Produção)
- Padrão LASEC estabelecido

## ⏱️ TEMPOS PADRÃO

### Setup - CRÍTICO!
**DEPENDE DO TIPO DE MÁQUINA E COMPLEXIDADE:**

#### Tornos CNC (peças cilíndricas simples):
- **Tempo:** 0,5h (30 minutos)
- **Custo:** R$ 90,00 (0,5h × R$ 180/h)
- Exemplos: CENTU30D, CENTU30S, GL240, GL280, LYNX220
- Peças tipo: arruelas, eixos, buchas

#### Centros de Usinagem (peças prismáticas complexas):
- **Tempo:** 2h (120 minutos) ⚠️
- **Custo:** R$ 360,00 (2h × R$ 180/h)
- Exemplos: DISCO560, DISCO760, VTC30A
- Peças tipo: blocos, flanges, peças com cavidades complexas

**Setup inclui:** Troca de ferramentas, programação CNC, ajustes, calibração, fixação, primeira peça aprovada

### Tempo Improdutivo - CRÍTICO!
**DEPENDE DO TIPO DE MÁQUINA:**

#### Tornos CNC:
- **Tempo:** 20 segundos por troca de ferramenta (cavaco a cavaco)
- Exemplos: CENTU30D, CENTU30S, GL240, GL280, LYNX220

#### Centros de Usinagem:
- **Tempo:** 10 segundos por troca de ferramenta (cavaco a cavaco) ⚠️
- Exemplos: DISCO560, DISCO760, VTC30A
- Magazine automático: troca mais rápida que torno

**Cálculo:** (Nº de ferramentas - 1) × tempo de troca

### Tempo de Usinagem
- Calcular baseado nos dados do PROCESSO_FABRICACAO
- Item 3: DADOS TÉCNICOS DE CORTE contém tempos por operação
- Somar todos os tempos + tempo improdutivo

## 🏭 MÁQUINAS CNC LASEC

**IMPORTANTE:** Consultar `.claude/knowledge/maquinas-lasec.md` para especificações completas.

### Parque de Máquinas
- **CENTU30D, CENTU30S** - Tornos CNC Romi Centur (Ø até 430mm)
- **GL240 (G240), GL280** - Centros de Torneamento Romi (alta produção)
- **LYNX220** - Torno Doosan com ferramentas acionadas
- **DISCO560, DISCO760** - Centros de Usinagem Vertical Romi
- **VTC30A** - Centro de Usinagem e Furação Vertical Romi

### Seleção de Máquina
- Peças cilíndricas: Tornos (CENTU, GL, LYNX)
- Peças prismáticas/fresamento: Centros (DISCO, VTC)
- Torneamento + fresamento: LYNX220 (ferramenta acionada)

**Programas CNC:** `D:\PROG_CNC\[NOME_MAQUINA]\`

## 📊 PONTO DE EQUILÍBRIO

### Fórmula
```
Qtd = Custo Fixo (Setup) / (Preço Venda - Custo Variável/peça)
```

### Parâmetros
- **Custo Fixo:** Setup (R$ 90,00 para 0,5h)
- **Custo Variável/peça:** (Tempo usinagem × R$ 120/h) + Indiretos
- **Preço Venda:** Aplicar markup sobre custo total

### Lotes Padrão
- **Ponto de equilíbrio matemático:** Margem 0%
- **Lote mínimo viável:** 50 peças (margem 10%)
- **Lote recomendado:** 100 peças (margem 12%)
- **Lote ideal:** 200-500 peças (margem 15-18%)

## 📁 ESTRUTURA DE ARQUIVOS

### Arquivos HTML Padrão

### 🚨 ORDEM DE CRIAÇÃO OBRIGATÓRIA (REFERÊNCIA CRUZADA):

1. **PROCESSO_FABRICACAO_[CODIGO].html** ⭐ **CRIAR PRIMEIRO - FONTE DA VERDADE**
   - Item 3: DADOS TÉCNICOS DE CORTE (tabela principal)
   - Ferramentas, RPM, avanços, tempos
   - **IMPORTANTE:** Códigos BD MINIPCP separados
   - **CONTÉM:** Material, Máquina, Tempo de ciclo REAIS

2. **ANALISE_VIABILIDADE_LOTES_[NUMERO].html** (Documento Interno)
   - **PUXAR DADOS DO PROCESSO_FABRICACAO:** Material, Máquina, Tempo
   - Análise de lote mínimo
   - Comparação entre lotes
   - Recomendações comerciais
   - **NÃO REMOVER** dados técnicos (é documento interno)

3. **PROPOSTA_COMERCIAL_[CLIENTE]_[CODIGO].html** (Documento Cliente)
   - **PUXAR DADOS DO PROCESSO_FABRICACAO:** Material, Dimensões, Tolerâncias
   - **PUXAR PREÇOS DA ANALISE_VIABILIDADE**
   - **REMOVER CONFIDENCIAIS:** Tempo, Máquina específica, Hora-máquina
   - **SUBSTITUIR:** "Máquina: XXX" → "Processo: Torneamento CNC de Precisão"
   - Preços, condições, prazos
   - **GERAR PDF** com layout otimizado

4. **ESTUDO_CUSTO_FABRICACAO_[CODIGO].html** (Opcional)
   - Cálculos de custo por lote
   - 4 lotes: 50, 100, 200, 500 peças
   - Detalhamento: Setup, MOD, Indiretos

5. **ESTUDO_PRECO_VENDA_NFE_[CODIGO].html** (Opcional)
   - Preços finais NF-e
   - Impostos e markups

### 🔗 FLUXO DE REFERÊNCIA CRUZADA:
```
PROCESSO_FABRICACAO (fonte verdade)
    ↓
    ├─→ ANALISE_VIABILIDADE (copia dados técnicos completos)
    └─→ PROPOSTA_COMERCIAL (copia dados técnicos - remove confidenciais)
```

**Documentação Completa:**
```
D:\lasec\FLUXO-REFERENCIA-CRUZADA-PROPOSTA-COMERCIAL.md
```

## 🎨 DIAGRAMAÇÃO DE TABELAS

### Regras ABSOLUTAS
1. **NUNCA mexer manualmente em porcentagens de colunas**
2. **SEMPRE usar text-align: center no <tr> ou <td>**
3. **Total de larguras DEVE somar exatamente 100%**
4. **Se usuário reclamar de diagramação:**
   - Pedir arquivo Excel com layout correto
   - OU deixar usuário ajustar manualmente
   - NÃO ficar tentando adivinhar

### Estrutura Item 3 (DADOS TÉCNICOS DE CORTE)
Colunas após remover "Ferr.":
- Tipo
- Cód. BD Suporte
- Suporte
- Cód. BD Pastilha
- Pastilha/Inserto
- RPM
- Avanço
- Tempo
- Operação

## 🔢 BD MINIPCP

### Códigos de Ferramental
- **Formato:** XX.XX.XXX (ex: 08.08.041)
- **Fonte:** Planilha "BD MINIPCP.xlsx"
- Código Suporte e Código Pastilha separados

### Localização
```
D:\lasec\BD MINIPCP.xlsx
```

## 📋 MATERIAIS E PROCESSOS

### Material Padrão
- **SAE 1020:** Fornecido pelo cliente
- **Zincagem:** Providenciada pelo cliente
- **NÃO incluir no custo**

### Máquina Padrão
- **Torno CNC:** Doosan Lynx 220 LM
- Capacidade: 3 eixos

## 💰 MARKUP E MARGENS

### Markup por Tipo de Cliente
- **Cliente Recorrente/Parceria:** 20% (preço competitivo para fidelização)
- **Cliente Novo/Esporádico:** 45% (margem padrão mercado)

### Markup por Lote (Referência Antiga - Substituída)
- 50 pçs: 1,240 (margem ~7%)
- 100 pçs: 1,290 (margem ~10-12%)
- 200 pçs: 1,350 (margem ~15%)
- 500 pçs: 1,408 (margem ~18%)

### Impostos
- **Simples Nacional:** 10% (padrão LASEC)
- **Cálculo:** Preço com markup ÷ 0.90
- **Exemplo:** R$ 35,56 ÷ 0.90 = R$ 39,51

### Hora-Máquina Base
- **GRV 2024:** R$ 148,00/h (hora-máquina publicada)

## 🚫 ERROS COMUNS A EVITAR

1. **Setup com mesma taxa que produção** ❌
   - Setup SEMPRE 1,5x produção

2. **Esquecer tempo improdutivo** ❌
   - 20s × número de trocas

3. **Usar intervalos em vez de valores exatos** ❌
   - "F 0.15 - F 0.25" ❌
   - "F 0.25" ✅

4. **Total de colunas ≠ 100%** ❌
   - Verificar soma antes de aplicar

5. **Não centralizar células** ❌
   - Sempre usar text-align: center

6. **Proposta comercial com dados divergentes** ❌
   - SEMPRE puxar do PROCESSO_FABRICACAO
   - NUNCA copiar de outro orçamento diferente

7. **Atualizar preço na tabela mas esquecer do CTA** ❌
   - Usar grep para encontrar TODOS os preços antigos
   - Atualizar TODAS as ocorrências

8. **Mostrar informações confidenciais ao cliente** ❌
   - Remover: tempo de fabricação, máquina específica, hora-máquina
   - Substituir por informações genéricas

9. **Recriar layout de proposta do zero** ❌
   - SEMPRE copiar HTML aprovado do template ou orçamento anterior
   - Usar Edit tool para mudar apenas dados
   - NUNCA modificar CSS ou estrutura HTML

10. **Logo muito grande ou página 1 diferente** ❌
    - Sintoma: Usuário reclama de layout
    - Causa: Modificou estrutura HTML
    - Solução: Copiar HTML aprovado sem alterações de layout

11. **Apagar HTML aprovado sem backup** ❌
    - SEMPRE mover para _OBSOLETOS
    - NUNCA deletar permanentemente
    - Templates aprovados podem ser recuperados da Lixeira Windows

12. **Esquecer de atualizar todos os preços no HTML** ❌
    - Usar Grep para encontrar TODAS as ocorrências
    - Preços aparecem em: tabela, CTA box, recomendações
    - Atualizar TODAS as ocorrências simultaneamente

## 📞 INFORMAÇÕES LASEC

### Endereço
Rua Álvaro Silva, 233 - Bairro do Limão
São Paulo/SP - CEP 02723-020

### Contato
Tel: (11) 3936-5041 / (11) 3935-1271

### Confidencialidade
Todos os orçamentos: **CONFIDENCIAL - NÃO DISTRIBUIR**
