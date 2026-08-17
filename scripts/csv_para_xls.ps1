# Converter LASEC_COMPLETA.CSV para .XLS usando Excel COM
$csvPath = "D:\IA MALELO\banco_dados\SolidCAM_ToolLibs\LASEC_COMPLETA.CSV"
$xlsPath = "D:\IA MALELO\banco_dados\SolidCAM_ToolLibs\LASEC_COMPLETA.XLS"
$xlsDest = "E:\Lasec\Biblioteca de ferramentas\LASEC_COMPLETA.XLS"

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

Write-Host "Abrindo CSV..."
$wb = $excel.Workbooks.Open($csvPath)

Write-Host "Salvando como XLS..."
# 56 = xlExcel8 (.xls formato 97-2003)
$wb.SaveAs($xlsPath, 56)
$wb.Close($false)
$excel.Quit()

[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null

Write-Host "Copiando para $xlsDest..."
Copy-Item $xlsPath $xlsDest -Force

Write-Host ""
Write-Host "OK! Arquivo gerado: $xlsDest"
Write-Host "Agora deve aparecer no dropdown do SolidCAM como 'LASEC_COMPLETA'"
