---
name: referencia-material-maquina-por-cliente
description: "Padrão de material, máquina e markup por cliente/tipo de peça — extraído dos 54 orçamentos (mineração 27/07/2026). Serve de sanity-check e default, NUNCA substitui o desenho."
metadata: 
  node_type: memory
  type: reference
  originSessionId: d62f2772-e7fb-4f19-9d96-202795cc3680
  modified: 2026-07-27T16:55:59.049Z
---

## Padrão por cliente (minerado dos 54 orçamentos — 27/07/2026)

**Uso:** sanity-check ("esse material/máquina bate com o histórico do cliente?") e ponto de partida.
NUNCA substitui o desenho — material e máquina finais vêm sempre do desenho/anotação do Alexandre.

| Cliente | Material típico | MP fornecida por | Máquina típica | Tipo de peça | Markup |
|---|---|---|---|---|---|
| **MICROGEAR** | aço: SAE 1045/4140/8620, DIN 16MnCr5/20MnCr5 | **cliente** (blank pré-cortado) | LYNX (GL280 p/ desbaste pesado: 033, 034) | engrenagem, pinhão, eixo, bucha, anel, luva, sincronizador | varia: ×1,5147 (35%), mas 026 margem 12%, 034/035 ×1,20 |
| **SPEEDMAQ** (SSX) | AISI 1045 | LASEC | LYNX | flanges, engate, acoplamento | ×1,5147 (35%) |
| **SPEEDMAQ** (VAP válvula) | **alumínio** | cliente | LYNX + D760 (furos radiais/BSP) | corpo/tampa/manípulo de válvula alta pressão | ×1,5147 (35%) |
| **R2** | alumínio (+ SAE 1020) | ? | **100% D760** | peças prismáticas (série 24126) | estimativa |
| **LUBRISYSTEM** | alumínio | ? | LYNX + D760 | eixo/corpo (LBD) | — |
| **INOVAPRO / BBOX** | alumínio | ? | D760 / LYNX | mesa, diversos | — |
| **INOVA_PRODENTAL** | SAE 8620, CAST 77 | cliente | LYNX | conjunto eixo+porca (RISE) | ×1,5147 |
| **TAGLIA** | AISI 1045 | cliente | LYNX + D760 | flange | ×1,35 |
| **CLIENTE_X** | inox | ? | — | — | — |

### Regras derivadas do padrão
- **MICROGEAR = MP sempre fornecida pelo cliente** → custo de material = ZERO (ver `feedback_microgear_mp_fornecida.md`).
- **R2 = sempre D760** (peça prismática) — se aparecer R2, presumir centro, confirmar no desenho.
- **SPEEDMAQ válvula (VAP) usa D760 para as roscas BSP e furos radiais** — live tool do LYNX não comporta
  (ver `feedback_live_tool_limite_ferramental.md`). SSX (flanges 1045) fica só no LYNX.
- **Markup NÃO é fixo** — 35% (×1,5147) é o padrão de parceiro recorrente, mas MICROGEAR já fechou a ×1,20
  (reusinagem, regra 22) e ×1,12 (margem apertada). Sempre confirmar o markup, não assumir 35%.
- **Máquina ativa só pode ser GL280/LYNX/D760** — se o histórico citar Centur/G240/VTC (ex: 026 citou
  Centur), é referência antiga; converter para máquina ativa (ver `projeto_maquinas_legado.md`).

**Origem:** mineração completa dos orçamentos (`projeto_mineracao_orcamentos.md`).
