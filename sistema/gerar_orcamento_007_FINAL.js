// ═══════════════════════════════════════════════════════════
// ORÇAMENTO 007/2025 - TAMPA DE ALUMÍNIO
// Cliente: LASEC (uso interno)
// VALORES FINAIS CORRETOS: Hora/máquina R$ 120 + Imposto 10%
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════');
console.log('📄 GERANDO ORÇAMENTO 007/2025 - VALORES FINAIS');
console.log('═══════════════════════════════════════════════════════════\n');

// ═════════════════════════════════════════════════════════
// DADOS DO ORÇAMENTO
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
    tempoMinutos: 9.6,
    tempoHoras: 0.16, // 9.6 / 60

    // CUSTO (baseado em orçamentos anteriores)
    custoHoraMaquina: 120.00, // R$/hora (padrão LASEC orç 001, 002, 006)
    percentualIndiretos: 58, // % sobre MOD

    // MOD
    custoMOD: 19.20, // 120 * 0.16
    custoIndiretos: 11.14, // 19.20 * 0.58
    custoTotal: 30.34, // 19.20 + 11.14

    // PREÇO
    markup: 1.29, // (usado no orç 006)
    impostos: 10.0, // % Simples Nacional (CORRIGIDO!)

    precoSemImpostos: 39.14, // 30.34 * 1.29
    valorImpostos: 3.91, // 39.14 * 0.10
    precoFinal: 43.05, // 39.14 + 3.91

    // TOTAIS
    custoTotalLote: 273.06, // 30.34 * 9
    precoTotalLote: 387.45, // 43.05 * 9
    lucroLiquido: 8.80, // 43.05 - 30.34 - 3.91
    margemLiquida: 20.4 // (8.80 / 43.05) * 100
};

console.log('📊 VALORES CALCULADOS:');
console.log(`   Hora/Máquina: R$ ${orc.custoHoraMaquina.toFixed(2)}/h`);
console.log(`   Custo MOD: R$ ${orc.custoMOD.toFixed(2)}`);
console.log(`   Custo Total: R$ ${orc.custoTotal.toFixed(2)}`);
console.log(`   Preço NFe: R$ ${orc.precoFinal.toFixed(2)}`);
console.log(`   Valor Total: R$ ${orc.precoTotalLote.toFixed(2)}`);
console.log(`   Imposto: ${orc.impostos}% (CORRIGIDO!)\n`);

