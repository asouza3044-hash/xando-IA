from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base


class Conta(Base):
    __tablename__ = "contas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    descricao = Column(Text, nullable=True)
    valor = Column(Float, nullable=False)
    dia_vencimento = Column(Integer, nullable=False)
    tipo = Column(String, nullable=False)          # 'fixo', 'imposto', 'parcela'
    categoria = Column(String, nullable=True, default='outros')
    recorrente = Column(Boolean, default=True)
    parcelas_total = Column(Integer, nullable=True)
    parcelas_pagas = Column(Integer, default=0)
    ativo = Column(Boolean, default=True)
    criado_em = Column(String)

    pagamentos = relationship("Pagamento", back_populates="conta")


class Pagamento(Base):
    __tablename__ = "pagamentos"

    id = Column(Integer, primary_key=True, index=True)
    conta_id = Column(Integer, ForeignKey("contas.id"), nullable=False)
    data_pagamento = Column(String, nullable=False)
    valor_pago = Column(Float, nullable=False)
    mes_referencia = Column(String, nullable=False)
    observacao = Column(Text, nullable=True)

    conta = relationship("Conta", back_populates="pagamentos")


class Receita(Base):
    __tablename__ = "receitas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    descricao = Column(Text, nullable=True)
    valor = Column(Float, nullable=False)
    dia_previsto = Column(Integer, nullable=False)
    tipo = Column(String, nullable=False)          # 'salario', 'cliente', 'aluguel', 'outros'
    categoria = Column(String, nullable=True, default='outros')
    recorrente = Column(Boolean, default=True)
    ativo = Column(Boolean, default=True)
    criado_em = Column(String)

    recebimentos = relationship("Recebimento", back_populates="receita")


class Recebimento(Base):
    __tablename__ = "recebimentos"

    id = Column(Integer, primary_key=True, index=True)
    receita_id = Column(Integer, ForeignKey("receitas.id"), nullable=False)
    data_recebimento = Column(String, nullable=False)
    valor_recebido = Column(Float, nullable=False)
    mes_referencia = Column(String, nullable=False)
    observacao = Column(Text, nullable=True)

    receita = relationship("Receita", back_populates="recebimentos")


class Cartao(Base):
    __tablename__ = "cartoes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    limite = Column(Float, nullable=True)
    dia_fechamento = Column(Integer, nullable=False)
    dia_vencimento = Column(Integer, nullable=False)
    ativo = Column(Boolean, default=True)

    lancamentos = relationship("LancamentoCartao", back_populates="cartao")


class LancamentoCartao(Base):
    __tablename__ = "lancamentos_cartao"

    id = Column(Integer, primary_key=True, index=True)
    cartao_id = Column(Integer, ForeignKey("cartoes.id"), nullable=False)
    descricao = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    data_compra = Column(String, nullable=False)
    categoria = Column(String, nullable=False, default="outros")
    mes_referencia = Column(String, nullable=False)

    cartao = relationship("Cartao", back_populates="lancamentos")


class ContaBancaria(Base):
    __tablename__ = "contas_bancarias"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)           # "Nubank", "Bradesco CC"
    tipo = Column(String, nullable=False)           # 'corrente','poupanca','digital','carteira'
    saldo_inicial = Column(Float, nullable=False, default=0.0)
    ativo = Column(Boolean, default=True)
    criado_em = Column(String)

    transacoes = relationship("Transacao", back_populates="conta_bancaria")


class Transacao(Base):
    __tablename__ = "transacoes"

    id = Column(Integer, primary_key=True, index=True)
    descricao = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    tipo = Column(String, nullable=False)           # 'despesa' | 'receita'
    categoria = Column(String, nullable=False, default="outros")
    data = Column(String, nullable=False)           # 'YYYY-MM-DD'
    mes_referencia = Column(String, nullable=False) # 'YYYY-MM'
    conta_bancaria_id = Column(Integer, ForeignKey("contas_bancarias.id"), nullable=True)
    observacao = Column(Text, nullable=True)
    criado_em = Column(String)

    conta_bancaria = relationship("ContaBancaria", back_populates="transacoes")


class Orcamento(Base):
    __tablename__ = "orcamentos"

    id = Column(Integer, primary_key=True, index=True)
    categoria = Column(String, nullable=False)
    limite = Column(Float, nullable=False)
    mes_referencia = Column(String, nullable=True)  # None = recorrente (vale todo mês)
