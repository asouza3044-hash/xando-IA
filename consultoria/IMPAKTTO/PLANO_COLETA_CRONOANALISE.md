# PLANO DE COLETA — CRONOANÁLISE IMPAKTTO

**Cliente:** IMPAKTTO
**Consultor:** Alexandre Souza (LASEC)
**Data início:** 2026-05-09
**Escopo:** Fábrica completa (≤10 máquinas, ≤15 operadores) — usinagem CNC
**Entregáveis:** Tempo-Padrão, Carga-Máquina, Produtividade O×M×P, Plano de Melhoria

---

## 1. SITUAÇÃO ATUAL

Cliente já mantém **apontamento manual em papel** (formulário "IMPAKTTO — Apontamento de Produção") com:

| Bloco | Campos |
|---|---|
| Pedido/Operação | Data, cliente, ID OP, item, descrição, nº programa, qtd produzida, qtd pedida |
| Operação | Hora início, hora fim, total, nº peças não-conforme, código parada, operador |
| Códigos parada | P01 energia, P02 falta MP, P09 inspeção/CQ, P10 falta serviço, ... (mapear todos) |

**Implicação:** Não começamos do zero. O histórico em papel é a base — cronometragem entra apenas como **calibração**.

---

## 2. ESTRATÉGIA DE COLETA — 5 ETAPAS

### Etapa 1 — Diagnóstico (1–2 dias)
- [ ] Inventariar formulários existentes (quantos meses, quantas máquinas)
- [ ] Avaliar legibilidade média, taxa de campos preenchidos
- [ ] Mapear **todos** os códigos de parada (P01–P??)
- [ ] Listar máquinas, operadores, mix de peças
- [ ] Definir período histórico a digitalizar (sugestão: **últimos 60 dias**)

### Etapa 2 — Digitalização via OCR (semana 1)
**Pipeline OCR para manuscrito:**
1. **Captura:** foto do formulário com celular (boa iluminação, perpendicular, formulário plano)
2. **OCR:** Claude Vision (eu mesmo) lê e estrutura em CSV — funciona bem em manuscrito legível
3. **Saída:** linha por OP em `02_APONTAMENTO_HIST.xlsx`
4. **Validação cruzada:** soma qtd produzida do CSV ≈ qtd produzida real (auditoria amostral 10%)

**Formato CSV alvo:**
```
data;cliente;id_op;item;descricao;n_prog;qtd_prod;qtd_ped;h_inicio;h_fim;total_min;nc;cod_parada;t_parada;operador;maquina
```

**Por que não Tesseract/OCR clássico:** manuscrito tem precisão <40%. Claude Vision em manuscrito legível atinge 85–95% campo a campo. Por segurança, **toda planilha digitalizada passa por revisão visual rápida** antes de virar análise.

### Etapa 3 — Cronometragem de Calibração (semana 2)
Objetivo: medir **fator de honestidade** do apontamento (apontado vs real).

- Selecionar **5–8 peças Pareto** (80% do volume)
- Cronometrar **10 ciclos consecutivos** por peça em condições normais
- Avaliação de ritmo: Westinghouse simplificado (habilidade + esforço + condições + consistência)
- Tolerâncias padrão: **necessidades pessoais 5% + fadiga 4% + esperas inerentes 4% = 13%**
- Calcular: `Tempo Padrão = Tempo Médio × Ritmo × (1 + Tolerâncias)`
- Comparar TP cronometrado × tempo médio apontado → **Fator de Apontamento (FA)**

**Critério:** se FA < 0,85 ou > 1,15, apontamento é não-confiável → reforçar amostragem na Etapa 4.

### Etapa 4 — Amostragem do Trabalho (semana 2–3)
Captura improdutivos que **não aparecem** no apontamento (micro-paradas, conversa, espera fora dos códigos P).

- **N observações:** 400 por máquina (IC 95%, erro 5%)
- **Distribuição:** rounds aleatórios ao longo de 5–10 dias
- **Status registrado:** Produzindo / Setup / Parada-código / Ocioso-sem-código / Ausente
- **Resultado:** % real de utilização ÷ % apontado = **Gap de Apontamento**

### Etapa 5 — Análise e Plano (semana 3–4)
- **Carga-máquina:** capacidade teórica × demanda × ocupação real
- **Matriz O×M×P:** eficiência (TP / tempo real) por operador, máquina e peça
- **Pareto paradas:** ranking por código + horas perdidas/mês
- **Plano de melhoria:** ações priorizadas matriz impacto × esforço

---

## 3. CRONOGRAMA

| Semana | Atividade | Produto |
|---|---|---|
| 1 | Diagnóstico + início OCR | Inventário + 30% histórico digitalizado |
| 2 | OCR completo + cronometragem calibração | Base 60 dias + TP de 5–8 peças |
| 3 | Amostragem trabalho + análise inicial | % utilização real + Gap de apontamento |
| 4 | Consolidação + plano de melhoria | Relatório + plano priorizado |

---

## 4. ESTRUTURA DA PLANILHA (D:\IA MALELO\consultoria\IMPAKTTO\CRONOANALISE.xlsx)

| # | Aba | Conteúdo |
|---|---|---|
| 00 | INSTRUÇÕES | Como usar + fluxo |
| 01 | CADASTROS | Máquinas, operadores, peças, códigos parada, calendário |
| 02 | APONTAMENTO_HIST | OCR digitalizado do formulário (linha por OP) |
| 03 | COLETA_CRONO | Cronometragem de calibração (10 ciclos × peça Pareto) |
| 04 | COLETA_AMOSTRAGEM | Work sampling (round, hora, máquina, status) |
| 05 | TEMPOS_PADRAO | TP por peça×operação (gera de 03, valida com 02) |
| 06 | CARGA_MAQUINA | Capacidade × demanda × ocupação real |
| 07 | PRODUTIVIDADE | Matriz O×M×P + Fator de Apontamento |
| 08 | DASHBOARD | Pareto paradas, ranking ocupação, gráficos KPI |
| 09 | PLANO_MELHORIA | Ações priorizadas (impacto × esforço) |

---

## 5. FORMULÁRIO DE CRONOMETRAGEM (campo)

Será gerado como aba imprimível na planilha. Campos:
- Cabeçalho: data, máquina, operador, peça, programa, observador
- Tabela 10 linhas: ciclo, hora início, hora fim, tempo, observação
- Rodapé: avaliação ritmo (H/E/C/Cs), tolerâncias, anomalias

---

## 6. FORMULÁRIO DE AMOSTRAGEM (campo)

- Lista de máquinas com horários aleatórios pré-sorteados (gerados pela planilha)
- Por observação: hora, máquina, status, código (se parada), nota livre

---

## 7. RISCOS E MITIGAÇÕES

| Risco | Mitigação |
|---|---|
| Letra ilegível no apontamento | Auditoria 10% + revisão visual obrigatória |
| Operador "ajusta" tempo no papel | Cronometragem calibração + amostragem cruzam dados |
| Códigos de parada incompletos | Mapear na Etapa 1 + adicionar campo livre |
| Foto ruim do formulário | Padrão de captura: luz natural, perpendicular, sem dobra |
| Mix de peças muito grande | Foco Pareto 80/20 — não medir todas |

---

## 8. PRÓXIMOS PASSOS IMEDIATOS

1. Confirmar com IMPAKTTO acesso ao histórico de formulários (60 dias)
2. Listar máquinas e operadores ativos
3. Coletar 10 formulários de exemplo (variedade) e fotografar para teste de OCR
4. Aprovar este plano com cliente

---

*Plano elaborado em 2026-05-09. Revisão a cada etapa concluída.*
