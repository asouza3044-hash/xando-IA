import { BUSINESS_RULES, FORMULAS } from '../config/constants';

/**
 * Interface para parâmetros de cálculo de lote
 */
interface CalculoLoteParams {
  quantidade: number;
  tempoMinutos: number;
  setupHoras: number;
  horaMaquina: number;
  custoMaterialUnitario?: number;
}

/**
 * Interface para parâmetros de cálculo de múltiplos lotes
 */
interface CalculoLotesParams {
  tempoMinutos: number;
  setupHoras: number;
  horaMaquina: number;
  custoMaterialUnitario?: number;
  quantidades: number[];
}

/**
 * Interface para resultado de cálculo de um lote
 */
interface ResultadoLote {
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
  economiaVsPiloto?: number;
  scoreViabilidade: number;
  viabilidade: string;
  tempoProducaoHoras: number;
  diasUteis: number;
}

/**
 * Interface para resultado de break-even
 */
interface ResultadoBreakEven {
  pontoEquilibrio: number;
  pontoEquilibrioArredondado: number;
  margemContribuicao: number;
  margemContribuicaoPercentual: number;
  custoFixo: number;
  custoVariavelUnitario: number;
  precoVendaUnitario: number;
}

/**
 * Serviço de cálculo de custos e preços
 * Implementa todas as fórmulas de negócio LASEC
 */
export class CalculoCustoService {

  /**
   * Retorna os parâmetros de cálculo atuais
   */
  getParametros() {
    return {
      cifPercentual: BUSINESS_RULES.CIF_PERCENTUAL * 100,
      perdasPercentual: BUSINESS_RULES.PERDAS_PERCENTUAL * 100,
      markupPercentual: BUSINESS_RULES.MARKUP_PERCENTUAL * 100,
      impostosPercentual: BUSINESS_RULES.IMPOSTOS_PERCENTUAL * 100,
      multiplicadorFinal: BUSINESS_RULES.MULTIPLICADOR_FINAL,
      lotesPadrao: BUSINESS_RULES.LOTES_PADRAO,
      horaMaquinaPadrao: BUSINESS_RULES.HORA_MAQUINA_PADRAO,
      formulas: {
        setup: 'horas × hora_maquina',
        mod: '(quantidade × tempo_min) ÷ 60 × hora_maquina',
        cif: '(setup + mod) × 0.58',
        custoTotal: 'setup + mod + cif + material',
        precoNfe: 'custo × 1.02 × 1.35 × 1.10',
        breakEven: 'custo_fixo ÷ margem_contribuicao',
      },
    };
  }

  /**
   * Calcula custos e preços para um único lote
   */
  calcularLote(params: CalculoLoteParams): ResultadoLote {
    const {
      quantidade,
      tempoMinutos,
      setupHoras,
      horaMaquina,
      custoMaterialUnitario = 0,
    } = params;

    // Cálculos de custo
    const custoSetup = FORMULAS.calcularSetup(setupHoras, horaMaquina);
    const custoMOD = FORMULAS.calcularMOD(quantidade, tempoMinutos, horaMaquina);
    const custoCIF = FORMULAS.calcularCIF(custoSetup, custoMOD);
    const custoMaterial = custoMaterialUnitario * quantidade;
    const custoTotal = FORMULAS.calcularCustoTotal(custoSetup, custoMOD, custoCIF, custoMaterial);
    const custoUnitario = FORMULAS.calcularCustoUnitario(custoTotal, quantidade);

    // Cálculos de preço
    const precoComPerdas = FORMULAS.calcularPrecoComPerdas(custoUnitario);
    const precoComMarkup = FORMULAS.calcularPrecoComMarkup(precoComPerdas);
    const precoNFe = FORMULAS.calcularPrecoNFe(custoUnitario);
    const precoTotalLote = precoNFe * quantidade;

    // Análise de margem
    const margemPercentual = FORMULAS.calcularMargemPercentual(precoNFe, custoUnitario);
    const lucroBruto = FORMULAS.calcularLucroBruto(precoNFe, custoUnitario, quantidade);

    // Tempo de produção
    const tempoProducaoHoras = setupHoras + (quantidade * tempoMinutos / 60);
    const diasUteis = tempoProducaoHoras / 8; // 8 horas por dia

    // Score de viabilidade (1-10)
    const scoreViabilidade = this.calcularScoreViabilidade(
      quantidade,
      custoSetup,
      custoTotal,
      margemPercentual,
      diasUteis
    );

    const viabilidade = this.classificarViabilidade(scoreViabilidade);

    return {
      quantidade,
      custoSetup: this.arredondar(custoSetup),
      custoMOD: this.arredondar(custoMOD),
      custoCIF: this.arredondar(custoCIF),
      custoMaterial: this.arredondar(custoMaterial),
      custoTotal: this.arredondar(custoTotal),
      custoUnitario: this.arredondar(custoUnitario, 4),
      precoComPerdas: this.arredondar(precoComPerdas, 4),
      precoComMarkup: this.arredondar(precoComMarkup, 4),
      precoNFe: this.arredondar(precoNFe, 4),
      precoTotalLote: this.arredondar(precoTotalLote),
      margemPercentual: this.arredondar(margemPercentual),
      lucroBruto: this.arredondar(lucroBruto),
      scoreViabilidade,
      viabilidade,
      tempoProducaoHoras: this.arredondar(tempoProducaoHoras),
      diasUteis: this.arredondar(diasUteis, 1),
    };
  }

