// ═══════════════════════════════════════════════════════════
// ORÇAMENTO 007/2025 - TAMPA DE ALUMÍNIO
// Cliente: LASEC | Máquina: Doosan Lynx 220 LM
// Preço/Hora: R$ 190,00 | Imposto: 10%
// Formato: COMPLETO igual orçamentos 001, 002, 006
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════');
console.log('📄 ORÇAMENTO 007/2025 - FORMATO COMPLETO');
console.log('═══════════════════════════════════════════════════════════\n');

// ═════════════════════════════════════════════════════════
// CÁLCULOS DO ORÇAMENTO
// ═════════════════════════════════════════════════════════

const orc = {
    numero: '007/2025',
    data: '07/11/2025',
    cliente: 'LASEC',
    clienteCompleto: 'LASEC - Usinagem de Precisão CNC',
    peca: 'TAMPA DE ALUMÍNIO',
    codigo: 'TAMPA_ALUMINIO_001',
    material: 'Alumínio 6061',
    materialBruto: 'Tarugo Ø25 x 50mm',
    quantidade: 9,

    // Dimensões
    diametroExt: 88,
    diametroInt: 69.2,
    altura: 54,

    // Máquina
    maquina: 'Doosan Lynx 220 LM',
    tipoMaquina: 'Torno CNC com Ferramenta Acionada',

    // Tempo
    tempoMin: 9.6,
    tempoHoras: 0.16,  // 9.6 / 60
    tempoTotalMin: 86.4,  // 9.6 * 9
    tempoTotalHoras: 1.44,  // 86.4 / 60

    // Custos
    custoHoraMaquina: 190.00,  // R$/h (CORRETO - Torno ferramenta acionada)
    custoMOD: 30.40,  // 190 * 0.16
    custoIndiretos: 17.63,  // 30.40 * 0.58
    custoTotal: 48.03,  // 30.40 + 17.63
    custoTotalLote: 432.27,  // 48.03 * 9

    // Preços
    markup: 1.29,
    impostos: 10.0,
    precoSemImpostos: 61.96,  // 48.03 * 1.29
    valorImpostos: 6.20,  // 61.96 * 0.10
    precoFinal: 68.16,  // 61.96 + 6.20
    precoTotalLote: 613.44,  // 68.16 * 9

    // Lucro
    lucroUnitario: 13.93,  // 68.16 - 48.03 - 6.20
    lucroTotal: 125.37,  // 13.93 * 9
    margemLiquida: 20.4,  // (13.93 / 68.16) * 100
};

console.log('📊 VALORES CALCULADOS:');
console.log(`   Máquina: ${orc.maquina} (${orc.tipoMaquina})`);
console.log(`   R$/Hora: R$ ${orc.custoHoraMaquina.toFixed(2)}`);
console.log(`   Tempo: ${orc.tempoMin} min/peça`);
console.log(`   Custo Total: R$ ${orc.custoTotal.toFixed(2)}`);
console.log(`   Preço NFe: R$ ${orc.precoFinal.toFixed(2)}`);
console.log(`   Valor Total: R$ ${orc.precoTotalLote.toFixed(2)}\n`);

// ═════════════════════════════════════════════════════════
// HTML 1: ESTUDO DE CUSTO DE FABRICAÇÃO
// ═════════════════════════════════════════════════════════

