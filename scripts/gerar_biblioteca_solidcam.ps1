# GERADOR DE BIBLIOTECA SOLIDCAM (.sctools) A PARTIR DO BANCO DE DADOS CNC LASEC
# Converte BIBLIOTECA_FERRAMENTAS_CNC.json para formato nativo SolidCAM 2020
# Gera arquivos .sctools separados por tipo de ferramenta

# v2.0 - Corrigido: ordem parametros por tipo, sem BOM UTF-8, NumberOfThreadTeeth
$ErrorActionPreference = "SilentlyContinue"

$entrada = "D:\IA MALELO\banco_dados\BIBLIOTECA_FERRAMENTAS_CNC.json"
$pastaSaida = "D:\IA MALELO\banco_dados\SolidCAM_ToolLibs"

# Criar pasta de saida
if (-not (Test-Path $pastaSaida)) { New-Item -ItemType Directory -Path $pastaSaida -Force | Out-Null }

# Carregar banco de dados
Write-Host "Carregando biblioteca de ferramentas..."
$json = Get-Content $entrada -Raw -Encoding UTF8 | ConvertFrom-Json
$ferramentas = $json.ferramentas

Write-Host "Total de ferramentas no banco: $($ferramentas.Count)"

# Mapeamento tipo LASEC -> Cutter Type SolidCAM
# CommonDrill, SpotDrill, Countersink, FlatMill, BallMill, BullMill,
# FaceMill, TapRightHand, TapLeftHand, Reamer, ChamferMill
function Get-SolidCAMType($tipoLasec, $descricao) {
    switch ($tipoLasec) {
        "BROCA"             { return "CommonDrill" }
        "CENTRO"            { return "SpotDrill" }
        "CHANFRO"           { return "Countersink" }
        "FRESA"             { return "FlatMill" }
        "FACEAR"            { return "FaceMill" }
        "MACHO_ROSCA"       { return "TapRightHand" }
        "ALARGADOR"         { return "Reamer" }
        "DESBASTE"          { return "FlatMill" }
        "ACABAMENTO"        { return "FlatMill" }
        "CANAL_CORTE"       { return "FlatMill" }
        "INSERTO_ESPECIAL"  { return "FlatMill" }
        default             { return "" }  # OUTRO - nao exportar (turning tools)
    }
}

# Extrair diametro da descricao ou tool number
function Get-Diametro($ferramenta) {
    $d = $ferramenta.diametro_mm
    if ($d -and $d -ne "" -and $d -ne "0") {
        return [double]$d
    }

    # Tentar extrair da descricao
    $desc = $ferramenta.descricao
    if ($desc -match '(\d+\.?\d*)\s*mm') {
        return [double]$Matches[1]
    }
    if ($desc -match 'D(\d+\.?\d*)') {
        return [double]$Matches[1]
    }
    if ($desc -match 'M(\d+\.?\d*)') {
        # Macho de rosca - diametro nominal
        return [double]$Matches[1]
    }
    if ($desc -match '^(\d+\.?\d*)\s') {
        return [double]$Matches[1]
    }

    # Para brocas, tentar calcular pelo RPM e Vc tipico
    # Vc = pi * D * RPM / 1000 -> D = Vc * 1000 / (pi * RPM)
    # Nao fazer - melhor deixar 0 do que chutar

    return 0
}

# Extrair pitch da descricao (para machos)
function Get-ThreadPitch($ferramenta) {
    $desc = $ferramenta.descricao
    if ($desc -match 'M\d+\.?\d*\s*[xX]\s*(\d+\.?\d*)') {
        return [double]$Matches[1]
    }
    # Pitches padrao ISO metrico
    $d = Get-Diametro $ferramenta
    switch ([int]$d) {
        3  { return 0.5 }
        4  { return 0.7 }
        5  { return 0.8 }
        6  { return 1.0 }
        8  { return 1.25 }
        10 { return 1.5 }
        12 { return 1.75 }
        14 { return 2.0 }
        16 { return 2.0 }
        20 { return 2.5 }
        24 { return 3.0 }
        default { return 0 }
    }
}

# Gerar GUID
function New-ToolGuid {
    return [guid]::NewGuid().ToString()
}

