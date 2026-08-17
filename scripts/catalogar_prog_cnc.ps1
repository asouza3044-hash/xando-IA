# CATALOGADOR DE PROGRAMAS CNC - LASEC
# Varre D:\PROG_CNC e gera banco de dados JSON para consulta em orcamentos
# Extrai: nome peca, maquina, ferramentas, operacoes, RPM, avancos, ciclos, work offsets

$ErrorActionPreference = "SilentlyContinue"
$raiz = "D:\PROG_CNC"
$saida = "D:\IA MALELO\banco_dados\PROG_CNC_DATABASE_v2.json"

# Maquinas conhecidas (pastas principais)
$maquinas = @("LYNX220","DISCO760","DISCO560","G240","GL280","CENTU30D","CENTU30S","VTC30A","CAM")

$programas = [System.Collections.ArrayList]::new()
$totalArquivos = 0
$totalExtraidos = 0

foreach ($maq in $maquinas) {
    $pasta = Join-Path $raiz $maq
    if (-not (Test-Path $pasta)) { continue }

    $arquivos = Get-ChildItem -Path $pasta -File -Recurse | Where-Object {
        $_.Extension -match '\.(txt|TXT|nc|NC|cnc|CNC|tap|TAP)$' -or $_.Extension -eq ''
    }

    foreach ($arq in $arquivos) {
        $totalArquivos++

        # Pular arquivos .ALL (backup completo)
        if ($arq.Extension -eq ".ALL") { continue }

        try {
            $conteudo = [System.IO.File]::ReadAllText($arq.FullName, [System.Text.Encoding]::GetEncoding(1252))
        } catch {
            continue
        }

        # Pular arquivos muito pequenos ou vazios
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
            # Tentar usar nome do arquivo
            $nomePeca = $arq.BaseName
            if ($nomePeca -match '^[\d]+$') { $numPrograma = "O" + $nomePeca }
        }

        # Extrair ferramentas (T0101, T0505, T1, T12, etc)
        $ferramentas = [System.Collections.ArrayList]::new()
        $matches_t = [regex]::Matches($conteudo, 'T(\d{1,2}(?:\d{2})?)\b')
        foreach ($m in $matches_t) {
            $tVal = "T" + $m.Groups[1].Value
            if ($tVal -ne "T00" -and $tVal -ne "T0" -and $ferramentas -notcontains $tVal) {
                [void]$ferramentas.Add($tVal)
            }
        }

        # Extrair operacoes dos comentarios N##(OPERACAO)
        $operacoes = [System.Collections.ArrayList]::new()
        $matches_n = [regex]::Matches($conteudo, 'N\d+\s*\(([^)]+)\)')
        foreach ($m in $matches_n) {
            $op = $m.Groups[1].Value.Trim()
            if ($op.Length -gt 1 -and $operacoes -notcontains $op) {
                [void]$operacoes.Add($op)
            }
        }

        # Extrair RPMs (S####)
        $rpms = [System.Collections.ArrayList]::new()
        $matches_s = [regex]::Matches($conteudo, 'S(\d{2,5})')
        foreach ($m in $matches_s) {
            $sVal = [int]$m.Groups[1].Value
            if ($sVal -ge 50 -and $sVal -le 15000 -and $rpms -notcontains $sVal) {
                [void]$rpms.Add($sVal)
            }
        }

        # Extrair avancos (F0.## ou F###)
        $avancos = [System.Collections.ArrayList]::new()
        $matches_f = [regex]::Matches($conteudo, 'F(\d*\.?\d+)')
        foreach ($m in $matches_f) {
            $fVal = $m.Groups[1].Value
            if ($avancos -notcontains $fVal -and $avancos.Count -lt 15) {
                [void]$avancos.Add($fVal)
            }
        }

        # Extrair ciclos (G71, G70, G83, G84, G76, G75, G74, G87, G1002, G1210, etc)
        $ciclos = [System.Collections.ArrayList]::new()
        $ciclosInteresse = @('G70','G71','G72','G73','G74','G75','G76','G77','G78','G80','G81','G82','G83','G84','G85','G86','G87','G88','G89','G96','G97','G12\.1','G13\.1','G1002','G1064','G1210','G1221')
        foreach ($c in $ciclosInteresse) {
            if ($conteudo -match $c) {
                $cClean = $c -replace '\\',''
                if ($ciclos -notcontains $cClean) { [void]$ciclos.Add($cClean) }
            }
        }

        # Work offsets
        $offsets = [System.Collections.ArrayList]::new()
        foreach ($wo in @('G54','G55','G56','G57','G58','G59')) {
            if ($conteudo -match $wo -and $offsets -notcontains $wo) {
                [void]$offsets.Add($wo)
            }
        }

        # Live tooling
        $liveTooling = ($conteudo -match 'M33' -or $conteudo -match 'M35')

        # C-axis
        $cAxis = ($conteudo -match '\bC\d' -and $conteudo -match 'G12\.1|M33|M35')

        # 4o eixo
        $eixo4 = ($conteudo -match '\bA\d' -and $maq -match 'DISCO')

        # Material (tentar extrair do nome)
        $material = ""
        $nomeUpper = ($nomePeca + " " + $arq.BaseName).ToUpper()
        if ($nomeUpper -match 'INOX|304|316|AISI') { $material = "INOX" }
        elseif ($nomeUpper -match 'LATA[OÃ]|LATAO') { $material = "LATAO" }
        elseif ($nomeUpper -match 'ALUM[IÍ]|6351|6061|7075|DURAL') { $material = "ALUMINIO" }
        elseif ($nomeUpper -match 'BRONZE') { $material = "BRONZE" }
        elseif ($nomeUpper -match 'NYLON|POLIAC|TEFLON|PVC|PEAD') { $material = "PLASTICO" }
        elseif ($nomeUpper -match 'VC\s?\d|4340|1020|1045|8620|SAE') { $material = "ACO" }

        # Data do arquivo
        $dataArq = $arq.LastWriteTime.ToString("yyyy-MM-dd")
        $anoArq = $arq.LastWriteTime.Year

        # Numero de linhas (proxy de complexidade)
        $numLinhas = $linhas.Count
        $complexidade = "SIMPLES"
        if ($numLinhas -gt 200) { $complexidade = "MEDIA" }
        if ($numLinhas -gt 500) { $complexidade = "COMPLEXA" }

        # Montar registro
        $reg = [ordered]@{
            arquivo = $arq.Name
            caminho = $arq.FullName.Replace("D:\PROG_CNC\","")
            maquina = $maq
            programa = $numPrograma
            peca = $nomePeca
            material = $material
            ferramentas = $ferramentas.ToArray()
            numFerramentas = $ferramentas.Count
            operacoes = $operacoes.ToArray()
            ciclos = $ciclos.ToArray()
            rpms = ($rpms | Sort-Object)
            avancos = $avancos.ToArray()
            workOffsets = $offsets.ToArray()
            liveTooling = $liveTooling
            eixoC = $cAxis
            eixo4 = $eixo4
            numLinhas = $numLinhas
            complexidade = $complexidade
            dataArquivo = $dataArq
            ano = $anoArq
        }

        [void]$programas.Add($reg)
        $totalExtraidos++
    }

    Write-Host "$maq : $($arquivos.Count) arquivos -> $totalExtraidos extraidos ate agora"
}

