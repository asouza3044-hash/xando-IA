import { Router, Request, Response } from 'express';
import { query, queryOne } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

/**
 * GET /api/clientes
 * Lista todos os clientes
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { ativo = 'true', busca } = req.query;

    let sql = 'SELECT * FROM clientes WHERE 1=1';
    const params: any[] = [];

    if (ativo !== 'todos') {
      params.push(ativo === 'true');
      sql += ` AND ativo = $${params.length}`;
    }

    if (busca) {
      params.push(`%${busca}%`);
      sql += ` AND (nome ILIKE $${params.length} OR codigo ILIKE $${params.length})`;
    }

    sql += ' ORDER BY nome ASC';

    const clientes = await query(sql, params);
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

/**
 * GET /api/clientes/:id
 * Obtém um cliente pelo ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await queryOne('SELECT * FROM clientes WHERE id = $1', [id]);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

/**
 * POST /api/clientes
 * Cria um novo cliente
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      codigo,
      nome,
      nome_fantasia,
      pais = 'Brasil',
      cnpj,
      telefone,
      email,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      observacoes,
    } = req.body;

    if (!codigo || !nome) {
      return res.status(400).json({ error: 'Código e nome são obrigatórios' });
    }

    const id = uuidv4();

    const sql = `
      INSERT INTO clientes (id, codigo, nome, nome_fantasia, pais, cnpj, telefone, email,
                            logradouro, numero, bairro, cidade, estado, cep, observacoes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;

    const result = await query(sql, [
      id, codigo, nome, nome_fantasia, pais, cnpj, telefone, email,
      logradouro, numero, bairro, cidade, estado, cep, observacoes,
    ]);

    res.status(201).json(result[0]);
  } catch (error: any) {
    console.error('Erro ao criar cliente:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Código de cliente já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

/**
 * PUT /api/clientes/:id
 * Atualiza um cliente
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      codigo,
      nome,
      nome_fantasia,
      pais,
      cnpj,
      telefone,
      email,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      observacoes,
      ativo,
    } = req.body;

    const sql = `
      UPDATE clientes SET
        codigo = COALESCE($2, codigo),
        nome = COALESCE($3, nome),
        nome_fantasia = COALESCE($4, nome_fantasia),
        pais = COALESCE($5, pais),
        cnpj = COALESCE($6, cnpj),
        telefone = COALESCE($7, telefone),
        email = COALESCE($8, email),
        logradouro = COALESCE($9, logradouro),
        numero = COALESCE($10, numero),
        bairro = COALESCE($11, bairro),
        cidade = COALESCE($12, cidade),
        estado = COALESCE($13, estado),
        cep = COALESCE($14, cep),
        observacoes = COALESCE($15, observacoes),
        ativo = COALESCE($16, ativo),
        updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const result = await query(sql, [
      id, codigo, nome, nome_fantasia, pais, cnpj, telefone, email,
      logradouro, numero, bairro, cidade, estado, cep, observacoes, ativo,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

/**
 * DELETE /api/clientes/:id
 * Desativa um cliente (soft delete)
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      'UPDATE clientes SET ativo = false, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json({ message: 'Cliente desativado com sucesso' });
  } catch (error) {
    console.error('Erro ao desativar cliente:', error);
    res.status(500).json({ error: 'Erro ao desativar cliente' });
  }
});

export default router;
