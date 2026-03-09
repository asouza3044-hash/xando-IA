from pydantic import BaseModel
from typing import Optional


# ─── CONTAS A PAGAR ───────────────────────────────────────────────────────────

class ContaCreate(BaseModel):
    nome: str
    descricao: Optional[str] = None
    valor: float
    dia_vencimento: int
    tipo: str
    categoria: Optional[str] = 'outros'
    recorrente: bool = True
    parcelas_total: Optional[int] = None


class ContaUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    valor: Optional[float] = None
    dia_vencimento: Optional[int] = None
    tipo: Optional[str] = None
    categoria: Optional[str] = None
    recorrente: Optional[bool] = None
    parcelas_total: Optional[int] = None


class PagamentoCreate(BaseModel):
    conta_id: int
    data_pagamento: str
    valor_pago: float
    mes_referencia: str
    observacao: Optional[str] = None


# ─── CONTAS A RECEBER ─────────────────────────────────────────────────────────

class ReceitaCreate(BaseModel):
    nome: str
    descricao: Optional[str] = None
    valor: float
    dia_previsto: int
    tipo: str
    categoria: Optional[str] = 'outros'
    recorrente: bool = True


class ReceitaUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    valor: Optional[float] = None
    dia_previsto: Optional[int] = None
    tipo: Optional[str] = None
    categoria: Optional[str] = None
    recorrente: Optional[bool] = None


class RecebimentoCreate(BaseModel):
    receita_id: int
    data_recebimento: str
    valor_recebido: float
    mes_referencia: str
    observacao: Optional[str] = None


# ─── CARTÕES ──────────────────────────────────────────────────────────────────

class CartaoCreate(BaseModel):
    nome: str
    limite: Optional[float] = None
    dia_fechamento: int
    dia_vencimento: int


class CartaoUpdate(BaseModel):
    nome: Optional[str] = None
    limite: Optional[float] = None
    dia_fechamento: Optional[int] = None
    dia_vencimento: Optional[int] = None


class LancamentoCreate(BaseModel):
    cartao_id: int
    descricao: str
    valor: float
    data_compra: str
    categoria: str = "outros"
    mes_referencia: str


# ─── CONTAS BANCÁRIAS ─────────────────────────────────────────────────────────

class ContaBancariaCreate(BaseModel):
    nome: str
    tipo: str              # 'corrente','poupanca','digital','carteira'
    saldo_inicial: float = 0.0


class ContaBancariaUpdate(BaseModel):
    nome: Optional[str] = None
    tipo: Optional[str] = None
    saldo_inicial: Optional[float] = None
    ativo: Optional[bool] = None


# ─── TRANSAÇÕES AVULSAS ───────────────────────────────────────────────────────

class TransacaoCreate(BaseModel):
    descricao: str
    valor: float
    tipo: str              # 'despesa' | 'receita'
    categoria: str
    data: str              # 'YYYY-MM-DD'
    mes_referencia: str    # 'YYYY-MM'
    conta_bancaria_id: Optional[int] = None
    observacao: Optional[str] = None


class TransacaoUpdate(BaseModel):
    descricao: Optional[str] = None
    valor: Optional[float] = None
    tipo: Optional[str] = None
    categoria: Optional[str] = None
    data: Optional[str] = None
    mes_referencia: Optional[str] = None
    conta_bancaria_id: Optional[int] = None
    observacao: Optional[str] = None


# ─── ORÇAMENTOS ───────────────────────────────────────────────────────────────

class OrcamentoCreate(BaseModel):
    categoria: str
    limite: float
    mes_referencia: Optional[str] = None   # None = vale todo mês


class OrcamentoUpdate(BaseModel):
    categoria: Optional[str] = None
    limite: Optional[float] = None
    mes_referencia: Optional[str] = None
