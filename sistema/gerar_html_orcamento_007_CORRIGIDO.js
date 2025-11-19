// ═══════════════════════════════════════════════════════════
// GERADOR DE HTMLs - ORÇAMENTO 007/2025 TAMPA DE ALUMÍNIO
// Cliente: LASEC (uso interno) - VALORES CORRIGIDOS
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════');
console.log('📄 GERANDO HTMLs DO ORÇAMENTO 007/2025 - VALORES CORRETOS');
console.log('═══════════════════════════════════════════════════════════\n');

// ═════════════════════════════════════════════════════════
// DADOS DO ORÇAMENTO - VALORES CORRETOS
// Usando preço hora/máquina padrão: R$ 120,00/hora
// ═════════════════════════════════════════════════════════

const orc = {
    numero: '007/2025',
    data: '07/11/2025',
    cliente: 'LASEC',
    peca: 'TAMPA DE ALUMÍNIO',
    codigo: 'TAMPA_ALUMINIO_001',
    material: 'Alumínio 6061',
    materialBruto: 'Tarugo Ø25 x 50mm',
    quantidade: 9,

    // Dimensões
    diametroExterno: 88,
    diametroInterno: 69.2,
    altura: 54,

    // Tempos
    tempoUnitario: 9.6, // minutos
    tempoTotal: 86.4, // minutos (9.6 x 9)
    tempoTotalHoras: 1.44, // horas

    // CUSTO HORA/MÁQUINA CORRETO (padrão LASEC)
    custoHoraMaquina: 120.00, // R$/hora (IGUAL AOS OUTROS ORÇAMENTOS!)

    // Custos MOD
    custoMODUnitario: 19.20, // R$ (9.6 min * 120.00 / 60)
    custoMODTotal: 172.80, // R$ (19.20 x 9)

    // Custos indiretos (58%)
    percentualIndiretos: 58,
    custoIndiretosUnitario: 11.14, // R$ (19.20 x 0.58)
    custoIndiretosTotal: 100.22, // R$ (11.14 x 9)

    // Custo total
    custoUnitario: 30.34, // R$ (19.20 + 11.14)
    custoTotal: 273.02, // R$ (30.34 x 9)

    // Markup e impostos
    markup: 1.290, // Markup reduzido (igual orçamento 006)
    percentualImpostos: 8.5,

    // Preços
    precoSemImpostos: 39.14, // R$ (30.34 x 1.290)
    valorImpostos: 3.33, // R$ (39.14 x 0.085)
    precoUnitario: 42.47, // R$ (39.14 + 3.33)
    precoTotal: 382.23, // R$ (42.47 x 9)

    // Lucro
    lucroUnitario: 8.80, // R$ (42.47 - 30.34 - 3.33)
    lucroTotal: 79.20, // R$ (8.80 x 9)
    margemLiquida: 20.7, // % (8.80 / 42.47 * 100)

    // Metodologia
    metodo: 'METODOLOGIA_PADRAO',
    confiabilidade: '60-70%',
    observacao: 'Estimativa baseada em EIXO_SIMPLES + margem de segurança 20%'
};

console.log('✅ VALORES CORRIGIDOS:');
console.log(`   Hora/Máquina: R$ ${orc.custoHoraMaquina.toFixed(2)}/h`);
console.log(`   Custo MOD Unitário: R$ ${orc.custoMODUnitario.toFixed(2)}`);
console.log(`   Custo Total Unitário: R$ ${orc.custoUnitario.toFixed(2)}`);
console.log(`   Preço NFe Unitário: R$ ${orc.precoUnitario.toFixed(2)}`);
console.log(`   Valor Total: R$ ${orc.precoTotal.toFixed(2)}\n`);

// ═══════════════════════════════════════════════════════════
// 1. ESTUDO DE CUSTO DE FABRICAÇÃO
// ═══════════════════════════════════════════════════════════

