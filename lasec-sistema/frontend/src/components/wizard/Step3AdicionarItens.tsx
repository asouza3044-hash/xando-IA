import { useState } from 'react';
import { Plus, Trash2, Wrench } from 'lucide-react';
import type { ItemOrcamento } from '@/types';

interface Step3Props {
  itens: Omit<ItemOrcamento, 'id' | 'orcamentoId'>[];
  onUpdateItens: (itens: Omit<ItemOrcamento, 'id' | 'orcamentoId'>[]) => void;
}

export default function Step3AdicionarItens({ itens, onUpdateItens }: Step3Props) {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    material: 'Alumínio',
    materialFornecidoPor: 'CLIENTE' as 'CLIENTE' | 'LASEC',
    tempoCicloMinutos: 15,
    setupHoras: 1.5,
    programaCncNumero: '',
    maquinaCodigo: 'LYNX220',
    observacoes: '',
  });

  const resetForm = () => {
    setFormData({
      codigo: '',
      descricao: '',
      material: 'Alumínio',
      materialFornecidoPor: 'CLIENTE',
      tempoCicloMinutos: 15,
      setupHoras: 1.5,
      programaCncNumero: '',
      maquinaCodigo: 'LYNX220',
      observacoes: '',
    });
    setEditIndex(null);
  };

  const handleAddOrUpdate = () => {
    if (!formData.codigo || !formData.descricao) {
      alert('Preencha código e descrição');
      return;
    }

    const newItem = { ...formData };

    if (editIndex !== null) {
      const updated = [...itens];
      updated[editIndex] = newItem;
      onUpdateItens(updated);
    } else {
      onUpdateItens([...itens, newItem]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    setFormData(itens[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Remover este item?')) {
      onUpdateItens(itens.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Adicionar Itens</h2>
          <p className="text-gray-600">Adicione as peças que serão usinadas</p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Adicionar Item</span>
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-gray-900">
            {editIndex !== null ? 'Editar Item' : 'Novo Item'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input"
                placeholder="Ex: 00004-01"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Máquina
              </label>
              <select
                className="input"
                value={formData.maquinaCodigo}
                onChange={(e) => setFormData({ ...formData, maquinaCodigo: e.target.value })}
              >
                <option value="LYNX220">Doosan LYNX 220 LM (R$ 105/h)</option>
                <option value="GL280">Romi GL280 (R$ 83.08/h)</option>
                <option value="GL240">Romi GL240 (R$ 75/h)</option>
                <option value="DISCO760">Discovery 760 (R$ 104.76/h)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="Ex: Anel Suporte - C"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <input
                type="text"
                className="input"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fornecido por
              </label>
              <select
                className="input"
                value={formData.materialFornecidoPor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    materialFornecidoPor: e.target.value as 'CLIENTE' | 'LASEC',
                  })
                }
              >
                <option value="CLIENTE">Cliente</option>
                <option value="LASEC">LASEC</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo Ciclo (min)
              </label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.tempoCicloMinutos}
                onChange={(e) =>
                  setFormData({ ...formData, tempoCicloMinutos: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Setup (horas)
              </label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.setupHoras}
                onChange={(e) =>
                  setFormData({ ...formData, setupHoras: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programa CNC
              </label>
              <input
                type="text"
                className="input"
                placeholder="Ex: O4006"
                value={formData.programaCncNumero}
                onChange={(e) =>
                  setFormData({ ...formData, programaCncNumero: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-300">
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button onClick={handleAddOrUpdate} className="btn btn-primary">
              {editIndex !== null ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Items List */}
      {itens.length > 0 ? (
        <div className="space-y-3">
          {itens.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="text-primary-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{item.descricao}</div>
                    <div className="text-sm text-gray-600">Código: {item.codigo}</div>
                    <div className="text-xs text-gray-500 mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div>Material: {item.material}</div>
                      <div>Tempo: {item.tempoCicloMinutos} min</div>
                      <div>Setup: {item.setupHoras} h</div>
                      <div>Máquina: {item.maquinaCodigo}</div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Wrench className="mx-auto mb-4 text-gray-300" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum item adicionado</h3>
          <p className="text-gray-600 mb-4">Adicione os itens que serão usinados</p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary inline-flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Adicionar Primeiro Item</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
