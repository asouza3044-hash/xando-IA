import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { healthCheck } from '@/services/api';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} className={trendUp ? '' : 'rotate-180'} />
              <span className="ml-1">{trend}</span>
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon className="text-primary-600" size={24} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    const checkApi = async () => {
      try {
        await healthCheck();
        setApiStatus('online');
      } catch {
        setApiStatus('offline');
      }
    };

    checkApi();
    const interval = setInterval(checkApi, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do sistema de orçamentos</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* API Status Indicator */}
          <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
            <div className={`w-2 h-2 rounded-full ${
              apiStatus === 'online' ? 'bg-green-500' :
              apiStatus === 'offline' ? 'bg-red-500' :
              'bg-yellow-500 animate-pulse'
            }`} />
            <span className="text-sm text-gray-600">
              API: {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : 'Verificando...'}
            </span>
          </div>

          <Link to="/orcamentos/novo" className="btn btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Novo Orçamento</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Orçamentos"
          value="0"
          icon={FileText}
          trend="+0% este mês"
          trendUp={true}
        />
        <StatCard
          title="Orçamentos Aprovados"
          value="0"
          icon={CheckCircle}
          trend="+0% este mês"
          trendUp={true}
        />
        <StatCard
          title="Valor Total"
          value="R$ 0,00"
          icon={DollarSign}
        />
        <StatCard
          title="Ticket Médio"
          value="R$ 0,00"
          icon={TrendingUp}
        />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/orcamentos/novo"
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <FileText className="mx-auto text-gray-400 mb-2" size={32} />
            <h3 className="font-medium text-gray-900">Criar Orçamento</h3>
            <p className="text-sm text-gray-600 mt-1">Novo orçamento de usinagem</p>
          </Link>

          <Link
            to="/clientes/novo"
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <Plus className="mx-auto text-gray-400 mb-2" size={32} />
            <h3 className="font-medium text-gray-900">Adicionar Cliente</h3>
            <p className="text-sm text-gray-600 mt-1">Cadastrar novo cliente</p>
          </Link>

          <Link
            to="/calculadora"
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
          >
            <TrendingUp className="mx-auto text-gray-400 mb-2" size={32} />
            <h3 className="font-medium text-gray-900">Calculadora</h3>
            <p className="text-sm text-gray-600 mt-1">Simular custos e preços</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h2>
        <div className="text-center py-12 text-gray-500">
          <FileText className="mx-auto mb-4 text-gray-300" size={48} />
          <p>Nenhuma atividade recente</p>
          <p className="text-sm mt-2">Crie seu primeiro orçamento para começar</p>
        </div>
      </div>
    </div>
  );
}
