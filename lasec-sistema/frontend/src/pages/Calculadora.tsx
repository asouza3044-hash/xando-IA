import { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { calculosApi } from '@/services/api';
import type { Lote } from '@/types';

export default function Calculadora() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<Lote | null>(null);

  const [formData, setFormData] = useState({
    quantidade: 100,
    tempoMinutos: 45,
    setupHoras: 3.0,
    horaMaquina: 105.0,
    custoMaterialUnitario: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await calculosApi.simular(formData);
      setResultado(result);
    } catch (error) {
      console.error('Erro ao calcular:', error);
      alert('Erro ao calcular. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const formatMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Calculadora de Custos</h1>
        <p className="text-gray-600 mt-1">Simule custos e preços de usinagem</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <CalcIcon className="mr-2" size={24} />
            Parâmetros de Entrada
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade (unidades)
              </label>
              <input
                type="number"
                className="input"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo de Ciclo (minutos)
              </label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={formData.tempoMinutos}
                onChange={(e) => setFormData({ ...formData, tempoMinutos: Number(e.target.value) })}
                min="0.1"
                required
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
                onChange={(e) => setFormData({ ...formData, setupHoras: Number(e.target.value) })}
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora-Máquina (R$/h)
              </label>
              <input
                type="number"
                step="0.01"
                className="input"
                value={formData.horaMaquina}
                onChange={(e) => setFormData({ ...formData, horaMaquina: Number(e.target.value) })}
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custo Material Unitário (R$) - Opcional
              </label>
              <input
                type="number"
                step="0.01"
                className="input"
                value={formData.custoMaterialUnitario}
                onChange={(e) => setFormData({ ...formData, custoMaterialUnitario: Number(e.target.value) })}
                min="0"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Calculando...' : 'Calcular'}
            </button>
          </form>
        </div>

        {/* Resultado */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resultado</h2>

          {resultado ? (
            <div className="space-y-4">
              {/* Custos */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-3">Custos</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup:</span>
                    <span className="font-medium">{formatMoeda(resultado.custoSetup)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MOD:</span>
                    <span className="font-medium">{formatMoeda(resultado.custoMOD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CIF (58%):</span>
                    <span className="font-medium">{formatMoeda(resultado.custoCIF)}</span>
                  </div>
                  {resultado.custoMaterial > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium">{formatMoeda(resultado.custoMaterial)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Custo Total:</span>
                    <span className="font-bold text-lg">{formatMoeda(resultado.custoTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Preços */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-3">Preços</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Custo Unitário:</span>
                    <span className="font-medium">{formatMoeda(resultado.custoUnitario)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Com Perdas (2%):</span>
                    <span className="font-medium">{formatMoeda(resultado.precoComPerdas)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Com Markup (35%):</span>
                    <span className="font-medium">{formatMoeda(resultado.precoComMarkup)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Preço NFe:</span>
                    <span className="font-bold text-lg text-primary-600">{formatMoeda(resultado.precoNFe)}</span>
                  </div>
                </div>
              </div>

              {/* Análise */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Análise</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Margem:</span>
                    <span className="font-medium">{resultado.margemPercentual.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lucro Bruto:</span>
                    <span className="font-medium text-green-600">{formatMoeda(resultado.lucroBruto)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tempo Produção:</span>
                    <span className="font-medium">{resultado.tempoProducaoHoras}h ({resultado.diasUteis.toFixed(1)} dias úteis)</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Viabilidade:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      resultado.viabilidade === 'EXCELENTE' ? 'bg-green-100 text-green-800' :
                      resultado.viabilidade === 'MUITO_BOM' ? 'bg-blue-100 text-blue-800' :
                      resultado.viabilidade === 'BOM' ? 'bg-cyan-100 text-cyan-800' :
                      resultado.viabilidade === 'REGULAR' ? 'bg-yellow-100 text-yellow-800' :
                      resultado.viabilidade === 'RUIM' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {resultado.viabilidade} ({resultado.scoreViabilidade}/10)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <CalcIcon className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Preencha os parâmetros e clique em Calcular</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
