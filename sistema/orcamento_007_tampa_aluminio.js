// ═══════════════════════════════════════════════════════════
// ORÇAMENTO 007/2025 - TAMPA DE ALUMÍNIO
// Usando Agente V2 com inteligência da biblioteca CNC
// ═══════════════════════════════════════════════════════════

const OrcamentoV2 = require('./orcamento_v2_com_biblioteca.js');
const fs = require('fs');

console.log('═══════════════════════════════════════════════════════════');
console.log('💼 ORÇAMENTO 007/2025 - TAMPA DE ALUMÍNIO');
console.log('═══════════════════════════════════════════════════════════\n');

// Inicializar agente V2
const agente = new OrcamentoV2();

// Dados da peça analisados do desenho
const dadosEntrada = {
    codigo: 'TAMPA_ALUMINIO_001',
    descricao: 'TAMPA DE ALUMÍNIO',
    cliente: 'DOST',
    quantidade: 9, // Conforme ordem de produção (9 peças fabricadas)
    material: 'ALUMINIO',
    materialBruto: 'Tarugo Ø25 x 50mm',
    tipo: 'TAMPA',
    maquina: 'DOOSAN',

    // Características da peça
    dimensoes: {
        diametroExterno: 88,
        diametroInterno: 69.2,
        altura: 54,
        furos: [
            { diametro: 3.5, quantidade: 2 },
            { diametro: 18.5, quantidade: 1, tipo: 'sextavado' }
        ]
    },

    // Características para busca
    temFuros: true,
    temRoscas: false,
    temCanais: false,
    temContorno: true,
    temFaceamento: true,

    complexidade: 'MEDIA'
};

console.log('📋 DADOS DA PEÇA:\n');
console.log(`   Código: ${dadosEntrada.codigo}`);
console.log(`   Cliente: ${dadosEntrada.cliente}`);
console.log(`   Material: ${dadosEntrada.material}`);
console.log(`   Material bruto: ${dadosEntrada.materialBruto}`);
console.log(`   Quantidade: ${dadosEntrada.quantidade} peças`);
console.log(`   Diâmetro: Ø${dadosEntrada.dimensoes.diametroExterno}mm`);
console.log(`   Altura: ${dadosEntrada.dimensoes.altura}mm\n`);

// Buscar peças similares em alumínio
console.log('🔍 Buscando peças similares de ALUMÍNIO na biblioteca...\n');

const biblioteca = agente.bibliotecaCNC;
const programasAluminio = biblioteca.programas.filter(p =>
    p.material === 'ALUMINIO' ||
    p.caminho.toLowerCase().includes('aluminio') ||
    p.caminho.toLowerCase().includes('alumínio')
);

console.log(`✅ Encontrados ${programasAluminio.length} programas de alumínio!\n`);

// Exibir alguns exemplos
console.log('📊 Exemplos de programas similares:');
programasAluminio.slice(0, 5).forEach((prog, i) => {
    console.log(`   ${i + 1}. ${prog.nome}`);
    console.log(`      Máquina: ${prog.maquina}`);
    console.log(`      Ferramentas: ${prog.ferramentas.join(', ')}`);
    console.log(`      Operações: ${prog.operacoes.length}`);
});

// Consultar parâmetros de corte para alumínio
console.log('\n');
const paramsAluminio = agente.obterParametrosCorte('ALUMINIO_6061');

// Gerar orçamento com agente V2
console.log('\n═══════════════════════════════════════════════════════════');
console.log('💡 GERANDO ORÇAMENTO COM AGENTE V2');
console.log('═══════════════════════════════════════════════════════════\n');

const resultado = agente.gerarOrcamento(dadosEntrada);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 RESULTADO DO ORÇAMENTO');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`🎯 Método utilizado: ${resultado.metodo}`);
console.log(`📊 Confiabilidade: ${resultado.confiabilidade}`);
console.log(`⏱️  Tempo estimado: ${resultado.tempo} min/peça`);
console.log(`💰 Custo MOD: R$ ${resultado.custoMOD.total}\n`);

// Calcular valores finais
const custoUnitario = parseFloat(resultado.custoMOD.total);
const markup = 1.290;
const impostos = 0.085;

const precoSemImpostos = custoUnitario * markup;
const valorImpostos = precoSemImpostos * impostos;
const precoFinal = precoSemImpostos + valorImpostos;
const lucroLiquido = precoFinal - custoUnitario - valorImpostos;
const margemLiquida = (lucroLiquido / precoFinal) * 100;

const custoTotalLote = custoUnitario * dadosEntrada.quantidade;
const precoTotalNFe = precoFinal * dadosEntrada.quantidade;

console.log('💵 VALORES CALCULADOS:\n');
console.log(`   Custo unitário: R$ ${custoUnitario.toFixed(2)}`);
console.log(`   Preço s/ impostos: R$ ${precoSemImpostos.toFixed(2)}`);
console.log(`   Impostos (8.5%): R$ ${valorImpostos.toFixed(2)}`);
console.log(`   PREÇO FINAL NFe: R$ ${precoFinal.toFixed(2)}/peça`);
console.log(`   Margem líquida: ${margemLiquida.toFixed(1)}%\n`);

console.log(`📦 TOTAIS DO LOTE (${dadosEntrada.quantidade} peças):\n`);
console.log(`   Custo total: R$ ${custoTotalLote.toFixed(2)}`);
console.log(`   Valor NFe: R$ ${precoTotalNFe.toFixed(2)}`);
console.log(`   Lucro total: R$ ${(lucroLiquido * dadosEntrada.quantidade).toFixed(2)}\n`);

// Metodologia recomendada
console.log('═══════════════════════════════════════════════════════════');
console.log('📋 PROCESSO DE FABRICAÇÃO RECOMENDADO');
console.log('═══════════════════════════════════════════════════════════\n');

const metodologia = resultado.metodologia || 'PECA_COMPLEXA';
const metod = agente.padroesCNC.metodologias[metodologia];

if (metod) {
    console.log(`Metodologia: ${metod.descricao}\n`);
    console.log('Sequência de operações:');
    metod.sequencia.forEach(seq => console.log(`   ${seq}`));
    console.log('\nFerramentas necessárias:');
    metod.ferramentasNecessarias.forEach(f => console.log(`   - ${f}`));
}

// Salvar resultado
const registroOrcamento = {
    numero: '007/2025',
    data: new Date().toISOString().split('T')[0],
    cliente: dadosEntrada.cliente,
    peca: dadosEntrada.descricao,
    codigo: dadosEntrada.codigo,
    material: dadosEntrada.material,
    materialBruto: dadosEntrada.materialBruto,
    quantidade: dadosEntrada.quantidade,
    tempoMinutos: resultado.tempo,
    metodo: resultado.metodo,
    confiabilidade: resultado.confiabilidade,
    custoUnitario: parseFloat(custoUnitario.toFixed(2)),
    precoUnitario: parseFloat(precoFinal.toFixed(2)),
    valorTotal: parseFloat(precoTotalNFe.toFixed(2)),
    margemLiquida: parseFloat(margemLiquida.toFixed(2)),
    status: 'valido',
    observacao: resultado.observacao
};

fs.writeFileSync(
    'd:/lasec/orcamentos/2025/007_orcamento_tampa_aluminio.json',
    JSON.stringify(registroOrcamento, null, 2)
);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ORÇAMENTO 007/2025 CONCLUÍDO!');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`💾 Salvo em: d:/lasec/orcamentos/2025/007_orcamento_tampa_aluminio.json\n`);
