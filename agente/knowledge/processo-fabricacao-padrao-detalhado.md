# 📋 PADRÃO PROCESSO DE FABRICAÇÃO - DETALHADO

**Data:** 26/11/2026
**Status:** ✅ PADRÃO DEFINITIVO - USAR SEMPRE!

---

## 🎯 OBJETIVO

Este documento define o **PADRÃO OBRIGATÓRIO** para criar o arquivo HTML **PROCESSO_FABRICACAO**.

**SEMPRE** seguir este modelo para TODOS os orçamentos futuros.

---

## 📐 ESTRUTURA DO DOCUMENTO

### 1. DADOS GERAIS DA PEÇA

Tabela com informações básicas:
- Código da peça
- Descrição
- Cliente
- **Material:** LER DO DESENHO! NUNCA assumir de orçamento anterior!
- Dimensões matéria-prima (blank/tarugo)
- **Máquina:** Identificar corretamente (Doosan Lynx 220LM, Romi GL280M, etc.)
- **Programa CNC:** Número do programa AS-BUILT quando disponível
- Fixação (castanha, placa, mandril)
- **Tempo total/peça:** Validado com produção real
- **Setup:** 1,0h para peça cilíndrica, 0,5h para peça simples

### 2. DIMENSÕES FINAIS

Tabela com todas as cotas críticas:
- Diâmetros externos
- Diâmetros internos (especialmente tolerâncias IT)
- Alturas/comprimentos
- Chanfros
- Raios
- Tolerâncias especiais
- Acabamento superficial

### 3. SEQUÊNCIA DETALHADA DE OPERAÇÕES ⭐ **SEÇÃO PRINCIPAL**

**TABELA UNIFICADA E DETALHADA** - Este é o padrão OBRIGATÓRIO!

#### Estrutura da Tabela:

```html
<table class="info-table" style="font-size: 9pt;">
<thead>
    <tr style="background-color: #495057; color: white; text-align: center;">
        <th>Seq</th>        <!-- 4% -->
        <th>Operação</th>   <!-- 9% -->
        <th>Tool</th>        <!-- 4% -->
        <th>Cód. BD</th>    <!-- 6% --> ⚠️ OBRIGATÓRIO!
        <th>Ferramenta</th>  <!-- 13% -->
        <th>Vc</th>          <!-- 5% -->
        <th>RPM</th>         <!-- 5% -->
        <th>Avanço</th>      <!-- 5% -->
        <th>Ciclo</th>       <!-- 5% -->
        <th>Descrição Detalhada</th> <!-- 44% -->
    </tr>
</thead>
<tbody>
    <!-- Conteúdo detalhado por operação -->
</tbody>
</table>
```

**⚠️ IMPORTANTE:** Coluna "Cód. BD" = Código do banco de dados (MINIPCP.csv)
- Suporte: 08.08.xxx
- Inserto/Pastilha: 08.07.xxx
- Consultar: D:\lasec\MINIPCP.csv

#### Conteúdo OBRIGATÓRIO:

**A. Cabeçalho G55/G56:**
```html
<tr style="background-color: #e7f3ff;">
    <td colspan="9" style="font-weight: bold; padding: 10px; font-size: 11pt;">
    📍 G55 - 1º LADO (FRONTAL) - Castanha "CAST S" (Ø69.5mm grip) - Blank Ø80×30mm
    </td>
</tr>
```

**B. Cada Operação (N10, N20, N30, etc.):**
```html
<tr>
    <td style="text-align: center;"><strong>N10</strong></td>
    <td>Furação Tmax Ø20</td>
    <td style="text-align: center;"><strong>T12</strong></td>
    <td style="text-align: center;">08.08.061<br>08.07.038</td> <!-- ⚠️ Códigos BD! -->
    <td>Broca Tmax Ø20<br>SPMG 060204</td>
    <td style="text-align: center;">-</td>
    <td style="text-align: center;">1850</td>
    <td style="text-align: center;">F 120</td>
    <td style="text-align: center;"><strong>G83</strong></td>
    <td><strong>Furação profunda Z-33mm</strong><br>
    • Ciclo peck drilling G83 (furação intermitente)<br>
    • Profundidade: 33mm<br>
    • Incremento: Q60000 (controle de cavacos)<br>
    • G94 (avanço mm/min), G97 (RPM constante)<br>
    • M8/M9: Refrigeração ligada/desligada</td>
</tr>
```

