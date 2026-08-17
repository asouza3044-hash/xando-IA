# CATALOGADOR DE PROGRAMAS CNC v3 - LASEC
# Gera 2 bancos: (1) Programas catalogados (2) Biblioteca de ferramentas com dados de corte
# Para futuras consultas em orcamentos e importacao SolidCAM

$ErrorActionPreference = "SilentlyContinue"
$raiz = "D:\PROG_CNC"
$saidaDB = "D:\IA MALELO\banco_dados\PROG_CNC_DATABASE_v3.json"
$saidaTools = "D:\IA MALELO\banco_dados\BIBLIOTECA_FERRAMENTAS_CNC.json"

$maquinas = @("LYNX220","DISCO760","DISCO560","G240","GL280","CENTU30D","CENTU30S","VTC30A","CAM")

$programas = [System.Collections.ArrayList]::new()
# Hash global de ferramentas: chave = "MAQUINA|TOOL|DESCRICAO"
$ferramentasGlobal = @{}
$totalExtraidos = 0

function Extrair-Ferramentas-Detalhado {
    param([string]$conteudo, [string]$maquina)

    $resultado = [System.Collections.ArrayList]::new()
    $linhas = $conteudo -split "`r?`n"

    $toolAtual = ""
    $descTool = ""
    $rpmsT = [System.Collections.ArrayList]::new()
    $avancosT = [System.Collections.ArrayList]::new()
    $ciclosT = [System.Collections.ArrayList]::new()
    $operacaoT = ""

    for ($i = 0; $i -lt $linhas.Count; $i++) {
        $linha = $linhas[$i].Trim()

        # Detectar troca de ferramenta - Tornos: T0505, T0101, etc.
        # Centro: T5 M6, T16 M6, etc.
        $novoTool = $false

        if ($linha -match '^\s*T(\d{2})(\d{2})\b' -and $maquina -notmatch 'DISCO|VTC|CAM') {
            # Torno: T0505, T0909, etc (formato TTOO)
            $novoToolNum = "T" + $Matches[1] + $Matches[2]
            $novoTool = $true
        }
        elseif ($linha -match '\bT(\d{1,2})\b' -and ($linha -match 'M6|M06' -or $maquina -match 'DISCO|VTC|CAM')) {
            # Centro: T5 M6, T16, etc
            $novoToolNum = "T" + $Matches[1]
            $novoTool = $true
        }
        elseif ($linha -match '^\s*T(\d{4})\b') {
            $novoToolNum = "T" + $Matches[1]
            $novoTool = $true
        }

        if ($novoTool) {
            # Salvar ferramenta anterior
            if ($toolAtual -and $toolAtual -ne "T00" -and $toolAtual -ne "T0000") {
                $reg = [ordered]@{
                    tool = $toolAtual
                    descricao = $descTool
                    operacao = $operacaoT
                    rpms = @($rpmsT | Sort-Object -Unique)
                    avancos = @($avancosT | Sort-Object -Unique)
                    ciclos = @($ciclosT | Sort-Object -Unique)
                }
                [void]$resultado.Add($reg)
            }

            # Iniciar nova ferramenta
            $toolAtual = $novoToolNum
            $rpmsT = [System.Collections.ArrayList]::new()
            $avancosT = [System.Collections.ArrayList]::new()
            $ciclosT = [System.Collections.ArrayList]::new()
            $descTool = ""
            $operacaoT = ""

            # Buscar descricao no comentario da mesma linha ou linhas proximas
            if ($linha -match '\(([^)]+)\)') {
                $descTool = $Matches[1].Trim()
            }
            # Buscar no N##(DESC) anterior mais proximo (ate 3 linhas antes)
            if (-not $descTool) {
                for ($j = [Math]::Max(0, $i-3); $j -lt $i; $j++) {
                    if ($linhas[$j] -match 'N\d+\s*\(([^)]+)\)') {
                        $operacaoT = $Matches[1].Trim()
                        break
                    }
                }
            }
            # Buscar comentario na linha seguinte
            if (-not $descTool -and ($i+1) -lt $linhas.Count) {
                if ($linhas[$i+1] -match '^\s*\(([^)]+)\)') {
                    $descTool = $Matches[1].Trim()
                }
            }
        }

        # Se estamos dentro de uma ferramenta, coletar dados de corte
        if ($toolAtual) {
            # RPM
            if ($linha -match 'S(\d{2,5})') {
                $sVal = [int]$Matches[1]
                if ($sVal -ge 50 -and $sVal -le 15000) {
                    [void]$rpmsT.Add($sVal)
                }
            }
            # Avanco
            if ($linha -match 'F(\d*\.?\d+)') {
                $fVal = $Matches[1]
                if ($fVal -ne "0" -and $fVal -ne "") {
                    [void]$avancosT.Add($fVal)
                }
            }
            # Ciclos
            $ciclosCheck = @('G70','G71','G72','G73','G74','G75','G76','G77','G80','G81','G82','G83','G84','G85','G86','G87','G96','G97','G1002','G1064','G1210','G1221')
            foreach ($c in $ciclosCheck) {
                if ($linha -match "\b$c\b") {
                    if ($ciclosT -notcontains $c) { [void]$ciclosT.Add($c) }
                }
            }
            # Operacao do N##
            if ($linha -match 'N\d+\s*\(([^)]+)\)') {
                $operacaoT = $Matches[1].Trim()
            }
        }
    }

    # Salvar ultima ferramenta
    if ($toolAtual -and $toolAtual -ne "T00" -and $toolAtual -ne "T0000") {
        $reg = [ordered]@{
            tool = $toolAtual
            descricao = $descTool
            operacao = $operacaoT
            rpms = @($rpmsT | Sort-Object -Unique)
            avancos = @($avancosT | Sort-Object -Unique)
            ciclos = @($ciclosT | Sort-Object -Unique)
        }
        [void]$resultado.Add($reg)
    }

    return $resultado
}

