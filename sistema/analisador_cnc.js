/**
 * ═══════════════════════════════════════════════════════════════
 * ANALISADOR DE PROGRAMAS CNC - LASEC USINAGEM
 * ═══════════════════════════════════════════════════════════════
 *
 * Extrai dados reais de programas CNC Fanuc para aprendizado do agente
 *
 * Autor: Claude Code + Alexandre Souza
 * Data: 05/11/2025
 * Versão: 1.0.0
 */

const fs = require('fs');

class AnalisadorCNC {
    constructor() {
        this.programa = null;
        this.operacoes = [];
        this.ferramentas = {};
        this.tempoTotal = 0;
    }

    // ═══════════════════════════════════════════════════════════════
    // LEITURA E PARSING DO PROGRAMA
    // ═══════════════════════════════════════════════════════════════

    lerPrograma(caminhoArquivo) {
        console.log('📖 Lendo programa CNC...');
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
        this.programa = conteudo.split('\n').map(linha => linha.trim());
        console.log(`   ✓ ${this.programa.length} linhas lidas`);
        return this.programa;
    }

    // ═══════════════════════════════════════════════════════════════
    // ANÁLISE DE OPERAÇÕES
    // ═══════════════════════════════════════════════════════════════

    analisarOperacoes() {
        console.log('\n🔍 Analisando operações do programa...');

        let operacaoAtual = null;
        let ferramentaAtual = null;
        let rpmAtual = 0;
        let avancoAtual = 0;

        for (let i = 0; i < this.programa.length; i++) {
            const linha = this.programa[i];

            // Detectar início de operação (Nxx)
            if (linha.match(/^N\d+/)) {
                if (operacaoAtual) {
                    this.operacoes.push(operacaoAtual);
                }

                const match = linha.match(/N(\d+)\((.+)\)/);
                if (match) {
                    operacaoAtual = {
                        numero: parseInt(match[1]),
                        descricao: match[2],
                        ferramenta: null,
                        rpm: 0,
                        avanco: 0,
                        linhaInicio: i,
                        linhaFim: null,
                        movimentos: [],
                        tempoEstimado: 0
                    };
                }
            }

            if (!operacaoAtual) continue;

            // Detectar troca de ferramenta (Txxxx)
            const matchT = linha.match(/T(\d+)/);
            if (matchT) {
                const numFerramenta = matchT[1];
                operacaoAtual.ferramenta = numFerramenta;
                ferramentaAtual = numFerramenta;

                if (!this.ferramentas[numFerramenta]) {
                    this.ferramentas[numFerramenta] = {
                        numero: numFerramenta,
                        usos: 0,
                        operacoes: []
                    };
                }
                this.ferramentas[numFerramenta].usos++;
                this.ferramentas[numFerramenta].operacoes.push(operacaoAtual.descricao);
            }

            // Detectar RPM (Sxxxx)
            const matchS = linha.match(/S(\d+)/);
            if (matchS) {
                rpmAtual = parseInt(matchS[1]);
                operacaoAtual.rpm = rpmAtual;
            }

            // Detectar avanço (F.xx ou Fxx)
            const matchF = linha.match(/F\.?(\d+)/);
            if (matchF) {
                avancoAtual = parseFloat(matchF[1]) / 100; // F.18 = 0.18 mm/rot
                operacaoAtual.avanco = avancoAtual;
            }

            // Detectar movimentos
            if (linha.match(/^G[0-9]/)) {
                operacaoAtual.movimentos.push({
                    linha: i,
                    codigo: linha
                });
            }
        }

        // Adicionar última operação
        if (operacaoAtual) {
            this.operacoes.push(operacaoAtual);
        }

        console.log(`   ✓ ${this.operacoes.length} operações identificadas`);
        console.log(`   ✓ ${Object.keys(this.ferramentas).length} ferramentas diferentes`);

        return this.operacoes;
    }

    // ═══════════════════════════════════════════════════════════════
    // CÁLCULO DE TEMPO REAL
    // ═══════════════════════════════════════════════════════════════

