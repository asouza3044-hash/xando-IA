# Sistema Integrado de Gerenciamento de Programas CNC LASEC
# Versão: 1.0
# Data: 2025-11-29

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("atualizar", "consultar", "estatisticas", "help")]
    [string]$Comando = "help"
)

$BasePath = "D:\PROG_CNC"
$DatabaseFile = "D:\lasec\PROG_CNC_DATABASE.json"
$ExtractorScript = "D:\lasec\extrair_dados_gcode.ps1"
$ConsultaScript = "D:\lasec\consultar_programas_cnc.ps1"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   SISTEMA DE GERENCIAMENTO DE PROGRAMAS CNC - LASEC           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

switch ($Comando) {
    "atualizar" {
        Write-Host "═══ ATUALIZANDO BANCO DE DADOS ═══" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Esta operação irá processar TODOS os programas em $BasePath" -ForegroundColor White
        Write-Host "Tempo estimado: 5-10 minutos para ~12.000 arquivos" -ForegroundColor Gray
        Write-Host ""

        $confirm = Read-Host "Confirma atualização completa? (S/N)"
        if ($confirm -ne "S" -and $confirm -ne "s") {
            Write-Host "Operação cancelada." -ForegroundColor Red
            exit
        }

        Write-Host ""
        Write-Host "Iniciando extração de dados..." -ForegroundColor Green
        & powershell -ExecutionPolicy Bypass -File $ExtractorScript

        Write-Host ""
        Write-Host "Banco de dados atualizado com sucesso!" -ForegroundColor Green
        Write-Host "Arquivo: $DatabaseFile" -ForegroundColor Gray
    }

    "consultar" {
        Write-Host "═══ CONSULTA INTERATIVA ═══" -ForegroundColor Yellow
        Write-Host ""

        # Menu interativo
        Write-Host "Escolha o tipo de consulta:" -ForegroundColor White
        Write-Host "1. Por máquina (LYNX220, G240, DISCO760, etc)"
        Write-Host "2. Por material (Alumínio, Aço, Latão, CAST)"
        Write-Host "3. Por complexidade (SIMPLES, MEDIA, COMPLEXA)"
        Write-Host "4. Por cliente (samsung, abud, aurufarma, etc)"
        Write-Host "5. Por operação (ROSCA, CANAL, FURACAO, etc)"
        Write-Host "6. Busca livre (nome da peça)"
        Write-Host "7. Consulta avançada (múltiplos filtros)"
        Write-Host "8. Exportar relatório HTML"
        Write-Host ""

        $opcao = Read-Host "Opção (1-8)"

        $params = @{
            FilePath = "powershell"
            ArgumentList = @(
                "-ExecutionPolicy", "Bypass",
                "-File", $ConsultaScript
            )
        }

        switch ($opcao) {
            "1" {
                Write-Host "`nMáquinas disponíveis: LYNX220, G240, GL280, DISCO560, DISCO760, CENTU30D, CENTU30S, VTC30A" -ForegroundColor Gray
                $maquina = Read-Host "Máquina"
                $params.ArgumentList += "-Maquina", $maquina
            }
            "2" {
                Write-Host "`nMateriais: Alumínio, Aço, Latão, CAST, Bronze, Inox" -ForegroundColor Gray
                $material = Read-Host "Material"
                $params.ArgumentList += "-Material", $material
            }
            "3" {
                Write-Host "`nComplexidade: SIMPLES, MEDIA, COMPLEXA" -ForegroundColor Gray
                $complex = Read-Host "Complexidade"
                $params.ArgumentList += "-Complexidade", $complex
            }
            "4" {
                Write-Host "`nClientes: samsung, abud, aurufarma, pp, sugador, mercedes" -ForegroundColor Gray
                $cliente = Read-Host "Cliente"
                $params.ArgumentList += "-Cliente", $cliente
            }
            "5" {
                Write-Host "`nOperações: FACE, DESB_EXT, DESB_INT, ACAB_EXT, ACAB_INT, ROSCA, CANAL, FURACAO" -ForegroundColor Gray
                $operacao = Read-Host "Operação"
                $params.ArgumentList += "-Operacao", $operacao
            }
            "6" {
                $busca = Read-Host "Buscar por nome da peça"
                $params.ArgumentList += "-Busca", $busca
            }
            "7" {
                Write-Host "`nConsulta Avançada - Preencha os campos desejados (Enter para pular)" -ForegroundColor Yellow
                $maquina = Read-Host "Máquina"
                $material = Read-Host "Material"
                $complex = Read-Host "Complexidade (SIMPLES/MEDIA/COMPLEXA)"
                $operacao = Read-Host "Operação"

                if ($maquina) { $params.ArgumentList += "-Maquina", $maquina }
                if ($material) { $params.ArgumentList += "-Material", $material }
                if ($complex) { $params.ArgumentList += "-Complexidade", $complex }
                if ($operacao) { $params.ArgumentList += "-Operacao", $operacao }
            }
            "8" {
                Write-Host "`nExportação de Relatório HTML" -ForegroundColor Yellow
                $maquina = Read-Host "Filtrar por máquina (Enter para todos)"
                if ($maquina) { $params.ArgumentList += "-Maquina", $maquina }
                $params.ArgumentList += "-ExportHTML"
            }
            default {
                Write-Host "Opção inválida!" -ForegroundColor Red
                exit
            }
        }

        Start-Process @params -Wait -NoNewWindow
    }

    "estatisticas" {
        Write-Host "═══ ESTATÍSTICAS DO BANCO DE DADOS ═══" -ForegroundColor Yellow
        Write-Host ""

        if (-not (Test-Path $DatabaseFile)) {
            Write-Host "ERRO: Banco de dados não encontrado!" -ForegroundColor Red
            Write-Host "Execute: .\SISTEMA_PROGRAMAS_CNC.ps1 atualizar" -ForegroundColor Yellow
            exit
        }

        $database = Get-Content $DatabaseFile -Raw | ConvertFrom-Json

        Write-Host "Banco de dados gerado em: $($database.generated)" -ForegroundColor Gray
        Write-Host "Total de programas catalogados: $($database.total_programs)" -ForegroundColor Green
        Write-Host ""

        # Estatísticas por máquina
        $byMachine = $database.programs | Group-Object { $_.maquina.tipo } | Sort-Object Count -Descending
        Write-Host "═══ POR MÁQUINA ═══" -ForegroundColor Cyan
        foreach ($m in $byMachine | Select-Object -First 15) {
            $percent = [math]::Round(($m.Count / $database.total_programs) * 100, 1)
            Write-Host ("{0,-15}: {1,5} programas ({2,5}%)" -f $m.Name, $m.Count, $percent)
        }

        Write-Host ""

        # Por complexidade
        $byComplexity = $database.programs | Group-Object { $_.complexidade.nivel }
        Write-Host "═══ POR COMPLEXIDADE ═══" -ForegroundColor Cyan
        foreach ($c in $byComplexity) {
            $percent = [math]::Round(($c.Count / $database.total_programs) * 100, 1)
            $color = "White"
            if ($c.Name -eq "SIMPLES") { $color = "Green" }
            elseif ($c.Name -eq "MEDIA") { $color = "Yellow" }
            elseif ($c.Name -eq "COMPLEXA") { $color = "Red" }
            Write-Host ("{0,-10}: {1,5} programas ({2,5}%)" -f $c.Name, $c.Count, $percent) -ForegroundColor $color
        }

        Write-Host ""

        # Por categoria de máquina
        $byCategory = $database.programs | Group-Object { $_.maquina.categoria }
        Write-Host "═══ POR TIPO DE MÁQUINA ═══" -ForegroundColor Cyan
        foreach ($cat in $byCategory) {
            $percent = [math]::Round(($cat.Count / $database.total_programs) * 100, 1)
            Write-Host ("{0,-20}: {1,5} programas ({2,5}%)" -f $cat.Name, $cat.Count, $percent)
        }

        Write-Host ""

        # Por cliente
        $byClient = $database.programs | Where-Object { $_.metadata.cliente -ne "" } | Group-Object { $_.metadata.cliente }
        if ($byClient) {
            Write-Host "═══ POR CLIENTE ═══" -ForegroundColor Cyan
            foreach ($cl in $byClient | Sort-Object Count -Descending) {
                Write-Host ("{0,-15}: {1,5} programas" -f $cl.Name, $cl.Count)
            }
        }

        Write-Host ""

        # Operações mais comuns
        $allOps = $database.programs | ForEach-Object { $_.operacoes } | Group-Object tipo | Sort-Object Count -Descending
        Write-Host "═══ OPERAÇÕES MAIS COMUNS ═══" -ForegroundColor Cyan
        foreach ($op in $allOps | Select-Object -First 10) {
            Write-Host ("{0,-15}: {1,5} ocorrências" -f $op.Name, $op.Count)
        }

        Write-Host ""
    }

    "help" {
        Write-Host "═══ AJUDA ═══" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Comandos disponíveis:" -ForegroundColor White
        Write-Host ""
        Write-Host "  atualizar      - Atualiza o banco de dados com todos os programas CNC" -ForegroundColor Cyan
        Write-Host "                   Processa ~12.000 arquivos em D:\PROG_CNC" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  consultar      - Interface interativa para consultar programas" -ForegroundColor Cyan
        Write-Host "                   Permite filtrar por máquina, material, complexidade, etc" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  estatisticas   - Exibe estatísticas do banco de dados" -ForegroundColor Cyan
        Write-Host "                   Mostra distribuição por máquina, complexidade, cliente, etc" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  help           - Exibe esta ajuda" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Exemplos de uso:" -ForegroundColor White
        Write-Host '  .\SISTEMA_PROGRAMAS_CNC.ps1 atualizar' -ForegroundColor Green
        Write-Host '  .\SISTEMA_PROGRAMAS_CNC.ps1 consultar' -ForegroundColor Green
        Write-Host '  .\SISTEMA_PROGRAMAS_CNC.ps1 estatisticas' -ForegroundColor Green
        Write-Host ""
        Write-Host "Estrutura do sistema:" -ForegroundColor White
        Write-Host "  - Programas CNC:        $BasePath" -ForegroundColor Gray
        Write-Host "  - Banco de dados:       $DatabaseFile" -ForegroundColor Gray
        Write-Host "  - Script de extração:   $ExtractorScript" -ForegroundColor Gray
        Write-Host "  - Script de consulta:   $ConsultaScript" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Para suporte a orçamentos:" -ForegroundColor Yellow
        Write-Host "  1. Execute 'atualizar' para criar o banco de dados inicial" -ForegroundColor White
        Write-Host "  2. Use 'consultar' para buscar programas similares" -ForegroundColor White
        Write-Host "  3. Analise complexidade e tempo para estimar orçamentos" -ForegroundColor White
        Write-Host ""
    }
}

Write-Host ""
