# Atalhos de Sincronização - Claude Windows
# Este arquivo cria atalhos rápidos para sincronização

# Caminho do script principal
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$syncScript = Join-Path $scriptPath "sincronizar_nuvem_windows.ps1"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  CRIANDO ATALHOS DE SINCRONIZAÇÃO" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Função para criar arquivo batch
function Create-BatchFile {
    param(
        [string]$nome,
        [string]$acao,
        [string]$icone
    )

    $batchPath = Join-Path $env:USERPROFILE "Desktop\LASEC_Sync_$nome.bat"
    $conteudo = @"
@echo off
title Sincronização LASEC - $nome
color 0B
echo.
echo ═══════════════════════════════════════════════════════════════
echo   SINCRONIZAÇÃO LASEC - $nome
echo ═══════════════════════════════════════════════════════════════
echo.
powershell.exe -ExecutionPolicy Bypass -File "$syncScript" -acao $acao
echo.
echo.
pause
"@

    $conteudo | Out-File -FilePath $batchPath -Encoding ASCII
    Write-Host "✓ Criado: LASEC_Sync_$nome.bat" -ForegroundColor Green
}

# Criar atalhos
Create-BatchFile -nome "BAIXAR" -acao "baixar" -icone "↓"
Create-BatchFile -nome "ENVIAR" -acao "enviar" -icone "↑"
Create-BatchFile -nome "STATUS" -acao "status" -icone "ℹ"
Create-BatchFile -nome "SETUP" -acao "setup" -icone "⚙"

# Criar script de sincronização automática
$autoSyncPath = Join-Path $scriptPath "auto_sincronizar.ps1"
$autoSyncContent = @"
# Auto Sincronização - Executa a cada hora
# Para agendar, use o Agendador de Tarefas do Windows

`$scriptPath = "$syncScript"
`$intervalo = 60 # minutos

Write-Host "Iniciando sincronização automática..." -ForegroundColor Cyan
Write-Host "Intervalo: `$intervalo minutos" -ForegroundColor Yellow
Write-Host ""

while (`$true) {
    `$dataHora = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$dataHora] Verificando atualizações..." -ForegroundColor Gray

    try {
        # Baixar atualizações
        & powershell.exe -ExecutionPolicy Bypass -File `$scriptPath -acao baixar

        Write-Host "[$dataHora] Sincronização concluída!" -ForegroundColor Green
    }
    catch {
        Write-Host "[$dataHora] Erro na sincronização: `$_" -ForegroundColor Red
    }

    Write-Host "[$dataHora] Próxima verificação em `$intervalo minutos..." -ForegroundColor Gray
    Start-Sleep -Seconds (`$intervalo * 60)
}
"@

$autoSyncContent | Out-File -FilePath $autoSyncPath -Encoding UTF8
Write-Host "✓ Criado: auto_sincronizar.ps1" -ForegroundColor Green

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  ATALHOS CRIADOS COM SUCESSO!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "Os seguintes atalhos foram criados na Área de Trabalho:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  • LASEC_Sync_SETUP.bat   - Configuração inicial" -ForegroundColor White
Write-Host "  • LASEC_Sync_BAIXAR.bat  - Baixar da nuvem" -ForegroundColor White
Write-Host "  • LASEC_Sync_ENVIAR.bat  - Enviar para nuvem" -ForegroundColor White
Write-Host "  • LASEC_Sync_STATUS.bat  - Ver status" -ForegroundColor White
Write-Host ""
Write-Host "PRIMEIRO USO:" -ForegroundColor Cyan
Write-Host "1. Execute: LASEC_Sync_SETUP.bat" -ForegroundColor White
Write-Host "2. Depois use: LASEC_Sync_BAIXAR.bat para sincronizar" -ForegroundColor White
Write-Host ""
