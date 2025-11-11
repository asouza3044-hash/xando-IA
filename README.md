# Xando IA - Sistema LASEC Orçamentos

Sistema completo de orçamentação para peças usinadas com sincronização em nuvem e integração com Claude Code.

## 📋 Sobre o Projeto

Sistema inteligente de orçamentos para usinagem CNC desenvolvido para LASEC Usinagem, com:

- ✅ Análise de desenhos técnicos
- ✅ Cálculo automatizado de tempo de usinagem
- ✅ Pesquisa de custos hora-máquina (GRV Software)
- ✅ Geração de documentos profissionais (HTML + PDF)
- ✅ Sincronização automática em nuvem
- ✅ Integração com Claude Code para múltiplos terminais

## 🚀 Última Atualização da Nuvem

**Data:** 7 de Novembro de 2025

**Novidades:**
- Sistema de Dashboards Interativos com atualização automática
- 4 gráficos interativos (Chart.js)
- 6 KPIs em tempo real
- Monitoramento a cada 30 segundos
- Sistema de Aprendizado CNC com 11.785 programas analisados
- LASEC Versão 2.0 completa

## 📁 Estrutura do Repositório

```
xando-IA/
├── projeto/                          # Projeto LASEC completo
│   ├── base_dados/                   # Banco de dados e biblioteca CNC
│   │   ├── dados_completos_orcamentos.json
│   │   ├── biblioteca_cnc.json       # 11.785 programas CNC
│   │   └── padroes_cnc.json
│   ├── orcamentos/                   # Orçamentos gerados
│   │   └── 2025/
│   │       └── 001_MICROGEAR_1.34.12.710/
│   ├── templates/                    # Templates reutilizáveis
│   ├── dashboards/                   # Dashboards interativos
│   ├── sincronizar_nuvem_windows.ps1 # Script de sincronização
│   ├── config_sincronizacao.json     # Configuração
│   └── GUIA_SINCRONIZACAO_NUVEM.txt  # Guia completo
└── conversas/                        # Histórico de conversas Claude
```

## 🔧 Instalação e Configuração

### Requisitos

