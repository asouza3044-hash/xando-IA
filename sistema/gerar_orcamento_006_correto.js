// ═══════════════════════════════════════════════════════════
// ORÇAMENTO 006/2025 - CORRETO COM DADOS AS-BUILT
// Peça: 1.60.01.548 - HASTE
// Cliente: MICROGEAR
// Baseado em: Ordem de Produção Real (DOOSAN 2, Op. ANDRE)
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('═══════════════════════════════════════════════════════════');
console.log('🎯 GERANDO ORÇAMENTO 006/2025 - CORRETO COM DADOS AS-BUILT');
console.log('═══════════════════════════════════════════════════════════\n');

// Carregar dados reais AS-BUILT
const dadosReais = JSON.parse(
    fs.readFileSync('d:/lasec/base_dados/dados_reais_validados_1.60.01.548.json', 'utf8')
);

// Dados do orçamento
const dados = {
    numero: '006/2025',
    data: new Date().toISOString().split('T')[0],
    cliente: 'MICROGEAR',
    clienteCompleto: 'Microgear Indústria de Peças Ltda',
    codigoPeca: '1.60.01.548',
    nomePeca: 'HASTE',
    material: 'Ø16 H9 retificado',
    dimensoesMaterial: 'Ø16 x 195mm',
    quantidade: 60,
    tratamento: '56±2 HRC (cliente faz)',

    // DADOS REAIS AS-BUILT
    tempoUsinagem: 9.0, // 7.9 min real + 15% margem
    maquina: 'DOOSAN 2',
    programa: 'O0404',
    operador: 'ANDRE',

    ferramentas: dadosReais.producaoReal.ferramentas,

    // Custos
    custoMODHora: 50.00,
    indiretosMOD: 0.58,
    impostos: 0.085,
    markup: 1.290,
    margemLiquida: 0.207
};

// CÁLCULOS
const tempoHoras = dados.tempoUsinagem / 60;
const custoMOD = dados.custoMODHora * tempoHoras;
const custoIndiretos = custoMOD * dados.indiretosMOD;
const custoTotal = custoMOD + custoIndiretos;
const precoSemImpostos = custoTotal * dados.markup;
const valorImpostos = precoSemImpostos * dados.impostos;
const precoFinal = precoSemImpostos + valorImpostos;
const lucroLiquido = precoFinal - custoTotal - valorImpostos;
const custoTotalLote = custoTotal * dados.quantidade;
const precoTotalNFe = precoFinal * dados.quantidade;

console.log('📊 RESUMO DO ORÇAMENTO:\n');
console.log(`Número: ${dados.numero}`);
console.log(`Cliente: ${dados.cliente}`);
console.log(`Peça: ${dados.codigoPeca} - ${dados.nomePeca}`);
console.log(`Material: ${dados.material} (${dados.dimensoesMaterial})`);
console.log(`Quantidade: ${dados.quantidade} peças`);
console.log(`Tempo: ${dados.tempoUsinagem} min/peça ✅ DADOS AS-BUILT`);
console.log(`Máquina: ${dados.maquina} | Programa: ${dados.programa}`);
console.log(`\n💰 VALORES:`);
console.log(`Custo unitário: R$ ${custoTotal.toFixed(2)}`);
console.log(`Preço unitário NFe: R$ ${precoFinal.toFixed(2)}`);
console.log(`Total NFe: R$ ${precoTotalNFe.toFixed(2)}`);
console.log(`Margem líquida: ${(dados.margemLiquida * 100).toFixed(1)}%\n`);

// ═══════════════════════════════════════════════════════════
// GERAR DOCUMENTOS HTML
// ═══════════════════════════════════════════════════════════

const pastaDestino = `d:/lasec/orcamentos/2025/MICROGEAR/006_MICROGEAR_1.60.01.548`;
if (!fs.existsSync(pastaDestino)) {
    fs.mkdirSync(pastaDestino, { recursive: true });
}

// ───────────────────────────────────────────────────────────
// 1. PROPOSTA COMERCIAL
// ───────────────────────────────────────────────────────────

