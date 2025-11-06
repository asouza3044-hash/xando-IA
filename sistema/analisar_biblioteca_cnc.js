// ═══════════════════════════════════════════════════════════
// ANALISADOR DE BIBLIOTECA CNC - LASEC
// Analisa 11.935 programas CNC e cria banco de dados
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════');
console.log('📚 ANALISADOR DE BIBLIOTECA CNC - LASEC');
console.log('═══════════════════════════════════════════════════════════\n');

const pastaBase = 'D:/PROG_CNC';

// Estrutura do banco de dados
const bancoDados = {
    info: {
        dataAnalise: new Date().toISOString(),
        totalProgramas: 0,
        programasAnalisados: 0,
        programasComErro: 0
    },
    maquinas: {},
    materiais: {},
    ferramentas: {},
    operacoes: {},
    padroes: {
        fixacao: {},
        rpm: {},
        avancos: {},
        temposReferencia: {}
    },
    programas: []
};

// Função para identificar máquina pelo caminho
function identificarMaquina(caminho) {
    const caminhoUpper = caminho.toUpperCase();
    if (caminhoUpper.includes('GL280')) return 'GL280';
    if (caminhoUpper.includes('LYNX220')) return 'LYNX220';
    if (caminhoUpper.includes('CENTU30D')) return 'CENTU30D';
    if (caminhoUpper.includes('CENTU30S')) return 'CENTU30S';
    if (caminhoUpper.includes('DISCO560')) return 'DISCO560';
    if (caminhoUpper.includes('DISCO760')) return 'DISCO760';
    if (caminhoUpper.includes('G240')) return 'G240';
    if (caminhoUpper.includes('VTC30A')) return 'VTC30A';
    return 'DESCONHECIDA';
}

// Função para identificar material pelo caminho
function identificarMaterial(caminho) {
    const caminhoLower = caminho.toLowerCase();
    if (caminhoLower.includes('aluminio') || caminhoLower.includes('alumínio')) return 'ALUMINIO';
    if (caminhoLower.includes('aco') || caminhoLower.includes('aço')) return 'AÇO';
    if (caminhoLower.includes('latao') || caminhoLower.includes('latão')) return 'LATÃO';
    if (caminhoLower.includes('bronze')) return 'BRONZE';
    if (caminhoLower.includes('inox')) return 'INOX';
    return 'NAO_ESPECIFICADO';
}

// Função para analisar programa CNC
function analisarPrograma(conteudo, nomeArquivo, caminho) {
    const analise = {
        nome: nomeArquivo,
        caminho: caminho,
        maquina: identificarMaquina(caminho),
        material: identificarMaterial(caminho),
        linhas: conteudo.split('\n').length,
        ferramentas: [],
        operacoes: [],
        rpm: [],
        avancos: [],
        tempoEstimado: 0,
        caracteristicas: {
            temFuros: false,
            temRoscas: false,
            temCanais: false,
            temContorno: false,
            temFaceamento: false
        }
    };

    const linhas = conteudo.split('\n');
    let ferramentaAtual = null;
    let operacaoAtual = null;

    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim().toUpperCase();

        // Detectar troca de ferramenta (Fanuc: T ou M06)
        if (linha.match(/^T\d{2,4}/)) {
            const match = linha.match(/T(\d{2,4})/);
            if (match) {
                ferramentaAtual = 'T' + match[1];
                if (!analise.ferramentas.includes(ferramentaAtual)) {
                    analise.ferramentas.push(ferramentaAtual);
                }
            }
        }

        // Detectar operação (comentário com N ou parenteses)
        if (linha.match(/^N\d+\s*\(/)) {
            const match = linha.match(/N\d+\s*\((.+)\)/);
            if (match) {
                operacaoAtual = match[1];
                analise.operacoes.push({
                    numero: analise.operacoes.length + 1,
                    descricao: operacaoAtual,
                    ferramenta: ferramentaAtual
                });
            }
        }

        // Detectar RPM (S)
        if (linha.match(/S\d+/)) {
            const match = linha.match(/S(\d+)/);
            if (match) {
                const rpm = parseInt(match[1]);
                if (rpm > 0 && rpm < 10000) {
                    analise.rpm.push(rpm);
                }
            }
        }

        // Detectar avanço (F)
        if (linha.match(/F[\d.]+/)) {
            const match = linha.match(/F([\d.]+)/);
            if (match) {
                const avanco = parseFloat(match[1]);
                if (avanco > 0 && avanco < 10) {
                    analise.avancos.push(avanco);
                }
            }
        }

        // Detectar tipo de operação
        if (linha.includes('G83') || linha.includes('G73')) {
            analise.caracteristicas.temFuros = true;
        }
        if (linha.includes('G84')) {
            analise.caracteristicas.temRoscas = true;
        }
        if (linha.includes('G75') || linha.includes('CANAL')) {
            analise.caracteristicas.temCanais = true;
        }
        if (linha.includes('G70') || linha.includes('G71')) {
            analise.caracteristicas.temContorno = true;
        }
        if (linha.includes('G1') && linha.includes('Z-')) {
            analise.caracteristicas.temFaceamento = true;
        }
    }

    return analise;
}

// Função para listar arquivos recursivamente
function listarArquivos(pasta, resultado = []) {
    try {
        const itens = fs.readdirSync(pasta);

        for (const item of itens) {
            const caminhoCompleto = path.join(pasta, item);
            try {
                const stat = fs.statSync(caminhoCompleto);

                if (stat.isDirectory()) {
                    listarArquivos(caminhoCompleto, resultado);
                } else if (stat.isFile()) {
                    const ext = path.extname(item).toLowerCase();
                    if (['.txt', '.nc', '.cnc', '.mpf', ''].includes(ext) && !item.startsWith('.')) {
                        resultado.push(caminhoCompleto);
                    }
                }
            } catch (err) {
                // Ignorar erros de acesso
            }
        }
    } catch (err) {
        console.log(`⚠️ Erro ao acessar pasta: ${pasta}`);
    }

    return resultado;
}

