# Script para criar backup completo do sistema LASEC
# Execute com: powershell.exe -ExecutionPolicy Bypass -File criar_backup_completo.ps1

$dataAtual = Get-Date -Format "yyyyMMdd_HHmmss"
$pastaBackup = "C:\lasec_backup_$dataAtual"
$arquivoZip = "C:\Users\lasec\Desktop\LASEC_BACKUP_COMPLETO_$dataAtual.zip"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "BACKUP COMPLETO DO SISTEMA LASEC" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Criar pasta temporaria de backup
Write-Host "1. Criando pasta temporaria..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $pastaBackup -Force | Out-Null

# Copiar todos os arquivos
Write-Host "2. Copiando arquivos do sistema..." -ForegroundColor Yellow
Copy-Item -Path "C:\lasec\*" -Destination $pastaBackup -Recurse -Force

# Adicionar informacoes do backup
$infoBackup = @"
═══════════════════════════════════════════════════════════════════════════════
BACKUP COMPLETO DO SISTEMA LASEC
═══════════════════════════════════════════════════════════════════════════════

Data do backup: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
Computador: $env:COMPUTERNAME
Usuario: $env:USERNAME

═══════════════════════════════════════════════════════════════════════════════
CONTEÚDO DESTE BACKUP
═══════════════════════════════════════════════════════════════════════════════

✓ base_dados\             - Banco de dados completo (clientes, fornecedores, parametros)
✓ templates\              - Templates reutilizaveis para orcamentos
✓ orcamentos\             - Todos os orcamentos gerados
✓ atalhos_backup\         - Backup dos atalhos da area de trabalho
✓ HISTORICO_CONVERSAS.txt - Historico completo da implementacao
✓ GUIA_RAPIDO_ORCAMENTOS.txt - Manual de uso
✓ SISTEMA_IMPLEMENTADO.txt - Documentacao tecnica
✓ dados_lasec.json        - Dados gerais da empresa

═══════════════════════════════════════════════════════════════════════════════
COMO RESTAURAR EM OUTRO COMPUTADOR
═══════════════════════════════════════════════════════════════════════════════

1. EXTRAIR O BACKUP:
   - Descompacte este arquivo ZIP
   - Extraia para C:\lasec\

2. RECRIAR ATALHOS:
   - Abra PowerShell como Administrador
   - Execute os comandos do arquivo: atalhos_backup\README_ATALHOS.txt

3. VERIFICAR CAMINHOS:
   - Abra: C:\lasec\SISTEMA_IMPLEMENTADO.txt
   - Verifique se todos os caminhos estao corretos

4. TESTAR O SISTEMA:
   - Abra: C:\lasec\GUIA_RAPIDO_ORCAMENTOS.txt
   - Siga as instrucoes para criar um orcamento de teste

═══════════════════════════════════════════════════════════════════════════════
ACESSO VIA CLAUDE CODE
═══════════════════════════════════════════════════════════════════════════════

Para continuar trabalhando com Claude Code em outro terminal:

1. Instale o Claude Code (se ainda nao tiver)
2. Restaure esta pasta para C:\lasec\
3. Abra o terminal na pasta: cd C:\lasec
4. Inicie o Claude Code
5. Diga: "Leia o arquivo HISTORICO_CONVERSAS.txt e continue de onde paramos"

Todos os dados, templates e documentacao estarao disponiveis!

═══════════════════════════════════════════════════════════════════════════════
ARQUIVOS IMPORTANTES
═══════════════════════════════════════════════════════════════════════════════

LEIA PRIMEIRO:
✓ HISTORICO_CONVERSAS.txt  - Tudo que foi feito
✓ GUIA_RAPIDO_ORCAMENTOS.txt - Como usar o sistema

PARA TRABALHAR:
✓ base_dados\dados_completos_orcamentos.json - Dados centralizados
✓ templates\ - Use estes templates para novos orcamentos

REFERENCIA:
✓ SISTEMA_IMPLEMENTADO.txt - Documentacao completa
✓ orcamentos\2025\001_MICROGEAR_1.34.12.710\ - Exemplo de orcamento

═══════════════════════════════════════════════════════════════════════════════

Backup criado em: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
Tamanho total: Verificar apos extracao
Sistema: Windows $([Environment]::OSVersion.Version)

═══════════════════════════════════════════════════════════════════════════════
"@

$infoBackup | Out-File -FilePath "$pastaBackup\LEIA_ME_PRIMEIRO.txt" -Encoding UTF8

# Criar arquivo ZIP
Write-Host "3. Compactando backup..." -ForegroundColor Yellow
Compress-Archive -Path $pastaBackup -DestinationPath $arquivoZip -Force

# Limpar pasta temporaria
Write-Host "4. Limpando arquivos temporarios..." -ForegroundColor Yellow
Remove-Item -Path $pastaBackup -Recurse -Force

# Mostrar resultado
Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "BACKUP CONCLUIDO COM SUCESSO!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Arquivo criado:" -ForegroundColor Cyan
Write-Host $arquivoZip -ForegroundColor White
Write-Host ""
Write-Host "Tamanho:" -ForegroundColor Cyan
$tamanho = (Get-Item $arquivoZip).Length / 1MB
Write-Host ("{0:N2} MB" -f $tamanho) -ForegroundColor White
Write-Host ""
Write-Host "PROXIMO PASSO:" -ForegroundColor Yellow
Write-Host "1. Copie este arquivo ZIP para pen drive ou nuvem" -ForegroundColor White
Write-Host "2. No novo computador, extraia para C:\lasec\" -ForegroundColor White
Write-Host "3. Leia o arquivo LEIA_ME_PRIMEIRO.txt" -ForegroundColor White
Write-Host ""

# Abrir pasta onde esta o backup
Start-Process "explorer.exe" -ArgumentList "/select,$arquivoZip"
