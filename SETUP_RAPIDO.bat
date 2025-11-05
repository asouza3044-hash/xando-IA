@echo off
chcp 65001 >nul
title SETUP RÁPIDO - LASEC Sistema de Orçamentos

echo ═══════════════════════════════════════════════════════════════
echo      SETUP RÁPIDO - SISTEMA LASEC DE ORÇAMENTOS
echo ═══════════════════════════════════════════════════════════════
echo.

REM Verificar Git
echo [1/5] Verificando Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git não instalado!
    echo    Baixe em: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git instalado

REM Verificar Node.js
echo [2/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não instalado!
    echo    Baixe em: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js instalado

REM Verificar se repositório existe
echo [3/5] Verificando repositório...
if exist "d:\lasec\.git" (
    echo ✅ Repositório encontrado em d:\lasec
    echo    Atualizando...
    cd /d d:\lasec
    git checkout lasec-orcamentos
    git pull origin lasec-orcamentos
) else (
    echo ⚠️  Repositório não encontrado
    echo    Clonando de https://github.com/asouza3044-hash/xando-IA...
    cd /d d:\
    git clone https://github.com/asouza3044-hash/xando-IA.git lasec
    cd lasec
    git checkout lasec-orcamentos
)

echo [4/5] Verificando arquivos...
cd /d d:\lasec
dir sistema >nul 2>&1
if errorlevel 1 (
    echo ❌ Pasta sistema não encontrada!
    pause
    exit /b 1
)
echo ✅ Arquivos verificados

echo [5/5] Testando sistema...
node sistema\gerar_orcamento.js >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Sistema pode ter dependências faltando
) else (
    echo ✅ Sistema funcionando
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo                    ✅ SETUP CONCLUÍDO!
echo ═══════════════════════════════════════════════════════════════
echo.
echo 📂 Sistema instalado em: d:\lasec
echo 🌐 GitHub: https://github.com/asouza3044-hash/xando-IA
echo 📝 Branch: lasec-orcamentos
echo.
echo Comandos úteis:
echo   - Ver arquivos:     dir d:\lasec
echo   - Testar agente:    node d:\lasec\sistema\gerar_orcamento.js
echo   - Atualizar:        cd d:\lasec ^&^& git pull
echo   - Ver guia:         start d:\lasec\GUIA_ACESSO_OUTRO_TERMINAL.md
echo.
echo ═══════════════════════════════════════════════════════════════
echo.

REM Abrir guia
echo Abrindo guia de acesso...
start "" "d:\lasec\GUIA_ACESSO_OUTRO_TERMINAL.md"

echo.
pause
