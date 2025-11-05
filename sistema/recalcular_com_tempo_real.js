/**
 * RECALCULAR ORÇAMENTO COM TEMPO REAL DO PROGRAMA CNC
 */

// Dados REAIS do programa CNC
const dadosReais = {
    codigoPeca: '1.60.01.548',
    cliente: 'MICROGEAR',
    material: '45 S 20 K',
    materialBruto: {
        diametro: 16,
        tolerancia: 'H9',
        tipo: 'retificado'
    },
    quantidade: 60,
    tempoRealCNC: 29.2, // min/peça REAL do programa!
    tratamentoTermico: '56±2 HRC'
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

console.log('═══════════════════════════════════════════════════════════');
console.log('💰 RECÁLCULO COM TEMPO REAL DO PROGRAMA CNC');
console.log('═══════════════════════════════════════════════════════════\n');

// Cálculos
const tempoHoras = dadosReais.tempoRealCNC / 60;
const tempoTotalHoras = tempoHoras * dadosReais.quantidade;

const mod = tempoTotalHoras * params.horaMaquina;
const modUnitario = mod / dadosReais.quantidade;

const custosIndiretos = mod * params.custosIndiretos;
const custosIndiretosUnitario = custosIndiretos / dadosReais.quantidade;

const custoTotal = mod + custosIndiretos;
const custoUnitario = custoTotal / dadosReais.quantidade;

const precoUnitario = custoUnitario * params.markup;
const precoTotal = precoUnitario * dadosReais.quantidade;

const impostoValor = precoTotal * params.impostos;
const comissaoValor = precoTotal * params.comissao;
const despesasValor = precoTotal * params.despesas;
const deducoes = impostoValor + comissaoValor + despesasValor;

const lucroLiquido = precoTotal - custoTotal - deducoes;
const margemLiquida = (lucroLiquido / precoTotal) * 100;

console.log('📊 DADOS DO PROGRAMA CNC:');
console.log(`   Peça: ${dadosReais.codigoPeca}`);
console.log(`   Material bruto: Ø${dadosReais.materialBruto.diametro} ${dadosReais.materialBruto.tolerancia} ${dadosReais.materialBruto.tipo}`);
console.log(`   Quantidade: ${dadosReais.quantidade} peças`);
console.log(`   Tempo REAL: ${dadosReais.tempoRealCNC.toFixed(1)} min/peça`);
console.log('');

console.log('💰 CUSTOS E PREÇOS RECALCULADOS:');
console.log('');
console.log(`Tempo total: ${tempoTotalHoras.toFixed(1)} horas (${dadosReais.quantidade} peças)`);
console.log(`Hora/máquina: R$ ${params.horaMaquina.toFixed(2)}/h`);
console.log('');
console.log(`MOD (Mão de Obra Direta):`);
console.log(`   Total: R$ ${mod.toFixed(2)}`);
console.log(`   Unitário: R$ ${modUnitario.toFixed(2)}/peça`);
console.log('');
console.log(`Custos Indiretos (58%):`);
console.log(`   Total: R$ ${custosIndiretos.toFixed(2)}`);
console.log(`   Unitário: R$ ${custosIndiretosUnitario.toFixed(2)}/peça`);
console.log('');
console.log(`CUSTO TOTAL DE FABRICAÇÃO:`);
console.log(`   Total: R$ ${custoTotal.toFixed(2)}`);
console.log(`   Unitário: R$ ${custoUnitario.toFixed(2)}/peça ⭐`);
console.log('');
console.log(`PREÇO DE VENDA (Markup ${((params.markup-1)*100).toFixed(1)}%):`);
console.log(`   Unitário: R$ ${precoUnitario.toFixed(2)}/peça ⭐`);
console.log(`   Total NFe: R$ ${precoTotal.toFixed(2)} ⭐`);
console.log('');
console.log(`IMPOSTOS E DEDUÇÕES:`);
console.log(`   Simples Nacional (8,5%): R$ ${impostoValor.toFixed(2)}`);
console.log(`   Comissões (2%): R$ ${comissaoValor.toFixed(2)}`);
console.log(`   Despesas (2%): R$ ${despesasValor.toFixed(2)}`);
console.log(`   Total deduções: R$ ${deducoes.toFixed(2)}`);
console.log('');
console.log(`LUCRO LÍQUIDO:`);
console.log(`   Total: R$ ${lucroLiquido.toFixed(2)}`);
console.log(`   Margem: ${margemLiquida.toFixed(1)}% ⭐`);
console.log('');

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 COMPARAÇÃO: ESTIMATIVAS vs REALIDADE');
console.log('═══════════════════════════════════════════════════════════\n');

const comparacoes = [
    {
        nome: 'MANUAL (Ø60 ERRADO)',
        tempo: 20.0,
        custo: 63.20,
        preco: 81.53,
        total: 4891.80,
        margem: 14.5
    },
    {
        nome: 'AGENTE (Ø16 H9)',
        tempo: 13.4,
        custo: 42.39,
        preco: 54.68,
        total: 3281.09,
        margem: 10.0
    },
    {
        nome: '✅ REAL (Programa CNC)',
        tempo: dadosReais.tempoRealCNC,
        custo: custoUnitario,
        preco: precoUnitario,
        total: precoTotal,
        margem: margemLiquida
    }
];

console.log('╔════════════════════════╦════════════╦═══════════╦═══════════╦═════════════╦══════════╗');
console.log('║ Fonte                  ║ Tempo (min)║ Custo/pç  ║ Preço/pç  ║ Total 60pçs ║ Margem % ║');
console.log('╠════════════════════════╬════════════╬═══════════╬═══════════╬═════════════╬══════════╣');

comparacoes.forEach(c => {
    const tempo = c.tempo.toFixed(1).padStart(10);
    const custo = `R$ ${c.custo.toFixed(2)}`.padStart(9);
    const preco = `R$ ${c.preco.toFixed(2)}`.padStart(9);
    const total = `R$ ${c.total.toFixed(2)}`.padStart(11);
    const margem = `${c.margem.toFixed(1)}%`.padStart(8);
    console.log(`║ ${c.nome.padEnd(22)} ║ ${tempo} ║ ${custo} ║ ${preco} ║ ${total} ║ ${margem} ║`);
});

console.log('╚════════════════════════╩════════════╩═══════════╩═══════════╩═════════════╩══════════╝');
console.log('');

console.log('⚠️  ANÁLISE DOS ERROS:\n');

const erroManualTempo = ((20.0 - dadosReais.tempoRealCNC) / dadosReais.tempoRealCNC * 100);
const erroAgenteTempo = ((13.4 - dadosReais.tempoRealCNC) / dadosReais.tempoRealCNC * 100);

console.log(`MANUAL:`);
console.log(`   Erro no tempo: ${Math.abs(erroManualTempo).toFixed(0)}% ${erroManualTempo < 0 ? 'MENOR' : 'MAIOR'}`);
console.log(`   Erro no custo: R$ ${Math.abs(63.20 - custoUnitario).toFixed(2)} (${((Math.abs(63.20 - custoUnitario)/custoUnitario)*100).toFixed(0)}% ${63.20 > custoUnitario ? 'MAIOR' : 'MENOR'})`);
console.log(`   Erro no preço: R$ ${Math.abs(81.53 - precoUnitario).toFixed(2)} (${((Math.abs(81.53 - precoUnitario)/precoUnitario)*100).toFixed(0)}% ${81.53 > precoUnitario ? 'MAIOR' : 'MENOR'})`);
console.log(`   ${erroManualTempo < 0 ? '❌ SUBESTIMOU' : '⚠️  SUPERESTIMOU'} o tempo real!`);
console.log('');

console.log(`AGENTE:`);
console.log(`   Erro no tempo: ${Math.abs(erroAgenteTempo).toFixed(0)}% ${erroAgenteTempo < 0 ? 'MENOR' : 'MAIOR'}`);
console.log(`   Erro no custo: R$ ${Math.abs(42.39 - custoUnitario).toFixed(2)} (${((Math.abs(42.39 - custoUnitario)/custoUnitario)*100).toFixed(0)}% ${42.39 > custoUnitario ? 'MAIOR' : 'MENOR'})`);
console.log(`   Erro no preço: R$ ${Math.abs(54.68 - precoUnitario).toFixed(2)} (${((Math.abs(54.68 - precoUnitario)/precoUnitario)*100).toFixed(0)}% ${54.68 > precoUnitario ? 'MAIOR' : 'MENOR'})`);
console.log(`   ${erroAgenteTempo < 0 ? '❌ SUBESTIMOU' : '⚠️  SUPERESTIMOU'} o tempo real!`);
console.log('');

console.log('═══════════════════════════════════════════════════════════');
console.log('🎯 CONCLUSÃO:');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('1. ❌ MANUAL estava ERRADO no material (Ø60 vs Ø16)');
console.log('   E AINDA ASSIM subestimou o tempo em 31%!\n');

console.log('2. ❌ AGENTE usou material CORRETO (Ø16 H9)');
console.log('   MAS subestimou drasticamente o tempo em 54%!\n');

console.log('3. ✅ PROGRAMA CNC REAL mostra:');
console.log(`   Tempo: ${dadosReais.tempoRealCNC.toFixed(1)} min/peça`);
console.log(`   Custo: R$ ${custoUnitario.toFixed(2)}/peça`);
console.log(`   Preço: R$ ${precoUnitario.toFixed(2)}/peça`);
console.log(`   Total: R$ ${precoTotal.toFixed(2)}`);
console.log(`   Margem: ${margemLiquida.toFixed(1)}%\n`);

console.log('⚡ LIÇÃO APRENDIDA:');
console.log('   Estimativas (manual ou automáticas) NÃO substituem');
console.log('   dados reais de produção!');
console.log('');
console.log('   O agente DEVE aprender com programas CNC reais');
console.log('   para melhorar suas estimativas futuras.');
console.log('');
console.log('═══════════════════════════════════════════════════════════\n');

// Salvar resultado
const resultado = {
    tempoReal: dadosReais.tempoRealCNC,
    custoUnitario: custoUnitario,
    precoUnitario: precoUnitario,
    precoTotal: precoTotal,
    margemLiquida: margemLiquida,
    comparacao: comparacoes
};

const fs = require('fs');
fs.writeFileSync('d:\\lasec\\sistema\\resultado_tempo_real.json', JSON.stringify(resultado, null, 2), 'utf8');
console.log('✅ Resultado salvo em: d:\\lasec\\sistema\\resultado_tempo_real.json\n');
