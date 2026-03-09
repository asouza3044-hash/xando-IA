from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from datetime import date, datetime
from pathlib import Path
from typing import Optional, List
import calendar

from database import get_db, init_db
from models import (Conta, Pagamento, Receita, Recebimento,
                    Cartao, LancamentoCartao,
                    ContaBancaria, Transacao, Orcamento)
from schemas import (ContaCreate, ContaUpdate, PagamentoCreate,
                     ReceitaCreate, ReceitaUpdate, RecebimentoCreate,
                     CartaoCreate, CartaoUpdate, LancamentoCreate,
                     ContaBancariaCreate, ContaBancariaUpdate,
                     TransacaoCreate, TransacaoUpdate,
                     OrcamentoCreate, OrcamentoUpdate)

app = FastAPI(title="Organizador Financeiro - Alexandre")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

FRONTEND_DIR = Path(__file__).parent.parent / "frontend"
app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def root():
    return FileResponse(str(FRONTEND_DIR / "index.html"))


# ═══════════════════════════════════════════════════════════════════════════════
# CONTAS A PAGAR
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/contas")
def listar_contas(db: Session = Depends(get_db)):
    return [_conta_dict(c) for c in
            db.query(Conta).filter(Conta.ativo == True).order_by(Conta.dia_vencimento).all()]


@app.post("/api/contas", status_code=201)
def criar_conta(data: ContaCreate, db: Session = Depends(get_db)):
    c = Conta(**data.model_dump(), criado_em=datetime.now().isoformat())
    db.add(c); db.commit(); db.refresh(c)
    return _conta_dict(c)


@app.put("/api/contas/{cid}")
def atualizar_conta(cid: int, data: ContaUpdate, db: Session = Depends(get_db)):
    c = db.query(Conta).filter(Conta.id == cid).first()
    if not c: raise HTTPException(404, "Conta não encontrada")
    for k, v in data.model_dump(exclude_none=True).items(): setattr(c, k, v)
    db.commit(); db.refresh(c)
    return _conta_dict(c)


@app.delete("/api/contas/{cid}")
def arquivar_conta(cid: int, db: Session = Depends(get_db)):
    c = db.query(Conta).filter(Conta.id == cid).first()
    if not c: raise HTTPException(404, "Conta não encontrada")
    c.ativo = False; db.commit()
    return {"ok": True}


@app.post("/api/pagamentos", status_code=201)
def registrar_pagamento(data: PagamentoCreate, db: Session = Depends(get_db)):
    if db.query(Pagamento).filter(Pagamento.conta_id == data.conta_id,
                                   Pagamento.mes_referencia == data.mes_referencia).first():
        raise HTTPException(400, "Pagamento já registrado para este mês")
    p = Pagamento(**data.model_dump()); db.add(p)
    c = db.query(Conta).filter(Conta.id == data.conta_id).first()
    if c and c.tipo == "parcela":
        c.parcelas_pagas = (c.parcelas_pagas or 0) + 1
        if c.parcelas_total and c.parcelas_pagas >= c.parcelas_total:
            c.ativo = False
    db.commit(); db.refresh(p)
    return {"id": p.id, "ok": True}


@app.get("/api/pagamentos")
def listar_pagamentos(mes: str = None, db: Session = Depends(get_db)):
    q = db.query(Pagamento)
    if mes: q = q.filter(Pagamento.mes_referencia == mes)
    return [{"id": p.id, "conta_id": p.conta_id,
             "conta_nome": p.conta.nome if p.conta else "",
             "conta_tipo": p.conta.tipo if p.conta else "",
             "data_pagamento": p.data_pagamento, "valor_pago": p.valor_pago,
             "mes_referencia": p.mes_referencia, "observacao": p.observacao}
            for p in q.order_by(Pagamento.data_pagamento.desc()).all()]


