# LASEC - Sistema de Orçamentos de Usinagem CNC

Sistema web completo para gerenciamento de orçamentos de usinagem CNC da LASEC.

## Tecnologias

- **Backend:** Node.js + Express + TypeScript
- **Banco de Dados:** PostgreSQL
- **Frontend:** React + Vite + Tailwind CSS (em desenvolvimento)

## Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+

### 1. Configurar o Banco de Dados

Crie um banco de dados PostgreSQL:

```sql
CREATE DATABASE lasec_orcamentos;
```

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lasec_orcamentos
DB_USER=postgres
DB_PASSWORD=sua_senha
```

### 3. Instalar Dependências

```bash
cd backend
npm install
```

### 4. Executar Migração

```bash
npm run migrate
```

### 5. Iniciar o Servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints da API

### Saúde
- `GET /health` - Status do servidor

### Clientes
- `GET /api/clientes` - Listar clientes
- `GET /api/clientes/:id` - Obter cliente
- `POST /api/clientes` - Criar cliente
- `PUT /api/clientes/:id` - Atualizar cliente

### Orçamentos
- `GET /api/orcamentos` - Listar orçamentos
- `GET /api/orcamentos/:id` - Obter orçamento completo
- `POST /api/orcamentos` - Criar orçamento
- `POST /api/orcamentos/:id/itens` - Adicionar item
- `POST /api/orcamentos/:id/calcular-lotes` - Calcular custos

### Cálculos
- `POST /api/calculos/lotes` - Calcular múltiplos lotes
- `POST /api/calculos/break-even` - Calcular ponto de equilíbrio
- `POST /api/calculos/simular` - Simular cálculo rápido
- `GET /api/calculos/parametros` - Parâmetros de cálculo

### Máquinas
- `GET /api/maquinas` - Listar máquinas
- `GET /api/maquinas/:codigo` - Obter máquina

## Fórmulas de Cálculo

```
SETUP = horas × hora_máquina
MOD = (quantidade × tempo_min) ÷ 60 × hora_máquina
CIF = (Setup + MOD) × 0.58
CUSTO_TOTAL = Setup + MOD + CIF + Material

PREÇO_NFe = CUSTO × 1.02 × 1.35 × 1.10
          = CUSTO × 1.5147
```

## Estrutura do Projeto

```
lasec-sistema/
├── backend/
│   ├── src/
│   │   ├── config/        # Configurações e constantes
│   │   ├── routes/        # Rotas da API
│   │   ├── services/      # Lógica de negócio
│   │   └── database/      # Migrações
│   └── package.json
├── frontend/              # (Em desenvolvimento)
└── README.md
```

## Licença

Propriedade da LASEC Usinagem de Precisão.