// ═══════════════════════════════════════════════════════════
// 1. ESTUDO DE CUSTO DE FABRICAÇÃO (formato simples)
// ═══════════════════════════════════════════════════════════

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
        .info { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>ESTUDO DE CUSTO DE FABRICAÇÃO <span class="badge">ESTIMATIVA</span></h1>
    <p><strong>Orçamento:</strong> ${orc.numero} | <strong>Cliente:</strong> ${orc.cliente} | <strong>Peça:</strong> ${orc.codigo}</p>

    <h3>ESPECIFICAÇÕES DA PEÇA</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Código</td><td>${orc.codigo}</td></tr>
        <tr><td>Descrição</td><td>${orc.peca}</td></tr>
        <tr><td>Material</td><td>${orc.material}</td></tr>
        <tr><td>Material bruto</td><td>${orc.materialBruto}</td></tr>
        <tr><td>Dimensões</td><td>Ø${orc.diametroExterno}mm x ${orc.altura}mm altura</td></tr>
        <tr><td>Diâmetro interno</td><td>Ø${orc.diametroInterno}mm</td></tr>
        <tr><td>Quantidade</td><td>${orc.quantidade} peças</td></tr>
    </table>

    <h3>TEMPO DE USINAGEM</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Tempo estimado de usinagem</td><td>${orc.tempoMinutos} min/peça (${orc.tempoHoras.toFixed(4)} h)</td></tr>
        <tr><td>Máquina</td><td>Torno CNC DOOSAN</td></tr>
        <tr><td>Método de estimativa</td><td>Biblioteca CNC (11.785 programas) + EIXO_SIMPLES</td></tr>
        <tr><td>Confiabilidade</td><td>60-70%</td></tr>
    </table>

    <div class="info">
        <strong>ℹ️ Método de cálculo:</strong> Estimativa baseada em análise de peças similares em alumínio
        da biblioteca CNC LASEC. Tempo inclui margem de segurança de 20%.
    </div>

    <h3>COMPOSIÇÃO DE CUSTOS</h3>
    <table>
        <tr><th>Item</th><th>Base</th><th>Valor Unitário</th></tr>
        <tr><td>Custo hora/máquina</td><td>Padrão LASEC</td><td>R$ ${orc.custoHoraMaquina.toFixed(2)}/h</td></tr>
        <tr><td>MOD (Mão de Obra Direta)</td><td>R$ ${orc.custoHoraMaquina.toFixed(2)}/h × ${orc.tempoHoras.toFixed(4)} h</td><td>R$ ${orc.custoMOD.toFixed(2)}</td></tr>
        <tr><td>Custos Indiretos (${orc.percentualIndiretos}%)</td><td>${orc.percentualIndiretos}% sobre MOD</td><td>R$ ${orc.custoIndiretos.toFixed(2)}</td></tr>
        <tr class="total"><td colspan="2">CUSTO TOTAL UNITÁRIO</td><td>R$ ${orc.custoTotal.toFixed(2)}</td></tr>
    </table>

    <div class="info">
        <strong>📊 Composição dos custos indiretos (${orc.percentualIndiretos}%):</strong>
        <ul>
            <li>Energia elétrica: 15%</li>
            <li>Depreciação de máquinas: 10%</li>
            <li>Ferramental e pastilhas: 20%</li>
            <li>Manutenção e lubrificação: 5%</li>
            <li>Despesas gerais: 8%</li>
        </ul>
    </div>

    <h3>TOTAIS DO LOTE</h3>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Custo unitário</td><td>R$ ${orc.custoTotal.toFixed(2)}/peça</td></tr>
        <tr><td>Quantidade</td><td>${orc.quantidade} peças</td></tr>
        <tr><td>Tempo total do lote</td><td>${(orc.tempoMinutos * orc.quantidade).toFixed(1)} minutos (${(orc.tempoHoras * orc.quantidade).toFixed(2)} horas)</td></tr>
        <tr class="total"><td>CUSTO TOTAL DO LOTE</td><td>R$ ${orc.custoTotalLote.toFixed(2)}</td></tr>
    </table>

    <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        <strong>LASEC - Usinagem de Precisão CNC</strong><br>
        Documento gerado em ${orc.data} | Sistema V2.0 com IA
    </p>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════
// 2. ESTUDO DE PREÇO DE VENDA
// ═══════════════════════════════════════════════════════════

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
        .lucro { background: #fff3cd; padding: 20px; text-align: center; margin: 20px 0; border-left: 4px solid #ffc107; }
        .lucro h2 { color: #856404; margin: 0 0 10px 0; }
        .lucro .valor { font-size: 36px; color: #28a745; font-weight: bold; }
    </style>
</head>
<body>
    <h1>ESTUDO DE PREÇO DE VENDA (NFe)</h1>
    <p><strong>Orçamento:</strong> ${orc.numero} | <strong>Cliente:</strong> ${orc.cliente} | <strong>Peça:</strong> ${orc.codigo}</p>

    <h3>COMPOSIÇÃO DO PREÇO UNITÁRIO</h3>
    <table>
        <tr><th>Item</th><th>Valor</th><th>%</th></tr>
        <tr><td>1. Custo de Fabricação</td><td>R$ ${orc.custoTotal.toFixed(2)}</td><td>${((orc.custoTotal / orc.precoFinal) * 100).toFixed(1)}%</td></tr>
        <tr><td>2. Markup (${((orc.markup - 1) * 100).toFixed(0)}%)</td><td>R$ ${(orc.precoSemImpostos - orc.custoTotal).toFixed(2)}</td><td>${(((orc.precoSemImpostos - orc.custoTotal) / orc.precoFinal) * 100).toFixed(1)}%</td></tr>
        <tr><td>3. Impostos Simples Nacional (${orc.impostos}%)</td><td>R$ ${orc.valorImpostos.toFixed(2)}</td><td>${((orc.valorImpostos / orc.precoFinal) * 100).toFixed(1)}%</td></tr>
        <tr class="total"><td>PREÇO FINAL NFe (UNITÁRIO)</td><td>R$ ${orc.precoFinal.toFixed(2)}</td><td>100%</td></tr>
    </table>

    <h3>VALORES TOTAIS DO LOTE (${orc.quantidade} peças)</h3>
    <table>
        <tr><th>Item</th><th>Valor Total</th></tr>
        <tr><td>Custo Total de Fabricação</td><td>R$ ${orc.custoTotalLote.toFixed(2)}</td></tr>
        <tr><td>Impostos Totais</td><td>R$ ${(orc.valorImpostos * orc.quantidade).toFixed(2)}</td></tr>
        <tr class="total"><td>VALOR TOTAL NFe</td><td>R$ ${orc.precoTotalLote.toFixed(2)}</td></tr>
    </table>

    <h3>ANÁLISE DE LUCRATIVIDADE</h3>
    <table>
        <tr><th>Descrição</th><th>Unitário</th><th>Total (${orc.quantidade} peças)</th></tr>
        <tr><td>Receita (Preço de Venda)</td><td>R$ ${orc.precoFinal.toFixed(2)}</td><td>R$ ${orc.precoTotalLote.toFixed(2)}</td></tr>
        <tr><td>(-) Custo de Fabricação</td><td>R$ ${orc.custoTotal.toFixed(2)}</td><td>R$ ${orc.custoTotalLote.toFixed(2)}</td></tr>
        <tr><td>(-) Impostos</td><td>R$ ${orc.valorImpostos.toFixed(2)}</td><td>R$ ${(orc.valorImpostos * orc.quantidade).toFixed(2)}</td></tr>
        <tr class="total"><td>LUCRO LÍQUIDO</td><td>R$ ${orc.lucroLiquido.toFixed(2)}</td><td>R$ ${(orc.lucroLiquido * orc.quantidade).toFixed(2)}</td></tr>
    </table>

    <div class="lucro">
        <h2>📈 MARGEM DE LUCRO LÍQUIDA</h2>
        <div class="valor">${orc.margemLiquida.toFixed(1)}%</div>
        <p style="color: #666; margin-top: 10px;">Sobre o preço de venda</p>
    </div>

    <h3>INDICADORES FINANCEIROS</h3>
    <table>
        <tr><th>Indicador</th><th>Valor</th></tr>
        <tr><td>ROI por peça</td><td>${((orc.lucroLiquido / orc.custoTotal) * 100).toFixed(1)}%</td></tr>
        <tr><td>Markup aplicado</td><td>${((orc.markup - 1) * 100).toFixed(0)}%</td></tr>
        <tr><td>Margem de contribuição</td><td>${(((orc.precoFinal - orc.custoTotal) / orc.precoFinal) * 100).toFixed(1)}%</td></tr>
        <tr><td>Ponto de equilíbrio</td><td>${(orc.custoTotalLote / orc.precoFinal).toFixed(1)} peças</td></tr>
    </table>

    <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        <strong>LASEC - Usinagem de Precisão CNC</strong><br>
        Documento gerado em ${orc.data} | Sistema V2.0
    </p>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════
// 3. PROPOSTA COMERCIAL
// ═══════════════════════════════════════════════════════════

const htmlProposta = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Proposta Comercial 007/2025</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1 { color: #dc3545; border-bottom: 3px solid #dc3545; padding-bottom: 10px; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #dc3545; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .proposta { background: white; border: 3px solid #dc3545; padding: 30px; text-align: center; margin: 30px 0; }
        .proposta .valor { font-size: 48px; color: #28a745; font-weight: bold; margin: 20px 0; }
        .proposta .unitario { font-size: 18px; color: #666; }
        ul { line-height: 1.8; }
        .assinatura { margin-top: 60px; padding-top: 20px; border-top: 2px solid #000; text-align: center; }
    </style>
</head>
<body>
    <h1>PROPOSTA COMERCIAL</h1>
    <p style="text-align: center;"><strong>Orçamento ${orc.numero}</strong> | ${orc.data}</p>

    <h3>PRODUTO</h3>
    <table>
        <tr><th>Item</th><th>Especificação</th></tr>
        <tr><td>Descrição</td><td>${orc.peca}</td></tr>
        <tr><td>Código</td><td>${orc.codigo}</td></tr>
        <tr><td>Material</td><td>${orc.material}</td></tr>
        <tr><td>Matéria-prima</td><td>${orc.materialBruto}</td></tr>
        <tr><td>Dimensões</td><td>Ø${orc.diametroExterno}mm x ${orc.altura}mm altura</td></tr>
        <tr><td>Quantidade</td><td><strong>${orc.quantidade} peças</strong></td></tr>
    </table>

    <div class="proposta">
        <h2 style="color: #dc3545; margin: 0;">💰 VALOR DA PROPOSTA</h2>
        <p class="unitario">Valor unitário: <strong>R$ ${orc.precoFinal.toFixed(2)}</strong></p>
        <div class="valor">R$ ${orc.precoTotalLote.toFixed(2)}</div>
        <p style="color: #666;">Valor total para ${orc.quantidade} peças</p>
    </div>

    <h3>CONDIÇÕES COMERCIAIS</h3>
    <ul>
        <li><strong>Validade da proposta:</strong> 15 dias corridos</li>
        <li><strong>Forma de pagamento:</strong> 50% antecipado + 50% na entrega</li>
        <li><strong>Prazo de entrega:</strong> A combinar após confirmação do pedido</li>
        <li><strong>Frete:</strong> FOB (por conta do cliente)</li>
        <li><strong>Garantia:</strong> 90 dias contra defeitos de fabricação</li>
    </ul>

    <h3>ESCOPO DO FORNECIMENTO</h3>
    <ul>
        <li>Usinagem completa em Torno CNC DOOSAN (Alta precisão)</li>
        <li>Conforme desenho técnico fornecido</li>
        <li>Material: ${orc.material}</li>
        <li>Acabamento conforme especificação</li>
        <li>Inspeção dimensional 100%</li>
        <li>Embalagem individual para proteção</li>
    </ul>

    <h3>OBSERVAÇÕES</h3>
    <ul>
        <li>Material fornecido pelo cliente (não incluso no preço)</li>
        <li>Valores sujeitos à disponibilidade de máquina</li>
        <li>Primeira produção inclui tempo de setup</li>
        <li>Desenho técnico deve ser fornecido em PDF ou DWG</li>
    </ul>

    <h3>CONTATO</h3>
    <table>
        <tr><td><strong>Empresa:</strong></td><td>LASEC - Usinagem de Precisão CNC</td></tr>
        <tr><td><strong>Responsável:</strong></td><td>Alexandre Gonçalves de Souza</td></tr>
        <tr><td><strong>Telefone:</strong></td><td>(11) 3936-5041</td></tr>
        <tr><td><strong>E-mail:</strong></td><td>contato@lasec.com.br</td></tr>
        <tr><td><strong>Endereço:</strong></td><td>Rua Álvaro Silva, 233 - Bairro do Limão - São Paulo/SP</td></tr>
    </table>

    <div class="assinatura">
        <p><strong>LASEC - Usinagem de Precisão CNC</strong></p>
        <p style="margin-top: 30px;">_________________________________</p>
        <p>Alexandre Gonçalves de Souza</p>
        <p>Responsável Técnico</p>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">São Paulo, ${orc.data}</p>
    </div>

    <p style="margin-top: 40px; text-align: center; color: #666; font-size: 11px;">
        Este documento é válido por 15 dias | Orçamento ${orc.numero} | Sistema LASEC V2.0
    </p>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════
// 4. PROCESSO DE FABRICAÇÃO
// ═══════════════════════════════════════════════════════════

const htmlProcesso = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Processo de Fabricação 007/2025</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1 { color: #003366; border-bottom: 3px solid #003366; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 11px; }
        th { background: #003366; color: white; padding: 8px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        .badge { background: #ffc107; color: #333; padding: 3px 8px; border-radius: 3px; font-size: 11px; }
        ul { line-height: 1.8; }
    </style>
</head>
<body>
    <h1>PROCESSO DE FABRICAÇÃO <span class="badge">ESTIMATIVA</span></h1>
    <p><strong>Orçamento:</strong> ${orc.numero} | <strong>Peça:</strong> ${orc.codigo} - ${orc.peca}</p>

    <h3>ESPECIFICAÇÕES</h3>
    <table>
        <tr><th>Item</th><th>Especificação</th></tr>
        <tr><td>Material bruto</td><td>${orc.materialBruto}</td></tr>
        <tr><td>Material</td><td>${orc.material}</td></tr>
        <tr><td>Dimensões</td><td>Ø${orc.diametroExterno}mm x ${orc.altura}mm altura | Ø${orc.diametroInterno}mm interno</td></tr>
        <tr><td>Máquina</td><td>Torno CNC DOOSAN</td></tr>
        <tr><td>Tempo estimado</td><td>${orc.tempoMinutos} min/peça</td></tr>
        <tr><td>Quantidade</td><td>${orc.quantidade} peças</td></tr>
    </table>

    <h3>SEQUÊNCIA DE OPERAÇÕES PROPOSTA</h3>
    <table>
        <tr>
            <th>Op.</th>
            <th>Ferramenta</th>
            <th>Descrição</th>
            <th>Parâmetros Sugeridos</th>
            <th>Operação</th>
        </tr>

        <tr>
            <td>1</td>
            <td>T01</td>
            <td>FACEAR</td>
            <td>Vc: 280 m/min | F: 0.15 mm/rot</td>
            <td>Faceamento frontal</td>
        </tr>

        <tr>
            <td>2</td>
            <td>T02</td>
            <td>DESBASTAR EXT</td>
            <td>Vc: 300 m/min | F: 0.20 mm/rot | Ap: 2.0mm</td>
            <td>Desbaste externo até Ø${orc.diametroExterno}mm</td>
        </tr>

        <tr>
            <td>3</td>
            <td>T03</td>
            <td>ACABAR EXT</td>
            <td>Vc: 250 m/min | F: 0.08 mm/rot | Ap: 0.3mm</td>
            <td>Acabamento externo Ø${orc.diametroExterno}mm</td>
        </tr>

        <tr>
            <td>4</td>
            <td>T04</td>
            <td>BROCA Ø3.5</td>
            <td>Vc: 80 m/min | F: 0.08 mm/rot</td>
            <td>Furação 2x Ø3.5mm</td>
        </tr>

        <tr>
            <td>5</td>
            <td>T05</td>
            <td>BROCA/FRESA Ø18.5</td>
            <td>Vc: 100 m/min | F: 0.10 mm/rot</td>
            <td>Furação Ø18.5mm (sextavado)</td>
        </tr>

        <tr>
            <td>6</td>
            <td>T06</td>
            <td>CORTAR</td>
            <td>Vc: 200 m/min | F: 0.05 mm/rot</td>
            <td>Acabamento final e corte</td>
        </tr>
    </table>

    <h3>FERRAMENTAL RECOMENDADO</h3>
    <table>
        <tr><th>Ferramenta</th><th>Descrição</th><th>Observação</th></tr>
        <tr><td>T01</td><td>Facear</td><td>Pastilha IC20 (PCD) para alumínio</td></tr>
        <tr><td>T02</td><td>Desbastar externo</td><td>Pastilha IC20 (PCD) para alumínio</td></tr>
        <tr><td>T03</td><td>Acabar externo</td><td>Pastilha IC20 (PCD) para acabamento</td></tr>
        <tr><td>T04</td><td>Broca Ø3.5mm</td><td>HSS-Co ou Metal Duro para alumínio</td></tr>
        <tr><td>T05</td><td>Broca/Fresa Ø18.5mm</td><td>Metal Duro para alumínio</td></tr>
        <tr><td>T06</td><td>Cortar/Sangrar</td><td>Ferramenta de corte largura 3mm</td></tr>
    </table>

    <h3>PARÂMETROS DE CORTE PARA ALUMÍNIO 6061</h3>
    <table>
        <tr><th>Operação</th><th>Velocidade de Corte</th><th>Avanço</th></tr>
        <tr><td>Desbaste</td><td>280-350 m/min</td><td>0.12-0.25 mm/rot</td></tr>
        <tr><td>Acabamento</td><td>220-300 m/min</td><td>0.05-0.08 mm/rot</td></tr>
    </table>

    <h3>OBSERVAÇÕES TÉCNICAS</h3>
    <ul>
        <li>⚠️ Tempo estimado baseado em biblioteca CNC (11.785 programas)</li>
        <li>⚠️ Confiabilidade da estimativa: 60-70%</li>
        <li>✅ Parâmetros validados para alumínio 6061</li>
        <li>✅ Pastilhas PCD recomendadas para maior durabilidade</li>
        <li>⚠️ Primeira produção incluirá setup e ajustes</li>
        <li>⚠️ Tolerâncias conforme desenho técnico fornecido</li>
        <li>💡 Recomenda-se validação com peça piloto</li>
    </ul>

    <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        <strong>LASEC - Usinagem de Precisão CNC</strong><br>
        Documento gerado em ${orc.data} | Sistema V2.0 com IA
    </p>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════
// SALVAR ARQUIVOS
// ═══════════════════════════════════════════════════════════

const pastaOrcamento = 'd:/lasec/orcamentos/2025/LASEC/007_LASEC_TAMPA_ALUMINIO';
const desktop = 'C:/Users/lasec/Desktop';

console.log('💾 Salvando arquivos HTML...\n');

fs.writeFileSync(path.join(pastaOrcamento, 'ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html'), htmlCusto);
console.log('✅ ESTUDO_CUSTO_FABRICACAO_TAMPA_ALUMINIO_007.html');

fs.writeFileSync(path.join(pastaOrcamento, 'ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html'), htmlPreco);
console.log('✅ ESTUDO_PRECO_VENDA_NFE_TAMPA_ALUMINIO_007.html');

fs.writeFileSync(path.join(pastaOrcamento, 'PROPOSTA_COMERCIAL_LASEC_TAMPA_ALUMINIO_007.html'), htmlProposta);
console.log('✅ PROPOSTA_COMERCIAL_LASEC_TAMPA_ALUMINIO_007.html');

fs.writeFileSync(path.join(pastaOrcamento, 'PROCESSO_FABRICACAO_TAMPA_ALUMINIO_007.html'), htmlProcesso);
console.log('✅ PROCESSO_FABRICACAO_TAMPA_ALUMINIO_007.html');

// Copiar para desktop
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

console.log('\n📋 Arquivos copiados para Desktop!');

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
    precoUnitario: 43.05,
    valorTotal: 387.45,
    margemLiquida: 20.4,
    impostos: 10.0,
    status: 'valido',
    observacao: 'Estimativa baseada em EIXO_SIMPLES + margem 20% | Imposto 10%'
};

fs.writeFileSync(
    'd:/lasec/orcamentos/2025/007_orcamento_tampa_aluminio.json',
    JSON.stringify(orcamentoJSON, null, 2)
);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ORÇAMENTO 007/2025 FINALIZADO!');
console.log('═══════════════════════════════════════════════════════════\n');
console.log('💰 VALORES FINAIS:');
console.log(`   Custo: R$ ${orc.custoTotal.toFixed(2)}/peça`);
console.log(`   Preço NFe: R$ ${orc.precoFinal.toFixed(2)}/peça`);
console.log(`   Total: R$ ${orc.precoTotalLote.toFixed(2)} (${orc.quantidade} peças)`);
console.log(`   Margem: ${orc.margemLiquida.toFixed(1)}%`);
console.log(`   Imposto: ${orc.impostos}% ✅\n`);
