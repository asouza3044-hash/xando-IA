import { Router } from 'express';
import clientesRoutes from './clientes.routes';
import orcamentosRoutes from './orcamentos.routes';
import maquinasRoutes from './maquinas.routes';
import calculosRoutes from './calculos.routes';

const router = Router();

// Rotas da API
router.use('/clientes', clientesRoutes);
router.use('/orcamentos', orcamentosRoutes);
router.use('/maquinas', maquinasRoutes);
router.use('/calculos', calculosRoutes);

// Informações da API
router.get('/', (req, res) => {
  res.json({
    name: 'LASEC Orcamentos API',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      orcamentos: '/api/orcamentos',
      maquinas: '/api/maquinas',
      calculos: '/api/calculos',
    },
    documentation: 'https://github.com/lasec/orcamentos-api',
  });
});

export default router;
