# Buscar Programa Similar - Integração com Sistema de Orçamentos LASEC
# Versão: 1.0
# Data: 2025-11-29
# Uso: Buscar programas CNC similares para apoiar orçamentos

param(
    [string]$Peca = "",              # Nome da peça/descrição
    [string]$Material = "",          # Material da peça
    [string]$Maquina = "",           # Máquina pretendida
    [decimal]$DiametroMax = 0,       # Diâmetro máximo (mm)
    [decimal]$ComprimentoMax = 0,    # Comprimento máximo (mm)
    [string[]]$Operacoes = @(),      # Operações necessárias (ROSCA, CANAL, etc)
    [switch]$ApenasSimples,          # Apenas programas simples
    [switch]$ExibirDetalhes,         # Exibir detalhes completos
    [int]$TopResults = 5             # Número de resultados
)

$DatabaseFile = "D:\lasec\PROG_CNC_DATABASE.json"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   BUSCA DE PROGRAMAS SIMILARES - APOIO A ORÇAMENTOS           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar banco de dados
if (-not (Test-Path $DatabaseFile)) {
    Write-Host "⚠️  ATENÇÃO: Banco de dados não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Execute primeiro:" -ForegroundColor Yellow
    Write-Host "  .\SISTEMA_PROGRAMAS_CNC.ps1 atualizar" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Carregar banco
Write-Host "📂 Carregando banco de dados..." -ForegroundColor Gray
$database = Get-Content $DatabaseFile -Raw | ConvertFrom-Json
Write-Host "   ✅ $($database.total_programs) programas disponíveis" -ForegroundColor Green
Write-Host ""

# Exibir critérios de busca
Write-Host "🔍 Critérios de Busca:" -ForegroundColor Yellow
if ($Peca) { Write-Host "   • Peça: $Peca" -ForegroundColor Gray }
if ($Material) { Write-Host "   • Material: $Material" -ForegroundColor Gray }
if ($Maquina) { Write-Host "   • Máquina: $Maquina" -ForegroundColor Gray }
if ($DiametroMax -gt 0) { Write-Host "   • Diâmetro máx: $DiametroMax mm" -ForegroundColor Gray }
if ($ComprimentoMax -gt 0) { Write-Host "   • Comprimento máx: $ComprimentoMax mm" -ForegroundColor Gray }
if ($Operacoes.Count -gt 0) { Write-Host "   • Operações: $($Operacoes -join ', ')" -ForegroundColor Gray }
if ($ApenasSimples) { Write-Host "   • Apenas programas SIMPLES" -ForegroundColor Gray }
Write-Host ""

# Filtrar programas
$results = $database.programs

# Filtro por peça/nome
if ($Peca) {
    $results = $results | Where-Object {
        $_.nome_peca -like "*$Peca*" -or
        $_.numero_programa -like "*$Peca*" -or
        $_.id -like "*$Peca*"
    }
}

# Filtro por material
if ($Material) {
    $results = $results | Where-Object { $_.material.tipo -like "*$Material*" }
}

# Filtro por máquina
if ($Maquina) {
    $results = $results | Where-Object { $_.maquina.tipo -like "*$Maquina*" }
}

# Filtro por operações
if ($Operacoes.Count -gt 0) {
    $results = $results | Where-Object {
        $prog = $_
        $matchCount = 0
        foreach ($op in $Operacoes) {
            $hasOp = $prog.operacoes | Where-Object { $_.tipo -eq $op.ToUpper() }
            if ($hasOp) { $matchCount++ }
        }
        $matchCount -eq $Operacoes.Count  # Todas as operações devem estar presentes
    }
}

# Filtro por complexidade
if ($ApenasSimples) {
    $results = $results | Where-Object { $_.complexidade.nivel -eq "SIMPLES" }
}

# Ordenar por relevância (complexidade crescente, depois por número de linhas)
$results = $results | Sort-Object @{Expression={$_.complexidade.score}; Ascending=$true}, @{Expression={$_.arquivo.linhas}; Ascending=$true}

# Limitar resultados
$results = $results | Select-Object -First $TopResults

# Exibir resultados
if ($results.Count -eq 0) {
    Write-Host "❌ Nenhum programa encontrado com os critérios especificados." -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Sugestões:" -ForegroundColor Yellow
    Write-Host "   • Tente critérios mais amplos" -ForegroundColor Gray
    Write-Host "   • Remova filtros de operações específicas" -ForegroundColor Gray
    Write-Host "   • Busque apenas por máquina e material" -ForegroundColor Gray
    Write-Host ""
    exit 0
}

Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host "📊 RESULTADOS: $($results.Count) programa(s) similar(es) encontrado(s)" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

$rankNum = 1
foreach ($prog in $results) {
    Write-Host "┌─ PROGRAMA #$rankNum $(if($rankNum -eq 1){'⭐ MAIS SIMILAR'})" -ForegroundColor Cyan
    Write-Host "│" -ForegroundColor Gray
    Write-Host "│  📝 Arquivo: $($prog.id)" -ForegroundColor White
    Write-Host "│  🔢 Programa: $($prog.numero_programa)" -ForegroundColor White
    if ($prog.nome_peca) {
        Write-Host "│  📦 Peça: $($prog.nome_peca)" -ForegroundColor White
    }
    Write-Host "│" -ForegroundColor Gray
    Write-Host "│  🏭 Máquina: $($prog.maquina.tipo) ($($prog.maquina.categoria))" -ForegroundColor Yellow
    Write-Host "│  🔩 Material: $($prog.material.tipo)" -ForegroundColor Yellow
    Write-Host "│" -ForegroundColor Gray

    # Complexidade com cor
    $complexColor = "Green"
    if ($prog.complexidade.nivel -eq "MEDIA") { $complexColor = "Yellow" }
    elseif ($prog.complexidade.nivel -eq "COMPLEXA") { $complexColor = "Red" }

    Write-Host "│  📊 Complexidade: $($prog.complexidade.nivel) (Score: $($prog.complexidade.score)/10)" -ForegroundColor $complexColor
    Write-Host "│     • Operações: $($prog.complexidade.fatores.num_operacoes)" -ForegroundColor Gray
    Write-Host "│     • Ferramentas: $($prog.complexidade.fatores.num_ferramentas)" -ForegroundColor Gray
    Write-Host "│     • Linhas: $($prog.complexidade.fatores.num_linhas)" -ForegroundColor Gray
    Write-Host "│     • Setups: $($prog.setup.num_setups)" -ForegroundColor Gray
    Write-Host "│" -ForegroundColor Gray

    # Estimativa de tempo baseada na complexidade
    $tempoEstimado = 0
    switch ($prog.complexidade.nivel) {
        "SIMPLES" { $tempoEstimado = 3.5 }  # 2-5 min médio = 3.5
        "MEDIA" { $tempoEstimado = 7.5 }    # 5-10 min médio = 7.5
        "COMPLEXA" { $tempoEstimado = 20 }  # 10-30 min médio = 20
    }

    Write-Host "│  ⏱️  Tempo Estimado: ~$tempoEstimado min/peça" -ForegroundColor Magenta
    Write-Host "│     (baseado na complexidade $($prog.complexidade.nivel))" -ForegroundColor Gray
    Write-Host "│" -ForegroundColor Gray

    # Operações
    if ($prog.operacoes.Count -gt 0) {
        Write-Host "│  🔧 Operações ($($prog.operacoes.Count)):" -ForegroundColor Cyan
        foreach ($op in $prog.operacoes | Select-Object -First 8) {
            Write-Host "│     • N$($op.sequencia): $($op.tipo) - $($op.descricao)" -ForegroundColor Gray
        }
        if ($prog.operacoes.Count -gt 8) {
            Write-Host "│     • ... e mais $($prog.operacoes.Count - 8) operações" -ForegroundColor DarkGray
        }
    }
    Write-Host "│" -ForegroundColor Gray

    # Ferramentas
    if ($prog.ferramentas.Count -gt 0) {
        Write-Host "│  🛠️  Ferramentas ($($prog.ferramentas.Count)):" -ForegroundColor Cyan
        foreach ($tool in $prog.ferramentas | Select-Object -First 6) {
            $toolDesc = if ($tool.descricao) { " - $($tool.descricao)" } else { "" }
            Write-Host "│     • $($tool.codigo): $($tool.tipo)$toolDesc" -ForegroundColor Gray
        }
        if ($prog.ferramentas.Count -gt 6) {
            Write-Host "│     • ... e mais $($prog.ferramentas.Count - 6) ferramentas" -ForegroundColor DarkGray
        }
    }
    Write-Host "│" -ForegroundColor Gray

    # Parâmetros de corte
    if ($prog.parametros_corte.velocidades.max_rpm -gt 0) {
        Write-Host "│  ⚙️  Parâmetros de Corte:" -ForegroundColor Cyan
        Write-Host "│     • Velocidade: $($prog.parametros_corte.velocidades.min_rpm) - $($prog.parametros_corte.velocidades.max_rpm) RPM" -ForegroundColor Gray
        if ($prog.parametros_corte.velocidades.css_usado) {
            Write-Host "│     • Usa CSS (G96): SIM" -ForegroundColor Gray
        }
    }
    Write-Host "│" -ForegroundColor Gray

    # Arquivo
    Write-Host "│  📁 Localização: $($prog.arquivo.caminho)" -ForegroundColor DarkGray
    Write-Host "│  📅 Modificado: $($prog.arquivo.data_modificacao)" -ForegroundColor DarkGray
    Write-Host "└──────────────────────────────────────────────────────────────────" -ForegroundColor Gray
    Write-Host ""

    $rankNum++
}

# Resumo para orçamento
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host "💡 RESUMO PARA ORÇAMENTO" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

$maisComum = $results | Group-Object { $_.complexidade.nivel } | Sort-Object Count -Descending | Select-Object -First 1
$percentComum = "$($maisComum.Count)/$($results.Count) programas"
Write-Host "Complexidade mais comum: $($maisComum.Name) ($percentComum)" -ForegroundColor White

$tempoMedio = ($results | ForEach-Object {
    switch ($_.complexidade.nivel) {
        "SIMPLES" { 3.5 }
        "MEDIA" { 7.5 }
        "COMPLEXA" { 20 }
    }
} | Measure-Object -Average).Average

Write-Host "Tempo médio estimado: ~$([math]::Round($tempoMedio, 1)) min/peça" -ForegroundColor White

$ferramentasMedia = ($results | ForEach-Object { $_.ferramentas.Count } | Measure-Object -Average).Average
Write-Host "Média de ferramentas: $([math]::Round($ferramentasMedia, 0)) ferramentas" -ForegroundColor White

$maquinasUsadas = $results | Group-Object { $_.maquina.tipo } | Select-Object -First 3
Write-Host ""
Write-Host "Máquinas utilizadas nestes programas:" -ForegroundColor White
foreach ($maq in $maquinasUsadas) {
    Write-Host "  • $($maq.Name): $($maq.Count) programa(s)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""
Write-Host "✅ Use estas informações para estimar tempo de ciclo e custos!" -ForegroundColor Green
Write-Host ""

# Retornar caminho do programa mais similar (para integração)
return $results[0].arquivo.caminho
