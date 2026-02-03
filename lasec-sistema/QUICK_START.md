# 🚀 Início Rápido - Sistema LASEC

## 1️⃣ Preparar Ambiente

### Instalar PostgreSQL (se não tiver)
- Windows: https://www.postgresql.org/download/windows/
- Ou usar Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15`

### Criar Banco de Dados
```sql
CREATE DATABASE lasec_orcamentos;
```

## 2️⃣ Configurar Backend

```bash
cd backend
npm install
```

Editar `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lasec_orcamentos
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI
```

## 3️⃣ Executar Migração

```bash
npm run migrate
```

Você verá:
```
✅ Migração concluída com sucesso!
   Tabelas criadas: clientes, maquinas, ferramentas, programas_cnc,
                    orcamentos, itens_orcamento, operacoes, lotes,
                    documentos_gerados, parametros_sistema
```

## 4️⃣ Testar Cálculos

```bash
node test-calculos.js
```

Deve mostrar:
```
✅ TESTE PASSOU!
   Preço calculado: R$ 196.01
   Preço esperado:  R$ 196.01
```

## 5️⃣ Iniciar Servidor

```bash
npm run dev
```

Acessar: http://localhost:3000

## 6️⃣ Testar API

### Health Check
```bash
curl http://localhost:3000/health
```

### Listar Máquinas
```bash
curl http://localhost:3000/api/maquinas
```

### Calcular Lote
```bash
curl -X POST http://localhost:3000/api/calculos/simular \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 100,
    "tempoMinutos": 45,
    "setupHoras": 3.0,
    "horaMaquina": 105.0
  }'
```

Resultado esperado:
```json
{
  "quantidade": 100,
  "custoSetup": 315.0,
  "custoMOD": 7875.0,
  "custoCIF": 4750.2,
  "custoTotal": 12940.2,
  "custoUnitario": 129.4,
  "precoNFe": 196.01,
  "margemPercentual": 33.98
}
```

## 7️⃣ Criar Primeiro Orçamento

### 1. Criar Cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "INOVA",
    "nome": "INOVA PRODENTAL",
    "pais": "Brasil",
    "telefone": "(11) 1234-5678"
  }'
```

Copiar o `id` do cliente retornado.

### 2. Criar Orçamento
```bash
curl -X POST http://localhost:3000/api/orcamentos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": "ID_DO_CLIENTE_AQUI",
    "descricao": "Suporte de Ferramenta - C"
  }'
```

Copiar o `id` do orçamento retornado.

### 3. Adicionar Item
```bash
curl -X POST http://localhost:3000/api/orcamentos/ID_ORCAMENTO/itens \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "00004-01",
    "descricao": "Anel Suporte - C",
    "material": "Alumínio",
    "material_fornecido_por": "CLIENTE",
    "tempo_ciclo_minutos": 15,
    "setup_horas": 1.5,
    "programa_cnc_numero": "O4006"
  }'
```

### 4. Calcular Lotes
```bash
curl -X POST http://localhost:3000/api/orcamentos/ID_ORCAMENTO/calcular-lotes \
  -H "Content-Type: application/json" \
  -d '{
    "quantidades": [15, 30, 50, 100, 200, 500]
  }'
```

### 5. Ver Orçamento Completo
```bash
curl http://localhost:3000/api/orcamentos/ID_ORCAMENTO
```

## 🐳 Usando Docker (Opcional)

```bash
# Subir tudo (PostgreSQL + Backend)
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Parar
docker-compose down
```

## 📚 Próximos Passos

1. ✅ Backend funcionando
2. 🔜 Desenvolver Frontend React
3. 🔜 Geração de documentos HTML/PDF
4. 🔜 Importar dados existentes
5. 🔜 Deploy em VPS

## ❓ Problemas Comuns

### Erro: "Cannot connect to database"
- Verificar se PostgreSQL está rodando
- Verificar credenciais no `.env`
- Testar: `psql -U postgres -h localhost`

### Erro: "Port 3000 already in use"
- Alterar `PORT=3001` no `.env`
- Ou parar processo: `netstat -ano | findstr :3000` e `taskkill /PID xxx /F`

### Erro na migração
- Dropar e recriar: `DROP DATABASE lasec_orcamentos; CREATE DATABASE lasec_orcamentos;`
- Executar migração novamente

## 📞 Suporte

Qualquer dúvida, verificar:
- README.md principal
- Código comentado em `src/`
- Plano completo em `.claude/plans/`