@app.delete("/api/pagamentos/{pid}")
def desfazer_pagamento(pid: int, db: Session = Depends(get_db)):
    p = db.query(Pagamento).filter(Pagamento.id == pid).first()
    if not p: raise HTTPException(404, "Pagamento não encontrado")
    c = db.query(Conta).filter(Conta.id == p.conta_id).first()
    if c and c.tipo == "parcela" and c.parcelas_pagas > 0:
        c.parcelas_pagas -= 1
        if not c.ativo: c.ativo = True
    db.delete(p); db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# DASHBOARD A PAGAR
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/dashboard")
def dashboard(ano: int, mes: int, db: Session = Depends(get_db)):
    hoje = date.today()
    mes_ref = f"{ano}-{mes:02d}"
    contas = db.query(Conta).filter(Conta.ativo == True).order_by(Conta.dia_vencimento).all()
    resultado, total_a_pagar, total_pago, vencidas, vence_em_7_dias = [], 0.0, 0.0, 0, 0

    for c in contas:
        pag = db.query(Pagamento).filter(Pagamento.conta_id == c.id,
                                          Pagamento.mes_referencia == mes_ref).first()
        venc = date(ano, mes, min(c.dia_vencimento, _ultimo_dia(ano, mes)))
        dias = (venc - hoje).days

        if pag:
            status = "pago"; total_pago += pag.valor_pago
        elif venc < hoje:
            status = "vencida"; vencidas += 1
        elif 0 <= dias <= 7:
            status = "a_vencer"; vence_em_7_dias += 1
        else:
            status = "ok"

        if not pag: total_a_pagar += c.valor

        resultado.append({"id": c.id, "nome": c.nome, "descricao": c.descricao,
                           "valor": c.valor, "dia_vencimento": c.dia_vencimento,
                           "tipo": c.tipo, "categoria": c.categoria,
                           "recorrente": c.recorrente, "parcelas_total": c.parcelas_total,
                           "parcelas_pagas": c.parcelas_pagas, "status": status,
                           "dias_para_vencer": dias if not pag else None,
                           "data_vencimento": venc.isoformat(),
                           "pagamento": {"id": pag.id, "data_pagamento": pag.data_pagamento,
                                         "valor_pago": pag.valor_pago,
                                         "observacao": pag.observacao} if pag else None})

    return {"mes": mes_ref, "total_a_pagar": total_a_pagar + total_pago,
            "total_pago": total_pago, "total_pendente": total_a_pagar,
            "vencidas": vencidas, "vence_em_7_dias": vence_em_7_dias, "contas": resultado}


# ═══════════════════════════════════════════════════════════════════════════════
# CONTAS A RECEBER
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/receitas")
def listar_receitas(db: Session = Depends(get_db)):
    return [_receita_dict(r) for r in
            db.query(Receita).filter(Receita.ativo == True).order_by(Receita.dia_previsto).all()]


@app.post("/api/receitas", status_code=201)
def criar_receita(data: ReceitaCreate, db: Session = Depends(get_db)):
    r = Receita(**data.model_dump(), criado_em=datetime.now().isoformat())
    db.add(r); db.commit(); db.refresh(r)
    return _receita_dict(r)


@app.put("/api/receitas/{rid}")
def atualizar_receita(rid: int, data: ReceitaUpdate, db: Session = Depends(get_db)):
    r = db.query(Receita).filter(Receita.id == rid).first()
    if not r: raise HTTPException(404, "Receita não encontrada")
    for k, v in data.model_dump(exclude_none=True).items(): setattr(r, k, v)
    db.commit(); db.refresh(r)
    return _receita_dict(r)


@app.delete("/api/receitas/{rid}")
def arquivar_receita(rid: int, db: Session = Depends(get_db)):
    r = db.query(Receita).filter(Receita.id == rid).first()
    if not r: raise HTTPException(404, "Receita não encontrada")
    r.ativo = False; db.commit()
    return {"ok": True}


