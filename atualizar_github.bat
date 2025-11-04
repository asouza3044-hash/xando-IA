@echo off
chcp 65001 >nul
title Atualizar LASEC no GitHub
color 0B

echo.
echo ═══════════════════════════════════════════════════════════════
echo   ATUALIZAR SISTEMA LASEC NO GITHUB
echo ═══════════════════════════════════════════════════════════════
echo.

cd /d d:\lasec

echo 📊 Verificando alterações...
git status

echo.
echo ═══════════════════════════════════════════════════════════════
set /p mensagem="Digite a descrição da alteração: "

if "%mensagem%"=="" (
    set "mensagem=Atualização automática"
)

echo.
echo 📦 Preparando alterações...
git add .

echo.
echo 💾 Criando commit...
git commit -m "%mensagem%"

echo.
echo 🚀 Enviando para GitHub...
git push

echo.
echo ═══════════════════════════════════════════════════════════════
echo   ✅ ATUALIZAÇÃO CONCLUÍDA!
echo ═══════════════════════════════════════════════════════════════
echo.
echo Sistema sincronizado com GitHub!
echo Link: https://github.com/asouza3044-hash/xando-IA/tree/lasec-orcamentos
echo.

pause
