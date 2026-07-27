# Montar Processo de Fabricação — LASEC (RIGOROSO)

Você é o agente responsável por construir (ou revisar) um `PROCESSO_FABRICACAO` LASEC. Esta skill existe
porque a versão "de memória" desse fluxo falhou repetidamente: gates pulados, tempos chutados sem fórmula,
códigos de ferramenta inventados, cruzamento com BD CNC ignorado. Cada passo abaixo produz um ARTEFATO
VISÍVEL dentro do próprio documento — não basta "ter feito", tem que aparecer no HTML, senão o passo não
foi cumprido.

**Regra de ouro desta skill: se você não consegue preencher a célula da tabela de verificação com um dado
real (código, fonte, fórmula), NÃO escreva um valor "aproximado" — deixe em branco e marque como pendência
explícita para o Alexandre.** Isso vale mais que terminar rápido.

## Quando usar

Sempre que for gerar ou revisar um `PROCESSO_FABRICACAO` — peça nova (via `/orcamento-lasec-modular`),
reconciliação com dados reais de produção (via `/fechar-as-built`), ou diretamente quando o Alexandre
pedir "monta o processo de X" / "chegou o as-built de Y". **Esta skill é a ÚNICA fonte de verdade para
construir ou reconstruir um PROCESSO_FABRICACAO — não existe uma versão "as-built" separada em outro
lugar.** `/fechar-as-built` só identifica o orçamento e orquestra os documentos seguintes; a reconciliação
do processo em si acontece aqui (Passo 2).

---

## Passo 1 — Escolher o modo

- **Modo A — Peça nova / estimativa de engenharia:** ainda não tem dado real de produção. Pular direto
  para o Passo 3.
- **Modo B — As-built (dados reais de produção chegaram):** Alexandre trouxe apontamento, G-code
  executado, ou tempo falado direto do chão de fábrica para uma peça já orçada (estimativa) ou já
  produzida sem processo salvo. Fazer o Passo 2 primeiro, depois seguir do Passo 3 em diante normalmente
  — BD CNC/MINIPCP (Passos 5-6) continuam valendo para preencher o que o as-built não cobre (ex.: código
  de ferramenta de uma operação nova).

## Passo 2 — Roteiro AS-BUILT (só no Modo B)

1. **Coletar o apontamento**, em qualquer formato — G-code (.nc/O-number), foto/PDF de ficha manuscrita,
   ou tempo falado no chat. Extrair: datas, horário início/fim, peças produzidas por janela, paradas, o
   que cada janela representa (setup+try-out+1ª peça vs produção pura)
2. **NÃO perguntar número de OP ou fonte dos tempos** — Alexandre fornece os tempos diretamente
   (`feedback_as_built_fluxo_tempos.md`). Só é legítimo confirmar a LEITURA de números ambíguos (caligrafia
   ruim, horário ilegível) — isso é diferente de perguntar a fonte.
3. **Separar SETUP de PRODUÇÃO PURA:**
   ```
   Tempo bruto = horário fim − horário início (min)
   Tempo ajustado = bruto − paradas (almoço, café, manutenção)
   Tempo/peça (produção pura) = ajustado ÷ peças produzidas
   ```
   Se múltiplos dias/operadores: somar TODOS os dias (`Σ ajustado ÷ Σ peças`)
4. Setup/try-out (programa+castanha+try-out, geralmente inclui a 1ª peça) → taxa SETUP (1,5×), NUNCA taxa
   produção (regra 18 — `feedback_custos_fixos_lote_pequeno.md`)
5. **Se o as-built divergir muito do ciclo/estimativa original (regra de bolso: >1,5×), PARAR e confirmar
   com Alexandre qual tempo usar para custo antes de escrever qualquer número** — regra 16
   (`regras_usinagem.md`). As-built bruto pode incluir ineficiência operacional (curva de aprendizado,
   paradas não descontadas); o "tempo para custo" pode ser MENOR que o as-built bruto se Alexandre decidir
   assim ("cliente não paga minha ineficiência") — mas isso é DECISÃO dele, não presunção minha
6. Se houver operações do processo ainda NÃO executadas (ex: 2ª máquina/fixação pendente), perguntar
   objetivamente como tratar — manter estimativa de engenharia sinalizada, ou aguardar antes de fechar.
   Não presumir, não tratar pendente como se fosse as-built
