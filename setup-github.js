#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para o terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
  } catch (error) {
    if (!options.ignoreError) {
      log(`Erro ao executar: ${command}`, 'red');
      throw error;
    }
    return null;
  }
}

function checkGitConfig() {
  log('\n📋 Verificando configuração do Git...', 'cyan');

  const username = exec('git config user.name', { silent: true, ignoreError: true });
  const email = exec('git config user.email', { silent: true, ignoreError: true });

  if (!username || !email) {
    log('⚠️  Configuração do Git incompleta!', 'yellow');
    log('Configure com:', 'yellow');
    log('  git config --global user.name "Seu Nome"', 'yellow');
    log('  git config --global user.email "seu@email.com"', 'yellow');
    return false;
  }

  log(`✅ Usuário: ${username.trim()}`, 'green');
  log(`✅ Email: ${email.trim()}`, 'green');
  return true;
}

function checkRemote() {
  log('\n🌐 Verificando repositório remoto...', 'cyan');

  const remote = exec('git remote -v', { silent: true, ignoreError: true });

  if (!remote || !remote.trim()) {
    log('❌ Nenhum remote configurado!', 'red');
    return false;
  }

  log('✅ Remote configurado:', 'green');
  console.log(remote);
  return true;
}

function getStatus() {
  log('\n📊 Status do repositório:', 'cyan');
  exec('git status');

  const branch = exec('git branch --show-current', { silent: true });
  log(`\n📍 Branch atual: ${branch.trim()}`, 'blue');

  // Verificar se há commits
  const hasCommits = exec('git rev-parse HEAD 2>/dev/null', { silent: true, ignoreError: true });

  if (!hasCommits) {
    log('\n⚠️  Nenhum commit ainda. Repositório vazio.', 'yellow');
    return false;
  }

  // Mostrar últimos commits
  log('\n📝 Últimos commits:', 'cyan');
  exec('git log --oneline -5', { ignoreError: true });

  return true;
}

function syncWork() {
  log('\n🔄 Sincronizando trabalho...', 'cyan');

  const branch = exec('git branch --show-current', { silent: true }).trim();

  // Fazer fetch primeiro
  log('1️⃣  Buscando atualizações do remoto...', 'blue');
  exec(`git fetch origin ${branch}`, { ignoreError: true });

  // Verificar se há mudanças locais
  const status = exec('git status --porcelain', { silent: true });

  if (status && status.trim()) {
    log('2️⃣  Há mudanças locais. Fazendo commit...', 'yellow');
    exec('git add .');
    exec('git commit -m "Auto-sync: salvando trabalho local"');
  } else {
    log('2️⃣  Nenhuma mudança local.', 'green');
  }

  // Fazer pull para pegar mudanças remotas
  log('3️⃣  Sincronizando com o remoto...', 'blue');
  exec(`git pull origin ${branch} --rebase`, { ignoreError: true });

  // Fazer push das mudanças
  log('4️⃣  Enviando mudanças para o remoto...', 'blue');
  exec(`git push -u origin ${branch}`);

  log('\n✅ Sincronização completa!', 'green');
  log('Agora você pode acessar este trabalho de qualquer terminal com:', 'cyan');
  log(`  git pull origin ${branch}`, 'cyan');
}

function initializeRepo() {
  log('\n🚀 Inicializando repositório...', 'cyan');

  // Verificar se há arquivos no diretório
  const files = fs.readdirSync('.').filter(f => f !== '.git' && !f.startsWith('.'));

  if (files.length === 0) {
    log('📝 Criando arquivo README.md inicial...', 'blue');
    fs.writeFileSync('README.md', `# xando-IA

Repositório para unificar trabalhos e acessar de diversos terminais.

## Como usar

\`\`\`bash
# Ao iniciar o trabalho em um novo terminal:
git pull origin ${exec('git branch --show-current', { silent: true }).trim()}

# Ao finalizar o trabalho:
git add .
git commit -m "Descrição das mudanças"
git push origin ${exec('git branch --show-current', { silent: true }).trim()}
\`\`\`

## Script de setup

Execute \`node setup-github.js\` para sincronizar automaticamente.
`);
    log('✅ README.md criado!', 'green');
  }

  log('📦 Fazendo commit inicial...', 'blue');
  exec('git add .');
  exec('git commit -m "Initial commit: setup do repositório"');

  const branch = exec('git branch --show-current', { silent: true }).trim();
  log(`📤 Enviando para o remoto (branch: ${branch})...`, 'blue');
  exec(`git push -u origin ${branch}`);

  log('\n✅ Repositório inicializado e enviado para o GitHub!', 'green');
}

// Função principal
function main() {
  log('╔════════════════════════════════════════╗', 'cyan');
  log('║   🔧 Setup GitHub - Unificar Trabalhos ║', 'cyan');
  log('╚════════════════════════════════════════╝', 'cyan');

  // 1. Verificar configuração
  const configOk = checkGitConfig();
  if (!configOk) {
    process.exit(1);
  }

  // 2. Verificar remote
  const remoteOk = checkRemote();
  if (!remoteOk) {
    process.exit(1);
  }

  // 3. Verificar status
  const hasCommits = getStatus();

  // 4. Se não há commits, inicializar
  if (!hasCommits) {
    log('\n❓ Repositório sem commits. Deseja inicializar?', 'yellow');
    log('   Isso criará um commit inicial e fará push para o GitHub.', 'yellow');

    initializeRepo();
  } else {
    // 5. Se há commits, sincronizar
    syncWork();
  }

  log('\n✨ Processo concluído!', 'green');
  log('🎯 Seu trabalho está unificado e pode ser acessado de qualquer terminal.', 'green');
}

// Executar
main();
