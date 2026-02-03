/**
 * Constantes de Negócio LASEC
 * Regras de cálculo para orçamentos de usinagem CNC
 */

export const BUSINESS_RULES = {
  // Custos Indiretos de Fabricação
  CIF_PERCENTUAL: 0.58, // 58% sobre (Setup + MOD)

  // Precificação
  PERDAS_PERCENTUAL: 0.02, // 2%
  MARKUP_PERCENTUAL: 0.35, // 35%
  IMPOSTOS_PERCENTUAL: 0.10, // 10% Simples Nacional
  MULTIPLICADOR_FINAL: 1.5147, // 1.02 * 1.35 * 1.10

  // Comercial
  VALIDADE_PROPOSTA_DIAS: 30,
  LOTES_PADRAO: [15, 30, 50, 100, 200, 500],

  // Máquinas (hora-máquina padrão)
  HORA_MAQUINA_PADRAO: 105.0, // R$/hora
};

/**
 * Máquinas disponíveis com custos
 */
export const MAQUINAS = {
  LYNX220: {
    codigo: 'LYNX220',
    nome: 'Doosan LYNX 220 LM',
    horaMaquina: 105.0,
    setupPadrao: 1.5,
    temEixoC: true,
    temFerramentaMotorizada: true,
  },
  GL280: {
    codigo: 'GL280',
    nome: 'Romi GL280',
    horaMaquina: 83.08,
    setupPadrao: 0.5,
    temEixoC: false,
    temFerramentaMotorizada: false,
  },
  DISCO760: {
    codigo: 'DISCO760',
    nome: 'Discovery 760',
    horaMaquina: 104.76,
    setupPadrao: 1.0,
    temEixoC: false,
    temFerramentaMotorizada: false,
  },
  GL240: {
    codigo: 'GL240',
    nome: 'Romi GL240',
    horaMaquina: 75.0,
    setupPadrao: 0.5,
    temEixoC: false,
    temFerramentaMotorizada: false,
  },
};

/**
 * Fórmulas de Cálculo LASEC
 */
export const FORMULAS = {
  /**
   * Calcula custo de Setup
   * Setup = horas × hora_máquina
   */
  calcularSetup: (horas: number, horaMaquina: number): number => {
    return horas * horaMaquina;
  },

  /**
   * Calcula Mão de Obra Direta (MOD)
   * MOD = (quantidade × tempo_min) / 60 × hora_máquina
   */
  calcularMOD: (quantidade: number, tempoMinutos: number, horaMaquina: number): number => {
    return (quantidade * tempoMinutos / 60) * horaMaquina;
  },

  /**
   * Calcula Custos Indiretos de Fabricação (CIF)
   * CIF = (Setup + MOD) × 0.58
   */
  calcularCIF: (setup: number, mod: number): number => {
    return (setup + mod) * BUSINESS_RULES.CIF_PERCENTUAL;
  },

  /**
   * Calcula Custo Total do Lote
   * Custo Total = Setup + MOD + CIF + Material
   */
  calcularCustoTotal: (setup: number, mod: number, cif: number, material: number = 0): number => {
    return setup + mod + cif + material;
  },

  /**
   * Calcula Custo Unitário
   * Custo Unitário = Custo Total / Quantidade
   */
  calcularCustoUnitario: (custoTotal: number, quantidade: number): number => {
    return custoTotal / quantidade;
  },

  /**
   * Calcula Preço com Perdas
   * Preço com Perdas = Custo × 1.02
   */
  calcularPrecoComPerdas: (custo: number): number => {
    return custo * (1 + BUSINESS_RULES.PERDAS_PERCENTUAL);
  },

  /**
   * Calcula Preço com Markup
   * Preço com Markup = Preço com Perdas × 1.35
   */
  calcularPrecoComMarkup: (precoComPerdas: number): number => {
    return precoComPerdas * (1 + BUSINESS_RULES.MARKUP_PERCENTUAL);
  },

  /**
   * Calcula Preço NFe Final
   * Preço NFe = Custo × 1.02 × 1.35 × 1.10 = Custo × 1.5147
   */
  calcularPrecoNFe: (custoUnitario: number): number => {
    return custoUnitario * BUSINESS_RULES.MULTIPLICADOR_FINAL;
  },

  /**
   * Calcula Ponto de Equilíbrio (Break-Even)
   * Break-Even = Custo Fixo / Margem de Contribuição
   */
  calcularBreakEven: (custoFixo: number, precoVenda: number, custoVariavel: number): number => {
    const margemContribuicao = precoVenda - custoVariavel;
    if (margemContribuicao <= 0) return Infinity;
    return custoFixo / margemContribuicao;
  },

  /**
   * Calcula Margem Percentual
   * Margem % = (Preço - Custo) / Preço × 100
   */
  calcularMargemPercentual: (preco: number, custo: number): number => {
    if (preco <= 0) return 0;
    return ((preco - custo) / preco) * 100;
  },

  /**
   * Calcula Lucro Bruto
   * Lucro = (Preço - Custo) × Quantidade
   */
  calcularLucroBruto: (preco: number, custo: number, quantidade: number): number => {
    return (preco - custo) * quantidade;
  },
};

/**
 * Status de Orçamento
 */
export const ORCAMENTO_STATUS = {
  RASCUNHO: 'RASCUNHO',
  ENVIADO: 'ENVIADO',
  APROVADO: 'APROVADO',
  REJEITADO: 'REJEITADO',
  EXPIRADO: 'EXPIRADO',
} as const;

/**
 * Tipos de Documento
 */
export const DOCUMENTO_TIPOS = {
  PROCESSO: 'PROCESSO_FABRICACAO',
  CUSTO: 'ESTUDO_CUSTO_FABRICACAO',
  PRECO: 'ESTUDO_PRECO_VENDA_NFE',
  VIABILIDADE: 'ANALISE_VIABILIDADE_LOTES',
  BREAK_EVEN: 'ANALISE_BREAK_EVEN',
  PROPOSTA: 'PROPOSTA_COMERCIAL',
} as const;

/**
 * Dados da Empresa LASEC
 */
export const EMPRESA = {
  razaoSocial: 'MALELO INDÚSTRIA E COMÉRCIO FERRAMENTAS LTDA ME',
  nomeFantasia: 'LASEC USINAGEM DE PRECISÃO',
  cnpj: '07.047.619/0001-09',
  endereco: {
    logradouro: 'Rua Álvaro Silva',
    numero: '233',
    bairro: 'Bairro do Limão',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '02723-020',
  },
  telefones: ['(11) 3936-5041', '(11) 3935-1271'],
  email: 'comercial@lasec.com.br',
  site: 'www.lasec.com.br',
};