@app.get("/api/receitas/dashboard")
def dashboard_receitas(ano: int, mes: int, db: Session = Depends(get_db)):
    hoje = date.today()
    mes_ref = f"{ano}-{mes:02d}"
    receitas = db.query(Receita).filter(Receita.ativo == True).order_by(Receita.dia_previsto).all()
    resultado, total_previsto, total_recebido = [], 0.0, 0.0

    for r in receitas:
        rec = db.query(Recebimento).filter(Recebimento.receita_id == r.id,
                                            Recebimento.mes_referencia == mes_ref).first()
        prev = date(ano, mes, min(r.dia_previsto, _ultimo_dia(ano, mes)))
        dias = (prev - hoje).days
        status = "recebido" if rec else ("atrasado" if prev < hoje else "pendente")
        if rec: total_recebido += rec.valor_recebido
        total_previsto += r.valor
        resultado.append({"id": r.id, "nome": r.nome, "descricao": r.descricao,
                           "valor": r.valor, "dia_previsto": r.dia_previsto,
                           "tipo": r.tipo, "categoria": r.categoria, "status": status,
                           "dias_para_receber": dias if not rec else None,
                           "data_prevista": prev.isoformat(),
                           "recebimento": {"id": rec.id, "data_recebimento": rec.data_recebimento,
                                           "valor_recebido": rec.valor_recebido,
                                           "observacao": rec.observacao} if rec else None})

    return {"mes": mes_ref, "total_previsto": total_previsto,
            "total_recebido": total_recebido,
            "total_pendente": total_previsto - total_recebido, "receitas": resultado}


@app.post("/api/recebimentos", status_code=201)
def registrar_recebimento(data: RecebimentoCreate, db: Session = Depends(get_db)):
    if db.query(Recebimento).filter(Recebimento.receita_id == data.receita_id,
                                     Recebimento.mes_referencia == data.mes_referencia).first():
        raise HTTPException(400, "Recebimento já registrado para este mês")
    rec = Recebimento(**data.model_dump()); db.add(rec); db.commit(); db.refresh(rec)
    return {"id": rec.id, "ok": True}


@app.get("/api/recebimentos")
def listar_recebimentos(mes: str = None, db: Session = Depends(get_db)):
    q = db.query(Recebimento)
    if mes: q = q.filter(Recebimento.mes_referencia == mes)
    return [{"id": r.id, "receita_id": r.receita_id,
             "receita_nome": r.receita.nome if r.receita else "",
             "receita_tipo": r.receita.tipo if r.receita else "",
             "data_recebimento": r.data_recebimento, "valor_recebido": r.valor_recebido,
             "mes_referencia": r.mes_referencia, "observacao": r.observacao}
            for r in q.order_by(Recebimento.data_recebimento.desc()).all()]


@app.delete("/api/recebimentos/{rid}")
def desfazer_recebimento(rid: int, db: Session = Depends(get_db)):
    r = db.query(Recebimento).filter(Recebimento.id == rid).first()
    if not r: raise HTTPException(404, "Recebimento não encontrado")
    db.delete(r); db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# CARTÕES
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/cartoes")
def listar_cartoes(db: Session = Depends(get_db)):
    return [_cartao_dict(c) for c in db.query(Cartao).filter(Cartao.ativo == True).all()]


@app.post("/api/cartoes", status_code=201)
def criar_cartao(data: CartaoCreate, db: Session = Depends(get_db)):
    c = Cartao(**data.model_dump()); db.add(c); db.commit(); db.refresh(c)
    return _cartao_dict(c)


@app.put("/api/cartoes/{cid}")
def atualizar_cartao(cid: int, data: CartaoUpdate, db: Session = Depends(get_db)):
    c = db.query(Cartao).filter(Cartao.id == cid).first()
    if not c: raise HTTPException(404, "Cartão não encontrado")
    for k, v in data.model_dump(exclude_none=True).items(): setattr(c, k, v)
    db.commit(); db.refresh(c)
    return _cartao_dict(c)


@app.delete("/api/cartoes/{cid}")
def arquivar_cartao(cid: int, db: Session = Depends(get_db)):
    c = db.query(Cartao).filter(Cartao.id == cid).first()
    if not c: raise HTTPException(404, "Cartão não encontrado")
    c.ativo = False; db.commit()
    return {"ok": True}


