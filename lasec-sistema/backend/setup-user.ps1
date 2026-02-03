# ========================================
# Script PowerShell para Configuração do PostgreSQL
# Execute como Administrador
# ========================================

Write-Host "========================================"
Write-Host "LASEC - Setup do Usuario PostgreSQL"
Write-Host "========================================"
Write-Host ""

# Solicitar senha do postgres
$pgPassword = Read-Host "Digite a senha do usuario postgres" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($pgPassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Definir variável de ambiente
$env:PGPASSWORD = $plainPassword

# Caminho do psql
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

Write-Host "1. Executando script de criacao de usuario..."
& $psqlPath -U postgres -h localhost -f "setup-user.sql" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCESSO! Usuario lasec_user criado!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Credenciais criadas:"
    Write-Host "  Usuario: lasec_user"
    Write-Host "  Senha: lasec2026"
    Write-Host "  Banco: lasec_orcamentos"
    Write-Host ""
    Write-Host "Atualizando arquivo .env..."

    # Atualizar .env
    $envContent = Get-Content ".env" -Raw
    $envContent = $envContent -replace "DB_USER=postgres", "DB_USER=lasec_user"
    $envContent = $envContent -replace "DB_PASSWORD=.*", "DB_PASSWORD=lasec2026"
    $envContent | Set-Content ".env"

    Write-Host "Arquivo .env atualizado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Proximo passo: npm run migrate"
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERRO ao criar usuario!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifique se a senha do postgres esta correta."
    Write-Host "Ou execute o arquivo setup-user.sql manualmente no pgAdmin."
}

# Limpar senha da memória
$env:PGPASSWORD = ""

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
