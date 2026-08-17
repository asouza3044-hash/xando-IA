# GERADOR DE BIBLIOTECA SOLIDCAM (.CSV) A PARTIR DO BANCO DE DADOS CNC LASEC
# Formato: SolidCAM Tool Table CSV (mesmo formato do "EIXO LONGO.CSV" que funciona)
# Gera arquivos .CSV separados: um para centro (milling) e um completo

$ErrorActionPreference = "Stop"

$entrada = "D:\IA MALELO\banco_dados\BIBLIOTECA_FERRAMENTAS_CNC.json"
$pastaSaida = "D:\IA MALELO\banco_dados\SolidCAM_ToolLibs"

if (-not (Test-Path $pastaSaida)) { New-Item -ItemType Directory -Path $pastaSaida -Force | Out-Null }

Write-Host "Carregando biblioteca de ferramentas..."
$json = Get-Content $entrada -Raw -Encoding UTF8 | ConvertFrom-Json
$ferramentas = $json.ferramentas

Write-Host "Total de ferramentas no banco: $($ferramentas.Count)"

# Mapeamento tipo LASEC -> ToolType SolidCAM CSV
# Tipos validos milling: Drill, Center Drill, Countersink, End Mill, Face Mill, Tap, Reamer, Boring Bar
# Tipos validos turning: Ext.Rough, Int.Rough, Ext.Finish, Int.Finish, Ext.Groove, Int.Groove, Ext.Thread, Int.Thread
function Get-CSVToolType($tipoLasec) {
    switch ($tipoLasec) {
        "BROCA"             { return "Drill" }
        "CENTRO"            { return "Center Drill" }
        "CHANFRO"           { return "Countersink" }
        "FRESA"             { return "End Mill" }
        "FACEAR"            { return "Face Mill" }
        "MACHO_ROSCA"       { return "Tap" }
        "ALARGADOR"         { return "Reamer" }
        "DESBASTE"          { return "End Mill" }
        "ACABAMENTO"        { return "End Mill" }
        "CANAL_CORTE"       { return "End Mill" }
        "INSERTO_ESPECIAL"  { return "End Mill" }
        default             { return "" }
    }
}

# Extrair diametro
function Get-Diametro($ferramenta) {
    $d = $ferramenta.diametro_mm
    if ($d -and $d -ne "" -and $d -ne "0") { return [double]$d }
    $desc = $ferramenta.descricao
    if ($desc -match '(\d+\.?\d*)\s*mm') { return [double]$Matches[1] }
    if ($desc -match 'D(\d+\.?\d*)') { return [double]$Matches[1] }
    if ($desc -match 'M(\d+\.?\d*)') { return [double]$Matches[1] }
    if ($desc -match '^(\d+\.?\d*)\s') { return [double]$Matches[1] }
    return 0
}

# Numero de dentes
function Get-NumDentes($tipo, $diametro) {
    switch ($tipo) {
        "Drill"         { return 2 }
        "Center Drill"  { return 2 }
        "Countersink"   { return 3 }
        "End Mill"      { if ($diametro -le 6) { return 2 } elseif ($diametro -le 12) { return 3 } else { return 4 } }
        "Face Mill"     { if ($diametro -le 50) { return 4 } elseif ($diametro -le 80) { return 5 } else { return 6 } }
        "Tap"           { return 3 }
        "Reamer"        { return 6 }
        default         { return 4 }
    }
}

# Comprimentos estimados
function Get-Comprimentos($diametro, $tipo) {
    if ($diametro -le 0) { $diametro = 10 }
    switch ($tipo) {
        "Drill"         { $fl = [math]::Round($diametro * 5, 1); if ($fl -lt 10) { $fl = 10 }; $sh = [math]::Round($fl * 2, 1); $bo = [math]::Round($fl * 3, 1); return @{A=$bo; B=$fl; C=$sh; TipAngle=118} }
        "Center Drill"  { $fl = [math]::Round($diametro * 1.5, 1); if ($fl -lt 8) { $fl = 8 }; $sh = [math]::Round($fl * 2, 1); $bo = [math]::Round($fl * 3, 1); return @{A=$bo; B=$fl; C=$sh; TipAngle=90} }
        "Countersink"   { $fl = [math]::Round($diametro * 4, 1); if ($fl -lt 20) { $fl = 20 }; $sh = [math]::Round($fl * 2, 1); $bo = [math]::Round($fl * 3, 1); return @{A=$bo; B=$fl; C=$sh; TipAngle=90} }
        "End Mill"      { $fl = [math]::Round($diametro * 1.5, 1); if ($fl -lt 4.5) { $fl = 4.5 }; $sh = [math]::Round($fl * 2, 1); $bo = [math]::Round($fl * 3, 1); return @{A=$bo; B=$fl; C=$sh; TipAngle=0} }
        "Face Mill"     { $fl = [math]::Round($diametro * 0.3, 1); if ($fl -lt 5) { $fl = 5 }; $sh = [math]::Round($fl * 2, 1); $bo = [math]::Round($fl * 3, 1); return @{A=$bo; B=$fl; C=$sh; TipAngle=0} }
        "Tap"           { $fl = [math]::Round($diametro * 3, 1); if ($fl -lt 15) { $fl = 15 }; $sh = [math]::Round($fl * 2, 1); $bo = [math]::Round($fl * 3, 1); return @{A=$bo; B=$fl; C=$sh; TipAngle=90} }
        "Reamer"        { $fl = [math]::Round($diametro * 3, 1); if ($fl -lt 20) { $fl = 20 }; $sh = [math]::Round($fl * 2, 1); $bo = [math]::Round($fl * 3, 1); return @{A=$bo; B=$fl; C=$sh; TipAngle=45} }
        default         { return @{A=150; B=50; C=100; TipAngle=0} }
    }
}

