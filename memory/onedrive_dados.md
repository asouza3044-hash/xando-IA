# Dados do OneDrive - LASEC

## BD MINIPCP.xlsx — Banco de Matérias-Primas (440+ itens)
Aba única: "MINIPCP (3)"
Estrutura: Tipo | Codigo | Descrição

### Categorias e exemplos de código
- **Alumínio** (01.xx.xxx): 120+ itens — vergalhões redondos (1¼" a 6"), blanks, barras chatas. Ligas: 6351-T6, 6061-T6, 6063-T5, 6082-T6
- **Latão** (02.xx.xxx): 80+ itens — vergalhões, tubos, peças semiacabadas
- **Aços** (03.xx.xxx): 200+ itens — SAE 1020/1045/4140/4320/8620/52100, DIN 20MnCr5, Inox 304/316L/420
- **Ferramentas de corte** (04.08.xxx): insertos, suportes
- **Lubrificantes** (06.10.xxx): óleos, graxas, bactericidas

## FICHA DE PROCESSO Padrão Lasec - Rev D.xlsx — Template padrão
Campos: Cliente, Peça, Código, Desenho, Rev, Prog.CNC, Máquina, Castanha, Pressão, Contra-ponto
Instrumentos: Paquímetro 150mm (100%), Micrometro 25-50mm (1/5), Canal Interno (1/10), Subito (1/10), Tridimensional (1 turno), Altímetro Digital (0.1)
Tempos: Usinagem, Peças/hora, Usinagem+Troca, Tempo total, Retirar cavaco, Abastecer Óleo, Rebarbar, Preparação(Ferramentar)

## Inovapro - protetor de aluminio - P3017.xlsx — Orçamento real
- Peça: PROTETOR ALUMINIO (cliente INOVAPRO)
- Material: BLANK ALUMÍNIO 4" x 95mm → depois TAPA ENTRADA VM50 STD
- Máquina: DOOSAN 1
- Produção: **6,06 pcs/hr** | Ciclo: 4'10" | Tempo total: 13'74"
- Setup (ferramentar): 60 min
- Ferramentas 2° lado: SVJCR2020K16, A16M PWLNR06 (WNMG 06T302-NF IC20N ISCAR), S16R-SCLCR06, Broca HSS 4.2mm, Fresa Topo 8mm 2C alumínio, Tmax 23mm

## ordem_producao_reformulada.xlsx — Dados reais de produção
- Peça: SUPORTE METÁLICO INOVAPRO, 50 peças pedidas
- **Hora Torno: R$ 121,00/hr**
- **Hora Centro: R$ 260,00/hr**
- 1° lado: 21 min/pça → 2,857 pcs/hr
- 2° lado: 6,47 min/pça → 9,27 pcs/hr
- Média: 13,74 min/pça → 6,06 pcs/hr
- % carga: 42,35% (1°lado) / 13,05% (2°lado)

## ORDEM DE PRODUÇÃO x peça x tempo atual.xlsx — 100 abas de peças reais
Empresa: Malelo Ind. E Com. Ltda - ME
Seções: SETUP | TORNO | CENTRO DE USINAGEM | FECHAMENTO
Colunas: Operador | Máquina | Operação | Data | Início | Término | Total | Almoço | Café | Qtd Pedida | Fabricada | Restante | Pça/min | Pça/hora | Máq.parada | Não conforme | Observação

Exemplo peça 0004-02A (ANEL SUPORTE C), 525 pças:
- Setup: 2h | 1°lado: 21,9min (DOOSAN) | 2°lado: 21,9min (DOOSAN) | Taxa: R$120/hr

Exemplo peça 0004-01A (ANEL SUPORTE C), 30 pças:
- 3 lados: 55min + 140min + 40min | Máquinas: DOOSAN + VTC30A

## Pasta1.xlsx — Lista de preços
| Código | Preço | Qtde |
|--------|-------|------|
| EF08-0002 | R$ 4,50 | 100 |
| PP01-0001 | R$ 15,40 | 100 |
| PP01-0002 | R$ 14,50 | 100 |
| PP01-0003 | R$ 8,30 | 50 |
| PP04-0001 | R$ 32,50 | 100 |
| PP04-0002 | R$ 3,80 | 100 |
| PP05-0003 | R$ 7,90 | 50 |
| PP05-0004 | R$ 3,30 | 50 |
| PP18-0006 | R$ 5,54 | 50 |
| PP18-0035 | R$ 5,54 | 50 |
| PP25-0001 | R$ 5,20 | 50 |

## NF-e (nfe.xml) — Venda real
NF 5150 | Data: 09/08/2025 | Cliente: Auto Peças Rio Claro Ltda (Curitiba/PR)
Produto: POLIA AUXILIAR DE APOIO SUZUKI SX4 2.0 ALUMÍNIO — LASEC RACING
Valor: R$ 380,00 | ICMS Simples: 2,58% = R$ 9,80 | Pagto: Boleto 10 dias

## Programas CNC (.TXT) — Histórico
Controle: Fanuc (torno) e Siemens (centro)
Peças identificadas: Alojamento, Ponteira MCD, Monoponto, Tipo, Tipo-Monoponto, 314830
Ferramentas comuns: TMAX 23mm, SVJBR, SCLCR, BEDAME 2mm/4mm, Tracionador

## Script PS1 (incompleto)
`criar-sistema-ia-malelo.ps1` — Script para criar estrutura em `D:\IA MALELO\`
Propósito: "Sistema Anti-Esquecimento IA MALELO" — sistema de orçamento automatizado
Autor: Alexandre | Status: incompleto (corta no meio do heredoc)