@app.get("/api/cartoes/{cid}/lancamentos")
def lancamentos_cartao(cid: int, mes: str = None, db: Session = Depends(get_db)):
    q = db.query(LancamentoCartao).filter(LancamentoCartao.cartao_id == cid)
    if mes: q = q.filter(LancamentoCartao.mes_referencia == mes)
    items = q.order_by(LancamentoCartao.data_compra.desc()).all()
    return {"total": sum(l.valor for l in items),
            "lancamentos": [_lancamento_dict(l) for l in items]}


@app.post("/api/lancamentos", status_code=201)
def criar_lancamento(data: LancamentoCreate, db: Session = Depends(get_db)):
    l = LancamentoCartao(**data.model_dump()); db.add(l); db.commit(); db.refresh(l)
    return _lancamento_dict(l)


@app.delete("/api/lancamentos/{lid}")
def remover_lancamento(lid: int, db: Session = Depends(get_db)):
    l = db.query(LancamentoCartao).filter(LancamentoCartao.id == lid).first()
    if not l: raise HTTPException(404, "Lançamento não encontrado")
    db.delete(l); db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# CONTAS BANCÁRIAS
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/contas-bancarias")
def listar_contas_bancarias(db: Session = Depends(get_db)):
    return [_cb_dict(c) for c in db.query(ContaBancaria).filter(ContaBancaria.ativo == True).all()]


@app.post("/api/contas-bancarias", status_code=201)
def criar_conta_bancaria(data: ContaBancariaCreate, db: Session = Depends(get_db)):
    c = ContaBancaria(**data.model_dump(), criado_em=datetime.now().isoformat())
    db.add(c); db.commit(); db.refresh(c)
    return _cb_dict(c)


@app.put("/api/contas-bancarias/{cid}")
def atualizar_conta_bancaria(cid: int, data: ContaBancariaUpdate, db: Session = Depends(get_db)):
    c = db.query(ContaBancaria).filter(ContaBancaria.id == cid).first()
    if not c: raise HTTPException(404, "Conta bancária não encontrada")
    for k, v in data.model_dump(exclude_none=True).items(): setattr(c, k, v)
    db.commit(); db.refresh(c)
    return _cb_dict(c)


@app.delete("/api/contas-bancarias/{cid}")
def arquivar_conta_bancaria(cid: int, db: Session = Depends(get_db)):
    c = db.query(ContaBancaria).filter(ContaBancaria.id == cid).first()
    if not c: raise HTTPException(404, "Conta bancária não encontrada")
    c.ativo = False; db.commit()
    return {"ok": True}


@app.get("/api/contas-bancarias/{cid}/saldo")
def saldo_conta_bancaria(cid: int, db: Session = Depends(get_db)):
    c = db.query(ContaBancaria).filter(ContaBancaria.id == cid).first()
    if not c: raise HTTPException(404, "Conta bancária não encontrada")

    entradas = db.query(func.sum(Transacao.valor)).filter(
        Transacao.conta_bancaria_id == cid, Transacao.tipo == 'receita').scalar() or 0.0
    saidas = db.query(func.sum(Transacao.valor)).filter(
        Transacao.conta_bancaria_id == cid, Transacao.tipo == 'despesa').scalar() or 0.0

    return {**_cb_dict(c), "saldo_atual": c.saldo_inicial + entradas - saidas,
            "total_entradas": entradas, "total_saidas": saidas}


# ═══════════════════════════════════════════════════════════════════════════════
# TRANSAÇÕES AVULSAS
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/transacoes")
def listar_transacoes(mes: str = None, tipo: str = None, db: Session = Depends(get_db)):
    q = db.query(Transacao)
    if mes:  q = q.filter(Transacao.mes_referencia == mes)
    if tipo: q = q.filter(Transacao.tipo == tipo)
    return [_transacao_dict(t) for t in q.order_by(Transacao.data.desc()).all()]


