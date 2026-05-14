# TASK ATUAL — Cronoanálise IMPAKTTO
# Atualizar após cada sessão produtiva

## Status: AGUARDANDO NOVOS DADOS

### Concluído nesta fase (14/05/2026)
- [x] OCR de 3 lotes: CCF11 (p1–p6), CCF13 (p1), WhatsApp 14/05 (p1–p5)
- [x] 40 OPs importadas em CRONOANALISE.xlsx
- [x] Dashboard v2 com filtros, Chart.js, pç/h, Pareto, ranking
- [x] Regra "cj" (×2) implementada em importar_csv.py e gerar_dados_html.py
- [x] Normalização "matro" → "MATÃO" em gerar_dados_html.py
- [x] Estrutura modular criada (docs/, state/, tasks/)
- [x] Slash command /consultoria-impaktto criado

### Pendências — aguardando IMPAKTTO
- [ ] WhatsApp p4 e p5 ilegíveis — aguardar reenvio com melhor qualidade
- [ ] Confirmar nomes reais das máquinas
- [ ] Confirmar descrições de P07, P11, P12, P13, P15, P16
- [ ] Novos formulários semanas 15/05 em diante

### Próxima ação técnica
1. Receber foto nova via WhatsApp
2. Converter PDF → PNG (gerar_pdf_png.py ou fitz manual)
3. OCR via Claude (leitura direta da imagem)
4. Gerar CSV em ocr_output/YYYYMMDD_fonte.csv
5. python importar_csv.py ocr_output/YYYYMMDD_fonte.csv
6. python gerar_dados_html.py
7. Verificar dashboard no browser
8. Atualizar STATE.json + LAST_CHECKPOINT.md
