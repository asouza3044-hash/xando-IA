const API = 'http://localhost:8000/api';

// ─── ESTADO ───────────────────────────────────────────────────────────────────
let mesAtual    = new Date().getMonth() + 1;
let anoAtual    = new Date().getFullYear();
let abaAtual    = 'dashboard';
let itemAtual   = null;
let modoAtual   = null;   // 'pagar' | 'receber'
let filtroPagar = 'todos';
let filtroReceber = 'todos';
let filtroLanc  = 'todos';
let dadosPagar  = null;
let dadosReceber = null;
let dadosLanc   = null;
let contasBancariasCache = [];
let charts = {};
let qaTipo = 'despesa';

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
               'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const CATS_DESPESA = [
  {v:'moradia',l:'Moradia'},{v:'alimentacao',l:'Alimentação'},{v:'transporte',l:'Transporte'},
  {v:'saude',l:'Saúde'},{v:'lazer',l:'Lazer'},{v:'educacao',l:'Educação'},
  {v:'vestuario',l:'Vestuário'},{v:'servicos',l:'Serviços'},{v:'restaurante',l:'Restaurante'},
  {v:'mercado',l:'Mercado'},{v:'outros',l:'Outros'}
];
const CATS_RECEITA = [
  {v:'salario',l:'Salário'},{v:'cliente',l:'Cliente'},{v:'aluguel',l:'Aluguel'},
  {v:'investimento',l:'Investimento'},{v:'bonus',l:'Bônus'},{v:'outros',l:'Outros'}
];

const TIPO_LABEL = {
  fixo:'Fixo',imposto:'Imposto',parcela:'Parcela',
  moradia:'Moradia',alimentacao:'Alimentação',transporte:'Transporte',
  saude:'Saúde',lazer:'Lazer',educacao:'Educação',vestuario:'Vestuário',
  servicos:'Serviços',restaurante:'Restaurante',mercado:'Mercado',
  salario:'Salário',cliente:'Cliente',aluguel:'Aluguel',investimento:'Investimento',
  bonus:'Bônus',outros:'Outros',cartao:'Cartão',
  corrente:'Corrente',poupanca:'Poupança',digital:'Digital',carteira:'Carteira',
};
const TIPO_BADGE = {
  fixo:'badge-fixo',imposto:'badge-imposto',parcela:'badge-parcela',
  moradia:'badge-moradia',alimentacao:'badge-alimentacao',transporte:'badge-transporte',
  saude:'badge-saude',lazer:'badge-lazer',educacao:'badge-educacao',vestuario:'badge-vestuario',
  servicos:'badge-servicos',restaurante:'badge-restaurante',mercado:'badge-mercado',
  salario:'badge-salario',cliente:'badge-cliente',aluguel:'badge-aluguel',
  investimento:'badge-investimento',bonus:'badge-bonus',outros:'badge-outros',
  corrente:'badge-corrente',poupanca:'badge-poupanca',digital:'badge-digital',carteira:'badge-carteira',
};
const SI = {
  pago:    '<i class="bi bi-check-circle-fill status-icon status-pago"></i>',
  vencida: '<i class="bi bi-x-circle-fill status-icon status-vencida"></i>',
  a_vencer:'<i class="bi bi-exclamation-circle-fill status-icon status-a_vencer"></i>',
  ok:      '<i class="bi bi-clock status-icon status-ok"></i>',
  recebido:'<i class="bi bi-check-circle-fill status-icon status-recebido"></i>',
  atrasado:'<i class="bi bi-x-circle-fill status-icon status-atrasado"></i>',
  pendente:'<i class="bi bi-clock status-icon status-pendente"></i>',
  despesa: '<i class="bi bi-arrow-up-circle-fill status-icon status-despesa"></i>',
  receita: '<i class="bi bi-arrow-down-circle-fill status-icon status-receita"></i>',
};

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  atualizarLabelMes();
  carregarDashboard();
  api('/contas-bancarias').then(r => { if(r) contasBancariasCache = r; });
});

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────────────────
function mudarMes(d) {
  mesAtual += d;
  if (mesAtual > 12) { mesAtual = 1; anoAtual++; }
  if (mesAtual < 1)  { mesAtual = 12; anoAtual--; }
  atualizarLabelMes();
  recarregarAbaAtual();
}

function irParaHoje() {
  mesAtual = new Date().getMonth() + 1;
  anoAtual = new Date().getFullYear();
  atualizarLabelMes();
  recarregarAbaAtual();
}

function atualizarLabelMes() {
  document.getElementById('label-mes').textContent = `${MESES[mesAtual-1]} ${anoAtual}`;
}

function recarregarAbaAtual() {
  carregarDashboard();
  const fn = {
    'a-pagar':   carregarPagar,
    'a-receber': carregarReceber,
    'cartao':    carregarCartoes,
    'contas':    carregarContasBancarias,
    'lancamentos':carregarLancamentos,
    'relatorios':carregarRelatorios,
    'historico': carregarHistorico,
  }[abaAtual];
  if (fn) fn();
}

