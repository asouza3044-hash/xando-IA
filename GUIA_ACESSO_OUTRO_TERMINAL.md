# ═══════════════════════════════════════════════════════════════
# 📱 GUIA: ACESSAR SISTEMA LASEC DE OUTRO TERMINAL
# ═══════════════════════════════════════════════════════════════

**Data:** 05/11/2025
**Sistema:** LASEC Usinagem - Orçamentos Automatizados
**GitHub:** https://github.com/asouza3044-hash/xando-IA
**Branch:** lasec-orcamentos

---

## ⚠️ NOTA IMPORTANTE

O orçamento 1.60.01.548 ainda está **INCORRETO**!
- Tempo: precisa ajuste
- Ferramental: precisa correção

Aguardando mais informações para ajustar.

---

## 🚀 OPÇÃO 1: ACESSO RÁPIDO (RECOMENDADO)

### Passo 1: Baixar o repositório

Abra o terminal (CMD ou PowerShell) e execute:

```bash
cd C:\
git clone https://github.com/asouza3044-hash/xando-IA.git lasec
cd lasec
git checkout lasec-orcamentos
```

### Passo 2: Verificar arquivos

```bash
dir
dir sistema
dir base_dados
dir orcamentos\2025
```

### Passo 3: Instalar Node.js (se necessário)

Baixe e instale de: https://nodejs.org/

### Passo 4: Testar o sistema

```bash
node d:\lasec\sistema\gerar_orcamento.js
```

**PRONTO! Você já tem acesso a tudo! ✅**

---

## 📂 ESTRUTURA DOS ARQUIVOS

```
d:\lasec\
│
├── sistema\                          ← Scripts do sistema
│   ├── gerar_orcamento.js           ← Agente automatizado (800 linhas)
│   ├── analisador_cnc.js            ← Analisador de programas CNC
│   ├── testar_agente_003.js
│   ├── CALCULO_FINAL_TEMPO_REAL_8MIN.js
│   ├── ANALISE_DADOS_REAIS_PRODUCAO.txt
│   ├── RESUMO_COMPLETO_JORNADA_APRENDIZADO.md
│   └── ...outros scripts
│
├── base_dados\                       ← Banco de dados
│   ├── dados_completos_orcamentos.json
│   ├── programa_cnc_1.60.01.548.json
│   ├── tempo_real_comprovado_1.60.01.548.json
│   └── ...outros dados
│
├── orcamentos\                       ← Orçamentos gerados
│   ├── INDICE_ORCAMENTOS.txt
│   └── 2025\
│       ├── 001_MICROGEAR_1.34.12.710\
│       ├── 002_MICROGEAR_1.34.03.642\
│       ├── 003_MICROGEAR_1.60.01.548\  ← INCORRETO (aguardando correção)
│       └── 0042025_MICROGEAR_1.60.01.548\
│
├── templates\                        ← Templates HTML
│   ├── TEMPLATE_ESTUDO_CUSTO.html
│   ├── TEMPLATE_PROPOSTA_COMERCIAL.html
│   └── ...
│
├── GUIA_ACESSO_OUTRO_TERMINAL.md    ← Este arquivo
├── SETUP_RAPIDO.bat                  ← Script de configuração
├── README.md
└── .gitignore
```

---

## 💻 OPÇÃO 2: PASSO A PASSO DETALHADO

### PARTE 1: PREPARAR O TERMINAL

#### Windows 10/11:

1. **Abrir Terminal:**
   - Pressione `Win + R`
   - Digite: `cmd` ou `powershell`
   - Pressione `Enter`

2. **Verificar Git instalado:**
   ```bash
   git --version
   ```

   Se não tiver Git:
   - Baixe: https://git-scm.com/download/win
   - Instale com opções padrão
   - Reinicie o terminal

3. **Verificar Node.js instalado:**
   ```bash
   node --version
   ```

   Se não tiver Node.js:
   - Baixe: https://nodejs.org/
   - Instale versão LTS
   - Reinicie o terminal

### PARTE 2: BAIXAR O REPOSITÓRIO

