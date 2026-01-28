# xando-IA - Sistema Completo

Repositório para unificar trabalhos e acessar de diversos terminais.

---

## 📂 Conteúdo

### 🎯 **Portal LASEC** (`/portal-lasec/`)

Sistema completo de gestão de orçamentos para usinagem CNC com 5 módulos integrados:

- 🏠 **Home** - Landing page institucional
- 📊 **Dashboard** - Analytics e métricas em tempo real
- 📖 **Documentação** - Guia completo do Agente Orçamento LASEC
- 🎯 **Portal de Orçamentos** - Galeria navegável com visualizador
- 🔍 **Consulta Database** - Integração PostgreSQL com alertas de prejuízo

**📖 [Documentação completa do Portal LASEC →](./portal-lasec/README.md)**

**🚀 [Acessar Portal LASEC →](https://asouza3044-hash.github.io/xando-IA/portal-lasec/)**

---

### 🔧 **Setup GitHub** (`setup-github.js`)

Script Node.js para sincronização automática de trabalho entre terminais.

```bash
node setup-github.js
```

---

## 🌐 GitHub Pages

Este repositório está configurado com GitHub Pages:

- **Portal LASEC:** `https://asouza3044-hash.github.io/xando-IA/portal-lasec/`

Para ativar:
1. Vá em **Settings** → **Pages**
2. Selecione **Branch: main** e pasta raiz `/`
3. Salve e aguarde deploy

---

## 🔄 Como usar (Sincronização entre terminais)

### Ao iniciar o trabalho em um novo terminal:

```bash
git pull origin main
```

### Ao finalizar o trabalho:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

### Script automático:

```bash
node setup-github.js
```

---

## 📊 Tecnologias

- **Portal LASEC:** HTML5, Tailwind CSS, Chart.js, JavaScript
- **Setup:** Node.js, Git

---

## 📝 Versão

- **Portal LASEC:** v1.0.0 (Janeiro 2026)
- **Setup GitHub:** v1.0.0

---

## 👤 Autor

**Alexandre Souza**
- GitHub: [@asouza3044-hash](https://github.com/asouza3044-hash)
- Repositório: [xando-IA](https://github.com/asouza3044-hash/xando-IA)

---

## 📄 Licença

Uso interno LASEC - Todos os direitos reservados © 2026
