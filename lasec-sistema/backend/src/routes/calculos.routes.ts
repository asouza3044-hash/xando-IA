import { Router, Request, Response } from 'express';
import { CalculoCustoService } from '../services/CalculoCustoService';

const router = Router();
const calculoService = new CalculoCustoService();

/**
 * POST /api/calculos/lotes
 * Calcula custos e preços para múltiplos lotes
 */
router.post('/lotes', async (req: Request, res: Response) => {
  try {
    const {
      tempoMinutos,
      setupHoras,
      horaMaquina,
      custoMaterialUnitario = 0,
      quantidades = [15, 30, 50, 100, 200, 500],
    } = req.body;

    if (!tempoMinutos || !setupHoras || !horaMaquina) {
      return res.status(400).json({
        error: 'Parâmetros obrigatórios: tempoMinutos, setupHoras, horaMaquina',
      });
    }

    const resultado = calculoService.calcularLotes({
      tempoMinutos,
      setupHoras,
      horaMaquina,
      custoMaterialUnitario,
      quantidades,
    });

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao calcular lotes:', error);
    res.status(500).json({ error: 'Erro ao calcular lotes' });
  }
});

/**
 * POST /api/calculos/break-even
 * Calcula ponto de equilíbrio
 */
router.post('/break-even', async (req: Request, res: Response) => {
  try {
    const {
      custoFixo,
      custoVariavelUnitario,
      precoVendaUnitario,
    } = req.body;

    if (!custoFixo || !custoVariavelUnitario || !precoVendaUnitario) {
      return res.status(400).json({
        error: 'Parâmetros obrigatórios: custoFixo, custoVariavelUnitario, precoVendaUnitario',
      });
    }

    const resultado = calculoService.calcularBreakEven(
      custoFixo,
      custoVariavelUnitario,
      precoVendaUnitario
    );

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao calcular break-even:', error);
    res.status(500).json({ error: 'Erro ao calcular break-even' });
  }
});

/**
 * POST /api/calculos/simular
 * Simula cálculo rápido para uma quantidade
 */
router.post('/simular', async (req: Request, res: Response) => {
  try {
    const {
      quantidade,
      tempoMinutos,
      setupHoras,
      horaMaquina,
      custoMaterialUnitario = 0,
    } = req.body;

    if (!quantidade || !tempoMinutos || !setupHoras || !horaMaquina) {
      return res.status(400).json({
        error: 'Parâmetros obrigatórios: quantidade, tempoMinutos, setupHoras, horaMaquina',
      });
    }

    const resultado = calculoService.calcularLote({
      quantidade,
      tempoMinutos,
      setupHoras,
      horaMaquina,
      custoMaterialUnitario,
    });

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao simular cálculo:', error);
    res.status(500).json({ error: 'Erro ao simular cálculo' });
  }
});

/**
 * GET /api/calculos/parametros
 * Retorna os parâmetros de cálculo atuais
 */
router.get('/parametros', async (req: Request, res: Response) => {
  try {
    const parametros = calculoService.getParametros();
    res.json(parametros);
  } catch (error) {
    console.error('Erro ao obter parâmetros:', error);
    res.status(500).json({ error: 'Erro ao obter parâmetros' });
  }
});

export default router;
