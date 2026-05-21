# sync-entrada-notebook.ps1
# Rodar no notebook antes de iniciar sessao: ! .\sync-entrada-notebook.ps1

$REPO    = "C:\Users\lasec\Documents\GitHub\xando-IA"
$MEM_SRC  = "$REPO\memory"
$MEM_DEST = "C:\Users\lasec\.claude\projects\C--Users-lasec\memory"

Set-Location $REPO
Write-Host "Puxando atualizacoes do GitHub..." -ForegroundColor Cyan
git pull origin lasec-orcamentos

if (-not (Test-Path $MEM_DEST)) { New-Item -ItemType Directory -Path $MEM_DEST -Force | Out-Null }

Write-Host "Copiando memoria repo → Claude..." -ForegroundColor Cyan
$copied = 0
Get-ChildItem "$MEM_SRC\*.md" | ForEach-Object {
    $d = "$MEM_DEST\$($_.Name)"
    $doUpdate = $true
    if (Test-Path $d) {
        if ((Get-FileHash $_.FullName).Hash -eq (Get-FileHash $d).Hash) { $doUpdate = $false }
    }
    if ($doUpdate) { Copy-Item $_.FullName $d -Force; $copied++ }
}
Write-Host "  $copied arquivo(s) atualizado(s)"
Write-Host "Pronto! Memoria sincronizada." -ForegroundColor Green
