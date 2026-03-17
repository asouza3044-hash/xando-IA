# Fluxo de Trabalho LASEC — Regras de Processo
# Como o Claude deve trabalhar em cada sessao
# SEGUIR SEMPRE — evita perda de progresso

## Inicio de QUALQUER Sessao sobre Orcamento
1. Ler `memory/orcamentos_estado.md` — saber o que esta ativo
2. Ler `CHECKPOINT.md` no diretorio do orcamento em questao
3. Ler `memory/regras_usinagem.md` — regras do Alexandre
4. NAO refazer correcoes ja listadas no CHECKPOINT
5. Informar ao usuario: "Li o CHECKPOINT, sei que estamos em [estado]"

## Ao Definir Parametros de Corte
1. Consultar `memory/parametros_corte.md` — dados validados LASEC
2. Consultar `PROG_CNC_DATABASE_v3.json` — programas similares
3. Consultar `BIBLIOTECA_FERRAMENTAS_CNC.json` — RPM/avanco reais
4. Aplicar regras de `memory/regras_usinagem.md`
5. Calcular improdutivo com specs REAIS da maquina (`memory/maquinas_specs.md`)
6. NAO usar valores teoricos se existir dado real

## Ao Criar/Editar PROCESSO_FABRICACAO
1. Verificar sequencia: FURAR → CHANFRAR → ROSCAR (regra 2)
2. Verificar: sem broca de centro (regra 1)
3. Verificar: furo axial = spindle direto, SEM eixo C (regra 5)
4. Verificar: setup minimo 1,0h (regra 4)
5. Separar: improdutivo maquina vs manipulacao operador
6. Calcular improdutivo com specs reais (NAO chutar)

## Apos QUALQUER Alteracao
1. SALVAR o HTML (Edit/Write) — NUNCA apenas descrever
2. Atualizar CHECKPOINT.md no diretorio do orcamento
3. Se for regra nova do Alexandre → atualizar `memory/regras_usinagem.md`
4. Se for parametro validado → atualizar `memory/parametros_corte.md`
5. Se mudou estado do orcamento → atualizar `memory/orcamentos_estado.md`
6. Incluir link file:// clicavel para o usuario verificar

## Ao Finalizar Sessao (ou antes de perder contexto)
1. Atualizar CHECKPOINT.md com TUDO que foi feito
2. Atualizar orcamentos_estado.md se estado mudou
3. Registrar novas regras aprendidas na memoria
4. Listar o que ficou pendente no CHECKPOINT

## Hierarquia de Confianca (dados de corte)
1. Correcao direta do Alexandre (MAXIMA PRIORIDADE)
2. Banco de dados CNC LASEC (programas reais 25 anos)
3. Specs fabricante maquina (DN Solutions, Romi)
4. Catalogos fabricante ferramentas (Sandvik, Iscar, Dormer)
5. Valores teoricos/calculados (MENOR PRIORIDADE)

## Retroalimentacao (CRITICO)
- Cada correcao do Alexandre = aprendizado permanente
- Salvar IMEDIATAMENTE em `regras_usinagem.md` ou `parametros_corte.md`
- Nunca depender apenas do CHECKPOINT (ele e por orcamento)
- Memoria do projeto = conhecimento que atravessa TODOS os orcamentos
- Se Alexandre corrigir algo que ja esta na memoria → ATUALIZAR a memoria

## Backup em 3 Destinos (apos mudancas importantes)
1. **Local:** `D:\IA MALELO\` — fonte de verdade (sempre atualizado)
2. **GitHub:** commit + push para `origin/lasec-orcamentos`
   - Repo: `C:\Users\lasec\OneDrive\Documentos\GitHub\xando-IA`
   - Git user: "Alexandre Souza - LASEC" <lasec@malelo.com.br>
3. **VM Oracle:** SCP para `ubuntu@137.131.140.7:/home/ubuntu/backup_lasec/`
   - Chave: `D:\IA MALELO\ssh-key-2026-02-04.key`
- **Quando sincronizar:** novo orcamento, correcoes grandes, novos aprendizados, fim de sessao produtiva
