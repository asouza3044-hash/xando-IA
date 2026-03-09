from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = "sqlite:///./contas.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from models import (  # noqa: F401
        Conta, Pagamento, Receita, Recebimento,
        Cartao, LancamentoCartao,
        ContaBancaria, Transacao, Orcamento
    )
    Base.metadata.create_all(bind=engine)

    # Adiciona colunas novas em tabelas existentes (idempotente)
    with engine.connect() as conn:
        for sql in [
            "ALTER TABLE contas ADD COLUMN categoria VARCHAR DEFAULT 'outros'",
            "ALTER TABLE receitas ADD COLUMN categoria VARCHAR DEFAULT 'outros'",
        ]:
            try:
                conn.execute(text(sql))
                conn.commit()
            except Exception:
                pass  # coluna já existe — ignorar
