$f = "C:\Users\lasec\.claude\commands\orcamento-lasec.md"
$e = "D:\IA MALELO\agente\knowledge\estrutura-pastas-padrao.md"

Write-Host "=== PROG_CNC dir antigo (deve ser 0) ==="
(Select-String -Path $f -Pattern "PROG_CNC.LYNX220" -SimpleMatch).Count

Write-Host "=== PDFs falsos (deve ser 0) ==="
(Select-String -Path $f -Pattern "ferramentas_coromant" -SimpleMatch).Count

Write-Host "=== Template nome errado (deve ser 0) ==="
(Select-String -Path $f -Pattern "TORNO_CENTRO_TEMPLATE" -SimpleMatch).Count

Write-Host "=== PROG_CNC_DATABASE correto (deve ser >0) ==="
(Select-String -Path $f -Pattern "PROG_CNC_DATABASE" -SimpleMatch).Count

Write-Host "=== 013/2026 correto (deve ser >0) ==="
(Select-String -Path $f -Pattern "013/2026" -SimpleMatch).Count

Write-Host "=== orcamento-lasec-hmtl nos templates (deve ser >0) ==="
(Select-String -Path $f -Pattern "orcamento-lasec-hmtl" -SimpleMatch).Count

Write-Host "=== D:/lasec em estrutura-pastas (deve ser 0) ==="
(Select-String -Path $e -Pattern "D:/lasec" -SimpleMatch).Count

Write-Host "=== 2025 com ano no modelo rules ==="
(Select-String -Path "C:\Users\lasec\.claude\rules\lasec-orcamentos.md" -Pattern "orcamentos.2025.MICROGEAR.008" -SimpleMatch).Count

Write-Host "Validacao concluida."
