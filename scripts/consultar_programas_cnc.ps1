# Sistema de Consulta de Programas CNC LASEC
# Versão: 1.0
# Data: 2025-11-29

param(
    [string]$DatabaseFile = "D:\lasec\PROG_CNC_DATABASE.json",
    [string]$Maquina = "",
    [string]$Material = "",
    [string]$Cliente = "",
    [string]$Complexidade = "",  # SIMPLES, MEDIA, COMPLEXA
    [string]$Operacao = "",  # DESB_EXT, ACAB_EXT, ROSCA, etc
    [string]$Busca = "",  # Busca livre no nome da peça
    [int]$MinFerramentas = 0,
    [int]$MaxFerramentas = 99,
    [int]$TopResults = 20,
    [switch]$ExportHTML,
    [switch]$Detailed
)

Write-Host "=== CONSULTA DE PROGRAMAS CNC LASEC ===" -ForegroundColor Cyan
Write-Host ""

# Carregar banco de dados
if (-not (Test-Path $DatabaseFile)) {
    Write-Host "ERRO: Banco de dados não encontrado em $DatabaseFile" -ForegroundColor Red
    Write-Host "Execute primeiro o script extrair_dados_gcode.ps1" -ForegroundColor Yellow
    exit
}

Write-Host "Carregando banco de dados..." -ForegroundColor Yellow
$database = Get-Content $DatabaseFile -Raw | ConvertFrom-Json

Write-Host "Total de programas no banco: $($database.total_programs)" -ForegroundColor Green
Write-Host ""

# Filtrar programas
$results = $database.programs

# Filtro por máquina
if ($Maquina) {
    Write-Host "Filtrando por máquina: $Maquina" -ForegroundColor Yellow
    $results = $results | Where-Object { $_.maquina.tipo -like "*$Maquina*" }
}

# Filtro por material
if ($Material) {
    Write-Host "Filtrando por material: $Material" -ForegroundColor Yellow
    $results = $results | Where-Object { $_.material.tipo -like "*$Material*" }
}

# Filtro por cliente
if ($Cliente) {
    Write-Host "Filtrando por cliente: $Cliente" -ForegroundColor Yellow
    $results = $results | Where-Object { $_.metadata.cliente -like "*$Cliente*" }
}

# Filtro por complexidade
if ($Complexidade) {
    Write-Host "Filtrando por complexidade: $Complexidade" -ForegroundColor Yellow
    $results = $results | Where-Object { $_.complexidade.nivel -eq $Complexidade.ToUpper() }
}

# Filtro por operação
if ($Operacao) {
    Write-Host "Filtrando por operação: $Operacao" -ForegroundColor Yellow
    $results = $results | Where-Object {
        $ops = $_.operacoes | Where-Object { $_.tipo -eq $Operacao.ToUpper() }
        $ops.Count -gt 0
    }
}

# Filtro por busca livre
if ($Busca) {
    Write-Host "Buscando por: $Busca" -ForegroundColor Yellow
    $results = $results | Where-Object {
        $_.nome_peca -like "*$Busca*" -or
        $_.numero_programa -like "*$Busca*" -or
        $_.id -like "*$Busca*"
    }
}

# Filtro por número de ferramentas
if ($MinFerramentas -gt 0 -or $MaxFerramentas -lt 99) {
    Write-Host "Filtrando por ferramentas: $MinFerramentas - $MaxFerramentas" -ForegroundColor Yellow
    $results = $results | Where-Object {
        $numTools = $_.ferramentas.Count
        $numTools -ge $MinFerramentas -and $numTools -le $MaxFerramentas
    }
}

# Limitar resultados
$results = $results | Select-Object -First $TopResults

Write-Host ""
Write-Host "=== RESULTADOS ($($results.Count) programas) ===" -ForegroundColor Cyan
Write-Host ""

if ($results.Count -eq 0) {
    Write-Host "Nenhum programa encontrado com os critérios especificados." -ForegroundColor Red
    exit
}