console.log('🔍 Listando programas CNC...\n');
const arquivos = listarArquivos(pastaBase);
bancoDados.info.totalProgramas = arquivos.length;

console.log(`📊 Total de programas encontrados: ${arquivos.length}\n`);
console.log('📖 Analisando programas (amostra de 200)...\n');

// Analisar amostra representativa (para não demorar muito)
const amostra = 200;
const intervalo = Math.floor(arquivos.length / amostra);

for (let i = 0; i < arquivos.length; i += intervalo) {
    const arquivo = arquivos[i];

    try {
        const conteudo = fs.readFileSync(arquivo, 'utf8');
        const nomeArquivo = path.basename(arquivo);
        const analise = analisarPrograma(conteudo, nomeArquivo, arquivo);

        bancoDados.programasAnalisados++;
        bancoDados.programas.push(analise);

        // Acumular dados por máquina
        if (!bancoDados.maquinas[analise.maquina]) {
            bancoDados.maquinas[analise.maquina] = {
                total: 0,
                ferramentas: new Set(),
                operacoes: []
            };
        }
        bancoDados.maquinas[analise.maquina].total++;
        analise.ferramentas.forEach(f => bancoDados.maquinas[analise.maquina].ferramentas.add(f));

        // Acumular dados por material
        if (!bancoDados.materiais[analise.material]) {
            bancoDados.materiais[analise.material] = {
                total: 0,
                rpms: [],
                avancos: []
            };
        }
        bancoDados.materiais[analise.material].total++;
        bancoDados.materiais[analise.material].rpms.push(...analise.rpm);
        bancoDados.materiais[analise.material].avancos.push(...analise.avancos);

        // Acumular ferramentas
        analise.ferramentas.forEach(f => {
            if (!bancoDados.ferramentas[f]) {
                bancoDados.ferramentas[f] = { total: 0, maquinas: new Set() };
            }
            bancoDados.ferramentas[f].total++;
            bancoDados.ferramentas[f].maquinas.add(analise.maquina);
        });

        if (bancoDados.programasAnalisados % 20 === 0) {
            console.log(`   ✓ ${bancoDados.programasAnalisados} programas analisados...`);
        }

    } catch (err) {
        bancoDados.programasComErro++;
    }
}

// Converter Sets para Arrays
Object.keys(bancoDados.maquinas).forEach(maquina => {
    bancoDados.maquinas[maquina].ferramentas = Array.from(bancoDados.maquinas[maquina].ferramentas);
});

Object.keys(bancoDados.ferramentas).forEach(ferramenta => {
    bancoDados.ferramentas[ferramenta].maquinas = Array.from(bancoDados.ferramentas[ferramenta].maquinas);
});

// Calcular padrões
Object.keys(bancoDados.materiais).forEach(material => {
    const dados = bancoDados.materiais[material];
    if (dados.rpms.length > 0) {
        dados.rpmMedio = Math.round(dados.rpms.reduce((a, b) => a + b, 0) / dados.rpms.length);
        dados.rpmMin = Math.min(...dados.rpms);
        dados.rpmMax = Math.max(...dados.rpms);
    }
    if (dados.avancos.length > 0) {
        dados.avancoMedio = (dados.avancos.reduce((a, b) => a + b, 0) / dados.avancos.length).toFixed(3);
        dados.avancoMin = Math.min(...dados.avancos).toFixed(3);
        dados.avancoMax = Math.max(...dados.avancos).toFixed(3);
    }
    delete dados.rpms;
    delete dados.avancos;
});

bancoDados.info.programasAnalisados = bancoDados.programasAnalisados;

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 RESULTADOS DA ANÁLISE');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`Total de programas: ${bancoDados.info.totalProgramas}`);
console.log(`Programas analisados: ${bancoDados.info.programasAnalisados}`);
console.log(`Programas com erro: ${bancoDados.info.programasComErro}\n`);

console.log('🏭 MÁQUINAS ENCONTRADAS:');
Object.keys(bancoDados.maquinas).sort().forEach(maquina => {
    const dados = bancoDados.maquinas[maquina];
    console.log(`   ${maquina}: ${dados.total} programas | ${dados.ferramentas.length} ferramentas diferentes`);
});

console.log('\n🔩 MATERIAIS IDENTIFICADOS:');
Object.keys(bancoDados.materiais).sort().forEach(material => {
    const dados = bancoDados.materiais[material];
    console.log(`   ${material}: ${dados.total} programas`);
    if (dados.rpmMedio) {
        console.log(`      RPM: ${dados.rpmMin} - ${dados.rpmMax} (médio: ${dados.rpmMedio})`);
        console.log(`      Avanço: ${dados.avancoMin} - ${dados.avancoMax} (médio: ${dados.avancoMedio})`);
    }
});

console.log(`\n🔧 FERRAMENTAS ÚNICAS: ${Object.keys(bancoDados.ferramentas).length}`);

// Salvar banco de dados
const caminhoSaida = 'd:/lasec/base_dados/biblioteca_cnc.json';
fs.writeFileSync(caminhoSaida, JSON.stringify(bancoDados, null, 2));

console.log(`\n💾 Banco de dados salvo em: ${caminhoSaida}`);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ANÁLISE CONCLUÍDA!');
console.log('═══════════════════════════════════════════════════════════\n');
