# CHECKPOINT - Orcamento 014 LUBRISYSTEM LBD-0002
# Atualizar SEMPRE que houver mudanca de estado em qualquer documento

## Dados do Orcamento
- **Numero:** 014/2026
- **Cliente:** LUBRISYSTEM
- **Peca:** Suporte de Fixacao - Valvula de Dosagem (LBD-0002)
- **Material:** Aluminio 6351-T6
- **Dimensoes:** 46x37x61mm
- **QTD solicitada:** 50 pecas
- **Desenho:** D:\lasec\Lubrisystem\LBD-0002.pdf

## Maquinas
- **OP1:** Doosan Lynx 220LM (torno CNC + eixo C + ferramentas acionadas)
- **OP2:** Romi Discovery 760 (centro usinagem vertical + 4o eixo)

## Estado dos Documentos

| # | Documento | Estado | Ultima Atualizacao |
|---|-----------|--------|-------------------|
| 1 | PROCESSO_FABRICACAO_LBD-0002.html | EM REVISAO | 2026-03-06 |
| 2 | ESTUDO_CUSTO_FABRICACAO_LBD-0002.html | RASCUNHO (depende do PROCESSO) | 2026-03-05 |
| 3 | ESTUDO_PRECO_VENDA_NFE_LBD-0002.html | NAO CRIADO | - |
| 4 | ANALISE_VIABILIDADE_LOTES_014.html | NAO CRIADO | - |
| 5 | ANALISE_BREAK_EVEN_014.html | NAO CRIADO | - |
| 6 | PROPOSTA_COMERCIAL_014_LUBRISYSTEM.html | NAO CRIADO | - |

## GATE 1: PROCESSO_FABRICACAO — NAO APROVADO

### Correcoes ja aplicadas (NAO REFAZER):

**Sessao 1 (2026-03-04/05):**
1. Improdutivo LYNX reduzido: 3.0min → 1.0min (turret 0.11s/station, DN Solutions)
2. RPM D760 corrigido: 9000 → 7500 (maximo da maquina conforme Romi)
3. Vc fresa topo corrigido: 350 → 283 m/min (limitado pelo RPM max 7500)
4. Vc faceamento corrigido: 400 → 600 m/min (Sandvik referencia para MD Al)
5. Improdutivo D760 reduzido: com ATC 5.5s (spec Romi)
6. RPM brocas HSS corrigido: Vc 41-59 → Vc 29-30 m/min (HSS-Co em aluminio)
7. RPM machos corrigido: Vc 11-15 → Vc 9-10 m/min (ref BD Lubrisystem M5 S400)

**Sessao 2 (2026-03-06):**
8. Broca de centro REMOVIDA: LASEC nao usa — MD alto centrante direto
9. N10 merged: old spotting + furar O15,9 → Broca MD alto centrante O15,9
10. N20 mandrilhar: T03→T02 (renumeracao)
11. Furo O6,20 (N30): REMOVIDO C-axis/ferr.acionada — furo axial no fundo, spindle direto
    - Vc corrigido: 117→59 m/min (G92 S3000)
12. Renumeracao LYNX: N40-N60 (bolt circle, chanfro, rosca)
13. LYNX 6 ferramentas (T01-T06)
14. Furo O3 MOVIDO: face frontal Centro → FACE LATERAL Centro (N100, T09)
15. Setup: LYNX 1.0h (minimo) + Centro 2.0h = 3.0h total
16. Sequencia corrigida LYNX: FURAR → CHANFRAR → ROSCAR
    - N40 furar O3,30 → N50 chanfrar (T06) → N60 roscar M4 (T05)
    - Regra: SEMPRE furar → chanfrar → roscar (nunca furar → roscar → chanfrar)
17. Sequencia corrigida Centro: chanfro antes do macho em todas operacoes
    - M5: N40 furar → N50 chanfrar (T10) → N60 roscar (T04)
    - M6 laterais: furar T05 → chanfrar T10 → roscar T06 (3 ferramentas por posicao)
18. Centro renumerado: N10-N110 (11 operacoes, 10 ferramentas)
19. Improdutivo LYNX RECALCULADO com specs Doosan:
    - Turret 0,11s/estacao (5 trocas = 2,5s)
    - C-axis 25 posicoes x 0,3s = 7,5s
    - M33/M35 3x1s = 3s
    - Total maquina: 0,3 min (18s) — era 1,0 min (CORRIGIDO)
20. Manipulacao LYNX adicionada: 2,0 min (carga/descarga bloco castanha mole)
21. Tabela validacao atualizada

### Valores atuais no PROCESSO:
- **OP1 LYNX:** 6 ferramentas (T01-T06)
  - Produtivo: 4,0 min
  - Improdutivo maquina: 0,3 min
  - Manipulacao operador: 2,0 min
  - **Total LYNX: 6,3 min/peca**
- **OP2 D760:** 10 ferramentas (T01-T10), 11 operacoes (N10-N110)
  - Produtivo: 5,5 min
  - Improdutivo: 1,5 min
  - **Total D760: 7,0 min/peca**
- **Total ciclo: 13,3 min/peca**
- **Setup total: 3,0h** (LYNX 1,0h + D760 2,0h)

### Regras aprendidas nesta sessao:
- Furo axial (face/fundo) no torno: spindle direto, SEM eixo C nem acionada
- Furo radial (perpendicular): eixo C + acionada (M33/M35)
- Furos off-center axiais (bolt circle): eixo C + acionada
- Setup minimo: 1,0h qualquer maquina
- Sequencia OBRIGATORIA: FURAR → CHANFRAR → ROSCAR
- Improdutivo LYNX: calcular com specs reais (turret 0,11s), NAO chutar
- Manipulacao: adicionar tempo operador (carga/descarga/medicao) separado

### Pendente aprovacao do Alexandre:
- Revisao visual do HTML no navegador
- Conferir tempo manipulacao 2,0 min
- Conferir improdutivo Centro (1,5 min — precisa recalcular tambem?)
- Conferir sequencia furar→chanfrar→roscar
- Conferir setup 1,0h LYNX + 2,0h Centro

## ESTUDO_CUSTO (RASCUNHO — recalcular apos aprovacao PROCESSO)
- Tempo total mudou: 13,3 min/peca (era 12,0)
- Setup mudou: 3,0h (era 2,5h)
- TODOS os valores de custo e preco precisam ser recalculados

## Historico de Sessoes
- **2026-03-04:** Criacao inicial PROCESSO + correcoes improdutivo/RPM
- **2026-03-05:** Correcoes HSS/machos, criacao ESTUDO_CUSTO (rascunho)
- **2026-03-06:** Banco CNC v3 + SolidCAM gerados. PROCESSO revisado extensivamente:
  broca centro removida, eixo C corrigido, furo O3 movido lateral,
  setup minimo 1h, sequencia furar→chanfrar→roscar aplicada,
  improdutivo LYNX recalculado specs Doosan (1.0→0.3 min),
  manipulacao 2.0 min adicionada. Total 13,3 min/peca.
