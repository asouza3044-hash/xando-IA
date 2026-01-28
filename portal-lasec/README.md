# 🎯 Portal LASEC - Sistema Integrado de Orçamentos CNC

Sistema completo para gestão de orçamentos de usinagem CNC com 5 módulos integrados.

## 📊 Módulos Disponíveis

### 1. 🏠 **Home** (`index.html`)
Landing page institucional do Portal LASEC
- Hero section com apresentação
- Estatísticas rápidas (015 orçamentos, 04 módulos, 06 documentos)
- Cards dos 4 módulos principais
- Integração PostgreSQL destacada
- Call-to-action e footer completo

### 2. 📊 **Dashboard** (`dashboard.html`)
Analytics e métricas em tempo real
- **4 KPI Cards:** Total Orçamentos, Custo Médio, Tempo Médio, Margem Média
- **4 Gráficos Interativos (Chart.js):**
  - Orçamentos por Mês (linha)
  - Distribuição por Cliente (pizza)
  - Tempo Médio por Máquina (barras)
  - Custo por Lote (barras)
- Tabela com últimos 5 orçamentos
- Insights e alertas de performance

### 3. 📖 **Documentação** (`documentacao.html`)
Guia completo do Agente Orçamento LASEC
- **Fluxo Visual dos 6 Documentos** (sequencial com gate de aprovação)
- **Tabela de Fórmulas LASEC 2025** (Setup, MOD, CIF, Markup, Impostos)
- **Tabela de Máquinas CNC** (Doosan, Discovery 760, GL280, GL240)
- **Guia de Uso** (5 passos detalhados)
- **Referências Técnicas** (4 níveis de consulta)
- **FAQ Interativo** (6 perguntas com accordion)
- **Regras Absolutas** (críticas + operacionais)

### 4. 🎯 **Portal de Orçamentos** (`orcamentos.html`)
Galeria de orçamentos com visualização
- Filtros avançados (busca, cliente, status)
- **6 Orçamentos em Cards:**
  - 015/2025 - RFS Industrial
  - 014/2025 - LASEC
  - 012/2025 - BBOX
  - 011/2025 - BBOX
  - 009/2025 - LIVENZA
  - 001/2025 - MICROGEAR
- Modal visualizador de proposta comercial
- Exportação PDF e envio ao cliente

### 5. 🔍 **Consulta Database** (`database.html`)
Integração com PostgreSQL - Histórico e Análise
- **Busca inteligente** de peças por código
- **Alerta automático de prejuízo** (vendas com margem negativa)
- **Histórico de Vendas** (tabela detalhada com 5 transações)
- **2 Gráficos (Chart.js):**
  - Tendência de Custos (linha dupla: preço vs custo)
  - Distribuição de Margens (barras coloridas)
- **Composição BOM** (Bill of Materials)
- Exportação: CSV, Excel, PDF

---

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **Tailwind CSS** (CDN) - Framework CSS moderno e responsivo
- **Chart.js** (CDN) - Gráficos interativos
- **JavaScript Vanilla** - Interatividade (modals, accordion, filtros)
- **Google Fonts** - Tipografia Inter + JetBrains Mono

---

## 🚀 Como Usar

### **Opção 1: Abrir Localmente**

1. Navegue até a pasta `portal-lasec/`
2. Abra `index.html` no navegador
3. Navegue entre os módulos usando o menu

### **Opção 2: Deploy com GitHub Pages**

1. Vá em **Settings** → **Pages** no GitHub
2. Selecione **Branch: main** e pasta **/portal-lasec**
3. Salve e aguarde deploy
4. Acesse: `https://asouza3044-hash.github.io/xando-IA/portal-lasec/`

### **Opção 3: Servidor Local (Python)**

```bash
cd portal-lasec
python -m http.server 8000
```

Acesse: `http://localhost:8000`

---

## 📁 Estrutura de Arquivos

```
portal-lasec/
├── index.html              # Home (landing page)
├── dashboard.html          # Dashboard Analytics
├── documentacao.html       # Documentação Completa
├── orcamentos.html         # Portal de Orçamentos
├── database.html           # Consulta Database PostgreSQL
└── README.md               # Este arquivo
```

---

## 🎯 Paleta de Cores LASEC

```css
--lasec-primary: #1e40af    /* Azul escuro profissional */
--lasec-secondary: #3b82f6  /* Azul médio */
--lasec-accent: #60a5fa     /* Azul claro */
--lasec-success: #10b981    /* Verde (margens positivas) */
--lasec-warning: #f59e0b    /* Amarelo (alertas) */
--lasec-danger: #ef4444     /* Vermelho (prejuízos) */
--lasec-dark: #1f2937       /* Cinza escuro */
```

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| **Módulos criados** | 5 |
| **Total de páginas** | 5 HTML completos |
| **Linhas de código** | ~3.500 linhas |
| **Gráficos interativos** | 6 (Chart.js) |
| **Tabelas de dados** | 8 |
| **Componentes UI** | 50+ |

---

## ✨ Funcionalidades

✅ **100% Responsivo** - Mobile, tablet, desktop
✅ **Sem dependências locais** - CDN (Tailwind, Chart.js)
✅ **Navegação intuitiva** - Sidebar sticky em todos módulos
✅ **Interativo** - Gráficos, modals, accordion, filtros
✅ **Design profissional** - Identidade visual LASEC padronizada

---

## 🔗 Integração com Backend (Futuro)

Para integração real com PostgreSQL:

1. Criar API REST com Node.js + Express
2. Conectar com banco MiniPCP (PostgreSQL)
3. Substituir dados simulados por queries reais
4. Deploy backend (Railway, Heroku, ou local)

---

## 📝 Versão

**v1.0.0** - Janeiro 2026

Criado por: Agente Claude Sonnet 4.5
Para: LASEC - Usinagem CNC de Precisão

---

## 📄 Licença

Uso interno LASEC - Todos os direitos reservados © 2026
