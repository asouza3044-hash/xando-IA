// ═══════════════════════════════════════════════════════════
// RECÁLCULO DE ORÇAMENTO COM DADOS REAIS AS-BUILT
// Peça: 1.60.01.548 - HASTE
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════');
console.log('RECÁLCULO COM DADOS REAIS AS-BUILT');
console.log('═══════════════════════════════════════════════════════════\n');

// Carregar dados reais validados
const dadosReais = JSON.parse(
    fs.readFileSync('d:/lasec/base_dados/dados_reais_validados_1.60.01.548.json', 'utf8')
);

console.log('📊 DADOS EXTRAÍDOS DA ORDEM DE PRODUÇÃO:\n');
console.log(`Peça: ${dadosReais.codigoPeca} - ${dadosReais.descricao}`);
console.log(`Cliente: ${dadosReais.cliente}`);
console.log(`Máquina: ${dadosReais.producaoReal.maquina}`);
console.log(`Programa CNC: ${dadosReais.producaoReal.programa}`);
console.log(`Operador: ${dadosReais.producaoReal.operador}\n`);

console.log('⏱️  TEMPOS REAIS DE PRODUÇÃO:');
console.log(`   1º Lado (com setup): ${dadosReais.producaoReal.tempos.primeiroLado.minutoPorPeca} min/peça`);
console.log(`   2º Lado (sem setup): ${dadosReais.producaoReal.tempos.segundoLado.minutoPorPeca} min/peça ✅`);
console.log(`   Média total: ${dadosReais.producaoReal.tempos.mediaTotalComSetup} min/peça`);
console.log(`   Total produzido: ${dadosReais.producaoReal.tempos.totalPecasProduzidas} peças\n`);

console.log('🔧 FERRAMENTAL UTILIZADO:');
dadosReais.producaoReal.ferramentas.forEach(f => {
    console.log(`   ${f.ferramenta} - ${f.descricao}:`);
    console.log(`      Suporte: ${f.suporte}`);
    console.log(`      Inserto: ${f.inserto}`);
    if (f.rpm !== 'N/A') {
        console.log(`      RPM: ${f.rpm} / Avanço: ${f.avanco}`);
    }
    console.log('');
});

console.log('═══════════════════════════════════════════════════════════');
console.log('💰 RECÁLCULO DE CUSTOS E PREÇOS');
console.log('═══════════════════════════════════════════════════════════\n');

// Parâmetros de cálculo
const parametros = {
    tempoUsinagem: dadosReais.recomendacaoOrcamento.tempoFinal, // 9.0 min (7.9 + 15% margem)
    custoHoraMaquina: 121.00, // Torno CNC Doosan
    custoMODHora: 50.00, // Custo MOD por hora
    indiretosMOD: 0.58, // 58% de indiretos
    impostos: 0.085, // 8.5% Simples Nacional
    markup: 1.290, // 29% de margem
    margemLiquida: 0.10, // 10% líquido
    quantidade: 60
};

console.log('📋 PARÂMETROS DE CÁLCULO:');
console.log(`   Tempo de usinagem: ${parametros.tempoUsinagem} min/peça (REAL + 15% margem)`);
console.log(`   Custo hora máquina: R$ ${parametros.custoHoraMaquina.toFixed(2)}`);
console.log(`   Custo MOD/hora: R$ ${parametros.custoMODHora.toFixed(2)}`);
console.log(`   Indiretos MOD: ${(parametros.indiretosMOD * 100).toFixed(0)}%`);
console.log(`   Impostos: ${(parametros.impostos * 100).toFixed(1)}%`);
console.log(`   Markup: ${parametros.markup.toFixed(3)} (${((parametros.markup - 1) * 100).toFixed(0)}% margem)`);
console.log(`   Quantidade: ${parametros.quantidade} peças\n`);

// CÁLCULOS
const tempoHoras = parametros.tempoUsinagem / 60;

// 1. Custo MOD
const custoMOD = parametros.custoMODHora * tempoHoras;

// 2. Custo Indiretos
const custoIndiretos = custoMOD * parametros.indiretosMOD;

// 3. Custo Total (MOD + Indiretos)
const custoTotal = custoMOD + custoIndiretos;

// 4. Preço Venda (sem impostos)
const precoSemImpostos = custoTotal * parametros.markup;

// 5. Impostos
const valorImpostos = precoSemImpostos * parametros.impostos;

// 6. Preço Final NFe
const precoFinal = precoSemImpostos + valorImpostos;

// 7. Lucro Líquido
const lucroLiquido = precoFinal - custoTotal - valorImpostos;
const margemLiquidaReal = (lucroLiquido / precoFinal) * 100;

