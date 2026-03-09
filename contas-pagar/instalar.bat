@echo off
title Instalador - Contas a Pagar LASEC
echo.
echo  ================================================
echo   INSTALACAO - Contas a Pagar LASEC
echo  ================================================
echo.

:: Verifica se Python esta instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo  [!] Python nao encontrado!
    echo.
    echo  Por favor, instale o Python antes de continuar:
    echo.
    echo    1. Acesse: https://www.python.org/downloads/
    echo    2. Baixe Python 3.12 ou superior
    echo    3. NA INSTALACAO: marque "Add Python to PATH"
    echo    4. Execute este instalador novamente
    echo.
    echo  Abrindo pagina de download...
    start https://www.python.org/downloads/
    pause
    exit
)

echo  [OK] Python encontrado:
python --version
echo.

echo  [..] Instalando dependencias...
cd /d "D:\IA MALELO\contas-pagar\backend"
pip install -r requirements.txt

if errorlevel 1 (
    echo.
    echo  [ERRO] Falha ao instalar dependencias.
    echo  Tente executar como Administrador.
    pause
    exit
)

echo.
echo  ================================================
echo   INSTALACAO CONCLUIDA!
echo   Execute start.bat para iniciar o sistema
echo  ================================================
echo.
pause