@app.post("/api/transacoes", status_code=201)
def criar_transacao(data: TransacaoCreate, db: Session = Depends(get_db)):
    t = Transacao(**data.model_dump(), criado_em=datetime.now().isoformat())
    db.add(t); db.commit(); db.refresh(t)
    return _transacao_dict(t)


@app.put("/api/transacoes/{tid}")
def atualizar_transacao(tid: int, data: TransacaoUpdate, db: Session = Depends(get_db)):
    t = db.query(Transacao).filter(Transacao.id == tid).first()
    if not t: raise HTTPException(404, "Transação não encontrada")
    for k, v in data.model_dump(exclude_none=True).items(): setattr(t, k, v)
    db.commit(); db.refresh(t)
    return _transacao_dict(t)


@app.delete("/api/transacoes/{tid}")
def remover_transacao(tid: int, db: Session = Depends(get_db)):
    t = db.query(Transacao).filter(Transacao.id == tid).first()
    if not t: raise HTTPException(404, "Transação não encontrada")
    db.delete(t); db.commit()
    return {"ok": True}


# ═══════════════════════════════════════════════════════════════════════════════
# ORÇAMENTOS
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/orcamentos")
def listar_orcamentos(db: Session = Depends(get_db)):
    return [_orc_dict(o) for o in db.query(Orcamento).all()]


@app.post("/api/orcamentos", status_code=201)
def criar_orcamento(data: OrcamentoCreate, db: Session = Depends(get_db)):
    o = Orcamento(**data.model_dump()); db.add(o); db.commit(); db.refresh(o)
    return _orc_dict(o)


@app.put("/api/orcamentos/{oid}")
def atualizar_orcamento(oid: int, data: OrcamentoUpdate, db: Session = Depends(get_db)):
    o = db.query(Orcamento).filter(Orcamento.id == oid).first()
    if not o: raise HTTPException(404, "Orçamento não encontrado")
    for k, v in data.model_dump(exclude_none=True).items(): setattr(o, k, v)
    db.commit(); db.refresh(o)
    return _orc_dict(o)


@app.delete("/api/orcamentos/{oid}")
def remover_orcamento(oid: int, db: Session = Depends(get_db)):
    o = db.query(Orcamento).filter(Orcamento.id == oid).first()
    if not o: raise HTTPException(404, "Orçamento não encontrado")
    db.delete(o); db.commit()
    return {"ok": True}


@app.get("/api/orcamentos/progresso")
def progresso_orcamentos(mes: str, db: Session = Depends(get_db)):
    orcs = db.query(Orcamento).filter(
        or_(Orcamento.mes_referencia == mes, Orcamento.mes_referencia == None)
    ).all()

    resultado = []
    for o in orcs:
        # Transações avulsas
        gasto_trans = db.query(func.sum(Transacao.valor)).filter(
            Transacao.categoria == o.categoria, Transacao.tipo == 'despesa',
            Transacao.mes_referencia == mes).scalar() or 0.0

        # Pagamentos de contas recorrentes com mesma categoria
        gasto_contas = db.query(func.sum(Pagamento.valor_pago)).join(Conta).filter(
            Conta.categoria == o.categoria, Pagamento.mes_referencia == mes).scalar() or 0.0

        # Lançamentos de cartão com mesma categoria
        gasto_cartao = db.query(func.sum(LancamentoCartao.valor)).filter(
            LancamentoCartao.categoria == o.categoria,
            LancamentoCartao.mes_referencia == mes).scalar() or 0.0

        total = gasto_trans + gasto_contas + gasto_cartao
        pct = round(total / o.limite * 100, 1) if o.limite > 0 else 0.0
        status = "vermelho" if pct > 90 else "amarelo" if pct > 70 else "verde"

        resultado.append({"id": o.id, "categoria": o.categoria, "limite": o.limite,
                          "gasto_atual": total, "percentual": pct, "status": status})

    return resultado