// 8. Valores Totais
const custoTotalLote = custoTotal * parametros.quantidade;
const precoTotalNFe = precoFinal * parametros.quantidade;
const lucroTotalLote = lucroLiquido * parametros.quantidade;

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 RESULTADOS FINAIS COM DADOS REAIS');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('💵 CUSTOS UNITÁRIOS:');
console.log(`   MOD: R$ ${custoMOD.toFixed(2)}`);
console.log(`   Indiretos (58%): R$ ${custoIndiretos.toFixed(2)}`);
console.log(`   ─────────────────────────────`);
console.log(`   CUSTO TOTAL: R$ ${custoTotal.toFixed(2)}/peça\n`);

console.log('💰 PREÇOS UNITÁRIOS:');
console.log(`   Preço s/ impostos: R$ ${precoSemImpostos.toFixed(2)}`);
console.log(`   Impostos (8.5%): R$ ${valorImpostos.toFixed(2)}`);
console.log(`   ─────────────────────────────`);
console.log(`   PREÇO NFe: R$ ${precoFinal.toFixed(2)}/peça\n`);

console.log('📈 MARGEM:');
console.log(`   Lucro líquido: R$ ${lucroLiquido.toFixed(2)}/peça`);
console.log(`   Margem líquida: ${margemLiquidaReal.toFixed(1)}%\n`);

console.log('📦 TOTAIS DO LOTE (60 peças):');
console.log(`   Custo total: R$ ${custoTotalLote.toFixed(2)}`);
console.log(`   Valor NFe: R$ ${precoTotalNFe.toFixed(2)}`);
console.log(`   Lucro total: R$ ${lucroTotalLote.toFixed(2)}\n`);

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 COMPARAÇÃO: ESTIMATIVAS vs REAL');
console.log('═══════════════════════════════════════════════════════════\n');

const comparacao = [
    {
        metodo: 'MANUAL (ERRADO - Ø60mm)',
        tempo: 20.0,
        custo: 63.20,
        preco: 81.53,
        total: 4891.80,
        erro: '+153%'
    },
    {
        metodo: 'AGENTE (ESTIMATIVA - Ø16)',
        tempo: 13.4,
        custo: 42.39,
        preco: 54.68,
        total: 3281.09,
        erro: '+49%'
    },
    {
        metodo: 'PROGRAMA CNC O0404',
        tempo: 29.2,
        custo: 92.34,
        preco: 119.12,
        total: 7147.20,
        erro: '+224%'
    },
    {
        metodo: 'REAL AS-BUILT (9 min)',
        tempo: parametros.tempoUsinagem,
        custo: custoTotal.toFixed(2),
        preco: precoFinal.toFixed(2),
        total: precoTotalNFe.toFixed(2),
        erro: '✅ CORRETO'
    }
];

comparacao.forEach(c => {
    console.log(`${c.metodo}:`);
    console.log(`   Tempo: ${c.tempo} min/peça`);
    console.log(`   Custo: R$ ${c.custo}/peça`);
    console.log(`   Preço: R$ ${c.preco}/peça`);
    console.log(`   Total: R$ ${c.total}`);
    console.log(`   Erro: ${c.erro}\n`);
});

console.log('═══════════════════════════════════════════════════════════');
console.log('💡 LIÇÕES APRENDIDAS');
console.log('═══════════════════════════════════════════════════════════\n');

dadosReais.licoesAprendidas.forEach((licao, i) => {
    console.log(`${i + 1}. ${licao}`);
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ORÇAMENTO CORRIGIDO COM SUCESSO!');
console.log('═══════════════════════════════════════════════════════════\n');

// Salvar resultados
const resultado = {
    dataCalculo: new Date().toISOString(),
    peca: dadosReais.codigoPeca,
    cliente: dadosReais.cliente,
    quantidade: parametros.quantidade,
    tempoReal: dadosReais.producaoReal.tempos.segundoLado.minutoPorPeca,
    tempoOrcamento: parametros.tempoUsinagem,
    custos: {
        mod: parseFloat(custoMOD.toFixed(2)),
        indiretos: parseFloat(custoIndiretos.toFixed(2)),
        total: parseFloat(custoTotal.toFixed(2))
    },
    precos: {
        semImpostos: parseFloat(precoSemImpostos.toFixed(2)),
        impostos: parseFloat(valorImpostos.toFixed(2)),
        final: parseFloat(precoFinal.toFixed(2))
    },
    margem: {
        lucroUnitario: parseFloat(lucroLiquido.toFixed(2)),
        percentual: parseFloat(margemLiquidaReal.toFixed(2))
    },
    totais: {
        custo: parseFloat(custoTotalLote.toFixed(2)),
        nfe: parseFloat(precoTotalNFe.toFixed(2)),
        lucro: parseFloat(lucroTotalLote.toFixed(2))
    },
    ferramentas: dadosReais.producaoReal.ferramentas,
    comparacao: comparacao
};

fs.writeFileSync(
    'd:/lasec/sistema/orcamento_final_correto_1.60.01.548.json',
    JSON.stringify(resultado, null, 2)
);

console.log('📁 Resultado salvo em: d:/lasec/sistema/orcamento_final_correto_1.60.01.548.json\n');
