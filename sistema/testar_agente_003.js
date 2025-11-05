/**
 * TESTE DO AGENTE - CORRIGIR ORÇAMENTO 003
 * Peça 1.60.01.548 com dados corretos
 */

const OrcamentoAutomatizado = require('./gerar_orcamento.js');

// Dados corretos da peça 1.60.01.548
const dadosEntrada = {
    // Identificação
    codigo: '1.60.01.548',
    cliente: 'MICROGEAR',
    tipo: 'EIXO',

    // Material
    material: '45 S 20 K',
    materialBruto: {
        diametro: 16,           // ✅ CORRETO: Ø16 (não Ø60!)
        tolerancia: 'H9',       // ✅ CORRETO: H9 retificado
        comprimento: 195,
        condicao: 'retificado'  // ✅ Material já retificado
    },

    // Dimensões
    comprimento: 189,           // Comprimento total ±0,5mm
    diametros: [16, 14, 12, 10, 8, 16], // Múltiplos diâmetros conforme desenho
    diametroMaximo: 16,         // Diâmetro máximo acabado
    tolerancias: 'H12',

    // Características
    canais: 2,                  // Canais de alívio
    roscas: 0,
    furos: 0,

    // Tratamento térmico
    tratamentoTermico: '56±2 HRC',
    responsavelTratamento: 'CLIENTE',

    // Quantidade e parâmetros
    quantidade: 60,
    parametros: {
        horaMaquina: 120.00,    // R$ 120/h competitivo
        custosIndiretos: 0.58,  // 58%
        markup: 1.290,          // 29% margem
        impostos: 0.085,        // 8,5% Simples
        comissao: 0.02,         // 2%
        despesas: 0.02          // 2%
    }
};

console.log('═══════════════════════════════════════════════════════════');
console.log('TESTE DO AGENTE AUTOMATIZADO');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('Peça: 1.60.01.548 - EIXO');
console.log('Material bruto: Ø16 H9 retificado x 195mm ✅ CORRETO');
console.log('Cliente: MICROGEAR');
console.log('Quantidade: 60 peças');
console.log('Tratamento: 56±2 HRC (cliente faz)');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('');

// Criar instância do agente
const agente = new OrcamentoAutomatizado();

// Executar
(async () => {
    const resultado = await agente.executar(dadosEntrada);

    if (resultado.sucesso) {
        console.log('');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('📊 RESULTADOS DO AGENTE:');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');
        console.log(`Orçamento: ${resultado.numeroOrcamento}`);
        console.log(`Pasta: ${resultado.pastaOrcamento}`);
        console.log('');
        console.log('⏱️  TEMPOS:');
        console.log(`   Tempo total: ${resultado.tempos.total.toFixed(1)} min/peça`);
        console.log(`   - Setup: ${resultado.tempos.setup.toFixed(1)} min`);
        console.log(`   - Faceamento: ${resultado.tempos.faceamento.toFixed(1)} min`);
        console.log(`   - Desbaste: ${resultado.tempos.desbaste.toFixed(1)} min`);
        console.log(`   - Acabamento: ${resultado.tempos.acabamento.toFixed(1)} min`);
        console.log(`   - Operações especiais: ${resultado.tempos.operacoesEspeciais.toFixed(1)} min`);
        console.log(`   - Inspeção: ${resultado.tempos.inspecao.toFixed(1)} min`);
        console.log('');
        console.log('💰 CUSTOS E PREÇOS:');
        console.log(`   Custo unitário: R$ ${resultado.custos.custoUnitario.toFixed(2)}/peça`);
        console.log(`   Preço unitário: R$ ${resultado.custos.precoUnitario.toFixed(2)}/peça`);
        console.log(`   Valor total NFe: R$ ${resultado.custos.precoTotal.toFixed(2)}`);
        console.log(`   Margem líquida: ${resultado.custos.margemLiquida.toFixed(1)}%`);
        console.log('');
        console.log('📁 ARQUIVOS GERADOS:');
        resultado.arquivos.forEach(arq => console.log(`   ✓ ${arq}`));
        console.log('');
        console.log('📑 PDFs:');
        resultado.pdfs.forEach(pdf => console.log(`   ✓ ${pdf}`));
        console.log('');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');
        console.log('🎯 COMPARAÇÃO COM ORÇAMENTO MANUAL (ERRADO):');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');
        console.log('MANUAL (ERRADO - Ø60mm):');
        console.log('   Tempo: 20,0 min/peça');
        console.log('   Custo: R$ 63,20/peça');
        console.log('   Preço: R$ 81,53/peça');
        console.log('   Total: R$ 4.891,80');
        console.log('');
        console.log(`AGENTE (CORRETO - Ø16 H9):`);
        console.log(`   Tempo: ${resultado.tempos.total.toFixed(1)} min/peça`);
        console.log(`   Custo: R$ ${resultado.custos.custoUnitario.toFixed(2)}/peça`);
        console.log(`   Preço: R$ ${resultado.custos.precoUnitario.toFixed(2)}/peça`);
        console.log(`   Total: R$ ${resultado.custos.precoTotal.toFixed(2)}`);
        console.log('');
        console.log('DIFERENÇAS:');
        console.log(`   Tempo: ${((20.0 - resultado.tempos.total)/20.0*100).toFixed(0)}% menor`);
        console.log(`   Custo: ${((63.20 - resultado.custos.custoUnitario)/63.20*100).toFixed(0)}% menor`);
        console.log(`   Preço: ${((81.53 - resultado.custos.precoUnitario)/81.53*100).toFixed(0)}% menor`);
        console.log(`   Total: R$ ${(4891.80 - resultado.custos.precoTotal).toFixed(2)} de economia`);
        console.log('');
        console.log('═══════════════════════════════════════════════════════════');

    } else {
        console.error('❌ ERRO:', resultado.erro);
    }
})();
