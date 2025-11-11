# ═══════════════════════════════════════════════════════════════
# INSTALADOR FÁCIL - XANDO IA SINCRONIZAÇÃO
# ═══════════════════════════════════════════════════════════════
# Este script instala TUDO automaticamente!
# Execute com: Botão direito → Executar com PowerShell
# ═══════════════════════════════════════════════════════════════

# Configuração de cores
$Host.UI.RawUI.BackgroundColor = "Black"
$Host.UI.RawUI.ForegroundColor = "White"
Clear-Host

function Write-Title {
    param([string]$texto)
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  $texto" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Step {
    param([string]$numero, [string]$texto)
    Write-Host "[$numero] " -ForegroundColor Yellow -NoNewline
    Write-Host $texto -ForegroundColor White
}

function Write-Success {
    param([string]$texto)
    Write-Host "✓ " -ForegroundColor Green -NoNewline
    Write-Host $texto -ForegroundColor White
}

function Write-Error-Msg {
    param([string]$texto)
    Write-Host "✗ " -ForegroundColor Red -NoNewline
    Write-Host $texto -ForegroundColor White
}

function Write-Info {
    param([string]$texto)
    Write-Host "→ " -ForegroundColor Cyan -NoNewline
    Write-Host $texto -ForegroundColor White
}

# Banner
Write-Title "INSTALADOR AUTOMÁTICO - XANDO IA"

Write-Host "Este instalador vai:" -ForegroundColor Yellow
Write-Host "  1. Verificar se o Git está instalado" -ForegroundColor White
Write-Host "  2. Clonar o repositório do GitHub" -ForegroundColor White
Write-Host "  3. Criar as pastas necessárias" -ForegroundColor White
Write-Host "  4. Criar atalhos na Área de Trabalho" -ForegroundColor White
Write-Host "  5. Fazer a primeira sincronização" -ForegroundColor White
Write-Host ""

$continuar = Read-Host "Deseja continuar? (S/N)"
if ($continuar -ne 'S' -and $continuar -ne 's') {
    Write-Host "Instalação cancelada." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    exit
}

# ═══════════════════════════════════════════════════════════════
# PASSO 1: VERIFICAR GIT
# ═══════════════════════════════════════════════════════════════

Write-Title "PASSO 1: VERIFICANDO GIT"

