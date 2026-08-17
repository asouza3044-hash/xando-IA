$arquivos = @(
    "C:\Users\lasec\.claude\commands\orcamento-lasec.md",
    "C:\Users\lasec\.claude\agents\orcamento-lasec.md",
    "C:\Users\lasec\.claude\rules\lasec-orcamentos.md",
    "D:\IA MALELO\agente\commands\orcamento-lasec.md",
    "D:\IA MALELO\agente\knowledge\como-chamar-para-orcamento.md",
    "D:\IA MALELO\agente\knowledge\estrutura-pastas-padrao.md",
    "D:\IA MALELO\agente\knowledge\processo-fabricacao-padrao-detalhado.md",
    "D:\IA MALELO\agente\knowledge\template-processo-fabricacao.html"
)

foreach ($arquivo in $arquivos) {
    if (-not (Test-Path $arquivo)) {
        Write-Host "SKIP: $arquivo"
        continue
    }

    $conteudo = [System.IO.File]::ReadAllText($arquivo, [System.Text.Encoding]::UTF8)
    $original = $conteudo

    $conteudo = $conteudo.Replace("orcamentos\2025\", "orcamentos\2026\")
    $conteudo = $conteudo.Replace("orcamentos/2025/", "orcamentos/2026/")
    $conteudo = $conteudo.Replace("/2025", "/2026")
    $conteudo = $conteudo.Replace("de 2025,", "de 2026,")
    $conteudo = $conteudo.Replace("LASEC 2025", "LASEC 2026")
    $conteudo = $conteudo.Replace("Custos 2025", "Custos 2026")

    if ($conteudo -ne $original) {
        [System.IO.File]::WriteAllText($arquivo, $conteudo, [System.Text.Encoding]::UTF8)
        Write-Host "ATUALIZADO: $arquivo"
    } else {
        Write-Host "SEM ALTERACAO: $arquivo"
    }
}

Write-Host "Concluido."