# Exibir resultados
foreach ($prog in $results) {
    Write-Host ("=" * 80) -ForegroundColor Gray
    Write-Host "ID: $($prog.id)" -ForegroundColor White
    Write-Host "Programa: $($prog.numero_programa) | Peça: $($prog.nome_peca)" -ForegroundColor Yellow

    Write-Host "Máquina: $($prog.maquina.tipo) ($($prog.maquina.categoria))" -ForegroundColor Cyan
    Write-Host "Material: $($prog.material.tipo)" -ForegroundColor Cyan
    Write-Host "Complexidade: $($prog.complexidade.nivel) (Score: $($prog.complexidade.score)/10)" -ForegroundColor $(
        if ($prog.complexidade.nivel -eq "SIMPLES") { "Green" }
        elseif ($prog.complexidade.nivel -eq "MEDIA") { "Yellow" }
        else { "Red" }
    )

    Write-Host "Arquivo: $($prog.arquivo.caminho)" -ForegroundColor Gray
    Write-Host "Linhas: $($prog.arquivo.linhas) | Tamanho: $([math]::Round($prog.arquivo.tamanho/1024, 2)) KB | Modificado: $($prog.arquivo.data_modificacao)" -ForegroundColor Gray

    if ($prog.metadata.cliente) {
        Write-Host "Cliente: $($prog.metadata.cliente)" -ForegroundColor Magenta
    }

    # Operações
    if ($prog.operacoes.Count -gt 0) {
        Write-Host "`nOperações ($($prog.operacoes.Count)):" -ForegroundColor White
        foreach ($op in $prog.operacoes) {
            Write-Host ("  N{0,-3} | {1,-12} | {2}" -f $op.sequencia, $op.tipo, $op.descricao) -ForegroundColor Gray
        }
    }

    # Ferramentas
    if ($prog.ferramentas.Count -gt 0) {
        Write-Host "`nFerramentas ($($prog.ferramentas.Count)):" -ForegroundColor White
        foreach ($tool in $prog.ferramentas) {
            Write-Host ("  {0,-6} | {1,-12} | {2}" -f $tool.codigo, $tool.tipo, $tool.descricao) -ForegroundColor Gray
        }
    }

    # Parâmetros de corte
    if ($prog.parametros_corte.velocidades.max_rpm -gt 0) {
        Write-Host "`nParâmetros de Corte:" -ForegroundColor White
        Write-Host ("  Velocidade: {0} - {1} RPM | CSS: {2}" -f
            $prog.parametros_corte.velocidades.min_rpm,
            $prog.parametros_corte.velocidades.max_rpm,
            $(if ($prog.parametros_corte.velocidades.css_usado) { "SIM" } else { "NÃO" })
        ) -ForegroundColor Gray

        if ($prog.parametros_corte.avancos.max -gt 0) {
            Write-Host ("  Avanço: {0} - {1}" -f
                $prog.parametros_corte.avancos.min,
                $prog.parametros_corte.avancos.max
            ) -ForegroundColor Gray
        }
    }

    # Ciclos
    if ($prog.ciclos_utilizados.Count -gt 0) {
        Write-Host "`nCiclos Utilizados: $($prog.ciclos_utilizados -join ', ')" -ForegroundColor White
    }

    # Setup
    if ($prog.setup.num_setups -gt 0) {
        Write-Host "Setups: $($prog.setup.num_setups) ($($prog.setup.offsets -join ', '))" -ForegroundColor White
    }

    Write-Host ""
}

# Estatísticas dos resultados
Write-Host ("=" * 80) -ForegroundColor Gray
Write-Host "`n=== ESTATÍSTICAS DOS RESULTADOS ===" -ForegroundColor Cyan

$byComplexity = $results | Group-Object { $_.complexidade.nivel }
Write-Host "`nPor Complexidade:" -ForegroundColor Yellow
foreach ($c in $byComplexity) {
    Write-Host ("  {0,-10}: {1,3} programas" -f $c.Name, $c.Count)
}

$byMachine = $results | Group-Object { $_.maquina.tipo }
Write-Host "`nPor Máquina:" -ForegroundColor Yellow
foreach ($m in $byMachine) {
    Write-Host ("  {0,-15}: {1,3} programas" -f $m.Name, $m.Count)
}

