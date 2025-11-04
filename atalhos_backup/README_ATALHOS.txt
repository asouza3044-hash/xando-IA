═══════════════════════════════════════════════════════════════════════════════
BACKUP DOS ATALHOS DO SISTEMA LASEC
═══════════════════════════════════════════════════════════════════════════════

DATA DO BACKUP: 03/11/2025
LOCAL ORIGINAL: C:\Users\lasec\Desktop
LOCAL DO BACKUP: C:\lasec\atalhos_backup

═══════════════════════════════════════════════════════════════════════════════
ATALHOS SALVOS
═══════════════════════════════════════════════════════════════════════════════

1. LASEC - Banco de Dados.lnk
   Destino: C:\lasec\base_dados\dados_completos_orcamentos.json
   Descrição: Banco de dados completo com clientes, fornecedores e parâmetros

2. LASEC - Guia Rapido.lnk
   Destino: C:\lasec\GUIA_RAPIDO_ORCAMENTOS.txt
   Descrição: Manual passo a passo para criar orçamentos

3. LASEC - Orcamentos.lnk
   Destino: C:\lasec\orcamentos
   Descrição: Pasta principal de orçamentos (arquivo por ano/cliente)

4. LASEC - Sistema.lnk
   Destino: C:\lasec\SISTEMA_IMPLEMENTADO.txt
   Descrição: Documentação técnica do sistema implementado

═══════════════════════════════════════════════════════════════════════════════
COMO RESTAURAR OS ATALHOS
═══════════════════════════════════════════════════════════════════════════════

MÉTODO 1 - COPIAR MANUALMENTE:
  1. Abra a pasta: C:\lasec\atalhos_backup
  2. Selecione todos os arquivos .lnk
  3. Clique com botão direito > Copiar
  4. Vá para a Área de Trabalho (C:\Users\lasec\Desktop)
  5. Clique com botão direito > Colar

MÉTODO 2 - USAR POWERSHELL:
  Execute o comando:
  powershell.exe -Command "Copy-Item 'C:\lasec\atalhos_backup\*.lnk' 'C:\Users\lasec\Desktop\'"

═══════════════════════════════════════════════════════════════════════════════
RECRIAR ATALHOS DO ZERO (SE NECESSÁRIO)
═══════════════════════════════════════════════════════════════════════════════

Se os atalhos não funcionarem após restauração, recrie-os com PowerShell:

$WshShell = New-Object -comObject WScript.Shell

# Atalho 1: Orçamentos
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\LASEC - Orcamentos.lnk")
$Shortcut.TargetPath = "C:\lasec\orcamentos"
$Shortcut.Save()

# Atalho 2: Guia Rápido
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\LASEC - Guia Rapido.lnk")
$Shortcut.TargetPath = "C:\lasec\GUIA_RAPIDO_ORCAMENTOS.txt"
$Shortcut.Save()

# Atalho 3: Sistema
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\LASEC - Sistema.lnk")
$Shortcut.TargetPath = "C:\lasec\SISTEMA_IMPLEMENTADO.txt"
$Shortcut.Save()

# Atalho 4: Banco de Dados
$Shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\LASEC - Banco de Dados.lnk")
$Shortcut.TargetPath = "C:\lasec\base_dados\dados_completos_orcamentos.json"
$Shortcut.Save()

═══════════════════════════════════════════════════════════════════════════════
OBSERVAÇÕES
═══════════════════════════════════════════════════════════════════════════════

• Os atalhos são específicos para o usuário "lasec"
• Se restaurar em outro computador, ajuste os caminhos conforme necessário
• Este backup é parte do sistema de orçamentos LASEC
• Mantenha sempre uma cópia atualizada dos atalhos

═══════════════════════════════════════════════════════════════════════════════
FIM DO DOCUMENTO
═══════════════════════════════════════════════════════════════════════════════
