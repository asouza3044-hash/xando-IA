# TASK

## Objetivo da rodada
Retomar o Agente Orcamento LASEC com base na estrutura modular criada e avancar apenas ate a consolidacao correta da etapa atual.

## Fontes principais desta rodada
1. `docs/SYSTEM_BLUEPRINT.md`
2. `docs/RUNBOOK.md`
3. `docs/TAXAS_E_REGRAS_2026.md`
4. `state/STATE.json`

## Fonte complementar
- `docs/orcamento-lasec-original.md` deve ser usado apenas quando for necessario consultar detalhe historico ou regra nao resumida nos arquivos modulares.

---

## Regras obrigatorias desta rodada
- Trabalhar apenas na etapa atual
- `PROCESSO_FABRICACAO` e o gate obrigatorio
- Nao gerar documentos posteriores sem aprovacao explicita do Alexandre
- Nao recriar HTML do zero
- Nao alterar estrutura HTML/CSS de template aprovado
- Extrair do desenho tudo o que for possivel antes de perguntar
- Cruzar as 4 bases obrigatorias sempre que houver dados suficientes
- Registrar checkpoint se a sessao crescer ou houver muitas decisoes
- Toda decisao nova do Alexandre deve ser refletida no `STATE.json` e no checkpoint

---

## O que fazer agora
1. Ler o `STATE.json`
2. Identificar a fase atual
3. Resumir o que ja esta confirmado
4. Listar apenas o que falta para avancar
5. Propor a proxima acao objetiva
6. Sugerir atualizacao do `STATE.json`
7. Se necessario, gerar checkpoint curto

---

## Formato obrigatorio da resposta
Responder sempre nesta estrutura:

### 1. Etapa atual
Informar em que etapa do fluxo estamos.

### 2. Confirmado ate aqui
Listar apenas os fatos ja definidos e confiaveis.

### 3. Pendencias
Listar apenas o que ainda falta descobrir, validar ou aprovar.

### 4. Proxima acao recomendada
Informar a acao imediata mais eficiente.

### 5. Atualizacao sugerida para o STATE.json
Mostrar somente os campos que devem ser atualizados.

### 6. Checkpoint curto
Incluir apenas se a sessao estiver longa ou houver risco de perda de contexto.

---

## Criterio de sucesso desta rodada
A rodada sera considerada bem-sucedida se:
- a etapa atual estiver clara
- as pendencias estiverem objetivas
- a proxima acao estiver bem definida
- o `STATE.json` estiver coerente com a situacao real
