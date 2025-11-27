# Script para converter HTML em PDF
$htmlPath = "D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROPOSTA_COMERCIAL_MICROGEAR_TR1.07.02.033.html"
$pdfPath = "D:\lasec\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\PROPOSTA_COMERCIAL_MICROGEAR_TR1.07.02.033.pdf"

Write-Host "Convertendo HTML para PDF..." -ForegroundColor Green

# Tentar Chrome
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (Test-Path $chrome) {
    Write-Host "Usando Google Chrome..." -ForegroundColor Yellow
    & $chrome --headless --disable-gpu --print-to-pdf="$pdfPath" "$htmlPath"
    Start-Sleep -Seconds 3
    if (Test-Path $pdfPath) {
        Write-Host "PDF criado com sucesso em: $pdfPath" -ForegroundColor Green
        Start-Process $pdfPath
        exit 0
    }
}

# Tentar Edge
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (Test-Path $edge) {
    Write-Host "Usando Microsoft Edge..." -ForegroundColor Yellow
    & $edge --headless --disable-gpu --print-to-pdf="$pdfPath" "$htmlPath"
    Start-Sleep -Seconds 3
    if (Test-Path $pdfPath) {
        Write-Host "PDF criado com sucesso em: $pdfPath" -ForegroundColor Green
        Start-Process $pdfPath
        exit 0
    }
}

Write-Host "Navegador nao encontrado. Por favor, abra o HTML e use Ctrl+P para salvar como PDF." -ForegroundColor Red
Start-Process $htmlPath
