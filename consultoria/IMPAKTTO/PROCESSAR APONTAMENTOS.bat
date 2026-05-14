@echo off
title Processar Apontamentos PDF - IMPAKTTO
color 0A
echo.
echo  ============================================
echo   IMPORTADOR DE APONTAMENTOS - IMPAKTTO
echo  ============================================
echo.

REM ── Verifica API Key ──────────────────────────────────────────────────────
if "%ANTHROPIC_API_KEY%"=="" (
    echo  ATENCAO: Chave da API nao encontrada!
    echo.
    echo  Cole sua chave abaixo e pressione ENTER:
    echo  (comeca com sk-ant-...)
    echo.
    set /p ANTHROPIC_API_KEY=  Chave:
    echo.
)

REM ── Muda para a pasta do projeto ──────────────────────────────────────────
cd /d "D:\IA MALELO\consultoria\IMPAKTTO"

REM ── Instala dependencias se necessario ───────────────────────────────────
echo  Verificando dependencias...
pip install anthropic pdf2image pillow openpyxl --break-system-packages -q 2>nul
pip install anthropic pdf2image pillow openpyxl -q 2>nul

REM ── Roda o script ────────────────────────────────────────────────────────
echo.
echo  Iniciando leitura dos PDFs...
echo.
python processar_pdfs.py

echo.
echo  ============================================
echo   Pronto! Atualize o Power BI agora.
echo  ============================================
echo.
pause
