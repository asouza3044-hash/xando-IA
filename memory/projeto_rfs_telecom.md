---
name: RFS BRASIL TELECOMUNICAÇÕES — empresa falida (ignorar para repasse, mas usar programas CNC)
description: RFS é o maior faturamento histórico da LASEC mas faliu. NÃO incluir em repasse de custo. Programas CNC dela são referência de qualidade
type: project
---

**Fato:** RFS BRASIL TELECOMUNICAÇÕES LTDA (R$ 9,59 M históricos / 1.245 NFes / 6.649 itens — maior cliente da LASEC) **faliu**. Não há mais relacionamento comercial ativo.

**Why:** os benchmarks de preço dela não devem ser usados como base para reajustes/repasses de custo de clientes ativos, porque o relacionamento acabou e os preços eram negociados em contexto que não existe mais. Incluir RFS na análise de repasse 2026 seria distorcer a base.

**How to apply:**
1. **Repasse de custo / análise de preços de clientes ativos:** IGNORAR RFS (e qualquer CNPJ derivado dela). Filtrar fora do top de clientes.
2. **Programas CNC históricos da RFS:** USAR como referência técnica — Alexandre considera esses programas "**joias, obras de arte**". Quando precisar de inspiração para programa similar (estratégia de usinagem, sequência de operações, escolha de ferramental), buscar primeiro nos programas CNC associados a NFes RFS.
3. Os programas CNC estão indexados em `D:\IA MALELO\banco_dados\PROG_CNC_DATABASE.json` (11.592 programas) e `INDICE_PROGRAMAS_POR_CLIENTE.json` — filtrar por cliente RFS.

**Top clientes ATIVOS para repasse (após excluir RFS, BOZZA, ARTEGA):**
1. HASTE TECNOLOGIA — R$ 4,05 M
2. MICROGEAR — R$ 2,24 M
3. SOHIPREN DO BRASIL (Livenza) — R$ 1,32 M
4. INOVA PRO ODONTO — R$ 234 k
5. CT MICROGEAR (filial) — R$ 213 k
6. LUBRISYSTEM — R$ 208 k

## Outros clientes a IGNORAR no repasse de custo

- **BOZZA JUNIOR INDÚSTRIA** (R$ 315 k históricos) — **saiu do país, não fornecemos mais**. Não usar como benchmark, não incluir em repasse.
- **GALVANOTECNICA ARTEGA** (R$ 427 k históricos) — tem NFes registradas, **mas NÃO é venda de usinagem** — é tratamento de superfície (zincagem/galvanização) que entra como serviço/insumo, não como cliente de usinagem CNC. Ignorar nas análises de preço de peça usinada.
