# ========================================
# SCRIPT DE BACKUP AUTOMÁTICO - LASEC
# Backup para Google Drive / OneDrive / Dropbox
# ========================================

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BACKUP AUTOMÁTICO - Sistema LASEC" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ========================================
# CONFIGURAÇÃO - AJUSTE AQUI!
# ========================================

# Escolha sua nuvem (descomente a linha que você usar):
# $NUVEM = "C:\Users\lasec\Google Drive"
# $NUVEM = "C:\Users\lasec\OneDrive"
$NUVEM = "C:\Users\lasec\Dropbox"

# Criar pasta de backup na nuvem
$BACKUP_DIR = "$NUVEM\BACKUP_LASEC"

if (-not (Test-Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR | Out-Null
    Write-Host "✅ Pasta de backup criada: $BACKUP_DIR" -ForegroundColor Green
}

# Data e hora do backup
$DATA = Get-Date -Format "yyyyMMdd_HHmmss"
$BACKUP_PASTA = "$BACKUP_DIR\backup_$DATA"

Write-Host ""
Write-Host "📁 Destino do Backup:" -ForegroundColor Yellow
Write-Host "   $BACKUP_PASTA" -ForegroundColor White
Write-Host ""

# Criar pasta do backup
New-Item -ItemType Directory -Path $BACKUP_PASTA | Out-Null

# ========================================
# 1. BACKUP DO CÓDIGO
# ========================================

Write-Host "1️⃣  Copiando código do sistema..." -ForegroundColor Yellow

$ORIGEM_CODIGO = "D:\lasec\lasec-sistema"
$DESTINO_CODIGO = "$BACKUP_PASTA\lasec-sistema"

if (Test-Path $ORIGEM_CODIGO) {
    # Copiar tudo exceto node_modules e dist
    robocopy $ORIGEM_CODIGO $DESTINO_CODIGO /E /XD node_modules dist .git /XF *.log /NFL /NDL /NJH /NJS
    Write-Host "   ✅ Código copiado!" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Código não encontrado em $ORIGEM_CODIGO" -ForegroundColor Red
}

# ========================================
# 2. BACKUP DOS ORÇAMENTOS
# ========================================

Write-Host ""
Write-Host "2️⃣  Copiando orçamentos históricos..." -ForegroundColor Yellow

$ORIGEM_ORCAMENTOS = "D:\lasec\orcamentos"
$DESTINO_ORCAMENTOS = "$BACKUP_PASTA\orcamentos"

if (Test-Path $ORIGEM_ORCAMENTOS) {
    robocopy $ORIGEM_ORCAMENTOS $DESTINO_ORCAMENTOS /E /NFL /NDL /NJH /NJS
    Write-Host "   ✅ Orçamentos copiados!" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Orçamentos não encontrados em $ORIGEM_ORCAMENTOS" -ForegroundColor Red
}

# ========================================
# 3. BACKUP DO BANCO DE PROGRAMAS CNC
# ========================================

Write-Host ""
Write-Host "3️⃣  Copiando banco de programas CNC..." -ForegroundColor Yellow

$ORIGEM_PROG_CNC = "D:\IA MALELO\banco_dados\PROG_CNC_DATABASE.json"
$DESTINO_PROG_CNC = "$BACKUP_PASTA\banco_dados"

if (Test-Path $ORIGEM_PROG_CNC) {
    New-Item -ItemType Directory -Path $DESTINO_PROG_CNC -Force | Out-Null
    Copy-Item $ORIGEM_PROG_CNC $DESTINO_PROG_CNC -Force
    Write-Host "   ✅ Banco CNC copiado!" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Banco CNC não encontrado" -ForegroundColor Yellow
}

# ========================================
# 4. BACKUP DO BANCO DE DADOS PostgreSQL
# ========================================

Write-Host ""
Write-Host "4️⃣  Exportando banco de dados PostgreSQL..." -ForegroundColor Yellow

$PG_DUMP = "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe"
$BACKUP_SQL = "$BACKUP_PASTA\database\lasec_orcamentos_$DATA.sql"

if (Test-Path $PG_DUMP) {
    New-Item -ItemType Directory -Path "$BACKUP_PASTA\database" -Force | Out-Null

    $env:PGPASSWORD = "lasec2026"
    & $PG_DUMP -U lasec_user -h localhost lasec_orcamentos -f $BACKUP_SQL 2>&1 | Out-Null
    $env:PGPASSWORD = ""

    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Banco exportado!" -ForegroundColor Green

        # Tamanho do arquivo
        $tamanho = (Get-Item $BACKUP_SQL).Length / 1MB
        Write-Host "   📊 Tamanho: $([math]::Round($tamanho, 2)) MB" -ForegroundColor Cyan
    } else {
        Write-Host "   ⚠️  Erro ao exportar banco" -ForegroundColor Red
    }
} else {
    Write-Host "   ⚠️  pg_dump não encontrado" -ForegroundColor Yellow
}

