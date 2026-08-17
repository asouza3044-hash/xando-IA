# Gera PROCESSO_FABRICACAO_013 a partir do 001
$src = "D:\IA MALELO\orcamentos\2026\MICROGEAR\001_MICROGEAR_1.04.13.260\PROCESSO_FABRICACAO_1.04.13.260.html"
$dst = "D:\IA MALELO\orcamentos\2026\MICROGEAR\013_MICROGEAR_1.04.13.260\PROCESSO_FABRICACAO_1.04.13.260.html"

$c = [System.IO.File]::ReadAllText($src, [System.Text.Encoding]::UTF8)
$c = $c.Replace("001/2026", "013/2026")
$c = $c.Replace("Orçamento 001", "Orçamento 013")
$c = $c.Replace("26/02/2026", "26/02/2026")
[System.IO.File]::WriteAllText($dst, $c, [System.Text.Encoding]::UTF8)
Write-Host "PROCESSO_FABRICACAO: OK"