#### Opção A: Clone completo (primeira vez)

```bash
# 1. Ir para pasta raiz
cd C:\

# 2. Clonar repositório
git clone https://github.com/asouza3044-hash/xando-IA.git lasec

# 3. Entrar na pasta
cd lasec

# 4. Mudar para branch correto
git checkout lasec-orcamentos

# 5. Ver arquivos
dir
```

#### Opção B: Atualizar repositório existente

Se você já tem o repositório em `d:\lasec`:

```bash
# 1. Ir para pasta
cd d:\lasec

# 2. Garantir que está no branch correto
git checkout lasec-orcamentos

# 3. Puxar últimas alterações
git pull origin lasec-orcamentos

# 4. Ver o que mudou
git log --oneline -5
```

### PARTE 3: CONFIGURAR CREDENCIAIS (se necessário)

Se o Git pedir usuário/senha:

```bash
# Configurar usuário
git config --global user.name "Alexandre Souza"
git config --global user.email "asouza3044@gmail.com"

# Armazenar credenciais
git config --global credential.helper store

# Na próxima vez que pedir, use:
# Usuário: asouza3044-hash
# Token: [Use o token salvo em ~/.git-credentials ou solicite ao administrador]
```

### PARTE 4: TESTAR O SISTEMA

```bash
# 1. Listar arquivos do sistema
dir d:\lasec\sistema

# 2. Ver orçamentos
dir d:\lasec\orcamentos\2025

# 3. Testar agente
node d:\lasec\sistema\gerar_orcamento.js

# 4. Analisar programa CNC
node d:\lasec\sistema\analisador_cnc.js

# 5. Ver cálculo final
node d:\lasec\sistema\CALCULO_FINAL_TEMPO_REAL_8MIN.js
```

### PARTE 5: ABRIR ARQUIVOS IMPORTANTES

```bash
# Abrir resumo completo
start "" "d:\lasec\sistema\RESUMO_COMPLETO_JORNADA_APRENDIZADO.md"

# Abrir guia de acesso (este arquivo)
start "" "d:\lasec\GUIA_ACESSO_OUTRO_TERMINAL.md"

# Abrir orçamento 003 (INCORRETO - precisa correção)
start "" "d:\lasec\orcamentos\2025\003_MICROGEAR_1.60.01.548\"
```

---

## 🔧 OPÇÃO 3: SCRIPT AUTOMÁTICO

Criamos um script que faz tudo automaticamente!

### Windows:

```bash
# 1. Baixar script
# (já está no repositório como SETUP_RAPIDO.bat)

# 2. Executar
C:\lasec\SETUP_RAPIDO.bat
```

O script vai:
- ✅ Verificar Git instalado
- ✅ Verificar Node.js instalado
- ✅ Clonar ou atualizar repositório
- ✅ Configurar branch correto
- ✅ Mostrar status
- ✅ Abrir arquivos principais

---

## 📝 CONTINUAR O TRABALHO

### Para corrigir o orçamento 1.60.01.548:

1. **Localizar arquivos:**
   ```bash
   cd d:\lasec\orcamentos\2025\003_MICROGEAR_1.60.01.548
   dir
   ```

2. **Ver dados atuais:**
   ```bash
   type d:\lasec\base_dados\tempo_real_comprovado_1.60.01.548.json
   ```

3. **Editar e recalcular:**
   - Use o agente: `node d:\lasec\sistema\gerar_orcamento.js`
   - Ou edite manualmente os arquivos

4. **Salvar alterações:**
   ```bash
   cd d:\lasec
   git add .
   git commit -m "Correção orçamento 1.60.01.548 - tempo e ferramental"
   git push origin lasec-orcamentos
   ```

---

## 🆘 SOLUÇÃO DE PROBLEMAS

### Problema 1: "git: command not found"

**Solução:**
1. Instale Git: https://git-scm.com/download/win
2. Reinicie o terminal
3. Tente novamente

### Problema 2: "node: command not found"

**Solução:**
1. Instale Node.js: https://nodejs.org/
2. Reinicie o terminal
3. Verifique: `node --version`