# ========================================
# 5. CRIAR ARQUIVO DE INFORMAÇÕES
# ========================================

Write-Host ""
Write-Host "5️⃣  Criando arquivo de informações..." -ForegroundColor Yellow

$INFO = @"
=====================================
BACKUP DO SISTEMA LASEC
=====================================

Data do Backup: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
Computador: $env:COMPUTERNAME
Usuário: $env:USERNAME

=====================================
CONTEÚDO DO BACKUP:
=====================================

✅ lasec-sistema/        - Código completo (backend + frontend)
✅ orcamentos/           - Histórico de orçamentos
✅ banco_dados/          - Banco de programas CNC
✅ database/             - Export PostgreSQL (.sql)
✅ info.txt              - Este arquivo

=====================================
COMO RESTAURAR:
=====================================

1. Copiar lasec-sistema para D:\lasec\
2. Copiar orcamentos para D:\lasec\
3. Instalar PostgreSQL
4. Importar database:
   psql -U lasec_user lasec_orcamentos < lasec_orcamentos_$DATA.sql
5. Instalar dependências:
   cd backend && npm install
   cd frontend && npm install
6. Iniciar servidores:
   Backend: npm run dev (porta 3000)
   Frontend: npm run dev (porta 5174)

=====================================
DOCUMENTAÇÃO COMPLETA:
=====================================

Leia: lasec-sistema/BACKUP_COMPLETO.md

=====================================
"@

$INFO | Out-File -FilePath "$BACKUP_PASTA\info.txt" -Encoding UTF8
Write-Host "   ✅ Informações salvas!" -ForegroundColor Green

# ========================================
# 6. COMPACTAR BACKUP (OPCIONAL)
# ========================================

Write-Host ""
$compactar = Read-Host "Compactar backup em .zip? (s/n)"

if ($compactar -eq "s") {
    Write-Host ""
    Write-Host "6️⃣  Compactando backup..." -ForegroundColor Yellow

    $ZIP_FILE = "$BACKUP_DIR\backup_lasec_$DATA.zip"
    Compress-Archive -Path $BACKUP_PASTA -DestinationPath $ZIP_FILE -CompressionLevel Optimal

    if (Test-Path $ZIP_FILE) {
        $tamanhoZip = (Get-Item $ZIP_FILE).Length / 1MB
        Write-Host "   ✅ Backup compactado!" -ForegroundColor Green
        Write-Host "   📦 Arquivo: backup_lasec_$DATA.zip" -ForegroundColor Cyan
        Write-Host "   📊 Tamanho: $([math]::Round($tamanhoZip, 2)) MB" -ForegroundColor Cyan

        # Perguntar se quer remover pasta não compactada
        Write-Host ""
        $remover = Read-Host "Remover pasta descompactada? (s/n)"
        if ($remover -eq "s") {
            Remove-Item -Path $BACKUP_PASTA -Recurse -Force
            Write-Host "   ✅ Pasta removida (arquivo .zip mantido)" -ForegroundColor Green
        }
    }
}

# ========================================
# RESUMO FINAL
# ========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ BACKUP CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Local do Backup:" -ForegroundColor Cyan
Write-Host "   $BACKUP_PASTA" -ForegroundColor White
Write-Host ""
Write-Host "☁️  Pasta de Backups:" -ForegroundColor Cyan
Write-Host "   $BACKUP_DIR" -ForegroundColor White
Write-Host ""
Write-Host "💡 Dica: Mantenha backups regulares!" -ForegroundColor Yellow
Write-Host "   - Diário: Código e banco"
Write-Host "   - Semanal: Tudo"
Write-Host "   - Mensal: Backup completo + teste de restauração"
Write-Host ""
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
