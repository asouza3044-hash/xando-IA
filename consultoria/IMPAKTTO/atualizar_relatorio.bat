@echo off
REM ============================================================
REM  ATUALIZA o relatorio PPTX a partir da planilha CRONOANALISE.xlsx
REM  Uso: duplo clique neste arquivo
REM
REM  O QUE FAZ:
REM    1. Le CRONOANALISE.xlsx aba 4_APONTAMENTO_HIST
REM    2. Consolida KPIs, ranking, mix, Pareto, detalhe
REM    3. Regenera entregaveis\CRONOANALISE_IMPAKTTO_v1.pptx
REM    4. (Opcional) Exporta PDF se LibreOffice estiver instalado
REM ============================================================

setlocal
cd /d "%~dp0"

echo.
echo === [1/3] Lendo planilha e consolidando dados ===
python relatorio_pptx\gerar_dados.py
if errorlevel 1 (
    echo.
    echo ERRO ao consolidar dados. Verifique se python esta instalado.
    pause
    exit /b 1
)

echo.
echo === [2/3] Gerando PPTX ===
cd relatorio_pptx
node build_pptx.js
if errorlevel 1 (
    echo.
    echo ERRO ao gerar PPTX. Verifique se node esta instalado e se pptxgenjs esta na pasta node_modules.
    pause
    exit /b 1
)
cd ..

echo.
echo === [3/3] Tentando exportar PDF (opcional) ===
where soffice >nul 2>nul
if %errorlevel%==0 (
    soffice --headless --convert-to pdf --outdir entregaveis entregaveis\CRONOANALISE_IMPAKTTO_v1.pptx >nul 2>nul
    echo OK PDF atualizado em entregaveis\CRONOANALISE_IMPAKTTO_v1.pdf
) else (
    echo PDF nao gerado (LibreOffice nao encontrado no PATH).
    echo Para gerar PDF: abra o PPTX no PowerPoint e Arquivo ^> Exportar ^> PDF.
)

echo.
echo ============================================================
echo  PRONTO! Relatorio atualizado em:
echo    entregaveis\CRONOANALISE_IMPAKTTO_v1.pptx
echo ============================================================
echo.
pause
