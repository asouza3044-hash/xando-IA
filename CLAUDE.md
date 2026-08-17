# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment

- **Platform:** Windows 11, shell: bash (Git Bash). Always use Unix paths and syntax.
- **Primary data drive:** `D:\IA MALELO\` (templates, BD MINIPCP, orçamentos, base_dados)
- **Repo location:** `C:\Users\lasec\Documents\GitHub\xando-IA` (branch `lasec-orcamentos-local` → push `origin/lasec-orcamentos`).

## Main Project: ORCAMENTISTA.html

**Location:** `C:\Users\lasec\Documents\orcamento-lasec-hmtl\ORCAMENTISTA.html`

Single-file, browser-only HTML app — no build step, no server, no dependencies. Open directly in browser.
A `CLAUDE.md` with detailed architecture notes lives in the same directory.

**To open/test:**
```bash
start "C:\Users\lasec\Documents\orcamento-lasec-hmtl\ORCAMENTISTA.html"
```

**The static HTML files** in that directory (`ESTUDO_CUSTO_FABRICACAO.html`, `ANALISE_VIABILIDADE_LOTES.html`, etc.) are legacy reference documents. All generation now happens inside `ORCAMENTISTA.html`.

## Quotation Workflow (Slash Commands)

For any new CNC machining quotation, always start with:

```
/orcamento-lasec
```

This agent orchestrates the full 6-document flow in order:
1. `PROCESSO_FABRICACAO` ← **gate: must be approved before continuing**
2. `ESTUDO_CUSTO_FABRICACAO`
3. `ESTUDO_PRECO_VENDA_NFE`
4. `ANALISE_VIABILIDADE_LOTES`
5. `ANALISE_BREAK_EVEN`
6. `PROPOSTA_COMERCIAL`

Supporting commands:
- `/buscar-programa` — search historical CNC programs for cycle time estimation
- `/calcular-orcamento` — standalone cost calculation

## Key Data Locations

| Resource | Path |
|---|---|
| Templates (approved) | `D:\IA MALELO\templates\` |
| Orçamentos 2025 | `D:\IA MALELO\orcamentos\2025\` |
| Reference orçamento (model) | `D:\IA MALELO\orcamentos\2025\MICROGEAR\008_MICROGEAR_TR1.07.02.033\` |
| BD MINIPCP (tool codes) | `D:\IA MALELO\banco_dados\BD MINIPCP.xlsx` and `D:\IA MALELO\banco_dados\MINIPCP.csv` |
| CNC program database | `D:\IA MALELO\banco_dados\PROG_CNC_DATABASE.json` (11 592 programs) |
| Machine-hour costs | `D:\IA MALELO\banco_dados\custos_ferramentaria lasec.xls` |
| LASEC logo | `C:\Users\lasec\Documents\orcamento-lasec-hmtl\simbolo-lasec.jpg` |

## Next Quotation Number

Always list `D:\IA MALELO\orcamentos\2025\` to find the highest existing number and use `last + 1`. Do not ask — discover automatically.

## Memory System (CRITICAL)

Before ANY work, read the memory files:
1. `memory/orcamentos_estado.md` — active quotations
2. `memory/regras_usinagem.md` — Alexandre's machining rules (NEVER repeat past mistakes)
3. `memory/parametros_corte.md` — validated cutting parameters
4. `memory/maquinas_specs.md` — real machine specifications
5. `CHECKPOINT.md` in the quotation directory — current state of that specific quotation

After ANY correction from Alexandre: save IMMEDIATELY to the appropriate memory file.

## PowerShell Scripts

When running PowerShell commands:
- **Never** use `-replace` inline in bash with `$_` — causes extglob errors and can empty files.
- Always write scripts to a `.ps1` file and run with `powershell -File script.ps1`.
- Use `[System.IO.File]::ReadAllText` + `.Replace()` for text substitution.

## HTML Document Rules

- After any HTML edit, always **save with Edit/Write** — never just describe changes.
- Verify by opening in browser: `start "<path>.html"`
- Never recreate layouts from scratch — always copy from the approved template or orçamento 008, then edit only the data.
- Column widths in tables must sum to exactly 100%. Never adjust by guessing.
- PDF conversion is done **manually by the user** from the browser print dialog — do not automate unless explicitly asked.