# Estimar comprimentos baseado no diametro
function Get-Comprimentos($diametro, $tipo) {
    if ($diametro -le 0) { $diametro = 10 }  # default

    switch ($tipo) {
        "CommonDrill" {
            $flute = [math]::Round($diametro * 5, 1)   # 5xD tipico
            if ($flute -lt 10) { $flute = 10 }
            $shoulder = [math]::Round($flute * 2, 1)
            $body = [math]::Round($flute * 3, 1)
            return @{ Flute=$flute; Shoulder=$shoulder; Body=$body; TipAngle=118 }
        }
        "SpotDrill" {
            $flute = [math]::Round($diametro * 1.5, 1)
            if ($flute -lt 8) { $flute = 8 }
            $shoulder = [math]::Round($flute * 2, 1)
            $body = [math]::Round($flute * 3, 1)
            return @{ Flute=$flute; Shoulder=$shoulder; Body=$body; TipAngle=90 }
        }
        "Countersink" {
            $flute = [math]::Round($diametro * 4, 1)
            if ($flute -lt 20) { $flute = 20 }
            $shoulder = [math]::Round($flute * 2, 1)
            $body = [math]::Round($flute * 3, 1)
            return @{ Flute=$flute; Shoulder=$shoulder; Body=$body; TipAngle=90 }
        }
        "FlatMill" {
            $flute = [math]::Round($diametro * 1.5, 1)
            if ($flute -lt 4.5) { $flute = 4.5 }
            $shoulder = [math]::Round($flute * 2, 1)
            $body = [math]::Round($flute * 3, 1)
            return @{ Flute=$flute; Shoulder=$shoulder; Body=$body; TipAngle=0 }
        }
        "FaceMill" {
            $flute = [math]::Round($diametro * 0.3, 1)
            if ($flute -lt 5) { $flute = 5 }
            $shoulder = [math]::Round($flute * 2, 1)
            $body = [math]::Round($flute * 3, 1)
            return @{ Flute=$flute; Shoulder=$shoulder; Body=$body; TipAngle=0 }
        }
        "TapRightHand" {
            $flute = [math]::Round($diametro * 3, 1)
            if ($flute -lt 15) { $flute = 15 }
            $shoulder = [math]::Round($flute * 2, 1)
            $body = [math]::Round($flute * 3, 1)
            return @{ Flute=$flute; Shoulder=$shoulder; Body=$body; TipAngle=90 }
        }
        "Reamer" {
            $flute = [math]::Round($diametro * 3, 1)
            if ($flute -lt 20) { $flute = 20 }
            $shoulder = [math]::Round($flute * 2, 1)
            $body = [math]::Round($flute * 3, 1)
            return @{ Flute=$flute; Shoulder=$shoulder; Body=$body; TipAngle=45 }
        }
        default {
            return @{ Flute=50; Shoulder=100; Body=150; TipAngle=0 }
        }
    }
}

# Numero de dentes por tipo
function Get-NumDentes($tipo, $diametro) {
    switch ($tipo) {
        "CommonDrill"   { return 2 }
        "SpotDrill"     { return 2 }
        "Countersink"   { return 3 }
        "FlatMill"      { if ($diametro -le 6) { return 2 } elseif ($diametro -le 12) { return 3 } else { return 4 } }
        "FaceMill"      { if ($diametro -le 50) { return 4 } elseif ($diametro -le 80) { return 5 } else { return 6 } }
        "TapRightHand"  { return 3 }
        "Reamer"        { return 6 }
        default         { return 4 }
    }
}

# Separar ferramentas por tipo SolidCAM
$porTipo = @{}
$itemNum = @{}
$totalExportadas = 0
$totalIgnoradas = 0