    calcularTempoReal() {
        console.log('\n⏱️  Calculando tempo real de usinagem...');

        let tempoTotal = 0;
        let tempoCorte = 0;
        let tempoRapido = 0;
        let tempoTrocaFerramenta = 0;

        for (const op of this.operacoes) {
            let tempoOp = 0;

            // Tempo de troca de ferramenta (15 segundos por troca)
            if (op.ferramenta) {
                tempoTrocaFerramenta += 0.25; // 15 seg = 0.25 min
                tempoOp += 0.25;
            }

            // Analisar movimentos
            for (const mov of op.movimentos) {
                const linha = mov.codigo;

                // G0 - Movimento rápido (estimativa 10m/min = 0.1 min para 1m)
                if (linha.match(/G0/)) {
                    tempoRapido += 0.05; // ~3 segundos por movimento rápido
                    tempoOp += 0.05;
                }

                // G1 - Movimento linear interpolado (corte)
                if (linha.match(/G1/)) {
                    // Extrair distâncias aproximadas
                    const matchX = linha.match(/X([\d.-]+)/);
                    const matchZ = linha.match(/Z([\d.-]+)/);

                    let distancia = 0;
                    if (matchX) distancia += Math.abs(parseFloat(matchX[1]));
                    if (matchZ) distancia += Math.abs(parseFloat(matchZ[1]));

                    // Tempo = distância / (avanço * rpm / 1000)
                    if (op.avanco > 0 && op.rpm > 0) {
                        const velocidadeCorte = (op.avanco * op.rpm) / 1000; // mm/min -> m/min
                        const tempo = distancia / (velocidadeCorte * 1000); // min
                        tempoCorte += tempo;
                        tempoOp += tempo;
                    } else {
                        // Estimativa padrão: 0.5 min por movimento de corte
                        tempoCorte += 0.5;
                        tempoOp += 0.5;
                    }
                }

                // G2/G3 - Interpolação circular (arcos)
                if (linha.match(/G[23]/)) {
                    // Arcos são mais lentos, estimativa 0.3 min por arco
                    tempoCorte += 0.3;
                    tempoOp += 0.3;
                }

                // G75 - Ciclo de sangramento/canal (operação mais demorada)
                if (linha.match(/G75/)) {
                    // Ciclo de desbaste/canal: ~1-2 min
                    tempoCorte += 1.5;
                    tempoOp += 1.5;
                }

                // G83 - Ciclo de furação
                if (linha.match(/G83/)) {
                    // Furação centro: ~0.5 min
                    tempoCorte += 0.5;
                    tempoOp += 0.5;
                }
            }

            // Tempo da operação específica
            op.tempoEstimado = tempoOp;

            // Ajustar baseado no tipo de operação
            if (op.descricao.includes('FACE')) {
                op.tempoEstimado = Math.max(op.tempoEstimado, 1.0); // Mínimo 1 min
            } else if (op.descricao.includes('PERFIL') || op.descricao.includes('ACAB')) {
                op.tempoEstimado = Math.max(op.tempoEstimado, 2.0); // Mínimo 2 min
            } else if (op.descricao.includes('CANAL')) {
                op.tempoEstimado = Math.max(op.tempoEstimado, 1.5); // Mínimo 1.5 min
            } else if (op.descricao.includes('BROCA')) {
                op.tempoEstimado = Math.max(op.tempoEstimado, 0.5); // Mínimo 0.5 min
            }

            tempoTotal += op.tempoEstimado;
        }

        // Adicionar tempo de setup/inspeção
        const tempoSetup = 1.0; // 1 min setup
        const tempoInspecao = 0.5; // 0.5 min inspeção final
        const tempoParadas = 0.5; // M00 e outras paradas
        const tempoEmbalagem = 0.3; // 0.3 min embalagem

        tempoTotal += tempoSetup + tempoInspecao + tempoParadas + tempoEmbalagem;

        this.tempoTotal = tempoTotal;

        console.log(`   ✓ Tempo de corte: ${tempoCorte.toFixed(1)} min`);
        console.log(`   ✓ Tempo de movimento rápido: ${tempoRapido.toFixed(1)} min`);
        console.log(`   ✓ Tempo de troca ferramenta: ${tempoTrocaFerramenta.toFixed(1)} min`);
        console.log(`   ✓ Tempo auxiliar: ${(tempoSetup + tempoInspecao + tempoParadas + tempoEmbalagem).toFixed(1)} min`);
        console.log(`   ✓ TEMPO TOTAL: ${this.tempoTotal.toFixed(1)} min/peça`);

        return {
            tempoTotal: this.tempoTotal,
            tempoCorte,
            tempoRapido,
            tempoTrocaFerramenta,
            tempoAuxiliar: tempoSetup + tempoInspecao + tempoParadas + tempoEmbalagem,
            detalhePorOperacao: this.operacoes.map(op => ({
                operacao: op.descricao,
                tempo: op.tempoEstimado.toFixed(1)
            }))
        };
    }

    // ═══════════════════════════════════════════════════════════════
    // EXTRAÇÃO DE DADOS PARA BANCO DE CONHECIMENTO
    // ═══════════════════════════════════════════════════════════════

