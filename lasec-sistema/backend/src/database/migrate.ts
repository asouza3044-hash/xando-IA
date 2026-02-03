import { pool } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Script de migração - Cria todas as tabelas do sistema
 */
async function migrate() {
  console.log('🔄 Iniciando migração do banco de dados...\n');

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Extensões
    console.log('📦 Criando extensões...');
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "pg_trgm";
    `);

    // Tabela: clientes
    console.log('📋 Criando tabela: clientes');
    await client.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        codigo VARCHAR(20) UNIQUE NOT NULL,
        nome VARCHAR(200) NOT NULL,
        nome_fantasia VARCHAR(200),
        pais VARCHAR(50) DEFAULT 'Brasil',
        cnpj VARCHAR(20),
        inscricao_estadual VARCHAR(30),
        logradouro VARCHAR(200),
        numero VARCHAR(20),
        complemento VARCHAR(100),
        bairro VARCHAR(100),
        cidade VARCHAR(100),
        estado VARCHAR(2),
        cep VARCHAR(10),
        telefone VARCHAR(20),
        telefone_secundario VARCHAR(20),
        email VARCHAR(200),
        contato_nome VARCHAR(100),
        ativo BOOLEAN DEFAULT true,
        observacoes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_clientes_nome ON clientes USING gin(nome gin_trgm_ops);
      CREATE INDEX IF NOT EXISTS idx_clientes_pais ON clientes(pais);
    `);

    // Tabela: maquinas
    console.log('📋 Criando tabela: maquinas');
    await client.query(`
      CREATE TABLE IF NOT EXISTS maquinas (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        codigo VARCHAR(20) UNIQUE NOT NULL,
        nome VARCHAR(100) NOT NULL,
        fabricante VARCHAR(100),
        modelo VARCHAR(100),
        tipo VARCHAR(50) NOT NULL,
        hora_maquina DECIMAL(10,2) NOT NULL,
        setup_padrao_horas DECIMAL(5,2) DEFAULT 1.0,
        diametro_max_mm DECIMAL(10,2),
        comprimento_max_mm DECIMAL(10,2),
        tem_eixo_c BOOLEAN DEFAULT false,
        tem_ferramenta_motorizada BOOLEAN DEFAULT false,
        tem_sub_spindle BOOLEAN DEFAULT false,
        ativo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela: ferramentas
    console.log('📋 Criando tabela: ferramentas');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ferramentas (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        codigo VARCHAR(20) NOT NULL,
        codigo_minipcp VARCHAR(50),
        descricao VARCHAR(200) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        diametro_mm DECIMAL(10,2),
        raio_mm DECIMAL(5,2),
        angulo_ponta DECIMAL(5,2),
        material_ferramenta VARCHAR(50),
        velocidade_corte_min DECIMAL(10,2),
        velocidade_corte_max DECIMAL(10,2),
        avanco_min DECIMAL(8,4),
        avanco_max DECIMAL(8,4),
        materiais_aplicaveis TEXT[],
        operacoes_aplicaveis TEXT[],
        ativo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_ferramentas_codigo ON ferramentas(codigo);
      CREATE INDEX IF NOT EXISTS idx_ferramentas_tipo ON ferramentas(tipo);
    `);

    // Tabela: programas_cnc
    console.log('📋 Criando tabela: programas_cnc');
    await client.query(`
      CREATE TABLE IF NOT EXISTS programas_cnc (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        numero_programa VARCHAR(50) NOT NULL,
        nome_peca VARCHAR(200),
        descricao TEXT,
        caminho_arquivo VARCHAR(500),
        diretorio VARCHAR(100),
        maquina_id UUID REFERENCES maquinas(id),
        cliente_id UUID REFERENCES clientes(id),
        tempo_ciclo_minutos DECIMAL(10,2),
        setup_horas DECIMAL(5,2),
        num_operacoes INTEGER,
        num_ferramentas INTEGER,
        complexidade VARCHAR(20),
        material VARCHAR(100),
        material_fornecido_por VARCHAR(50),
        tags TEXT[],
        validado BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_programas_numero ON programas_cnc(numero_programa);
      CREATE INDEX IF NOT EXISTS idx_programas_maquina ON programas_cnc(maquina_id);
      CREATE INDEX IF NOT EXISTS idx_programas_cliente ON programas_cnc(cliente_id);
      CREATE INDEX IF NOT EXISTS idx_programas_tags ON programas_cnc USING gin(tags);
    `);

    // Tabela: orcamentos
    console.log('📋 Criando tabela: orcamentos');
    await client.query(`
      CREATE TABLE IF NOT EXISTS orcamentos (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        numero VARCHAR(20) UNIQUE NOT NULL,
        ano INTEGER NOT NULL,
        sequencial INTEGER NOT NULL,
        cliente_id UUID REFERENCES clientes(id),
        data_criacao DATE NOT NULL DEFAULT CURRENT_DATE,
        data_validade DATE,
        descricao VARCHAR(500),
        observacoes TEXT,
        status VARCHAR(30) DEFAULT 'RASCUNHO',
        custo_total DECIMAL(12,2),
        preco_total DECIMAL(12,2),
        margem_percentual DECIMAL(5,2),
        pasta_documentos VARCHAR(500),
        created_by VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_orcamentos_numero ON orcamentos(numero);
      CREATE INDEX IF NOT EXISTS idx_orcamentos_cliente ON orcamentos(cliente_id);
      CREATE INDEX IF NOT EXISTS idx_orcamentos_status ON orcamentos(status);
      CREATE INDEX IF NOT EXISTS idx_orcamentos_ano ON orcamentos(ano);
    `);

    // Tabela: itens_orcamento
    console.log('📋 Criando tabela: itens_orcamento');
    await client.query(`
      CREATE TABLE IF NOT EXISTS itens_orcamento (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        orcamento_id UUID NOT NULL REFERENCES orcamentos(id) ON DELETE CASCADE,
        sequencial INTEGER NOT NULL,
        codigo VARCHAR(50) NOT NULL,
        descricao VARCHAR(200) NOT NULL,
        material VARCHAR(100),
        especificacao_material VARCHAR(200),
        material_fornecido_por VARCHAR(50) DEFAULT 'LASEC',
        custo_material_unitario DECIMAL(10,2) DEFAULT 0,
        diametro_bruto_mm DECIMAL(10,2),
        comprimento_bruto_mm DECIMAL(10,2),
        programa_cnc_id UUID REFERENCES programas_cnc(id),
        programa_cnc_numero VARCHAR(50),
        maquina_id UUID REFERENCES maquinas(id),
        tempo_ciclo_minutos DECIMAL(10,2) NOT NULL,
        setup_horas DECIMAL(5,2) NOT NULL,
        quantidade_por_conjunto INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(orcamento_id, sequencial)
      );

      CREATE INDEX IF NOT EXISTS idx_itens_orcamento ON itens_orcamento(orcamento_id);
    `);

    // Tabela: operacoes
    console.log('📋 Criando tabela: operacoes');
    await client.query(`
      CREATE TABLE IF NOT EXISTS operacoes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        item_id UUID NOT NULL REFERENCES itens_orcamento(id) ON DELETE CASCADE,
        sequencial INTEGER NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        descricao VARCHAR(200),
        ferramenta_id UUID REFERENCES ferramentas(id),
        ferramenta_codigo VARCHAR(20),
        rpm INTEGER,
        velocidade_corte DECIMAL(10,2),
        avanco DECIMAL(8,4),
        ciclo VARCHAR(20),
        tempo_minutos DECIMAL(8,2),
        tempo_produtivo BOOLEAN DEFAULT true,
        observacoes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(item_id, sequencial)
      );

      CREATE INDEX IF NOT EXISTS idx_operacoes_item ON operacoes(item_id);
    `);

    // Tabela: lotes
    console.log('📋 Criando tabela: lotes');
    await client.query(`
      CREATE TABLE IF NOT EXISTS lotes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        orcamento_id UUID NOT NULL REFERENCES orcamentos(id) ON DELETE CASCADE,
        quantidade INTEGER NOT NULL,
        custo_setup DECIMAL(12,2) NOT NULL,
        custo_mod DECIMAL(12,2) NOT NULL,
        custo_cif DECIMAL(12,2) NOT NULL,
        custo_material DECIMAL(12,2) DEFAULT 0,
        custo_total DECIMAL(12,2) NOT NULL,
        custo_unitario DECIMAL(12,4) NOT NULL,
        preco_com_perdas DECIMAL(12,4),
        preco_com_markup DECIMAL(12,4),
        preco_nfe DECIMAL(12,4) NOT NULL,
        preco_total_lote DECIMAL(12,2) NOT NULL,
        margem_lucro_percentual DECIMAL(5,2),
        lucro_bruto DECIMAL(12,2),
        economia_vs_piloto DECIMAL(5,2),
        score_viabilidade INTEGER,
        viabilidade VARCHAR(30),
        tempo_producao_horas DECIMAL(10,2),
        dias_uteis DECIMAL(5,1),
        ocupacao_maquina VARCHAR(20),
        lote_recomendado BOOLEAN DEFAULT false,
        lote_piloto BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_lotes_orcamento ON lotes(orcamento_id);
    `);

    // Tabela: documentos_gerados
    console.log('📋 Criando tabela: documentos_gerados');
    await client.query(`
      CREATE TABLE IF NOT EXISTS documentos_gerados (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        orcamento_id UUID NOT NULL REFERENCES orcamentos(id) ON DELETE CASCADE,
        tipo VARCHAR(50) NOT NULL,
        nome_arquivo VARCHAR(200) NOT NULL,
        caminho_arquivo VARCHAR(500) NOT NULL,
        formato VARCHAR(10) NOT NULL,
        versao INTEGER DEFAULT 1,
        confidencial BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_documentos_orcamento ON documentos_gerados(orcamento_id);
    `);

    // Tabela: parametros_sistema
    console.log('📋 Criando tabela: parametros_sistema');
    await client.query(`
      CREATE TABLE IF NOT EXISTS parametros_sistema (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        chave VARCHAR(100) UNIQUE NOT NULL,
        valor VARCHAR(500) NOT NULL,
        tipo VARCHAR(20) NOT NULL,
        descricao VARCHAR(200),
        categoria VARCHAR(50),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Inserir dados iniciais
    console.log('\n📦 Inserindo dados iniciais...');

    // Máquinas
    await client.query(`
      INSERT INTO maquinas (codigo, nome, fabricante, modelo, tipo, hora_maquina, setup_padrao_horas, tem_eixo_c, tem_ferramenta_motorizada)
      VALUES
        ('LYNX220', 'Doosan LYNX 220 LM', 'Doosan', 'LYNX 220 LM', 'TORNO_CNC', 105.00, 1.5, true, true),
        ('GL280', 'Romi GL280', 'Romi', 'GL280', 'TORNO_CNC', 83.08, 0.5, false, false),
        ('GL240', 'Romi GL240', 'Romi', 'GL240', 'TORNO_CNC', 75.00, 0.5, false, false),
        ('DISCO760', 'Discovery 760', 'Romi', 'Discovery 760', 'CENTRO_USINAGEM', 104.76, 1.0, false, false)
      ON CONFLICT (codigo) DO NOTHING;
    `);

    // Parâmetros do sistema
    await client.query(`
      INSERT INTO parametros_sistema (chave, valor, tipo, descricao, categoria) VALUES
        ('CIF_PERCENTUAL', '58', 'PERCENTAGE', 'Custos Indiretos de Fabricação sobre (Setup + MOD)', 'CUSTO'),
        ('MARKUP_PERCENTUAL', '35', 'PERCENTAGE', 'Markup/Margem sobre custo', 'PRECO'),
        ('PERDAS_PERCENTUAL', '2', 'PERCENTAGE', 'Percentual de perdas estimadas', 'PRECO'),
        ('IMPOSTOS_PERCENTUAL', '10', 'PERCENTAGE', 'Impostos Simples Nacional', 'PRECO'),
        ('MULTIPLICADOR_FINAL', '1.5147', 'NUMBER', 'Multiplicador final (1.02 x 1.35 x 1.10)', 'PRECO'),
        ('VALIDADE_PROPOSTA_DIAS', '30', 'NUMBER', 'Dias de validade da proposta comercial', 'COMERCIAL'),
        ('HORA_MAQUINA_PADRAO', '105', 'NUMBER', 'Valor hora-máquina padrão em R$', 'CUSTO')
      ON CONFLICT (chave) DO NOTHING;
    `);

    await client.query('COMMIT');

    console.log('\n✅ Migração concluída com sucesso!');
    console.log('   Tabelas criadas: clientes, maquinas, ferramentas, programas_cnc,');
    console.log('                    orcamentos, itens_orcamento, operacoes, lotes,');
    console.log('                    documentos_gerados, parametros_sistema');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('\n❌ Erro na migração:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(console.error);
