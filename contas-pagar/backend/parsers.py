"""
Parsers de extrato bancário — suporte a:
  OFX/QFX  → Itaú, Bradesco, Santander, BB, Caixa, Inter, Sicoob, Sicredi, Nubank
  CSV       → Nubank cartão, Nubank conta, Banco do Brasil, Bradesco, Inter, genérico
  TXT       → Caixa e outros legados (tenta CSV)
  XLSX/XLS  → Itaú, Bradesco, Santander, PagBank e outros
"""

import csv
import io
import re
import xml.etree.ElementTree as ET
from typing import List, Dict, Any, Optional


# ─── NORMALIZAÇÃO ────────────────────────────────────────────────────────────

def _normalize_date(s: str) -> Optional[str]:
    """Converte qualquer formato de data para YYYY-MM-DD."""
    s = s.strip() if s else ''
    # OFX: YYYYMMDD ou YYYYMMDDHHmmss[tz]
    m = re.match(r'^(\d{4})(\d{2})(\d{2})', s)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
    # Brasileiro: dd/MM/yyyy ou dd.MM.yyyy ou dd-MM-yyyy
    m = re.match(r'^(\d{1,2})[/\.\-](\d{1,2})[/\.\-](\d{4})', s)
    if m:
        return f"{m.group(3)}-{m.group(2).zfill(2)}-{m.group(1).zfill(2)}"
    # ISO: YYYY-MM-DD
    m = re.match(r'^(\d{4})\-(\d{2})\-(\d{2})', s)
    if m:
        return s[:10]
    return None


def _normalize_amount(s: Any) -> float:
    """Converte valor em qualquer formato numérico para float."""
    s = str(s).strip() if s is not None else '0'
    s = re.sub(r'[R$\s\xa0]', '', s)          # remove R$, espaços, nbsp
    s = s.replace('\u2212', '-')               # traço unicode → menos
    if ',' in s and '.' in s:
        s = s.replace('.', '').replace(',', '.')
    elif ',' in s:
        s = s.replace(',', '.')
    s = re.sub(r'[^\d.\-]', '', s)
    try:
        return float(s)
    except (ValueError, TypeError):
        return 0.0


def _make_tx(data: str, descricao: str, valor: float, tipo: str) -> Dict:
    data = data or ''
    return {
        'data': data,
        'descricao': (descricao or '').strip(),
        'valor': abs(valor),
        'tipo': tipo,
        'categoria': 'outros',
        'mes_referencia': data[:7] if data else '',
    }


# ─── OFX / QFX ───────────────────────────────────────────────────────────────

def _parse_ofx_sgml(text: str) -> List[Dict]:
    """OFX 1.x — formato SGML (mais comum nos bancos BR)."""
    results = []
    blocks = re.findall(r'<STMTTRN>(.*?)</STMTTRN>', text, re.DOTALL | re.IGNORECASE)
    for block in blocks:
        def tag(name):
            m = re.search(rf'<{name}>\s*([^\n<]+)', block, re.IGNORECASE)
            return m.group(1).strip() if m else ''

        amount = _normalize_amount(tag('TRNAMT'))
        date   = _normalize_date(tag('DTPOSTED'))
        memo   = tag('MEMO') or tag('NAME') or tag('TRNTYPE')

        if not date or amount == 0.0:
            continue

        tipo = 'receita' if amount > 0 else 'despesa'
        results.append(_make_tx(date, memo, amount, tipo))
    return results


def _parse_ofx_xml(text: str) -> List[Dict]:
    """OFX 2.x — XML puro."""
    results = []
    try:
        root = ET.fromstring(text)
        for trn in root.iter('STMTTRN'):
            def tag(name):
                el = trn.find(name)
                return el.text.strip() if el is not None and el.text else ''

            amount = _normalize_amount(tag('TRNAMT'))
            date   = _normalize_date(tag('DTPOSTED'))
            memo   = tag('MEMO') or tag('NAME') or tag('TRNTYPE')

            if not date or amount == 0.0:
                continue

            tipo = 'receita' if amount > 0 else 'despesa'
            results.append(_make_tx(date, memo, amount, tipo))
    except ET.ParseError:
        pass
    return results


def parse_ofx(content: bytes) -> List[Dict]:
    for enc in ['utf-8-sig', 'utf-8', 'latin-1', 'cp1252', 'iso-8859-1']:
        try:
            text = content.decode(enc)
            break
        except UnicodeDecodeError:
            continue
    else:
        return []

    if text.strip().startswith('<?xml') or text.strip().startswith('<OFX'):
        return _parse_ofx_xml(text)
    return _parse_ofx_sgml(text)