# Thread pitch para machos
function Get-ThreadPitch($ferramenta) {
    $desc = $ferramenta.descricao
    if ($desc -match 'M\d+\.?\d*\s*[xX]\s*(\d+\.?\d*)') { return [double]$Matches[1] }
    $d = Get-Diametro $ferramenta
    switch ([int]$d) {
        3  { return 0.5 }; 4  { return 0.7 }; 5  { return 0.8 }; 6  { return 1.0 }
        8  { return 1.25 }; 10 { return 1.5 }; 12 { return 1.75 }; 14 { return 2.0 }
        16 { return 2.0 }; 20 { return 2.5 }; 24 { return 3.0 }
        default { return 0 }
    }
}

# Cabecalho CSV - formato IDENTICO ao "EIXO LONGO.CSV"
$header = "Tool,SpinPosition,IdNumber,ToolType,Description,A,B,C,D,D1,D2,RA,RB,ALPHA,BETTA,E,F,G,H,K,W,Orientation,Direction,OriginPos,Extension,SideOffset,Message1,Message2,Message3,Message4,Message5,FloodCoolant,MistCoolant,HighPressureCoolant,LowPressureCoolant,ThroughHighPressureCoolant,ThroughLowPressureCoolant,AirBlastCoolant,MinimumQuantityLubricationCoolant,MinimumQuantityLubricationValue,ChangeType,FirstMovement,Move_X,Move_Z,SpinUnit,SpinNormal,SpinFinish,FeedUnit,FeedNormal,FeedFinish,SafetyAngle,SafetyMargin,SpinDirection"

$linhas = [System.Collections.ArrayList]::new()
[void]$linhas.Add($header)

$toolNum = 1
$totalExportadas = 0
$totalIgnoradas = 0

foreach ($f in $ferramentas) {
    $csvType = Get-CSVToolType $f.tipo
    if (-not $csvType) { $totalIgnoradas++; continue }

    $diametro = Get-Diametro $f
    if ($diametro -le 0) { $diametro = 10 }
    $comp = Get-Comprimentos $diametro $csvType
    $numDentes = Get-NumDentes $csvType $diametro

    # Descricao limpa (sem virgulas para nao quebrar CSV)
    $desc = $f.descricao
    if (-not $desc -or $desc -eq "") { $desc = "$($f.tool) $($f.maquina)" }
    $desc = $desc -replace ',', ';'
    if ($desc.Length -gt 80) { $desc = $desc.Substring(0, 80) }

    # RPM e avanco
    $rpm = 0; $feed = 0
    if ($f.dados_corte.rpm_mediana) { $rpm = [int]$f.dados_corte.rpm_mediana }
    if ($f.dados_corte.avanco_mediana) { $feed = $f.dados_corte.avanco_mediana }

    # Orientacao para milling tools
    $orientation = "Right"
    $direction = "0"

    # Montar linha CSV
    # Tool: numero + posicao (ex: " 1A")
    $toolId = " {0}A" -f $toolNum

    # Campos do CSV (mesma ordem do header):
    # Tool,SpinPosition,IdNumber,ToolType,Description,
    # A(comprimento total),B(flute length),C(shoulder length),D(diametro),D1,D2,
    # RA(tip angle),RB,ALPHA(helix),BETTA,E(num dentes),F,G,H,K(thread pitch),W,
    # Orientation,Direction,OriginPos,Extension,SideOffset,
    # Message1-5,
    # Coolants (7 campos),MinQLub,MinQLubValue,
    # ChangeType,FirstMovement,Move_X,Move_Z,
    # SpinUnit,SpinNormal,SpinFinish,FeedUnit,FeedNormal,FeedFinish,
    # SafetyAngle,SafetyMargin,SpinDirection

    $pitch = if ($csvType -eq "Tap") { Get-ThreadPitch $f } else { 0 }

    $linha = "{0},0,{1}, {2}, {3}, {4},{5},{6}, {7},0,0, {8},0,0,0,{9}, 0,0,0,{10},0, {11}, {12}, 0, 0,0,{13},,,,,0,0,0,0,0,0,0,0,0,Turret,X, 0, 10,0,{14},{14},1,{15},{15},0,0,3" -f `
        $toolId, `
        $toolNum, `
        $csvType, `
        $desc, `
        $comp.A, `
        $comp.B, `
        $comp.C, `
        $diametro, `
        $comp.TipAngle, `
        $numDentes, `
        $pitch, `
        $orientation, `
        $direction, `
        "$($f.maquina) $($f.tool)", `
        $rpm, `
        $feed

    [void]$linhas.Add($linha)
    $toolNum++
    $totalExportadas++
}

# Gravar CSV com CRLF (identico ao original)
$arquivoCSV = Join-Path $pastaSaida "LASEC_COMPLETA.CSV"
$conteudo = $linhas -join "`r`n"
[System.IO.File]::WriteAllText($arquivoCSV, $conteudo, [System.Text.Encoding]::ASCII)

Write-Host ""
Write-Host "=========================================="
Write-Host "BIBLIOTECA SOLIDCAM CSV GERADA"
Write-Host "=========================================="
Write-Host "Arquivo: $arquivoCSV"
Write-Host "Total exportadas: $totalExportadas ferramentas"
Write-Host "Total ignoradas (torno): $totalIgnoradas"
Write-Host ""
Write-Host "COMO IMPORTAR NO SOLIDCAM:"
Write-Host "1. Abrir SolidCAM > Tool Table"
Write-Host "2. File > Import from File"
Write-Host "3. Selecionar LASEC_COMPLETA.CSV"
Write-Host "4. Ferramentas aparecem na Tool Table"
Write-Host "=========================================="