function mostrarAba(aba, linkEl) {
  abaAtual = aba;
  document.querySelectorAll('#abas-principais .nav-link').forEach(l => l.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');

  ['dashboard','a-pagar','a-receber','cartao','contas','lancamentos','relatorios','historico']
    .forEach(p => document.getElementById('painel-'+p).classList.add('d-none'));
  document.getElementById('painel-'+aba).classList.remove('d-none');

  const btns = {'a-pagar':'Nova Conta','a-receber':'Nova Receita','cartao':'Novo Cartão','contas':'Nova Conta'};
  const label = btns[aba];
  document.getElementById('btn-novo-container').classList.toggle('d-none', !label);
  if (label) document.getElementById('btn-novo-label').textContent = label;

  const fn = {
    'a-pagar':    carregarPagar,
    'a-receber':  carregarReceber,
    'cartao':     carregarCartoes,
    'contas':     carregarContasBancarias,
    'lancamentos':carregarLancamentos,
    'relatorios': carregarRelatorios,
    'historico':  carregarHistorico,
  }[aba];
  if (fn) fn();
}

function abrirNovoContextual() {
  if (abaAtual === 'a-pagar')   abrirModalConta();
  if (abaAtual === 'a-receber') abrirModalReceita();
  if (abaAtual === 'cartao')    abrirModalCartao();
  if (abaAtual === 'contas')    abrirModalContaBancaria();
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
async function carregarDashboard() {
  const [fluxo, dash] = await Promise.all([
    api(`/fluxo?ano=${anoAtual}&mes=${mesAtual}`),
    api(`/dashboard?ano=${anoAtual}&mes=${mesAtual}`),
  ]);
  if (!fluxo || !dash) return;

  document.getElementById('d-saidas').textContent   = fmt(fluxo.saidas_previstas);
  document.getElementById('d-pago').textContent     = fmt(fluxo.saidas_pagas);
  document.getElementById('d-entradas').textContent = fmt(fluxo.entradas_previstas);
  document.getElementById('d-recebido').textContent = fmt(fluxo.entradas_recebidas);
  document.getElementById('d-cartao').textContent   = fmt(fluxo.cartao_total);
  const sel = document.getElementById('d-saldo');
  sel.textContent = fmt(fluxo.saldo_real);
  sel.className = 'valor ' + (fluxo.saldo_real >= 0 ? 'saldo-positivo' : 'saldo-negativo');

  const alerts = [];
  if (dash.vencidas > 0) alerts.push(`<span class="badge bg-danger me-2">${dash.vencidas} vencida${dash.vencidas>1?'s':''}</span>`);
  if (dash.vence_em_7_dias > 0) alerts.push(`<span class="badge bg-warning text-dark me-2">${dash.vence_em_7_dias} vence${dash.vence_em_7_dias>1?'m':''} em 7 dias</span>`);
  document.getElementById('dashboard-alertas').innerHTML = alerts.length ? `<div class="mb-2">${alerts.join('')}</div>` : '';

  dadosPagar = dash;
  carregarOrcamentosProgresso();
}

// ─── A PAGAR ──────────────────────────────────────────────────────────────────
async function carregarPagar() {
  setLoading('lista-pagar');
  const data = await api(`/dashboard?ano=${anoAtual}&mes=${mesAtual}`);
  if (!data) return;
  dadosPagar = data;
  renderizarPagar(data.contas);
}

function renderizarPagar(contas) {
  const f = filtroPagar;
  const list = f === 'todos' ? contas : f === 'vencida' ? contas.filter(c=>c.status==='vencida') : contas.filter(c=>c.tipo===f);
  document.getElementById('lista-pagar').innerHTML = list.length === 0 ? vazio() :
    list.map(c => `
      <div class="item-row d-flex align-items-center gap-3" onclick="abrirAcoes(${c.id},'pagar')">
        <div class="flex-shrink-0">${SI[c.status]||''}</div>
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <strong>${esc(c.nome)}</strong>
            <span class="badge-tipo ${TIPO_BADGE[c.tipo]||''}">${TIPO_LABEL[c.tipo]||c.tipo}</span>
            ${c.categoria&&c.categoria!=='outros'?`<span class="badge-tipo ${TIPO_BADGE[c.categoria]||'badge-outros'}">${TIPO_LABEL[c.categoria]||c.categoria}</span>`:''}
            ${c.tipo==='parcela'&&c.parcelas_total?`<small class="text-muted">${c.parcelas_pagas}/${c.parcelas_total}x</small>`:''}
          </div>
          <div class="text-muted small">${statusLabelPagar(c)}</div>
        </div>
        <div class="text-end flex-shrink-0">
          <div class="fw-semibold">${fmt(c.valor)}</div>
          <div class="text-muted small">dia ${c.dia_vencimento}</div>
        </div>
      </div>`).join('');
}

function statusLabelPagar(c) {
  if (c.status==='pago') { const v=c.pagamento?.valor_pago; return `Pago em ${fmtData(c.pagamento?.data_pagamento)}${v!==c.valor?' · '+fmt(v):''}`; }
  if (c.status==='vencida') return `Venceu em ${fmtData(c.data_vencimento)} (${Math.abs(c.dias_para_vencer)}d)`;
  if (c.status==='a_vencer') return `Vence ${c.dias_para_vencer===0?'hoje':`em ${c.dias_para_vencer}d`}`;
  return `Vence dia ${c.dia_vencimento}`;
}

// ─── A RECEBER ────────────────────────────────────────────────────────────────
async function carregarReceber() {
  setLoading('lista-receber');
  const data = await api(`/receitas/dashboard?ano=${anoAtual}&mes=${mesAtual}`);
  if (!data) return;
  dadosReceber = data;
  renderizarReceber(data.receitas);
}

function renderizarReceber(receitas) {
  const list = filtroReceber==='todos' ? receitas : receitas.filter(r=>r.tipo===filtroReceber);
  document.getElementById('lista-receber').innerHTML = list.length===0 ? vazio() :
    list.map(r => `
      <div class="item-row d-flex align-items-center gap-3" onclick="abrirAcoes(${r.id},'receber')">
        <div class="flex-shrink-0">${SI[r.status]||''}</div>
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <strong>${esc(r.nome)}</strong>
            <span class="badge-tipo ${TIPO_BADGE[r.tipo]||''}">${TIPO_LABEL[r.tipo]||r.tipo}</span>
          </div>
          <div class="text-muted small">${r.status==='recebido'?`Recebido em ${fmtData(r.recebimento?.data_recebimento)}`:r.status==='atrasado'?`Esperado dia ${r.dia_previsto} (atrasado)`:`Previsto para dia ${r.dia_previsto}`}</div>
        </div>
        <div class="text-end flex-shrink-0">
          <div class="fw-semibold text-success">${fmt(r.valor)}</div>
          <div class="text-muted small">dia ${r.dia_previsto}</div>
        </div>
      </div>`).join('');
}

// ─── FILTROS ──────────────────────────────────────────────────────────────────
function filtrar(btn, tipo) {
  btn.closest('.d-flex').querySelectorAll('.filtro-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if (tipo==='pagar')   { filtroPagar=btn.dataset.filtro;   if(dadosPagar)   renderizarPagar(dadosPagar.contas); }
  if (tipo==='receber') { filtroReceber=btn.dataset.filtro; if(dadosReceber) renderizarReceber(dadosReceber.receitas); }
  if (tipo==='lanc')    { filtroLanc=btn.dataset.filtro;    if(dadosLanc)    renderizarLancamentos(dadosLanc); }
}

// ─── AÇÕES ────────────────────────────────────────────────────────────────────
function abrirAcoes(id, modo) {
  modoAtual = modo;
  itemAtual = modo==='pagar' ? dadosPagar?.contas?.find(c=>c.id===id) : dadosReceber?.receitas?.find(r=>r.id===id);
  if (!itemAtual) return;
  document.getElementById('acoes-nome').textContent = itemAtual.nome;
  const jaPago = itemAtual.status==='pago'||itemAtual.status==='recebido';
  const btn = document.getElementById('btn-acao-principal');
  document.getElementById('label-acao-principal').textContent = modo==='pagar'?'Registrar pagamento':'Registrar recebimento';
  btn.disabled = jaPago;
  new bootstrap.Modal(document.getElementById('modalAcoes')).show();
}

function abrirModalRegistro() {
  bootstrap.Modal.getInstance(document.getElementById('modalAcoes')).hide();
  setTimeout(() => {
    const isPagar = modoAtual==='pagar';
    document.getElementById('registro-titulo').textContent = isPagar?'Registrar Pagamento':'Registrar Recebimento';
    document.getElementById('registro-nome').textContent = itemAtual.nome;
    document.getElementById('registro-label-valor').textContent = isPagar?'Valor pago (R$) *':'Valor recebido (R$) *';
    document.getElementById('registro-data').value = new Date().toISOString().slice(0,10);
    document.getElementById('registro-valor').value = itemAtual.valor.toFixed(2);
    document.getElementById('registro-obs').value = '';
    new bootstrap.Modal(document.getElementById('modalRegistro')).show();
  }, 300);
}

async function confirmarRegistro() {
  const d = document.getElementById('registro-data').value;
  const v = parseFloat(document.getElementById('registro-valor').value);
  const o = document.getElementById('registro-obs').value;
  const mr = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  if (!d||!v) { toast('Preencha data e valor','danger'); return; }
  let res;
  if (modoAtual==='pagar') res = await api('/pagamentos','POST',{conta_id:itemAtual.id,data_pagamento:d,valor_pago:v,mes_referencia:mr,observacao:o||null});
  else res = await api('/recebimentos','POST',{receita_id:itemAtual.id,data_recebimento:d,valor_recebido:v,mes_referencia:mr,observacao:o||null});
  if (res?.ok) {
    bootstrap.Modal.getInstance(document.getElementById('modalRegistro')).hide();
    toast(modoAtual==='pagar'?'Pagamento registrado!':'Recebimento registrado!','success');
    recarregarAbaAtual();
  }
}

function editarItemAtual() {
  bootstrap.Modal.getInstance(document.getElementById('modalAcoes')).hide();
  setTimeout(()=>{ if(modoAtual==='pagar') abrirModalConta(itemAtual); else abrirModalReceita(itemAtual); },300);
}

async function arquivarItemAtual() {
  if (!confirm(`Arquivar "${itemAtual.nome}"?`)) return;
  bootstrap.Modal.getInstance(document.getElementById('modalAcoes')).hide();
  await api(modoAtual==='pagar'?`/contas/${itemAtual.id}`:`/receitas/${itemAtual.id}`,'DELETE');
  toast('Arquivado','warning'); recarregarAbaAtual();
}

// ─── QUICK ADD (FAB) ─────────────────────────────────────────────────────────
async function abrirQuickAdd() {
  qaTipo = 'despesa';
  document.getElementById('qa-data').value = new Date().toISOString().slice(0,10);
  document.getElementById('qa-valor').value = '';
  document.getElementById('qa-descricao').value = '';
  document.getElementById('qa-obs').value = '';
  document.getElementById('qa-obs').classList.add('d-none');
  setTipoQA('despesa');

  if (!contasBancariasCache.length) {
    const r = await api('/contas-bancarias');
    if (r) contasBancariasCache = r;
  }
  const sel = document.getElementById('qa-conta-bancaria');
  sel.innerHTML = '<option value="">— nenhuma —</option>' +
    contasBancariasCache.map(c=>`<option value="${c.id}">${esc(c.nome)}</option>`).join('');

  new bootstrap.Modal(document.getElementById('modalQuickAdd')).show();
  setTimeout(()=>document.getElementById('qa-valor').focus(),400);
}

function setTipoQA(tipo) {
  qaTipo = tipo;
  const cats = tipo==='despesa' ? CATS_DESPESA : CATS_RECEITA;
  document.getElementById('qa-categoria').innerHTML = cats.map(c=>`<option value="${c.v}">${c.l}</option>`).join('');
  document.getElementById('qa-btn-despesa').className = 'btn flex-fill '+(tipo==='despesa'?'btn-danger':'btn-outline-danger');
  document.getElementById('qa-btn-receita').className = 'btn flex-fill '+(tipo==='receita'?'btn-success':'btn-outline-success');
  document.getElementById('qa-header').style.background = tipo==='despesa'?'#c62828':'#2e7d32';
}

function toggleQaObs(e) { e.preventDefault(); document.getElementById('qa-obs').classList.toggle('d-none'); }

async function salvarQuickAdd() {
  const valor   = parseFloat(document.getElementById('qa-valor').value);
  const desc    = document.getElementById('qa-descricao').value.trim();
  const cat     = document.getElementById('qa-categoria').value;
  const data    = document.getElementById('qa-data').value;
  const obs     = document.getElementById('qa-obs').value.trim();
  const contaId = document.getElementById('qa-conta-bancaria').value;
  const mesRef  = data ? data.slice(0,7) : `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;

  if (!valor||!data||!desc) { toast('Preencha valor, descrição e data','danger'); return; }
  const res = await api('/transacoes','POST',{
    descricao:desc, valor, tipo:qaTipo, categoria:cat, data, mes_referencia:mesRef,
    conta_bancaria_id:contaId?parseInt(contaId):null, observacao:obs||null
  });
  if (res?.id) {
    bootstrap.Modal.getInstance(document.getElementById('modalQuickAdd')).hide();
    toast(`${qaTipo==='despesa'?'Despesa':'Receita'} registrada!`,'success');
    recarregarAbaAtual();
  }
}

// ─── MODAL CONTA ─────────────────────────────────────────────────────────────
function abrirModalConta(c=null) {
  document.getElementById('modalContaTitulo').textContent = c?'Editar Conta':'Nova Conta';
  document.getElementById('conta-id').value           = c?.id||'';
  document.getElementById('conta-nome').value         = c?.nome||'';
  document.getElementById('conta-tipo').value         = c?.tipo||'fixo';
  document.getElementById('conta-dia').value          = c?.dia_vencimento||'';
  document.getElementById('conta-valor').value        = c?.valor?.toFixed(2)||'';
  document.getElementById('conta-categoria').value    = c?.categoria||'outros';
  document.getElementById('conta-parcelas-total').value = c?.parcelas_total||'';
  document.getElementById('conta-descricao').value    = c?.descricao||'';
  document.getElementById('btn-arquivar-conta').classList.toggle('d-none',!c);
  atualizarCamposTipo();
  new bootstrap.Modal(document.getElementById('modalConta')).show();
}

function atualizarCamposTipo() {
  document.getElementById('campo-parcelas').classList.toggle('d-none', document.getElementById('conta-tipo').value!=='parcela');
}

async function salvarConta() {
  const id    = document.getElementById('conta-id').value;
  const nome  = document.getElementById('conta-nome').value.trim();
  const tipo  = document.getElementById('conta-tipo').value;
  const dia   = parseInt(document.getElementById('conta-dia').value);
  const valor = parseFloat(document.getElementById('conta-valor').value);
  const cat   = document.getElementById('conta-categoria').value;
  const parc  = parseInt(document.getElementById('conta-parcelas-total').value)||null;
  const desc  = document.getElementById('conta-descricao').value.trim();
  if (!nome||!dia||!valor) { toast('Preencha nome, dia e valor','danger'); return; }
  const payload = {nome,tipo,dia_vencimento:dia,valor,categoria:cat,parcelas_total:parc,descricao:desc||null};
  if (id) await api(`/contas/${id}`,'PUT',payload); else await api('/contas','POST',payload);
  bootstrap.Modal.getInstance(document.getElementById('modalConta')).hide();
  toast(id?'Conta atualizada!':'Conta criada!','success'); recarregarAbaAtual();
}

async function arquivarContaAtual() {
  const id = document.getElementById('conta-id').value;
  if (!id||!confirm('Arquivar esta conta?')) return;
  await api(`/contas/${id}`,'DELETE');
  bootstrap.Modal.getInstance(document.getElementById('modalConta')).hide();
  toast('Conta arquivada','warning'); recarregarAbaAtual();
}

// ─── MODAL RECEITA ───────────────────────────────────────────────────────────
function abrirModalReceita(r=null) {
  document.getElementById('modalReceitaTitulo').textContent = r?'Editar Receita':'Nova Receita';
  document.getElementById('receita-id').value        = r?.id||'';
  document.getElementById('receita-nome').value      = r?.nome||'';
  document.getElementById('receita-tipo').value      = r?.tipo||'salario';
  document.getElementById('receita-dia').value       = r?.dia_previsto||'';
  document.getElementById('receita-valor').value     = r?.valor?.toFixed(2)||'';
  document.getElementById('receita-categoria').value = r?.categoria||'outros';
  document.getElementById('receita-descricao').value = r?.descricao||'';
  document.getElementById('btn-arquivar-receita').classList.toggle('d-none',!r);
  new bootstrap.Modal(document.getElementById('modalReceita')).show();
}

async function salvarReceita() {
  const id    = document.getElementById('receita-id').value;
  const nome  = document.getElementById('receita-nome').value.trim();
  const tipo  = document.getElementById('receita-tipo').value;
  const dia   = parseInt(document.getElementById('receita-dia').value);
  const valor = parseFloat(document.getElementById('receita-valor').value);
  const cat   = document.getElementById('receita-categoria').value;
  const desc  = document.getElementById('receita-descricao').value.trim();
  if (!nome||!dia||!valor) { toast('Preencha nome, dia e valor','danger'); return; }
  const payload = {nome,tipo,dia_previsto:dia,valor,categoria:cat,descricao:desc||null};
  if (id) await api(`/receitas/${id}`,'PUT',payload); else await api('/receitas','POST',payload);
  bootstrap.Modal.getInstance(document.getElementById('modalReceita')).hide();
  toast(id?'Receita atualizada!':'Receita criada!','success'); recarregarAbaAtual();
}

async function arquivarReceitaAtual() {
  const id = document.getElementById('receita-id').value;
  if (!id||!confirm('Arquivar esta receita?')) return;
  await api(`/receitas/${id}`,'DELETE');
  bootstrap.Modal.getInstance(document.getElementById('modalReceita')).hide();
  toast('Receita arquivada','warning'); recarregarAbaAtual();
}

// ─── CARTÕES ─────────────────────────────────────────────────────────────────
async function carregarCartoes() {
  setLoading('lista-cartoes-painel');
  const mesRef = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  const cartoes = await api('/cartoes');
  if (!cartoes) return;
  if (cartoes.length===0) {
    document.getElementById('lista-cartoes-painel').innerHTML =
      `<div class="text-center text-muted py-5"><i class="bi bi-credit-card fs-2 d-block mb-2"></i>Nenhum cartão<br><button class="btn btn-primary btn-sm mt-2" onclick="abrirModalCartao()">+ Adicionar</button></div>`;
    return;
  }
  const html = await Promise.all(cartoes.map(async c => {
    const d = await api(`/cartoes/${c.id}/lancamentos?mes=${mesRef}`);
    const total = d?.total||0; const lancs = d?.lancamentos||[];
    const pct = c.limite ? Math.min(100,total/c.limite*100).toFixed(0) : null;
    return `<div class="cartao-card">
      <div class="d-flex align-items-start justify-content-between mb-2">
        <div><h5 class="mb-0"><i class="bi bi-credit-card me-2 text-primary"></i>${esc(c.nome)}</h5>
        <small class="text-muted">Fecha dia ${c.dia_fechamento} · Vence dia ${c.dia_vencimento}</small></div>
        <div class="text-end"><div class="fatura-total">${fmt(total)}</div>${c.limite?`<small class="text-muted">Limite: ${fmt(c.limite)}</small>`:''}</div>
      </div>
      ${pct!==null?`<div class="progress mb-3" style="height:6px"><div class="progress-bar ${pct>80?'bg-danger':pct>50?'bg-warning':'bg-success'}" style="width:${pct}%"></div></div>`:''}
      <div class="d-flex gap-2 mb-3">
        <button class="btn btn-sm btn-outline-primary" onclick="abrirModalLancamento(${c.id})"><i class="bi bi-plus-lg me-1"></i>Lançamento</button>
        <button class="btn btn-sm btn-outline-secondary" onclick='abrirModalCartao(${JSON.stringify(c)})'><i class="bi bi-pencil me-1"></i>Editar</button>
      </div>
      ${lancs.length===0?'<p class="text-muted small">Nenhum lançamento neste mês</p>':
        lancs.map(l=>`<div class="d-flex align-items-center gap-2 py-2 border-bottom">
          <span class="badge-tipo ${TIPO_BADGE[l.categoria]||'badge-outros'}">${TIPO_LABEL[l.categoria]||l.categoria}</span>
          <span class="flex-grow-1">${esc(l.descricao)}</span>
          <span class="text-muted small">${fmtData(l.data_compra)}</span>
          <span class="fw-semibold">${fmt(l.valor)}</span>
          <button class="btn btn-link btn-sm text-danger p-0" onclick="removerLancamento(${l.id},event)"><i class="bi bi-trash"></i></button>
        </div>`).join('')}
    </div>`;
  }));
  document.getElementById('lista-cartoes-painel').innerHTML = html.join('');
}

function abrirModalCartao(c=null) {
  document.getElementById('modalCartaoTitulo').textContent = c?'Editar Cartão':'Novo Cartão';
  document.getElementById('cartao-id').value         = c?.id||'';
  document.getElementById('cartao-nome').value       = c?.nome||'';
  document.getElementById('cartao-limite').value     = c?.limite?.toFixed(2)||'';
  document.getElementById('cartao-fechamento').value = c?.dia_fechamento||'';
  document.getElementById('cartao-vencimento').value = c?.dia_vencimento||'';
  new bootstrap.Modal(document.getElementById('modalCartao')).show();
}

async function salvarCartao() {
  const id = document.getElementById('cartao-id').value;
  const nome = document.getElementById('cartao-nome').value.trim();
  const limite = parseFloat(document.getElementById('cartao-limite').value)||null;
  const fech = parseInt(document.getElementById('cartao-fechamento').value);
  const venc = parseInt(document.getElementById('cartao-vencimento').value);
  if (!nome||!fech||!venc) { toast('Preencha nome, fechamento e vencimento','danger'); return; }
  const payload = {nome,limite,dia_fechamento:fech,dia_vencimento:venc};
  if (id) await api(`/cartoes/${id}`,'PUT',payload); else await api('/cartoes','POST',payload);
  bootstrap.Modal.getInstance(document.getElementById('modalCartao')).hide();
  toast('Cartão salvo!','success'); carregarCartoes();
}

let lancCartaoId = null;
function abrirModalLancamento(cartaoId) {
  lancCartaoId = cartaoId;
  document.getElementById('lanc-cartao-id').value = cartaoId;
  document.getElementById('lanc-descricao').value = '';
  document.getElementById('lanc-valor').value = '';
  document.getElementById('lanc-categoria').value = 'outros';
  document.getElementById('lanc-data').value = new Date().toISOString().slice(0,10);
  new bootstrap.Modal(document.getElementById('modalLancamento')).show();
}

async function salvarLancamento() {
  const cartaoId = parseInt(document.getElementById('lanc-cartao-id').value);
  const desc = document.getElementById('lanc-descricao').value.trim();
  const valor = parseFloat(document.getElementById('lanc-valor').value);
  const cat = document.getElementById('lanc-categoria').value;
  const data = document.getElementById('lanc-data').value;
  const mesRef = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  if (!desc||!valor||!data) { toast('Preencha descrição, valor e data','danger'); return; }
  await api('/lancamentos','POST',{cartao_id:cartaoId,descricao:desc,valor,data_compra:data,categoria:cat,mes_referencia:mesRef});
  bootstrap.Modal.getInstance(document.getElementById('modalLancamento')).hide();
  toast('Lançamento adicionado!','success'); carregarCartoes(); carregarDashboard();
}

async function removerLancamento(id,evt) {
  evt.stopPropagation();
  if (!confirm('Remover este lançamento?')) return;
  await api(`/lancamentos/${id}`,'DELETE');
  toast('Removido','warning'); carregarCartoes(); carregarDashboard();
}

// ─── CONTAS BANCÁRIAS ────────────────────────────────────────────────────────
async function carregarContasBancarias() {
  setLoading('lista-contas-bancarias');
  const contas = await api('/contas-bancarias');
  if (!contas) return;
  if (contas.length===0) {
    document.getElementById('lista-contas-bancarias').innerHTML =
      `<div class="text-center text-muted py-5"><i class="bi bi-bank fs-2 d-block mb-2"></i>Nenhuma conta cadastrada<br><button class="btn btn-primary btn-sm mt-2" onclick="abrirModalContaBancaria()">+ Adicionar conta</button></div>`;
    return;
  }
  const html = await Promise.all(contas.map(async c => {
    const sd = await api(`/contas-bancarias/${c.id}/saldo`);
    const saldo = sd?.saldo_atual ?? c.saldo_inicial;
    const isPos = saldo>=0;
    return `<div class="banco-card">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <h5 class="mb-0"><i class="bi bi-bank me-2 text-primary"></i>${esc(c.nome)}</h5>
          <span class="badge-tipo ${TIPO_BADGE[c.tipo]||'badge-outros'} mt-1 d-inline-block">${TIPO_LABEL[c.tipo]||c.tipo}</span>
        </div>
        <div class="text-end">
          <div class="valor ${isPos?'saldo-positivo':'saldo-negativo'}" style="font-size:1.5rem;font-weight:700">${fmt(saldo)}</div>
          <small class="text-muted">saldo atual</small>
        </div>
      </div>
      ${sd?`<div class="row text-center mt-2">
        <div class="col"><div class="text-success small fw-bold">+${fmt(sd.total_entradas)}</div><div class="text-muted" style="font-size:.75rem">Entradas</div></div>
        <div class="col"><div class="text-danger small fw-bold">-${fmt(sd.total_saidas)}</div><div class="text-muted" style="font-size:.75rem">Saídas</div></div>
        <div class="col"><div class="small fw-bold">${fmt(c.saldo_inicial)}</div><div class="text-muted" style="font-size:.75rem">Saldo inicial</div></div>
      </div>`:''}
      <div class="d-flex gap-2 mt-2">
        <button class="btn btn-sm btn-outline-secondary" onclick='abrirModalContaBancaria(${JSON.stringify(c)})'><i class="bi bi-pencil me-1"></i>Editar</button>
      </div>
    </div>`;
  }));
  document.getElementById('lista-contas-bancarias').innerHTML = html.join('');
}

function abrirModalContaBancaria(c=null) {
  document.getElementById('modalBancoTitulo').textContent = c?'Editar Conta':'Nova Conta Bancária';
  document.getElementById('banco-id').value    = c?.id||'';
  document.getElementById('banco-nome').value  = c?.nome||'';
  document.getElementById('banco-tipo').value  = c?.tipo||'digital';
  document.getElementById('banco-saldo').value = c?.saldo_inicial?.toFixed(2)||'0.00';
  new bootstrap.Modal(document.getElementById('modalContaBancaria')).show();
}

async function salvarContaBancaria() {
  const id    = document.getElementById('banco-id').value;
  const nome  = document.getElementById('banco-nome').value.trim();
  const tipo  = document.getElementById('banco-tipo').value;
  const saldo = parseFloat(document.getElementById('banco-saldo').value)||0;
  if (!nome) { toast('Informe o nome da conta','danger'); return; }
  const payload = {nome,tipo,saldo_inicial:saldo};
  if (id) await api(`/contas-bancarias/${id}`,'PUT',payload); else await api('/contas-bancarias','POST',payload);
  bootstrap.Modal.getInstance(document.getElementById('modalContaBancaria')).hide();
  toast('Conta salva!','success');
  contasBancariasCache = await api('/contas-bancarias')||[];
  carregarContasBancarias();
}

// ─── LANÇAMENTOS AVULSOS ──────────────────────────────────────────────────────
async function carregarLancamentos() {
  setLoading('lista-lancamentos');
  const mesRef = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  const data = await api(`/transacoes?mes=${mesRef}`);
  if (!data) return;
  dadosLanc = data;
  renderizarLancamentos(data);
}

function renderizarLancamentos(items) {
  const list = filtroLanc==='todos' ? items : items.filter(t=>t.tipo===filtroLanc);
  if (list.length===0) { document.getElementById('lista-lancamentos').innerHTML = vazio(); return; }
  const totD = list.filter(t=>t.tipo==='despesa').reduce((s,t)=>s+t.valor,0);
  const totR = list.filter(t=>t.tipo==='receita').reduce((s,t)=>s+t.valor,0);
  document.getElementById('lista-lancamentos').innerHTML =
    `<div class="d-flex gap-3 mb-3">
      <span class="text-danger small"><i class="bi bi-arrow-up me-1"></i>Despesas: <strong>${fmt(totD)}</strong></span>
      <span class="text-success small"><i class="bi bi-arrow-down me-1"></i>Receitas: <strong>${fmt(totR)}</strong></span>
    </div>` +
    list.map(t => `
      <div class="item-row d-flex align-items-center gap-3">
        <div class="flex-shrink-0">${SI[t.tipo]||''}</div>
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <strong>${esc(t.descricao)}</strong>
            <span class="badge-tipo ${TIPO_BADGE[t.categoria]||'badge-outros'}">${TIPO_LABEL[t.categoria]||t.categoria}</span>
            ${t.conta_bancaria_nome?`<small class="text-muted"><i class="bi bi-bank me-1"></i>${esc(t.conta_bancaria_nome)}</small>`:''}
          </div>
          <div class="text-muted small">${fmtData(t.data)}${t.observacao?' · '+esc(t.observacao):''}</div>
        </div>
        <div class="text-end flex-shrink-0">
          <div class="fw-semibold ${t.tipo==='despesa'?'text-danger':'text-success'}">${t.tipo==='despesa'?'-':'+'} ${fmt(t.valor)}</div>
          <button class="btn btn-link btn-sm text-danger p-0" onclick="removerTransacao(${t.id},event)"><i class="bi bi-trash"></i></button>
        </div>
      </div>`).join('');
}

async function removerTransacao(id,evt) {
  evt.stopPropagation();
  if (!confirm('Remover este lançamento?')) return;
  await api(`/transacoes/${id}`,'DELETE');
  toast('Lançamento removido','warning'); carregarLancamentos(); carregarDashboard();
}

// ─── ORÇAMENTOS ──────────────────────────────────────────────────────────────
async function carregarOrcamentosProgresso() {
  const mesRef = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  const data = await api(`/orcamentos/progresso?mes=${mesRef}`);
  const el = document.getElementById('dashboard-orcamentos');
  if (!data||data.length===0) { el.innerHTML=''; return; }

  const barras = data.map(o => {
    const cor = o.status==='vermelho'?'bg-danger':o.status==='amarelo'?'bg-warning':'bg-success';
    const pct = Math.min(100,o.percentual);
    return `<div class="d-flex align-items-center gap-2 mb-2">
      <span style="min-width:110px;font-size:.8rem;text-align:right" class="text-muted">${TIPO_LABEL[o.categoria]||o.categoria}</span>
      <div class="flex-grow-1 progress" style="height:10px;border-radius:5px">
        <div class="progress-bar ${cor}" style="width:${pct}%" title="${fmt(o.gasto_atual)} de ${fmt(o.limite)}"></div>
      </div>
      <span style="min-width:42px;font-size:.75rem" class="text-muted text-end">${o.percentual.toFixed(0)}%</span>
    </div>`;
  }).join('');

  el.innerHTML = `<div class="card card-resumo p-3 mb-3">
    <div class="section-title mb-2">Orçamento por categoria</div>
    ${barras}
    <div class="text-end mt-1"><a href="#" class="small text-muted" onclick="mostrarAba('relatorios',document.querySelectorAll('#abas-principais .nav-link')[6]);return false;">Ver detalhes →</a></div>
  </div>`;
}

function abrirModalOrcamento() {
  document.getElementById('orc-categoria').value = 'alimentacao';
  document.getElementById('orc-limite').value = '';
  document.getElementById('orc-recorrente').checked = true;
  new bootstrap.Modal(document.getElementById('modalOrcamento')).show();
}

async function salvarOrcamento() {
  const cat    = document.getElementById('orc-categoria').value;
  const limite = parseFloat(document.getElementById('orc-limite').value);
  const rec    = document.getElementById('orc-recorrente').checked;
  const mesRef = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  if (!limite) { toast('Informe o limite','danger'); return; }
  await api('/orcamentos','POST',{categoria:cat,limite,mes_referencia:rec?null:mesRef});
  bootstrap.Modal.getInstance(document.getElementById('modalOrcamento')).hide();
  toast('Orçamento salvo!','success');
  carregarOrcamentosProgresso(); renderizarRelatorioOrcamentos();
}

async function removerOrcamento(id,evt) {
  evt.stopPropagation();
  if (!confirm('Remover este orçamento?')) return;
  await api(`/orcamentos/${id}`,'DELETE');
  toast('Orçamento removido','warning');
  carregarOrcamentosProgresso(); renderizarRelatorioOrcamentos();
}

// ─── RELATÓRIOS ──────────────────────────────────────────────────────────────
async function carregarRelatorios() {
  const data = await api(`/relatorio?ano=${anoAtual}`);
  if (!data) return;
  const labels = data.meses.map(m=>MESES[parseInt(m.split('-')[1])-1].slice(0,3));
  ['chart-barras','chart-rosca','chart-linha'].forEach(id=>{if(charts[id]){charts[id].destroy();delete charts[id];}});

  charts['chart-barras'] = new Chart(document.getElementById('chart-barras'),{
    type:'bar', data:{labels,datasets:[
      {label:'Entradas',data:data.entradas,backgroundColor:'#4CAF5088'},
      {label:'Saídas',data:data.saidas,backgroundColor:'#F4433688'},
      {label:'Cartão',data:data.cartao,backgroundColor:'#FF980088'},
    ]}, options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true}}}
  });

  const porTipo = data.por_tipo||{};
  const tLabels = Object.keys(porTipo).map(k=>TIPO_LABEL[k]||k);
  const tVals   = Object.values(porTipo);
  const cores   = ['#1565C0','#C62828','#7B1FA2','#F57F17','#00695C','#E65100','#3949AB','#2E7D32','#546E7A','#BF360C','#880E4F'];
  charts['chart-rosca'] = new Chart(document.getElementById('chart-rosca'),{
    type:'doughnut', data:{labels:tLabels.length?tLabels:['Sem dados'],
      datasets:[{data:tVals.length?tVals:[1],backgroundColor:tVals.length?cores.slice(0,tLabels.length):['#eee']}]},
    options:{responsive:true,plugins:{legend:{position:'bottom'}}}
  });

  charts['chart-linha'] = new Chart(document.getElementById('chart-linha'),{
    type:'line', data:{labels,datasets:[{label:'Saldo',data:data.saldo,borderColor:'#1565C0',backgroundColor:'#1565C022',fill:true,tension:.3}]},
    options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:false}}}
  });

  renderizarRelatorioOrcamentos();
}

async function renderizarRelatorioOrcamentos() {
  const mesRef = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  const data = await api(`/orcamentos/progresso?mes=${mesRef}`);
  const el = document.getElementById('relatorio-orcamentos');
  if (!el) return;
  if (!data||data.length===0) { el.innerHTML='<p class="text-muted small">Nenhum orçamento configurado. Clique em "Novo orçamento" para começar.</p>'; return; }
  el.innerHTML = data.map(o=>{
    const cor = o.status==='vermelho'?'danger':o.status==='amarelo'?'warning':'success';
    const pct = Math.min(100,o.percentual);
    return `<div class="d-flex align-items-center gap-3 mb-3">
      <div style="min-width:120px"><span class="badge-tipo ${TIPO_BADGE[o.categoria]||'badge-outros'}">${TIPO_LABEL[o.categoria]||o.categoria}</span></div>
      <div class="flex-grow-1">
        <div class="progress" style="height:12px"><div class="progress-bar bg-${cor}" style="width:${pct}%"></div></div>
        <div class="d-flex justify-content-between mt-1">
          <small class="text-muted">${fmt(o.gasto_atual)} gastos</small>
          <small class="text-muted">Limite: ${fmt(o.limite)}</small>
        </div>
      </div>
      <span class="badge bg-${cor}" style="min-width:50px;text-align:center">${o.percentual.toFixed(0)}%</span>
      <button class="btn btn-link btn-sm text-danger p-0" onclick="removerOrcamento(${o.id},event)" title="Remover"><i class="bi bi-trash"></i></button>
    </div>`;
  }).join('');
}

// ─── HISTÓRICO ────────────────────────────────────────────────────────────────
async function carregarHistorico() {
  const mesRef = `${anoAtual}-${String(mesAtual).padStart(2,'0')}`;
  const [pags,recs] = await Promise.all([api(`/pagamentos?mes=${mesRef}`),api(`/recebimentos?mes=${mesRef}`)]);

  const elP = document.getElementById('lista-hist-pagamentos');
  if (!pags||pags.length===0) { elP.innerHTML=vazio(); }
  else {
    const tot = pags.reduce((s,p)=>s+p.valor_pago,0);
    elP.innerHTML = `<div class="text-muted small mb-2">Total: <strong class="text-danger">${fmt(tot)}</strong></div>`+
      pags.map(p=>`<div class="item-row d-flex align-items-center gap-3">
        <i class="bi bi-check-circle-fill status-icon status-pago flex-shrink-0"></i>
        <div class="flex-grow-1"><div class="fw-semibold">${esc(p.conta_nome)}</div><div class="text-muted small">${fmtData(p.data_pagamento)}${p.observacao?' · '+esc(p.observacao):''}</div></div>
        <div class="text-end flex-shrink-0"><div class="fw-semibold text-danger">${fmt(p.valor_pago)}</div>
        <button class="btn btn-link btn-sm text-secondary p-0" onclick="desfazerPagamento(${p.id},event)"><i class="bi bi-arrow-counterclockwise"></i></button></div>
      </div>`).join('');
  }

  const elR = document.getElementById('lista-hist-recebimentos');
  if (!recs||recs.length===0) { elR.innerHTML=vazio(); }
  else {
    const tot = recs.reduce((s,r)=>s+r.valor_recebido,0);
    elR.innerHTML = `<div class="text-muted small mb-2">Total: <strong class="text-success">${fmt(tot)}</strong></div>`+
      recs.map(r=>`<div class="item-row d-flex align-items-center gap-3">
        <i class="bi bi-check-circle-fill status-icon status-recebido flex-shrink-0"></i>
        <div class="flex-grow-1"><div class="fw-semibold">${esc(r.receita_nome)}</div><div class="text-muted small">${fmtData(r.data_recebimento)}${r.observacao?' · '+esc(r.observacao):''}</div></div>
        <div class="text-end flex-shrink-0"><div class="fw-semibold text-success">${fmt(r.valor_recebido)}</div>
        <button class="btn btn-link btn-sm text-secondary p-0" onclick="desfazerRecebimento(${r.id},event)"><i class="bi bi-arrow-counterclockwise"></i></button></div>
      </div>`).join('');
  }
}

async function desfazerPagamento(id,evt) {
  evt.stopPropagation();
  if (!confirm('Desfazer pagamento?')) return;
  await api(`/pagamentos/${id}`,'DELETE');
  toast('Desfeito','warning'); carregarHistorico(); carregarDashboard();
}

async function desfazerRecebimento(id,evt) {
  evt.stopPropagation();
  if (!confirm('Desfazer recebimento?')) return;
  await api(`/recebimentos/${id}`,'DELETE');
  toast('Desfeito','warning'); carregarHistorico(); carregarDashboard();
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
async function api(path, method='GET', body=null) {
  const opts = {method, headers:{'Content-Type':'application/json'}};
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(API+path, opts);
    if (!res.ok) { const e=await res.json().catch(()=>{}); toast(e?.detail||`Erro ${res.status}`,'danger'); return null; }
    if (res.status===204) return {ok:true};
    return await res.json();
  } catch(e) { toast('Servidor indisponível','danger'); return null; }
}

function fmt(v) {
  if (v==null) return '–';
  return 'R$ '+Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function fmtData(d) { if(!d)return'–'; const[y,m,day]=d.split('-'); return`${day}/${m}/${y}`; }
function esc(s) { return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function vazio() { return'<div class="text-center text-muted py-5"><i class="bi bi-inbox fs-2 d-block mb-2"></i>Nenhum registro</div>'; }
function setLoading(id) { document.getElementById(id).innerHTML='<div class="text-center text-muted py-5"><div class="spinner-border spinner-border-sm"></div></div>'; }

function toast(msg, tipo='success') {
  const id='toast-'+Date.now();
  const c={success:'bg-success',danger:'bg-danger',warning:'bg-warning text-dark'};
  const el=document.createElement('div');
  el.id=id; el.className=`toast align-items-center text-white ${c[tipo]} border-0 mb-2 show`;
  el.setAttribute('role','alert');
  el.innerHTML=`<div class="d-flex"><div class="toast-body">${esc(msg)}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="document.getElementById('${id}').remove()"></button></div>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(()=>el.remove(),4000);
}

// ─── REGRAS DE CLASSIFICAÇÃO ──────────────────────────────────────────────────

const DEFAULT_RULES = [
  // TRANSPORTE
  {kw:'UBER',cat:'transporte'},{kw:'99POP',cat:'transporte'},{kw:'99APP',cat:'transporte'},
  {kw:'CABIFY',cat:'transporte'},{kw:'SHELL',cat:'transporte'},{kw:'IPIRANGA',cat:'transporte'},
  {kw:'PETROBRAS',cat:'transporte'},{kw:'POSTO ',cat:'transporte'},{kw:'COMBUSTIVEL',cat:'transporte'},
  {kw:'COMBUSTÍVEL',cat:'transporte'},{kw:'PEDAGIO',cat:'transporte'},{kw:'PEDÁGIO',cat:'transporte'},
  {kw:'ESTACIONAMENTO',cat:'transporte'},{kw:'METRÔ',cat:'transporte'},{kw:'METRO ',cat:'transporte'},
  {kw:'ONIBUS',cat:'transporte'},{kw:'ÔNIBUS',cat:'transporte'},{kw:'PASSAGEM',cat:'transporte'},
  // RESTAURANTE
  {kw:'IFOOD',cat:'restaurante'},{kw:'RAPPI',cat:'restaurante'},{kw:'JAMES DELIVERY',cat:'restaurante'},
  {kw:'MCDONALDS',cat:'restaurante'},{kw:'MC DONALD',cat:'restaurante'},
  {kw:'BURGER',cat:'restaurante'},{kw:'BURGUER',cat:'restaurante'},{kw:'PIZZA',cat:'restaurante'},
  {kw:'LANCHONETE',cat:'restaurante'},{kw:'RESTAURANTE',cat:'restaurante'},
  {kw:'PADARIA',cat:'restaurante'},{kw:'CHURRASCARIA',cat:'restaurante'},
  {kw:'SUSHI',cat:'restaurante'},{kw:'MADERO',cat:'restaurante'},{kw:'BOBS ',cat:'restaurante'},
  {kw:'SUBWAY',cat:'restaurante'},{kw:'KFC',cat:'restaurante'},{kw:'HABIBS',cat:'restaurante'},
  // MERCADO
  {kw:'CARREFOUR',cat:'mercado'},{kw:'EXTRA ',cat:'mercado'},{kw:'PAO DE ACUCAR',cat:'mercado'},
  {kw:'PÃO DE AÇÚCAR',cat:'mercado'},{kw:'ASSAI',cat:'mercado'},{kw:'ATACADAO',cat:'mercado'},
  {kw:'ATACADÃO',cat:'mercado'},{kw:'SUPERMERCADO',cat:'mercado'},{kw:'MERCADINHO',cat:'mercado'},
  {kw:'HORTIFRUTI',cat:'mercado'},{kw:'HORTIFRUTTI',cat:'mercado'},{kw:'BISTEK',cat:'mercado'},
  {kw:'SENDAS',cat:'mercado'},{kw:'PREZUNIC',cat:'mercado'},{kw:'MUNDIAL ',cat:'mercado'},
  // SAÚDE
  {kw:'FARMACIA',cat:'saude'},{kw:'FARMÁCIA',cat:'saude'},{kw:'DROGARIA',cat:'saude'},
  {kw:'DROGA ',cat:'saude'},{kw:'RAIA ',cat:'saude'},{kw:'ULTRAFARMA',cat:'saude'},
  {kw:'HOSPITAL',cat:'saude'},{kw:'CLINICA',cat:'saude'},{kw:'CLÍNICA',cat:'saude'},
  {kw:'UNIMED',cat:'saude'},{kw:'AMIL',cat:'saude'},{kw:'SULAMERICA',cat:'saude'},
  {kw:'PLANO SAUDE',cat:'saude'},{kw:'PLANO SAÚDE',cat:'saude'},{kw:'LABORATORIO',cat:'saude'},
  {kw:'LABORATÓRIO',cat:'saude'},{kw:'DENTIST',cat:'saude'},{kw:'ODONTO',cat:'saude'},
  // MORADIA
  {kw:'ALUGUEL',cat:'moradia'},{kw:'CONDOMINIO',cat:'moradia'},{kw:'CONDOMÍNIO',cat:'moradia'},
  {kw:'SABESP',cat:'moradia'},{kw:'ENEL ',cat:'moradia'},{kw:'LIGHT ',cat:'moradia'},
  {kw:'COPEL',cat:'moradia'},{kw:'CEMIG',cat:'moradia'},{kw:'IPTU',cat:'moradia'},
  {kw:'INTERNET',cat:'moradia'},{kw:'VIVO ',cat:'moradia'},{kw:'CLARO ',cat:'moradia'},
  {kw:'TIM ',cat:'moradia'},{kw:'OI ',cat:'moradia'},{kw:'NET ',cat:'moradia'},
  {kw:'AGUA ',cat:'moradia'},{kw:'GAS ',cat:'moradia'},{kw:'GÁS ',cat:'moradia'},
  // EDUCAÇÃO
  {kw:'ESCOLA',cat:'educacao'},{kw:'FACULDADE',cat:'educacao'},{kw:'UNIVERSIDADE',cat:'educacao'},
  {kw:'ANHANGUERA',cat:'educacao'},{kw:'ESTÁCIO',cat:'educacao'},{kw:'ESTACIO',cat:'educacao'},
  {kw:'SENAC',cat:'educacao'},{kw:'SENAI',cat:'educacao'},{kw:'CURSO ',cat:'educacao'},
  {kw:'MENSALIDADE',cat:'educacao'},{kw:'MATRICULA',cat:'educacao'},{kw:'MATRÍCULA',cat:'educacao'},
  // LAZER
  {kw:'NETFLIX',cat:'lazer'},{kw:'SPOTIFY',cat:'lazer'},{kw:'AMAZON PRIME',cat:'lazer'},
  {kw:'DISNEY',cat:'lazer'},{kw:'HBO',cat:'lazer'},{kw:'DEEZER',cat:'lazer'},
  {kw:'STEAM',cat:'lazer'},{kw:'PLAYSTATION',cat:'lazer'},{kw:'XBOX',cat:'lazer'},
  {kw:'CINEMA',cat:'lazer'},{kw:'INGRESSO',cat:'lazer'},{kw:'SYMPLA',cat:'lazer'},
  {kw:'YOUTUBE PREMIUM',cat:'lazer'},{kw:'PRIME VIDEO',cat:'lazer'},
  // VESTUÁRIO
  {kw:'ZARA',cat:'vestuario'},{kw:'RENNER',cat:'vestuario'},{kw:'RIACHUELO',cat:'vestuario'},
  {kw:'MARISA ',cat:'vestuario'},{kw:'HERING',cat:'vestuario'},{kw:'NIKE ',cat:'vestuario'},
  {kw:'ADIDAS',cat:'vestuario'},{kw:'CENTAURO',cat:'vestuario'},{kw:'NETSHOES',cat:'vestuario'},
  // SALÁRIO (receita)
  {kw:'SALÁRIO',cat:'salario'},{kw:'SALARIO',cat:'salario'},{kw:'FOLHA PGTO',cat:'salario'},
  {kw:'ADIANTAMENTO SALARIO',cat:'salario'},{kw:'ADIANTAMENTO SALÁRIO',cat:'salario'},
  // INVESTIMENTO (receita)
  {kw:'CDB',cat:'investimento'},{kw:'TESOURO',cat:'investimento'},{kw:'RENDA FIXA',cat:'investimento'},
  {kw:'NUINVEST',cat:'investimento'},{kw:'XP INVESTIMENTOS',cat:'investimento'},
  {kw:'JUROS',cat:'investimento'},{kw:'RENDIMENTO',cat:'investimento'},
];

const RULES_KEY = 'categRules_v1';

function loadRules() {
  try {
    const s = localStorage.getItem(RULES_KEY);
    if (s) return JSON.parse(s);
  } catch(e) {}
  return [...DEFAULT_RULES];
}

function saveRules(rules) {
  localStorage.setItem(RULES_KEY, JSON.stringify(rules));
}

function autoCategoria(descricao) {
  const rules = loadRules();
  const up = descricao.toUpperCase();
  for (const r of rules) {
    if (up.includes(r.kw.toUpperCase())) return r.cat;
  }
  return 'outros';
}

// ── Gerenciador de regras ──────────────────────────────────────────────────

const CAT_LABELS = {
  moradia:'Moradia',alimentacao:'Alimentação',transporte:'Transporte',saude:'Saúde',
  lazer:'Lazer',educacao:'Educação',vestuario:'Vestuário',servicos:'Serviços',
  restaurante:'Restaurante',mercado:'Mercado',salario:'Salário',cliente:'Cliente',
  aluguel:'Aluguel',investimento:'Investimento',bonus:'Bônus',outros:'Outros',
};

function abrirRegras() {
  _renderRegras();
  new bootstrap.Modal(document.getElementById('modalRegras')).show();
}

function _renderRegras() {
  const rules = loadRules();
  const div = document.getElementById('reg-lista');
  if (!rules.length) { div.innerHTML = '<p class="text-muted small">Nenhuma regra cadastrada.</p>'; return; }
  div.innerHTML = `<table class="table table-sm table-hover mb-0">
    <thead class="table-light"><tr><th>Palavra-chave</th><th>Categoria</th><th style="width:40px"></th></tr></thead>
    <tbody>` +
    rules.map((r,i)=>`<tr>
      <td><code>${esc(r.kw)}</code></td>
      <td><span class="badge bg-secondary">${esc(CAT_LABELS[r.cat]||r.cat)}</span></td>
      <td><button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="removerRegra(${i})"><i class="bi bi-x"></i></button></td>
    </tr>`).join('') +
    `</tbody></table>`;
}

function adicionarRegra() {
  const kw  = document.getElementById('reg-kw').value.trim().toUpperCase();
  const cat = document.getElementById('reg-cat').value;
  if (!kw) { toast('Digite uma palavra-chave','warning'); return; }
  const rules = loadRules();
  if (rules.some(r=>r.kw.toUpperCase()===kw)) { toast('Palavra-chave já existe','warning'); return; }
  rules.unshift({kw, cat});   // prioridade máxima: vai para o topo
  saveRules(rules);
  document.getElementById('reg-kw').value = '';
  _renderRegras();
  toast(`Regra adicionada: ${kw} → ${CAT_LABELS[cat]||cat}`,'success');
}

function removerRegra(idx) {
  const rules = loadRules();
  rules.splice(idx, 1);
  saveRules(rules);
  _renderRegras();
}

function restaurarRegras() {
  if (!confirm('Restaurar todas as regras padrão? As regras customizadas serão perdidas.')) return;
  saveRules([...DEFAULT_RULES]);
  _renderRegras();
  toast('Regras restauradas','success');
}

function fecharRegras() {
  bootstrap.Modal.getInstance(document.getElementById('modalRegras')).hide();
  // se preview estiver aberto, reclassifica com as novas regras
  if (_importData.length) _renderPreviewImport();
}

// ─── IMPORTAR EXTRATO ─────────────────────────────────────────────────────────

let _importData = [];

const CATS_ALL = [
  {v:'moradia',l:'Moradia'},{v:'alimentacao',l:'Alimentação'},{v:'transporte',l:'Transporte'},
  {v:'saude',l:'Saúde'},{v:'lazer',l:'Lazer'},{v:'educacao',l:'Educação'},
  {v:'vestuario',l:'Vestuário'},{v:'servicos',l:'Serviços'},{v:'restaurante',l:'Restaurante'},
  {v:'mercado',l:'Mercado'},{v:'salario',l:'Salário'},{v:'cliente',l:'Cliente'},
  {v:'aluguel',l:'Aluguel'},{v:'investimento',l:'Investimento'},{v:'bonus',l:'Bônus'},
  {v:'outros',l:'Outros'}
];
const CATS_OPTS = CATS_ALL.map(c=>`<option value="${c.v}">${c.l}</option>`).join('');

async function abrirImportar() {
  // carrega contas bancárias
  if (!contasBancariasCache.length) {
    const r = await api('/contas-bancarias');
    if (r) contasBancariasCache = r;
  }
  const sel = document.getElementById('imp-conta-bancaria');
  sel.innerHTML = '<option value="">— nenhuma —</option>' +
    contasBancariasCache.map(c=>`<option value="${c.id}">${esc(c.nome)}</option>`).join('');

  // reset
  document.getElementById('imp-step1').classList.remove('d-none');
  document.getElementById('imp-step2').classList.add('d-none');
  document.getElementById('imp-loading').classList.add('d-none');
  document.getElementById('imp-btn-confirmar').classList.add('d-none');
  document.getElementById('imp-file').value = '';
  document.getElementById('imp-dropzone').style.borderColor = '#adb5bd';
  _importData = [];

  new bootstrap.Modal(document.getElementById('modalImportar')).show();
}

function importarDrop(e) {
  e.preventDefault();
  e.currentTarget.style.borderColor = '#adb5bd';
  const file = e.dataTransfer.files[0];
  if (file) importarArquivo(file);
}

async function importarArquivo(file) {
  if (!file) return;

  document.getElementById('imp-step1').classList.add('d-none');
  document.getElementById('imp-loading').classList.remove('d-none');

  const fd = new FormData();
  fd.append('file', file);
  const contaId = document.getElementById('imp-conta-bancaria').value;
  if (contaId) fd.append('conta_bancaria_id', contaId);

  try {
    const res = await fetch(API + '/importar-extrato', { method:'POST', body:fd });
    const data = await res.json();

    document.getElementById('imp-loading').classList.add('d-none');

    if (!res.ok) {
      toast(data.detail || 'Erro ao processar arquivo', 'danger');
      voltarImport(); return;
    }

    _importData = data.transacoes || [];

    if (_importData.length === 0) {
      toast('Nenhuma transação encontrada. Verifique o formato do arquivo.', 'warning');
      voltarImport(); return;
    }

    _renderPreviewImport();
    document.getElementById('imp-step2').classList.remove('d-none');
    document.getElementById('imp-btn-confirmar').classList.remove('d-none');
    document.getElementById('imp-resumo').innerHTML =
      `<i class="bi bi-check-circle-fill text-success me-1"></i>${_importData.length} transações encontradas em <em>${esc(data.arquivo)}</em>`;

  } catch(err) {
    document.getElementById('imp-loading').classList.add('d-none');
    toast('Erro ao processar arquivo', 'danger');
    voltarImport();
  }
}

function _renderPreviewImport() {
  // aplica auto-classificação em cada transação
  _importData.forEach(t => {
    if (t.categoria === 'outros' || !t.categoria) {
      t.categoria = autoCategoria(t.descricao);
    }
  });

  const autoCount = _importData.filter(t=>t.categoria!=='outros').length;

  document.getElementById('imp-preview-body').innerHTML = _importData.map((t,i)=>`
    <tr>
      <td><input type="checkbox" class="imp-chk" data-i="${i}" checked></td>
      <td class="text-nowrap small">${fmtData(t.data)}</td>
      <td><small>${esc(t.descricao)}</small></td>
      <td><span class="badge ${t.tipo==='receita'?'bg-success':'bg-danger'} text-capitalize">${t.tipo}</span></td>
      <td class="text-nowrap fw-semibold small ${t.tipo==='receita'?'text-success':'text-danger'}">${fmt(t.valor)}</td>
      <td>
        <select class="form-select form-select-sm imp-cat" data-i="${i}" style="min-width:110px">
          ${CATS_OPTS}
        </select>
      </td>
    </tr>`).join('');

  // pré-seleciona categorias (auto-classificadas ou padrão)
  document.querySelectorAll('.imp-cat').forEach(s=>{
    s.value = _importData[parseInt(s.dataset.i)].categoria || 'outros';
  });

  // mostra quantas foram classificadas automaticamente
  if (autoCount > 0) {
    const resumo = document.getElementById('imp-resumo');
    resumo.innerHTML += ` <span class="badge bg-primary ms-2"><i class="bi bi-magic me-1"></i>${autoCount} classificadas automaticamente</span>`;
  }
}

function selecionarTodosImport(cb) {
  document.querySelectorAll('.imp-chk').forEach(c=>c.checked=cb.checked);
}

function voltarImport() {
  document.getElementById('imp-step1').classList.remove('d-none');
  document.getElementById('imp-step2').classList.add('d-none');
  document.getElementById('imp-loading').classList.add('d-none');
  document.getElementById('imp-btn-confirmar').classList.add('d-none');
}

async function confirmarImportacao() {
  const selecionados = [];
  document.querySelectorAll('.imp-chk:checked').forEach(cb=>{
    const i = parseInt(cb.dataset.i);
    const t = {..._importData[i]};
    const catEl = document.querySelector(`.imp-cat[data-i="${i}"]`);
    t.categoria = catEl ? catEl.value : 'outros';
    selecionados.push(t);
  });

  if (!selecionados.length) { toast('Selecione ao menos uma transação','warning'); return; }

  const btn = document.getElementById('imp-btn-confirmar');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Importando...';

  const contaId = document.getElementById('imp-conta-bancaria').value;
  const res = await api('/importar-extrato/confirmar','POST',{
    transacoes: selecionados,
    conta_bancaria_id: contaId ? parseInt(contaId) : null
  });

  btn.disabled = false;
  btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Importar selecionados';

  if (res?.salvos !== undefined) {
    bootstrap.Modal.getInstance(document.getElementById('modalImportar')).hide();
    toast(`✅ ${res.salvos} transações importadas com sucesso!`,'success');
    recarregarAbaAtual();
  }
}