# ─── CSV ─────────────────────────────────────────────────────────────────────

def _detect_bank(headers: List[str]) -> str:
    h = [x.lower().strip() for x in headers]
    hs = '|'.join(h)

    # Nubank cartão: date,title,amount
    if 'title' in h and 'amount' in h and 'date' in h:
        return 'nubank_cartao'
    # Nubank conta: data,descrição,valor
    if 'data' in h and 'descrição' in h and 'valor' in h and len(h) == 3:
        return 'nubank_conta'
    # BB com Débito + Crédito + Saldo
    if 'débito' in h and 'crédito' in h and 'saldo' in h:
        return 'bb'
    if 'debito' in h and 'credito' in h and 'saldo' in h:
        return 'bb'
    # BB com Valor Entrada / Valor Saída
    if any('entrada' in x for x in h) and any('saída' in x or 'saida' in x for x in h):
        return 'bb_v2'
    # Bradesco: "data lançamento"
    if any('lançamento' in x or 'lancamento' in x for x in h):
        return 'bradesco'
    # Inter: data,histórico,valor
    if 'histórico' in h or 'historico' in h:
        return 'inter'
    # Santander / genérico com Débito/Crédito separados
    if any('débito' in x or 'debito' in x for x in h) and any('crédito' in x or 'credito' in x for x in h):
        return 'debcred'
    return 'generic'


def _find_col(row: Dict, *candidates) -> str:
    """Retorna o valor do primeiro campo cujo nome case-insensitive bata."""
    for key in row:
        kl = key.lower().strip()
        for cand in candidates:
            if cand in kl:
                return str(row[key] or '').strip()
    return ''


def _parse_csv_rows(rows: List[Dict], bank: str) -> List[Dict]:
    results = []
    for row in rows:
        if not any(v for v in row.values()):
            continue
        try:
            if bank == 'nubank_cartao':
                date  = _normalize_date(row.get('date', ''))
                desc  = row.get('title', '').strip()
                amt   = _normalize_amount(row.get('amount', '0'))
                tipo  = 'despesa' if amt < 0 else 'receita'
                valor = abs(amt)

            elif bank == 'nubank_conta':
                date  = _normalize_date(row.get('Data', '') or row.get('data', ''))
                desc  = row.get('Descrição', '') or row.get('descrição', '') or ''
                amt   = _normalize_amount(row.get('Valor', '0') or row.get('valor', '0'))
                tipo  = 'receita' if amt >= 0 else 'despesa'
                valor = abs(amt)

            elif bank == 'bb':
                date  = _normalize_date(_find_col(row, 'data'))
                desc  = _find_col(row, 'histórico', 'historico', 'descrição', 'descricao')
                deb   = _normalize_amount(_find_col(row, 'débito', 'debito'))
                cred  = _normalize_amount(_find_col(row, 'crédito', 'credito'))
                if deb:
                    valor, tipo = deb, 'despesa'
                else:
                    valor, tipo = cred, 'receita'

            elif bank == 'bb_v2':
                date  = _normalize_date(_find_col(row, 'data'))
                desc  = _find_col(row, 'descrição', 'descricao', 'histórico', 'historico')
                ent   = _normalize_amount(_find_col(row, 'entrada'))
                sai   = _normalize_amount(_find_col(row, 'saída', 'saida'))
                if sai:
                    valor, tipo = sai, 'despesa'
                else:
                    valor, tipo = ent, 'receita'

            elif bank == 'bradesco':
                date  = _normalize_date(_find_col(row, 'data'))
                desc  = _find_col(row, 'histórico', 'historico', 'descrição', 'descricao')
                cred  = _normalize_amount(_find_col(row, 'crédito', 'credito'))
                deb   = _normalize_amount(_find_col(row, 'débito', 'debito'))
                if deb:
                    valor, tipo = deb, 'despesa'
                else:
                    valor, tipo = cred, 'receita'

            elif bank == 'debcred':
                date  = _normalize_date(_find_col(row, 'data'))
                desc  = _find_col(row, 'descrição', 'descricao', 'histórico', 'historico', 'memo')
                cred  = _normalize_amount(_find_col(row, 'crédito', 'credito'))
                deb   = _normalize_amount(_find_col(row, 'débito', 'debito'))
                if deb:
                    valor, tipo = deb, 'despesa'
                else:
                    valor, tipo = cred, 'receita'

            else:  # generic / inter
                date  = _normalize_date(_find_col(row, 'data', 'date', 'dt'))
                desc  = _find_col(row, 'descrição', 'descricao', 'histórico', 'historico',
                                  'memo', 'description', 'title', 'lançamento', 'lancamento')
                amt   = _normalize_amount(_find_col(row, 'valor', 'value', 'amount',
                                                    'quantia', 'importância'))
                tipo  = 'receita' if amt >= 0 else 'despesa'
                valor = abs(amt)

            if not date or not desc or valor == 0:
                continue

            results.append(_make_tx(date, desc, valor, tipo))
        except Exception:
            continue
    return results


