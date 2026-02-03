import { Router, Request, Response } from 'express';
import { query, queryOne, transaction } from '../config/database';
import { CalculoCustoService } from '../services/CalculoCustoService';
import { v4 as uuidv4 } from 'uuid';
import { ORCAMENTO_STATUS, BUSINESS_RULES } from '../config/constants';

const router = Router();
const calculoService = new CalculoCustoService();

/**
 * GET /api/orcamentos
 * Lista todos os orçamentos
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { ano, status, cliente_id, limite = 50 } = req.query;

    let sql = `
      SELECT o.*, c.nome as cliente_nome, c.pais as cliente_pais
      FROM orcamentos o
      LEFT JOIN clientes c ON o.cliente_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (ano) {
      params.push(ano);
      sql += ` AND o.ano = $${params.length}`;
    }

    if (status) {
      params.push(status);
      sql += ` AND o.status = $${params.length}`;
    }

    if (cliente_id) {
      params.push(cliente_id);
      sql += ` AND o.cliente_id = $${params.length}`;
    }

    sql += ` ORDER BY o.sequencial DESC LIMIT $${params.length + 1}`;
    params.push(limite);

    const orcamentos = await query(sql, params);
    res.json(orcamentos);
  } catch (error) {
    console.error('Erro ao listar orçamentos:', error);
    res.status(500).json({ error: 'Erro ao listar orçamentos' });
  }
});

/**
 * GET /api/orcamentos/:id
 * Obtém um orçamento completo com itens e lotes
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar orçamento
    const orcamento = await queryOne(`
      SELECT o.*, c.nome as cliente_nome, c.codigo as cliente_codigo, c.pais as cliente_pais
      FROM orcamentos o
      LEFT JOIN clientes c ON o.cliente_id = c.id
      WHERE o.id = $1
    `, [id]);

    if (!orcamento) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }

    // Buscar itens
    const itens = await query(`
      SELECT i.*, m.nome as maquina_nome
      FROM itens_orcamento i
      LEFT JOIN maquinas m ON i.maquina_id = m.id
      WHERE i.orcamento_id = $1
      ORDER BY i.sequencial
    `, [id]);

    // Buscar operações de cada item
    for (const item of itens) {
      item.operacoes = await query(`
        SELECT * FROM operacoes
        WHERE item_id = $1
        ORDER BY sequencial
      `, [item.id]);
    }

    // Buscar lotes
    const lotes = await query(`
      SELECT * FROM lotes
      WHERE orcamento_id = $1
      ORDER BY quantidade
    `, [id]);

    res.json({
      ...orcamento,
      itens,
      lotes,
    });
  } catch (error) {
    console.error('Erro ao buscar orçamento:', error);
    res.status(500).json({ error: 'Erro ao buscar orçamento' });
  }
});

/**
 * POST /api/orcamentos
 * Cria um novo orçamento
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      cliente_id,
      descricao,
      observacoes,
    } = req.body;

    if (!cliente_id) {
      return res.status(400).json({ error: 'Cliente é obrigatório' });
    }

    const id = uuidv4();
    const ano = new Date().getFullYear();

    // Buscar próximo sequencial do ano
    const seqResult = await queryOne<{ max: number }>(
      'SELECT COALESCE(MAX(sequencial), 0) as max FROM orcamentos WHERE ano = $1',
      [ano]
    );
    const sequencial = (seqResult?.max || 0) + 1;
    const numero = `${String(sequencial).padStart(3, '0')}/${ano}`;

    // Calcular data de validade
    const dataValidade = new Date();
    dataValidade.setDate(dataValidade.getDate() + BUSINESS_RULES.VALIDADE_PROPOSTA_DIAS);

    const sql = `
      INSERT INTO orcamentos (id, numero, ano, sequencial, cliente_id, descricao, observacoes, data_validade, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const result = await query(sql, [
      id, numero, ano, sequencial, cliente_id, descricao, observacoes,
      dataValidade.toISOString().split('T')[0],
      ORCAMENTO_STATUS.RASCUNHO,
    ]);

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    res.status(500).json({ error: 'Erro ao criar orçamento' });
  }
});

/**
 * POST /api/orcamentos/:id/itens
 * Adiciona um item ao orçamento
 */