# ═══════════════════════════════════════════════════════════════════════════════
# FLUXO DE CAIXA (expandido)
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/fluxo")
def fluxo_caixa(ano: int, mes: int, db: Session = Depends(get_db)):
    mes_ref = f"{ano}-{mes:02d}"

    saidas_pagas = sum(p.valor_pago for p in
                       db.query(Pagamento).filter(Pagamento.mes_referencia == mes_ref).all())
    entradas_recebidas = sum(r.valor_recebido for r in
                             db.query(Recebimento).filter(Recebimento.mes_referencia == mes_ref).all())
    cartao_total = sum(l.valor for l in
                       db.query(LancamentoCartao).filter(LancamentoCartao.mes_referencia == mes_ref).all())

    # Transações avulsas
    trans = db.query(Transacao).filter(Transacao.mes_referencia == mes_ref).all()
    trans_receitas = sum(t.valor for t in trans if t.tipo == 'receita')
    trans_despesas = sum(t.valor for t in trans if t.tipo == 'despesa')

    saidas_previstas  = sum(c.valor for c in db.query(Conta).filter(Conta.ativo == True).all())
    entradas_previstas = sum(r.valor for r in db.query(Receita).filter(Receita.ativo == True).all())

    return {
        "mes": mes_ref,
        "entradas_previstas":  entradas_previstas + trans_receitas,
        "entradas_recebidas":  entradas_recebidas + trans_receitas,
        "saidas_previstas":    saidas_previstas + trans_despesas,
        "saidas_pagas":        saidas_pagas + trans_despesas,
        "cartao_total":        cartao_total,
        "trans_receitas":      trans_receitas,
        "trans_despesas":      trans_despesas,
        "saldo_previsto":      (entradas_previstas + trans_receitas) - (saidas_previstas + trans_despesas) - cartao_total,
        "saldo_real":          (entradas_recebidas + trans_receitas) - (saidas_pagas + trans_despesas) - cartao_total,
    }


# ═══════════════════════════════════════════════════════════════════════════════
# RELATÓRIO ANUAL (expandido)
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/api/relatorio")
def relatorio_anual(ano: int, db: Session = Depends(get_db)):
    meses, entradas, saidas, cartao, saldo = [], [], [], [], []

    for mes in range(1, 13):
        mr = f"{ano}-{mes:02d}"
        e = sum(r.valor_recebido for r in db.query(Recebimento).filter(Recebimento.mes_referencia == mr).all())
        s = sum(p.valor_pago     for p in db.query(Pagamento).filter(Pagamento.mes_referencia == mr).all())
        c = sum(l.valor          for l in db.query(LancamentoCartao).filter(LancamentoCartao.mes_referencia == mr).all())
        tr = sum(t.valor for t in db.query(Transacao).filter(Transacao.mes_referencia == mr, Transacao.tipo == 'receita').all())
        td = sum(t.valor for t in db.query(Transacao).filter(Transacao.mes_referencia == mr, Transacao.tipo == 'despesa').all())

        meses.append(mr); entradas.append(e + tr); saidas.append(s + td)
        cartao.append(c); saldo.append((e + tr) - (s + td) - c)

    # Gastos por categoria no mês atual
    mes_atual = f"{ano}-{date.today().month:02d}"
    por_categoria: dict = {}

    for p in db.query(Pagamento).filter(Pagamento.mes_referencia == mes_atual).all():
        cat = (p.conta.categoria or p.conta.tipo) if p.conta else "outros"
        por_categoria[cat] = por_categoria.get(cat, 0) + p.valor_pago

    for l in db.query(LancamentoCartao).filter(LancamentoCartao.mes_referencia == mes_atual).all():
        por_categoria[l.categoria] = por_categoria.get(l.categoria, 0) + l.valor

    for t in db.query(Transacao).filter(Transacao.mes_referencia == mes_atual,
                                         Transacao.tipo == 'despesa').all():
        por_categoria[t.categoria] = por_categoria.get(t.categoria, 0) + t.valor

    return {"meses": meses, "entradas": entradas, "saidas": saidas,
            "cartao": cartao, "saldo": saldo, "por_tipo": por_categoria}


