---
name: Precificação MICROGEAR — benchmarks históricos reais
description: Faixas de preço praticadas com MICROGEAR (1.116 itens, 542 NFes do dump MINIPCP dez/2025) para calibrar novos orçamentos do mesmo cliente
type: feedback
originSessionId: 78bce960-93fa-46e8-b531-89ed31a98f4e
---
**MARKUP MICROGEAR — PARCEIRO ESTRATÉGICO (atualizado 01/05/2026):**
MICROGEAR é parceiro estratégico — manda serviço consistentemente. Markup correto: **20% → fator ×1,3464** (= 1,02 × 1,20 × 1,10). NÃO usar ×1,5147 (35%) para MICROGEAR — está acima do adequado para parceiro de longo prazo.

**Regra:** ao orçar peça nova para MICROGEAR, usar markup 20% (×1,3464) e consultar a curva histórica real do cliente para validar posicionamento.

**Why:** em abr/2026, os orçamentos 025 (Eixo Z-23) e 026 (Pinhão 16D) foram enviados ~14–17% **abaixo** da curva histórica MICROGEAR — Alexandre deixou ~R$ 462 na mesa nos 2 orçamentos juntos. O preço calculado pela fórmula padrão (custo×1,02×1,35×1,10) sai conservador para cliente recorrente em primeiro lote pequeno com programa novo.

**How to apply:** após calcular preço pela fórmula padrão, comparar com a tabela abaixo e considerar **subir 15–20%** se o resultado ficar abaixo do benchmark histórico. Não é regra rígida — é margem disponível que pode ser capturada quando o relacionamento permite.

## Benchmarks MICROGEAR por tipologia (dump dez/2025)

| Tipo | Faixa R$/un | Mediana | Lote típico | Observação |
|---|---|---|---|---|
| **EIXO simples** (tornear básico) | R$ 22–44 | R$ 30 | 100–250 | 9007105, 9007131 |
| **EIXO médio** (chaveta+furação) | R$ 60–95 | R$ 65 | 30–80 | 03.04.144 R$65 lote 56 |
| **EIXO complexo** (tornear completo conf. desenho) | R$ 150–562 | R$ 200 | 30–60 | 9007144 R$183, 9007022 R$512 |
| **FLANGE tornear+furar conf. desenho** | R$ 28–73 | R$ 45 | 90–250 | 9007158 R$72,71 (ago/25, lote 91) é o piso recente |
| **PINHÃO/COROA tornear conf. desenho** | R$ 25–65 | R$ 50 | 20–90 | 9007163 R$65 lote 20 dez/25 = benchmark direto |
| **BUCHA tornear conf. desenho** | R$ 18–70 | R$ 30 | 50–330 | 9007160 R$34,91 (lote 49) / 9007080 R$28,43 (lote 100) |
| **CARCAÇA bomba** | R$ 29–191 | R$ 50 | 100–150 | 9007115/9007119 |
| **TAMPA bomba** | R$ 55–150 | R$ 70 | 80–130 | 9007120 R$68,69 lote 83 |

## Calibração observada (abril/2026)

- **025 Eixo Z-23 (DIN 20MnCr5, escalonado, N7)** → tipologia EIXO MÉDIO. Enviado R$ 58,11/un lote 30. Histórico justo: **R$ 65–72/un** (+12 a 24%).
- **026 Pinhão 16D (SAE 4140 Ø38)** → tipologia PINHÃO/COROA. Enviado R$ 56,77/un lote 20. Benchmark direto **9007163 COROA R$ 65 lote 20** (mesmo cliente, mesmo mês). Justo: **R$ 65–75/un** (+15 a 32%).
- **042 Luva 38x48,5 (aço 8620, bore N7 + furo radial)** → tipologia LUVA tornear conf. desenho, lote 20. Calculado R$ 45,40/un (custo R$33,72 × 1,3464). Benchmark direto **9007130 R$41,34 (lote10) / R$44,44 (lote15)** — preço EM LINHA com histórico (peça mais complexa que o benchmark, então R$45,40 é até conservador). Alexandre CONFIRMOU manter R$45,40 (12/06/2026) — diferente dos casos 025/026, aqui o calculado já bateu na curva, não precisou subir.

## CONTEXTO IMPORTANTE — mudança de processo (abr/2026)

A partir de 2026, Alexandre passou a usar o **agente Claude (orçamento-lasec)** como apoio nos orçamentos MICROGEAR (e demais clientes). Antes ele fazia tudo manualmente com estimativas próprias; agora a fórmula padronizada (custo×1,02×1,35×1,10) puxa o preço para baixo da prática histórica do cliente.

**Implicação:** os preços históricos do dump (R$ 22–562/eixo, R$ 28–73/flange) **incluem o "olho clínico" do Alexandre** — ele sabia quando podia subir. A fórmula automatizada não tem esse instinto. Por isso é OBRIGATÓRIO consultar este arquivo + o JSON `MICROGEAR_classificado.json` antes de fechar preço, e perguntar a ele se quer aplicar o ajuste +15% quando o cálculo sair abaixo da curva histórica.

## Fonte
- Dump: `D:\IA MALELO\banco_dados\minipcp_12_18_2025.dump` (656 MB, dez/2025)
- JSON classificado: `D:\IA MALELO\banco_dados\MICROGEAR_classificado.json`
- Scripts: `C:\Users\lasec\classificar_microgear.py` e `similares_3pecas.py`
- CNPJ MICROGEAR: 63.073.670/0001-58 — total histórico ~R$ 2,24 milhões / 1.116 itens / 542 NFes
