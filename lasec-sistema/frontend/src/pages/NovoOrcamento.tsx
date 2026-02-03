import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import WizardSteps from '@/components/WizardSteps';
import Step1SelectCliente from '@/components/wizard/Step1SelectCliente';
import Step2DadosOrcamento from '@/components/wizard/Step2DadosOrcamento';
import Step3AdicionarItens from '@/components/wizard/Step3AdicionarItens';
import Step4ConfigurarLotes from '@/components/wizard/Step4ConfigurarLotes';
import Step5Revisar from '@/components/wizard/Step5Revisar';
import { orcamentosApi } from '@/services/api';
import type { Cliente, ItemOrcamento } from '@/types';

const STEPS = [
  { number: 1, title: 'Cliente', description: 'Selecione o cliente' },
  { number: 2, title: 'Dados', description: 'Informações do orçamento' },
  { number: 3, title: 'Itens', description: 'Adicione peças' },
  { number: 4, title: 'Lotes', description: 'Configure quantidades' },
  { number: 5, title: 'Revisar', description: 'Confirme e salve' },
];

export interface OrcamentoWizardData {
  cliente?: Cliente;
  descricao: string;
  dataValidade: string;
  observacoes: string;
  itens: Omit<ItemOrcamento, 'id' | 'orcamentoId'>[];
  quantidades: number[];
}

export default function NovoOrcamento() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [wizardData, setWizardData] = useState<OrcamentoWizardData>({
    descricao: '',
    dataValidade: '',
    observacoes: '',
    itens: [],
    quantidades: [15, 30, 50, 100, 200, 500],
  });

  const updateWizardData = (data: Partial<OrcamentoWizardData>) => {
    setWizardData((prev) => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!wizardData.cliente;
      case 2:
        return wizardData.descricao.trim().length > 0;
      case 3:
        return wizardData.itens.length > 0;
      case 4:
        return wizardData.quantidades.length > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    if (!wizardData.cliente) {
      alert('Selecione um cliente');
      return;
    }

    setSaving(true);
    try {
      // 1. Criar orçamento
      const orcamento = await orcamentosApi.criar({
        clienteId: wizardData.cliente.id!,
        descricao: wizardData.descricao,
        dataValidade: wizardData.dataValidade || undefined,
        observacoes: wizardData.observacoes || undefined,
        status: 'RASCUNHO',
      });

      // 2. Adicionar itens
      for (const item of wizardData.itens) {
        await orcamentosApi.adicionarItem(orcamento.id!, item);
      }

      // 3. Calcular lotes
      if (wizardData.quantidades.length > 0) {
        await orcamentosApi.calcularLotes(orcamento.id!, wizardData.quantidades);
      }

      alert('Orçamento criado com sucesso!');
      navigate('/orcamentos');
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
      alert('Erro ao salvar orçamento. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Orçamento</h1>
          <p className="text-gray-600 mt-1">Siga os passos para criar um orçamento completo</p>
        </div>

        <button
          onClick={() => navigate('/orcamentos')}
          className="btn btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Cancelar</span>
        </button>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <WizardSteps currentStep={currentStep} steps={STEPS} />
      </div>

      {/* Step Content */}
      <div className="card min-h-[400px]">
        {currentStep === 1 && (
          <Step1SelectCliente
            selectedCliente={wizardData.cliente}
            onSelectCliente={(cliente) => updateWizardData({ cliente })}
          />
        )}
        {currentStep === 2 && (
          <Step2DadosOrcamento
            data={{
              descricao: wizardData.descricao,
              dataValidade: wizardData.dataValidade,
              observacoes: wizardData.observacoes,
            }}
            onUpdate={(data) => updateWizardData(data)}
          />
        )}
        {currentStep === 3 && (
          <Step3AdicionarItens
            itens={wizardData.itens}
            onUpdateItens={(itens) => updateWizardData({ itens })}
          />
        )}
        {currentStep === 4 && (
          <Step4ConfigurarLotes
            quantidades={wizardData.quantidades}
            onUpdateQuantidades={(quantidades) => updateWizardData({ quantidades })}
          />
        )}
        {currentStep === 5 && <Step5Revisar data={wizardData} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="btn btn-secondary flex items-center space-x-2"
          disabled={currentStep === 1}
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        {currentStep < 5 ? (
          <button
            onClick={handleNext}
            className="btn btn-primary flex items-center space-x-2"
            disabled={!canProceed()}
          >
            <span>Próximo</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn btn-primary flex items-center space-x-2"
            disabled={saving || !canProceed()}
          >
            <Save size={20} />
            <span>{saving ? 'Salvando...' : 'Salvar Orçamento'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