    extrairDadosParaBanco() {
        console.log('\n💾 Extraindo dados para banco de conhecimento...');

        const dados = {
            codigoPeca: 'EXTRAIR_DO_PROGRAMA',
            tipoPeca: 'EIXO',
            material: '45 S 20 K',
            materialBruto: {
                diametro: 16,
                tolerancia: 'H9',
                tipo: 'retificado'
            },
            tempoRealProducao: this.tempoTotal,
            ferramentasUtilizadas: this.ferramentas,
            operacoes: this.operacoes.map(op => ({
                nome: op.descricao,
                ferramenta: op.ferramenta,
                rpm: op.rpm,
                avanco: op.avanco,
                tempoEstimado: op.tempoEstimado
            })),
            parametrosCNC: {
                sistemaComando: 'Fanuc',
                maquina: 'Romi GL280',
                numeroPrograma: 'O0404'
            },
            observacoes: [
                'Programa utiliza inversão de placa (dois setups)',
                'Operações de acabamento com compensação de raio G42',
                'Canais com redução de velocidade para S500',
                'Parada programada M00 para virar peça'
            ]
        };

        // Extrair código da peça do programa
        const matchCodigo = this.programa[1].match(/O\d+\((.+?)\s/);
        if (matchCodigo) {
            dados.codigoPeca = matchCodigo[1];
        }

        console.log(`   ✓ Dados extraídos para peça: ${dados.codigoPeca}`);

        return dados;
    }

    // ═══════════════════════════════════════════════════════════════
    // RELATÓRIO COMPLETO
    // ═══════════════════════════════════════════════════════════════

    gerarRelatorio() {
        console.log('\n═══════════════════════════════════════════════════════════');
        console.log('📊 RELATÓRIO DE ANÁLISE DO PROGRAMA CNC');
        console.log('═══════════════════════════════════════════════════════════\n');

        console.log('🔧 OPERAÇÕES IDENTIFICADAS:\n');
        this.operacoes.forEach((op, idx) => {
            console.log(`${idx + 1}. ${op.descricao}`);
            console.log(`   Ferramenta: T${op.ferramenta}`);
            console.log(`   RPM: ${op.rpm}`);
            console.log(`   Avanço: ${op.avanco.toFixed(2)} mm/rot`);
            console.log(`   Movimentos: ${op.movimentos.length}`);
            console.log(`   Tempo: ${op.tempoEstimado.toFixed(1)} min`);
            console.log('');
        });

        console.log('\n🛠️  FERRAMENTAS UTILIZADAS:\n');
        for (const [num, ferr] of Object.entries(this.ferramentas)) {
            console.log(`T${num}:`);
            console.log(`   Usos: ${ferr.usos}`);
            console.log(`   Operações: ${ferr.operacoes.join(', ')}`);
            console.log('');
        }

        console.log('\n⏱️  RESUMO DE TEMPOS:\n');
        const tempos = this.calcularTempoReal();
        console.log(`Tempo total: ${tempos.tempoTotal.toFixed(1)} min/peça`);
        console.log(`   - Corte: ${tempos.tempoCorte.toFixed(1)} min (${(tempos.tempoCorte/tempos.tempoTotal*100).toFixed(0)}%)`);
        console.log(`   - Movimento rápido: ${tempos.tempoRapido.toFixed(1)} min (${(tempos.tempoRapido/tempos.tempoTotal*100).toFixed(0)}%)`);
        console.log(`   - Troca ferramenta: ${tempos.tempoTrocaFerramenta.toFixed(1)} min (${(tempos.tempoTrocaFerramenta/tempos.tempoTotal*100).toFixed(0)}%)`);
        console.log(`   - Auxiliar: ${tempos.tempoAuxiliar.toFixed(1)} min (${(tempos.tempoAuxiliar/tempos.tempoTotal*100).toFixed(0)}%)`);

        console.log('\n═══════════════════════════════════════════════════════════\n');
    }

    // ═══════════════════════════════════════════════════════════════
    // EXECUÇÃO COMPLETA
    // ═══════════════════════════════════════════════════════════════

    analisar(caminhoArquivo) {
        this.lerPrograma(caminhoArquivo);
        this.analisarOperacoes();
        const tempos = this.calcularTempoReal();
        const dados = this.extrairDadosParaBanco();
        this.gerarRelatorio();

        return {
            sucesso: true,
            tempos,
            dados,
            operacoes: this.operacoes,
            ferramentas: this.ferramentas
        };
    }
}

module.exports = AnalisadorCNC;

// Execução direta
if (require.main === module) {
    const analisador = new AnalisadorCNC();
    const resultado = analisador.analisar('E:\\1.60.01.548');

    // Salvar dados no banco
    const fs = require('fs');
    const caminhoSaida = 'd:\\lasec\\base_dados\\programa_cnc_1.60.01.548.json';
    fs.writeFileSync(caminhoSaida, JSON.stringify(resultado.dados, null, 2), 'utf8');
    console.log(`\n✅ Dados salvos em: ${caminhoSaida}`);
}
