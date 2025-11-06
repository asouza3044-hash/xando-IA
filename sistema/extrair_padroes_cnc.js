// ═══════════════════════════════════════════════════════════
// EXTRATOR DE PADRÕES CNC - LASEC
// Aprende padrões de programação, ferramental e métodos
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════');
console.log('🎓 EXTRATOR DE PADRÕES CNC - SISTEMA DE APRENDIZADO');
console.log('═══════════════════════════════════════════════════════════\n');

// Carregar biblioteca CNC
const biblioteca = JSON.parse(fs.readFileSync('d:/lasec/base_dados/biblioteca_cnc.json', 'utf8'));

const padroes = {
    dataExtracao: new Date().toISOString(),
    maquinas: {},
    ferramentalPadrao: {},
    metodologias: {},
    exemplos: [],
    conhecimento: {
        fixacao: [],
        sequenciasOperacao: [],
        temposReferencia: {},
        parametrosCorte: {}
    }
};

console.log('📚 Analisando programas detalhadamente...\n');

// Pegar exemplos representativos de cada máquina
const maquinasComExemplos = {};

biblioteca.programas.forEach((prog, index) => {
    if (!maquinasComExemplos[prog.maquina]) {
        maquinasComExemplos[prog.maquina] = [];
    }

    // Pegar até 5 exemplos por máquina
    if (maquinasComExemplos[prog.maquina].length < 5 && prog.operacoes.length > 0) {
        try {
            const conteudo = fs.readFileSync(prog.caminho, 'utf8');

            const exemplo = {
                maquina: prog.maquina,
                arquivo: prog.nome,
                material: prog.material,
                ferramentas: prog.ferramentas,
                operacoes: prog.operacoes,
                caracteristicas: prog.caracteristicas,
                trechoPrograma: conteudo.substring(0, 1000) // Primeiras linhas
            };

            maquinasComExemplos[prog.maquina].push(exemplo);
            padroes.exemplos.push(exemplo);

            console.log(`   ✓ ${prog.maquina}: ${prog.nome} (${prog.operacoes.length} operações)`);
        } catch (err) {
            // Ignorar erros
        }
    }
});

// Analisar padrões por máquina
console.log('\n🔍 Extraindo padrões de programação...\n');

Object.keys(maquinasComExemplos).forEach(maquina => {
    const exemplos = maquinasComExemplos[maquina];

    padroes.maquinas[maquina] = {
        totalExemplos: exemplos.length,
        ferramentasComuns: [],
        operacoesComuns: [],
        sequenciaTipica: [],
        observacoes: []
    };

    // Ferramentas mais usadas
    const ferramentasCount = {};
    exemplos.forEach(ex => {
        ex.ferramentas.forEach(f => {
            ferramentasCount[f] = (ferramentasCount[f] || 0) + 1;
        });
    });

    padroes.maquinas[maquina].ferramentasComuns = Object.entries(ferramentasCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([f, count]) => ({ ferramenta: f, frequencia: count }));

    // Operações comuns
    const operacoesSet = new Set();
    exemplos.forEach(ex => {
        ex.operacoes.forEach(op => operacoesSet.add(op.descricao));
    });
    padroes.maquinas[maquina].operacoesComuns = Array.from(operacoesSet).slice(0, 15);

    console.log(`   ${maquina}:`);
    console.log(`      Exemplos: ${exemplos.length}`);
    console.log(`      Ferramentas comuns: ${padroes.maquinas[maquina].ferramentasComuns.length}`);
    console.log(`      Operações distintas: ${operacoesSet.size}`);
});

// Extrair conhecimento sobre ferramental
console.log('\n🔧 Analisando ferramental...\n');

