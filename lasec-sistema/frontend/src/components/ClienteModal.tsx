import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Cliente } from '@/types';

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: Omit<Cliente, 'id'>) => Promise<void>;
  cliente?: Cliente;
  title: string;
}

export default function ClienteModal({ isOpen, onClose, onSave, cliente, title }: ClienteModalProps) {
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    pais: 'Brasil',
    telefone: '',
    email: '',
    endereco: '',
    cnpj: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cliente) {
      setFormData({
        codigo: cliente.codigo,
        nome: cliente.nome,
        pais: cliente.pais,
        telefone: cliente.telefone || '',
        email: cliente.email || '',
        endereco: cliente.endereco || '',
        cnpj: cliente.cnpj || '',
      });
    } else {
      setFormData({
        codigo: '',
        nome: '',
        pais: 'Brasil',
        telefone: '',
        email: '',
        endereco: '',
        cnpj: '',
      });
    }
    setErrors({});
  }, [cliente, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'Código é obrigatório';
    }

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.pais.trim()) {
      newErrors.pais = 'País é obrigatório';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Código */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`input ${errors.codigo ? 'border-red-500' : ''}`}
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                placeholder="Ex: INOVA"
                maxLength={20}
              />
              {errors.codigo && <p className="text-red-500 text-xs mt-1">{errors.codigo}</p>}
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`input ${errors.pais ? 'border-red-500' : ''}`}
                value={formData.pais}
                onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                placeholder="Ex: Brasil"
              />
              {errors.pais && <p className="text-red-500 text-xs mt-1">{errors.pais}</p>}
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome / Razão Social <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`input ${errors.nome ? 'border-red-500' : ''}`}
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: INOVA PRODENTAL LTDA"
            />
            {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CNPJ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNPJ
              </label>
              <input
                type="text"
                className="input"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="text"
                className="input"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(11) 1234-5678"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className={`input ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contato@empresa.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço
            </label>
            <textarea
              className="input"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              placeholder="Rua, Número, Bairro, Cidade - Estado"
              rows={3}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
