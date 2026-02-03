import { useEffect, useState } from 'react';
import { Users, Plus, Search, Check } from 'lucide-react';
import { clientesApi } from '@/services/api';
import ClienteModal from '@/components/ClienteModal';
import type { Cliente } from '@/types';

interface Step1Props {
  selectedCliente?: Cliente;
  onSelectCliente: (cliente: Cliente) => void;
}

export default function Step1SelectCliente({ selectedCliente, onSelectCliente }: Step1Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    carregarClientes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clientes.filter(
        (cliente) =>
          cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.codigo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClientes(filtered);
    } else {
      setFilteredClientes(clientes);
    }
  }, [searchTerm, clientes]);

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const data = await clientesApi.listar();
      setClientes(data);
      setFilteredClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovoCliente = async (clienteData: Omit<Cliente, 'id'>) => {
    const novoCliente = await clientesApi.criar(clienteData);
    await carregarClientes();
    onSelectCliente(novoCliente);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecione o Cliente</h2>
        <p className="text-gray-600">Escolha o cliente para este orçamento ou adicione um novo</p>
      </div>

      {/* Search and Add */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            className="input pl-10"
            placeholder="Buscar cliente por nome ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-secondary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Clientes Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Carregando clientes...</p>
        </div>
      ) : filteredClientes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredClientes.map((cliente) => (
            <button
              key={cliente.id}
              onClick={() => onSelectCliente(cliente)}
              className={`p-4 border-2 rounded-lg text-left transition-all hover:border-primary-500 hover:bg-primary-50 ${
                selectedCliente?.id === cliente.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{cliente.nome}</div>
                    <div className="text-sm text-gray-600">Código: {cliente.codigo}</div>
                    <div className="text-sm text-gray-500">{cliente.pais}</div>
                  </div>
                </div>
                {selectedCliente?.id === cliente.id && (
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <Check className="text-white" size={16} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto mb-4 text-gray-300" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? 'Tente buscar por outro termo'
              : 'Adicione um cliente para começar'}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Adicionar Cliente</span>
          </button>
        </div>
      )}

      {/* Selected Cliente Badge */}
      {selectedCliente && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-primary-700 font-medium">Cliente Selecionado:</div>
              <div className="text-lg font-bold text-primary-900">{selectedCliente.nome}</div>
            </div>
            <Check className="text-primary-600" size={32} />
          </div>
        </div>
      )}

      {/* Modal */}
      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleNovoCliente}
        title="Novo Cliente"
      />
    </div>
  );
}
