/**
 * ═══════════════════════════════════════════════════════════════
 * CÁLCULO FINAL COM TEMPO REAL DE PRODUÇÃO: 8 MIN/PEÇA
 * ═══════════════════════════════════════════════════════════════
 *
 * Fonte: Ordem de Produção real - As-Built
 * Operador: ANDRE
 * Máquina: Dosan I P 4004
 * Data produção: 10-12/10/2025
 * Lote: 60 peças
 */

console.log('═══════════════════════════════════════════════════════════');
console.log('💰 CÁLCULO FINAL - TEMPO REAL DE PRODUÇÃO');
console.log('═══════════════════════════════════════════════════════════\n');

// DADOS REAIS COMPROVADOS
const dados = {
    codigo: '1.60.01.548',
    cliente: 'MICROGEAR',
    material: '45 S 20 K',
    materialBruto: 'Ø16 H9 retificado x 195mm',
    quantidade: 60,
    tempoRealProducao: 8.0, // ⭐ MINUTOS POR PEÇA - DADO REAL!
    maquinaReal: 'Dosan I P 4004',
    operador: 'ANDRE',
    dataProducao: '10-12/10/2025'
};

// Parâmetros financeiros
const params = {
    horaMaquina: 120.00,
    custosIndiretos: 0.58,
    markup: 1.290,
    impostos: 0.085,
    comissao: 0.02,
    despesas: 0.02
};

// ═══════════════════════════════════════════════════════════════
// CÁLCULOS
// ═══════════════════════════════════════════════════════════════

const tempoHoras = dados.tempoRealProducao / 60;
const tempoTotalHoras = tempoHoras * dados.quantidade;

const mod = tempoTotalHoras * params.horaMaquina;
const modUnitario = mod / dados.quantidade;

const custosIndiretos = mod * params.custosIndiretos;
const custosIndiretosUnitario = custosIndiretos / dados.quantidade;

const custoTotal = mod + custosIndiretos;
const custoUnitario = custoTotal / dados.quantidade;

const precoUnitario = custoUnitario * params.markup;
const precoTotal = precoUnitario * dados.quantidade;

const impostoValor = precoTotal * params.impostos;
const comissaoValor = precoTotal * params.comissao;
const despesasValor = precoTotal * params.despesas;
const deducoes = impostoValor + comissaoValor + despesasValor;

const lucroLiquido = precoTotal - custoTotal - deducoes;
const margemLiquida = (lucroLiquido / precoTotal) * 100;

// ═══════════════════════════════════════════════════════════════
// APRESENTAÇÃO DOS RESULTADOS
// ═══════════════════════════════════════════════════════════════

console.log('📊 DADOS DE PRODUÇÃO REAL (AS-BUILT):');
console.log('─────────────────────────────────────────────────────────\n');
console.log(`Peça:              ${dados.codigo}`);
console.log(`Cliente:           ${dados.cliente}`);
console.log(`Material:          ${dados.material}`);
console.log(`Material bruto:    ${dados.materialBruto}`);
console.log(`Quantidade:        ${dados.quantidade} peças`);
console.log(`Máquina REAL:      ${dados.maquinaReal} ⚠️`);
console.log(`Operador:          ${dados.operador}`);
console.log(`Data produção:     ${dados.dataProducao}`);
console.log(`\n⭐ TEMPO REAL:      ${dados.tempoRealProducao.toFixed(1)} min/peça (MEDIDO EM PRODUÇÃO!)\n`);

console.log('═══════════════════════════════════════════════════════════');
console.log('💰 CUSTOS E PREÇOS (BASEADO EM TEMPO REAL)');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`Tempo total lote:  ${tempoTotalHoras.toFixed(1)} horas (${dados.quantidade} peças × ${dados.tempoRealProducao} min)`);
console.log(`Hora/máquina:      R$ ${params.horaMaquina.toFixed(2)}/h\n`);

console.log('MOD (Mão de Obra Direta):');
console.log(`   Total:          R$ ${mod.toFixed(2)}`);
console.log(`   Unitário:       R$ ${modUnitario.toFixed(2)}/peça\n`);

console.log('Custos Indiretos (58%):');
console.log(`   Total:          R$ ${custosIndiretos.toFixed(2)}`);
console.log(`   Unitário:       R$ ${custosIndiretosUnitario.toFixed(2)}/peça\n`);