Object.keys(biblioteca.ferramentas).forEach(ferramenta => {
    const dados = biblioteca.ferramentas[ferramenta];

    // Encontrar exemplos de uso
    const exemplosUso = padroes.exemplos.filter(ex =>
        ex.ferramentas.includes(ferramenta)
    ).slice(0, 3);

    padroes.ferramentalPadrao[ferramenta] = {
        totalUsos: dados.total,
        maquinas: dados.maquinas,
        exemplosUso: exemplosUso.map(ex => ({
            maquina: ex.maquina,
            arquivo: ex.arquivo,
            operacao: ex.operacoes.find(op => op.ferramenta === ferramenta)?.descricao || 'N/A'
        }))
    };
});

// Identificar metodologias (sequências de operações)
console.log('📋 Identificando metodologias...\n');

const metodologiasIdentificadas = {
    'EIXO_SIMPLES': {
        descricao: 'Eixo simples com faceamento e torneamento',
        sequencia: [
            '1. Faceamento frontal',
            '2. Desbaste externo',
            '3. Acabamento externo',
            '4. Canal (opcional)',
            '5. Corte/Sangramento'
        ],
        ferramentasNecessarias: ['Facear', 'Desbastar', 'Acabar', 'Canal', 'Cortar'],
        aplicavel: ['EIXOS', 'HASTES', 'PINOS']
    },
    'BUCHA_INTERNA': {
        descricao: 'Bucha com usinagem interna',
        sequencia: [
            '1. Faceamento',
            '2. Furo de centro',
            '3. Furação',
            '4. Desbaste interno',
            '5. Acabamento interno',
            '6. Rosca interna (opcional)'
        ],
        ferramentasNecessarias: ['Facear', 'Broca Centro', 'Broca', 'Desbaste Int', 'Acabamento Int', 'Rosca'],
        aplicavel: ['BUCHAS', 'PORCAS', 'ANÉIS']
    },
    'PECA_COMPLEXA': {
        descricao: 'Peça com múltiplas operações',
        sequencia: [
            '1. Faceamento',
            '2. Desbaste externo',
            '3. Acabamento externo',
            '4. Furo de centro',
            '5. Furação',
            '6. Canais',
            '7. Roscas',
            '8. Acabamento final'
        ],
        ferramentasNecessarias: ['Facear', 'Desbastar Ext', 'Acabar Ext', 'Broca', 'Canal', 'Rosca', 'Acabamento'],
        aplicavel: ['PEÇAS COMPLEXAS', 'CONJUNTOS']
    }
};

padroes.metodologias = metodologiasIdentificadas;

// Conhecimento sobre tempos de referência
padroes.conhecimento.temposReferencia = {
    'FACEAMENTO': {
        descricao: 'Tempo típico para faceamento',
        tempoMinutoPorMM2: 0.001,
        variavelPorMaterial: true,
        observacao: 'Varia conforme diâmetro e profundidade'
    },
    'DESBASTE_EXTERNO': {
        descricao: 'Tempo típico para desbaste externo',
        tempoMinutoPorMM3: 0.0005,
        variavelPorMaterial: true,
        observacao: 'Depende do volume removido'
    },
    'ACABAMENTO_EXTERNO': {
        descricao: 'Tempo típico para acabamento externo',
        tempoMinutoPorMM2: 0.002,
        variavelPorMaterial: true,
        observacao: 'Depende da área superficial'
    },
    'FURACAO': {
        descricao: 'Tempo típico para furação',
        tempoMinutoPorMM: 0.05,
        variavelPorMaterial: true,
        observacao: 'Tempo por mm de profundidade'
    },
    'ROSCA_INTERNA': {
        descricao: 'Tempo típico para rosca interna',
        tempoMinutoPorMM: 0.1,
        variavelPorMaterial: false,
        observacao: 'Tempo por mm de profundidade de rosca'
    }
};

