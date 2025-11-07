// ═══════════════════════════════════════════════════════════
// GERADOR DE DASHBOARDS HTML - LASEC
// Gera planilhas e gráficos interativos com atualização automática
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 GERADOR DE DASHBOARDS E GRÁFICOS - LASEC');
console.log('═══════════════════════════════════════════════════════════\n');

// Carregar dados
const biblioteca = JSON.parse(fs.readFileSync('d:/lasec/base_dados/biblioteca_cnc.json', 'utf8'));
const padroes = JSON.parse(fs.readFileSync('d:/lasec/base_dados/padroes_cnc.json', 'utf8'));
const orcamentos = JSON.parse(fs.readFileSync('d:/lasec/base_dados/dados_completos_orcamentos.json', 'utf8'));

// Criar pasta para dashboards
const pastaDashboards = 'd:/lasec/dashboards';
if (!fs.existsSync(pastaDashboards)) {
    fs.mkdirSync(pastaDashboards, { recursive: true });
}

console.log('📊 Gerando dashboards...\n');

// ═══════════════════════════════════════════════════════════
// DASHBOARD PRINCIPAL
// ═══════════════════════════════════════════════════════════

const htmlDashboard = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LASEC - Dashboard CNC e Orçamentos</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .header {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 30px;
            text-align: center;
        }

        .header h1 {
            color: #003366;
            font-size: 36px;
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
            font-size: 16px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .stat-number {
            font-size: 42px;
            font-weight: bold;
            color: #003366;
            margin: 10px 0;
        }

        .stat-label {
            color: #666;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .stat-icon {
            font-size: 30px;
            margin-bottom: 10px;
        }

        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 30px;
            margin-bottom: 30px;
        }

        .chart-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .chart-card h2 {
            color: #003366;
            margin-bottom: 20px;
            font-size: 20px;
            border-bottom: 3px solid #003366;
            padding-bottom: 10px;
        }

        .table-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            background: #003366;
            color: white;
            padding: 12px;
            text-align: left;
            font-size: 13px;
        }

        td {
            padding: 10px 12px;
            border-bottom: 1px solid #eee;
            font-size: 13px;
        }

        tr:hover {
            background: #f5f5f5;
        }

        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
        }

        .badge-success { background: #28a745; color: white; }
        .badge-warning { background: #ffc107; color: #000; }
        .badge-info { background: #17a2b8; color: white; }
        .badge-danger { background: #dc3545; color: white; }

        .nav-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .nav-tab {
            padding: 12px 24px;
            background: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            color: #003366;
            transition: all 0.3s;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .nav-tab:hover {
            background: #003366;
            color: white;
            transform: translateY(-2px);
        }

        .nav-tab.active {
            background: #003366;
            color: white;
        }

        .update-time {
            text-align: center;
            color: white;
            margin-top: 20px;
            font-size: 14px;
        }

        @media (max-width: 768px) {
            .charts-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏭 LASEC - Dashboard CNC e Orçamentos</h1>
            <p>Sistema Integrado de Análise de Produção e Orçamentos</p>
        </div>

        <!-- KPIs -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-number">${biblioteca.info.totalProgramas.toLocaleString()}</div>
                <div class="stat-label">Programas CNC</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">🏭</div>
                <div class="stat-number">${Object.keys(biblioteca.maquinas).length}</div>
                <div class="stat-label">Máquinas</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">🔧</div>
                <div class="stat-number">${Object.keys(biblioteca.ferramentas).length}</div>
                <div class="stat-label">Ferramentas</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">💼</div>
                <div class="stat-number">${orcamentos.ultimos_orcamentos.filter(o => o.status === 'valido').length}</div>
                <div class="stat-label">Orçamentos Válidos</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-number">R$ ${orcamentos.ultimos_orcamentos.filter(o => o.status === 'valido').reduce((sum, o) => sum + o.valor_total, 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                <div class="stat-label">Total Orçado</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-number">${Object.keys(padroes.metodologias).length}</div>
                <div class="stat-label">Metodologias</div>
            </div>
        </div>

        <!-- Navegação -->
        <div class="nav-tabs">
            <button class="nav-tab active" onclick="window.location.href='dashboard_principal.html'">📊 Visão Geral</button>
            <button class="nav-tab" onclick="window.location.href='dashboard_maquinas.html'">🏭 Máquinas</button>
            <button class="nav-tab" onclick="window.location.href='dashboard_ferramentas.html'">🔧 Ferramentas</button>
            <button class="nav-tab" onclick="window.location.href='dashboard_orcamentos.html'">💼 Orçamentos</button>
            <button class="nav-tab" onclick="window.location.href='dashboard_materiais.html'">🔩 Materiais</button>
        </div>

        <!-- Gráficos -->
        <div class="charts-grid">
            <div class="chart-card">
                <h2>📊 Programas por Máquina</h2>
                <canvas id="chartMaquinas"></canvas>
            </div>

            <div class="chart-card">
                <h2>📈 Orçamentos por Status</h2>
                <canvas id="chartOrcamentos"></canvas>
            </div>

            <div class="chart-card">
                <h2>🔧 Top 10 Ferramentas</h2>
                <canvas id="chartFerramentas"></canvas>
            </div>

            <div class="chart-card">
                <h2>💰 Valores por Cliente</h2>
                <canvas id="chartClientes"></canvas>
            </div>
        </div>

        <!-- Tabela de Orçamentos Recentes -->
        <div class="table-card">
            <h2>📋 Orçamentos Recentes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Peça</th>
                        <th>Qtd</th>
                        <th>Tempo</th>
                        <th>Valor Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${orcamentos.ultimos_orcamentos.slice().reverse().map(orc => `
                        <tr>
                            <td><strong>${orc.numero}</strong></td>
                            <td>${new Date(orc.data).toLocaleDateString('pt-BR')}</td>
                            <td>${orc.cliente}</td>
                            <td>${orc.peca}</td>
                            <td>${orc.quantidade}</td>
                            <td>${orc.tempo_peça_minutos} min</td>
                            <td>R$ ${orc.valor_total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                            <td><span class="badge badge-${orc.status === 'valido' ? 'success' : 'warning'}">${orc.status.toUpperCase()}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="update-time">
            ⏰ Última atualização: ${new Date().toLocaleString('pt-BR')} |
            <a href="#" onclick="location.reload()" style="color: white; text-decoration: underline;">🔄 Atualizar</a>
        </div>
    </div>

    <script>
        // Configuração global de gráficos
        Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

        // Gráfico de Máquinas
        const ctxMaquinas = document.getElementById('chartMaquinas').getContext('2d');
        new Chart(ctxMaquinas, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(Object.keys(biblioteca.maquinas))},
                datasets: [{
                    label: 'Programas',
                    data: ${JSON.stringify(Object.values(biblioteca.maquinas).map(m => m.total))},
                    backgroundColor: 'rgba(0, 51, 102, 0.8)',
                    borderColor: 'rgba(0, 51, 102, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Gráfico de Orçamentos
        const statusCount = {
            valido: ${orcamentos.ultimos_orcamentos.filter(o => o.status === 'valido').length},
            obsoleto: ${orcamentos.ultimos_orcamentos.filter(o => o.status === 'OBSOLETO').length},
            pendente: ${orcamentos.ultimos_orcamentos.filter(o => o.status === 'pendente').length}
        };

        const ctxOrcamentos = document.getElementById('chartOrcamentos').getContext('2d');
        new Chart(ctxOrcamentos, {
            type: 'doughnut',
            data: {
                labels: ['Válidos', 'Obsoletos', 'Pendentes'],
                datasets: [{
                    data: [statusCount.valido, statusCount.obsoleto, statusCount.pendente],
                    backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Top 10 Ferramentas
        const ferramentas = ${JSON.stringify(Object.entries(biblioteca.ferramentas).map(([k, v]) => ({nome: k, total: v.total})).sort((a, b) => b.total - a.total).slice(0, 10))};

        const ctxFerramentas = document.getElementById('chartFerramentas').getContext('2d');
        new Chart(ctxFerramentas, {
            type: 'horizontalBar',
            data: {
                labels: ferramentas.map(f => f.nome),
                datasets: [{
                    label: 'Usos',
                    data: ferramentas.map(f => f.total),
                    backgroundColor: 'rgba(118, 75, 162, 0.8)',
                    borderColor: 'rgba(118, 75, 162, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });

        // Valores por Cliente
        const clienteValores = {};
        ${orcamentos.ultimos_orcamentos.filter(o => o.status === 'valido').forEach(o => {
            const cliente = o.cliente;
            if (!clienteValores[cliente]) clienteValores[cliente] = 0;
            clienteValores[cliente] += o.valor_total;
        })};

        const ctxClientes = document.getElementById('chartClientes').getContext('2d');
        new Chart(ctxClientes, {
            type: 'pie',
            data: {
                labels: Object.keys(clienteValores),
                datasets: [{
                    data: Object.values(clienteValores),
                    backgroundColor: ['#003366', '#667eea', '#764ba2', '#f093fb'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(pastaDashboards, 'dashboard_principal.html'), htmlDashboard);
console.log('✅ Dashboard Principal gerado');

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ DASHBOARDS GERADOS!');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`📁 Localização: ${pastaDashboards}`);
console.log(`🌐 Abrir: dashboard_principal.html\n`);

// Abrir dashboard
const { execSync } = require('child_process');
execSync(`start "" "${path.join(pastaDashboards, 'dashboard_principal.html')}"`);