7. Se o Alexandre mandar um processo manuscrito corrigindo a leitura do desenho original (ex: "não é
   assento cônico, é broca"), a anotação dele é fonte de verdade — reconstruir o processo a partir dela,
   nunca insistir na leitura antiga do PDF (`feedback_drill_point_vs_cone.md`)
8. Marcar CLARAMENTE no documento final: **AS-BUILT REAL** (com data/origem) vs **ESTIMATIVA** (o que
   ainda não foi produzido) — nunca misturar sem rótulo

## Passo 3 — Ler a hierarquia de confiança (nesta ordem, sempre)

1. Correção direta do Alexandre nesta conversa (máxima prioridade — sobrepõe tudo abaixo)
2. Dados reais de produção (`D:\IA MALELO\banco_dados\tempo_real_comprovado_*.json`, as-built, ordens de
   produção)
3. Banco CNC LASEC (`PROG_CNC_DATABASE_v3.json` via `/buscar-programa`,
   `D:\IA MALELO\banco_dados\BIBLIOTECA_FERRAMENTAS_CNC.json`)
4. Aprendizados documentados (`D:\IA MALELO\banco_dados\ATUALIZACAO_APRENDIZADOS_*.md`,
   `D:\IA MALELO\banco_dados\ORCAMENTO_*_APRENDIZADOS.md`)
5. Tabelas técnicas corrigidas (`D:\IA MALELO\banco_dados\TABELA_DADOS_CORTE_CORRIGIDA_FONTES_TECNICAS.md`,
   `memory/parametros_corte.md`)
6. Especificações de fabricante (DN Solutions, Romi, Sandvik, Dormer)
7. Valores teóricos calculados (menor prioridade — só se nada acima existir)

Ler também `memory/regras_usinagem.md` (regras 1-23 do Alexandre) e `memory/maquinas_specs.md` (specs
reais de improdutivo) antes de escrever qualquer operação.

## Passo 4 — Extrair features SÓ do desenho

- Listar toda geometria/cota visível no desenho técnico ANTES de abrir qualquer programa similar
- **NUNCA inferir uma feature (bore, furo, rosca) só porque um programa parecido tem essa operação** —
  confirmar no desenho ou na anotação do Alexandre. Ver `feedback_nao_inferir_bore_de_programas.md`
  (incidente 035/2026: assumi bore interno que não existia)
- Se houver ambiguidade de leitura (linha tracejada, símbolo, cota faltando), é legítimo confirmar com o
  Alexandre — isso é diferente de "perguntar a fonte dos dados". Ver `feedback_drill_point_vs_cone.md`
  (ponta tracejada no fundo de furo = símbolo de broca, não é sempre feature funcional)
- Se o Alexandre mandar processo manuscrito/foto, ele é fonte de verdade e pode CORRIGIR o desenho —
  reconstruir o processo a partir da anotação dele, não forçar a leitura antiga do PDF

## Passo 5 — Buscar programa CNC similar (BD CNC)

Seguir o protocolo de cache do `/buscar-programa` / `orcamento-lasec-modular`:
1. Ler `D:\IA MALELO\bd_cnc\index_raiz.json` → cliente→tipos
2. Ler `D:\IA MALELO\bd_cnc\CLIENTE/tipo/cache.json`
3. Calcular similaridade (máquina 30% + tipo peça 25% + qtd tools 15% + qtd lados 15% + features 15%)
4. Mostrar tabela compacta ao Alexandre: `programa | similaridade% | tempo_ciclo | operações_chave`
5. **Se ≥60%:** usar como referência de PARÂMETROS DE CORTE (Vc/avanço/RPM validados) — nunca de geometria
6. **Se <60% ou nenhum encontrado:** registrar explicitamente "sem programa similar — seguindo com
   parâmetros de tabela validada" no documento. Não fingir que buscou se não buscou.
7. Se existir programa da MESMA família/cliente (ex: peça irmã), ele vale como referência de parâmetros
   reais (S, F) — mas cada operação nova ainda precisa do cálculo do Passo 7, não copiar o tempo direto
   (família ≠ tempo igual, ver `feedback_familia_nao_e_tempo.md`)
8. Cobertura do BD CNC só vai até ~2023 — peças 2024+ não estarão indexadas, avisar direto sem insistir
   (`feedback_bd_cnc_cobertura_2023.md`)

## Passo 6 — Cruzar CADA ferramenta com o MINIPCP (nunca inventar código)

Para CADA linha de operação do processo:
1. Buscar no `D:\IA MALELO\banco_dados\MINIPCP.csv` (usar `grep -a` — é binário/latin1, precisa da flag)
2. Achou → usar o código real (`08.07.xxx` pastilha, `08.08.xxx` suporte, `08.09.xxx` macho, `08.12.xxx`
   broca, etc.)
3. **Não achou → campo em branco + "não localizado no MINIPCP, confirmar com Alexandre"**. NUNCA escrever
   "(similar)", "(a confirmar)" como se fosse um código, nem inventar um código plausível
4. Furo de pré-furo em torno (bore final ≥~31mm) → padrão é broca Tmax Ø29 (`08.08.060` suporte +
   `08.07.036` pastilha) — usar sem precisar rebuscar, é regra validada (`feedback_broca_tmax_bd_cruzamento.md`)
5. Referência de mapeamentos comuns já validados: `feedback_codigos_ferramentas_minipcp.md` (torneamento,
   furação, mandrilamento, bedame, canal interno, fresas D760, escareadores, brocas)
6. Checklist antes de fechar: nenhuma linha com "(similar)"/"a confirmar" como código real; toda pastilha/
   suporte tem código OU está marcada como pendência

## Passo 7 — Calcular tempo de CADA operação com fórmula (nunca chutar)

Formato obrigatório por operação, conforme `D:\IA MALELO\banco_dados\PADRAO_DADOS_CORTE_OBRIGATORIO.md`:

```
RPM = (Vc × 1000) / (π × D)
Avanço (mm/min) = RPM × f (mm/rot)
Tempo torneamento = comprimento de corte / avanço(mm/min)
Tempo furação = (profundidade / avanço mm/min) × 1,2  (margem de retração/aproximação)
Tempo roscamento G84 = (profundidade / (RPM × passo)) × 2  (ida + volta)
```

- Vc/avanço: usar `memory/parametros_corte.md` (dados validados LASEC) primeiro; se não tiver o
  diâmetro/material exato, usar `D:\IA MALELO\banco_dados\TABELA_DADOS_CORTE_CORRIGIDA_FONTES_TECNICAS.md`
  ou `D:\IA MALELO\banco_dados\PADRAO_DADOS_CORTE_OBRIGATORIO.md` (tabelas por material: alumínio, aço
  1020, aço tratado, inox)
- Se o programa similar do Passo 5 tiver S/F reais, usar esses valores em vez da tabela genérica
- Improdutivo (troca de ferramenta, indexação, rapid): usar specs REAIS de `memory/maquinas_specs.md`
  (LYNX: turret 0,11s/estação, troca completa ~0,5s, rapid X 30m/min, rapid Z 36m/min — NUNCA usar "1 min"
  de improdutivo por chute)
- **RPM calculado (RPM = Vc×1000/(π×D)) precisa respeitar DOIS limites — o menor dos dois vence:** (1) o
  limite real da máquina (LYNX 6.000 / D760 7.500 / GL280 4.500 — `memory/maquinas_specs.md`) e (2) o
  limite da própria ferramenta, que pode ser bem menor mesmo numa máquina rápida (ex.: broca Ø3mm — máximo
  3.000 RPM, mesmo no D760 a 7.500). Nunca aceitar o RPM que sai puro da fórmula/tabela de Vc sem checar
  contra os dois — incidente 049/2026 ENGEPLAST: S8000 calculado para broca Ø3,2mm, nem a máquina nem a
  broca aguentam isso, Alexandre corrigiu para S3000
- Cada operação do PROCESSO precisa aparecer com: ferramenta, Ø, Vc, RPM, avanço (mm/rot e mm/min),
  profundidade/comprimento, ciclo CNC (G83/G76/G84/etc.), tempo calculado — mostrando a conta, não só o
  resultado
- **SEMPRE somar Manipulação do Operador como linha separada do improdutivo de máquina** (carga/descarga,
  fixação, medição/inspeção) — torno em castanha ~2,0 min/pç, centro com morsa+4º eixo ~3,0 min/pç
  (`memory/maquinas_specs.md`, seção "Manipulação do Operador"). **Sem essa linha, o ciclo calculado fica
  irreal (pç/h impossível na prática)** — incidente 049/2026 ENGEPLAST: cálculo só de máquina deu
  ~74-78 pç/h; com manipulação somada, caiu para ~21-22 pç/h, batendo com a experiência real do Alexandre
  (20-25 pç/h). Antes de apresentar qualquer ciclo calculado, perguntar: "esse pç/h é fisicamente
  plausível pra essa máquina/operação?" — se meia dúzia de segundos por peça parecer bom demais, É bom
  demais, falta essa linha
- Distinguir sempre: **as-built real** (Passo 2, se Modo B) vs **estimativa de engenharia** (Modo A/peça
  nova) — marcar claramente qual é qual no documento
- **No Modo B:** o tempo de produção já vem do Passo 2 — não recalcular com fórmula teórica por cima do
  dado real. A fórmula deste passo se aplica só às operações que o as-built NÃO cobriu (ex.: ferramenta
  nova, operação ainda pendente) ou para conferir plausibilidade (RPM dentro da faixa da máquina?) sem
  substituir o número real

## Passo 8 — Custos fixos SEMPRE na taxa 1,5×

- Setup, programação CNC/CAM, inspeção 1ª peça, validação de qualidade → **SEMPRE taxa setup (1,5×
  produção)**, nunca taxa produção — erro já causou prejuízo real (022/2026). Ver
  `feedback_custos_fixos_lote_pequeno.md`
- Programação CNC peça nova complexa: mínimo 4h (meio dia). Setup mínimo: 1,0h qualquer máquina, 2,0h
  centro com 4º eixo (regra 4)
- Em lote <10 peças: custos fixos devem representar ~60-70% do custo unitário — se estiver muito abaixo
  disso, é sinal de que a taxa errada foi usada em algum lugar, conferir de novo

## Passo 9 — Copiar template, nunca criar HTML do zero

- Template: `D:\IA MALELO\templates\orcamento-lasec-hmtl\PROCESSO_FABRICACAO_PP01_00003.html`
- Se o layout não servir para o caso (ex: múltiplas peças), usar `memory/template_multipecas.md` ou o
  orçamento de referência mais próximo já aprovado — NUNCA escrever tags HTML/CSS do zero
  (`feedback_nunca_criar_html.md` — incidente 023/2026, Alexandre ficou "muito muito decepcionado")
- Copiar `simbolo-lasec.jpg` para a pasta do orçamento

## Passo 10 — Checklist de verificação (DENTRO do HTML, visível)

Todo `PROCESSO_FABRICACAO` gerado por esta skill DEVE incluir, antes do rodapé, uma tabela assim:

| Verificação | Status |
|---|---|
| Modo (A-novo ou B-as-built) e fonte do tempo declarados | ✅ Modo X — origem: ... |
| Features extraídas só do desenho/anotação (não inferidas de programa similar) | ✅ / ⚠️ pendência |
| (Modo B) Setup separado de produção pura, gap vs estimativa checado (regra 16) | ✅ / N/A (Modo A) |
| BD CNC consultado (programa similar encontrado / não encontrado, % similaridade) | ✅ resultado: ... |
| Cada ferramenta cruzada com MINIPCP (código real ou pendência explícita) | ✅ / lista de pendências |
| Cada tempo calculado com fórmula (Vc/RPM/avanço/comprimento) OU as-built real com origem citada | ✅ |
| Manipulação do operador somada (linha separada, ~2,0min torno / ~3,0min centro) — pç/h final é plausível? | ✅ / ⚠️ conferir |
| RPM de cada operação dentro do limite da máquina E da ferramenta (o menor dos dois) | ✅ / ⚠️ conferir |
| Custos fixos (setup/prog/inspeção) na taxa 1,5× | ✅ |
| Template copiado (não criado do zero) | ✅ |

Se qualquer linha não for ✅, o documento NÃO está pronto para aprovação — dizer isso explicitamente ao
Alexandre em vez de apresentar como se estivesse completo.

## Passo 11 — GATE — aprovação explícita, sem atalho

- Apresentar o processo com a tabela de verificação preenchida
- Perguntar literalmente: **"Aprovado?"**
- **Só tratar como aprovado com resposta explícita** ("aprovado", "sim", "pode seguir", "confirmado")
- Correções técnicas (ex: "a rosca é M12x1,5, não M12x1,75"), respostas a perguntas de material/markup,
  ou qualquer outra informação NÃO valem como aprovação do gate — são insumo para nova revisão, que volta
  pro Passo 4-10 antes de perguntar de novo
- NUNCA gerar CUSTO/PRECO_NFE/VIABILIDADE/BREAK_EVEN/PROPOSTA antes do "aprovado" explícito
- Ver `feedback_processo_gate_batch.md` — isso já aconteceu 2× (05/04 e 23/07/2026) mesmo estando
  documentado; a diferença agora é que o checklist do Passo 10 fica no próprio documento, não só na
  memória

## Passo 12 — Checkpoint imediato

- Assim que o processo for aprovado (ou revisado), atualizar `memory/orcamentos_estado.md` e o
  `CHECKPOINT.md` da pasta do orçamento NA HORA — não esperar o fim da sessão
- Checkpoint por EVENTO (aprovação, correção, HTML salvo), nunca por "% de tokens"

---

## O que esta skill explicitamente NÃO faz

- Não decide markup/CIF/fórmulas comerciais — isso é do `/orcamento-lasec-modular` e `regras_usinagem.md`
- Não gera os outros 5 documentos — só o `PROCESSO_FABRICACAO` (e, no Modo B, o ESTUDO_CUSTO/PRECO_NFE
  reconciliados, se já existirem — a criação dos 3 documentos finais continua com `/orcamento-lasec-modular`
  depois do gate)
- Não aceita "está parecido o suficiente" como substituto de cruzamento real com MINIPCP/BD CNC
- Não inventa código de ferramenta, ângulo de cone, ou geometria não cotada — pergunta ou deixa pendência
- Não pergunta número de OP ou fonte dos tempos no Modo B — os tempos vêm do Alexandre
- Não sobrescreve custo silenciosamente quando o gap as-built×estimativa é grande — para e confirma
- Não fecha operações pendentes como se fossem as-built — mantém estimativa sinalizada até confirmação
