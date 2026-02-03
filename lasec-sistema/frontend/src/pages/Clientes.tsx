import { useEffect, useState } from 'react';
import { Users, Plus, Search, Edit2, Trash2, Globe, Phone, Mail } from 'lucide-react';
import { clientesApi } from '@/services/api';
import ClienteModal from '@/components/ClienteModal';
import type { Cliente } from '@/types';

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteEdit, setClienteEdit] = useState<Cliente | undefined>(undefined);

  useEffect(() => {
    carregarClientes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clientes.filter(
        (cliente) =>
          cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.pais.toLowerCase().includes(searchTerm.toLowerCase())
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
      alert('Erro ao carregar clientes. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleNovo = () => {
    setClienteEdit(undefined);
    setIsModalOpen(true);
  };

  const handleEditar = (cliente: Cliente) => {
    setClienteEdit(cliente);
    setIsModalOpen(true);
  };

  const handleSalvar = async (clienteData: Omit<Cliente, 'id'>) => {
    if (clienteEdit?.id) {
      // Atualizar
      await clientesApi.atualizar(clienteEdit.id, clienteData);
    } else {
      // Criar
      await clientesApi.criar(clienteData);
    }
    await carregarClientes();
  };

  const handleExcluir = async (cliente: Cliente) => {
    if (!confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"?`)) {
      return;
    }

    try {
      await clientesApi.deletar(cliente.id!);
      await carregarClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">
            {filteredClientes.length} {filteredClientes.length === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}
          </p>
        </div>

        <button onClick={handleNovo} className="btn btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            className="input pl-10"
            placeholder="Buscar por nome, código ou país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">Carregando clientes...</p>
        </div>
      ) : filteredClientes.length > 0 ? (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome / Razão Social
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    País
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                          <Users className="text-primary-600" size={20} />
                        </div>
                        <span className="font-medium text-gray-900">{cliente.codigo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                      {cliente.cnpj && (
                        <div className="text-xs text-gray-500">CNPJ: {cliente.cnpj}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Globe size={16} className="mr-2 text-gray-400" />
                        {cliente.pais}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {cliente.telefone && (
                          <div className="flex items-center text-xs text-gray-600">
                            <Phone size={14} className="mr-2 text-gray-400" />
                            {cliente.telefone}
                          </div>
                        )}
                        {cliente.email && (
                          <div className="flex items-center text-xs text-gray-600">
                            <Mail size={14} className="mr-2 text-gray-400" />
                            {cliente.email}
                          </div>
                        )}
                        {!cliente.telefone && !cliente.email && (
                          <span className="text-xs text-gray-400">Sem contato</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditar(cliente)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleExcluir(cliente)}
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
          <Users className="mx-auto mb-4 text-gray-300" size={64} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum Cliente Cadastrado'}
          </h2>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? 'Tente buscar por outro termo'
              : 'Comece adicionando seu primeiro cliente'}
          </p>
          {!searchTerm && (
            <button onClick={handleNovo} className="btn btn-primary inline-flex items-center space-x-2">
              <Plus size={20} />
              <span>Adicionar Primeiro Cliente</span>
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvar}
        cliente={clienteEdit}
        title={clienteEdit ? 'Editar Cliente' : 'Novo Cliente'}
      />
    </div>
  );
}
