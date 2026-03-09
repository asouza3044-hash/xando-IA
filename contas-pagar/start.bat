@echo off
title Contas a Pagar - LASEC
echo.
echo  ================================================
echo   Contas a Pagar LASEC - Iniciando servidor...
echo  ================================================
echo.

set PYTHON=C:\Users\lasec\AppData\Local\Programs\Python\Python312\python.exe
set UVICORN=C:\Users\lasec\AppData\Local\Programs\Python\Python312\Scripts\uvicorn.exe

cd /d "D:\IA MALELO\contas-pagar\backend"

echo  [OK] Servidor iniciando em http://localhost:8000
echo  [OK] Pressione Ctrl+C para encerrar
echo.

:: Abre o browser apos 2 segundos
start /b cmd /c "timeout /t 2 >nul && start http://localhost:8000"

:: Inicia o servidor
"%UVICORN%" main:app --reload --port 8000 --host 0.0.0.0
