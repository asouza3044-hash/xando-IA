# HISTÓRICO DE DECISÕES IMPORTANTES

## 2025-01-20: Setup 1,5x Produção

### Contexto
Orçamento 008/2025 LIVENZA estava usando R$ 120/h tanto para setup quanto para produção.

### Problema
Setup não deve ter mesma taxa que produção porque:
1. Não gera peças (custo de oportunidade)
2. Requer operador especializado
3. Maior complexidade (programação, ajustes, primeira peça)

### Decisão
- **Setup:** R$ 180/h (1,5x produção)
- **Produção:** R$ 120/h

### Impacto
- Ponto de equilíbrio: 20 peças (era 14)
- Custo/peça aumentou ~8%:
  - Lote 50: R$ 13,27 (era R$ 12,32)
  - Lote 100: R$ 11,85 (era R$ 11,38)
  - Lote 500: R$ 10,71 (era R$ 10,62)

### Referência
Padrão industrial: Setup = 1,5x a 2,0x produção

---

## 2025-01-20: Tempo Improdutivo

### Contexto
Cálculo de tempo não incluía trocas de ferramenta.

### Decisão
Adicionar 20 segundos por troca de ferramenta (cavaco a cavaco).

### Fórmula
```
Tempo_improdutivo = (Número_ferramentas - 1) × 20s
```

### Exemplo LIVENZA 008
- 5 ferramentas (T0505, T0606, T1212, T1010, T0404)
- 4 trocas × 20s = 1,3 min
- Tempo total: 2,0min + 1,3min = 3,3min/peça

---

## 2025-01-20: Remoção Coluna Ferr. do Item 3

### Contexto
Tabela Item 3 (DADOS TÉCNICOS DE CORTE) tinha coluna "Ferr." redundante.

### Decisão
Remover coluna "Ferr." e redistribuir espaço.

### Motivo
- Informação já presente na coluna "Tipo"
- Otimizar espaço para colunas importantes

### Resultado
9 colunas finais:
- Tipo
- Cód. BD Suporte
- Suporte
- Cód. BD Pastilha
- Pastilha/Inserto
- RPM
- Avanço
- Tempo
- Operação

---

## 2025-01-20: Valores Exatos vs Intervalos

### Contexto
Parâmetros de corte apresentados como intervalos.

### Problema
Intervalos dificultam cálculo preciso de tempo e custo.

### Decisão
Usar SEMPRE valores exatos dos programas CNC:
- ❌ "F 0.15 - F 0.25"
- ✅ "F 0.25"
- ❌ "1500 - 2500 RPM"
- ✅ "2500 RPM"

---

## LIÇÕES APRENDIDAS

### Diagramação de Tabelas
❌ **NÃO FAZER:**
- Tentar ajustar porcentagens manualmente
- Insistir quando usuário reclama de layout
- Assumir que porcentagens estão corretas

✅ **FAZER:**
- Pedir Excel com layout correto
- Deixar usuário ajustar manualmente se necessário
- Sempre verificar que total = 100%

### Custos
❌ **NÃO ESQUECER:**
- Setup é MAIS CARO que produção
- Tempo improdutivo existe
- Custos indiretos sobre TUDO (setup + produção)

### Comunicação
✅ **SEMPRE:**
- Documentar decisões importantes
- Pedir confirmação em valores críticos
- Usar exemplos concretos