# Pastas extras (material/cliente)
$pastasExtras = @("aluminio","latao","aco","antigos","aurufarma","abud","samsung","sugador","plataforma","pp")
foreach ($pe in $pastasExtras) {
    $pasta = Join-Path $raiz $pe
    if (-not (Test-Path $pasta)) { continue }

    $arquivos = Get-ChildItem -Path $pasta -File -Recurse | Where-Object {
        $_.Extension -match '\.(txt|TXT|nc|NC|cnc|CNC|tap|TAP)$' -or $_.Extension -eq ''
    }

    foreach ($arq in $arquivos) {
        $totalArquivos++
        if ($arq.Extension -eq ".ALL") { continue }

        try {
            $conteudo = [System.IO.File]::ReadAllText($arq.FullName, [System.Text.Encoding]::GetEncoding(1252))
        } catch { continue }

        if ($conteudo.Length -lt 20) { continue }
        $linhas = $conteudo -split "`r?`n"

        $numPrograma = ""
        $nomePeca = $arq.BaseName
        foreach ($linha in $linhas[0..10]) {
            if ($linha -match '[O:]\s*(\d{3,5})\s*\(([^)]+)\)') {
                $numPrograma = "O" + $Matches[1]
                $nomePeca = $Matches[2].Trim()
                break
            }
        }

        $reg = [ordered]@{
            arquivo = $arq.Name
            caminho = $arq.FullName.Replace("D:\PROG_CNC\","")
            maquina = "OUTRO_" + $pe.ToUpper()
            programa = $numPrograma
            peca = $nomePeca
            material = if ($pe -eq "aluminio") {"ALUMINIO"} elseif ($pe -match "lat") {"LATAO"} elseif ($pe -match "aco") {"ACO"} else {""}
            ferramentas = @()
            numFerramentas = 0
            operacoes = @()
            ciclos = @()
            rpms = @()
            avancos = @()
            workOffsets = @()
            liveTooling = $false
            eixoC = $false
            eixo4 = $false
            numLinhas = $linhas.Count
            complexidade = if ($linhas.Count -gt 500) {"COMPLEXA"} elseif ($linhas.Count -gt 200) {"MEDIA"} else {"SIMPLES"}
            dataArquivo = $arq.LastWriteTime.ToString("yyyy-MM-dd")
            ano = $arq.LastWriteTime.Year
        }

        [void]$programas.Add($reg)
        $totalExtraidos++
    }
    Write-Host "$pe : extras -> $totalExtraidos total"
}

# Gerar estatisticas
$stats = [ordered]@{
    dataGeracao = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    totalProgramas = $programas.Count
    totalArquivosVaridos = $totalArquivos
    porMaquina = [ordered]@{}
    porComplexidade = [ordered]@{}
    porMaterial = [ordered]@{}
    porAno = [ordered]@{}
    ciclosMaisUsados = [ordered]@{}
}

foreach ($p in $programas) {
    # Por maquina
    if (-not $stats.porMaquina[$p.maquina]) { $stats.porMaquina[$p.maquina] = 0 }
    $stats.porMaquina[$p.maquina]++

    # Por complexidade
    if (-not $stats.porComplexidade[$p.complexidade]) { $stats.porComplexidade[$p.complexidade] = 0 }
    $stats.porComplexidade[$p.complexidade]++

    # Por material
    $mat = if ($p.material) { $p.material } else { "NAO_IDENTIFICADO" }
    if (-not $stats.porMaterial[$mat]) { $stats.porMaterial[$mat] = 0 }
    $stats.porMaterial[$mat]++

    # Por ano
    $a = [string]$p.ano
    if (-not $stats.porAno[$a]) { $stats.porAno[$a] = 0 }
    $stats.porAno[$a]++

    # Ciclos
    foreach ($c in $p.ciclos) {
        if (-not $stats.ciclosMaisUsados[$c]) { $stats.ciclosMaisUsados[$c] = 0 }
        $stats.ciclosMaisUsados[$c]++
    }
}

# Montar JSON final
$db = [ordered]@{
    _info = "Banco de dados CNC LASEC - Gerado automaticamente de D:\PROG_CNC"
    _versao = "2.0"
    estatisticas = $stats
    programas = $programas.ToArray()
}

$json = $db | ConvertTo-Json -Depth 5 -Compress:$false
[System.IO.File]::WriteAllText($saida, $json, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "=========================================="
Write-Host "BANCO DE DADOS CNC GERADO COM SUCESSO"
Write-Host "=========================================="
Write-Host "Total programas catalogados: $($programas.Count)"
Write-Host "Arquivo: $saida"
Write-Host "Tamanho: $([math]::Round((Get-Item $saida).Length / 1MB, 2)) MB"
Write-Host "=========================================="