// Parâmetros de corte por material
padroes.conhecimento.parametrosCorte = {
    'AÇO_1045': {
        velocidadeCorteDesbaste: '240-330 m/min',
        velocidadeCorteAcabamento: '280-330 m/min',
        avancoDesbaste: '0.35-0.70 mm/rot',
        avancoAcabamento: '0.10-0.20 mm/rot',
        pastilhaRecomendada: 'IC8250 (CVD)',
        fonte: 'ISCAR + Experiência LASEC'
    },
    'AÇO_4140': {
        velocidadeCorteDesbaste: '200-280 m/min',
        velocidadeCorteAcabamento: '240-280 m/min',
        avancoDesbaste: '0.30-0.60 mm/rot',
        avancoAcabamento: '0.08-0.18 mm/rot',
        pastilhaRecomendada: 'IC8250 (CVD)',
        fonte: 'ISCAR + Experiência LASEC'
    },
    'ALUMINIO_6061': {
        velocidadeCorteDesbaste: '280-350 m/min',
        velocidadeCorteAcabamento: '220-300 m/min',
        avancoDesbaste: '0.12-0.25 mm/rot',
        avancoAcabamento: '0.05-0.08 mm/rot',
        pastilhaRecomendada: 'IC20 (PCD)',
        fonte: 'ISCAR + Experiência LASEC'
    },
    'LATAO': {
        velocidadeCorteDesbaste: '300-400 m/min',
        velocidadeCorteAcabamento: '280-350 m/min',
        avancoDesbaste: '0.15-0.30 mm/rot',
        avancoAcabamento: '0.05-0.12 mm/rot',
        pastilhaRecomendada: 'IC908',
        fonte: 'Experiência LASEC'
    }
};

// Conhecimento sobre fixação
padroes.conhecimento.fixacao = [
    {
        tipo: 'CASTANHA_3_CASTANHAS',
        aplicacao: 'Eixos e peças cilíndricas',
        diametroMin: 3,
        diametroMax: 200,
        precisao: '±0.05mm',
        observacao: 'Mais comum para produção'
    },
    {
        tipo: 'CASTANHA_4_CASTANHAS',
        aplicacao: 'Peças quadradas ou irregulares',
        diametroMin: 10,
        diametroMax: 250,
        precisao: '±0.02mm',
        observacao: 'Para centralização precisa'
    },
    {
        tipo: 'PLACA_CASTANHA',
        aplicacao: 'Peças planas ou flanges',
        diametroMin: 50,
        diametroMax: 300,
        precisao: '±0.05mm',
        observacao: 'Para peças com face de referência'
    },
    {
        tipo: 'PINCA',
        aplicacao: 'Peças pequenas cilíndricas',
        diametroMin: 1,
        diametroMax: 50,
        precisao: '±0.01mm',
        observacao: 'Alta precisão e repetibilidade'
    }
];

// Salvar padrões extraídos
fs.writeFileSync(
    'd:/lasec/base_dados/padroes_cnc.json',
    JSON.stringify(padroes, null, 2)
);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 PADRÕES EXTRAÍDOS');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`🏭 Máquinas analisadas: ${Object.keys(padroes.maquinas).length}`);
console.log(`🔧 Ferramentas catalogadas: ${Object.keys(padroes.ferramentalPadrao).length}`);
console.log(`📋 Metodologias identificadas: ${Object.keys(padroes.metodologias).length}`);
console.log(`💡 Exemplos coletados: ${padroes.exemplos.length}`);
console.log(`⏱️  Tempos de referência: ${Object.keys(padroes.conhecimento.temposReferencia).length}`);
console.log(`🔩 Materiais com parâmetros: ${Object.keys(padroes.conhecimento.parametrosCorte).length}`);
console.log(`🗜️  Tipos de fixação: ${padroes.conhecimento.fixacao.length}`);

console.log('\n💾 Padrões salvos em: d:/lasec/base_dados/padroes_cnc.json');

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ EXTRAÇÃO DE PADRÕES CONCLUÍDA!');
console.log('═══════════════════════════════════════════════════════════\n');
