# Script de Sincronização Nuvem - Claude Windows
# Sincroniza conversas e dados entre computador local e GitHub
# Execute com: powershell.exe -ExecutionPolicy Bypass -File sincronizar_nuvem_windows.ps1

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('baixar', 'enviar', 'status', 'setup')]
    [string]$acao = 'status'
)

# Configurações
$repoUrl = "https://github.com/asouza3044-hash/xando-IA.git"
$pastaLocal = "C:\xando-IA"
$pastaConversas = "D:\Cloude IA"
$pastaProjeto = "C:\lasec"

# Cores para melhor visualização
function Write-Header {
    param([string]$texto)
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  $texto" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Success {
    param([string]$texto)
    Write-Host "✓ $texto" -ForegroundColor Green
}

function Write-Info {
    param([string]$texto)
    Write-Host "→ $texto" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$texto)
    Write-Host "✗ $texto" -ForegroundColor Red
}

# Verificar se o Git está instalado
function Test-Git {
    try {
        git --version | Out-Null
        return $true
    } catch {
        Write-Error-Custom "Git não está instalado!"
        Write-Info "Baixe em: https://git-scm.com/download/win"
        return $false
    }
}

# Setup inicial do repositório
function Initialize-Repo {
    Write-Header "CONFIGURAÇÃO INICIAL DO REPOSITÓRIO"

    if (!(Test-Git)) { return }

    # Verificar se já existe
    if (Test-Path "$pastaLocal\.git") {
        Write-Success "Repositório já configurado em: $pastaLocal"
        return
    }

    Write-Info "Criando pasta do repositório..."
    New-Item -ItemType Directory -Path $pastaLocal -Force | Out-Null

    Write-Info "Clonando repositório do GitHub..."
    Set-Location $pastaLocal

    try {
        git clone $repoUrl .
        Write-Success "Repositório clonado com sucesso!"

        # Configurar git
        git config user.email "asouza3044@gmail.com"
        git config user.name "asouza3044-hash"
        Write-Success "Git configurado!"

    } catch {
        Write-Error-Custom "Erro ao clonar repositório: $_"
        Write-Info "Verifique se você tem acesso ao repositório"
    }
}