**⚠️ Coluna "Cód. BD" SEMPRE incluir:**
- Linha 1: Código suporte/ferramenta (08.08.xxx)
- Linha 2: Código inserto/pastilha (08.07.xxx)
- Fonte: D:\lasec\MINIPCP.csv ou D:\lasec\BD MINIPCP.xlsx

**C. Subtotais por lado:**

```html
<!-- Tempo PRODUTIVO -->
<tr style="background-color: #e1f5e1;">
    <td colspan="6" style="text-align: right; padding: 8px; font-weight: bold;">
    🟢 TEMPO PRODUTIVO 1º LADO (operador):</td>
    <td colspan="3" style="text-align: left; padding: 8px; background-color: #4CAF50; color: white; font-weight: bold; font-size: 12pt;">
    ⏱️ 2,62 min (2'37") - Tempo com cavaco<br>
    <small style="font-size: 8pt;">5 ferramentas (N10+N20+N30+N40+N50)</small></td>
</tr>

<!-- Tempo IMPRODUTIVO -->
<tr style="background-color: #fff3cd;">
    <td colspan="6" style="text-align: right; padding: 8px; font-weight: bold;">
    🟡 TEMPO IMPRODUTIVO 1º LADO:</td>
    <td colspan="3" style="text-align: left; padding: 8px; background-color: #FFC107; font-weight: bold; font-size: 12pt;">
    ⚙️ 1,82 min - Trocas (4×20s) + G00 + virada<br>
    <small style="font-size: 8pt;">Inclui virada manual + inspeção (~60-90s)</small></td>
</tr>

<!-- SUBTOTAL -->
<tr style="background-color: #2196F3; color: white;">
    <td colspan="6" style="text-align: right; padding: 8px; font-weight: bold; font-size: 11pt;">
    ⏱️ SUBTOTAL 1º LADO:</td>
    <td colspan="3" style="text-align: left; padding: 8px; font-weight: bold; font-size: 13pt;">
    4,44 min/peça</td>
</tr>
```

**D. Virada Manual:**

```html
<tr style="background-color: #ff9800; color: white; font-weight: bold;">
    <td colspan="9" style="padding: 10px; text-align: center; font-size: 11pt;">
    🔄 VIRADA MANUAL: Operador retira peça → Rotaciona 180° → Refixação castanha → Inspeção dimensional 1º lado → M54 (troca offset G55→G56)
    </td>
</tr>
```

**E. Totais Finais:**

```html
<!-- PRODUTIVO TOTAL -->
<tr style="background-color: #4CAF50; font-weight: bold; color: white;">
    <td colspan="6" style="text-align: right; padding: 10px; font-size: 13pt;">
    ✅ TEMPO PRODUTIVO TOTAL (operador):</td>
    <td colspan="3" style="text-align: left; padding: 10px; font-size: 15pt;">
    4,27 min (2'37" + 1'39")</td>
</tr>

<!-- IMPRODUTIVO TOTAL -->
<tr style="background-color: #FFC107; font-weight: bold; color: #000;">
    <td colspan="6" style="text-align: right; padding: 10px; font-size: 13pt;">
    ⚙️ TEMPO IMPRODUTIVO TOTAL:</td>
    <td colspan="3" style="text-align: left; padding: 10px; font-size: 15pt;">
    2,73 min (trocas + virada + inspeção)</td>
</tr>

<!-- TEMPO TOTAL REAL -->
<tr style="background-color: #1976D2; font-weight: bold; color: white;">
    <td colspan="6" style="text-align: right; padding: 12px; font-size: 14pt;">
    ⏱️ TEMPO TOTAL REAL (medido):</td>
    <td colspan="3" style="text-align: left; padding: 12px; font-size: 16pt;">
    <strong>7,0 min/peça</strong><br>
    <small style="font-size: 10pt;">Validado com 90 peças - 19-20/11/2026<br>
    Setup: 1,0h | Programa: :0408</small></td>
</tr>
```

**F. Legenda Ciclos Fanuc (OBRIGATÓRIA):**

