import { useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';
import { maquinasApi } from '@/services/api';
import type { Maquina } from '@/types';

export default function Maquinas() {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarMaquinas = async () => {
      try {
        const data = await maquinasApi.listar();
        setMaquinas(data);
      } catch (error) {
        console.error('Erro ao carregar máquinas:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarMaquinas();
  }, []);

  const formatMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Máquinas</h1>
        <p className="text-gray-600 mt-1">Máquinas CNC cadastradas no sistema</p>
      </div>

      {loading ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">Carregando...</p>
        </div>
      ) : maquinas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maquinas.map((maquina) => (
            <div key={maquina.codigo} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Wrench className="text-primary-600" size={24} />
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {maquina.codigo}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{maquina.nome}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora-Máquina:</span>
                  <span className="font-medium">{formatMoeda(maquina.horaMaquina)}/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Setup Padrão:</span>
                  <span className="font-medium">{maquina.setupPadrao}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Custo Setup:</span>
                  <span className="font-medium">{formatMoeda(maquina.setupCusto)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                {maquina.temEixoC && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    Eixo C
                  </span>
                )}
                {maquina.temFerramentaMotorizada && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    Ferr. Motorizada
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Wrench className="mx-auto mb-4 text-gray-300" size={64} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhuma Máquina Cadastrada</h2>
          <p className="text-gray-600">Execute a migração do banco de dados para carregar as máquinas padrão</p>
        </div>
      )}
    </div>
  );
}
