# GERADOR DE BIBLIOTECA SOLIDCAM (.XLS) — Formato ToolTable Milling
# Baseado na estrutura EXATA dos arquivos 201203025.XLS e combinador.XLS que FUNCIONAM
# Sheet name: "ToolTable", 55 colunas, formato identico

$ErrorActionPreference = "Stop"

$entrada = "D:\IA MALELO\banco_dados\BIBLIOTECA_FERRAMENTAS_CNC.json"
$xlsPath = "D:\IA MALELO\banco_dados\SolidCAM_ToolLibs\LASEC_COMPLETA.XLS"
$xlsDest = "E:\Lasec\Biblioteca de ferramentas\LASEC_COMPLETA.XLS"

Write-Host "Carregando biblioteca de ferramentas..."
$json = Get-Content $entrada -Raw -Encoding UTF8 | ConvertFrom-Json
$ferramentas = $json.ferramentas
Write-Host "Total: $($ferramentas.Count) ferramentas"

# Mapeamento tipo LASEC -> ToolType SolidCAM (MAIUSCULO, como nos XLS que funcionam)
function Get-SCToolType($tipoLasec) {
    switch ($tipoLasec) {
        "BROCA"             { return "DRILL" }
        "CENTRO"            { return "CENTER DRILL" }
        "CHANFRO"           { return "COUNTERSINK" }
        "FRESA"             { return "END MILL" }
        "FACEAR"            { return "FACE MILL" }
        "MACHO_ROSCA"       { return "TAP" }
        "ALARGADOR"         { return "REAMER" }
        "DESBASTE"          { return "END MILL" }
        "ACABAMENTO"        { return "END MILL" }
        "CANAL_CORTE"       { return "END MILL" }
        "INSERTO_ESPECIAL"  { return "END MILL" }
        default             { return "" }
    }
}

function Get-Diametro($f) {
    $d = $f.diametro_mm
    if ($d -and $d -ne "" -and $d -ne "0") { return [double]$d }
    $desc = $f.descricao
    if ($desc -match '(\d+\.?\d*)\s*mm') { return [double]$Matches[1] }
    if ($desc -match 'D(\d+\.?\d*)') { return [double]$Matches[1] }
    if ($desc -match 'M(\d+\.?\d*)') { return [double]$Matches[1] }
    if ($desc -match '^(\d+\.?\d*)\s') { return [double]$Matches[1] }
    return 0
}

function Get-NumDentes($tipo, $diam) {
    switch ($tipo) {
        "DRILL"         { return 2 }
        "CENTER DRILL"  { return 2 }
        "COUNTERSINK"   { return 3 }
        "END MILL"      { if ($diam -le 6) { return 2 } elseif ($diam -le 12) { return 3 } else { return 4 } }
        "FACE MILL"     { if ($diam -le 50) { return 4 } elseif ($diam -le 80) { return 5 } else { return 6 } }
        "TAP"           { return 3 }
        "REAMER"        { return 6 }
        default         { return 2 }
    }
}

function Get-Angle($tipo) {
    switch ($tipo) {
        "DRILL"         { return 118 }
        "CENTER DRILL"  { return 90 }
        "COUNTERSINK"   { return 90 }
        "TAP"           { return 90 }
        "REAMER"        { return 45 }
        default         { return 0 }
    }
}

function Get-Comprimentos($diam, $tipo) {
    if ($diam -le 0) { $diam = 10 }
    switch ($tipo) {
        "DRILL"         { $cl = [math]::Round($diam * 5, 1); if ($cl -lt 10) { $cl = 10 } }
        "CENTER DRILL"  { $cl = [math]::Round($diam * 1.5, 1); if ($cl -lt 8) { $cl = 8 } }
        "COUNTERSINK"   { $cl = [math]::Round($diam * 4, 1); if ($cl -lt 20) { $cl = 20 } }
        "END MILL"      { $cl = [math]::Round($diam * 1.5, 1); if ($cl -lt 4.5) { $cl = 4.5 } }
        "FACE MILL"     { $cl = [math]::Round($diam * 0.3, 1); if ($cl -lt 5) { $cl = 5 } }
        "TAP"           { $cl = [math]::Round($diam * 3, 1); if ($cl -lt 15) { $cl = 15 } }
        "REAMER"        { $cl = [math]::Round($diam * 3, 1); if ($cl -lt 20) { $cl = 20 } }
        default         { $cl = 24 }
    }
    $sl = [math]::Round($cl * 1.3, 1); if ($sl -lt 30) { $sl = 30 }
    $len = 60
    $tl = 80
    return @{ CuttingLength=$cl; ShoulderLength=$sl; Length=$len; TotalLength=$tl }
}