- Windows 10 ou superior
- Git for Windows ([Download](https://git-scm.com/download/win))
- Claude Code instalado
- PowerShell 5.1 ou superior

### Configuração Inicial (Primeira Vez)

1. **Clone o repositório:**
   ```powershell
   cd C:\
   git clone https://github.com/asouza3044-hash/xando-IA.git
   ```

2. **Crie os atalhos de sincronização:**
   ```powershell
   cd C:\xando-IA\projeto
   .\atalhos_sincronizacao.ps1
   ```

3. **Execute o setup:**
   - Clique duas vezes em `LASEC_Sync_SETUP.bat` (criado na Área de Trabalho)
   - Ou execute: `.\sincronizar_nuvem_windows.ps1 -acao setup`

4. **Faça a primeira sincronização:**
   - Clique em `LASEC_Sync_BAIXAR.bat`
   - Ou execute: `.\sincronizar_nuvem_windows.ps1 -acao baixar`

## 📊 Sincronização com a Nuvem

### Atalhos Rápidos (Área de Trabalho)

Após executar `atalhos_sincronizacao.ps1`, você terá:

- `LASEC_Sync_SETUP.bat` - Configuração inicial (executar apenas uma vez)
- `LASEC_Sync_BAIXAR.bat` - Baixar atualizações da nuvem
- `LASEC_Sync_ENVIAR.bat` - Enviar atualizações para a nuvem
- `LASEC_Sync_STATUS.bat` - Ver status da sincronização

### Comandos Manuais

```powershell
# Ver status
.\sincronizar_nuvem_windows.ps1 -acao status

# Baixar atualizações
.\sincronizar_nuvem_windows.ps1 -acao baixar

# Enviar atualizações
.\sincronizar_nuvem_windows.ps1 -acao enviar

# Configurar (primeira vez)
.\sincronizar_nuvem_windows.ps1 -acao setup
```

### Fluxo de Trabalho Recomendado

**Manhã:**
1. Execute `LASEC_Sync_BAIXAR.bat`
2. Inicie Claude Code
3. Trabalhe normalmente

**Noite:**
1. Salve seu trabalho
2. Execute `LASEC_Sync_ENVIAR.bat`
3. Digite mensagem de commit (ou Enter para padrão)

## 🤖 Trabalhando com Claude Code

### Iniciar com Contexto Completo

```powershell
cd C:\lasec
claude-code
```

No Claude, digite:
```
Leia o arquivo HISTORICO_CONVERSAS.txt e continue de onde paramos
```

### Arquivos Importantes para Claude

- `HISTORICO_CONVERSAS.txt` - Contexto completo do projeto
- `GUIA_RAPIDO_ORCAMENTOS.txt` - Manual de uso do sistema
- `SISTEMA_IMPLEMENTADO.txt` - Documentação técnica
- `base_dados/dados_completos_orcamentos.json` - Banco de dados

### Trabalhar em Múltiplos Computadores

**Computador Casa:**
1. Manhã: `LASEC_Sync_BAIXAR.bat`
2. Trabalhar com Claude
3. Noite: `LASEC_Sync_ENVIAR.bat`

**Computador Escritório:**
1. Manhã: `LASEC_Sync_BAIXAR.bat` (pega atualizações de casa!)
2. Trabalhar com Claude
3. Noite: `LASEC_Sync_ENVIAR.bat`

Resultado: Sempre sincronizado! 🎯

## 📈 Sistema de Orçamentos LASEC

### Versão Atual: 2.0

**Recursos:**
- Análise automática de desenhos técnicos
- Cálculo de tempo de usinagem com dados Iscar
- Biblioteca CNC com 11.785 programas analisados
- Geração de documentos profissionais
- Dashboards interativos em tempo real
- Sistema de aprendizado CNC

**Orçamentos Gerados:**
- Total: 7 orçamentos
- Valor Total: R$ 9.756,57+
- Último: 007/2025 - Tampa de Alumínio (Cliente DOST)

### Documentos Gerados Automaticamente

Para cada orçamento:
- Estudo de Custo de Fabricação (PDF)
- Estudo de Preço de Venda com NF-e (PDF)
- Proposta Comercial (PDF)
- Ficha de Processo (HTML)
- Orçamento Completo (PDF)

## 🔄 Sincronização Automática

### Configurar Sincronização a Cada Hora

**Método 1: Script Contínuo**
```powershell
.\auto_sincronizar.ps1
```

**Método 2: Agendador de Tarefas (Recomendado)**
1. Abra "Agendador de Tarefas" do Windows
2. Criar Tarefa Básica
3. Nome: "LASEC Sync Auto"
4. Gatilho: Diariamente
5. Ação: Executar `sincronizar_nuvem_windows.ps1 -acao baixar`
6. Repetir a cada: 1 hora

## 🛠️ Solução de Problemas

### Git não está instalado
```powershell
# Baixe e instale:
https://git-scm.com/download/win
# Reinicie o PowerShell
```

### Repositório não configurado
```powershell
.\sincronizar_nuvem_windows.ps1 -acao setup
```

### Erro ao enviar para GitHub
```powershell
# Verifique conexão com internet
# Tente manualmente:
cd C:\xando-IA
git push origin main
```

### Pasta não encontrada
```powershell
# Crie as pastas necessárias:
mkdir "D:\Cloude IA"
mkdir "C:\lasec"
```

## 📚 Documentação Adicional

- `GUIA_SINCRONIZACAO_NUVEM.txt` - Guia completo de sincronização
- `GUIA_RAPIDO_ORCAMENTOS.txt` - Manual do sistema de orçamentos
- `SISTEMA_IMPLEMENTADO.txt` - Documentação técnica completa
- `HISTORICO_CONVERSAS.txt` - Histórico de desenvolvimento

## 🔗 Links Úteis

- **Repositório:** https://github.com/asouza3044-hash/xando-IA
- **Git for Windows:** https://git-scm.com/download/win
- **Claude Code:** https://claude.ai

## 📞 Suporte

Para ajuda:
1. Leia `GUIA_SINCRONIZACAO_NUVEM.txt`
2. Execute `LASEC_Sync_STATUS.bat` para diagnóstico
3. Pergunte ao Claude Code!

## 📝 Licença

Este é um projeto proprietário da LASEC Usinagem.

---

**Última atualização:** 11/11/2025
**Versão:** 2.0
**Sistema:** Xando IA - LASEC Orçamentos
