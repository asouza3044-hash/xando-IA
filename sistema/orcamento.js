/**
 * ═══════════════════════════════════════════════════════════════
 * AGENTE AUTOMATIZADO DE ORÇAMENTOS - LASEC USINAGEM
 * ═══════════════════════════════════════════════════════════════
 *
 * Sistema completo para geração automática de orçamentos CNC
 *
 * Autor: Claude Code + Alexandre Souza
 * Data: 05/11/2025
 * Versão: 1.0.0
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ═══════════════════════════════════════════════════════════════
// MÓDULO 1: LEITURA E VALIDAÇÃO DE DADOS
// ═══════════════════════════════════════════════════════════════

class OrcamentoAutomatizado {
    constructor() {
        this.baseDados = this.carregarBaseDados();
        this.config = {
            pastaBase: 'd:\\lasec',
            pastaOrcamentos: 'd:\\lasec\\orcamentos\\2025',
            pastaTemplates: 'd:\\lasec\\templates',
            edgePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        };
    }

    carregarBaseDados() {
        const caminhoBase = 'd:\\lasec\\base_dados\\dados_completos_orcamentos.json';
        return JSON.parse(fs.readFileSync(caminhoBase, 'utf8'));
    }

    salvarBaseDados() {
        const caminhoBase = 'd:\\lasec\\base_dados\\dados_completos_orcamentos.json';
        fs.writeFileSync(caminhoBase, JSON.stringify(this.baseDados, null, 2), 'utf8');
    }

    // ═══════════════════════════════════════════════════════════════
    // MÓDULO 2: ANÁLISE INTELIGENTE DA PEÇA
    // ═══════════════════════════════════════════════════════════════

    analisarPeca(dadosEntrada) {
        console.log('🔍 Analisando peça...');

        const analise = {
            codigo: dadosEntrada.codigo,
            tipo: this.identificarTipoPeca(dadosEntrada),
            materialBruto: dadosEntrada.materialBruto,
            materialAcabado: dadosEntrada.material,
            comprimentoTotal: dadosEntrada.comprimento,
            diametroMaximo: this.calcularDiametroMaximo(dadosEntrada),
            volumeMaterial: this.calcularVolumeRemovido(dadosEntrada),
            complexidade: this.avaliarComplexidade(dadosEntrada),
            tratamentoTermico: dadosEntrada.tratamentoTermico || null,
            cliente: dadosEntrada.cliente
        };

        console.log(`   ✓ Tipo: ${analise.tipo}`);
        console.log(`   ✓ Material bruto: ${analise.materialBruto}`);
        console.log(`   ✓ Complexidade: ${analise.complexidade}`);

        return analise;
    }

    identificarTipoPeca(dados) {
        if (dados.tipo) return dados.tipo;

        // Identificação automática baseada em características
        if (dados.comprimento > dados.diametroMaximo * 2) {
            return 'EIXO';
        } else if (dados.diametroInterno) {
            return 'BUCHA';
        }
        return 'PEÇA TORNEADA';
    }

    calcularDiametroMaximo(dados) {
        if (dados.diametroMaximo) return dados.diametroMaximo;
        if (dados.diametros && dados.diametros.length > 0) {
            return Math.max(...dados.diametros.map(d => parseFloat(d)));
        }
        return 0;
    }

    calcularVolumeRemovido(dados) {
        // Cálculo simplificado: volume cilindro bruto - volume aproximado acabado
        const rb = dados.materialBruto.diametro / 2;
        const ra = this.calcularDiametroMaximo(dados) / 2;
        const comprimento = dados.comprimento;

        const volumeBruto = Math.PI * rb * rb * comprimento;
        const volumeAcabado = Math.PI * ra * ra * comprimento * 0.6; // 60% aproximado

        return volumeBruto - volumeAcabado;
    }

    avaliarComplexidade(dados) {
        let pontos = 0;

        // Critérios de complexidade
        if (dados.diametros && dados.diametros.length > 5) pontos += 2;
        else if (dados.diametros && dados.diametros.length > 3) pontos += 1;

        if (dados.tolerancias && dados.tolerancias.includes('H7')) pontos += 2;
        else if (dados.tolerancias && dados.tolerancias.includes('H9')) pontos += 1;

        if (dados.canais || dados.roscas) pontos += 1;
        if (dados.tratamentoTermico) pontos += 1;
        if (dados.comprimento > 150) pontos += 1;

        if (pontos >= 5) return 'ALTA';
        if (pontos >= 3) return 'MÉDIA';
        return 'BAIXA';
    }

    // ═══════════════════════════════════════════════════════════════
    // MÓDULO 3: CÁLCULO AUTOMÁTICO DE TEMPOS
    // ═══════════════════════════════════════════════════════════════

    calcularTempos(analise, dadosEntrada) {
        console.log('⏱️  Calculando tempos de usinagem...');

        const tempos = {
            setup: this.calcularSetup(analise),
            faceamento: this.calcularFaceamento(analise),
            desbaste: this.calcularDesbaste(analise, dadosEntrada),
            acabamento: this.calcularAcabamento(analise, dadosEntrada),
            operacoesEspeciais: this.calcularOperacoesEspeciais(dadosEntrada),
            inspecao: this.calcularInspecao(analise),
            total: 0
        };

        tempos.total = Object.values(tempos).reduce((a, b) => a + b, 0) - tempos.total;

        console.log(`   ✓ Tempo total: ${tempos.total.toFixed(1)} min/peça`);

        return tempos;
    }

    calcularSetup(analise) {
        // Setup primeira peça: 3 min, demais: 1 min
        return 1.0;
    }

    calcularFaceamento(analise) {
        // Baseado no diâmetro e material
        const diametro = analise.diametroMaximo;
        const tempo = (diametro / 50) * 1.5; // ~1.5 min para Ø50
        return Math.max(0.5, tempo);
    }

    calcularDesbaste(analise, dados) {
        // Baseado no volume a remover e parâmetros de corte
        const diametroBruto = dados.materialBruto.diametro;
        const diametroAcabado = analise.diametroMaximo;
        const comprimento = analise.comprimentoTotal;

        // Material a remover por lado
        const remocao = (diametroBruto - diametroAcabado) / 2;

        if (remocao < 1) {
            // Pouca remoção (material já próximo da dimensão final)
            return comprimento / 50 * 0.5; // ~0.5 min para cada 50mm
        }

        // Cálculo baseado em volume e taxa de remoção
        const volumeRemover = Math.PI * remocao * (diametroBruto + diametroAcabado) / 2 * comprimento;
        const taxaRemocao = 50000; // mm³/min (típico para desbaste)

        return volumeRemover / taxaRemocao;
    }

    calcularAcabamento(analise, dados) {
        // Baseado no comprimento e número de diâmetros
        const comprimento = analise.comprimentoTotal;
        const numDiametros = dados.diametros ? dados.diametros.length : 3;

        // Tempo base + tempo por diâmetro
        const tempoBase = comprimento / 40; // ~2.5 min para 100mm
        const tempoExtra = numDiametros * 0.3;

        return tempoBase + tempoExtra;
    }

    calcularOperacoesEspeciais(dados) {
        let tempo = 0;

        if (dados.canais) tempo += dados.canais * 0.5;
        if (dados.roscas) tempo += dados.roscas * 1.0;
        if (dados.furos) tempo += dados.furos * 0.8;

        return tempo;
    }

    calcularInspecao(analise) {
        // Baseado na complexidade
        const tempos = {
            'BAIXA': 1.0,
            'MÉDIA': 1.5,
            'ALTA': 2.5
        };

        return tempos[analise.complexidade] || 1.5;
    }

    // ═══════════════════════════════════════════════════════════════
    // MÓDULO 4: CÁLCULO DE CUSTOS E PREÇOS
    // ═══════════════════════════════════════════════════════════════

    calcularCustos(tempos, quantidade, parametros) {
        console.log('💰 Calculando custos e preços...');

        const params = parametros || {
            horaMaquina: this.baseDados.parametros_orcamento.custo_hora_maquina_competitivo,
            custosIndiretos: this.baseDados.parametros_orcamento.custos_indiretos_percentual / 100,
            markup: this.baseDados.parametros_orcamento.markup_reduzido,
            impostos: this.baseDados.parametros_orcamento.aliquota_simples_nacional / 100,
            comissao: this.baseDados.parametros_orcamento.comissao_vendas_reduzida / 100,
            despesas: this.baseDados.parametros_orcamento.despesas_comerciais_reduzida / 100
        };

        // Tempo em horas
        const tempoHoras = tempos.total / 60;
        const tempoTotalHoras = (tempoHoras * quantidade);

        // MOD (Mão de Obra Direta)
        const mod = tempoTotalHoras * params.horaMaquina;
        const modUnitario = mod / quantidade;

        // Custos Indiretos
        const custosIndiretos = mod * params.custosIndiretos;
        const custosIndiretosUnitario = custosIndiretos / quantidade;

        // Custo Total
        const custoTotal = mod + custosIndiretos;
        const custoUnitario = custoTotal / quantidade;

        // Preço com Markup
        const precoBase = custoUnitario * params.markup;
        const precoTotal = precoBase * quantidade;

        // Cálculo de impostos e deduções
        const impostoValor = precoTotal * params.impostos;
        const comissaoValor = precoTotal * params.comissao;
        const despesasValor = precoTotal * params.despesas;
        const deducoes = impostoValor + comissaoValor + despesasValor;

        // Lucro líquido
        const lucroLiquido = precoTotal - custoTotal - deducoes;
        const margemLiquida = (lucroLiquido / precoTotal) * 100;

        const custos = {
            tempoMinutos: tempos.total,
            tempoHoras: tempoTotalHoras,
            horaMaquina: params.horaMaquina,
            mod: mod,
            modUnitario: modUnitario,
            custosIndiretos: custosIndiretos,
            custosIndiretosUnitario: custosIndiretosUnitario,
            custoTotal: custoTotal,
            custoUnitario: custoUnitario,
            precoUnitario: precoBase,
            precoTotal: precoTotal,
            impostos: impostoValor,
            comissao: comissaoValor,
            despesas: despesasValor,
            lucroLiquido: lucroLiquido,
            margemLiquida: margemLiquida,
            quantidade: quantidade
        };

        console.log(`   ✓ Custo unitário: R$ ${custoUnitario.toFixed(2)}`);
        console.log(`   ✓ Preço unitário: R$ ${precoBase.toFixed(2)}`);
        console.log(`   ✓ Margem líquida: ${margemLiquida.toFixed(1)}%`);

        return custos;
    }

    // ═══════════════════════════════════════════════════════════════
    // MÓDULO 5: GERAÇÃO DE DOCUMENTOS HTML
    // ═══════════════════════════════════════════════════════════════

    gerarDocumentos(analise, tempos, custos, dadosEntrada) {
        console.log('📄 Gerando documentos HTML...');

        const numeroOrcamento = this.obterProximoNumeroOrcamento();
        const dataAtual = new Date().toLocaleDateString('pt-BR');

        const documentos = {
            custosHTML: this.gerarEstudoCustos(analise, tempos, custos, numeroOrcamento, dataAtual, dadosEntrada),
            precosHTML: this.gerarEstudoPrecos(analise, custos, numeroOrcamento, dataAtual, dadosEntrada),
            propostaHTML: this.gerarPropostaComercial(analise, custos, numeroOrcamento, dataAtual, dadosEntrada),
            processoHTML: this.gerarProcessoFabricacao(analise, tempos, dadosEntrada, numeroOrcamento, dataAtual)
        };

        console.log(`   ✓ 4 documentos HTML gerados`);

        return documentos;
    }

    obterProximoNumeroOrcamento() {
        const contador = this.baseDados.configuracao_sistema.contador_orcamento_ano;
        return `00${contador + 1}`.slice(-3) + '/2025';
    }

    gerarEstudoCustos(analise, tempos, custos, numero, data, dados) {
        // Template simplificado do estudo de custos
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Estudo de Custos - ${analise.codigo}</title>
<style>
body { font-family: Arial; margin: 30px; }
.header { background: #003366; color: white; padding: 20px; text-align: center; }
.section { margin: 20px 0; }
.table { width: 100%; border-collapse: collapse; margin: 10px 0; }
.table th { background: #495057; color: white; padding: 8px; }
.table td { border: 1px solid #ddd; padding: 8px; }
.highlight { background: #d4edda; font-weight: bold; }
.alert { background: #fff3cd; padding: 15px; margin: 15px 0; border-left: 4px solid #ffc107; }
</style>
</head>
<body>
<div class="header">
    <h2>📊 ESTUDO DE CUSTOS DE FABRICAÇÃO</h2>
    <div>ORÇAMENTO ${numero} - ${analise.codigo}</div>
</div>

<div class="section">
    <h3>1. DADOS DA PEÇA</h3>
    <table class="table">
        <tr><td><strong>Código:</strong></td><td>${analise.codigo}</td></tr>
        <tr><td><strong>Cliente:</strong></td><td>${analise.cliente}</td></tr>
        <tr><td><strong>Tipo:</strong></td><td>${analise.tipo}</td></tr>
        <tr><td><strong>Material:</strong></td><td>${analise.materialAcabado}</td></tr>
        <tr><td><strong>Material bruto:</strong></td><td>Ø${dados.materialBruto.diametro} ${dados.materialBruto.tolerancia} x ${dados.materialBruto.comprimento}mm</td></tr>
        <tr><td><strong>Quantidade:</strong></td><td>${custos.quantidade} peças</td></tr>
        <tr><td><strong>Comprimento:</strong></td><td>${analise.comprimentoTotal} mm</td></tr>
        <tr><td><strong>Complexidade:</strong></td><td>${analise.complexidade}</td></tr>
    </table>
</div>

${dados.tratamentoTermico ? `
<div class="alert">
    <strong>⚠️ ATENÇÃO:</strong> Peça requer tratamento térmico ${dados.tratamentoTermico} (cliente responsável).
    Deixar sobremetal adequado para retificação pós-têmpera.
</div>
` : ''}

<div class="section">
    <h3>2. TEMPOS DE USINAGEM</h3>
    <table class="table">
        <tr><th>Operação</th><th>Tempo (min)</th><th>% do total</th></tr>
        <tr><td>Setup e fixação</td><td>${tempos.setup.toFixed(1)}</td><td>${((tempos.setup/tempos.total)*100).toFixed(1)}%</td></tr>
        <tr><td>Faceamento</td><td>${tempos.faceamento.toFixed(1)}</td><td>${((tempos.faceamento/tempos.total)*100).toFixed(1)}%</td></tr>
        <tr><td>Desbaste</td><td>${tempos.desbaste.toFixed(1)}</td><td>${((tempos.desbaste/tempos.total)*100).toFixed(1)}%</td></tr>
        <tr><td>Acabamento</td><td>${tempos.acabamento.toFixed(1)}</td><td>${((tempos.acabamento/tempos.total)*100).toFixed(1)}%</td></tr>
        ${tempos.operacoesEspeciais > 0 ? `<tr><td>Operações especiais</td><td>${tempos.operacoesEspeciais.toFixed(1)}</td><td>${((tempos.operacoesEspeciais/tempos.total)*100).toFixed(1)}%</td></tr>` : ''}
        <tr><td>Inspeção</td><td>${tempos.inspecao.toFixed(1)}</td><td>${((tempos.inspecao/tempos.total)*100).toFixed(1)}%</td></tr>
        <tr class="highlight"><td><strong>TOTAL</strong></td><td><strong>${tempos.total.toFixed(1)}</strong></td><td><strong>100%</strong></td></tr>
    </table>
</div>

<div class="section">
    <h3>3. CUSTOS DE FABRICAÇÃO</h3>
    <table class="table">
        <tr><th>Item</th><th>Unitário</th><th>Total (${custos.quantidade} pçs)</th></tr>
        <tr><td>Tempo de usinagem</td><td>${custos.tempoMinutos.toFixed(1)} min</td><td>${custos.tempoHoras.toFixed(1)} horas</td></tr>
        <tr><td>Hora/máquina</td><td colspan="2">R$ ${custos.horaMaquina.toFixed(2)}/h</td></tr>
        <tr><td>MOD (Mão de Obra Direta)</td><td>R$ ${custos.modUnitario.toFixed(2)}</td><td>R$ ${custos.mod.toFixed(2)}</td></tr>
        <tr><td>Custos Indiretos (58%)</td><td>R$ ${custos.custosIndiretosUnitario.toFixed(2)}</td><td>R$ ${custos.custosIndiretos.toFixed(2)}</td></tr>
        <tr class="highlight"><td><strong>CUSTO TOTAL</strong></td><td><strong>R$ ${custos.custoUnitario.toFixed(2)}</strong></td><td><strong>R$ ${custos.custoTotal.toFixed(2)}</strong></td></tr>
    </table>
</div>

<div class="section">
    <h3>4. FORMAÇÃO DE PREÇO</h3>
    <table class="table">
        <tr><td>Custo de fabricação</td><td>R$ ${custos.custoUnitario.toFixed(2)}</td></tr>
        <tr><td>Markup (${((this.baseDados.parametros_orcamento.markup_reduzido - 1) * 100).toFixed(1)}%)</td><td>R$ ${(custos.precoUnitario - custos.custoUnitario).toFixed(2)}</td></tr>
        <tr class="highlight"><td><strong>PREÇO UNITÁRIO</strong></td><td><strong>R$ ${custos.precoUnitario.toFixed(2)}</strong></td></tr>
        <tr class="highlight"><td><strong>PREÇO TOTAL (${custos.quantidade} pçs)</strong></td><td><strong>R$ ${custos.precoTotal.toFixed(2)}</strong></td></tr>
    </table>
</div>

<div style="margin-top: 40px; text-align: center; color: #666; font-size: 9pt;">
    LASEC USINAGEM - Estudo de Custos<br>
    Orçamento ${numero} | ${data} | <span style="color: #dc3545;">DOCUMENTO INTERNO</span><br>
    🤖 Gerado automaticamente pelo Sistema de Orçamentos LASEC v1.0
</div>

</body>
</html>`;
    }

    gerarEstudoPrecos(analise, custos, numero, data, dados) {
        // Estudo de preços com impostos (versão simplificada)
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Estudo de Preços - ${analise.codigo}</title>
<style>
body { font-family: Arial; margin: 30px; }
.header { background: #003366; color: white; padding: 20px; text-align: center; }
.table { width: 100%; border-collapse: collapse; margin: 10px 0; }
.table th { background: #495057; color: white; padding: 8px; }
.table td { border: 1px solid #ddd; padding: 8px; }
.highlight { background: #d4edda; font-weight: bold; }
</style>
</head>
<body>
<div class="header">
    <h2>💰 ESTUDO DE PREÇO DE VENDA (NFe)</h2>
    <div>ORÇAMENTO ${numero} - ${analise.codigo}</div>
</div>

<h3>RESUMO FINANCEIRO</h3>
<table class="table">
    <tr><td><strong>Preço unitário:</strong></td><td>R$ ${custos.precoUnitario.toFixed(2)}/peça</td></tr>
    <tr><td><strong>Valor total NFe:</strong></td><td>R$ ${custos.precoTotal.toFixed(2)}</td></tr>
    <tr><td><strong>Custo total:</strong></td><td>R$ ${custos.custoTotal.toFixed(2)}</td></tr>
    <tr><td><strong>Margem bruta:</strong></td><td>R$ ${(custos.precoTotal - custos.custoTotal).toFixed(2)} (${(((custos.precoTotal - custos.custoTotal)/custos.precoTotal)*100).toFixed(1)}%)</td></tr>
    <tr><td><strong>Impostos (8,5%):</strong></td><td>R$ ${custos.impostos.toFixed(2)}</td></tr>
    <tr><td><strong>Comissões (2%):</strong></td><td>R$ ${custos.comissao.toFixed(2)}</td></tr>
    <tr><td><strong>Despesas (2%):</strong></td><td>R$ ${custos.despesas.toFixed(2)}</td></tr>
    <tr class="highlight"><td><strong>LUCRO LÍQUIDO:</strong></td><td><strong>R$ ${custos.lucroLiquido.toFixed(2)} (${custos.margemLiquida.toFixed(1)}%)</strong></td></tr>
</table>

<div style="margin-top: 40px; text-align: center; color: #666; font-size: 9pt;">
    LASEC USINAGEM - Estudo de Preços<br>
    Orçamento ${numero} | ${data} | <span style="color: #dc3545;">DOCUMENTO INTERNO</span><br>
    🤖 Gerado automaticamente pelo Sistema de Orçamentos LASEC v1.0
</div>
</body>
</html>`;
    }

    gerarPropostaComercial(analise, custos, numero, data, dados) {
        const cliente = this.baseDados.clientes.find(c => c.nome_curto === analise.cliente);

        return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Proposta Comercial - ${analise.codigo}</title>
<style>
body { font-family: Arial; margin: 30px; }
.header { background: #003366; color: white; padding: 20px; text-align: center; }
.table { width: 100%; border-collapse: collapse; margin: 10px 0; }
.table th { background: #495057; color: white; padding: 8px; }
.table td { border: 1px solid #ddd; padding: 8px; }
.highlight { background: #d4edda; font-weight: bold; font-size: 14pt; }
.alert { background: #fff3cd; padding: 15px; margin: 15px 0; border-left: 4px solid #ffc107; }
</style>
</head>
<body>
<div class="header">
    <h1>LASEC USINAGEM</h1>
    <p>Usinagem de Precisão CNC</p>
</div>

<h2>📋 PROPOSTA COMERCIAL Nº ${numero}</h2>

<table class="table">
    <tr><td><strong>Cliente:</strong></td><td>${analise.cliente}</td></tr>
    <tr><td><strong>Data:</strong></td><td>${data}</td></tr>
    <tr><td><strong>Validade:</strong></td><td>15 dias</td></tr>
</table>

<h3>ESPECIFICAÇÕES TÉCNICAS</h3>
<table class="table">
    <tr><td><strong>Peça:</strong></td><td>${analise.codigo} (${analise.tipo})</td></tr>
    <tr><td><strong>Material:</strong></td><td>${analise.materialAcabado}</td></tr>
    <tr><td><strong>Quantidade:</strong></td><td>${custos.quantidade} peças</td></tr>
    <tr><td><strong>Processo:</strong></td><td>Torneamento CNC de precisão</td></tr>
</table>

${dados.tratamentoTermico ? `
<div class="alert">
    <strong>⚠️ IMPORTANTE - ESCOPO DO FORNECIMENTO:</strong><br><br>
    <strong>LASEC fornece:</strong> Torneamento CNC de precisão pré-tratamento térmico<br>
    <strong>CLIENTE responsável:</strong> Tratamento térmico ${dados.tratamentoTermico} e retificação pós-têmpera
</div>
` : ''}

<h3>VALORES</h3>
<table class="table">
    <tr><th>Item</th><th>Descrição</th><th>Qtd.</th><th>Valor Unit.</th><th>Valor Total</th></tr>
    <tr>
        <td>01</td>
        <td><strong>${analise.codigo}</strong><br>Torneamento CNC<br>Material: ${analise.materialAcabado}</td>
        <td>${custos.quantidade} pçs</td>
        <td>R$ ${custos.precoUnitario.toFixed(2)}</td>
        <td>R$ ${custos.precoTotal.toFixed(2)}</td>
    </tr>
    <tr class="highlight">
        <td colspan="4" align="right"><strong>VALOR TOTAL:</strong></td>
        <td><strong>R$ ${custos.precoTotal.toFixed(2)}</strong></td>
    </tr>
</table>

<h3>CONDIÇÕES COMERCIAIS</h3>
<table class="table">
    <tr><td><strong>Pagamento:</strong></td><td>50% antecipado + 50% contra entrega</td></tr>
    <tr><td><strong>Prazo:</strong></td><td>15-20 dias úteis após confirmação</td></tr>
    <tr><td><strong>Frete:</strong></td><td>CIF São Paulo/SP</td></tr>
    <tr><td><strong>Validade:</strong></td><td>15 dias</td></tr>
</table>

<div style="margin-top: 50px; padding: 20px; background: #f8f9fa; border: 2px solid #003366; text-align: center;">
    <strong>LASEC USINAGEM</strong><br>
    Rua Álvaro Silva, 233 - Bairro do Limão - São Paulo/SP<br>
    Tel: (11) 3936-5041 / (11) 3935-1271<br>
    contato@lasec.com.br
</div>

<div style="margin-top: 20px; text-align: center; color: #666; font-size: 9pt;">
    Proposta ${numero} | ${data}<br>
    🤖 Gerado automaticamente pelo Sistema de Orçamentos LASEC v1.0
</div>
</body>
</html>`;
    }

    gerarProcessoFabricacao(analise, tempos, dados, numero, data) {
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Processo de Fabricação - ${analise.codigo}</title>
<style>
body { font-family: Arial; margin: 30px; font-size: 10pt; }
.header { background: #003366; color: white; padding: 20px; text-align: center; }
.table { width: 100%; border-collapse: collapse; margin: 10px 0; }
.table th { background: #495057; color: white; padding: 8px; }
.table td { border: 1px solid #ddd; padding: 6px; }
.operation { background: #e7f3ff; border-left: 4px solid #0066cc; padding: 10px; margin: 10px 0; }
.alert { background: #f8d7da; border-left: 4px solid #dc3545; padding: 10px; margin: 10px 0; }
</style>
</head>
<body>
<div class="header">
    <h2>🔧 PROCESSO DE FABRICAÇÃO</h2>
    <div>${analise.codigo} - Orçamento ${numero}</div>
</div>

<h3>DADOS DA PEÇA</h3>
<table class="table">
    <tr><td><strong>Código:</strong></td><td>${analise.codigo}</td></tr>
    <tr><td><strong>Cliente:</strong></td><td>${analise.cliente}</td></tr>
    <tr><td><strong>Material bruto:</strong></td><td>Ø${dados.materialBruto.diametro} ${dados.materialBruto.tolerancia} x ${dados.materialBruto.comprimento}mm</td></tr>
    <tr><td><strong>Material acabado:</strong></td><td>${analise.materialAcabado}</td></tr>
    <tr><td><strong>Comprimento:</strong></td><td>${analise.comprimentoTotal} mm</td></tr>
    <tr><td><strong>Máquina:</strong></td><td>Centro de Torneamento CNC Romi GL280</td></tr>
</table>

${dados.tratamentoTermico ? `
<div class="alert">
    <strong>⚠️ CRÍTICO:</strong> Peça requer TRATAMENTO TÉRMICO ${dados.tratamentoTermico} (cliente faz).
    <strong>DEIXAR SOBREMETAL: Diâmetros +1,5mm | Comprimentos +0,5mm</strong>
</div>
` : ''}

<h3>FERRAMENTAS - KENNAMETAL</h3>
<table class="table">
    <tr><th>Ferramenta</th><th>Aplicação</th><th>Pastilha</th><th>Grade</th></tr>
    <tr><td>T01</td><td>Desbaste externo</td><td>CNMG 120408-KCP25</td><td>KC725M (CVD)</td></tr>
    <tr><td>T02</td><td>Acabamento</td><td>CNMG 120404-MF3</td><td>KC5010 (PVD)</td></tr>
    <tr><td>T03</td><td>Faceamento</td><td>DNMG 150608-KF</td><td>KC5010</td></tr>
</table>

<h3>PARÂMETROS DE CORTE (Aço C45 ~200HB)</h3>
<table class="table">
    <tr><th>Operação</th><th>Vc (m/min)</th><th>fn (mm/rot)</th><th>ap (mm)</th></tr>
    <tr><td>Desbaste</td><td>220-250</td><td>0,30-0,50</td><td>2,0-4,0</td></tr>
    <tr><td>Acabamento</td><td>280-320</td><td>0,08-0,15</td><td>0,2-0,5</td></tr>
    <tr><td>Faceamento</td><td>220-250</td><td>0,20-0,35</td><td>1,0-3,0</td></tr>
</table>

<h3>SEQUÊNCIA DE OPERAÇÕES</h3>

<div class="operation">
    <strong>OP10 - FIXAÇÃO E SETUP</strong> (${tempos.setup.toFixed(1)} min)<br>
    • Fixar peça na placa 3 castanhas<br>
    • Verificar concentricidade < 0,1mm<br>
    • Posicionar ponta rotativa (se necessário)<br>
    • Zerar peça (Z0 na face, X0 no eixo)
</div>

<div class="operation">
    <strong>OP20 - FACEAMENTO TOPO</strong> (${tempos.faceamento.toFixed(1)} min)<br>
    • T03 - DNMG (faceamento)<br>
    • Facear topo frontal - face plana e perpendicular<br>
    • Estabelecer Z0 de referência
</div>

<div class="operation">
    <strong>OP30 - DESBASTE DIÂMETROS</strong> (${tempos.desbaste.toFixed(1)} min)<br>
    • T01 - CNMG (desbaste)<br>
    • Desbastar todos os diâmetros<br>
    ${dados.tratamentoTermico ? '• <strong>DEIXAR SOBREMETAL: +1,5mm nos diâmetros</strong><br>' : ''}
    • Passes de 3mm, do maior para o menor diâmetro
</div>

<div class="operation">
    <strong>OP40 - ACABAMENTO FINAL</strong> (${tempos.acabamento.toFixed(1)} min)<br>
    • T02 - CNMG (acabamento)<br>
    • Acabamento fino de todos os diâmetros<br>
    ${dados.tratamentoTermico ? '• <strong>Dimensões: Desenho + sobremetal</strong><br>' : ''}
    • Tolerâncias: ${dados.tolerancias || 'H12'}<br>
    • Acabamento Ra ≤ 1,6 μm
</div>

${tempos.operacoesEspeciais > 0 ? `
<div class="operation">
    <strong>OP50 - OPERAÇÕES ESPECIAIS</strong> (${tempos.operacoesEspeciais.toFixed(1)} min)<br>
    • Canais, roscas, furos conforme desenho
</div>
` : ''}

<div class="operation">
    <strong>OP${tempos.operacoesEspeciais > 0 ? '60' : '50'} - INSPEÇÃO DIMENSIONAL</strong> (${tempos.inspecao.toFixed(1)} min)<br>
    • Verificar 100% das dimensões<br>
    ${dados.tratamentoTermico ? '• <strong>Confirmar sobremetal em todos os diâmetros</strong><br>' : ''}
    • Instrumentos: Paquímetro, micrômetro, rugosímetro<br>
    • Documentar: 1ª, 5ª e última peça
</div>

<h3>RESUMO DE TEMPOS</h3>
<table class="table">
    <tr><td><strong>Tempo total por peça:</strong></td><td><strong>${tempos.total.toFixed(1)} minutos</strong></td></tr>
    <tr><td>Produtividade:</td><td>${(60/tempos.total).toFixed(1)} peças/hora</td></tr>
</table>

<div style="margin-top: 30px; text-align: center; color: #666; font-size: 9pt;">
    LASEC USINAGEM - Processo de Fabricação<br>
    Orçamento ${numero} | ${data} | <span style="color: #dc3545;">DOCUMENTO INTERNO</span><br>
    🤖 Gerado automaticamente pelo Sistema de Orçamentos LASEC v1.0
</div>
</body>
</html>`;
    }

    // ═══════════════════════════════════════════════════════════════
    // MÓDULO 6: CONVERSÃO PARA PDF
    // ═══════════════════════════════════════════════════════════════

    async converterParaPDF(htmlPaths, outputDir) {
        console.log('📑 Convertendo documentos para PDF...');

        const pdfs = [];

        for (let i = 0; i < htmlPaths.length; i++) {
            const htmlPath = htmlPaths[i];
            const pdfPath = htmlPath.replace('.html', '.pdf');

            try {
                const cmd = `"${this.config.edgePath}" --headless --disable-gpu --user-data-dir="C:\\temp\\edge_auto_${i}" --print-to-pdf="${pdfPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;
                execSync(cmd, { timeout: 30000 });
                pdfs.push(pdfPath);
                console.log(`   ✓ ${path.basename(pdfPath)}`);
            } catch (error) {
                console.error(`   ✗ Erro ao converter ${path.basename(htmlPath)}: ${error.message}`);
            }
        }

        return pdfs;
    }

    // ═══════════════════════════════════════════════════════════════
    // MÓDULO 7: ORGANIZAÇÃO DE ARQUIVOS E GITHUB
    // ═══════════════════════════════════════════════════════════════

    organizarArquivos(analise, documentos, custos, numeroOrcamento) {
        console.log('📁 Organizando arquivos do orçamento...');

        const pastaOrcamento = path.join(
            this.config.pastaOrcamentos,
            `${numeroOrcamento.replace('/', '')}_${analise.cliente}_${analise.codigo}`
        );

        // Criar pasta se não existir
        if (!fs.existsSync(pastaOrcamento)) {
            fs.mkdirSync(pastaOrcamento, { recursive: true });
        }

        // Salvar documentos HTML
        const arquivos = [];

        fs.writeFileSync(path.join(pastaOrcamento, `ESTUDO_CUSTO_FABRICACAO_${analise.codigo}.html`), documentos.custosHTML);
        arquivos.push(`ESTUDO_CUSTO_FABRICACAO_${analise.codigo}.html`);

        fs.writeFileSync(path.join(pastaOrcamento, `ESTUDO_PRECO_VENDA_NFE_${analise.codigo}.html`), documentos.precosHTML);
        arquivos.push(`ESTUDO_PRECO_VENDA_NFE_${analise.codigo}.html`);

        fs.writeFileSync(path.join(pastaOrcamento, `PROPOSTA_COMERCIAL_${analise.cliente}_${analise.codigo}.html`), documentos.propostaHTML);
        arquivos.push(`PROPOSTA_COMERCIAL_${analise.cliente}_${analise.codigo}.html`);

        fs.writeFileSync(path.join(pastaOrcamento, `PROCESSO_FABRICACAO_${analise.codigo}.html`), documentos.processoHTML);
        arquivos.push(`PROCESSO_FABRICACAO_${analise.codigo}.html`);

        console.log(`   ✓ Pasta criada: ${pastaOrcamento}`);
        console.log(`   ✓ ${arquivos.length} arquivos salvos`);

        return { pastaOrcamento, arquivos };
    }

    atualizarBaseDados(analise, custos, numeroOrcamento, pastaOrcamento) {
        console.log('💾 Atualizando base de dados...');

        // Atualizar contador
        this.baseDados.configuracao_sistema.contador_orcamento_ano++;

        // Adicionar ao histórico do cliente
        const cliente = this.baseDados.clientes.find(c => c.nome_curto === analise.cliente);
        if (cliente) {
            if (!cliente.historico_orcamentos) {
                cliente.historico_orcamentos = [];
            }
            cliente.historico_orcamentos.push({
                numero: numeroOrcamento,
                data: new Date().toISOString().split('T')[0],
                peca: analise.codigo,
                valor: custos.precoTotal,
                status: 'pendente'
            });
        }

        // Adicionar aos últimos orçamentos
        this.baseDados.ultimos_orcamentos.push({
            numero: numeroOrcamento,
            data: new Date().toISOString().split('T')[0],
            cliente: analise.cliente,
            peca: analise.codigo,
            material: analise.materialAcabado,
            quantidade: custos.quantidade,
            preco_unitario: custos.precoUnitario,
            valor_total: custos.precoTotal,
            tempo_peça_minutos: custos.tempoMinutos,
            hora_maquina_utilizada: custos.horaMaquina,
            margem_liquida_percentual: custos.margemLiquida,
            status: 'pendente',
            arquivo: pastaOrcamento
        });

        this.salvarBaseDados();
        console.log('   ✓ Base de dados atualizada');
    }

    // ═══════════════════════════════════════════════════════════════
    // MÓDULO 8: EXECUÇÃO PRINCIPAL
    // ═══════════════════════════════════════════════════════════════

    async executar(dadosEntrada) {
        console.log('═══════════════════════════════════════════════════════════');
        console.log('🤖 AGENTE AUTOMATIZADO DE ORÇAMENTOS - LASEC');
        console.log('═══════════════════════════════════════════════════════════\n');

        try {
            // 1. Analisar peça
            const analise = this.analisarPeca(dadosEntrada);

            // 2. Calcular tempos
            const tempos = this.calcularTempos(analise, dadosEntrada);

            // 3. Calcular custos
            const custos = this.calcularCustos(tempos, dadosEntrada.quantidade, dadosEntrada.parametros);

            // 4. Gerar documentos
            const documentos = this.gerarDocumentos(analise, tempos, custos, dadosEntrada);

            // 5. Organizar arquivos
            const numeroOrcamento = this.obterProximoNumeroOrcamento();
            const { pastaOrcamento, arquivos } = this.organizarArquivos(analise, documentos, custos, numeroOrcamento);

            // 6. Converter para PDF
            const htmlPaths = arquivos.map(a => path.join(pastaOrcamento, a));
            const pdfs = await this.converterParaPDF(htmlPaths, pastaOrcamento);

            // 7. Atualizar base de dados
            this.atualizarBaseDados(analise, custos, numeroOrcamento, pastaOrcamento);

            console.log('\n═══════════════════════════════════════════════════════════');
            console.log('✅ ORÇAMENTO GERADO COM SUCESSO!');
            console.log('═══════════════════════════════════════════════════════════');

            return {
                sucesso: true,
                numeroOrcamento,
                pastaOrcamento,
                analise,
                tempos,
                custos,
                arquivos,
                pdfs
            };

        } catch (error) {
            console.error('\n❌ ERRO:', error.message);
            console.error(error.stack);
            return {
                sucesso: false,
                erro: error.message
            };
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// EXPORTAR E INTERFACE CLI
// ═══════════════════════════════════════════════════════════════

module.exports = OrcamentoAutomatizado;

// Se executado diretamente (não como módulo)
if (require.main === module) {
    console.log('Use: node gerar_orcamento.js com dados de entrada');
    console.log('Ou importe como módulo: const OrcamentoAutomatizado = require("./gerar_orcamento.js")');
}
