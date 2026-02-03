// Types baseados no backend

export interface Maquina {
  id?: string;
  codigo: string;
  nome: string;
  horaMaquina: number;
  setupPadrao: number;
  temEixoC: boolean;
  temFerramentaMotorizada: boolean;
  setupCusto: number;
}

export interface Cliente {
  id?: string;
  codigo: string;
  nome: string;
  pais: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cnpj?: string;
}

export interface Orcamento {
  id?: string;
  numero: string;
  ano: number;
  clienteId: string;
  descricao: string;
  status: 'RASCUNHO' | 'EM_ANALISE' | 'APROVADO' | 'REJEITADO' | 'CONCLUIDO';
  valorTotal?: number;
  dataEmissao?: string;
  dataValidade?: string;
  observacoes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemOrcamento {
  id?: string;
  orcamentoId: string;
  codigo: string;
  descricao: string;
  material: string;
  materialFornecidoPor: 'CLIENTE' | 'LASEC';
  tempoCicloMinutos: number;
  setupHoras: number;
  programaCncNumero?: string;
  maquinaCodigo?: string;
  observacoes?: string;
}

export interface Lote {
  quantidade: number;
  custoSetup: number;
  custoMOD: number;
  custoCIF: number;
  custoMaterial: number;
  custoTotal: number;
  custoUnitario: number;
  precoComPerdas: number;
  precoComMarkup: number;
  precoNFe: number;
  precoTotalLote: number;
  margemPercentual: number;
  lucroBruto: number;
  scoreViabilidade: number;
  viabilidade: 'INVIAVEL' | 'RUIM' | 'REGULAR' | 'BOM' | 'MUITO_BOM' | 'EXCELENTE';
  tempoProducaoHoras: number;
  diasUteis: number;
}

export interface CalculoLotesRequest {
  quantidades: number[];
  tempoMinutos: number;
  setupHoras: number;
  horaMaquina: number;
  custoMaterialUnitario?: number;
}

export interface CalculoLotesResponse {
  lotes: Lote[];
  loteRecomendado: number;
  resumo: {
    menorPreco: number;
    maiorPreco: number;
    melhorViabilidade: string;
  };
}

export interface DashboardStats {
  totalOrcamentos: number;
  orcamentosAprovados: number;
  valorTotalAprovado: number;
  ticketMedio: number;
  orcamentosPorMes: {
    mes: string;
    quantidade: number;
    valor: number;
  }[];
}