### Problema 3: "Permission denied" ao fazer git push

**Solução:**
```bash
# Use o helper de credenciais
git config --global credential.helper store

# Na próxima vez vai pedir usuário/token uma vez e salvar
git push origin lasec-orcamentos
```

### Problema 4: Arquivos não aparecem

**Solução:**
```bash
# Verificar branch
git branch

# Mudar para branch correto
git checkout lasec-orcamentos

# Atualizar
git pull origin lasec-orcamentos
```

### Problema 5: Conflitos ao fazer pull

**Solução:**
```bash
# Se houver conflitos
git stash          # Salvar alterações locais
git pull           # Baixar do GitHub
git stash pop      # Aplicar alterações locais novamente
```

---

## 📞 INFORMAÇÕES DE ACESSO

### GitHub:
- **URL:** https://github.com/asouza3044-hash/xando-IA
- **Branch:** lasec-orcamentos
- **Usuário:** asouza3044-hash
- **Token:** [Use o token salvo em ~/.git-credentials ou solicite ao administrador]

### Ver no navegador:
https://github.com/asouza3044-hash/xando-IA/tree/lasec-orcamentos

---

## ✅ CHECKLIST RÁPIDO

Antes de começar a trabalhar no outro terminal:

- [ ] Git instalado (`git --version`)
- [ ] Node.js instalado (`node --version`)
- [ ] Repositório clonado (`cd d:\lasec`)
- [ ] Branch correto (`git branch` → lasec-orcamentos)
- [ ] Arquivos atualizados (`git pull`)
- [ ] Sistema testado (`node d:\lasec\sistema\gerar_orcamento.js`)

**Se todos os itens estiverem OK, você está pronto! ✅**

---

## 📊 STATUS ATUAL DO SISTEMA

### ✅ O que está funcionando:

- [x] Agente automatizado de orçamentos
- [x] Analisador de programas CNC
- [x] Banco de dados com orçamentos 001, 002, 003, 004
- [x] Sistema de cálculo de custos e preços
- [x] Geração de documentos HTML/PDF
- [x] Sincronização com GitHub
- [x] Documentação completa

### ⚠️ O que precisa correção:

- [ ] **Orçamento 003/1.60.01.548:** Tempo e ferramental incorretos
- [ ] Aguardando informações complementares

### 📝 Próximos passos:

1. Receber informações corretas de tempo e ferramental
2. Atualizar cálculos
3. Regenerar documentos
4. Validar com dados reais
5. Salvar no banco de conhecimento

---

## 💡 DICAS ÚTEIS

### Comandos Git essenciais:

```bash
git status              # Ver o que mudou
git log --oneline -10   # Ver últimos 10 commits
git pull                # Baixar alterações do GitHub
git add .               # Adicionar tudo
git commit -m "msg"     # Commit com mensagem
git push                # Enviar para GitHub
```

### Atalhos úteis:

```bash
# Ver resumo rápido
type d:\lasec\sistema\ANALISE_DADOS_REAIS_PRODUCAO.txt | more

# Listar orçamentos
dir d:\lasec\orcamentos\2025

# Ver índice
type d:\lasec\orcamentos\INDICE_ORCAMENTOS.txt
```

---

## 🎯 RESUMO: ACESSO RÁPIDO EM 3 PASSOS

```bash
# 1. Clonar/Atualizar
cd C:\
git clone https://github.com/asouza3044-hash/xando-IA.git lasec
cd lasec
git checkout lasec-orcamentos

# 2. Verificar
dir
dir sistema
node sistema\gerar_orcamento.js

# 3. Trabalhar
# Seus arquivos estão em d:\lasec\
# Edite o que precisar e depois:
git add .
git commit -m "Suas alterações"
git push
```

**PRONTO! Sistema acessível de qualquer terminal! 🚀**

---

**Documentado por:** Claude Code
**Data:** 05/11/2025
**Versão:** 1.0
**Status:** ✅ PRONTO PARA USO

═══════════════════════════════════════════════════════════════
