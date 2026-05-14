# Como atualizar o relatório IMPAKTTO

Guia rápido para gerar uma versão atualizada do PPTX/PDF sempre que houver novos apontamentos.

---

## Fluxo em 3 etapas

```
┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
│ 1. CAPTURAR        │   │ 2. IMPORTAR        │   │ 3. ATUALIZAR       │
│                    │   │                    │   │ RELATÓRIO          │
│ Foto do formulário │ → │ OCR + CSV +        │ → │                    │
│ via celular/scanner│   │ importar_csv.py    │   │ atualizar_         │
│                    │   │ → CRONOANALISE.xlsx│   │ relatorio.bat      │
└────────────────────┘   └────────────────────┘   └────────────────────┘
                                                              ↓
                                                     entregaveis/
                                                     ├── ...v1.pptx
                                                     └── ...v1.pdf
```

---

## Etapa 1 — Capturar (você + cliente)

- Tira foto do formulário preenchido, **com boa iluminação**
- A 1ª foto-teste teve baixa nitidez → vários "[???]" no resultado. Priorize:
  - Foto sem reflexos, papel plano (não amassado)
  - Resolução mínima 12 MP (qualquer celular moderno)
  - Iluminação ambiente, não usar flash direto
- Salve a foto em `fotos_apontamento/` com nome `YYYYMMDD_descricao.jpg`

## Etapa 2 — Importar (Claude ajuda)

**Opção A — comigo no chat (recomendado):**
- Manda a foto direto no chat
- Eu aplico OCR, devolvo CSV pronto
- Você coloca o CSV em `ocr_output/` e roda:
  ```cmd
  python importar_csv.py ocr_output\nome-do-csv.csv
  ```

**Opção B — manual:**
- Use qualquer OCR (Google Lens, Adobe Scan, etc.)
- Cole no Excel → ajuste colunas para bater com o cabeçalho da aba `4_APONTAMENTO_HIST`
- Salve a planilha

## Etapa 3 — Atualizar relatório (clique-duplo)

- **Clique duplo em `atualizar_relatorio.bat`**
- Espera 5-15 segundos
- Pronto: `entregaveis/CRONOANALISE_IMPAKTTO_v1.pptx` está atualizado com os números novos
- Se LibreOffice estiver instalado, o PDF também é gerado automaticamente

O script faz tudo isso por você:

1. Lê `CRONOANALISE.xlsx` aba `4_APONTAMENTO_HIST`
2. Limpa os dados (remove `[???]` dos operadores, etc.)
3. Recalcula todos os KPIs, ranking, mix e Pareto
4. Regenera o PPTX com os números atualizados
5. (Opcional) Exporta o PDF

---

## Estrutura da pasta

```
D:\IA MALELO\consultoria\IMPAKTTO\
├── CRONOANALISE.xlsx              ← planilha principal (10 abas)
├── atualizar_relatorio.bat        ← CLIQUE DUPLO PARA REGENERAR
├── COMO_ATUALIZAR_RELATORIO.md    ← este arquivo
├── HANDOFF_CLAUDE_DESKTOP.md      ← contexto do projeto
├── importar_csv.py                ← importa CSV → aba 4
├── gerar_planilha.py              ← (re)gera a planilha base
│
├── entregaveis/                   ← PPTX e PDF prontos para o cliente
│   ├── CRONOANALISE_IMPAKTTO_v1.pptx
│   └── CRONOANALISE_IMPAKTTO_v1.pdf
│
├── relatorio_pptx/                ← motor do relatório (NÃO mexer)
│   ├── gerar_dados.py             ← extrai e consolida dados do Excel
│   ├── build_pptx.js              ← desenha o PPTX
│   ├── dados_relatorio.json       ← dados consolidados (gerado a cada run)
│   └── node_modules/              ← biblioteca pptxgenjs
│
├── fotos_apontamento/             ← coloque aqui as fotos novas
├── ocr_output/                    ← CSVs gerados pelo OCR
└── powerbi/                       ← tema + DAX + guia (Power BI)
```

---

## Pré-requisitos (já instalados na sua máquina)

- **Python 3** (com `openpyxl`) — para `gerar_dados.py` e `importar_csv.py`
- **Node.js** — para `build_pptx.js` (pptxgenjs)
- **LibreOffice (opcional)** — exporta PDF automático. Sem ele, o `.bat` ainda gera o PPTX; você só precisa abrir no PowerPoint e Arquivo → Exportar → PDF.

---

## Solução de problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| `python: command not found` | Python não está no PATH | Instalar Python.org ou usar `py` no lugar de `python` no .bat |
| `Cannot find module 'pptxgenjs'` | `node_modules` apagada | Abrir CMD em `relatorio_pptx\` e rodar `npm install pptxgenjs` |
| KPIs erradas | Dados na aba 4 estão sujos | Conferir se o cabeçalho está na linha 3 e se as quantidades são números (não texto) |
| PDF não gerou | LibreOffice não instalado | Abrir o PPTX no PowerPoint → Arquivo → Exportar → PDF |

---

## Pergunta frequente

**P: Mudou a paleta de cores ou o layout dos slides. Posso ajustar?**
R: Sim, mas edite `relatorio_pptx/build_pptx.js`. As constantes `NAVY`, `ORANGE`, `GREEN`, `RED` no topo controlam toda a paleta. Cada slide é um bloco `{ ... }` independente — fácil de localizar.

**P: Posso adicionar um slide novo?**
R: Sim. Copie um bloco `// SLIDE N — ...` existente, ajuste o conteúdo, e ele será adicionado na próxima geração.

**P: Cliente quer enxergar 1 OP em particular. Adiciono filtro?**
R: Esse é o caso de uso onde **Power BI brilha** — filtros interativos. O Excel + DAX + tema já estão prontos em `powerbi/`. Quando tiver tempo, finalize o dashboard seguindo `powerbi/POWERBI_GUIA.md`.

---

*Última atualização: 10/05/2026 · LASEC Consultoria*
