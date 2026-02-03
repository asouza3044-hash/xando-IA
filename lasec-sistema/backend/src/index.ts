import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import routes from './routes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'LASEC Orcamentos API',
    version: '1.0.0',
  });
});

// Iniciar servidor
async function start() {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║       LASEC - Sistema de Orçamentos de Usinagem        ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');

  // Testar conexão com banco de dados
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.warn('⚠️  API iniciando sem conexão com banco de dados');
    console.warn('   Execute o script de migração para criar as tabelas');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API Base: http://localhost:${PORT}/api`);
    console.log('');
  });
}

start().catch(console.error);

export default app;
