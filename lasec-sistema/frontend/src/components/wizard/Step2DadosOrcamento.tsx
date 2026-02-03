import { FileText } from 'lucide-react';

interface Step2Props {
  data: {
    descricao: string;
    dataValidade: string;
    observacoes: string;
  };
  onUpdate: (data: Partial<Step2Props['data']>) => void;
}

export default function Step2DadosOrcamento({ data, onUpdate }: Step2Props) {
  const hoje = new Date().toISOString().split('T')[0];
  const umMesDepois = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dados do Orçamento</h2>
        <p className="text-gray-600">Informe os detalhes do orçamento</p>
      </div>

      <div className="space-y-4">
        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição do Orçamento <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              className="input pl-10"
              placeholder="Ex: Suporte de Ferramenta - C"
              value={data.descricao}
              onChange={(e) => onUpdate({ descricao: e.target.value })}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Descreva brevemente o que será orçado
          </p>
        </div>

        {/* Data de Validade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data de Validade
          </label>
          <input
            type="date"
            className="input"
            value={data.dataValidade || umMesDepois}
            onChange={(e) => onUpdate({ dataValidade: e.target.value })}
            min={hoje}
          />
          <p className="text-xs text-gray-500 mt-1">
            Até quando este orçamento é válido (padrão: 30 dias)
          </p>
        </div>

        {/* Observações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observações
          </label>
          <textarea
            className="input"
            rows={4}
            placeholder="Informações adicionais, condições especiais, prazos..."
            value={data.observacoes}
            onChange={(e) => onUpdate({ observacoes: e.target.value })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Observações que aparecerão no documento do orçamento
          </p>
        </div>
      </div>

      {/* Preview Card */}
      {data.descricao && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600 font-medium mb-2">Prévia:</div>
          <div className="space-y-2">
            <div>
              <span className="font-bold text-gray-900">{data.descricao}</span>
            </div>
            {data.dataValidade && (
              <div className="text-sm text-gray-600">
                Válido até: {new Date(data.dataValidade).toLocaleDateString('pt-BR')}
              </div>
            )}
            {data.observacoes && (
              <div className="text-sm text-gray-600 italic">
                {data.observacoes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
