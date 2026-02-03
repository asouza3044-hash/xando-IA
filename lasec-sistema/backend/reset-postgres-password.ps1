# ========================================
# Script para Resetar Senha do PostgreSQL
# Execute como ADMINISTRADOR
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESETAR SENHA DO POSTGRESQL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está rodando como administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERRO: Este script precisa ser executado como ADMINISTRADOR!" -ForegroundColor Red
    Write-Host "Clique direito no PowerShell e selecione 'Executar como Administrador'" -ForegroundColor Yellow
    pause
    exit 1
}

# Caminhos
$pgDataDir = "C:\Program Files\PostgreSQL\18\data"
$pgHbaConf = "$pgDataDir\pg_hba.conf"
$pgHbaBackup = "$pgDataDir\pg_hba.conf.backup"
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

Write-Host "1. Fazendo backup de pg_hba.conf..." -ForegroundColor Yellow
Copy-Item $pgHbaConf $pgHbaBackup -Force
Write-Host "   Backup criado: pg_hba.conf.backup" -ForegroundColor Green

Write-Host ""
Write-Host "2. Modificando autenticacao para 'trust' (temporario)..." -ForegroundColor Yellow
$content = Get-Content $pgHbaConf
$content = $content -replace "scram-sha-256", "trust"
$content | Set-Content $pgHbaConf
Write-Host "   Autenticacao alterada para 'trust'" -ForegroundColor Green

Write-Host ""
Write-Host "3. Reiniciando servico PostgreSQL..." -ForegroundColor Yellow
Restart-Service postgresql-x64-18
Start-Sleep -Seconds 3
Write-Host "   Servico reiniciado" -ForegroundColor Green

Write-Host ""
Write-Host "4. Conectando ao PostgreSQL e alterando senha..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Digite a NOVA senha para o usuario 'postgres':"
Write-Host "   (Recomendado: Xando1973#)" -ForegroundColor Cyan
$newPassword = Read-Host "   Nova senha" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($newPassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Executar SQL para alterar senha
$sqlCommand = "ALTER USER postgres WITH PASSWORD '$plainPassword';"
$env:PGPASSWORD = ""
& $psqlPath -U postgres -h localhost -d postgres -c $sqlCommand 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "   Senha alterada com sucesso!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "   ERRO ao alterar senha!" -ForegroundColor Red
    Write-Host "   Restaurando configuracao original..." -ForegroundColor Yellow
    Copy-Item $pgHbaBackup $pgHbaConf -Force
    Restart-Service postgresql-x64-18
    pause
    exit 1
}

Write-Host ""
Write-Host "5. Restaurando configuracao original (scram-sha-256)..." -ForegroundColor Yellow
Copy-Item $pgHbaBackup $pgHbaConf -Force
Write-Host "   Configuracao restaurada" -ForegroundColor Green

Write-Host ""
Write-Host "6. Reiniciando servico PostgreSQL novamente..." -ForegroundColor Yellow
Restart-Service postgresql-x64-18
Start-Sleep -Seconds 3
Write-Host "   Servico reiniciado" -ForegroundColor Green

Write-Host ""
Write-Host "7. Testando conexao com nova senha..." -ForegroundColor Yellow
$env:PGPASSWORD = $plainPassword
& $psqlPath -U postgres -h localhost -d postgres -c "SELECT version();" 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  SUCESSO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Senha do PostgreSQL alterada com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usuario: postgres"
    Write-Host "Senha: $plainPassword"
    Write-Host ""
    Write-Host "Agora execute novamente:" -ForegroundColor Cyan
    Write-Host "  .\setup-user.ps1" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ERRO ao conectar!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

$env:PGPASSWORD = ""

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