foreach ($f in $ferramentas) {
    $scType = Get-SolidCAMType $f.tipo $f.descricao

    if (-not $scType) {
        # Ferramentas de torno (OUTRO) - nao exportar para SolidCAM milling
        $totalIgnoradas++
        continue
    }

    if (-not $porTipo[$scType]) {
        $porTipo[$scType] = [System.Collections.ArrayList]::new()
        $itemNum[$scType] = 1
    }

    $diametro = Get-Diametro $f
    $comp = Get-Comprimentos $diametro $scType
    $numDentes = Get-NumDentes $scType $diametro
    $pitch = if ($scType -eq "TapRightHand") { Get-ThreadPitch $f } else { 0 }

    # Montar descricao rica
    $desc = $f.descricao
    if (-not $desc -or $desc -eq "") {
        $desc = "$($f.tool) $($f.maquina)"
    }
    # Adicionar info de dados de corte na descricao
    $rpmInfo = ""
    if ($f.dados_corte.rpm_mediana -and $f.dados_corte.rpm_mediana -gt 0) {
        $rpmInfo = " [RPM:$($f.dados_corte.rpm_mediana)"
        if ($f.dados_corte.avanco_mediana -and $f.dados_corte.avanco_mediana -gt 0) {
            $rpmInfo += " F:$($f.dados_corte.avanco_mediana)"
        }
        $rpmInfo += " $($f.maquina)]"
    }
    $descFull = "$desc$rpmInfo"
    if ($descFull.Length -gt 100) { $descFull = $descFull.Substring(0, 100) }

    $entry = @{
        Guid = New-ToolGuid
        Type = $scType
        Diameter = if ($diametro -gt 0) { $diametro } else { 10 }
        ShaftDiameter = if ($diametro -gt 0) { $diametro } else { 10 }
        FluteLength = $comp.Flute
        ShoulderLength = $comp.Shoulder
        BodyLength = $comp.Body
        TipAngle = $comp.TipAngle
        NumberOfTeeth = $numDentes
        ItemNumber = $itemNum[$scType]
        Description = $descFull
        ThreadPitch = $pitch
        Maquina = $f.maquina
        Tool = $f.tool
        RPM = $f.dados_corte.rpm_mediana
        Feed = $f.dados_corte.avanco_mediana
    }

    [void]$porTipo[$scType].Add($entry)
    $itemNum[$scType]++
    $totalExportadas++
}

Write-Host ""
Write-Host "Ferramentas para exportar: $totalExportadas"
Write-Host "Ferramentas ignoradas (torno): $totalIgnoradas"
Write-Host ""

# Nomes amigaveis para arquivos
$nomeArquivo = @{
    "CommonDrill"   = "LASEC_Brocas"
    "SpotDrill"     = "LASEC_Brocas_Centro"
    "Countersink"   = "LASEC_Chanfros_Escareadores"
    "FlatMill"      = "LASEC_Fresas_Topo"
    "FaceMill"      = "LASEC_Fresas_Facear"
    "TapRightHand"  = "LASEC_Machos_Rosca"
    "Reamer"        = "LASEC_Alargadores"
    "BallMill"      = "LASEC_Fresas_Esfericas"
    "ChamferMill"   = "LASEC_Fresas_Chanfro"
}