# ═══════════════════════════════════════════════════════════════════════════════
# HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

def _conta_dict(c: Conta):
    return {"id": c.id, "nome": c.nome, "descricao": c.descricao, "valor": c.valor,
            "dia_vencimento": c.dia_vencimento, "tipo": c.tipo, "categoria": c.categoria,
            "recorrente": c.recorrente, "parcelas_total": c.parcelas_total,
            "parcelas_pagas": c.parcelas_pagas, "ativo": c.ativo, "criado_em": c.criado_em}

def _receita_dict(r: Receita):
    return {"id": r.id, "nome": r.nome, "descricao": r.descricao, "valor": r.valor,
            "dia_previsto": r.dia_previsto, "tipo": r.tipo, "categoria": r.categoria,
            "recorrente": r.recorrente, "ativo": r.ativo, "criado_em": r.criado_em}

def _cartao_dict(c: Cartao):
    return {"id": c.id, "nome": c.nome, "limite": c.limite,
            "dia_fechamento": c.dia_fechamento, "dia_vencimento": c.dia_vencimento, "ativo": c.ativo}

def _lancamento_dict(l: LancamentoCartao):
    return {"id": l.id, "cartao_id": l.cartao_id, "descricao": l.descricao,
            "valor": l.valor, "data_compra": l.data_compra,
            "categoria": l.categoria, "mes_referencia": l.mes_referencia}

def _cb_dict(c: ContaBancaria):
    return {"id": c.id, "nome": c.nome, "tipo": c.tipo,
            "saldo_inicial": c.saldo_inicial, "ativo": c.ativo, "criado_em": c.criado_em}

def _transacao_dict(t: Transacao):
    return {"id": t.id, "descricao": t.descricao, "valor": t.valor, "tipo": t.tipo,
            "categoria": t.categoria, "data": t.data, "mes_referencia": t.mes_referencia,
            "conta_bancaria_id": t.conta_bancaria_id,
            "conta_bancaria_nome": t.conta_bancaria.nome if t.conta_bancaria else None,
            "observacao": t.observacao, "criado_em": t.criado_em}

def _orc_dict(o: Orcamento):
    return {"id": o.id, "categoria": o.categoria, "limite": o.limite,
            "mes_referencia": o.mes_referencia}

def _ultimo_dia(ano: int, mes: int) -> int:
    return calendar.monthrange(ano, mes)[1]


# ─── IMPORTAÇÃO DE EXTRATOS ────────────────────────────────────────────────────

@app.post("/api/importar-extrato")
async def importar_extrato_preview(
    file: UploadFile = File(...),
    conta_bancaria_id: Optional[int] = Form(None)
):
    """Faz parse do arquivo e retorna preview sem salvar no banco."""
    from parsers import parse_extrato
    content = await file.read()
    transacoes = parse_extrato(file.filename or 'extrato', content)
    for t in transacoes:
        t['conta_bancaria_id'] = conta_bancaria_id
    return {
        "arquivo": file.filename,
        "total": len(transacoes),
        "transacoes": transacoes
    }


@app.post("/api/importar-extrato/confirmar")
def importar_extrato_confirmar(body: dict, db: Session = Depends(get_db)):
    """Salva as transações selecionadas no banco."""
    transacoes = body.get("transacoes", [])
    conta_bancaria_id = body.get("conta_bancaria_id")
    salvos = 0
    for t in transacoes:
        cb_id = conta_bancaria_id or t.get("conta_bancaria_id")
        nova = Transacao(
            descricao=t.get("descricao", "Importado"),
            valor=float(t.get("valor", 0)),
            tipo=t.get("tipo", "despesa"),
            categoria=t.get("categoria", "outros"),
            data=t.get("data", str(date.today())),
            mes_referencia=t.get("mes_referencia", str(date.today())[:7]),
            conta_bancaria_id=int(cb_id) if cb_id else None,
            observacao=t.get("observacao"),
        )
        db.add(nova)
        salvos += 1
    db.commit()
    return {"salvos": salvos}
