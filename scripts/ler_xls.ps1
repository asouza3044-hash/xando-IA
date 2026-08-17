$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

foreach ($nome in @("201203025","combinador","flanges")) {
    $path = "E:\Lasec\Biblioteca de ferramentas\$nome.XLS"
    if (-not (Test-Path $path)) { Write-Host "$nome.XLS NAO ENCONTRADO"; continue }

    $wb = $excel.Workbooks.Open($path)
    $ws = $wb.Sheets.Item(1)

    Write-Host "============ $nome.XLS ============"
    Write-Host "Sheet: $($ws.Name)"
    Write-Host "Rows: $($ws.UsedRange.Rows.Count)  Cols: $($ws.UsedRange.Columns.Count)"

    $maxR = [math]::Min($ws.UsedRange.Rows.Count, 5)
    $maxC = [math]::Min($ws.UsedRange.Columns.Count, 53)

    # Header (row 1)
    $hdr = @()
    for ($c = 1; $c -le $maxC; $c++) {
        $hdr += $ws.Cells.Item(1, $c).Text
    }
    Write-Host "HEADER: $($hdr -join '|')"

    # Data rows
    for ($r = 2; $r -le $maxR; $r++) {
        $vals = @()
        for ($c = 1; $c -le $maxC; $c++) {
            $vals += $ws.Cells.Item($r, $c).Text
        }
        Write-Host "ROW ${r}: $($vals -join '|')"
    }
    Write-Host ""
    $wb.Close($false)
}

# Agora ler nosso LASEC_COMPLETA.XLS
$path2 = "E:\Lasec\Biblioteca de ferramentas\LASEC_COMPLETA.XLS"
if (Test-Path $path2) {
    $wb2 = $excel.Workbooks.Open($path2)
    $ws2 = $wb2.Sheets.Item(1)
    Write-Host "============ LASEC_COMPLETA.XLS ============"
    Write-Host "Sheet: $($ws2.Name)"
    Write-Host "Rows: $($ws2.UsedRange.Rows.Count)  Cols: $($ws2.UsedRange.Columns.Count)"
    $maxC2 = [math]::Min($ws2.UsedRange.Columns.Count, 53)
    $hdr2 = @()
    for ($c = 1; $c -le $maxC2; $c++) {
        $hdr2 += $ws2.Cells.Item(1, $c).Text
    }
    Write-Host "HEADER: $($hdr2 -join '|')"
    for ($r = 2; $r -le 3; $r++) {
        $vals2 = @()
        for ($c = 1; $c -le $maxC2; $c++) {
            $vals2 += $ws2.Cells.Item($r, $c).Text
        }
        Write-Host "ROW ${r}: $($vals2 -join '|')"
    }
    $wb2.Close($false)
} else {
    Write-Host "LASEC_COMPLETA.XLS NAO ENCONTRADO em E:\Lasec\"
}

$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
