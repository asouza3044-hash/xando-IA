# 🚀 LASEC - Sistema de Orçamentos na Nuvem

## 📍 ACESSO PRINCIPAL
**URL:** http://137.131.140.7

---

## 🔑 CREDENCIAIS

### Banco de Dados PostgreSQL
- **Host:** localhost (127.0.0.1)
- **Porta:** 5432
- **Database:** lasec_orcamentos
- **Usuário:** lasec_user
- **Senha:** Xando1973#

### SSH (Acesso à VM)
- **IP:** 137.131.140.7
- **Usuário:** ubuntu
- **Chave SSH:** D:\IA MALELO\ssh-key-2026-02-04.key
- **Comando:** ssh -i "D:\IA MALELO\ssh-key-2026-02-04.key" ubuntu@137.131.140.7

---

## 📊 DADOS DO SISTEMA

### Clientes (7)
- RFS Brasil Telecomunicações
- Haste Tecnologia Ltda
- Microgear Indústria de Peças
- Alfa Instrumentos Eletrônicos
- + 3 clientes de teste

### Máquinas CNC (8)
- Romi GL280 (R$ 156.28/hora)
- Doosan Lynx 220LM (R$ 156.28/hora)
- + 6 outras máquinas

### Ferramentas (6)
- Brocas, Fresas, Bedames, Pastilhas

---

## 🔧 COMANDOS ÚTEIS

### Verificar status do sistema
```bash
~/check-system.sh
```

### Ver logs do backend
```bash
sudo journalctl -u lasec-backend -f
```

### Reiniciar backend
```bash
sudo systemctl restart lasec-backend
```

### Backup manual
```bash
~/backup-db.sh
```

### Ver backups
```bash
ls -lh /var/backups/lasec/
```

---

## 📡 APIs DISPONÍVEIS

- **Health:** http://137.131.140.7/health
- **Clientes:** http://137.131.140.7/api/clientes
- **Máquinas:** http://137.131.140.7/api/maquinas
- **Ferramentas:** http://137.131.140.7/api/ferramentas
- **Orçamentos:** http://137.131.140.7/api/orcamentos

---

## 🛠️ SERVIÇOS ATIVOS

- **Backend:** systemd service (lasec-backend)
- **PostgreSQL:** porta 5432
- **nginx:** porta 80
- **Backup:** diário às 3h da manhã (cron)

---

## 📦 RECURSOS VM

- **Provedor:** Oracle Cloud (Free Tier)
- **Sistema:** Ubuntu 22.04 LTS
- **RAM:** 956MB (1GB)
- **Disco:** 150GB
- **IP Público:** 137.131.140.7

---

## ⚙️ PARÂMETROS LASEC

- Hora/máquina: R$ 156.28
- Markup padrão: 1.408
- Markup reduzido: 1.290
- CIF: 58%
- Margem lucro: 15%
- Validade proposta: 15 dias
- Pagamento: 50% antecipado + 50% entrega
- Frete: FOB

---

## 🎯 PRÓXIMOS PASSOS

1. [ ] Configurar domínio próprio (lasec.com.br)
2. [ ] Adicionar SSL/HTTPS (Let's Encrypt)
3. [ ] Configurar API Key Claude (para agente PDF)
4. [ ] Tentar upgrade para VM A1.Flex (24GB RAM)

---

**Data de implantação:** 05/02/2026
**Versão:** 1.0
**Status:** ✅ PRODUÇÃO
