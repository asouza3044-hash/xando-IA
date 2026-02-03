# Atualizar credenciais no .env

Write-Host "Atualizando arquivo .env..." -ForegroundColor Yellow

$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "DB_USER=postgres", "DB_USER=lasec_user"
$envContent = $envContent -replace "DB_PASSWORD=.*", "DB_PASSWORD=lasec2026"
$envContent | Set-Content ".env"

Write-Host "Arquivo .env atualizado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Credenciais:"
Write-Host "  DB_USER=lasec_user"
Write-Host "  DB_PASSWORD=lasec2026"
Write-Host ""

Get-Content ".env"