# Exportar HTML
if ($ExportHTML) {
    $htmlFile = "D:\lasec\CONSULTA_PROGRAMAS_CNC_$(Get-Date -Format 'yyyyMMdd_HHmmss').html"

    $html = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Programas CNC LASEC</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; background: #f5f5f5; }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        .programa { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .programa-header { border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; margin-bottom: 15px; }
        .programa-id { font-size: 1.2em; font-weight: bold; color: #2c3e50; }
        .programa-nome { color: #3498db; font-size: 1.1em; margin: 5px 0; }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 15px 0; }
        .info-item { background: #ecf0f1; padding: 10px; border-radius: 5px; }
        .info-label { font-weight: bold; color: #7f8c8d; font-size: 0.9em; }
        .info-value { color: #2c3e50; margin-top: 5px; }
        .operacoes, .ferramentas { margin: 15px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th { background: #3498db; color: white; padding: 10px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #ecf0f1; }
        tr:hover { background: #f8f9fa; }
        .complexidade-SIMPLES { color: #27ae60; font-weight: bold; }
        .complexidade-MEDIA { color: #f39c12; font-weight: bold; }
        .complexidade-COMPLEXA { color: #e74c3c; font-weight: bold; }
        .stats { background: #34495e; color: white; padding: 20px; border-radius: 8px; margin-top: 30px; }
        .stats h2 { color: #ecf0f1; margin-top: 0; }
    </style>
</head>
<body>
    <h1>Consulta de Programas CNC LASEC</h1>
    <p><strong>Data da consulta:</strong> $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')</p>
    <p><strong>Total de resultados:</strong> $($results.Count) programas</p>
"@

    foreach ($prog in $results) {
        $html += @"
    <div class="programa">
        <div class="programa-header">
            <div class="programa-id">$($prog.id)</div>
            <div class="programa-nome">Programa: $($prog.numero_programa) | $($prog.nome_peca)</div>
        </div>

        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Máquina</div>
                <div class="info-value">$($prog.maquina.tipo)<br><small>$($prog.maquina.categoria)</small></div>
            </div>
            <div class="info-item">
                <div class="info-label">Material</div>
                <div class="info-value">$($prog.material.tipo)</div>
            </div>
            <div class="info-item">
                <div class="info-label">Complexidade</div>
                <div class="info-value complexidade-$($prog.complexidade.nivel)">$($prog.complexidade.nivel)<br><small>Score: $($prog.complexidade.score)/10</small></div>
            </div>
            <div class="info-item">
                <div class="info-label">Linhas / Tamanho</div>
                <div class="info-value">$($prog.arquivo.linhas) linhas<br>$([math]::Round($prog.arquivo.tamanho/1024, 2)) KB</div>
            </div>
        </div>

        <div class="operacoes">
            <h3>Operações ($($prog.operacoes.Count))</h3>
            <table>
                <tr><th>Seq</th><th>Tipo</th><th>Descrição</th></tr>
"@
        foreach ($op in $prog.operacoes) {
            $html += "                <tr><td>N$($op.sequencia)</td><td>$($op.tipo)</td><td>$($op.descricao)</td></tr>`n"
        }

        $html += @"
            </table>
        </div>

        <div class="ferramentas">
            <h3>Ferramentas ($($prog.ferramentas.Count))</h3>
            <table>
                <tr><th>Código</th><th>Tipo</th><th>Descrição</th></tr>
"@
        foreach ($tool in $prog.ferramentas) {
            $html += "                <tr><td>$($tool.codigo)</td><td>$($tool.tipo)</td><td>$($tool.descricao)</td></tr>`n"
        }

        $html += @"
            </table>
        </div>

        <p><small><strong>Arquivo:</strong> $($prog.arquivo.caminho) | <strong>Modificado:</strong> $($prog.arquivo.data_modificacao)</small></p>
    </div>
"@
    }

    $html += @"
    <div class="stats">
        <h2>Estatísticas</h2>
        <h3>Por Complexidade</h3>
"@
    foreach ($c in $byComplexity) {
        $html += "        <p>$($c.Name): $($c.Count) programas</p>`n"
    }

    $html += "        <h3>Por Máquina</h3>`n"
    foreach ($m in $byMachine) {
        $html += "        <p>$($m.Name): $($m.Count) programas</p>`n"
    }

    $html += @"
    </div>
</body>
</html>
"@

    $html | Out-File -FilePath $htmlFile -Encoding UTF8
    Write-Host "`nRelatório HTML exportado para: $htmlFile" -ForegroundColor Green
    Start-Process $htmlFile
}

Write-Host "`nConsulta concluída!" -ForegroundColor Green