  /**
   * Calcula custos e preços para múltiplos lotes
   */
  calcularLotes(params: CalculoLotesParams): {
    lotes: ResultadoLote[];
    loteRecomendado: number;
    resumo: {
      tempoMinutos: number;
      setupHoras: number;
      horaMaquina: number;
      custoSetupFixo: number;
    };
  } {
    const { quantidades, ...loteParams } = params;

    // Calcular todos os lotes
    const lotes = quantidades.map(quantidade =>
      this.calcularLote({ ...loteParams, quantidade })
    );

    // Calcular economia vs piloto (primeiro lote)
    if (lotes.length > 0) {
      const precoPiloto = lotes[0].precoNFe;
      lotes.forEach(lote => {
        lote.economiaVsPiloto = this.arredondar(
          ((precoPiloto - lote.precoNFe) / precoPiloto) * 100
        );
      });
    }

    // Encontrar lote recomendado (maior score de viabilidade)
    const loteRecomendado = lotes.reduce((melhor, atual) =>
      atual.scoreViabilidade > melhor.scoreViabilidade ? atual : melhor
    ).quantidade;

    return {
      lotes,
      loteRecomendado,
      resumo: {
        tempoMinutos: params.tempoMinutos,
        setupHoras: params.setupHoras,
        horaMaquina: params.horaMaquina,
        custoSetupFixo: FORMULAS.calcularSetup(params.setupHoras, params.horaMaquina),
      },
    };
  }

  /**
   * Calcula ponto de equilíbrio (break-even)
   */
  calcularBreakEven(
    custoFixo: number,
    custoVariavelUnitario: number,
    precoVendaUnitario: number
  ): ResultadoBreakEven {
    const margemContribuicao = precoVendaUnitario - custoVariavelUnitario;
    const margemContribuicaoPercentual = (margemContribuicao / precoVendaUnitario) * 100;

    let pontoEquilibrio = 0;
    if (margemContribuicao > 0) {
      pontoEquilibrio = custoFixo / margemContribuicao;
    }

    return {
      pontoEquilibrio: this.arredondar(pontoEquilibrio, 2),
      pontoEquilibrioArredondado: Math.ceil(pontoEquilibrio),
      margemContribuicao: this.arredondar(margemContribuicao),
      margemContribuicaoPercentual: this.arredondar(margemContribuicaoPercentual),
      custoFixo: this.arredondar(custoFixo),
      custoVariavelUnitario: this.arredondar(custoVariavelUnitario, 4),
      precoVendaUnitario: this.arredondar(precoVendaUnitario, 4),
    };
  }

  /**
   * Calcula score de viabilidade (1-10)
   */
  private calcularScoreViabilidade(
    quantidade: number,
    custoSetup: number,
    custoTotal: number,
    margemPercentual: number,
    diasUteis: number
  ): number {
    let score = 5; // Base

    // Fator 1: Proporção do setup no custo total (quanto menor, melhor)
    const proporcaoSetup = (custoSetup / custoTotal) * 100;
    if (proporcaoSetup < 5) score += 2;
    else if (proporcaoSetup < 10) score += 1;
    else if (proporcaoSetup > 20) score -= 1;
    else if (proporcaoSetup > 30) score -= 2;

    // Fator 2: Quantidade (lotes entre 50-200 são ideais)
    if (quantidade >= 50 && quantidade <= 200) score += 1;
    else if (quantidade < 30) score -= 1;
    else if (quantidade > 300) score -= 1;

    // Fator 3: Margem (quanto maior, melhor)
    if (margemPercentual >= 35) score += 1;
    else if (margemPercentual < 25) score -= 1;

    // Fator 4: Tempo de produção (entre 1-3 semanas é ideal)
    if (diasUteis >= 5 && diasUteis <= 15) score += 1;
    else if (diasUteis > 30) score -= 1;

    // Garantir que está entre 1 e 10
    return Math.max(1, Math.min(10, score));
  }

  /**
   * Classifica a viabilidade baseado no score
   */
  private classificarViabilidade(score: number): string {
    if (score >= 9) return 'EXCELENTE';
    if (score >= 7) return 'RECOMENDADO';
    if (score >= 5) return 'VIÁVEL';
    if (score >= 3) return 'MARGINAL';
    return 'NÃO RECOMENDADO';
  }

  /**
   * Arredonda um número para N casas decimais
   */
  private arredondar(valor: number, casas: number = 2): number {
    const multiplicador = Math.pow(10, casas);
    return Math.round(valor * multiplicador) / multiplicador;
  }
}

export default CalculoCustoService;
