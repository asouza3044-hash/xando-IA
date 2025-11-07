// ═══════════════════════════════════════════════════════════
// SISTEMA DE ATUALIZAÇÃO AUTOMÁTICA DE DASHBOARDS
// Monitora mudanças nos dados e regenera dashboards
// ═══════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('═══════════════════════════════════════════════════════════');
console.log('🔄 SISTEMA DE ATUALIZAÇÃO AUTOMÁTICA - DASHBOARDS');
console.log('═══════════════════════════════════════════════════════════\n');

const arquivosMonitorados = [
    'd:/lasec/base_dados/biblioteca_cnc.json',
    'd:/lasec/base_dados/padroes_cnc.json',
    'd:/lasec/base_dados/dados_completos_orcamentos.json'
];

const scriptGeracao = 'd:/lasec/sistema/gerar_dashboards_v2.js';

let ultimasModificacoes = {};

// Inicializar timestamps
arquivosMonitorados.forEach(arquivo => {
    try {
        const stats = fs.statSync(arquivo);
        ultimasModificacoes[arquivo] = stats.mtime.getTime();
    } catch (err) {
        console.log(`⚠️ Arquivo não encontrado: ${arquivo}`);
    }
});

function verificarMudancas() {
    let mudancaDetectada = false;

    arquivosMonitorados.forEach(arquivo => {
        try {
            const stats = fs.statSync(arquivo);
            const tempoAtual = stats.mtime.getTime();

            if (ultimasModificacoes[arquivo] !== tempoAtual) {
                console.log(`📝 Mudança detectada em: ${path.basename(arquivo)}`);
                ultimasModificacoes[arquivo] = tempoAtual;
                mudancaDetectada = true;
            }
        } catch (err) {
            // Arquivo não existe ou erro de acesso
        }
    });

    if (mudancaDetectada) {
        console.log('🔄 Regenerando dashboards...');
        exec(`node "${scriptGeracao}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ Erro ao gerar dashboards: ${error.message}`);
                return;
            }
            console.log('✅ Dashboards atualizados!');
            console.log(`⏰ ${new Date().toLocaleString('pt-BR')}\n`);
        });
    }
}

console.log('👀 Monitorando arquivos de dados...');
console.log('   Intervalo: 30 segundos');
console.log('   Pressione Ctrl+C para parar\n');

// Verificar a cada 30 segundos
setInterval(verificarMudancas, 30000);

// Gerar uma vez na inicialização
setTimeout(() => {
    console.log('🔄 Gerando dashboards iniciais...\n');
    exec(`node "${scriptGeracao}"`, (error, stdout, stderr) => {
        if (!error) {
            console.log('✅ Dashboards iniciais gerados!\n');
        }
    });
}, 1000);
