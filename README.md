# 🏭 Sistema LASEC - Orçamentos de Usinagem CNC

Sistema completo de orçamentos para usinagem de precisão CNC desenvolvido para a **LASEC USINAGEM**.

## 📋 Sobre

Sistema profissional para cálculo de custos, formação de preços e geração de documentos para orçamentos de usinagem CNC.

**Empresa:** MALELO-INDÚSTRIA E COMERCIO FERRAMENTAS
**Nome Fantasia:** LASEC
**CNPJ:** 07.047.619/0001-09

## ✨ Funcionalidades

- ✅ Cálculo automático de custos de fabricação
- ✅ Formação de preço com markup configurável
- ✅ Geração de documentos profissionais (HTML/PDF)
- ✅ Base de dados completa (clientes, fornecedores, equipamentos)
- ✅ Templates reutilizáveis
- ✅ Parâmetros técnicos Iscar para aços e alumínio
- ✅ Histórico completo de orçamentos
- ✅ Cálculo de impostos Simples Nacional
- ✅ Índice organizado de orçamentos

## 📁 Estrutura do Projeto

```
lasec/
├── base_dados/
│   └── dados_completos_orcamentos.json    # Base de dados principal
├── templates/
│   ├── TEMPLATE_ESTUDO_CUSTO.html        # Template estudo de custo
│   ├── TEMPLATE_ESTUDO_PRECO_NFE.html    # Template preço de venda
│   ├── TEMPLATE_PROPOSTA_COMERCIAL.html  # Template proposta cliente
│   └── TEMPLATE_FICHA_PROCESSO.html      # Template ficha processo
├── orcamentos/
│   ├── INDICE_ORCAMENTOS.txt             # Índice de orçamentos
│   └── 2025/
│       ├── 001_MICROGEAR_1.34.12.710/   # Orçamento 001
│       └── 002_MICROGEAR_1.34.03.642/   # Orçamento 002
├── GUIA_RAPIDO_ORCAMENTOS.txt            # Guia rápido de uso
└── SISTEMA_IMPLEMENTADO.txt              # Documentação sistema
```

## 🚀 Como Usar

### Instalação

1. Clone este repositório:
```bash
git clone https://github.com/asouza3044-hash/lasec-orcamentos.git
```

2. Copie para `D:\lasec` ou `C:\lasec`

3. Leia o arquivo `GUIA_RAPIDO_ORCAMENTOS.txt`

### Criar Novo Orçamento

1. Consulte a base de dados em `base_dados/dados_completos_orcamentos.json`
2. Use os templates da pasta `templates/`
3. Calcule custos usando os parâmetros do sistema
4. Gere os documentos HTML
5. Converta para PDF se necessário
6. Salve em `orcamentos/ANO/NNN_CLIENTE_CODIGO/`

## 💰 Parâmetros de Orçamento

### Custo Hora/Máquina
- **GRV Grande SP:** R$ 156,28/h (referência de mercado)
- **LASEC Competitivo:** R$ 120,00/h ⭐ Recomendado
- **LASEC Mínimo:** R$ 100,00/h

### Markup
- **Padrão:** 1.408 (margem 15%)
- **Reduzido:** 1.290 (margem 10%) ⭐ Mais usado
- **Mínimo:** 1.170 (margem 5%)

### Impostos
- **Simples Nacional:** 8,5% (Anexo II)
- **Comissão vendas:** 2-3%
- **Despesas comerciais:** 2-2.5%

### Custos Indiretos (58% sobre MOD)
- Energia elétrica: 15%
- Depreciação máquina: 10%
- Ferramentas/pastilhas: 20%
- Manutenção/lubrificação: 5%
- Despesas gerais: 8%

## 📊 Dados Cadastrados

### Clientes (4)
- CLI001 - RFS Brasil Telecomunicações
- CLI002 - Haste Tecnologia
- CLI003 - MICROGEAR (2 orçamentos)
- CLI004 - Alfa Instrumentos

### Fornecedores (6)
- FOR001 - Lotusmetal (Material)
- FOR002 - Mitsu Ferramentas
- FOR003 - J.Duarte Lubrificantes
- FOR004 - Jati Aços
- FOR005 - MMC Mitsubishi
- FOR006 - Indústria Romi

### Equipamentos (2)
- MAQ001 - Romi GL280 (Centro de Torneamento CNC)
- MAQ002 - Dosan Linxs 220 LM (Torno CNC)

## 🔧 Parâmetros Técnicos Iscar

### Aço SAE 1045/1141
- Velocidade corte desbaste: 240-330 m/min
- Velocidade corte acabamento: 280-330 m/min
- Avanço desbaste: 0.35-0.70 mm/rot
- Avanço acabamento: 0.10-0.20 mm/rot
- Pastilha: IC8250 (CVD coating)

### Alumínio 6061
- Velocidade corte desbaste: 280-350 m/min
- Velocidade corte acabamento: 220-300 m/min
- Avanço desbaste: 0.12-0.25 mm/rot
- Avanço acabamento: 0.05-0.08 mm/rot

## 📈 Orçamentos Realizados

### Orçamento 001/2025 - MICROGEAR
- **Peça:** BUCHA 1.34.12.710
- **Material:** SAE 1045/1141
- **Quantidade:** 100 peças
- **Preço:** R$ 42,00/peça
- **Total:** R$ 4.200,00
- **Margem:** 19,8%

### Orçamento 002/2025 - MICROGEAR
- **Peça:** EIXO 1.34.03.642
- **Material:** SAE 4140
- **Quantidade:** 60 peças
- **Preço:** R$ 73,37/peça
- **Total:** R$ 4.402,20
- **Margem:** 9,98%

## 📞 Contato

**LASEC USINAGEM** - Usinagem de Precisão CNC

📍 Rua Álvaro Silva, 233 - Bairro do Limão - São Paulo/SP - CEP 02723-020
☎️ Tel: (11) 3936-5041 / (11) 3935-1271
📧 Email: contato@lasec.com.br
👤 Responsável: Alexandre Gonçalves de Souza (Sócio-Diretor)

🏦 **Banco Bradesco**
Agência: 0293 | Conta: 153376-2

## 📄 Licença

Sistema proprietário - © 2025 LASEC USINAGEM
Todos os direitos reservados.

## 🤖 Desenvolvido com

Sistema desenvolvido com assistência de Claude AI (Anthropic)

---

**Versão:** 2.0
**Última atualização:** 03/11/2025
**Status:** ✅ Operacional