foreach ($maq in $maquinas) {
    $pasta = Join-Path $raiz $maq
    if (-not (Test-Path $pasta)) { continue }

    $arquivos = Get-ChildItem -Path $pasta -File -Recurse | Where-Object {
        ($_.Extension -match '\.(txt|TXT|nc|NC|cnc|CNC|tap|TAP)$' -or $_.Extension -eq '') -and $_.Extension -ne ".ALL"
    }

    $countMaq = 0
    foreach ($arq in $arquivos) {
        try {
            $conteudo = [System.IO.File]::ReadAllText($arq.FullName, [System.Text.Encoding]::GetEncoding(1252))
        } catch { continue }

        if ($conteudo.Length -lt 20) { continue }
        $linhas = $conteudo -split "`r?`n"

        # Extrair numero O e nome da peca
        $numPrograma = ""
        $nomePeca = ""
        foreach ($linha in $linhas[0..10]) {
            if ($linha -match '[O:]\s*(\d{3,5})\s*\(([^)]+)\)') {
                $numPrograma = "O" + $Matches[1]
                $nomePeca = $Matches[2].Trim()
                break
            }
            elseif ($linha -match '^\s*O(\d{3,5})') {
                $numPrograma = "O" + $Matches[1]
            }
            elseif ($linha -match '\(([A-Z0-9][^)]{2,})\)' -and -not $nomePeca) {
                $nomePeca = $Matches[1].Trim()
            }
        }
        if (-not $numPrograma -and -not $nomePeca) {
            $nomePeca = $arq.BaseName
            if ($nomePeca -match '^\d+$') { $numPrograma = "O" + $nomePeca }
        }

        # Extrair ferramentas detalhadas
        $ferrDetalhadas = Extrair-Ferramentas-Detalhado -conteudo $conteudo -maquina $maq

        # Acumular na biblioteca global
        foreach ($fd in $ferrDetalhadas) {
            $chave = "$maq|$($fd.tool)|$($fd.descricao)"
            if (-not $ferramentasGlobal.ContainsKey($chave)) {
                $ferramentasGlobal[$chave] = [ordered]@{
                    maquina = $maq
                    tool = $fd.tool
                    descricao = $fd.descricao
                    operacoes = [System.Collections.ArrayList]::new()
                    todosRpms = [System.Collections.ArrayList]::new()
                    todosAvancos = [System.Collections.ArrayList]::new()
                    todosCiclos = [System.Collections.ArrayList]::new()
                    programasUsados = [System.Collections.ArrayList]::new()
                    ocorrencias = 0
                }
            }
            $ref = $ferramentasGlobal[$chave]
            $ref.ocorrencias++

            if ($fd.operacao -and $ref.operacoes -notcontains $fd.operacao) {
                [void]$ref.operacoes.Add($fd.operacao)
            }
            foreach ($r in $fd.rpms) {
                if ($ref.todosRpms -notcontains $r) { [void]$ref.todosRpms.Add($r) }
            }
            foreach ($f in $fd.avancos) {
                if ($ref.todosAvancos -notcontains $f) { [void]$ref.todosAvancos.Add($f) }
            }
            foreach ($c in $fd.ciclos) {
                if ($ref.todosCiclos -notcontains $c) { [void]$ref.todosCiclos.Add($c) }
            }
            $progRef = if ($numPrograma) { $numPrograma } else { $arq.BaseName }
            if ($ref.programasUsados.Count -lt 10 -and $ref.programasUsados -notcontains $progRef) {
                [void]$ref.programasUsados.Add($progRef)
            }
        }

        # Work offsets
        $offsets = [System.Collections.ArrayList]::new()
        foreach ($wo in @('G54','G55','G56','G57','G58','G59')) {
            if ($conteudo -match $wo) { [void]$offsets.Add($wo) }
        }

        $liveTooling = ($conteudo -match 'M33' -or $conteudo -match 'M35')
        $cAxis = ($conteudo -match '\bC\d' -and $conteudo -match 'G12\.1|M33|M35')
        $eixo4 = ($conteudo -match '\bA\d' -and $maq -match 'DISCO|VTC')

        # Material
        $material = ""
        $nomeUpper = ($nomePeca + " " + $arq.BaseName).ToUpper()
        if ($nomeUpper -match 'INOX|304|316|AISI') { $material = "INOX" }
        elseif ($nomeUpper -match 'LATA[OÃ]|LATAO') { $material = "LATAO" }
        elseif ($nomeUpper -match 'ALUM[IÍ]|6351|6061|7075|DURAL') { $material = "ALUMINIO" }
        elseif ($nomeUpper -match 'BRONZE') { $material = "BRONZE" }
        elseif ($nomeUpper -match 'NYLON|POLIAC|TEFLON|PVC|PEAD') { $material = "PLASTICO" }
        elseif ($nomeUpper -match 'VC\s?\d|4340|1020|1045|8620|SAE') { $material = "ACO" }

        $numLinhas = $linhas.Count
        $complexidade = "SIMPLES"
        if ($numLinhas -gt 200) { $complexidade = "MEDIA" }
        if ($numLinhas -gt 500) { $complexidade = "COMPLEXA" }

        # Extrair lista simples de ferramentas para o registro do programa
        $toolList = @()
        foreach ($fd in $ferrDetalhadas) {
            $toolList += [ordered]@{
                tool = $fd.tool
                descricao = $fd.descricao
                operacao = $fd.operacao
                rpms = $fd.rpms
                avancos = $fd.avancos
                ciclos = $fd.ciclos
            }
        }

        $reg = [ordered]@{
            arquivo = $arq.Name
            caminho = $arq.FullName.Replace("D:\PROG_CNC\","")
            maquina = $maq
            programa = $numPrograma
            peca = $nomePeca
            material = $material
            ferramentas = $toolList
            numFerramentas = $ferrDetalhadas.Count
            workOffsets = $offsets.ToArray()
            liveTooling = $liveTooling
            eixoC = $cAxis
            eixo4 = $eixo4
            numLinhas = $numLinhas
            complexidade = $complexidade
            dataArquivo = $arq.LastWriteTime.ToString("yyyy-MM-dd")
            ano = $arq.LastWriteTime.Year
        }

        [void]$programas.Add($reg)
        $totalExtraidos++
        $countMaq++
    }

    Write-Host "$maq : $countMaq programas extraidos (total acumulado: $totalExtraidos)"
}

# ============================================================
# MONTAR BIBLIOTECA DE FERRAMENTAS
# ============================================================
Write-Host ""
Write-Host "Processando biblioteca de ferramentas..."

$bibliotecaFerramentas = [System.Collections.ArrayList]::new()

foreach ($entry in $ferramentasGlobal.GetEnumerator()) {
    $ft = $entry.Value

    # Calcular RPM tipico (mediana)
    $rpmsArr = @($ft.todosRpms | Sort-Object)
    $rpmMin = if ($rpmsArr.Count -gt 0) { $rpmsArr[0] } else { 0 }
    $rpmMax = if ($rpmsArr.Count -gt 0) { $rpmsArr[-1] } else { 0 }
    $rpmMediana = 0
    if ($rpmsArr.Count -gt 0) {
        $mid = [int]($rpmsArr.Count / 2)
        $rpmMediana = $rpmsArr[$mid]
    }

    # Calcular avanco tipico
    $avArr = @($ft.todosAvancos | ForEach-Object { [double]$_ } | Sort-Object)
    $avMin = if ($avArr.Count -gt 0) { $avArr[0] } else { 0 }
    $avMax = if ($avArr.Count -gt 0) { $avArr[-1] } else { 0 }
    $avMediana = 0
    if ($avArr.Count -gt 0) {
        $mid = [int]($avArr.Count / 2)
        $avMediana = $avArr[$mid]
    }

    # Classificar tipo de ferramenta pela descricao
    $tipo = "OUTRO"
    $desc = $ft.descricao.ToUpper()
    if ($desc -match 'BROCA|DRILL|FURO|B\d') { $tipo = "BROCA" }
    elseif ($desc -match 'FRESA|FREZ|MILL|END\s?MILL') { $tipo = "FRESA" }
    elseif ($desc -match 'MACHO|TAP|ROSCA|RBH|BSP') { $tipo = "MACHO_ROSCA" }
    elseif ($desc -match 'FACE|FACEAR|DESB.*FACE') { $tipo = "FACEAR" }
    elseif ($desc -match 'DESB|DESBASTE|ROUGH') { $tipo = "DESBASTE" }
    elseif ($desc -match 'ACAB|ACABAMENTO|FINISH') { $tipo = "ACABAMENTO" }
    elseif ($desc -match 'CANAL|BEDAME|CORTE|CUT|SANGR') { $tipo = "CANAL_CORTE" }
    elseif ($desc -match 'CHANF|CHAMF|ESCAREADOR') { $tipo = "CHANFRO" }
    elseif ($desc -match 'CENTRO|CENTER') { $tipo = "CENTRO_DRILL" }
    elseif ($desc -match 'ALARGAR|REAM|MANDRIL') { $tipo = "ALARGADOR" }
    elseif ($desc -match 'PENTA|TMAX') { $tipo = "INSERTO_ESPECIAL" }

    # Extrair diametro da descricao se possivel
    $diametro = ""
    if ($desc -match '(\d+[\.,]?\d*)\s*MM' ) { $diametro = $Matches[1] -replace ',','.' }
    elseif ($desc -match 'D\s*(\d+[\.,]?\d*)') { $diametro = $Matches[1] -replace ',','.' }
    elseif ($desc -match '[OØ]\s*(\d+[\.,]?\d*)') { $diametro = $Matches[1] -replace ',','.' }

    $ferrReg = [ordered]@{
        maquina = $ft.maquina
        tool = $ft.tool
        descricao = $ft.descricao
        tipo = $tipo
        diametro_mm = $diametro
        dados_corte = [ordered]@{
            rpm_min = $rpmMin
            rpm_max = $rpmMax
            rpm_mediana = $rpmMediana
            avanco_min = $avMin
            avanco_max = $avMax
            avanco_mediana = $avMediana
            rpms_encontrados = @($rpmsArr | Select-Object -Unique)
            avancos_encontrados = @($ft.todosAvancos | Select-Object -Unique)
        }
        ciclos_usados = @($ft.todosCiclos | Select-Object -Unique)
        operacoes = @($ft.operacoes | Select-Object -Unique)
        programas_referencia = @($ft.programasUsados)
        ocorrencias = $ft.ocorrencias
    }

    [void]$bibliotecaFerramentas.Add($ferrReg)
}

# Ordenar por maquina, tipo, ocorrencias
$bibliotecaOrdenada = $bibliotecaFerramentas | Sort-Object { $_.maquina }, { $_.tipo }, { -[int]$_.ocorrencias }

# Estatisticas ferramentas
$statsFerramentas = [ordered]@{
    totalFerramentasUnicas = $bibliotecaFerramentas.Count
    porMaquina = [ordered]@{}
    porTipo = [ordered]@{}
    top20MaisUsadas = @()
}

foreach ($f in $bibliotecaFerramentas) {
    if (-not $statsFerramentas.porMaquina[$f.maquina]) { $statsFerramentas.porMaquina[$f.maquina] = 0 }
    $statsFerramentas.porMaquina[$f.maquina]++

    if (-not $statsFerramentas.porTipo[$f.tipo]) { $statsFerramentas.porTipo[$f.tipo] = 0 }
    $statsFerramentas.porTipo[$f.tipo]++
}

$top20 = $bibliotecaFerramentas | Sort-Object { -[int]$_.ocorrencias } | Select-Object -First 20
$statsFerramentas.top20MaisUsadas = @($top20 | ForEach-Object {
    [ordered]@{
        maquina = $_.maquina
        tool = $_.tool
        descricao = $_.descricao
        tipo = $_.tipo
        ocorrencias = $_.ocorrencias
        rpm_tipico = $_.dados_corte.rpm_mediana
        avanco_tipico = $_.dados_corte.avanco_mediana
    }
})

# ============================================================
# ESTATISTICAS PROGRAMAS
# ============================================================
$statsProg = [ordered]@{
    dataGeracao = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    totalProgramas = $programas.Count
    porMaquina = [ordered]@{}
    porComplexidade = [ordered]@{}
    porMaterial = [ordered]@{}
}

foreach ($p in $programas) {
    if (-not $statsProg.porMaquina[$p.maquina]) { $statsProg.porMaquina[$p.maquina] = 0 }
    $statsProg.porMaquina[$p.maquina]++
    if (-not $statsProg.porComplexidade[$p.complexidade]) { $statsProg.porComplexidade[$p.complexidade] = 0 }
    $statsProg.porComplexidade[$p.complexidade]++
    $mat = if ($p.material) { $p.material } else { "NAO_IDENTIFICADO" }
    if (-not $statsProg.porMaterial[$mat]) { $statsProg.porMaterial[$mat] = 0 }
    $statsProg.porMaterial[$mat]++
}

# ============================================================
# SALVAR BANCO DE PROGRAMAS
# ============================================================
$dbProg = [ordered]@{
    _info = "Banco de dados CNC LASEC v3 - Programas com ferramentas detalhadas"
    _versao = "3.0"
    _fonte = "D:\PROG_CNC (25 anos de programas)"
    estatisticas = $statsProg
    programas = $programas.ToArray()
}
$jsonProg = $dbProg | ConvertTo-Json -Depth 6 -Compress:$false
[System.IO.File]::WriteAllText($saidaDB, $jsonProg, [System.Text.Encoding]::UTF8)

# ============================================================
# SALVAR BIBLIOTECA DE FERRAMENTAS
# ============================================================
$dbTools = [ordered]@{
    _info = "Biblioteca de Ferramentas CNC LASEC - Dados de corte reais extraidos de 25 anos de programas"
    _versao = "1.0"
    _uso = "Consulta para orcamentos + importacao SolidCAM"
    _dataGeracao = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    _totalProgramasAnalisados = $programas.Count
    estatisticas = $statsFerramentas
    ferramentas = @($bibliotecaOrdenada)
}
$jsonTools = $dbTools | ConvertTo-Json -Depth 6 -Compress:$false
[System.IO.File]::WriteAllText($saidaTools, $jsonTools, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "=========================================="
Write-Host "BANCOS DE DADOS GERADOS COM SUCESSO"
Write-Host "=========================================="
Write-Host "1. PROGRAMAS: $saidaDB"
Write-Host "   Total: $($programas.Count) programas"
Write-Host "   Tamanho: $([math]::Round((Get-Item $saidaDB).Length / 1MB, 2)) MB"
Write-Host ""
Write-Host "2. FERRAMENTAS: $saidaTools"
Write-Host "   Total: $($bibliotecaFerramentas.Count) ferramentas unicas"
Write-Host "   Tamanho: $([math]::Round((Get-Item $saidaTools).Length / 1MB, 2)) MB"
Write-Host "=========================================="
Write-Host ""
Write-Host "--- TOP 10 FERRAMENTAS MAIS USADAS ---"
$top20 | Select-Object -First 10 | ForEach-Object {
    Write-Host ("{0,-10} {1,-6} {2,-30} RPM:{3,-6} F:{4,-6} ({5}x)" -f $_.maquina, $_.tool, $_.descricao, $_.dados_corte.rpm_mediana, $_.dados_corte.avanco_mediana, $_.ocorrencias)
}