def parse_csv(content: bytes) -> List[Dict]:
    text = None
    for enc in ['utf-8-sig', 'utf-8', 'latin-1', 'cp1252']:
        try:
            text = content.decode(enc)
            break
        except UnicodeDecodeError:
            continue
    if text is None:
        return []

    # Detecta delimitador
    sample = text[:3000]
    delim = ';' if sample.count(';') > sample.count(',') else ','

    try:
        reader = csv.DictReader(io.StringIO(text), delimiter=delim)
        headers = reader.fieldnames or []
        if not headers:
            return []
        bank = _detect_bank(list(headers))
        rows = list(reader)
    except Exception:
        return []

    return _parse_csv_rows(rows, bank)


# ─── XLSX / XLS ──────────────────────────────────────────────────────────────

def _xlsx_to_dict_rows(content: bytes) -> List[Dict]:
    import openpyxl
    wb = openpyxl.load_workbook(io.BytesIO(content), data_only=True)
    ws = wb.active
    all_rows = list(ws.iter_rows(values_only=True))
    if not all_rows:
        return [], []

    # Acha linha de cabeçalho: primeira com pelo menos 2 strings
    header_idx = 0
    for i, row in enumerate(all_rows):
        if sum(1 for c in row if isinstance(c, str) and c.strip()) >= 2:
            header_idx = i
            break

    headers = [str(c).strip() if c is not None else '' for c in all_rows[header_idx]]
    dict_rows = []
    for row in all_rows[header_idx + 1:]:
        d = {}
        for j, h in enumerate(headers):
            if not h:
                continue
            val = row[j] if j < len(row) else None
            if hasattr(val, 'strftime'):          # datetime do Excel
                val = val.strftime('%d/%m/%Y')
            d[h] = str(val) if val is not None else ''
        if any(v for v in d.values()):
            dict_rows.append(d)
    return headers, dict_rows


def _xls_to_dict_rows(content: bytes):
    import xlrd
    wb = xlrd.open_workbook(file_contents=content)
    ws = wb.sheet_by_index(0)
    if ws.nrows < 2:
        return [], []

    headers = [str(ws.cell_value(0, j)).strip() for j in range(ws.ncols)]
    dict_rows = []
    for i in range(1, ws.nrows):
        d = {}
        for j, h in enumerate(headers):
            if not h:
                continue
            val = ws.cell_value(i, j)
            if ws.cell_type(i, j) == 3:   # XL_CELL_DATE
                import xlrd
                dt = xlrd.xldate_as_datetime(val, wb.datemode)
                val = dt.strftime('%d/%m/%Y')
            d[h] = str(val) if val is not None else ''
        if any(v for v in d.values()):
            dict_rows.append(d)
    return headers, dict_rows


def parse_xlsx(content: bytes) -> List[Dict]:
    try:
        headers, dict_rows = _xlsx_to_dict_rows(content)
        if not dict_rows:
            return []
        bank = _detect_bank(headers)
        return _parse_csv_rows(dict_rows, bank)
    except Exception:
        pass

    # Fallback: tenta como .xls antigo
    try:
        headers, dict_rows = _xls_to_dict_rows(content)
        if not dict_rows:
            return []
        bank = _detect_bank(headers)
        return _parse_csv_rows(dict_rows, bank)
    except Exception:
        return []


# ─── DISPATCHER PRINCIPAL ────────────────────────────────────────────────────

def parse_extrato(filename: str, content: bytes) -> List[Dict]:
    """Detecta formato pelo nome/conteúdo e parseia."""
    ext = filename.lower().rsplit('.', 1)[-1] if '.' in filename else ''

    if ext in ('ofx', 'qfx'):
        return parse_ofx(content)

    if ext in ('xlsx', 'xls'):
        return parse_xlsx(content)

    if ext in ('csv', 'txt'):
        return parse_csv(content)

    # Sem extensão reconhecida: tenta pelo conteúdo
    sample = content[:500]
    for enc in ['utf-8', 'latin-1']:
        try:
            s = sample.decode(enc)
            if 'OFXHEADER' in s.upper() or '<OFX' in s.upper():
                return parse_ofx(content)
            if '<?xml' in s:
                return parse_ofx(content)
            break
        except Exception:
            continue

    return parse_csv(content)   # fallback