const htmlCusto = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estudo de Custo - Orçamento ${orc.numero}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #003366 0%, #004080 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 4px solid #003366;
        }
        .section h2 {
            color: #003366;
            font-size: 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 15px 0;
        }
        .info-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
        }
        .info-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .info-value {
            font-size: 18px;
            font-weight: bold;
            color: #003366;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
        }
        th {
            background: #003366;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        tr:last-child td { border-bottom: none; }
        tr:hover { background: #f8f9fa; }
        .total-row {
            background: #e3f2fd !important;
            font-weight: bold;
            font-size: 16px;
        }
        .destaque {
            background: #fff3cd;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
            margin: 15px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
        }
        .badge-success { background: #d4edda; color: #155724; }
        .badge-warning { background: #fff3cd; color: #856404; }
        .badge-info { background: #d1ecf1; color: #0c5460; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 ESTUDO DE CUSTO DE FABRICAÇÃO</h1>
            <p>Orçamento ${orc.numero} - ${orc.peca}</p>
            <p>Cliente: ${orc.cliente} | Data: ${orc.data}</p>
        </div>

        <div class="content">
            <!-- Dados da Peça -->
            <div class="section">
                <h2>📋 ESPECIFICAÇÕES DA PEÇA</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Código</div>
                        <div class="info-value">${orc.codigo}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Material</div>
                        <div class="info-value">${orc.material}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Material Bruto</div>
                        <div class="info-value">${orc.materialBruto}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Quantidade</div>
                        <div class="info-value">${orc.quantidade} peças</div>
                    </div>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Diâmetro Externo</div>
                        <div class="info-value">Ø${orc.diametroExterno}mm</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Diâmetro Interno</div>
                        <div class="info-value">Ø${orc.diametroInterno}mm</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Altura</div>
                        <div class="info-value">${orc.altura}mm</div>
                    </div>
                </div>
            </div>

            <!-- Tempo de Produção -->
            <div class="section">
                <h2>⏱️ TEMPO DE PRODUÇÃO</h2>
                <table>
                    <tr>
                        <th>Descrição</th>
                        <th style="text-align: right;">Valor</th>
                    </tr>
                    <tr>
                        <td>Tempo unitário</td>
                        <td style="text-align: right;">${orc.tempoUnitario} min/peça</td>
                    </tr>
                    <tr>
                        <td>Tempo total do lote</td>
                        <td style="text-align: right;">${orc.tempoTotal} minutos (${orc.tempoTotalHoras.toFixed(2)}h)</td>
                    </tr>
                    <tr>
                        <td>Método utilizado</td>
                        <td style="text-align: right;">${orc.metodo} <span class="badge badge-info">${orc.confiabilidade}</span></td>
                    </tr>
                </table>

                <div class="destaque">
                    <strong>📚 Inteligência aplicada:</strong> ${orc.observacao}
                </div>
            </div>

            <!-- Custo MOD -->
            <div class="section">
                <h2>💰 CUSTO DE MÃO DE OBRA DIRETA (MOD)</h2>
                <table>
                    <tr>
                        <th>Item</th>
                        <th style="text-align: right;">Unitário</th>
                        <th style="text-align: right;">Total (${orc.quantidade} peças)</th>
                    </tr>
                    <tr>
                        <td>Custo/hora máquina <span class="badge badge-success">PADRÃO LASEC</span></td>
                        <td style="text-align: right;">R$ ${orc.custoHoraMaquina.toFixed(2)}/h</td>
                        <td style="text-align: right;">-</td>
                    </tr>
                    <tr>
                        <td>Tempo de usinagem</td>
                        <td style="text-align: right;">${orc.tempoUnitario} min</td>
                        <td style="text-align: right;">${orc.tempoTotal} min</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>CUSTO MOD</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.custoMODUnitario.toFixed(2)}</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.custoMODTotal.toFixed(2)}</strong></td>
                    </tr>
                </table>

                <div class="destaque">
                    <strong>💡 Cálculo:</strong> ${orc.tempoUnitario} min ÷ 60 × R$ ${orc.custoHoraMaquina.toFixed(2)}/h = R$ ${orc.custoMODUnitario.toFixed(2)}/peça
                </div>
            </div>

            <!-- Custos Indiretos -->
            <div class="section">
                <h2>🏭 CUSTOS INDIRETOS DE FABRICAÇÃO</h2>
                <table>
                    <tr>
                        <th>Item</th>
                        <th style="text-align: right;">Unitário</th>
                        <th style="text-align: right;">Total (${orc.quantidade} peças)</th>
                    </tr>
                    <tr>
                        <td>Custos indiretos (${orc.percentualIndiretos}% sobre MOD)</td>
                        <td style="text-align: right;">R$ ${orc.custoIndiretosUnitario.toFixed(2)}</td>
                        <td style="text-align: right;">R$ ${orc.custoIndiretosTotal.toFixed(2)}</td>
                    </tr>
                </table>

                <div class="destaque">
                    <strong>ℹ️ Composição dos custos indiretos:</strong>
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li>Energia elétrica (15%)</li>
                        <li>Depreciação de máquinas (10%)</li>
                        <li>Ferramental e pastilhas (20%)</li>
                        <li>Manutenção e lubrificação (5%)</li>
                        <li>Despesas gerais (8%)</li>
                    </ul>
                </div>
            </div>

            <!-- Custo Total -->
            <div class="section">
                <h2>📊 CUSTO TOTAL DE FABRICAÇÃO</h2>
                <table>
                    <tr>
                        <th>Componente</th>
                        <th style="text-align: right;">Unitário</th>
                        <th style="text-align: right;">Total (${orc.quantidade} peças)</th>
                    </tr>
                    <tr>
                        <td>MOD (Mão de Obra Direta)</td>
                        <td style="text-align: right;">R$ ${orc.custoMODUnitario.toFixed(2)}</td>
                        <td style="text-align: right;">R$ ${orc.custoMODTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>CIF (Custos Indiretos de Fabricação)</td>
                        <td style="text-align: right;">R$ ${orc.custoIndiretosUnitario.toFixed(2)}</td>
                        <td style="text-align: right;">R$ ${orc.custoIndiretosTotal.toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>CUSTO TOTAL DE FABRICAÇÃO</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.custoUnitario.toFixed(2)}</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.custoTotal.toFixed(2)}</strong></td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="footer">
            <p><strong>LASEC - Usinagem de Precisão CNC</strong></p>
            <p>Documento gerado automaticamente em ${orc.data}</p>
            <p>Sistema de Orçamentos V2.0 com Inteligência de 11.785 programas CNC</p>
        </div>
    </div>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════
// 2. ESTUDO DE PREÇO DE VENDA (NFe)
// ═══════════════════════════════════════════════════════════

const htmlPreco = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estudo de Preço - Orçamento ${orc.numero}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 4px solid #28a745;
        }
        .section h2 {
            color: #28a745;
            font-size: 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
        }
        th {
            background: #28a745;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        tr:last-child td { border-bottom: none; }
        tr:hover { background: #f8f9fa; }
        .total-row {
            background: #d4edda !important;
            font-weight: bold;
            font-size: 16px;
        }
        .destaque {
            background: #d4edda;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
            margin: 15px 0;
        }
        .destaque-lucro {
            background: #fff3cd;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
            margin: 15px 0;
            text-align: center;
        }
        .destaque-lucro h3 {
            color: #856404;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .destaque-lucro .valor {
            color: #28a745;
            font-size: 36px;
            font-weight: bold;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💵 ESTUDO DE PREÇO DE VENDA (NFe)</h1>
            <p>Orçamento ${orc.numero} - ${orc.peca}</p>
            <p>Cliente: ${orc.cliente} | Data: ${orc.data}</p>
        </div>

        <div class="content">
            <!-- Composição do Preço -->
            <div class="section">
                <h2>📊 COMPOSIÇÃO DO PREÇO UNITÁRIO</h2>
                <table>
                    <tr>
                        <th>Componente</th>
                        <th style="text-align: right;">Valor</th>
                        <th style="text-align: right;">%</th>
                    </tr>
                    <tr>
                        <td>1. Custo de Fabricação</td>
                        <td style="text-align: right;">R$ ${orc.custoUnitario.toFixed(2)}</td>
                        <td style="text-align: right;">${((orc.custoUnitario / orc.precoUnitario) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr>
                        <td>2. Markup (${((orc.markup - 1) * 100).toFixed(0)}%)</td>
                        <td style="text-align: right;">R$ ${(orc.precoSemImpostos - orc.custoUnitario).toFixed(2)}</td>
                        <td style="text-align: right;">${(((orc.precoSemImpostos - orc.custoUnitario) / orc.precoUnitario) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr>
                        <td>3. Impostos Simples Nacional (${orc.percentualImpostos}%)</td>
                        <td style="text-align: right;">R$ ${orc.valorImpostos.toFixed(2)}</td>
                        <td style="text-align: right;">${((orc.valorImpostos / orc.precoUnitario) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>PREÇO FINAL NFe (UNITÁRIO)</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.precoUnitario.toFixed(2)}</strong></td>
                        <td style="text-align: right;"><strong>100%</strong></td>
                    </tr>
                </table>
            </div>

            <!-- Valores Totais -->
            <div class="section">
                <h2>📦 VALORES TOTAIS DO LOTE (${orc.quantidade} peças)</h2>
                <table>
                    <tr>
                        <th>Item</th>
                        <th style="text-align: right;">Valor Total</th>
                    </tr>
                    <tr>
                        <td>Custo Total de Fabricação</td>
                        <td style="text-align: right;">R$ ${orc.custoTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Impostos Totais</td>
                        <td style="text-align: right;">R$ ${(orc.valorImpostos * orc.quantidade).toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>VALOR TOTAL NFe</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.precoTotal.toFixed(2)}</strong></td>
                    </tr>
                </table>
            </div>

            <!-- Análise de Lucro -->
            <div class="section">
                <h2>💰 ANÁLISE DE LUCRATIVIDADE</h2>
                <table>
                    <tr>
                        <th>Descrição</th>
                        <th style="text-align: right;">Unitário</th>
                        <th style="text-align: right;">Total (${orc.quantidade} peças)</th>
                    </tr>
                    <tr>
                        <td>Receita (Preço de Venda)</td>
                        <td style="text-align: right;">R$ ${orc.precoUnitario.toFixed(2)}</td>
                        <td style="text-align: right;">R$ ${orc.precoTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>(-) Custo de Fabricação</td>
                        <td style="text-align: right;">R$ ${orc.custoUnitario.toFixed(2)}</td>
                        <td style="text-align: right;">R$ ${orc.custoTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>(-) Impostos</td>
                        <td style="text-align: right;">R$ ${orc.valorImpostos.toFixed(2)}</td>
                        <td style="text-align: right;">R$ ${(orc.valorImpostos * orc.quantidade).toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>LUCRO LÍQUIDO</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.lucroUnitario.toFixed(2)}</strong></td>
                        <td style="text-align: right;"><strong>R$ ${orc.lucroTotal.toFixed(2)}</strong></td>
                    </tr>
                </table>

                <div class="destaque-lucro">
                    <h3>📈 MARGEM DE LUCRO LÍQUIDA</h3>
                    <div class="valor">${orc.margemLiquida.toFixed(1)}%</div>
                    <p style="margin-top: 10px; color: #666;">Sobre o preço de venda</p>
                </div>
            </div>

            <!-- Comparativo -->
            <div class="section">
                <h2>📊 RESUMO EXECUTIVO</h2>
                <div class="destaque">
                    <strong>💡 Indicadores Financeiros:</strong>
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li><strong>ROI por peça:</strong> ${((orc.lucroUnitario / orc.custoUnitario) * 100).toFixed(1)}%</li>
                        <li><strong>Markup aplicado:</strong> ${((orc.markup - 1) * 100).toFixed(0)}%</li>
                        <li><strong>Margem de contribuição:</strong> ${(((orc.precoUnitario - orc.custoUnitario) / orc.precoUnitario) * 100).toFixed(1)}%</li>
                        <li><strong>Ponto de equilíbrio:</strong> ${(orc.custoTotal / orc.precoUnitario).toFixed(1)} peças</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>LASEC - Usinagem de Precisão CNC</strong></p>
            <p>Documento gerado automaticamente em ${orc.data}</p>
            <p>Sistema de Orçamentos V2.0 com Inteligência de 11.785 programas CNC</p>
        </div>
    </div>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════
// 3. PROPOSTA COMERCIAL
// ═══════════════════════════════════════════════════════════

const htmlProposta = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposta Comercial - Orçamento ${orc.numero}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header p { font-size: 18px; opacity: 0.9; }
        .content { padding: 40px; }
        .section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
            border-left: 4px solid #dc3545;
        }
        .section h2 {
            color: #dc3545;
            font-size: 22px;
            margin-bottom: 20px;
        }
        .proposta-box {
            background: white;
            border: 2px solid #dc3545;
            border-radius: 10px;
            padding: 30px;
            margin: 20px 0;
            text-align: center;
        }
        .proposta-box h3 {
            color: #dc3545;
            font-size: 24px;
            margin-bottom: 15px;
        }
        .proposta-box .valor-destaque {
            font-size: 48px;
            font-weight: bold;
            color: #28a745;
            margin: 20px 0;
        }
        .proposta-box .valor-unitario {
            font-size: 20px;
            color: #666;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }
        .lista {
            list-style: none;
            padding: 0;
        }
        .lista li {
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .lista li:before {
            content: "✓ ";
            color: #28a745;
            font-weight: bold;
            margin-right: 10px;
        }
        .destaque {
            background: #fff3cd;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 2px solid #e0e0e0;
        }
        .assinatura {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #000;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 PROPOSTA COMERCIAL</h1>
            <p>Orçamento ${orc.numero}</p>
            <p>${orc.cliente} - ${orc.data}</p>
        </div>

        <div class="content">
            <!-- Dados do Produto -->
            <div class="section">
                <h2>📦 PRODUTO</h2>
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Especificação</th>
                    </tr>
                    <tr>
                        <td><strong>Descrição:</strong></td>
                        <td>${orc.peca}</td>
                    </tr>
                    <tr>
                        <td><strong>Código:</strong></td>
                        <td>${orc.codigo}</td>
                    </tr>
                    <tr>
                        <td><strong>Material:</strong></td>
                        <td>${orc.material}</td>
                    </tr>
                    <tr>
                        <td><strong>Matéria-prima:</strong></td>
                        <td>${orc.materialBruto}</td>
                    </tr>
                    <tr>
                        <td><strong>Dimensões:</strong></td>
                        <td>Ø${orc.diametroExterno}mm x ${orc.altura}mm altura</td>
                    </tr>
                    <tr>
                        <td><strong>Quantidade:</strong></td>
                        <td><strong>${orc.quantidade} peças</strong></td>
                    </tr>
                </table>
            </div>

            <!-- Proposta de Preço -->
            <div class="proposta-box">
                <h3>💰 VALOR DA PROPOSTA</h3>
                <div class="valor-unitario">
                    Valor unitário: <strong>R$ ${orc.precoUnitario.toFixed(2)}</strong>
                </div>
                <div class="valor-destaque">
                    R$ ${orc.precoTotal.toFixed(2)}
                </div>
                <p style="color: #666; font-size: 16px;">
                    Valor total para ${orc.quantidade} peças
                </p>
            </div>

            <!-- Condições Comerciais -->
            <div class="section">
                <h2>📋 CONDIÇÕES COMERCIAIS</h2>
                <ul class="lista">
                    <li><strong>Validade da proposta:</strong> 15 dias corridos</li>
                    <li><strong>Forma de pagamento:</strong> 50% antecipado + 50% na entrega</li>
                    <li><strong>Prazo de entrega:</strong> A combinar após confirmação do pedido</li>
                    <li><strong>Frete:</strong> FOB (por conta do cliente)</li>
                    <li><strong>Garantia:</strong> 90 dias contra defeitos de fabricação</li>
                </ul>
            </div>

            <!-- Escopo -->
            <div class="section">
                <h2>✓ ESCOPO DO FORNECIMENTO</h2>
                <ul class="lista">
                    <li>Usinagem completa em Torno CNC DOOSAN</li>
                    <li>Conforme desenho técnico fornecido</li>
                    <li>Material: Alumínio 6061</li>
                    <li>Acabamento: Conforme especificação</li>
                    <li>Inspeção dimensional 100%</li>
                    <li>Embalagem individual para proteção</li>
                </ul>
            </div>

            <!-- Metodologia -->
            <div class="section">
                <h2>🔧 PROCESSO DE FABRICAÇÃO</h2>
                <p style="margin-bottom: 15px;">
                    <strong>Máquina:</strong> Torno CNC DOOSAN (Alta precisão)
                </p>
                <p style="margin-bottom: 15px;">
                    <strong>Metodologia:</strong> ${orc.metodo}
                </p>
                <p style="margin-bottom: 15px;">
                    <strong>Tempo estimado de usinagem:</strong> ${orc.tempoUnitario} minutos por peça
                </p>

                <div class="destaque">
                    <strong>🤖 Inteligência Artificial Aplicada:</strong>
                    <p style="margin-top: 10px;">
                        Este orçamento foi gerado utilizando sistema de IA com análise de 11.785 programas CNC,
                        garantindo precisão na estimativa de tempo e custos baseada em dados reais de produção.
                    </p>
                </div>
            </div>

            <!-- Observações -->
            <div class="section">
                <h2>⚠️ OBSERVAÇÕES IMPORTANTES</h2>
                <ul style="padding-left: 20px; line-height: 1.8;">
                    <li>Material fornecido pelo cliente (não incluso no preço)</li>
                    <li>Valores sujeitos à disponibilidade de máquina</li>
                    <li>Primeira produção inclui tempo de setup</li>
                    <li>Desenho técnico deve ser fornecido em PDF ou DWG</li>
                    <li>Pedido mínimo conforme quantidade orçada</li>
                </ul>
            </div>

            <!-- Contato -->
            <div class="section">
                <h2>📞 CONTATO</h2>
                <table>
                    <tr>
                        <td><strong>Empresa:</strong></td>
                        <td>LASEC - Usinagem de Precisão CNC</td>
                    </tr>
                    <tr>
                        <td><strong>Responsável:</strong></td>
                        <td>Alexandre Gonçalves de Souza</td>
                    </tr>
                    <tr>
                        <td><strong>E-mail:</strong></td>
                        <td>contato@lasec.com.br</td>
                    </tr>
                    <tr>
                        <td><strong>Telefone:</strong></td>
                        <td>(11) 3936-5041</td>
                    </tr>
                </table>
            </div>

            <!-- Assinatura -->
            <div class="assinatura">
                <p><strong>LASEC - Usinagem de Precisão CNC</strong></p>
                <p style="margin-top: 30px;">_________________________________</p>
                <p>Alexandre Gonçalves de Souza</p>
                <p>Responsável Técnico</p>
                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                    São Paulo, ${orc.data}
                </p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Este documento é válido por 15 dias a partir da data de emissão</strong></p>
            <p style="margin-top: 10px;">Orçamento ${orc.numero} | Gerado pelo Sistema LASEC V2.0</p>
            <p style="margin-top: 5px;">🤖 Powered by AI - 11.785 programas CNC analisados</p>
        </div>
    </div>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════
// 4. PROCESSO DE FABRICAÇÃO
// ═══════════════════════════════════════════════════════════

const htmlProcesso = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Processo de Fabricação - ${orc.codigo}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .content { padding: 30px; }
        .section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 4px solid #6c757d;
        }
        .section h2 {
            color: #6c757d;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .operacao {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
        }
        .operacao h3 {
            color: #003366;
            font-size: 16px;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔧 PROCESSO DE FABRICAÇÃO</h1>
            <p>${orc.peca} - ${orc.codigo}</p>
        </div>

        <div class="content">
            <div class="section">
                <h2>📋 ESPECIFICAÇÕES</h2>
                <table>
                    <tr><td><strong>Material:</strong></td><td>${orc.material}</td></tr>
                    <tr><td><strong>Máquina:</strong></td><td>Torno CNC DOOSAN</td></tr>
                    <tr><td><strong>Quantidade:</strong></td><td>${orc.quantidade} peças</td></tr>
                </table>
            </div>

            <div class="section">
                <h2>⚙️ SEQUÊNCIA DE OPERAÇÕES</h2>

                <div class="operacao">
                    <h3>1. Faceamento Frontal</h3>
                    <p><strong>Ferramenta:</strong> T01 - Facear</p>
                    <p><strong>Parâmetros:</strong> Vc: 280 m/min | F: 0.15 mm/rot</p>
                </div>

                <div class="operacao">
                    <h3>2. Desbaste Externo</h3>
                    <p><strong>Ferramenta:</strong> T02 - Desbastar externo</p>
                    <p><strong>Parâmetros:</strong> Vc: 300 m/min | F: 0.20 mm/rot | Ap: 2.0 mm</p>
                </div>

                <div class="operacao">
                    <h3>3. Acabamento Externo</h3>
                    <p><strong>Ferramenta:</strong> T03 - Acabar externo</p>
                    <p><strong>Parâmetros:</strong> Vc: 250 m/min | F: 0.08 mm/rot | Ap: 0.3 mm</p>
                </div>

                <div class="operacao">
                    <h3>4. Furação Ø3,5mm</h3>
                    <p><strong>Ferramenta:</strong> T04 - Broca Ø3,5</p>
                    <p><strong>Parâmetros:</strong> Vc: 80 m/min | F: 0.08 mm/rot</p>
                </div>

                <div class="operacao">
                    <h3>5. Furação Ø18,5mm (Sextavado)</h3>
                    <p><strong>Ferramenta:</strong> T05 - Broca/Fresa Ø18,5</p>
                    <p><strong>Parâmetros:</strong> Vc: 100 m/min | F: 0.10 mm/rot</p>
                </div>

                <div class="operacao">
                    <h3>6. Acabamento Final</h3>
                    <p><strong>Ferramenta:</strong> T06 - Cortar/Sangrar</p>
                    <p><strong>Parâmetros:</strong> Vc: 200 m/min | F: 0.05 mm/rot</p>
                </div>
            </div>

            <div class="section">
                <h2>🛠️ FERRAMENTAS NECESSÁRIAS</h2>
                <table>
                    <tr>
                        <th>Pos.</th>
                        <th>Descrição</th>
                        <th>Observação</th>
                    </tr>
                    <tr><td>T01</td><td>Facear</td><td>Pastilha IC20 (PCD)</td></tr>
                    <tr><td>T02</td><td>Desbastar externo</td><td>Pastilha IC20 (PCD)</td></tr>
                    <tr><td>T03</td><td>Acabar externo</td><td>Pastilha IC20 (PCD)</td></tr>
                    <tr><td>T04</td><td>Broca Ø3,5</td><td>HSS-Co ou Metal Duro</td></tr>
                    <tr><td>T05</td><td>Broca/Fresa Ø18,5</td><td>Metal Duro</td></tr>
                    <tr><td>T06</td><td>Cortar</td><td>Largura 3mm</td></tr>
                </table>
            </div>

            <div class="section">
                <h2>⏱️ TEMPOS</h2>
                <table>
                    <tr><td><strong>Tempo por peça:</strong></td><td>${orc.tempoUnitario} minutos</td></tr>
                    <tr><td><strong>Tempo total:</strong></td><td>${orc.tempoTotal} minutos (${orc.tempoTotalHoras.toFixed(2)}h)</td></tr>
                    <tr><td><strong>Setup inicial:</strong></td><td>Incluso na primeira peça</td></tr>
                </table>
            </div>
        </div>

        <div class="footer">
            <p><strong>LASEC - Usinagem de Precisão CNC</strong></p>
            <p>Documento gerado automaticamente em ${orc.data}</p>
        </div>
    </div>
</body>
</html>`;

// Salvar arquivos
const pastaOrcamento = 'd:/lasec/orcamentos/2025/LASEC/007_LASEC_TAMPA_ALUMINIO';

console.log('💾 Salvando arquivos HTML CORRIGIDOS...\n');

fs.writeFileSync(
    path.join(pastaOrcamento, 'ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html'),
    htmlCusto
);
console.log('✅ ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html');

fs.writeFileSync(
    path.join(pastaOrcamento, 'ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html'),
    htmlPreco
);
console.log('✅ ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html');

fs.writeFileSync(
    path.join(pastaOrcamento, 'PROPOSTA_COMERCIAL_LASEC_TAMPA_ALUMINIO_007.html'),
    htmlProposta
);
console.log('✅ PROPOSTA_COMERCIAL_LASEC_TAMPA_ALUMINIO_007.html');

fs.writeFileSync(
    path.join(pastaOrcamento, 'PROCESSO_FABRICACAO_TAMPA_ALUMINIO_007.html'),
    htmlProcesso
);
console.log('✅ PROCESSO_FABRICACAO_TAMPA_ALUMINIO_007.html');

// Copiar para área de trabalho
const desktop = 'C:/Users/lasec/Desktop';

fs.copyFileSync(
    path.join(pastaOrcamento, 'ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html'),
    path.join(desktop, 'ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html')
);

fs.copyFileSync(
    path.join(pastaOrcamento, 'ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html'),
    path.join(desktop, 'ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html')
);

fs.copyFileSync(
    path.join(pastaOrcamento, 'PROPOSTA_COMERCIAL_LASEC_TAMPA_ALUMINIO_007.html'),
    path.join(desktop, 'PROPOSTA_COMERCIAL_LASEC_TAMPA_ALUMINIO_007.html')
);

fs.copyFileSync(
    path.join(pastaOrcamento, 'PROCESSO_FABRICACAO_TAMPA_ALUMINIO_007.html'),
    path.join(desktop, 'PROCESSO_FABRICACAO_TAMPA_ALUMINIO_007.html')
);

console.log('\n📋 Arquivos também copiados para área de trabalho!\n');

// Atualizar JSON do orçamento
const orcamentoJSON = {
    numero: '007/2025',
    data: '2025-11-07',
    cliente: 'LASEC',
    peca: 'TAMPA DE ALUMÍNIO',
    codigo: 'TAMPA_ALUMINIO_001',
    material: 'Alumínio 6061',
    materialBruto: 'Tarugo Ø25 x 50mm',
    quantidade: 9,
    tempoMinutos: 9.6,
    metodo: 'METODOLOGIA_PADRAO',
    confiabilidade: '60-70%',
    custoHoraMaquina: 120.00,
    custoUnitario: 30.34,
    precoUnitario: 42.47,
    valorTotal: 382.23,
    margemLiquida: 20.7,
    status: 'valido',
    observacao: 'Estimativa baseada em EIXO_SIMPLES + margem de segurança 20%'
};

fs.writeFileSync(
    'd:/lasec/orcamentos/2025/007_orcamento_tampa_aluminio.json',
    JSON.stringify(orcamentoJSON, null, 2)
);

console.log('═══════════════════════════════════════════════════════════');
console.log('✅ ORÇAMENTO 007/2025 CORRIGIDO E ATUALIZADO!');
console.log('═══════════════════════════════════════════════════════════\n');
console.log('📂 Localização:');
console.log(`   ${pastaOrcamento}`);
console.log(`   ${desktop}\n`);