const htmlProposta = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Proposta Comercial ${dados.numero} - ${dados.cliente}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .cabecalho { text-align: center; border-bottom: 3px solid #003366; padding-bottom: 20px; margin-bottom: 30px; }
        .cabecalho h1 { color: #003366; margin: 5px 0; font-size: 28px; }
        .cabecalho p { margin: 3px 0; color: #666; }
        .info-box { background: #f5f5f5; padding: 15px; border-left: 4px solid #003366; margin: 20px 0; }
        .info-box h3 { margin-top: 0; color: #003366; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #003366; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .valor-destaque { font-size: 24px; font-weight: bold; color: #003366; }
        .rodape { margin-top: 50px; padding-top: 20px; border-top: 2px solid #003366; font-size: 12px; color: #666; }
        .badge { background: #28a745; color: white; padding: 5px 10px; border-radius: 3px; font-size: 12px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="cabecalho">
        <h1>LASEC - USINAGEM DE PRECISÃO CNC</h1>
        <p>MALELO-INDÚSTRIA E COMERCIO FERRAMENTAS-SOCIEDADE LIMITADA ME</p>
        <p>Rua Álvaro Silva, 233 - Bairro do Limão - São Paulo/SP - CEP 02723-020</p>
        <p>Tel: (11) 3936-5041 | (11) 3935-1271 | contato@lasec.com.br</p>
        <p>CNPJ: 07.047.619/0001-09 | IE: 117.116.373.116</p>
    </div>

    <h2 style="color: #003366;">PROPOSTA COMERCIAL Nº ${dados.numero} <span class="badge">✅ DADOS AS-BUILT</span></h2>

    <div class="info-box">
        <h3>DADOS DO CLIENTE</h3>
        <p><strong>Cliente:</strong> ${dados.clienteCompleto}</p>
        <p><strong>Endereço:</strong> Rua Barão de São Luis, 70 – Jd. Primavera – São Paulo – SP</p>
        <p><strong>Telefone:</strong> (11) 2239-7388</p>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>

    <div class="info-box">
        <h3>ESPECIFICAÇÃO TÉCNICA</h3>
        <p><strong>Código:</strong> ${dados.codigoPeca}</p>
        <p><strong>Descrição:</strong> ${dados.nomePeca}</p>
        <p><strong>Material fornecido:</strong> ${dados.material} - ${dados.dimensoesMaterial}</p>
        <p><strong>Tratamento térmico:</strong> ${dados.tratamento}</p>
        <p><strong>Quantidade:</strong> ${dados.quantidade} peças</p>
        <p><strong>Máquina:</strong> ${dados.maquina} (Torno CNC)</p>
        <p><strong>Programa CNC:</strong> ${dados.programa}</p>
        <p><strong>Tempo por peça:</strong> ${dados.tempoUsinagem} minutos <span class="badge">VALIDADO EM PRODUÇÃO</span></p>
    </div>

    <h3 style="color: #003366;">VALORES</h3>
    <table>
        <tr>
            <th>Descrição</th>
            <th style="text-align: right;">Valor Unitário</th>
            <th style="text-align: right;">Quantidade</th>
            <th style="text-align: right;">Valor Total</th>
        </tr>
        <tr>
            <td>Serviço de usinagem CNC - Peça ${dados.codigoPeca}</td>
            <td style="text-align: right;">R$ ${precoFinal.toFixed(2)}</td>
            <td style="text-align: right;">${dados.quantidade}</td>
            <td style="text-align: right;"><strong>R$ ${precoTotalNFe.toFixed(2)}</strong></td>
        </tr>
    </table>

    <div style="text-align: right; margin: 30px 0;">
        <p style="font-size: 18px; color: #666;">VALOR TOTAL DA NOTA FISCAL:</p>
        <p class="valor-destaque">R$ ${precoTotalNFe.toFixed(2)}</p>
    </div>

    <div class="info-box" style="border-left-color: #28a745;">
        <h3>🎯 GARANTIA DE PRECISÃO</h3>
        <p>Este orçamento foi calculado com base em <strong>dados reais de produção</strong> validados em nosso chão de fábrica:</p>
        <ul>
            <li>✅ Ordem de Produção AS-BUILT (Máquina DOOSAN 2)</li>
            <li>✅ Tempo real medido: 7,9 min/peça + 15% margem de segurança</li>
            <li>✅ Ferramental testado e documentado</li>
            <li>✅ Processo validado pelo operador certificado ANDRE</li>
        </ul>
    </div>

    <h3 style="color: #003366;">CONDIÇÕES COMERCIAIS</h3>
    <ul>
        <li><strong>Validade da proposta:</strong> 15 dias corridos</li>
        <li><strong>Forma de pagamento:</strong> 50% antecipado + 50% na entrega</li>
        <li><strong>Prazo de entrega:</strong> A combinar após confirmação do pedido</li>
        <li><strong>Frete:</strong> FOB (por conta do cliente)</li>
        <li><strong>Material:</strong> Fornecido pelo cliente</li>
        <li><strong>NF-e:</strong> Emitida no regime Simples Nacional</li>
        <li><strong>Tolerâncias:</strong> Conforme desenho técnico fornecido</li>
    </ul>

    <div class="info-box">
        <h3>OBSERVAÇÕES IMPORTANTES</h3>
        <p>• Valores não incluem material (fornecido pelo cliente)</p>
        <p>• Tratamento térmico e retificação são responsabilidade do cliente</p>
        <p>• Primeira produção inclui setup e validação dimensional</p>
        <p>• Produções futuras dispensam custos de desenvolvimento</p>
    </div>

    <div style="margin-top: 60px; text-align: center;">
        <p>_________________________________________________</p>
        <p><strong>Alexandre Gonçalves de Souza</strong></p>
        <p>Sócio-Diretor | LASEC Usinagem de Precisão</p>
    </div>

    <div class="rodape">
        <p>LASEC - Usinagem de Precisão CNC | Desde 2004</p>
        <p>Proposta gerada em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(pastaDestino, 'PROPOSTA_COMERCIAL_MICROGEAR_1.60.01.548.html'), htmlProposta);

// ───────────────────────────────────────────────────────────
// 2. ESTUDO DE CUSTO
// ───────────────────────────────────────────────────────────

const htmlCusto = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Estudo de Custo ${dados.numero}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1 { color: #003366; border-bottom: 3px solid #003366; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #003366; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .total { background: #f0f0f0; font-weight: bold; font-size: 16px; }
        .badge { background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; font-size: 11px; }
    </style>
</head>
<body>
    <h1>ESTUDO DE CUSTO DE FABRICAÇÃO <span class="badge">AS-BUILT</span></h1>
    <p><strong>Orçamento:</strong> ${dados.numero} | <strong>Cliente:</strong> ${dados.cliente} | <strong>Peça:</strong> ${dados.codigoPeca}</p>

    <h3>DADOS DE PRODUÇÃO REAIS</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Tempo de usinagem (AS-BUILT)</td><td>${dados.tempoUsinagem} min/peça</td></tr>
        <tr><td>Tempo em horas</td><td>${tempoHoras.toFixed(4)} h/peça</td></tr>
        <tr><td>Máquina utilizada</td><td>${dados.maquina}</td></tr>
        <tr><td>Programa CNC</td><td>${dados.programa}</td></tr>
        <tr><td>Operador validador</td><td>${dados.operador}</td></tr>
        <tr><td>Quantidade</td><td>${dados.quantidade} peças</td></tr>
    </table>

    <h3>COMPOSIÇÃO DE CUSTOS</h3>
    <table>
        <tr><th>Item</th><th>Base</th><th>Valor Unitário</th></tr>
        <tr><td>MOD (Mão de Obra Direta)</td><td>R$ ${dados.custoMODHora.toFixed(2)}/hora × ${tempoHoras.toFixed(4)} h</td><td>R$ ${custoMOD.toFixed(2)}</td></tr>
        <tr><td>Custos Indiretos (58%)</td><td>${(dados.indiretosMOD * 100).toFixed(0)}% sobre MOD</td><td>R$ ${custoIndiretos.toFixed(2)}</td></tr>
        <tr class="total"><td colspan="2">CUSTO TOTAL</td><td>R$ ${custoTotal.toFixed(2)}</td></tr>
    </table>

    <h3>TOTAIS DO LOTE</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Custo unitário</td><td>R$ ${custoTotal.toFixed(2)}/peça</td></tr>
        <tr><td>Quantidade</td><td>${dados.quantidade} peças</td></tr>
        <tr class="total"><td>CUSTO TOTAL DO LOTE</td><td>R$ ${custoTotalLote.toFixed(2)}</td></tr>
    </table>
</body>
</html>`;

fs.writeFileSync(path.join(pastaDestino, 'ESTUDO_CUSTO_FABRICACAO_1.60.01.548.html'), htmlCusto);

// ───────────────────────────────────────────────────────────
// 3. ESTUDO DE PREÇO
// ───────────────────────────────────────────────────────────

const htmlPreco = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Estudo de Preço ${dados.numero}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1 { color: #003366; border-bottom: 3px solid #003366; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #003366; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .total { background: #f0f0f0; font-weight: bold; font-size: 16px; }
        .destaque { background: #ffffcc; }
    </style>
</head>
<body>
    <h1>ESTUDO DE PREÇO DE VENDA NFe</h1>
    <p><strong>Orçamento:</strong> ${dados.numero} | <strong>Cliente:</strong> ${dados.cliente} | <strong>Peça:</strong> ${dados.codigoPeca}</p>

    <h3>FORMAÇÃO DE PREÇO</h3>
    <table>
        <tr><th>Item</th><th>Cálculo</th><th>Valor Unitário</th></tr>
        <tr><td>Custo total</td><td>MOD + Indiretos</td><td>R$ ${custoTotal.toFixed(2)}</td></tr>
        <tr><td>Markup aplicado</td><td>${dados.markup.toFixed(3)} (${((dados.markup - 1) * 100).toFixed(0)}% margem)</td><td>-</td></tr>
        <tr><td>Preço s/ impostos</td><td>R$ ${custoTotal.toFixed(2)} × ${dados.markup}</td><td>R$ ${precoSemImpostos.toFixed(2)}</td></tr>
        <tr><td>Impostos Simples (8,5%)</td><td>${(dados.impostos * 100).toFixed(1)}% sobre preço</td><td>R$ ${valorImpostos.toFixed(2)}</td></tr>
        <tr class="total destaque"><td colspan="2">PREÇO FINAL NFe</td><td>R$ ${precoFinal.toFixed(2)}</td></tr>
    </table>

    <h3>ANÁLISE DE RENTABILIDADE</h3>
    <table>
        <tr><th>Item</th><th>Valor</th><th>%</th></tr>
        <tr><td>Preço venda NFe</td><td>R$ ${precoFinal.toFixed(2)}</td><td>100,0%</td></tr>
        <tr><td>(-) Custo total</td><td>R$ ${custoTotal.toFixed(2)}</td><td>${((custoTotal / precoFinal) * 100).toFixed(1)}%</td></tr>
        <tr><td>(-) Impostos</td><td>R$ ${valorImpostos.toFixed(2)}</td><td>${((valorImpostos / precoFinal) * 100).toFixed(1)}%</td></tr>
        <tr class="total"><td>LUCRO LÍQUIDO</td><td>R$ ${lucroLiquido.toFixed(2)}</td><td>${(dados.margemLiquida * 100).toFixed(1)}%</td></tr>
    </table>

    <h3>TOTAIS NFe (${dados.quantidade} peças)</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Custo total lote</td><td>R$ ${custoTotalLote.toFixed(2)}</td></tr>
        <tr class="total destaque"><td>VALOR NOTA FISCAL</td><td>R$ ${precoTotalNFe.toFixed(2)}</td></tr>
        <tr><td>Lucro líquido total</td><td>R$ ${(lucroLiquido * dados.quantidade).toFixed(2)}</td></tr>
    </table>
</body>
</html>`;

fs.writeFileSync(path.join(pastaDestino, 'ESTUDO_PRECO_VENDA_NFE_1.60.01.548.html'), htmlPreco);

// ───────────────────────────────────────────────────────────
// 4. PROCESSO DE FABRICAÇÃO
// ───────────────────────────────────────────────────────────

let ferramentasHTML = '';
dados.ferramentas.forEach(f => {
    ferramentasHTML += `
        <tr>
            <td>${f.ferramenta}</td>
            <td>${f.descricao}</td>
            <td>${f.suporte}</td>
            <td>${f.inserto}</td>
            <td>${f.rpm}</td>
            <td>${f.avanco}</td>
            <td>${f.operacao}</td>
        </tr>
    `;
});

const htmlProcesso = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Processo de Fabricação ${dados.numero}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1 { color: #003366; border-bottom: 3px solid #003366; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 11px; }
        th { background: #003366; color: white; padding: 8px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        .badge { background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; font-size: 11px; }
    </style>
</head>
<body>
    <h1>PROCESSO DE FABRICAÇÃO <span class="badge">VALIDADO EM PRODUÇÃO</span></h1>
    <p><strong>Orçamento:</strong> ${dados.numero} | <strong>Peça:</strong> ${dados.codigoPeca} - ${dados.nomePeca}</p>

    <h3>DADOS DE PRODUÇÃO</h3>
    <table>
        <tr><th>Item</th><th>Especificação</th></tr>
        <tr><td>Material bruto</td><td>${dados.material} - ${dados.dimensoesMaterial}</td></tr>
        <tr><td>Máquina</td><td>${dados.maquina} (Torno CNC)</td></tr>
        <tr><td>Programa CNC</td><td>${dados.programa}</td></tr>
        <tr><td>Fixação</td><td>Castanha "T"</td></tr>
        <tr><td>Tempo total</td><td>${dados.tempoUsinagem} min/peça (AS-BUILT validado)</td></tr>
        <tr><td>Operador validador</td><td>${dados.operador}</td></tr>
    </table>

    <h3>FERRAMENTAL UTILIZADO (DADOS REAIS)</h3>
    <table>
        <tr>
            <th>Ferramenta</th>
            <th>Descrição</th>
            <th>Suporte</th>
            <th>Inserto</th>
            <th>RPM</th>
            <th>Avanço</th>
            <th>Operação</th>
        </tr>
        ${ferramentasHTML}
    </table>

    <h3>OBSERVAÇÕES TÉCNICAS</h3>
    <ul>
        <li>✅ Processo validado em produção real</li>
        <li>✅ Ferramental testado e documentado</li>
        <li>✅ Tempo medido em 60 peças produzidas</li>
        <li>✅ Tolerâncias conforme desenho técnico</li>
        <li>⚠️ Tratamento térmico: ${dados.tratamento}</li>
    </ul>
</body>
</html>`;

fs.writeFileSync(path.join(pastaDestino, 'PROCESSO_FABRICACAO_1.60.01.548.html'), htmlProcesso);

console.log('✅ 4 documentos HTML gerados\n');

// ═══════════════════════════════════════════════════════════
// CONVERTER PARA PDF
// ═══════════════════════════════════════════════════════════

console.log('📑 Convertendo para PDF...\n');

const arquivos = [
    'PROPOSTA_COMERCIAL_MICROGEAR_1.60.01.548',
    'ESTUDO_CUSTO_FABRICACAO_1.60.01.548',
    'ESTUDO_PRECO_VENDA_NFE_1.60.01.548',
    'PROCESSO_FABRICACAO_1.60.01.548'
];

arquivos.forEach((arquivo, i) => {
    const htmlPath = path.join(pastaDestino, `${arquivo}.html`);
    const pdfPath = path.join(pastaDestino, `${arquivo}.pdf`);
    const tempDir = `C:\\temp\\edge_orc006_${i}`;

    const cmd = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --headless --disable-gpu --user-data-dir="${tempDir}" --print-to-pdf="${pdfPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;

    try {
        execSync(cmd, { stdio: 'ignore' });
        console.log(`   ✅ ${arquivo}.pdf`);
    } catch (error) {
        console.log(`   ⚠️ Erro ao gerar ${arquivo}.pdf`);
    }
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ORÇAMENTO 006/2025 GERADO COM SUCESSO!');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`📁 Pasta: ${pastaDestino}`);
console.log(`💰 Valor total NFe: R$ ${precoTotalNFe.toFixed(2)}`);
console.log(`📊 Margem líquida: ${(dados.margemLiquida * 100).toFixed(1)}%`);
console.log(`⏱️ Tempo: ${dados.tempoUsinagem} min/peça (DADOS AS-BUILT)\n`);

// Salvar registro do orçamento
const registro = {
    numero: dados.numero,
    data: dados.data,
    cliente: dados.cliente,
    peca: dados.codigoPeca,
    material: dados.material,
    quantidade: dados.quantidade,
    tempoMinutos: dados.tempoUsinagem,
    custoUnitario: parseFloat(custoTotal.toFixed(2)),
    precoUnitario: parseFloat(precoFinal.toFixed(2)),
    valorTotal: parseFloat(precoTotalNFe.toFixed(2)),
    margemLiquida: parseFloat((dados.margemLiquida * 100).toFixed(2)),
    status: 'valido',
    dadosASBUILT: true,
    maquina: dados.maquina,
    programa: dados.programa,
    operador: dados.operador,
    pasta: pastaDestino
};

fs.writeFileSync(
    path.join(pastaDestino, 'registro_orcamento_006.json'),
    JSON.stringify(registro, null, 2)
);

console.log('💾 Registro salvo: registro_orcamento_006.json\n');
