# LASEC - Frontend

Interface web do Sistema de Orçamentos de Usinagem CNC.

## Stack Tecnológico

- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilização utility-first
- **React Router** - Navegação SPA
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos e visualizações

## Desenvolvimento

### Instalar Dependências

```bash
npm install
```

### Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## Estrutura de Pastas

```
src/
├── components/     # Componentes reutilizáveis
│   └── Layout.tsx  # Layout principal (Header + Sidebar)
├── pages/          # Páginas da aplicação
│   ├── Dashboard.tsx
│   ├── Calculadora.tsx
│   ├── Clientes.tsx
│   ├── Orcamentos.tsx
│   ├── Maquinas.tsx
│   └── Configuracoes.tsx
├── services/       # Serviços e API clients
│   └── api.ts      # Cliente axios para backend
├── types/          # TypeScript types
│   └── index.ts    # Tipos da aplicação
├── hooks/          # Custom React hooks
├── assets/         # Imagens e assets estáticos
├── App.tsx         # Componente raiz
├── main.tsx        # Entry point
└── index.css       # Estilos globais (Tailwind)
```

## Funcionalidades

### ✅ Implementado

- [x] Layout responsivo com Header e Sidebar
- [x] Dashboard com indicadores (KPIs)
- [x] Calculadora de custos e preços
- [x] Visualização de máquinas cadastradas
- [x] Integração com API do backend
- [x] API status indicator em tempo real

### 🚧 Em Desenvolvimento

- [ ] CRUD de Clientes
- [ ] CRUD de Orçamentos
- [ ] Wizard de criação de orçamento
- [ ] Gráficos de análise de lotes
- [ ] Visualização de Break-Even
- [ ] Geração de documentos PDF
- [ ] Busca de Programas CNC

## Configuração

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

## Integração com Backend

O frontend se comunica com o backend através da API REST em `http://localhost:3000/api`.

Certifique-se de que o backend está rodando antes de iniciar o frontend:

```bash
cd ../backend
npm run dev
```

## Comandos Úteis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview da build
npm run lint         # Linter
```

## Próximos Passos

1. Implementar CRUD completo de Clientes
2. Implementar CRUD completo de Orçamentos
3. Criar Wizard multi-step para novo orçamento
4. Adicionar gráficos com Recharts
5. Implementar busca de Programas CNC
6. Adicionar autenticação e autorização
