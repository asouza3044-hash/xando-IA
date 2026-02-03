# 📦 Guia de Backup - Sistema LASEC

## 🎯 Objetivo

Garantir que **NUNCA** percamos o trabalho desenvolvido.

---

## ⚡ BACKUP RÁPIDO (5 minutos)

### **Opção 1: Script Automático** (Recomendado)

```powershell
cd "D:\lasec\lasec-sistema"
.\backup-nuvem.ps1
```

**O script faz:**
1. ✅ Copia todo o código
2. ✅ Copia todos os orçamentos
3. ✅ Copia banco de programas CNC
4. ✅ Exporta banco PostgreSQL
5. ✅ Cria arquivo de informações
6. ✅ Opcionalmente compacta tudo em .zip

**Destino:** Google Drive / OneDrive / Dropbox (configurável)

---

### **Opção 2: Manual**

1. Copiar `D:\lasec\lasec-sistema\` para nuvem
2. Copiar `D:\lasec\orcamentos\` para nuvem
3. Exportar banco:
   ```powershell
   pg_dump -U lasec_user lasec_orcamentos > backup.sql
   ```

---

## 📅 FREQUÊNCIA RECOMENDADA

### **DIÁRIO** (final do dia):
```powershell
.\backup-nuvem.ps1
```
- Código
- Banco de dados
- Tempo: ~2 minutos

### **SEMANAL** (sexta-feira):
```powershell
.\backup-nuvem.ps1
```
- Tudo (código + orçamentos + banco CNC)
- Compactar em .zip
- Tempo: ~5 minutos

### **MENSAL** (último dia do mês):
```powershell
.\backup-nuvem.ps1
```
- Backup completo
- Testar restauração
- Documentar mudanças
- Tempo: ~15 minutos

---

## 🔄 COMO RESTAURAR

### **1. Restaurar Código:**

```powershell
# Copiar do backup
Copy-Item "C:\Users\lasec\OneDrive\BACKUP_LASEC\backup_XXXXXXXX\lasec-sistema" -Destination "D:\lasec\" -Recurse

# Instalar dependências
cd "D:\lasec\lasec-sistema\backend"
npm install

cd "D:\lasec\lasec-sistema\frontend"
npm install
```

### **2. Restaurar Banco de Dados:**

```powershell
# Criar banco
psql -U postgres
CREATE DATABASE lasec_orcamentos;
\q

# Importar backup
psql -U lasec_user -d lasec_orcamentos -f lasec_orcamentos_XXXXXXXX.sql
```

### **3. Restaurar Orçamentos:**

```powershell
Copy-Item "C:\Users\lasec\OneDrive\BACKUP_LASEC\backup_XXXXXXXX\orcamentos" -Destination "D:\lasec\" -Recurse
```

### **4. Iniciar Sistema:**

```powershell
# Backend
cd "D:\lasec\lasec-sistema\backend"
npm run dev

# Frontend (novo terminal)
cd "D:\lasec\lasec-sistema\frontend"
npm run dev
```

---

## ☁️ CONFIGURAR NUVEM

### **Google Drive:**

1. Instalar Google Drive Desktop
2. Editar `backup-nuvem.ps1`:
   ```powershell
   $NUVEM = "C:\Users\lasec\Google Drive"
   ```

### **OneDrive:**

1. Já vem instalado no Windows
2. Editar `backup-nuvem.ps1`:
   ```powershell
   $NUVEM = "C:\Users\lasec\OneDrive"
   ```

### **Dropbox:**

1. Instalar Dropbox Desktop
2. Editar `backup-nuvem.ps1`:
   ```powershell
   $NUVEM = "C:\Users\lasec\Dropbox"
   ```

---

## 📁 O QUE É FEITO BACKUP

### **Essencial (Sempre):**
- ✅ `lasec-sistema/` - Todo o código
- ✅ `database/` - Banco PostgreSQL
- ✅ `BACKUP_COMPLETO.md` - Documentação

### **Importante (Semanal):**
- ✅ `orcamentos/` - Todos os orçamentos
- ✅ `banco_dados/` - Programas CNC

### **Opcional:**
- ⚪ `node_modules/` - NÃO (reinstalar com npm install)
- ⚪ `dist/` - NÃO (regenerar com npm run build)

---

## 🚨 EM CASO DE EMERGÊNCIA

### **Se perdeu TUDO:**

1. **Leia:** `BACKUP_COMPLETO.md` (tem tudo documentado)
2. **Restaure:** do backup mais recente
3. **Instale:** Node.js + PostgreSQL
4. **Execute:** comandos de restauração acima

### **Se perdeu só o código:**

```powershell
# Restaurar do backup
Copy-Item "Backup\lasec-sistema" "D:\lasec\" -Recurse
cd "D:\lasec\lasec-sistema\backend"
npm install
cd ..\frontend
npm install
```

### **Se perdeu só o banco:**

```powershell
psql -U lasec_user lasec_orcamentos < backup.sql
```

---

## ✅ CHECKLIST DE SEGURANÇA

### **Antes de Modificar Algo Importante:**
- [ ] Fazer backup
- [ ] Testar em desenvolvimento
- [ ] Documentar mudança
- [ ] Fazer backup novamente

### **Antes de Desligar o Computador:**
- [ ] Commitar mudanças no git (se usar)
- [ ] Rodar `backup-nuvem.ps1`
- [ ] Verificar se subiu para nuvem

### **Uma Vez Por Mês:**
- [ ] Testar restauração completa
- [ ] Limpar backups antigos (manter últimos 3 meses)
- [ ] Atualizar documentação
- [ ] Verificar espaço em disco

---

## 💡 DICAS

### **Otimizar Backup:**

1. **Compactar:** Sempre marque "sim" quando script perguntar
2. **Limpar:** Remova `node_modules` antes do backup
3. **Agendar:** Use Agendador de Tarefas do Windows

### **Agendar Backup Automático:**

1. Abra **Agendador de Tarefas**
2. Criar Tarefa Básica
3. Nome: "Backup LASEC Diário"
4. Gatilho: Diário às 18:00
5. Ação: Iniciar programa
   - Programa: `powershell.exe`
   - Argumentos: `-File "D:\lasec\lasec-sistema\backup-nuvem.ps1"`

---

## 📊 TAMANHOS MÉDIOS

| Item | Tamanho Aprox. |
|------|---------------|
| Código (sem node_modules) | ~10 MB |
| node_modules | ~300 MB |
| Banco PostgreSQL | ~5 MB |
| Orçamentos (100) | ~50 MB |
| Banco CNC (11.592 programas) | ~10 MB |
| **Total Compactado** | **~50 MB** |
| **Total Descompactado** | **~375 MB** |

---

## 🔗 LINKS ÚTEIS

- [Google Drive](https://www.google.com/drive/download/)
- [OneDrive](https://www.microsoft.com/pt-br/microsoft-365/onedrive/download)
- [Dropbox](https://www.dropbox.com/downloading)
- [PostgreSQL](https://www.postgresql.org/download/)

---

## 📞 CONTATO

Dúvidas sobre backup? Leia:
- `BACKUP_COMPLETO.md` - Documentação completa
- `README.md` - Visão geral do projeto

---

**💡 Lembre-se:** Backup que não é testado não é backup!

**Última Atualização:** 03/02/2026
