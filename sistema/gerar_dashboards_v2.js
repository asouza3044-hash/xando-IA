// ═══════════════════════════════════════════════════════════
// GERADOR DE DASHBOARDS HTML - LASEC V2
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 GERADOR DE DASHBOARDS - LASEC');
console.log('═══════════════════════════════════════════════════════════\n');

// Carregar dados
const biblioteca = JSON.parse(fs.readFileSync('d:/lasec/base_dados/biblioteca_cnc.json', 'utf8'));
const padroes = JSON.parse(fs.readFileSync('d:/lasec/base_dados/padroes_cnc.json', 'utf8'));
const orcamentos = JSON.parse(fs.readFileSync('d:/lasec/base_dados/dados_completos_orcamentos.json', 'utf8'));

// Criar pasta
const pastaDashboards = 'd:/lasec/dashboards';
if (!fs.existsSync(pastaDashboards)) {
    fs.mkdirSync(pastaDashboards, { recursive: true });
}

// Preparar dados para gráficos
const maquinasLabels = Object.keys(biblioteca.maquinas);
const maquinasData = Object.values(biblioteca.maquinas).map(m => m.total);

const orcValidos = orcamentos.ultimos_orcamentos.filter(o => o.status === 'valido').length;
const orcObsoletos = orcamentos.ultimos_orcamentos.filter(o => o.status === 'OBSOLETO').length;
const orcPendentes = orcamentos.ultimos_orcamentos.filter(o => o.status === 'pendente').length;

const top10Ferr = Object.entries(biblioteca.ferramentas)
    .map(([k, v]) => ({nome: k, total: v.total}))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

const totalOrcado = orcamentos.ultimos_orcamentos
    .filter(o => o.status === 'valido')
    .reduce((sum, o) => sum + o.valor_total, 0);

// HTML do Dashboard
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>LASEC - Dashboard CNC</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        .header {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 30px;
            text-align: center;
        }
        .header h1 { color: #003366; font-size: 36px; margin-bottom: 10px; }
        .header p { color: #666; }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s;
            text-align: center;
        }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-icon { font-size: 36px; margin-bottom: 10px; }
        .stat-number { font-size: 42px; font-weight: bold; color: #003366; margin: 10px 0; }
        .stat-label { color: #666; font-size: 13px; text-transform: uppercase; }

        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
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
            font-size: 18px;
            border-bottom: 3px solid #003366;
            padding-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        th {
            background: #003366;
            color: white;
            padding: 15px;
            text-align: left;
        }
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }
        tr:hover { background: #f5f5f5; }

        .badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
        }
        .badge-success { background: #28a745; color: white; }
        .badge-warning { background: #ffc107; color: #000; }

        .update-time {
            text-align: center;
            color: white;
            margin: 30px 0;
        }
        .update-time a { color: white; text-decoration: underline; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏭 LASEC - Dashboard CNC e Orçamentos</h1>
            <p>Sistema Integrado de Análise de Produção</p>
        </div>

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
                <div class="stat-number">${orcValidos}</div>
                <div class="stat-label">Orçamentos Válidos</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-number">R$ ${totalOrcado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                <div class="stat-label">Total Orçado</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-number">${Object.keys(padroes.metodologias).length}</div>
                <div class="stat-label">Metodologias</div>
            </div>
        </div>

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
                <h2>⏱️ Tempos Médios por Peça</h2>
                <canvas id="chartTempos"></canvas>
            </div>
        </div>

        <h2 style="color: white; margin: 30px 0 20px;">📋 Orçamentos Recentes</h2>
        <table>
            <thead>
                <tr>
                    <th>Nº</th>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Peça</th>
                    <th>Qtd</th>
                    <th>Tempo</th>
                    <th>Valor</th>
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
                        <td><span class="badge badge-${orc.status === 'valido' ? 'success' : 'warning'}">${orc.status}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="update-time">
            ⏰ Última atualização: ${new Date().toLocaleString('pt-BR')} |
            <a onclick="location.reload()">🔄 Atualizar</a>
        </div>
    </div>

    <script>
        // Gráfico de Máquinas
        new Chart(document.getElementById('chartMaquinas'), {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(maquinasLabels)},
                datasets: [{
                    label: 'Programas',
                    data: ${JSON.stringify(maquinasData)},
                    backgroundColor: 'rgba(0, 51, 102, 0.8)'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });

        // Gráfico de Orçamentos
        new Chart(document.getElementById('chartOrcamentos'), {
            type: 'doughnut',
            data: {
                labels: ['Válidos', 'Obsoletos', 'Pendentes'],
                datasets: [{
                    data: [${orcValidos}, ${orcObsoletos}, ${orcPendentes}],
                    backgroundColor: ['#28a745', '#dc3545', '#ffc107']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        // Gráfico de Ferramentas
        new Chart(document.getElementById('chartFerramentas'), {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(top10Ferr.map(f => f.nome))},
                datasets: [{
                    label: 'Usos',
                    data: ${JSON.stringify(top10Ferr.map(f => f.total))},
                    backgroundColor: 'rgba(118, 75, 162, 0.8)'
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: { legend: { display: false } }
            }
        });

        // Gráfico de Tempos
        new Chart(document.getElementById('chartTempos'), {
            type: 'line',
            data: {
                labels: ${JSON.stringify(orcamentos.ultimos_orcamentos.filter(o => o.status === 'valido').map(o => o.numero))},
                datasets: [{
                    label: 'Tempo (min)',
                    data: ${JSON.stringify(orcamentos.ultimos_orcamentos.filter(o => o.status === 'valido').map(o => o.tempo_peça_minutos))},
                    borderColor: '#003366',
                    backgroundColor: 'rgba(0, 51, 102, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(pastaDashboards, 'dashboard_principal.html'), html);

console.log('✅ Dashboard Principal gerado\n');
console.log('═══════════════════════════════════════════════════════════');
console.log('✅ DASHBOARD GERADO COM SUCESSO!');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(`📁 Localização: ${pastaDashboards}/dashboard_principal.html\n`);

// Abrir dashboard
try {
    execSync(`start "" "${path.join(pastaDashboards, 'dashboard_principal.html')}"`);
    console.log('🌐 Dashboard aberto no navegador!\n');
} catch (err) {
    console.log('⚠️ Abra manualmente: d:\\lasec\\dashboards\\dashboard_principal.html\n');
}
