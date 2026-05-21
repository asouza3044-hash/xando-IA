# sync-saida-desktop.ps1
# Rodar no Claude Code antes de sair: ! .\sync-saida-desktop.ps1

$REPO  = "C:\Users\alexandresouza\Documents\GitHub\xando-IA"
$MEM_SRC  = "C:\Users\alexandresouza\.claude\projects\C--Users-alexandresouza\memory"
$MEM_DEST = "$REPO\memory"

Write-Host "Sincronizando memoria Claude → repo..." -ForegroundColor Cyan

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

Set-Location $REPO
git add memory\
$status = git status --porcelain
if ($status) {
    $date = Get-Date -Format "dd/MM/yyyy HH:mm"
    git commit -m "sync: saida desktop $date"
    git push origin lasec-orcamentos
    Write-Host "Push feito!" -ForegroundColor Green
} else {
    Write-Host "Nada mudou, sem commit necessario." -ForegroundColor Yellow
}