function Get-ThreadPitch($f) {
    $desc = $f.descricao
    if ($desc -match 'M\d+\.?\d*\s*[xX]\s*(\d+\.?\d*)') { return [double]$Matches[1] }
    $d = Get-Diametro $f
    switch ([int]$d) {
        3 { return 0.5 }; 4 { return 0.7 }; 5 { return 0.8 }; 6 { return 1.0 }
        8 { return 1.25 }; 10 { return 1.5 }; 12 { return 1.75 }; 14 { return 2.0 }
        16 { return 2.0 }; 20 { return 2.5 }; 24 { return 3.0 }
        default { return 1 }
    }
}

# Abrir Excel
Write-Host "Criando XLS com Excel COM..."
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$wb = $excel.Workbooks.Add()
$ws = $wb.Sheets.Item(1)
$ws.Name = "ToolTable"

# Header — 55 colunas IDENTICAS ao 201203025.XLS / combinador.XLS
$headers = @(
    "Tool","IdNumber","ToolType","ToolUserType","UnitsDiameter",
    "Diameter","Angle","Radius","NumTeeth","Description",
    "TaperAngle","ShankDiameter","UnitsLength","Length","TotalLength",
    "ShoulderLength","TipLength","CuttingLength","HLength","Material",
    "UnitsFeedSpin","Ftype","FeedXY","FeedZ","FeedFinish",
    "Stype","Spin","SpinFinish","FeedZPenetration","ToolName",
    "ToolGroupName","HolderName","GroupHolderName","Direction","Pitch",
    "ChamferLength","TipDiameter","NumThreads","Message1","Message2",
    "Message3","Message4","Message5","FloodCoolant","MistCoolant",
    "HighPressureCoolant","LowPressureCoolant","ThroughHighPressureCoolant",
    "ThroughLowPressureCoolant","AirBlastCoolant","MinimumQuantityLubricationCoolant",
    "MinimumQuantityLubricationValue","ThreadingStandard","",""
)

for ($c = 0; $c -lt $headers.Count; $c++) {
    $ws.Cells.Item(1, $c + 1) = $headers[$c]
}

$row = 2
$toolNum = 1
$totalExportadas = 0
$totalIgnoradas = 0

