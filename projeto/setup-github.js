#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🚀 Setup GitHub - Xando IA\n');
  
  const token = await question('📝 Cole seu token do GitHub: ');
  const username = 'asouza3044-hash';
  const repoName = 'Xando IA';
  const projectPath = 'D:\\lasec\\LASEC_BACKUP_COMPLETO_20251103_093329\\lasec_backup_20251103_093329';
  const conversasPath = 'D:\\Cloude IA';
  
  console.log('\n✅ Configurações:');
  console.log(`   Usuário: ${username}`);
  console.log(`   Repositório: ${repoName}`);
  console.log(`   Projeto: ${projectPath}`);
  console.log(`   Conversas: ${conversasPath}`);
  
  try {
    console.log('\n📦 Criando repositório no GitHub...');
    
    const createRepoCmd = `curl -X POST https://api.github.com/user/repos -H "Authorization: token ${token}" -H "Content-Type: application/json" -d "{\"name\":\"Xando-IA\",\"description\":\"Xando IA - Projeto e Histórico de Conversas\",\"private\":false}"`;
    
    try {
      execSync(createRepoCmd, { stdio: 'pipe' });
      console.log('✅ Repositório criado com sucesso!');
    } catch (e) {
      console.log('⚠️  Repositório pode já existir, continuando...');
    }
    
    const workDir = path.join(process.env.TEMP, 'xando-ia-setup');
    if (fs.existsSync(workDir)) {
      execSync(`rmdir /s /q "${workDir}"`, { shell: 'cmd.exe' });
    }
    fs.mkdirSync(workDir, { recursive: true });
    
    console.log('\n📁 Organizando arquivos...');
    
    if (fs.existsSync(projectPath)) {
      execSync(`xcopy "${projectPath}" "${workDir}\\projeto" /E /I /Y`, { shell: 'cmd.exe' });
      console.log('✅ Projeto copiado');
    }
    
    if (fs.existsSync(conversasPath)) {
      execSync(`xcopy "${conversasPath}" "${workDir}\\conversas" /E /I /Y`, { shell: 'cmd.exe' });
      console.log('✅ Conversas copiadas');
    }
    
    const readmeContent = `# Xando IA\n\n## 📋 Sobre\nProjeto Xando IA com histórico completo de conversas e desenvolvimento.\n\n## 📁 Estrutura\n- \`/projeto\` - Código do projeto\n- \`/conversas\` - Histórico de conversas\n\n## 🚀 Como usar\n1. Clone o repositório\n2. Navegue para a pasta do projeto\n3. Siga as instruções específicas\n\n---\nCriado com ❤️ usando Xando IA`;
    
    fs.writeFileSync(path.join(workDir, 'README.md'), readmeContent);
    console.log('✅ README criado');
    
    console.log('\n🔗 Sincronizando com GitHub...');
    
    execSync(`cd "${workDir}" && git init`, { shell: 'cmd.exe' });
    execSync(`cd "${workDir}" && git config user.email "asouza3044@gmail.com"`, { shell: 'cmd.exe' });
    execSync(`cd "${workDir}" && git config user.name "asouza3044-hash"`, { shell: 'cmd.exe' });
    execSync(`cd "${workDir}" && git add .`, { shell: 'cmd.exe' });
    execSync(`cd "${workDir}" && git commit -m "Initial commit: Xando IA"`, { shell: 'cmd.exe' });
    execSync(`cd "${workDir}" && git branch -M main`, { shell: 'cmd.exe' });
    execSync(`cd "${workDir}" && git remote add origin https://${username}:${token}@github.com/${username}/Xando-IA.git`, { shell: 'cmd.exe' });
    execSync(`cd "${workDir}" && git push -u origin main`, { shell: 'cmd.exe' });
    
    console.log('\n✅ Push para GitHub realizado!');
    console.log('\n🎉 Sucesso!\n');
    console.log(`📍 https://github.com/${username}/Xando-IA`);
    console.log('\n✨ Todos os arquivos foram sincronizados!');
    
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  } finally {
    rl.close();
  }
}

main();