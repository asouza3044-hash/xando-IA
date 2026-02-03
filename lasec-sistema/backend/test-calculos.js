/**
 * Script de teste dos cálculos LASEC
 * Valida as fórmulas com dados do orçamento 016/2025 (INOVA PRODENTAL)
 */

const BUSINESS_RULES = {
  CIF_PERCENTUAL: 0.58,
  PERDAS_PERCENTUAL: 0.02,
  MARKUP_PERCENTUAL: 0.35,
  IMPOSTOS_PERCENTUAL: 0.10,
  MULTIPLICADOR_FINAL: 1.5147,
};

function calcularSetup(horas, horaMaquina) {
  return horas * horaMaquina;
}

function calcularMOD(quantidade, tempoMinutos, horaMaquina) {
  return (quantidade * tempoMinutos / 60) * horaMaquina;
}

function calcularCIF(setup, mod) {
  return (setup + mod) * BUSINESS_RULES.CIF_PERCENTUAL;
}

function calcularCustoTotal(setup, mod, cif, material = 0) {
  return setup + mod + cif + material;
}

function calcularCustoUnitario(custoTotal, quantidade) {
  return custoTotal / quantidade;
}

function calcularPrecoNFe(custoUnitario) {
  return custoUnitario * BUSINESS_RULES.MULTIPLICADOR_FINAL;
}

function arredondar(valor, casas = 2) {
  const mult = Math.pow(10, casas);
  return Math.round(valor * mult) / mult;
}

console.log('🧪 Teste de Cálculos LASEC');
console.log('━'.repeat(60));
console.log('');

// Dados reais do Orçamento 016/2025 - INOVA PRODENTAL
const dadosOrcamento = {
  tempoMinutos: 45,
  setupHoras: 3.0,
  horaMaquina: 105.0,
  custoMaterialUnitario: 0, // Fornecido pelo cliente
};

console.log('📋 Dados de Entrada:');
console.log(`   Tempo/conjunto: ${dadosOrcamento.tempoMinutos} minutos`);
console.log(`   Setup: ${dadosOrcamento.setupHoras} horas`);
console.log(`   Hora-máquina: R$ ${dadosOrcamento.horaMaquina.toFixed(2)}`);
console.log('');

// Testar lote de 100 (esperado: R$ 196,01)
const quantidade = 100;

console.log(`🔢 Calculando Lote ${quantidade} unidades:`);
console.log('');

const setup = calcularSetup(dadosOrcamento.setupHoras, dadosOrcamento.horaMaquina);
console.log(`   Setup = ${dadosOrcamento.setupHoras}h × R$ ${dadosOrcamento.horaMaquina}`);
console.log(`   Setup = R$ ${arredondar(setup)}`);
console.log('');

const mod = calcularMOD(quantidade, dadosOrcamento.tempoMinutos, dadosOrcamento.horaMaquina);
console.log(`   MOD = (${quantidade} × ${dadosOrcamento.tempoMinutos}min) ÷ 60 × R$ ${dadosOrcamento.horaMaquina}`);
console.log(`   MOD = ${quantidade * dadosOrcamento.tempoMinutos / 60}h × R$ ${dadosOrcamento.horaMaquina}`);
console.log(`   MOD = R$ ${arredondar(mod)}`);
console.log('');

const cif = calcularCIF(setup, mod);
console.log(`   CIF = (R$ ${arredondar(setup)} + R$ ${arredondar(mod)}) × 0.58`);
console.log(`   CIF = R$ ${arredondar(cif)}`);
console.log('');

const custoTotal = calcularCustoTotal(setup, mod, cif);
console.log(`   Custo Total = R$ ${arredondar(setup)} + R$ ${arredondar(mod)} + R$ ${arredondar(cif)}`);
console.log(`   Custo Total = R$ ${arredondar(custoTotal)}`);
console.log('');

const custoUnitario = calcularCustoUnitario(custoTotal, quantidade);
console.log(`   Custo Unitário = R$ ${arredondar(custoTotal)} ÷ ${quantidade}`);
console.log(`   Custo Unitário = R$ ${arredondar(custoUnitario, 2)}`);
console.log('');

const precoNFe = calcularPrecoNFe(custoUnitario);
console.log(`   Preço NFe = R$ ${arredondar(custoUnitario, 2)} × 1.5147`);
console.log(`   Preço NFe = R$ ${arredondar(precoNFe, 2)}`);
console.log('');

console.log('━'.repeat(60));
console.log('');

// Validação
const precoEsperado = 196.01;
const diferenca = Math.abs(precoNFe - precoEsperado);
const tolerancia = 0.10; // 10 centavos

if (diferenca <= tolerancia) {
  console.log('✅ TESTE PASSOU!');
  console.log(`   Preço calculado: R$ ${arredondar(precoNFe, 2)}`);
  console.log(`   Preço esperado:  R$ ${precoEsperado.toFixed(2)}`);
  console.log(`   Diferença:       R$ ${diferenca.toFixed(2)}`);
} else {
  console.log('❌ TESTE FALHOU!');
  console.log(`   Preço calculado: R$ ${arredondar(precoNFe, 2)}`);
  console.log(`   Preço esperado:  R$ ${precoEsperado.toFixed(2)}`);
  console.log(`   Diferença:       R$ ${diferenca.toFixed(2)}`);
}

console.log('');
console.log('━'.repeat(60));
console.log('');

// Testar todos os lotes
console.log('📊 Tabela de Lotes (como no orçamento 016):');
console.log('');

const lotes = [
  { qtd: 15, esperado: 238.73 },
  { qtd: 30, esperado: 213.60 },
  { qtd: 50, esperado: 203.54 },
  { qtd: 100, esperado: 196.01 },
  { qtd: 200, esperado: 192.24 },
  { qtd: 500, esperado: 189.98 },
];

console.log('┌────────┬──────────────┬──────────────┬────────────┐');
console.log('│  Qtd   │  Calculado   │   Esperado   │  Diferença │');
console.log('├────────┼──────────────┼──────────────┼────────────┤');

let todosCertos = true;

lotes.forEach(lote => {
  const modLote = calcularMOD(lote.qtd, dadosOrcamento.tempoMinutos, dadosOrcamento.horaMaquina);
  const cifLote = calcularCIF(setup, modLote);
  const custoTotalLote = calcularCustoTotal(setup, modLote, cifLote);
  const custoUnitLote = calcularCustoUnitario(custoTotalLote, lote.qtd);
  const precoNFeLote = calcularPrecoNFe(custoUnitLote);

  const dif = Math.abs(precoNFeLote - lote.esperado);
  const ok = dif <= tolerancia ? '✓' : '✗';

  if (dif > tolerancia) todosCertos = false;

  console.log(`│ ${String(lote.qtd).padStart(6)} │ R$ ${arredondar(precoNFeLote, 2).toFixed(2).padStart(8)} │ R$ ${lote.esperado.toFixed(2).padStart(8)} │ ${ok.padStart(5)}   R$ ${dif.toFixed(2)} │`);
});

console.log('└────────┴──────────────┴──────────────┴────────────┘');
console.log('');

if (todosCertos) {
  console.log('✅ TODOS OS LOTES PASSARAM!');
} else {
  console.log('⚠️  Alguns lotes apresentaram diferenças');
}

console.log('');
console.log('🎯 Teste concluído.');
console.log('');