try {
    $gitVersion = git --version 2>&1
    Write-Success "Git está instalado: $gitVersion"
    $gitOk = $true
} catch {
    Write-Error-Msg "Git não encontrado!"
    Write-Host ""
    Write-Host "VOCÊ PRECISA INSTALAR O GIT PRIMEIRO:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Acesse: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Clique em 'Click here to download'" -ForegroundColor White
    Write-Host "3. Execute o instalador baixado" -ForegroundColor White
    Write-Host "4. Use as opções padrão (só clicar Next)" -ForegroundColor White
    Write-Host "5. Após instalar, REINICIE este script" -ForegroundColor White
    Write-Host ""

    $abrir = Read-Host "Deseja abrir o site para download do Git agora? (S/N)"
    if ($abrir -eq 'S' -or $abrir -eq 's') {
        Start-Process "https://git-scm.com/download/win"
    }

    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════
# PASSO 2: CLONAR REPOSITÓRIO
# ═══════════════════════════════════════════════════════════════

Write-Title "PASSO 2: BAIXANDO REPOSITÓRIO DO GITHUB"

$pastaDestino = "C:\xando-IA"

if (Test-Path $pastaDestino) {
    Write-Info "A pasta C:\xando-IA já existe"
    $sobrescrever = Read-Host "Deseja atualizar (pull) ao invés de clonar novamente? (S/N)"

    if ($sobrescrever -eq 'S' -or $sobrescrever -eq 's') {
        Write-Step "2.1" "Atualizando repositório existente..."
        Set-Location $pastaDestino
        git pull origin main
        Write-Success "Repositório atualizado!"
    } else {
        Write-Info "Usando repositório existente"
    }
} else {
    Write-Step "2.1" "Clonando repositório..."
    Write-Info "Origem: https://github.com/asouza3044-hash/xando-IA.git"
    Write-Info "Destino: $pastaDestino"
    Write-Host ""

    try {
        git clone https://github.com/asouza3044-hash/xando-IA.git $pastaDestino
        Write-Success "Repositório clonado com sucesso!"
    } catch {
        Write-Error-Msg "Erro ao clonar repositório: $_"
        Write-Host ""
        Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit
    }
}

Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════
# PASSO 3: CRIAR PASTAS NECESSÁRIAS
# ═══════════════════════════════════════════════════════════════

Write-Title "PASSO 3: CRIANDO PASTAS NECESSÁRIAS"

$pastas = @(
    "D:\Cloude IA",
    "C:\lasec"
)

foreach ($pasta in $pastas) {
    Write-Step "3.x" "Criando: $pasta"
    if (!(Test-Path $pasta)) {
        try {
            New-Item -ItemType Directory -Path $pasta -Force | Out-Null
            Write-Success "Pasta criada: $pasta"
        } catch {
            Write-Error-Msg "Erro ao criar: $pasta - $_"
        }
    } else {
        Write-Success "Já existe: $pasta"
    }
}

Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════
# PASSO 4: CRIAR ATALHOS NA ÁREA DE TRABALHO
# ═══════════════════════════════════════════════════════════════

Write-Title "PASSO 4: CRIANDO ATALHOS NA ÁREA DE TRABALHO"

$desktop = [Environment]::GetFolderPath("Desktop")
$scriptProjeto = "$pastaDestino\projeto\sincronizar_nuvem_windows.ps1"

# Verificar se o script existe
if (!(Test-Path $scriptProjeto)) {
    Write-Error-Msg "Script de sincronização não encontrado!"
    Write-Info "Esperado em: $scriptProjeto"
} else {
    Write-Step "4.1" "Criando atalhos .bat na Área de Trabalho..."

    # Atalho SETUP
    $setupBat = @"
@echo off
title LASEC Sync - SETUP
color 0B
cd /d "$pastaDestino\projeto"
powershell.exe -ExecutionPolicy Bypass -File "$scriptProjeto" -acao setup
pause
"@
    $setupBat | Out-File -FilePath "$desktop\LASEC_Sync_SETUP.bat" -Encoding ASCII
    Write-Success "Criado: LASEC_Sync_SETUP.bat"

    # Atalho BAIXAR
    $baixarBat = @"
@echo off
title LASEC Sync - BAIXAR DA NUVEM
color 0B
cd /d "$pastaDestino\projeto"
powershell.exe -ExecutionPolicy Bypass -File "$scriptProjeto" -acao baixar
pause
"@
    $baixarBat | Out-File -FilePath "$desktop\LASEC_Sync_BAIXAR.bat" -Encoding ASCII
    Write-Success "Criado: LASEC_Sync_BAIXAR.bat"

    # Atalho ENVIAR
    $enviarBat = @"
@echo off
title LASEC Sync - ENVIAR PARA NUVEM
color 0B
cd /d "$pastaDestino\projeto"
powershell.exe -ExecutionPolicy Bypass -File "$scriptProjeto" -acao enviar
pause
"@
    $enviarBat | Out-File -FilePath "$desktop\LASEC_Sync_ENVIAR.bat" -Encoding ASCII
    Write-Success "Criado: LASEC_Sync_ENVIAR.bat"

    # Atalho STATUS
    $statusBat = @"
@echo off
title LASEC Sync - STATUS
color 0B
cd /d "$pastaDestino\projeto"
powershell.exe -ExecutionPolicy Bypass -File "$scriptProjeto" -acao status
pause
"@
    $statusBat | Out-File -FilePath "$desktop\LASEC_Sync_STATUS.bat" -Encoding ASCII
    Write-Success "Criado: LASEC_Sync_STATUS.bat"
}

Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════
# PASSO 5: CONFIGURAÇÃO DO GIT
# ═══════════════════════════════════════════════════════════════

Write-Title "PASSO 5: CONFIGURANDO GIT"

Set-Location $pastaDestino

Write-Step "5.1" "Configurando usuário Git..."
git config user.email "asouza3044@gmail.com" 2>&1 | Out-Null
git config user.name "asouza3044-hash" 2>&1 | Out-Null
Write-Success "Git configurado!"

Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════
# PASSO 6: PRIMEIRA SINCRONIZAÇÃO
# ═══════════════════════════════════════════════════════════════

Write-Title "PASSO 6: PRIMEIRA SINCRONIZAÇÃO"

$sincronizar = Read-Host "Deseja fazer a primeira sincronização agora? (S/N)"

if ($sincronizar -eq 'S' -or $sincronizar -eq 's') {
    Write-Step "6.1" "Copiando arquivos do projeto..."

    # Copiar projeto
    if (Test-Path "$pastaDestino\projeto") {
        try {
            Copy-Item -Path "$pastaDestino\projeto\*" -Destination "C:\lasec" -Recurse -Force -ErrorAction SilentlyContinue
            Write-Success "Projeto copiado para C:\lasec"
        } catch {
            Write-Error-Msg "Erro ao copiar projeto: $_"
        }
    }

    # Copiar conversas (se existirem)
    if (Test-Path "$pastaDestino\conversas") {
        try {
            Copy-Item -Path "$pastaDestino\conversas\*" -Destination "D:\Cloude IA" -Recurse -Force -ErrorAction SilentlyContinue
            Write-Success "Conversas copiadas para D:\Cloude IA"
        } catch {
            Write-Info "Nenhuma conversa para copiar ainda"
        }
    }
}

Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════
# CONCLUSÃO
# ═══════════════════════════════════════════════════════════════

Write-Title "INSTALAÇÃO CONCLUÍDA!"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✓ TUDO PRONTO PARA USAR!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

Write-Host "PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. NA ÁREA DE TRABALHO, VOCÊ TEM 4 NOVOS ATALHOS:" -ForegroundColor Yellow
Write-Host "   • LASEC_Sync_SETUP.bat   → Execute UMA VEZ para configurar" -ForegroundColor White
Write-Host "   • LASEC_Sync_BAIXAR.bat  → Use TODO DIA pela MANHÃ" -ForegroundColor White
Write-Host "   • LASEC_Sync_ENVIAR.bat  → Use TODO DIA à NOITE" -ForegroundColor White
Write-Host "   • LASEC_Sync_STATUS.bat  → Para ver o status" -ForegroundColor White
Write-Host ""

Write-Host "2. COMO USAR:" -ForegroundColor Yellow
Write-Host "   MANHÃ:" -ForegroundColor Cyan
Write-Host "   → Clique duas vezes em: LASEC_Sync_BAIXAR.bat" -ForegroundColor White
Write-Host "   → Inicie o Claude Code" -ForegroundColor White
Write-Host "   → Trabalhe normalmente" -ForegroundColor White
Write-Host ""
Write-Host "   NOITE:" -ForegroundColor Cyan
Write-Host "   → Clique duas vezes em: LASEC_Sync_ENVIAR.bat" -ForegroundColor White
Write-Host "   → Digite mensagem ou pressione Enter" -ForegroundColor White
Write-Host ""

Write-Host "3. LOCALIZAÇÃO DOS ARQUIVOS:" -ForegroundColor Yellow
Write-Host "   → Repositório: C:\xando-IA" -ForegroundColor White
Write-Host "   → Projeto: C:\lasec" -ForegroundColor White
Write-Host "   → Conversas: D:\Cloude IA" -ForegroundColor White
Write-Host ""

Write-Host "4. DOCUMENTAÇÃO:" -ForegroundColor Yellow
Write-Host "   → Guia completo: C:\xando-IA\projeto\GUIA_SINCRONIZACAO_NUVEM.txt" -ForegroundColor White
Write-Host "   → README: C:\xando-IA\README.md" -ForegroundColor White
Write-Host ""

$abrirPasta = Read-Host "Deseja abrir a Área de Trabalho para ver os atalhos? (S/N)"
if ($abrirPasta -eq 'S' -or $abrirPasta -eq 's') {
    Start-Process $desktop
}

Write-Host ""
Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
