import { useState } from 'react';
import { Plus, X, Package } from 'lucide-react';

interface Step4Props {
  quantidades: number[];
  onUpdateQuantidades: (quantidades: number[]) => void;
}

const LOTES_SUGERIDOS = [15, 30, 50, 100, 200, 500, 1000];

export default function Step4ConfigurarLotes({ quantidades, onUpdateQuantidades }: Step4Props) {
  const [novaQuantidade, setNovaQuantidade] = useState('');

  const handleAddQuantidade = () => {
    const qtd = Number(novaQuantidade);
    if (qtd > 0 && !quantidades.includes(qtd)) {
      const novasQuantidades = [...quantidades, qtd].sort((a, b) => a - b);
      onUpdateQuantidades(novasQuantidades);
      setNovaQuantidade('');
    }
  };

  const handleRemoveQuantidade = (qtd: number) => {
    onUpdateQuantidades(quantidades.filter((q) => q !== qtd));
  };

  const handleToggleSugerida = (qtd: number) => {
    if (quantidades.includes(qtd)) {
      handleRemoveQuantidade(qtd);
    } else {
      const novasQuantidades = [...quantidades, qtd].sort((a, b) => a - b);
      onUpdateQuantidades(novasQuantidades);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configurar Lotes</h2>
        <p className="text-gray-600">
          Selecione as quantidades para análise de custo e viabilidade
        </p>
      </div>

      {/* Quantidades Sugeridas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quantidades Sugeridas
        </label>
        <div className="flex flex-wrap gap-2">
          {LOTES_SUGERIDOS.map((qtd) => (
            <button
              key={qtd}
              onClick={() => handleToggleSugerida(qtd)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                quantidades.includes(qtd)
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400'
              }`}
            >
              {qtd} un
            </button>
          ))}
        </div>
      </div>

      {/* Adicionar Quantidade Personalizada */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Adicionar Quantidade Personalizada
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="input flex-1"
            placeholder="Digite uma quantidade..."
            value={novaQuantidade}
            onChange={(e) => setNovaQuantidade(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddQuantidade();
              }
            }}
            min="1"
          />
          <button
            onClick={handleAddQuantidade}
            className="btn btn-primary flex items-center space-x-2"
            disabled={!novaQuantidade || Number(novaQuantidade) <= 0}
          >
            <Plus size={20} />
            <span>Adicionar</span>
          </button>
        </div>
      </div>

      {/* Quantidades Selecionadas */}
      {quantidades.length > 0 ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quantidades Selecionadas ({quantidades.length})
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {quantidades.map((qtd) => (
                <div
                  key={qtd}
                  className="flex items-center space-x-2 bg-white border border-primary-300 rounded-lg px-3 py-2"
                >
                  <Package className="text-primary-600" size={16} />
                  <span className="font-medium text-gray-900">{qtd} unidades</span>
                  <button
                    onClick={() => handleRemoveQuantidade(qtd)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 mt-0.5">ℹ️</div>
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Análise de Lotes</p>
                <p className="text-blue-700">
                  O sistema calculará custos, preços e viabilidade para cada quantidade
                  selecionada. Quanto mais lotes, melhor a análise comparativa.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Package className="mx-auto mb-4 text-gray-300" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Nenhuma quantidade selecionada
          </h3>
          <p className="text-gray-600">
            Selecione pelo menos uma quantidade para análise
          </p>
        </div>
      )}
    </div>
  );
}