# Funcao para escrever um Cutter na ordem EXATA do SolidCAM oficial (por tipo)
# Ordem extraida das bibliotecas ISO Drills, ISO Mills, ISO Taps, ISO Spot drills, ISO Counter sinks
function Write-CutterXml($sb, $item, $itemNumber) {
    $descEscaped = $item.Description -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;' -replace '"','&quot;'
    [void]$sb.AppendLine("  <Cutter Type=`"$($item.Type)`">")

    switch ($item.Type) {
        # CommonDrill, SpotDrill, TapRightHand, Reamer: mesma ordem do ISO Drills/Taps/Spot drills
        { $_ -in "CommonDrill","SpotDrill","TapRightHand","Reamer" } {
            [void]$sb.AppendLine("    <Parameter Type=`"ItemGuid`">$($item.Guid)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"FluteLength`">$($item.FluteLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ShoulderLength`">$($item.ShoulderLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"BodyLength`">$($item.BodyLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Diameter`">$($item.Diameter)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ShaftDiameter`">$($item.ShaftDiameter)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ThreadPitch`">$($item.ThreadPitch)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TipAngle`">$($item.TipAngle)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TipDiameter`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TaperAngle`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"CornerRadius`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"NumberOfTeeth`">$($item.NumberOfTeeth)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ItemNumber`">$itemNumber</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Description`">$descEscaped</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"LengthOffset`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"DiameterOffset`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Coolant`">Disabled</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ItemUnitSystem`">Metric</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TaperLength`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"HolderSegments`" />")
            [void]$sb.AppendLine("    <Parameter Type=`"NumberOfThreadTeeth`">0</Parameter>")
        }
        # FlatMill, FaceMill, BallMill: ordem do ISO Mills MM
        { $_ -in "FlatMill","FaceMill","BallMill","BullMill","ChamferMill" } {
            [void]$sb.AppendLine("    <Parameter Type=`"ItemGuid`">$($item.Guid)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Diameter`">$($item.Diameter)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ShaftDiameter`">$($item.ShaftDiameter)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"FluteLength`">$($item.FluteLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ShoulderLength`">$($item.ShoulderLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"BodyLength`">$($item.BodyLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"NumberOfTeeth`">$($item.NumberOfTeeth)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ItemNumber`">$itemNumber</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Description`">$descEscaped</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"LengthOffset`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"DiameterOffset`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Coolant`">Disabled</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ItemUnitSystem`">Metric</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TaperLength`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"HolderSegments`" />")
            [void]$sb.AppendLine("    <Parameter Type=`"TipDiameter`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TaperAngle`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"CornerRadius`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TipAngle`">$($item.TipAngle)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ThreadPitch`">$($item.ThreadPitch)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"NumberOfThreadTeeth`">0</Parameter>")
        }
        # Countersink: ordem do ISO Counter sinks
        "Countersink" {
            [void]$sb.AppendLine("    <Parameter Type=`"ItemGuid`">$($item.Guid)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Diameter`">$($item.Diameter)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ShaftDiameter`">$($item.ShaftDiameter)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"FluteLength`">$($item.FluteLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ShoulderLength`">$($item.ShoulderLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"BodyLength`">$($item.BodyLength)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TipAngle`">$($item.TipAngle)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ItemNumber`">$itemNumber</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Description`">$descEscaped</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"LengthOffset`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"DiameterOffset`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"Coolant`">Disabled</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"NumberOfTeeth`">$($item.NumberOfTeeth)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ItemUnitSystem`">Metric</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TaperLength`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"HolderSegments`" />")
            [void]$sb.AppendLine("    <Parameter Type=`"TipDiameter`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"TaperAngle`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"CornerRadius`">0</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"ThreadPitch`">$($item.ThreadPitch)</Parameter>")
            [void]$sb.AppendLine("    <Parameter Type=`"NumberOfThreadTeeth`">0</Parameter>")
        }
    }

    [void]$sb.AppendLine("  </Cutter>")
}

# Gerar arquivos .sctools (separados por tipo)
foreach ($tipo in $porTipo.Keys) {
    $items = $porTipo[$tipo]
    if ($items.Count -eq 0) { continue }

    $nome = if ($nomeArquivo[$tipo]) { $nomeArquivo[$tipo] } else { "LASEC_$tipo" }
    $arquivo = Join-Path $pastaSaida "$nome.sctools"

    $sb = [System.Text.StringBuilder]::new()
    [void]$sb.AppendLine('<Library Version="3">')

    foreach ($item in $items) {
        Write-CutterXml $sb $item $item.ItemNumber
    }

    [void]$sb.AppendLine('</Library>')

    # Gravar sem BOM (identico aos arquivos oficiais ISO)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($arquivo, $sb.ToString(), $utf8NoBom)
    Write-Host "$nome.sctools : $($items.Count) ferramentas"
}

# Gerar tambem um arquivo UNICO com TODAS as ferramentas
Write-Host ""
Write-Host "Gerando biblioteca completa..."
$arquivoCompleto = Join-Path $pastaSaida "LASEC_COMPLETA.sctools"
$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine('<Library Version="3">')
$numGlobal = 1

foreach ($tipo in $porTipo.Keys) {
    foreach ($item in $porTipo[$tipo]) {
        Write-CutterXml $sb $item $numGlobal
        $numGlobal++
    }
}

[void]$sb.AppendLine('</Library>')
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($arquivoCompleto, $sb.ToString(), $utf8NoBom)

Write-Host ""
Write-Host "=========================================="
Write-Host "BIBLIOTECA SOLIDCAM GERADA COM SUCESSO"
Write-Host "=========================================="
Write-Host "Pasta: $pastaSaida"
Write-Host "Total exportadas: $totalExportadas ferramentas"
Write-Host "Total ignoradas (torno): $totalIgnoradas"
Write-Host "Arquivo completo: LASEC_COMPLETA.sctools ($($numGlobal - 1) ferramentas)"
Write-Host ""
Write-Host "COMO IMPORTAR NO SOLIDCAM 2020:"
Write-Host "1. Abrir SolidCAM > ToolKit"
Write-Host "2. File > Import from File"
Write-Host "3. Selecionar arquivo .sctools desejado"
Write-Host "4. Ferramentas aparecem na biblioteca"
Write-Host ""
Write-Host "OU copiar para pasta predefinida:"
Write-Host "E:\Program Files\SolidCAM2020\Solidcam\CimcoEditor\ToolLibs\Predefined\"
Write-Host "=========================================="
