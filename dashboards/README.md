# 📊 DASHBOARDS LASEC - GUIA DE USO

## 🎯 VISÃO GERAL

Sistema de dashboards interativos com visualização em tempo real de:
- 11.785 programas CNC analisados
- Orçamentos e valores
- Máquinas e ferramentas
- Padrões e metodologias

---

## 📁 ARQUIVOS

### **dashboard_principal.html** ⭐
Dashboard principal com visão geral completa

**Conteúdo:**
- 📊 KPIs: 6 indicadores principais
- 📈 4 Gráficos interativos
- 📋 Tabela de orçamentos recentes
- 🔄 Atualização em tempo real

**Como usar:**
1. Abra `dashboard_principal.html` no navegador
2. Clique em "🔄 Atualizar" para ver mudanças
3. Passe o mouse sobre gráficos para detalhes

---

## 🔄 ATUALIZAÇÃO AUTOMÁTICA

### **Método 1: Manual**
```bash
node d:\lasec\sistema\gerar_dashboards_v2.js
```

### **Método 2: Automático (Recomendado)**
```bash
node d:\lasec\sistema\auto_atualizar_dashboards.js
```

O sistema monitora:
- `biblioteca_cnc.json`
- `padroes_cnc.json`
- `dados_completos_orcamentos.json`

Atualiza a cada 30 segundos quando detecta mudanças.

---

## 📊 GRÁFICOS DISPONÍVEIS

### **1. Programas por Máquina** (Barras)
- Mostra distribuição de programas CNC
- Por máquina (GL280, LYNX220, etc)
- Total: 11.785 programas

### **2. Orçamentos por Status** (Pizza)
- Válidos vs Obsoletos vs Pendentes
- Visualiza qualidade dos orçamentos
- Acompanha evolução

### **3. Top 10 Ferramentas** (Barras Horizontais)
- Ferramentas mais usadas
- Total de usos por ferramenta
- Base: 42 ferramentas catalogadas

### **4. Tempos Médios** (Linha)
- Evolução dos tempos de usinagem
- Por orçamento
- Identifica tendências

---

## 📈 KPIs (Indicadores)

| KPI | Descrição | Fonte |
|-----|-----------|-------|
| **📚 Programas CNC** | Total na biblioteca | biblioteca_cnc.json |
| **🏭 Máquinas** | Máquinas catalogadas | biblioteca_cnc.json |
| **🔧 Ferramentas** | Ferramentas únicas | biblioteca_cnc.json |
| **💼 Orçamentos Válidos** | Orçamentos aprovados | dados_completos_orcamentos.json |
| **💰 Total Orçado** | Valor total em R$ | dados_completos_orcamentos.json |
| **✅ Metodologias** | Metodologias validadas | padroes_cnc.json |

---

## 🎨 PERSONALIZAÇÃO

### **Cores:**
```css
/* Cor principal: Azul LASEC */
#003366

/* Gradiente de fundo */
linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* Status */
Verde: #28a745 (Válido)
Vermelho: #dc3545 (Obsoleto)
Amarelo: #ffc107 (Pendente)
```

### **Adicionar Gráfico:**
1. Abra `gerar_dashboards_v2.js`
2. Adicione `<canvas id="meuGrafico"></canvas>`
3. Adicione script Chart.js correspondente
4. Regenere: `node gerar_dashboards_v2.js`

---

## 🔧 SOLUÇÃO DE PROBLEMAS

### **Dashboard não abre:**
```bash
# Tente:
start "" "d:\lasec\dashboards\dashboard_principal.html"
```

### **Gráficos não aparecem:**
- Verifique conexão com internet (Chart.js via CDN)
- Aguarde 2-3 segundos para carregar
- Pressione F5 para recarregar

### **Dados desatualizados:**
```bash
# Regenere manualmente:
node d:\lasec\sistema\gerar_dashboards_v2.js
```

### **Erro ao gerar:**
- Verifique se os arquivos JSON existem
- Verifique permissões da pasta dashboards/
- Veja logs de erro no terminal

---

## 📱 RESPONSIVO

Os dashboards são responsivos e funcionam em:
- 🖥️ Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile (com limitações)

---

## 🚀 PRÓXIMOS PASSOS

### **Melhorias Futuras:**
- [ ] Dashboard de máquinas individual
- [ ] Dashboard de ferramentas detalhado
- [ ] Exportar gráficos como PDF
- [ ] Comparação período a período
- [ ] Alertas automáticos
- [ ] Dashboard em tempo real (WebSocket)

---

## 📞 SUPORTE

**Localização:**
- Dashboards: `d:\lasec\dashboards\`
- Scripts: `d:\lasec\sistema\`
- Dados: `d:\lasec\base_dados\`

**Regenerar tudo:**
```bash
cd d:\lasec\sistema
node gerar_dashboards_v2.js
```

**Atualização contínua:**
```bash
cd d:\lasec\sistema
node auto_atualizar_dashboards.js
```
(Deixe rodando em segundo plano)

---

## 💡 DICAS

1. **Bookmark:** Adicione o dashboard aos favoritos do navegador
2. **F11:** Modo tela cheia para apresentações
3. **Ctrl+P:** Imprimir dashboard
4. **Print Screen:** Capturar gráficos para relatórios
5. **Auto-atualizar:** Deixe o script de atualização rodando

---

**Última atualização:** 06/11/2025
**Sistema:** LASEC Dashboards V1.0
**Tecnologias:** HTML5, Chart.js, JavaScript