```html
<div class="info-box" style="background-color: #e3f2fd; border-left: 5px solid #2196F3;">
    <strong>ℹ️ LEGENDA CICLOS FANUC:</strong><br>
    <ul style="margin-left: 20px; margin-top: 10px; font-size: 9pt;">
        <li><strong>G71:</strong> Ciclo de desbaste automático (roughing)</li>
        <li><strong>G70:</strong> Ciclo de acabamento (finishing)</li>
        <li><strong>G74:</strong> Ciclo de mandrilamento/faceamento profundo</li>
        <li><strong>G75:</strong> Ciclo de sangramento/ranhura facial (grooving)</li>
        <li><strong>G83:</strong> Ciclo de furação profunda peck drilling</li>
        <li><strong>G96/G97:</strong> Velocidade corte constante / RPM constante</li>
        <li><strong>G92:</strong> Limitador de RPM máximo</li>
        <li><strong>G41/G42:</strong> Compensação raio ferramenta</li>
        <li><strong>G94/G95:</strong> Avanço mm/min / Avanço mm/rot</li>
        <li><strong>M54:</strong> Mudança de offset trabalho</li>
    </ul>
</div>
```

### 4. BOXES INFORMATIVOS

**A. Vantagens da Máquina:**
```html
<div class="success-box">
    <strong>✅ VANTAGENS DO [MÁQUINA]:</strong>
    <ul>
        <li>Característica 1</li>
        <li>Característica 2</li>
        ...
    </ul>
</div>
```

**B. Pontos Críticos:**
```html
<div class="warning-box">
    <strong>⚠️ PONTOS CRÍTICOS DE ATENÇÃO:</strong>
    <ul>
        <li>Tolerâncias apertadas</li>
        <li>Material específico</li>
        <li>Refrigeração obrigatória</li>
        ...
    </ul>
</div>
```

**C. Capacidade da Máquina:**
```html
<div class="success-box">
    <strong>✅ CAPACIDADE DA MÁQUINA [NOME]:</strong>
    <ul>
        <li>Especificação 1 ✓</li>
        <li>Especificação 2 ✓</li>
        ...
    </ul>
</div>
```

**D. Metodologia de Tempos (PERMANENTE):**
```html
<div class="success-box">
    <strong>✅ METODOLOGIA DE TEMPOS - ORÇAMENTO PRECISO:</strong>
    <ul>
        <li><strong>TEMPO PRODUTIVO:</strong> Marcado pelo operador na ficha</li>
        <li><strong>TEMPO IMPRODUTIVO:</strong> Calculado pela diferença</li>
        <li><strong>TEMPO TOTAL REAL:</strong> Medido em produção real</li>
        <li>Esta metodologia garante orçamento PRECISO!</li>
    </ul>
</div>
```

---

## 🎨 CORES E FORMATAÇÃO

### Cores Padrão:

