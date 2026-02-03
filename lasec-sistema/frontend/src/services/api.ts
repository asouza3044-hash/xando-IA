import axios from 'axios';
import type {
  Cliente,
  Maquina,
  Orcamento,
  ItemOrcamento,
  CalculoLotesRequest,
  CalculoLotesResponse,
  Lote,
} from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health Check
export const healthCheck = async () => {
  const { data } = await axios.get('http://localhost:3000/health');
  return data;
};

// Clientes
export const clientesApi = {
  listar: async (search?: string): Promise<Cliente[]> => {
    const { data } = await api.get('/clientes', { params: { search } });
    return data;
  },

  buscar: async (id: string): Promise<Cliente> => {
    const { data } = await api.get(`/clientes/${id}`);
    return data;
  },

  criar: async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
    const { data } = await api.post('/clientes', cliente);
    return data;
  },

  atualizar: async (id: string, cliente: Partial<Cliente>): Promise<Cliente> => {
    const { data } = await api.put(`/clientes/${id}`, cliente);
    return data;
  },

  deletar: async (id: string): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  },
};

// Máquinas
export const maquinasApi = {
  listar: async (): Promise<Maquina[]> => {
    const { data } = await api.get('/maquinas');
    return data;
  },
};

// Orçamentos
export const orcamentosApi = {
  listar: async (filtros?: {
    ano?: number;
    status?: string;
    clienteId?: string;
  }): Promise<Orcamento[]> => {
    const { data } = await api.get('/orcamentos', { params: filtros });
    return data;
  },

  buscar: async (id: string): Promise<Orcamento> => {
    const { data } = await api.get(`/orcamentos/${id}`);
    return data;
  },

  criar: async (orcamento: Omit<Orcamento, 'id' | 'numero' | 'ano'>): Promise<Orcamento> => {
    const { data } = await api.post('/orcamentos', orcamento);
    return data;
  },

  atualizar: async (id: string, orcamento: Partial<Orcamento>): Promise<Orcamento> => {
    const { data } = await api.put(`/orcamentos/${id}`, orcamento);
    return data;
  },

  deletar: async (id: string): Promise<void> => {
    await api.delete(`/orcamentos/${id}`);
  },

  adicionarItem: async (orcamentoId: string, item: Omit<ItemOrcamento, 'id' | 'orcamentoId'>): Promise<ItemOrcamento> => {
    const { data } = await api.post(`/orcamentos/${orcamentoId}/itens`, item);
    return data;
  },

  calcularLotes: async (orcamentoId: string, quantidades: number[]): Promise<CalculoLotesResponse> => {
    const { data } = await api.post(`/orcamentos/${orcamentoId}/calcular-lotes`, { quantidades });
    return data;
  },
};

// Cálculos
export const calculosApi = {
  simular: async (params: {
    quantidade: number;
    tempoMinutos: number;
    setupHoras: number;
    horaMaquina: number;
    custoMaterialUnitario?: number;
  }): Promise<Lote> => {
    const { data } = await api.post('/calculos/simular', params);
    return data;
  },

  calcularLotes: async (request: CalculoLotesRequest): Promise<CalculoLotesResponse> => {
    const { data } = await api.post('/calculos/lotes', request);
    return data;
  },

  calcularBreakEven: async (params: {
    tempoMinutos: number;
    setupHoras: number;
    horaMaquina: number;
    custoMaterialUnitario?: number;
  }): Promise<{
    quantidadeBreakEven: number;
    custoUnitarioBreakEven: number;
    precoNFeBreakEven: number;
  }> => {
    const { data } = await api.post('/calculos/break-even', params);
    return data;
  },
};

export default api;