router.post('/:id/itens', async (req: Request, res: Response) => {
  try {
    const { id: orcamentoId } = req.params;
    const {
      codigo,
      descricao,
      material,
      material_fornecido_por = 'LASEC',
      custo_material_unitario = 0,
      maquina_id,
      tempo_ciclo_minutos,
      setup_horas,
      programa_cnc_numero,
    } = req.body;

    if (!codigo || !descricao || !tempo_ciclo_minutos || !setup_horas) {
      return res.status(400).json({
        error: 'Campos obrigatórios: codigo, descricao, tempo_ciclo_minutos, setup_horas',
      });
    }

    // Buscar próximo sequencial
    const seqResult = await queryOne<{ max: number }>(
      'SELECT COALESCE(MAX(sequencial), 0) as max FROM itens_orcamento WHERE orcamento_id = $1',
      [orcamentoId]
    );
    const sequencial = (seqResult?.max || 0) + 1;

    const itemId = uuidv4();

    const sql = `
      INSERT INTO itens_orcamento (
        id, orcamento_id, sequencial, codigo, descricao, material,
        material_fornecido_por, custo_material_unitario, maquina_id,
        tempo_ciclo_minutos, setup_horas, programa_cnc_numero
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const result = await query(sql, [
      itemId, orcamentoId, sequencial, codigo, descricao, material,
      material_fornecido_por, custo_material_unitario, maquina_id,
      tempo_ciclo_minutos, setup_horas, programa_cnc_numero,
    ]);

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    res.status(500).json({ error: 'Erro ao adicionar item' });
  }
});

/**
 * POST /api/orcamentos/:id/calcular-lotes
 * Calcula custos e preços para os lotes do orçamento
 */
router.post('/:id/calcular-lotes', async (req: Request, res: Response) => {
  try {
    const { id: orcamentoId } = req.params;
    const { quantidades = BUSINESS_RULES.LOTES_PADRAO } = req.body;

    // Buscar itens do orçamento
    const itens = await query(`
      SELECT i.*, m.hora_maquina
      FROM itens_orcamento i
      LEFT JOIN maquinas m ON i.maquina_id = m.id
      WHERE i.orcamento_id = $1
    `, [orcamentoId]);

    if (itens.length === 0) {
      return res.status(400).json({ error: 'Orçamento não possui itens' });
    }

    // Calcular tempo total e setup total
    const tempoTotal = itens.reduce((acc, item) => acc + Number(item.tempo_ciclo_minutos), 0);
    const setupTotal = itens.reduce((acc, item) => acc + Number(item.setup_horas), 0);
    const horaMaquinaMedia = itens.reduce((acc, item) =>
      acc + Number(item.hora_maquina || BUSINESS_RULES.HORA_MAQUINA_PADRAO), 0
    ) / itens.length;
    const custoMaterialTotal = itens.reduce((acc, item) =>
      acc + Number(item.custo_material_unitario || 0), 0
    );

    // Calcular lotes
    const resultado = calculoService.calcularLotes({
      tempoMinutos: tempoTotal,
      setupHoras: setupTotal,
      horaMaquina: horaMaquinaMedia,
      custoMaterialUnitario: custoMaterialTotal,
      quantidades,
    });

    // Salvar lotes no banco de dados
    await query('DELETE FROM lotes WHERE orcamento_id = $1', [orcamentoId]);

    for (const lote of resultado.lotes) {
      const loteId = uuidv4();
      await query(`
        INSERT INTO lotes (
          id, orcamento_id, quantidade, custo_setup, custo_mod, custo_cif,
          custo_material, custo_total, custo_unitario, preco_com_perdas,
          preco_com_markup, preco_nfe, preco_total_lote, margem_lucro_percentual,
          lucro_bruto, economia_vs_piloto, score_viabilidade, viabilidade,
          tempo_producao_horas, dias_uteis, lote_recomendado, lote_piloto
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      `, [
        loteId, orcamentoId, lote.quantidade, lote.custoSetup, lote.custoMOD,
        lote.custoCIF, lote.custoMaterial, lote.custoTotal, lote.custoUnitario,
        lote.precoComPerdas, lote.precoComMarkup, lote.precoNFe, lote.precoTotalLote,
        lote.margemPercentual, lote.lucroBruto, lote.economiaVsPiloto || 0,
        lote.scoreViabilidade, lote.viabilidade, lote.tempoProducaoHoras, lote.diasUteis,
        lote.quantidade === resultado.loteRecomendado,
        lote.quantidade === quantidades[0],
      ]);
    }

    // Atualizar totais do orçamento (baseado no lote recomendado)
    const loteRecomendado = resultado.lotes.find(l => l.quantidade === resultado.loteRecomendado);
    if (loteRecomendado) {
      await query(`
        UPDATE orcamentos SET
          custo_total = $2,
          preco_total = $3,
          margem_percentual = $4,
          updated_at = NOW()
        WHERE id = $1
      `, [
        orcamentoId,
        loteRecomendado.custoTotal,
        loteRecomendado.precoTotalLote,
        loteRecomendado.margemPercentual,
      ]);
    }

    res.json({
      orcamento_id: orcamentoId,
      ...resultado,
    });
  } catch (error) {
    console.error('Erro ao calcular lotes:', error);
    res.status(500).json({ error: 'Erro ao calcular lotes' });
  }
});

/**
 * PATCH /api/orcamentos/:id/status
 * Altera o status do orçamento
 */
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(ORCAMENTO_STATUS).includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const result = await query(
      'UPDATE orcamentos SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id, status]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erro ao alterar status:', error);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
});

export default router;