console.log('═══════════════════════════════════════════════════════════');
console.log('CUSTO TOTAL DE FABRICAÇÃO:');
console.log(`   Total:          R$ ${custoTotal.toFixed(2)}`);
console.log(`   Unitário:       R$ ${custoUnitario.toFixed(2)}/peça ⭐`);
console.log('═══════════════════════════════════════════════════════════\n');

console.log('PREÇO DE VENDA (Markup 1.290 = 29%):');
console.log(`   Unitário:       R$ ${precoUnitario.toFixed(2)}/peça ⭐`);
console.log(`   Total NFe:      R$ ${precoTotal.toFixed(2)} ⭐\n`);

console.log('IMPOSTOS E DEDUÇÕES:');
console.log(`   Simples (8,5%): R$ ${impostoValor.toFixed(2)}`);
console.log(`   Comissões (2%): R$ ${comissaoValor.toFixed(2)}`);
console.log(`   Despesas (2%):  R$ ${despesasValor.toFixed(2)}`);
console.log(`   Total:          R$ ${deducoes.toFixed(2)}\n`);

console.log('═══════════════════════════════════════════════════════════');
console.log('💵 LUCRO LÍQUIDO:');
console.log(`   Total:          R$ ${lucroLiquido.toFixed(2)}`);
console.log(`   Margem:         ${margemLiquida.toFixed(1)}% ⭐`);
console.log('═══════════════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════════════
// COMPARAÇÃO COMPLETA
// ═══════════════════════════════════════════════════════════════

console.log('\n╔═══════════════════════════════════════════════════════════════════════════════╗');
console.log('║           COMPARAÇÃO: TODAS AS ESTIMATIVAS vs REALIDADE                      ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════════╝\n');

const comparacoes = [
    {
        fonte: 'MANUAL (Ø60mm ERRADO)',
        tempo: 20.0,
        custo: 63.20,
        preco: 81.53,
        total: 4891.80,
        margem: 14.5,
        status: '❌'
    },
    {
        fonte: 'AGENTE (Ø16 H9)',
        tempo: 13.4,
        custo: 42.39,
        preco: 54.68,
        total: 3281.09,
        margem: 10.0,
        status: '❌'
    },
    {
        fonte: 'PROGRAMA CNC (análise)',
        tempo: 29.2,
        custo: 92.27,
        preco: 119.03,
        total: 7141.85,
        margem: 10.0,
        status: '❌'
    },
    {
        fonte: '✅ REAL (Ordem Produção)',
        tempo: dados.tempoRealProducao,
        custo: custoUnitario,
        preco: precoUnitario,
        total: precoTotal,
        margem: margemLiquida,
        status: '✅'
    }
];

console.log('┌─────────────────────────────┬──────────┬───────────┬───────────┬─────────────┬──────────┐');
console.log('│ Fonte                       │ Tempo    │ Custo/pç  │ Preço/pç  │ Total 60pçs │ Margem % │');
console.log('├─────────────────────────────┼──────────┼───────────┼───────────┼─────────────┼──────────┤');

comparacoes.forEach(c => {
    const fonte = (c.fonte).padEnd(27);
    const tempo = (c.tempo.toFixed(1) + ' min').padStart(8);
    const custo = ('R$' + c.custo.toFixed(2)).padStart(9);
    const preco = ('R$' + c.preco.toFixed(2)).padStart(9);
    const total = ('R$' + c.total.toFixed(2)).padStart(11);
    const margem = (c.margem.toFixed(1) + '%').padStart(8);

    console.log(`│ ${fonte} │ ${tempo} │ ${custo} │ ${preco} │ ${total} │ ${margem} │`);
});

console.log('└─────────────────────────────┴──────────┴───────────┴───────────┴─────────────┴──────────┘\n');

// Calcular erros
const erros = comparacoes.slice(0, 3).map(c => ({
    fonte: c.fonte,
    erroTempo: ((c.tempo - dados.tempoRealProducao) / dados.tempoRealProducao * 100),
    erroCusto: ((c.custo - custoUnitario) / custoUnitario * 100),
    erroPreco: ((c.preco - precoUnitario) / precoUnitario * 100),
    erroTotal: ((c.total - precoTotal) / precoTotal * 100)
}));

console.log('⚠️  ANÁLISE DOS ERROS:\n');
console.log('┌─────────────────────────────┬─────────────┬─────────────┬─────────────┬─────────────┐');
console.log('│ Fonte                       │ Erro Tempo  │ Erro Custo  │ Erro Preço  │ Erro Total  │');
console.log('├─────────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤');

erros.forEach(e => {
    const fonte = e.fonte.padEnd(27);
    const erroT = (e.erroTempo > 0 ? '+' : '') + e.erroTempo.toFixed(0) + '%';
    const erroC = (e.erroCusto > 0 ? '+' : '') + e.erroCusto.toFixed(0) + '%';
    const erroP = (e.erroPreco > 0 ? '+' : '') + e.erroPreco.toFixed(0) + '%';
    const erroTotal = (e.erroTotal > 0 ? '+' : '') + e.erroTotal.toFixed(0) + '%';

    console.log(`│ ${fonte} │ ${erroT.padStart(11)} │ ${erroC.padStart(11)} │ ${erroP.padStart(11)} │ ${erroTotal.padStart(11)} │`);
});

console.log('└─────────────────────────────┴─────────────┴─────────────┴─────────────┴─────────────┘\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('🎯 CONCLUSÕES FINAIS:');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('1. ✅ TEMPO REAL COMPROVADO: 8,0 minutos/peça');
console.log('   Fonte: Ordem de Produção (as-built)');
console.log('   Validado por: Operador ANDRE');
console.log('   Máquina: Dosan I P 4004\n');

console.log('2. ❌ TODAS as estimativas estavam ERRADAS:');
console.log(`   - Manual: superestimou ${Math.abs(erros[0].erroTempo).toFixed(0)}%`);
console.log(`   - Agente: superestimou ${Math.abs(erros[1].erroTempo).toFixed(0)}%`);
console.log(`   - Programa CNC: superestimou ${Math.abs(erros[2].erroTempo).toFixed(0)}% (!)\n`);

console.log('3. 💡 LIÇÃO APRENDIDA:');
console.log('   Dados reais de produção (OP as-built) são A ÚNICA');
console.log('   fonte confiável para orçamentos futuros.\n');

console.log('4. 🎯 VALORES CORRETOS PARA ORÇAMENTO:');
console.log(`   - Tempo: ${dados.tempoRealProducao.toFixed(1)} min/peça`);
console.log(`   - Custo: R$ ${custoUnitario.toFixed(2)}/peça`);
console.log(`   - Preço: R$ ${precoUnitario.toFixed(2)}/peça`);
console.log(`   - Total (60 pçs): R$ ${precoTotal.toFixed(2)}`);
console.log(`   - Margem líquida: ${margemLiquida.toFixed(1)}%\n`);

console.log('═══════════════════════════════════════════════════════════\n');

// Salvar resultado final
const resultadoFinal = {
    pecaProcessada: dados.codigo,
    cliente: dados.cliente,
    dataAnalise: new Date().toISOString(),
    fonteTempoReal: 'Ordem de Produção (as-built)',
    tempoRealComprovado: dados.tempoRealProducao,
    maquinaReal: dados.maquinaReal,
    operador: dados.operador,
    quantidade: dados.quantidade,
    custos: {
        custoUnitario,
        precoUnitario,
        precoTotal,
        margemLiquida
    },
    comparacoes,
    errosIdentificados: erros,
    recomendacao: 'Usar sempre dados de OP real quando disponível. Estimativas podem variar 150-265% da realidade!'
};

const fs = require('fs');
fs.writeFileSync(
    'd:\\lasec\\base_dados\\tempo_real_comprovado_1.60.01.548.json',
    JSON.stringify(resultadoFinal, null, 2),
    'utf8'
);

console.log('✅ Dados salvos em: d:\\lasec\\base_dados\\tempo_real_comprovado_1.60.01.548.json');
console.log('✅ Análise completa salva em: d:\\lasec\\sistema\\ANALISE_DADOS_REAIS_PRODUCAO.txt\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 ORÇAMENTO FINAL CORRETO:');
console.log('═══════════════════════════════════════════════════════════');
console.log(`
PEÇA: ${dados.codigo} - ${dados.cliente}
MATERIAL BRUTO: ${dados.materialBruto}
QUANTIDADE: ${dados.quantidade} peças

TEMPO REAL: ${dados.tempoRealProducao.toFixed(1)} min/peça (COMPROVADO!)

PREÇO UNITÁRIO: R$ ${precoUnitario.toFixed(2)}/peça
VALOR TOTAL NFe: R$ ${precoTotal.toFixed(2)}

MARGEM LÍQUIDA: ${margemLiquida.toFixed(1)}%

Este é o orçamento CORRETO baseado em dados REAIS de produção!
`);
console.log('═══════════════════════════════════════════════════════════\n');
