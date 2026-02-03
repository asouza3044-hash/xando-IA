import { Router, Request, Response } from 'express';
import { MAQUINAS } from '../config/constants';

const router = Router();

/**
 * GET /api/maquinas
 * Lista todas as máquinas disponíveis
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const maquinas = Object.values(MAQUINAS).map(m => ({
      ...m,
      setupCusto: m.horaMaquina * m.setupPadrao,
    }));

    res.json(maquinas);
  } catch (error) {
    console.error('Erro ao listar máquinas:', error);
    res.status(500).json({ error: 'Erro ao listar máquinas' });
  }
});

/**
 * GET /api/maquinas/:codigo
 * Obtém uma máquina pelo código
 */
router.get('/:codigo', async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const maquina = MAQUINAS[codigo as keyof typeof MAQUINAS];

    if (!maquina) {
      return res.status(404).json({ error: 'Máquina não encontrada' });
    }

    res.json({
      ...maquina,
      setupCusto: maquina.horaMaquina * maquina.setupPadrao,
    });
  } catch (error) {
    console.error('Erro ao buscar máquina:', error);
    res.status(500).json({ error: 'Erro ao buscar máquina' });
  }
});

export default router;
