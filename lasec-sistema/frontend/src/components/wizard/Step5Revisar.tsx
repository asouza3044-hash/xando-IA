import { Check, Users, FileText, Wrench, Package } from 'lucide-react';
import type { OrcamentoWizardData } from '@/pages/NovoOrcamento';

interface Step5Props {
  data: OrcamentoWizardData;
}

export default function Step5Revisar({ data }: Step5Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Revisar Orçamento</h2>
        <p className="text-gray-600">Confira todos os dados antes de salvar</p>
      </div>

      {/* Cliente */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Users className="text-primary-600" size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Cliente</h3>
        </div>

        {data.cliente ? (
          <div className="space-y-2 pl-13">
            <div className="font-medium text-gray-900">{data.cliente.nome}</div>
            <div className="text-sm text-gray-600">Código: {data.cliente.codigo}</div>
            <div className="text-sm text-gray-600">País: {data.cliente.pais}</div>
            {data.cliente.email && (
              <div className="text-sm text-gray-600">Email: {data.cliente.email}</div>
            )}
          </div>
        ) : (
          <div className="text-red-600 pl-13">⚠️ Nenhum cliente selecionado</div>
        )}
      </div>

      {/* Dados do Orçamento */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <FileText className="text-primary-600" size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Informações do Orçamento</h3>
        </div>

        <div className="space-y-2 pl-13">
          <div>
            <span className="text-sm text-gray-600">Descrição: </span>
            <span className="font-medium text-gray-900">{data.descricao || '—'}</span>
          </div>
          {data.dataValidade && (
            <div>
              <span className="text-sm text-gray-600">Válido até: </span>
              <span className="font-medium text-gray-900">
                {new Date(data.dataValidade).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}
          {data.observacoes && (
            <div>
              <span className="text-sm text-gray-600">Observações: </span>
              <span className="text-gray-700">{data.observacoes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Itens */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Wrench className="text-primary-600" size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Itens ({data.itens.length})
          </h3>
        </div>

        {data.itens.length > 0 ? (
          <div className="space-y-3 pl-13">
            {data.itens.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="font-medium text-gray-900">{item.descricao}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Código: {item.codigo} | Material: {item.material} |
                  Tempo: {item.tempoCicloMinutos} min | Setup: {item.setupHoras}h |
                  Máquina: {item.maquinaCodigo}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-red-600 pl-13">⚠️ Nenhum item adicionado</div>
        )}
      </div>

      {/* Lotes */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Package className="text-primary-600" size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Lotes ({data.quantidades.length})
          </h3>
        </div>

        {data.quantidades.length > 0 ? (
          <div className="pl-13">
            <div className="flex flex-wrap gap-2">
              {data.quantidades.map((qtd) => (
                <div
                  key={qtd}
                  className="px-4 py-2 bg-primary-50 border border-primary-200 rounded-lg text-primary-700 font-medium"
                >
                  {qtd} un
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-red-600 pl-13">⚠️ Nenhuma quantidade selecionada</div>
        )}
      </div>

      {/* Ready to Save */}
      {data.cliente && data.descricao && data.itens.length > 0 && data.quantidades.length > 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Check className="text-green-600" size={24} />
            <div>
              <div className="font-bold text-green-900">Pronto para salvar!</div>
              <div className="text-sm text-green-700">
                Todos os dados foram preenchidos corretamente.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600 mt-0.5">⚠️</div>
            <div>
              <div className="font-bold text-yellow-900">Atenção!</div>
              <div className="text-sm text-yellow-700">
                Preencha todos os campos obrigatórios antes de salvar.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