foreach ($f in $ferramentas) {
    $scType = Get-SCToolType $f.tipo
    if (-not $scType) { $totalIgnoradas++; continue }

    $diam = Get-Diametro $f
    if ($diam -le 0) { $diam = 10 }
    $angle = Get-Angle $scType
    $numTeeth = Get-NumDentes $scType $diam
    $comp = Get-Comprimentos $diam $scType
    $pitch = if ($scType -eq "TAP") { Get-ThreadPitch $f } else { 1 }

    # Descricao
    $desc = $f.descricao
    if (-not $desc -or $desc -eq "") { $desc = "$($f.tool) $($f.maquina)" }
    if ($desc.Length -gt 80) { $desc = $desc.Substring(0, 80) }

    # RPM e avanco
    $rpm = 0; $feedVal = 0
    if ($f.dados_corte.rpm_mediana) { $rpm = [int]$f.dados_corte.rpm_mediana }
    if ($f.dados_corte.avanco_mediana) { $feedVal = $f.dados_corte.avanco_mediana }

    # Ftype: " Fz" para fresas, " N" para brocas/machos
    $ftype = " N"
    $stype = " S"
    if ($scType -in "END MILL","FACE MILL") { $ftype = " Fz" }

    # Preencher colunas (mesma ordem do header)
    $ws.Cells.Item($row, 1) = " $toolNum"           # Tool
    $ws.Cells.Item($row, 2) = ""                     # IdNumber
    $ws.Cells.Item($row, 3) = $scType                # ToolType
    $ws.Cells.Item($row, 4) = " $scType"             # ToolUserType
    $ws.Cells.Item($row, 5) = "Metric"               # UnitsDiameter
    $ws.Cells.Item($row, 6) = $diam                  # Diameter
    $ws.Cells.Item($row, 7) = $angle                 # Angle
    $ws.Cells.Item($row, 8) = 0                      # Radius
    $ws.Cells.Item($row, 9) = $numTeeth              # NumTeeth
    $ws.Cells.Item($row, 10) = " $desc"              # Description
    $ws.Cells.Item($row, 11) = 0                     # TaperAngle
    $ws.Cells.Item($row, 12) = $diam                 # ShankDiameter
    $ws.Cells.Item($row, 13) = "Metric"              # UnitsLength
    $ws.Cells.Item($row, 14) = $comp.Length           # Length
    $ws.Cells.Item($row, 15) = $comp.TotalLength      # TotalLength
    $ws.Cells.Item($row, 16) = $comp.ShoulderLength    # ShoulderLength
    $ws.Cells.Item($row, 17) = 0                     # TipLength
    $ws.Cells.Item($row, 18) = $comp.CuttingLength     # CuttingLength
    $ws.Cells.Item($row, 19) = 100                   # HLength
    $ws.Cells.Item($row, 20) = " "                   # Material
    $ws.Cells.Item($row, 21) = "Metric"              # UnitsFeedSpin
    $ws.Cells.Item($row, 22) = $ftype                # Ftype
    $ws.Cells.Item($row, 23) = $feedVal              # FeedXY
    $ws.Cells.Item($row, 24) = $feedVal              # FeedZ
    $ws.Cells.Item($row, 25) = $feedVal              # FeedFinish
    $ws.Cells.Item($row, 26) = $stype                # Stype
    $ws.Cells.Item($row, 27) = $rpm                  # Spin
    $ws.Cells.Item($row, 28) = $rpm                  # SpinFinish
    $ws.Cells.Item($row, 29) = " N"                  # FeedZPenetration
    $ws.Cells.Item($row, 30) = " "                   # ToolName
    $ws.Cells.Item($row, 31) = " "                   # ToolGroupName
    $ws.Cells.Item($row, 32) = " "                   # HolderName
    $ws.Cells.Item($row, 33) = " "                   # GroupHolderName
    $ws.Cells.Item($row, 34) = "From Face"           # Direction
    $ws.Cells.Item($row, 35) = $pitch                # Pitch
    $ws.Cells.Item($row, 36) = 0                     # ChamferLength
    $ws.Cells.Item($row, 37) = 0                     # TipDiameter
    $ws.Cells.Item($row, 38) = 0                     # NumThreads
    $ws.Cells.Item($row, 39) = "$($f.maquina) $($f.tool)"  # Message1
    $ws.Cells.Item($row, 40) = ""                    # Message2
    $ws.Cells.Item($row, 41) = ""                    # Message3
    $ws.Cells.Item($row, 42) = ""                    # Message4
    $ws.Cells.Item($row, 43) = ""                    # Message5
    $ws.Cells.Item($row, 44) = 0                     # FloodCoolant
    $ws.Cells.Item($row, 45) = 0                     # MistCoolant
    $ws.Cells.Item($row, 46) = 0                     # HighPressureCoolant
    $ws.Cells.Item($row, 47) = 0                     # LowPressureCoolant
    $ws.Cells.Item($row, 48) = 0                     # ThroughHighPressureCoolant
    $ws.Cells.Item($row, 49) = 0                     # ThroughLowPressureCoolant
    $ws.Cells.Item($row, 50) = 0                     # AirBlastCoolant
    $ws.Cells.Item($row, 51) = 0                     # MinimumQuantityLubricationCoolant
    $ws.Cells.Item($row, 52) = 0                     # MinimumQuantityLubricationValue
    $ws.Cells.Item($row, 53) = ""                    # ThreadingStandard

    $row++
    $toolNum++
    $totalExportadas++

    if ($totalExportadas % 100 -eq 0) { Write-Host "  $totalExportadas ferramentas..." }
}

Write-Host "Salvando XLS..."
# 56 = xlExcel8 (.xls 97-2003)
$wb.SaveAs($xlsPath, 56)
$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null

# Copiar para destino
Write-Host "Copiando para E:\Lasec\..."
Copy-Item $xlsPath $xlsDest -Force

Write-Host ""
Write-Host "=========================================="
Write-Host "BIBLIOTECA XLS GERADA COM SUCESSO"
Write-Host "=========================================="
Write-Host "Arquivo: $xlsDest"
Write-Host "Sheet: ToolTable"
Write-Host "Total exportadas: $totalExportadas"
Write-Host "Total ignoradas (torno): $totalIgnoradas"
Write-Host "Colunas: 55 (identico ao 201203025.XLS)"
Write-Host "=========================================="