# Mostrar status da sincronização
function Show-SyncStatus {
    Write-Header "STATUS DA SINCRONIZAÇÃO"

    # Verificar pastas locais
    Write-Host "PASTAS LOCAIS:" -ForegroundColor Cyan

    $folders = @(
        @{Path=$pastaLocal; Name="Repositório Git"},
        @{Path=$pastaConversas; Name="Conversas Claude"},
        @{Path=$pastaProjeto; Name="Projeto LASEC"}
    )

    foreach ($folder in $folders) {
        if (Test-Path $folder.Path) {
            $size = (Get-ChildItem $folder.Path -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
            Write-Success "$($folder.Name): $($folder.Path) ({0:N2} MB)" -f $size
        } else {
            Write-Error-Custom "$($folder.Name): $($folder.Path) (não encontrado)"
        }
    }

    Write-Host ""
    Write-Host "REPOSITÓRIO GIT:" -ForegroundColor Cyan

    if (Test-Path "$pastaLocal\.git") {
        Set-Location $pastaLocal

        Write-Info "Branch atual:"
        git branch --show-current

        Write-Info "`nÚltimo commit:"
        git log -1 --oneline

        Write-Info "`nStatus:"
        git status --short

        Write-Info "`nArquivos não commitados:"
        $uncommitted = git status --porcelain
        if ($uncommitted) {
            $uncommitted
        } else {
            Write-Success "Nenhum arquivo pendente"
        }

    } else {
        Write-Error-Custom "Repositório não inicializado"
        Write-Info "Execute: .\sincronizar_nuvem_windows.ps1 -acao setup"
    }
}

# Baixar atualizações da nuvem
function Get-CloudUpdates {
    Write-Header "BAIXAR ATUALIZAÇÕES DA NUVEM"

    if (!(Test-Git)) { return }
    if (!(Test-Path "$pastaLocal\.git")) {
        Write-Error-Custom "Repositório não configurado. Execute primeiro: -acao setup"
        return
    }

    Set-Location $pastaLocal

    Write-Info "Obtendo últimas atualizações do GitHub..."
    git fetch origin

    Write-Info "Verificando mudanças..."
    $status = git status --porcelain
    if ($status) {
        Write-Info "Você tem alterações locais não commitadas:"
        $status
        Write-Host ""
        $resposta = Read-Host "Deseja fazer stash das alterações e continuar? (S/N)"
        if ($resposta -eq 'S') {
            git stash push -m "Auto-stash antes de pull - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
            Write-Success "Alterações salvas em stash"
        } else {
            Write-Info "Operação cancelada"
            return
        }
    }

    Write-Info "Baixando atualizações..."
    git pull origin main

    Write-Success "Atualização concluída!"

    # Copiar conversas para pasta local
    if (Test-Path "$pastaLocal\conversas") {
        Write-Info "Sincronizando conversas para $pastaConversas..."
        New-Item -ItemType Directory -Path $pastaConversas -Force | Out-Null
        Copy-Item -Path "$pastaLocal\conversas\*" -Destination $pastaConversas -Recurse -Force
        Write-Success "Conversas sincronizadas!"
    }

    # Copiar projeto para pasta local
    if (Test-Path "$pastaLocal\projeto") {
        Write-Info "Sincronizando projeto para $pastaProjeto..."
        New-Item -ItemType Directory -Path $pastaProjeto -Force | Out-Null
        Copy-Item -Path "$pastaLocal\projeto\*" -Destination $pastaProjeto -Recurse -Force
        Write-Success "Projeto sincronizado!"
    }
}

# Enviar atualizações para a nuvem
function Send-CloudUpdates {
    Write-Header "ENVIAR ATUALIZAÇÕES PARA A NUVEM"

    if (!(Test-Git)) { return }
    if (!(Test-Path "$pastaLocal\.git")) {
        Write-Error-Custom "Repositório não configurado. Execute primeiro: -acao setup"
        return
    }

    # Copiar arquivos atualizados para o repositório
    Write-Info "Copiando conversas atualizadas..."
    if (Test-Path $pastaConversas) {
        New-Item -ItemType Directory -Path "$pastaLocal\conversas" -Force | Out-Null
        Copy-Item -Path "$pastaConversas\*" -Destination "$pastaLocal\conversas" -Recurse -Force
        Write-Success "Conversas copiadas!"
    }

    Write-Info "Copiando projeto atualizado..."
    if (Test-Path $pastaProjeto) {
        New-Item -ItemType Directory -Path "$pastaLocal\projeto" -Force | Out-Null
        Copy-Item -Path "$pastaProjeto\*" -Destination "$pastaLocal\projeto" -Recurse -Force
        Write-Success "Projeto copiado!"
    }

    Set-Location $pastaLocal

    Write-Info "Verificando alterações..."
    git add .

    $status = git status --porcelain
    if (!$status) {
        Write-Success "Nenhuma alteração para enviar!"
        return
    }

    Write-Host ""
    Write-Host "ARQUIVOS ALTERADOS:" -ForegroundColor Cyan
    git status --short
    Write-Host ""

    $dataAtual = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $mensagem = Read-Host "Digite a mensagem do commit (Enter para usar padrão)"
    if ([string]::IsNullOrWhiteSpace($mensagem)) {
        $mensagem = "Atualização automática - $dataAtual"
    }

    Write-Info "Criando commit..."
    git commit -m $mensagem

    Write-Info "Enviando para GitHub..."
    git push origin main

    Write-Success "Atualização enviada para a nuvem!"
    Write-Info "Acesse: https://github.com/asouza3044-hash/xando-IA"
}

# Executar ação solicitada
Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║           SINCRONIZAÇÃO NUVEM - CLAUDE WINDOWS               ║" -ForegroundColor Magenta
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta

switch ($acao) {
    'setup' {
        Initialize-Repo
    }
    'baixar' {
        Get-CloudUpdates
    }
    'enviar' {
        Send-CloudUpdates
    }
    'status' {
        Show-SyncStatus
    }
    default {
        Write-Host ""
        Write-Host "USO:" -ForegroundColor Yellow
        Write-Host "  .\sincronizar_nuvem_windows.ps1 -acao [AÇÃO]" -ForegroundColor White
        Write-Host ""
        Write-Host "AÇÕES DISPONÍVEIS:" -ForegroundColor Yellow
        Write-Host "  setup   - Configurar repositório pela primeira vez" -ForegroundColor White
        Write-Host "  baixar  - Baixar atualizações da nuvem (GitHub)" -ForegroundColor White
        Write-Host "  enviar  - Enviar atualizações para a nuvem (GitHub)" -ForegroundColor White
        Write-Host "  status  - Mostrar status da sincronização" -ForegroundColor White
        Write-Host ""
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
