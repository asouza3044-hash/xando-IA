import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Search, Calendar, Filter, Eye, Edit2, Trash2 } from 'lucide-react';
import { orcamentosApi, clientesApi } from '@/services/api';
import type { Orcamento, Cliente } from '@/types';

const STATUS_COLORS = {
  RASCUNHO: 'bg-gray-100 text-gray-800',
  EM_ANALISE: 'bg-blue-100 text-blue-800',
  APROVADO: 'bg-green-100 text-green-800',
  REJEITADO: 'bg-red-100 text-red-800',
  CONCLUIDO: 'bg-purple-100 text-purple-800',
};

const STATUS_LABELS = {
  RASCUNHO: 'Rascunho',
  EM_ANALISE: 'Em Análise',
  APROVADO: 'Aprovado',
  REJEITADO: 'Rejeitado',
  CONCLUIDO: 'Concluído',
};

export default function Orcamentos() {
  const navigate = useNavigate();
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [clientes, setClientes] = useState<Record<string, Cliente>>({});
  const [filteredOrcamentos, setFilteredOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    ano: new Date().getFullYear().toString(),
    status: '',
    clienteId: '',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filters, orcamentos]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [orcamentosData, clientesData] = await Promise.all([
        orcamentosApi.listar(),
        clientesApi.listar(),
      ]);

      setOrcamentos(orcamentosData);

      // Criar mapa de clientes para lookup rápido
      const clientesMap: Record<string, Cliente> = {};
      clientesData.forEach((cliente) => {
        if (cliente.id) {
          clientesMap[cliente.id] = cliente;
        }
      });
      setClientes(clientesMap);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar orçamentos.');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let filtered = [...orcamentos];

    // Filtro de busca
    if (filters.search) {
      filtered = filtered.filter(
        (orc) =>
          orc.numero.toLowerCase().includes(filters.search.toLowerCase()) ||
          orc.descricao.toLowerCase().includes(filters.search.toLowerCase()) ||
          clientes[orc.clienteId]?.nome.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro de ano
    if (filters.ano) {
      filtered = filtered.filter((orc) => orc.ano.toString() === filters.ano);
    }

    // Filtro de status
    if (filters.status) {
      filtered = filtered.filter((orc) => orc.status === filters.status);
    }

    // Filtro de cliente
    if (filters.clienteId) {
      filtered = filtered.filter((orc) => orc.clienteId === filters.clienteId);
    }

    // Ordenar por número (mais recente primeiro)
    filtered.sort((a, b) => {
      const [numA] = a.numero.split('/');
      const [numB] = b.numero.split('/');
      return parseInt(numB) - parseInt(numA);
    });

    setFilteredOrcamentos(filtered);
  };

  const handleExcluir = async (orcamento: Orcamento) => {
    if (!confirm(`Tem certeza que deseja excluir o orçamento ${orcamento.numero}?`)) {
      return;
    }

    try {
      await orcamentosApi.deletar(orcamento.id!);
      await carregarDados();
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      alert('Erro ao excluir orçamento.');
    }
  };

  const formatMoeda = (valor?: number) => {
    if (!valor) return 'R$ 0,00';
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatData = (data?: string) => {
    if (!data) return '—';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  // Anos únicos dos orçamentos
  const anosDisponiveis = Array.from(
    new Set(orcamentos.map((o) => o.ano))
  ).sort((a, b) => b - a);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orçamentos</h1>
          <p className="text-gray-600 mt-1">
            {filteredOrcamentos.length} {filteredOrcamentos.length === 1 ? 'orçamento' : 'orçamentos'}
            {filters.ano && ` em ${filters.ano}`}
          </p>
        </div>

        <button
          onClick={() => navigate('/orcamentos/novo')}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Novo Orçamento</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                className="input pl-10"
                placeholder="Buscar por número, descrição ou cliente..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          {/* Ano */}
          <div>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                className="input pl-10"
                value={filters.ano}
                onChange={(e) => setFilters({ ...filters, ano: e.target.value })}
              >
                <option value="">Todos os anos</option>
                {anosDisponiveis.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                className="input pl-10"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">Todos os status</option>
                <option value="RASCUNHO">Rascunho</option>
                <option value="EM_ANALISE">Em Análise</option>
                <option value="APROVADO">Aprovado</option>
                <option value="REJEITADO">Rejeitado</option>
                <option value="CONCLUIDO">Concluído</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">Carregando orçamentos...</p>
        </div>
      ) : filteredOrcamentos.length > 0 ? (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrcamentos.map((orcamento) => (
                  <tr key={orcamento.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                          <FileText className="text-primary-600" size={20} />
                        </div>
                        <span className="font-medium text-gray-900">{orcamento.numero}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {clientes[orcamento.clienteId]?.nome || 'Cliente não encontrado'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {clientes[orcamento.clienteId]?.codigo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{orcamento.descricao}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          STATUS_COLORS[orcamento.status]
                        }`}
                      >
                        {STATUS_LABELS[orcamento.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatMoeda(orcamento.valorTotal)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {formatData(orcamento.dataEmissao)}
                      </div>
                      {orcamento.dataValidade && (
                        <div className="text-xs text-gray-500">
                          Válido até: {formatData(orcamento.dataValidade)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => alert(`Visualizar orçamento ${orcamento.numero}`)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                        title="Visualizar"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => alert(`Editar orçamento ${orcamento.numero}`)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleExcluir(orcamento)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <FileText className="mx-auto mb-4 text-gray-300" size={64} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {filters.search || filters.status
              ? 'Nenhum orçamento encontrado'
              : 'Nenhum Orçamento Cadastrado'}
          </h2>
          <p className="text-gray-600 mb-6">
            {filters.search || filters.status
              ? 'Tente ajustar os filtros'
              : 'Comece criando seu primeiro orçamento'}
          </p>
          {!filters.search && !filters.status && (
            <button
              onClick={() => navigate('/orcamentos/novo')}
              className="btn btn-primary inline-flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Criar Primeiro Orçamento</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