- **Verde (#4CAF50):** Tempo PRODUTIVO (cavaco)
- **Amarelo (#FFC107):** Tempo IMPRODUTIVO (auxiliar)
- **Azul (#1976D2 / #2196F3):** Tempo TOTAL / Subtotais
- **Laranja (#ff9800):** Virada manual / Operações especiais
- **Azul claro (#e7f3ff):** Headers G55/G56
- **Amarelo claro (#fff3cd):** Headers operações secundárias
- **Cinza escuro (#495057):** Header da tabela

### Formatação de Texto:

- **Negrito:** Operações principais, ferramentas (T12, N10)
- **Tamanho 11pt:** Headers de seções
- **Tamanho 9pt:** Corpo da tabela
- **Tamanho 8pt:** Informações secundárias (<small>)

---

## 📝 INFORMAÇÕES CRÍTICAS POR OPERAÇÃO

Para cada operação (N10, N20, etc.), incluir:

1. **Número da sequência:** N10, N20, N30...
2. **Nome da operação:** Furação, Desbaste, Acabamento...
3. **Tool:** T12, T06, T10, T05, T08...
4. **Cód. BD:** ⚠️ **OBRIGATÓRIO!**
   - Suporte: 08.08.xxx
   - Inserto: 08.07.xxx
   - Fonte: MINIPCP.csv
5. **Ferramenta:** Descrição + inserto
6. **Vc (m/min):** Velocidade de corte
7. **RPM:** Rotação (com * se tiver limitador G92)
8. **Avanço:** F em mm/min ou mm/rot
9. **Ciclo Fanuc:** G71, G70, G74, G75, G83...
10. **Descrição detalhada:**
    - Nome da operação em negrito
    - Detalhes do ciclo (P, Q, R, U, W)
    - Parâmetros específicos
    - Dimensões resultantes
    - Tolerâncias críticas
    - Observações importantes

---

## ⚠️ ERROS A EVITAR

### ❌ NUNCA FAZER:

1. **Tabela resumida:** NÃO fazer tabela simplificada com tempos gerais
2. **Operações agrupadas:** NÃO agrupar "todas operações G55" em uma linha
3. **Falta de detalhes:** SEMPRE detalhar cada N10, N20, N30...
4. **Sem cores:** SEMPRE usar código de cores (verde/amarelo/azul)
5. **Sem legenda:** SEMPRE incluir box de legenda Fanuc
6. **Material errado:** SEMPRE ler do desenho, NUNCA assumir!

### ✅ SEMPRE FAZER:

1. **Tabela detalhada:** Linha por linha, operação por operação
2. **Cores consistentes:** Verde (produtivo), Amarelo (improdutivo), Azul (total)
3. **Subtotais por lado:** 1º lado e 2º lado separados
4. **Legenda completa:** Box explicando todos os ciclos G
5. **Validação real:** Tempos medidos em peças produzidas
6. **Material correto:** Lido do desenho técnico

---

## 📂 EXEMPLO DE REFERÊNCIA

**Arquivo modelo completo:**
```
D:\lasec\orcamentos\2026\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROCESSO_FABRICACAO_TR1.07.02.033.html
```

**Características do modelo:**
- ✅ Tabela detalhada com 8 operações (N10→N100)
- ✅ Cores: Verde (produtivo), Amarelo (improdutivo), Azul (total)
- ✅ Subtotais por lado (G55: 4,44 min | G56: 2,56 min)
- ✅ Total: 7,0 min validado com 90 peças
- ✅ Legenda completa dos ciclos Fanuc
- ✅ 4 boxes informativos (vantagens, críticos, capacidade, metodologia)

---

## 🔄 PROCESSO DE CRIAÇÃO

### Passo 1: Ler o Programa CNC
- Localização: `D:\PROG_CNC\[codigo].TXT`
- Identificar todas operações N10, N20, N30...
- Anotar ferramentas (T12, T06, T10...)
- Anotar ciclos (G71, G70, G74, G75, G83...)
- Anotar parâmetros (Vc, RPM, F, P, Q, R...)

### Passo 2: Ler Ficha de Processo (se disponível)
- Tempos marcados pelo operador (produtivo)
- Dados de produção real (peças × tempo)
- Calcular tempos improdutivos

### Passo 3: Criar a Tabela
- Header da tabela (9 colunas)
- Cabeçalho G55/G56
- Cada operação em linha separada
- Subtotais por lado
- Virada manual
- Totais finais

### Passo 4: Adicionar Boxes
- Vantagens da máquina
- Pontos críticos
- Capacidade
- Metodologia de tempos
- Legenda Fanuc

### Passo 5: Validar
- Cores corretas?
- Todas operações detalhadas?
- Tempos consistentes?
- Material correto?
- Legenda presente?

---

## 💾 ARMAZENAMENTO

**Este documento é PERMANENTE e deve ser consultado SEMPRE que criar um PROCESSO_FABRICACAO.**

**Localização deste arquivo:**
```
D:\lasec\.claude\knowledge\processo-fabricacao-padrao-detalhado.md
```

**Última atualização:** 26/11/2026
**Status:** ✅ PADRÃO DEFINITIVO
**Exemplo de referência:** Orçamento 008/2026 MICROGEAR TR1.07.02.033

---

## 🎯 RESUMO EXECUTIVO

**3 REGRAS DE OURO:**

1. **TABELA DETALHADA:** Cada operação (N10, N20...) em linha separada com TODOS os detalhes
2. **CORES SEMPRE:** Verde (produtivo), Amarelo (improdutivo), Azul (total)
3. **LEGENDA FANUC:** Sempre incluir box explicando G71, G70, G74, G75, G83...

**NUNCA esquecer:**
- Material do DESENHO (não do orçamento anterior!)
- Tempos VALIDADOS (não estimados!)
- Subtotais POR LADO (G55 e G56 separados!)

**Arquivo de referência perfeito:**
`D:\lasec\orcamentos\2026\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROCESSO_FABRICACAO_TR1.07.02.033.html`

✅ **USAR SEMPRE ESTE PADRÃO!**
