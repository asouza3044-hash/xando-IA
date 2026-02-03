# 📦 Guia de Instalação Completo - Sistema LASEC

## Pré-requisitos

- ✅ Windows 10/11
- ✅ Node.js 18+ ([Download](https://nodejs.org))
- ✅ PostgreSQL 15+ ([Download](https://www.postgresql.org/download/windows/))
- ✅ Git (opcional)

---

## Passo 1: Instalar PostgreSQL

### 1.1 Download e Instalação

1. Baixar: https://www.postgresql.org/download/windows/
2. Executar instalador
3. **Anotar a senha do usuário `postgres`** que você definir
4. Porta padrão: 5432
5. Locale: Portuguese_Brazil
6. Instalar pgAdmin 4 (recomendado)

### 1.2 Verificar Instalação

Abrir PowerShell:

```powershell
psql --version
```

Deve mostrar: `psql (PostgreSQL) 15.x`

Se não funcionar, adicionar ao PATH:
- `C:\Program Files\PostgreSQL\15\bin`

---

## Passo 2: Criar Banco de Dados

### Opção A: Via pgAdmin 4

1. Abrir pgAdmin 4
2. Conectar ao servidor local (localhost)
3. Clicar direito em "Databases" → "Create" → "Database"
4. Nome: `lasec_orcamentos`
5. Encoding: UTF8
6. Salvar

### Opção B: Via SQL

Abrir PowerShell:

```powershell
cd "D:\lasec\lasec-sistema\backend"
psql -U postgres -f create-database.sql
```

Quando pedir senha, digitar a senha do PostgreSQL.

### Opção C: Via psql

```powershell
psql -U postgres
```

Dentro do psql:

```sql
CREATE DATABASE lasec_orcamentos;
\q
```

---

## Passo 3: Instalar Dependências do Backend

```powershell
cd "D:\lasec\lasec-sistema\backend"
npm install
```

Aguardar instalação (~2-3 minutos).

---

## Passo 4: Configurar Ambiente

Editar o arquivo `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lasec_orcamentos
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI  ← ALTERAR AQUI
```

**⚠️ IMPORTANTE:** Substituir `SUA_SENHA_AQUI` pela senha do PostgreSQL.

---

## Passo 5: Executar Migração

Criar todas as tabelas do banco:

```powershell
cd "D:\lasec\lasec-sistema\backend"
npm run migrate
```

**Saída esperada:**

```
🔄 Iniciando migração do banco de dados...

📦 Criando extensões...
📋 Criando tabela: clientes
📋 Criando tabela: maquinas
📋 Criando tabela: ferramentas
📋 Criando tabela: programas_cnc
📋 Criando tabela: orcamentos
📋 Criando tabela: itens_orcamento
📋 Criando tabela: operacoes
📋 Criando tabela: lotes
📋 Criando tabela: documentos_gerados
📋 Criando tabela: parametros_sistema

📦 Inserindo dados iniciais...

✅ Migração concluída com sucesso!
```

---

## Passo 6: Testar Cálculos

```powershell
node test-calculos.js
```

**Saída esperada:**

```
✅ TESTE PASSOU!
   Preço calculado: R$ 196.01
   Preço esperado:  R$ 196.01

✅ TODOS OS LOTES PASSARAM!
```

---

## Passo 7: Iniciar Servidor

```powershell
npm run dev
```

**Saída esperada:**

```
╔════════════════════════════════════════════════════════╗
║       LASEC - Sistema de Orçamentos de Usinagem        ║
╚════════════════════════════════════════════════════════╝

✅ Conexão com PostgreSQL estabelecida: 2026-02-03T...
🚀 Servidor rodando em http://localhost:3000
📊 Health check: http://localhost:3000/health
📚 API Base: http://localhost:3000/api
```

---

## Passo 8: Testar API

Abrir novo PowerShell (deixar o servidor rodando):

### 8.1 Health Check

```powershell
curl http://localhost:3000/health
```

**Resposta esperada:**

```json
{
  "status": "ok",
  "timestamp": "2026-02-03T...",
  "service": "LASEC Orcamentos API",
  "version": "1.0.0"
}
```

### 8.2 Listar Máquinas

```powershell
curl http://localhost:3000/api/maquinas
```

**Resposta esperada:**

```json
[
  {
    "codigo": "LYNX220",
    "nome": "Doosan LYNX 220 LM",
    "horaMaquina": 105,
    "setupPadrao": 1.5,
    "temEixoC": true,
    "temFerramentaMotorizada": true,
    "setupCusto": 157.5
  },
  ...
]
```

### 8.3 Simular Cálculo

```powershell
curl -X POST http://localhost:3000/api/calculos/simular ^
  -H "Content-Type: application/json" ^
  -d "{\"quantidade\":100,\"tempoMinutos\":45,\"setupHoras\":3.0,\"horaMaquina\":105.0}"
```

**Resposta esperada:**

```json
{
  "quantidade": 100,
  "custoSetup": 315,
  "custoMOD": 7875,
  "custoCIF": 4750.2,
  "custoTotal": 12940.2,
  "custoUnitario": 129.4,
  "precoNFe": 196.01,
  "margemPercentual": 33.98,
  "scoreViabilidade": 9,
  "viabilidade": "EXCELENTE"
}
```

---

## ✅ Instalação Completa!

O backend está funcionando perfeitamente. Próximos passos:

1. 📖 Ler `QUICK_START.md` para criar primeiro orçamento
2. 📊 Ver `STATUS.md` para acompanhar o progresso
3. 🎨 Aguardar desenvolvimento do frontend React

---

## 🐛 Solução de Problemas

### Erro: "Cannot connect to database"

**Causa:** PostgreSQL não está rodando ou credenciais erradas.

**Solução:**

1. Verificar se PostgreSQL está rodando:
   ```powershell
   Get-Service -Name postgresql*
   ```

2. Se não estiver rodando:
   ```powershell
   Start-Service postgresql-x64-15
   ```

3. Testar conexão:
   ```powershell
   psql -U postgres -h localhost
   ```

4. Verificar senha no `.env`

---

### Erro: "Port 3000 already in use"

**Solução:**

Opção 1 - Alterar porta:
```env
# .env
PORT=3001
```

Opção 2 - Matar processo:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### Erro: "psql: command not found"

**Solução:**

Adicionar ao PATH do Windows:

1. Painel de Controle → Sistema → Configurações Avançadas
2. Variáveis de Ambiente
3. Path → Editar → Novo
4. Adicionar: `C:\Program Files\PostgreSQL\15\bin`
5. OK → Reiniciar PowerShell

---

### Erro na Migração

**Solução:**

Dropar e recriar banco:

```powershell
psql -U postgres
```

```sql
DROP DATABASE IF EXISTS lasec_orcamentos;
CREATE DATABASE lasec_orcamentos;
\q
```

Executar migração novamente:

```powershell
npm run migrate
```

---

### npm install muito lento

**Solução:**

```powershell
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install
```

---

## 📞 Suporte

- GitHub: (repositório do projeto)
- Documentação: `README.md`
- Quick Start: `QUICK_START.md`
- Status: `STATUS.md`

---

**Instalado com sucesso?** 🎉

Próximo passo: Seguir o `QUICK_START.md` para criar seu primeiro orçamento!
