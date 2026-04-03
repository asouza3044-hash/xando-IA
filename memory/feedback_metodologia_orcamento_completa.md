---
name: Metodologia Completa de Orçamento LASEC — NUNCA PERDER
description: A pegada completa do orçamento: BD programas + BD códigos + custo interno + GRV mercado + limite desconto. REGRA MÁXIMA PRIORIDADE.
type: feedback
---

## A PEGADA DO ORÇAMENTO LASEC (Alexandre, ~1 ano pedindo isso)

O orçamento LASEC NÃO é só "tempo × taxa". É um cruzamento de 4 bases de dados + 2 referências de preço que juntas determinam ATÉ ONDE POSSO DAR DESCONTO.

**Why:** Alexandre pediu isso repetidamente ao longo de quase 1 ano. Toda vez que o contexto é perdido, o agente refaz o orçamento incompleto, sem cruzamento, desperdiçando tokens e tempo. ISSO NÃO PODE MAIS ACONTECER.

**How to apply:** TODO orçamento DEVE cruzar TODAS as fontes abaixo. Se faltar uma, o orçamento está INCOMPLETO.

### AS 4 BASES DE DADOS:

1. **BD de Programas CNC** (`PROG_CNC_DATABASE_v3.json` — 11.547 programas)
   - Buscar programas similares por geometria/material/máquina
   - Extrair tempos reais de produção (não teóricos)
   - Validar dados de corte (RPM, avanço, Vc) contra histórico

2. **BD de Códigos / MINIPCP** (`MINIPCP.csv` + `BD MINIPCP.xlsx`)
   - É o BD de TODA a empresa (ferramental, insumos, códigos)
   - Cód.BD das ferramentas (08.08.xxx suporte, 08.07.xxx inserto)
   - Confirmar que LASEC tem o ferramental necessário
   - Se não tem → custo adicional de compra

3. **Custo Interno LASEC** (`custos_ferramentaria lasec.xls` aba "Custos 2026")
   - Taxa hora por máquina (custo real, não preço de venda)
   - LYNX R$ 96,35/h | D760 R$ 121,49/h | D760+4E R$ 151,86/h
   - Setup 1,5× produção | CAD/CAM R$ 76,96/h
   - Composição: salários+encargos, energia, depreciação, área, manutenção, insumos

4. **Custo do Mercado / GRV** (`tabela_precos_hora_maquina_grv_2024.md`)
   - Torno CNC: R$ 156,28/h | Centro 3-eixos: R$ 189,78/h | Centro 4-eixos: ~R$ 237,23/h
   - É o preço que o MERCADO cobra — referência de competitividade

### O CRUZAMENTO (no ESTUDO_CUSTO):

```
CUSTO INTERNO (o que me custa)  ←→  GRV MERCADO (o que o mercado cobra)
         ↓                                    ↓
    R$ 41,15/pç                          R$ 66,73/pç
         ↓                                    ↓
    DIFERENÇA = R$ 25,58/pç = BASE DO LUCRO
         ↓
    MARKUP 35% → NFe R$ 62,33 (abaixo do GRV = competitivo)
         ↓
    LIMITE DESCONTO: nunca abaixo do custo interno (R$ 41,15)
    PREÇO MÍNIMO NFe: R$ 41,15 × 1,12 (impostos+perdas) = ~R$ 46,09
```

### POR QUE ISSO IMPORTA:
- Sei meu custo REAL (planilha interna, não chute)
- Sei o preço do MERCADO (GRV, não chute)
- A DIFERENÇA entre os dois = meu espaço de manobra
- Posso dar desconto ATÉ o custo interno (margem zero)
- Abaixo disso = PREJUÍZO

### ONDE APARECE NO DOCUMENTO:
- **ESTUDO_CUSTO:** Seção obrigatória "Cruzamento Custo Interno × GRV Mercado"
- **ESTUDO_PRECO_NFE:** Seção "Validação" mostrando preço efetivo vs GRV
- **PROPOSTA:** NÃO aparece (confidencial) — mas informa a decisão de preço

### SEQUÊNCIA DE CONSULTA NO ORÇAMENTO:
1. Receber desenho → extrair dados
2. `/buscar-programa` → BD Programas → tempo referência
3. Consultar MINIPCP.csv → ferramental disponível + códigos BD
4. Consultar planilha custo interno → taxa hora da máquina
5. Calcular custo fabricação com dados reais
6. CRUZAR com GRV → mostrar base de lucro + limite desconto
7. Aplicar markup → preço NFe
8. Validar: preço NFe está abaixo do GRV? → competitivo ✓
