# Memoria LASEC — INDICE PRINCIPAL
# Este arquivo e carregado automaticamente em TODA sessao
# Manter enxuto (<150 linhas) — detalhes nos arquivos tematicos

## Usuario
- Nome: Alexandre | Idioma: Portugues Brasil
- Empresa: Malelo / Nome fantasia: **LASEC** | CNPJ: 07047619000109
- CNAE: 2543800 (usinagem CNC) | Simples Nacional | ERP: minipcp.com.br

## Arquivos de Memoria (LER conforme necessidade)
| Arquivo | Conteudo | Quando Ler |
|---------|----------|------------|
| `regras_usinagem.md` | Regras do Alexandre, sequencias, specs maquinas improdutivo | SEMPRE em orcamento |
| `maquinas_specs.md` | Specs completas LYNX, D760, GL280, Centur | Ao definir maquina/tempos |
| `parametros_corte.md` | Vc/RPM/avanco validados por material | Ao definir dados de corte |
| `fluxo_trabalho.md` | Como trabalhar, retroalimentar, evitar perda | SEMPRE no inicio |
| `orcamentos_estado.md` | Orcamentos ativos, proximo numero | SEMPRE no inicio |
| `onedrive_dados.md` | Taxas maquina reais do OneDrive | Ao calcular custos |

## PROTOCOLO INICIO DE SESSAO (OBRIGATORIO)
1. Ler `fluxo_trabalho.md` — saber como proceder
2. Ler `orcamentos_estado.md` — saber o que esta ativo
3. Ler `CHECKPOINT.md` do orcamento em questao
4. Ler `regras_usinagem.md` — NAO repetir erros
5. Informar usuario: "Li memoria, sei que estamos em [estado]"

## PROTOCOLO RETROALIMENTACAO (OBRIGATORIO)
- Correcao do Alexandre → salvar em `regras_usinagem.md` IMEDIATAMENTE
- Parametro validado → salvar em `parametros_corte.md`
- Mudanca de estado → atualizar `orcamentos_estado.md` + `CHECKPOINT.md`
- NUNCA esperar o fim da sessao para salvar — pode perder contexto

## Projeto Principal: ORCAMENTISTA.html
- Arquivo: `C:\Users\lasec\Documents\orcamento-lasec-hmtl\ORCAMENTISTA.html`
- App HTML single-file, sem build, sem dependencias
- Fluxo: 6 documentos (PROCESSO → CUSTO → PRECO_NFE → VIABILIDADE → BREAK_EVEN → PROPOSTA)

## Agente Claude Code
- Comandos: `/orcamento-lasec`, `/buscar-programa`, `/calcular-orcamento`
- Regras: `C:\Users\lasec\.claude\rules\lasec-orcamentos.md`
- Templates: `D:\IA MALELO\templates\orcamento-lasec-hmtl\`
- Dados: `D:\IA MALELO\banco_dados\` (23 arquivos, indice em INDICE_BANCO_DADOS_LASEC.md)
- ANO ATUAL: 2026 | Proximo orcamento: 015/2026

## REGRAS RAPIDAS (detalhes em regras_usinagem.md)
1. Sem broca de centro — MD alto centrante direto
2. FURAR → CHANFRAR → ROSCAR (nunca inverter)
3. Furo axial = spindle direto (sem eixo C)
4. Setup minimo 1,0h (centro 4o eixo: 2,0h)
5. Improdutivo: calcular com specs reais (NAO chutar)
6. Manipulacao operador: separar do improdutivo maquina
7. HSS em Al: Vc 29-30 (broca), Vc 9-10 (macho)
8. Templates: COPIAR e editar, NUNCA criar do zero
9. Proposta: NUNCA incluir dados confidenciais (hora-maquina, tempo, markup)
10. Apos editar HTML: SEMPRE salvar + incluir link file://

## AVISO PowerShell
- NUNCA usar `-replace` inline em bash com `$_`
- SEMPRE usar arquivos .ps1 com `[System.IO.File]::ReadAllText`

## Taxas de Maquina (OneDrive confirmado)
- Torno DOOSAN: R$ 121/hr | Centro Usinagem: R$ 260/hr

## Preferencias do Usuario
- Falar sempre em portugues Brasil
- SEMPRE incluir link file:// clicavel apos criar/atualizar HTML
  - Formato: `file:///D:/IA%20MALELO/orcamentos/...`