const htmlCusto = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Estudo de Custo 007/2025</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1 { color: #003366; border-bottom: 3px solid #003366; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #003366; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .total { background: #f0f0f0; font-weight: bold; font-size: 16px; }
        .badge { background: #ffc107; color: #333; padding: 3px 8px; border-radius: 3px; font-size: 11px; }
        .info-box { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>ESTUDO DE CUSTO DE FABRICAÇÃO <span class="badge">ESTIMATIVA</span></h1>
    <p><strong>Orçamento:</strong> ${orc.numero} | <strong>Cliente:</strong> ${orc.cliente} | <strong>Peça:</strong> ${orc.codigo}</p>

    <h3>1. ESPECIFICAÇÕES DA PEÇA</h3>
    <table>
        <tr><th>Item</th><th>Especificação</th></tr>
        <tr><td>Código/PN</td><td>${orc.codigo}</td></tr>
        <tr><td>Descrição</td><td>${orc.peca}</td></tr>
        <tr><td>Cliente</td><td>${orc.clienteCompleto}</td></tr>
        <tr><td>Material</td><td>${orc.material}</td></tr>
        <tr><td>Material bruto</td><td>${orc.materialBruto}</td></tr>
        <tr><td>Dimensões principais</td><td>Ø${orc.diametroExt}mm x ${orc.altura}mm altura</td></tr>
        <tr><td>Diâmetro interno</td><td>Ø${orc.diametroInt}mm</td></tr>
        <tr><td>Furos</td><td>2x Ø3,5mm + 1x Ø18,5mm (sextavado)</td></tr>
        <tr><td>Quantidade</td><td><strong>${orc.quantidade} peças</strong></td></tr>
    </table>

    <h3>2. TEMPO DE USINAGEM</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Tempo de usinagem estimado</td><td><strong>${orc.tempoMin} min/peça</strong> (${orc.tempoHoras.toFixed(4)} h)</td></tr>
        <tr><td>Tempo total do lote (${orc.quantidade} peças)</td><td>${orc.tempoTotalMin} minutos (${orc.tempoTotalHoras.toFixed(2)} horas)</td></tr>
        <tr><td>Máquina utilizada</td><td><strong>${orc.maquina}</strong></td></tr>
        <tr><td>Tipo de máquina</td><td>${orc.tipoMaquina}</td></tr>
        <tr><td>Método de cálculo</td><td>Biblioteca CNC (11.785 programas) + EIXO_SIMPLES</td></tr>
        <tr><td>Confiabilidade</td><td>60-70%</td></tr>
    </table>

    <div class="info-box">
        <strong>ℹ️ Sobre a estimativa de tempo:</strong><br>
        Tempo estimado com base em análise de peças similares em alumínio da biblioteca CNC LASEC.
        Inclui margem de segurança de 20%. <strong>Confiabilidade: 60-70%</strong>. Para maior precisão,
        recomenda-se validação com peça piloto e cronometragem real.
    </div>

    <h3>3. COMPOSIÇÃO DE CUSTOS</h3>
    <table>
        <tr><th>Item</th><th>Base de Cálculo</th><th>Valor Unitário</th></tr>
        <tr>
            <td><strong>Custo hora/máquina</strong></td>
            <td>Pesquisa GRV 2024 + Análise Técnica</td>
            <td><strong>R$ ${orc.custoHoraMaquina.toFixed(2)}/hora</strong></td>
        </tr>
        <tr>
            <td>MOD (Mão de Obra Direta)</td>
            <td>R$ ${orc.custoHoraMaquina.toFixed(2)}/h × ${orc.tempoHoras.toFixed(4)} h</td>
            <td>R$ ${orc.custoMOD.toFixed(2)}</td></tr>
        <tr>
            <td>Custos Indiretos de Fabricação (58%)</td>
            <td>58% sobre MOD</td>
            <td>R$ ${orc.custoIndiretos.toFixed(2)}</td>
        </tr>
        <tr class="total">
            <td colspan="2"><strong>CUSTO TOTAL UNITÁRIO</strong></td>
            <td><strong>R$ ${orc.custoTotal.toFixed(2)}</strong></td>
        </tr>
    </table>

    <div class="info-box">
        <strong>📊 Composição dos Custos Indiretos (58% sobre MOD):</strong>
        <ul style="margin: 10px 0;">
            <li>Energia elétrica: 15%</li>
            <li>Depreciação de máquinas: 10%</li>
            <li>Ferramental e pastilhas: 20%</li>
            <li>Manutenção e lubrificação: 5%</li>
            <li>Despesas gerais rateadas: 8%</li>
        </ul>
        <p style="margin-top: 10px;"><strong>Nota:</strong> Percentual baseado em custos históricos da LASEC e padrões do setor.</p>
    </div>

    <h3>4. TOTAIS DO LOTE</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Custo unitário</td><td>R$ ${orc.custoTotal.toFixed(2)}/peça</td></tr>
        <tr><td>Quantidade</td><td>${orc.quantidade} peças</td></tr>
        <tr><td>Tempo total do lote</td><td>${orc.tempoTotalMin} minutos (${orc.tempoTotalHoras.toFixed(2)} horas)</td></tr>
        <tr class="total"><td><strong>CUSTO TOTAL DO LOTE</strong></td><td><strong>R$ ${orc.custoTotalLote.toFixed(2)}</strong></td></tr>
    </table>

    <h3>5. OBSERVAÇÕES TÉCNICAS</h3>
    <div class="info-box">
        <p><strong>Máquina utilizada:</strong> ${orc.maquina} - ${orc.tipoMaquina}</p>
        <p><strong>Justificativa da máquina:</strong> Peça requer furação radial (Ø3,5mm e Ø18,5mm), operação que
        necessita de ferramenta acionada. O Doosan Lynx 220 LM possui esta capacidade, eliminando necessidade
        de 2ª operação em centro de usinagem.</p>
        <p><strong>Custo hora/máquina:</strong> R$ 190,00/h baseado em equiparação com Centro de Usinagem 3 Eixos
        (R$ 189,78 - GRV 2024) devido à complexidade similar e versatilidade do equipamento.</p>
    </div>

    <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        <strong>LASEC - Usinagem de Precisão CNC</strong><br>
        Rua Álvaro Silva, 233 - São Paulo/SP | Tel: (11) 3936-5041<br>
        Documento gerado em ${orc.data} | Sistema LASEC V2.0 com IA
    </p>
</body>
</html>`;

// ═════════════════════════════════════════════════════════
// HTML 2: ESTUDO DE PREÇO DE VENDA (NFe)
// ═════════════════════════════════════════════════════════

const htmlPreco = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Estudo de Preço 007/2025</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1 { color: #28a745; border-bottom: 3px solid #28a745; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #28a745; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .total { background: #d4edda; font-weight: bold; font-size: 16px; }
        .lucro-box { background: #fff3cd; padding: 25px; text-align: center; margin: 20px 0; border-left: 4px solid #ffc107; }
        .lucro-box h2 { color: #856404; margin: 0 0 15px 0; }
        .lucro-box .valor { font-size: 42px; color: #28a745; font-weight: bold; }
        .info-box { background: #e7f3ff; padding: 15px; border-left: 4px solid #2196f3; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>ESTUDO DE PREÇO DE VENDA (NFe)</h1>
    <p><strong>Orçamento:</strong> ${orc.numero} | <strong>Cliente:</strong> ${orc.cliente} | <strong>Peça:</strong> ${orc.codigo}</p>

    <h3>1. COMPOSIÇÃO DO PREÇO UNITÁRIO</h3>
    <table>
        <tr><th>Componente</th><th>Valor</th><th>% do Preço</th></tr>
        <tr>
            <td>1. Custo de Fabricação</td>
            <td>R$ ${orc.custoTotal.toFixed(2)}</td>
            <td>${((orc.custoTotal / orc.precoFinal) * 100).toFixed(1)}%</td>
        </tr>
        <tr>
            <td>2. Markup (${((orc.markup - 1) * 100).toFixed(0)}% sobre custo)</td>
            <td>R$ ${(orc.precoSemImpostos - orc.custoTotal).toFixed(2)}</td>
            <td>${(((orc.precoSemImpostos - orc.custoTotal) / orc.precoFinal) * 100).toFixed(1)}%</td>
        </tr>
        <tr>
            <td>3. Impostos Simples Nacional (${orc.impostos}%)</td>
            <td>R$ ${orc.valorImpostos.toFixed(2)}</td>
            <td>${((orc.valorImpostos / orc.precoFinal) * 100).toFixed(1)}%</td>
        </tr>
        <tr class="total">
            <td><strong>PREÇO FINAL NFe (UNITÁRIO)</strong></td>
            <td><strong>R$ ${orc.precoFinal.toFixed(2)}</strong></td>
            <td><strong>100%</strong></td>
        </tr>
    </table>

    <div class="info-box">
        <strong>ℹ️ Sobre o Markup:</strong><br>
        Markup de ${((orc.markup - 1) * 100).toFixed(0)}% aplicado para cobrir despesas comerciais, comissões e margem de lucro.
        Este é o markup reduzido, adequado para manter competitividade no mercado.
    </div>

    <h3>2. VALORES TOTAIS DO LOTE (${orc.quantidade} peças)</h3>
    <table>
        <tr><th>Item</th><th>Valor Total</th></tr>
        <tr><td>Custo Total de Fabricação</td><td>R$ ${orc.custoTotalLote.toFixed(2)}</td></tr>
        <tr><td>Impostos Totais (${orc.impostos}%)</td><td>R$ ${(orc.valorImpostos * orc.quantidade).toFixed(2)}</td></tr>
        <tr class="total"><td><strong>VALOR TOTAL NFe</strong></td><td><strong>R$ ${orc.precoTotalLote.toFixed(2)}</strong></td></tr>
    </table>

    <h3>3. ANÁLISE DE LUCRATIVIDADE</h3>
    <table>
        <tr><th>Descrição</th><th>Unitário</th><th>Total (${orc.quantidade} peças)</th></tr>
        <tr><td>Receita (Preço de Venda)</td><td>R$ ${orc.precoFinal.toFixed(2)}</td><td>R$ ${orc.precoTotalLote.toFixed(2)}</td></tr>
        <tr><td>(-) Custo de Fabricação</td><td>R$ ${orc.custoTotal.toFixed(2)}</td><td>R$ ${orc.custoTotalLote.toFixed(2)}</td></tr>
        <tr><td>(-) Impostos</td><td>R$ ${orc.valorImpostos.toFixed(2)}</td><td>R$ ${(orc.valorImpostos * orc.quantidade).toFixed(2)}</td></tr>
        <tr class="total"><td><strong>LUCRO LÍQUIDO</strong></td><td><strong>R$ ${orc.lucroUnitario.toFixed(2)}</strong></td><td><strong>R$ ${orc.lucroTotal.toFixed(2)}</strong></td></tr>
    </table>

    <div class="lucro-box">
        <h2>📈 MARGEM DE LUCRO LÍQUIDA</h2>
        <div class="valor">${orc.margemLiquida.toFixed(1)}%</div>
        <p style="color: #666; margin-top: 12px; font-size: 14px;">Sobre o preço de venda</p>
    </div>

    <h3>4. INDICADORES FINANCEIROS</h3>
    <table>
        <tr><th>Indicador</th><th>Valor</th><th>Interpretação</th></tr>
        <tr>
            <td>ROI (Retorno sobre Custo)</td>
            <td>${((orc.lucroUnitario / orc.custoTotal) * 100).toFixed(1)}%</td>
            <td>Para cada R$ 1,00 investido, retorna R$ ${(1 + (orc.lucroUnitario / orc.custoTotal)).toFixed(2)}</td>
        </tr>
        <tr>
            <td>Markup aplicado</td>
            <td>${((orc.markup - 1) * 100).toFixed(0)}%</td>
            <td>Coeficiente multiplicador: ${orc.markup.toFixed(2)}x</td>
        </tr>
        <tr>
            <td>Margem de Contribuição</td>
            <td>${(((orc.precoFinal - orc.custoTotal) / orc.precoFinal) * 100).toFixed(1)}%</td>
            <td>Cobre impostos e gera ${orc.margemLiquida.toFixed(1)}% de lucro líquido</td>
        </tr>
        <tr>
            <td>Ponto de Equilíbrio</td>
            <td>${(orc.custoTotalLote / orc.precoFinal).toFixed(1)} peças</td>
            <td>Necessário vender ${Math.ceil(orc.custoTotalLote / orc.precoFinal)} peças para cobrir custos</td>
        </tr>
    </table>

    <div class="info-box">
        <strong>💡 Comparativo com Mercado:</strong><br>
        <ul style="margin: 10px 0;">
            <li><strong>Custo hora/máquina LASEC:</strong> R$ 190,00/h (Torno CNC com ferramenta acionada)</li>
            <li><strong>Média mercado GRV 2024:</strong> R$ 189,78/h (Centro Usinagem 3 eixos - complexidade similar)</li>
            <li><strong>Posicionamento:</strong> Alinhado com média de mercado da Grande São Paulo</li>
            <li><strong>Margem líquida:</strong> ${orc.margemLiquida.toFixed(1)}% (saudável para o setor)</li>
        </ul>
    </div>

    <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        <strong>LASEC - Usinagem de Precisão CNC</strong><br>
        Rua Álvaro Silva, 233 - São Paulo/SP | Tel: (11) 3936-5041<br>
        Documento gerado em ${orc.data} | Sistema LASEC V2.0
    </p>
</body>
</html>`;

// Salvar arquivos na pasta do orçamento
const pastaOrcamento = 'd:/lasec/orcamentos/2025/LASEC/007_LASEC_TAMPA_ALUMINIO';

fs.writeFileSync(path.join(pastaOrcamento, 'ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html'), htmlCusto);
console.log('✅ ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html');

fs.writeFileSync(path.join(pastaOrcamento, 'ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html'), htmlPreco);
console.log('✅ ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html');

// Copiar para desktop
const desktop = 'C:/Users/lasec/Desktop';
fs.copyFileSync(
    path.join(pastaOrcamento, 'ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html'),
    path.join(desktop, 'ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html')
);
fs.copyFileSync(
    path.join(pastaOrcamento, 'ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html'),
    path.join(desktop, 'ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html')
);

console.log('\n📋 Arquivos copiados para Desktop!');

// Atualizar JSON
const orcJSON = {
    numero: '007/2025',
    data: '2025-11-07',
    cliente: 'LASEC',
    peca: 'TAMPA DE ALUMÍNIO',
    codigo: 'TAMPA_ALUMINIO_001',
    material: 'Alumínio 6061',
    materialBruto: 'Tarugo Ø25 x 50mm',
    quantidade: 9,
    maquina: 'Doosan Lynx 220 LM',
    tipoMaquina: 'Torno CNC com Ferramenta Acionada',
    tempoMinutos: 9.6,
    custoHoraMaquina: 190.00,
    custoUnitario: 48.03,
    precoUnitario: 68.16,
    valorTotal: 613.44,
    margemLiquida: 20.4,
    impostos: 10.0,
    status: 'valido',
    metodo: 'METODOLOGIA_PADRAO',
    confiabilidade: '60-70%',
    observacao: 'Estimativa baseada em EIXO_SIMPLES + margem 20% | R$ 190/h (ferramenta acionada)'
};

fs.writeFileSync(
    'd:/lasec/orcamentos/2025/007_orcamento_tampa_aluminio.json',
    JSON.stringify(orcJSON, null, 2)
);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ORÇAMENTO 007/2025 COMPLETO - R$ 190/h');
console.log('═══════════════════════════════════════════════════════════\n');
console.log('💰 RESUMO FINANCEIRO:');
console.log(`   Custo: R$ ${orc.custoTotal.toFixed(2)}/peça`);
console.log(`   Preço NFe: R$ ${orc.precoFinal.toFixed(2)}/peça`);
console.log(`   Total (${orc.quantidade} peças): R$ ${orc.precoTotalLote.toFixed(2)}`);
console.log(`   Margem: ${orc.margemLiquida.toFixed(1)}%`);
console.log(`   Imposto: ${orc.impostos}%\n`);

console.log('📄 PRÓXIMOS DOCUMENTOS:');
console.log('   - Proposta Comercial (aguardando geração)');
console.log('   - Processo de Fabricação (aguardando geração)\n');
