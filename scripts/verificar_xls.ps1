$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$wb = $excel.Workbooks.Open("E:\Lasec\Biblioteca de ferramentas\LASEC_COMPLETA.XLS")
$ws = $wb.Sheets.Item(1)
Write-Host "Sheet: $($ws.Name)"
Write-Host "Rows: $($ws.UsedRange.Rows.Count)  Cols: $($ws.UsedRange.Columns.Count)"
$hdr = @()
for ($c = 1; $c -le 55; $c++) { $hdr += $ws.Cells.Item(1, $c).Text }
Write-Host "HEADER: $($hdr -join '|')"
for ($r = 2; $r -le 4; $r++) {
    $vals = @()
    for ($c = 1; $c -le 20; $c++) { $vals += $ws.Cells.Item($r, $c).Text }
    Write-Host "ROW ${r}: $($vals -join '|')"
}
$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
