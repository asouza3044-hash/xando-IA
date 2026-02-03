import { Settings } from 'lucide-react';

export default function Configuracoes() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Configurar parâmetros do sistema</p>
      </div>

      <div className="card text-center py-12">
        <Settings className="mx-auto mb-4 text-gray-300" size={64} />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Em Desenvolvimento</h2>
        <p className="text-gray-600">Esta funcionalidade será implementada em breve</p>
      </div>
    </div>
  );
}
