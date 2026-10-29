import { DiagnosticOption, DiagnosticQuestion, DIAGNOSTIC_QUESTIONS } from '../data/diagnostic';
import { Vendor } from '../data/users';
import { LogisticsConfig } from '../data/logistics';
import { ShelfConfig, ShelfCategory, ShelfItem, ShelfPeriod } from '../data/shelf';
import { DiagnosticResult, DiagnosticScores, AISummary, LeadInfo, LeadRecord } from '../types';
import { formatBRL, formatDateTime, onlyDigits } from './formatters';

export function calculateDiagnostic(
  answers: Record<string, any>,
  questions: DiagnosticQuestion[] = DIAGNOSTIC_QUESTIONS,
  vendors: Vendor[] = []
): DiagnosticResult {
  const dims: DiagnosticScores = { P: 0, U: 0, A: 0, R: 0 };
  const wt: DiagnosticScores = { P: 0, U: 0, A: 0, R: 0 };
  const tags: string[] = [];

  questions.forEach(q => {
    const v = answers[q.id];
    if (v === undefined) return;
    const opt: DiagnosticOption = answers[q.id + '_o'];
    if (opt?.tags) tags.push(...opt.tags);

    Object.entries(q.dims || {}).forEach(([d, w]) => {
      const dimKey = d as keyof DiagnosticScores;
      const weight = w || 0;
      if (dimKey === 'R') {
        dims.R += (4 - v) * weight;
        wt.R += 3 * weight;
      } else {
        dims[dimKey] += v * weight;
        wt[dimKey] += 3 * weight;
      }
    });
  });

  const normDim = (d: keyof DiagnosticScores) => (wt[d] > 0 ? Math.round((dims[d] / wt[d]) * 100) : 50);

  const scores: DiagnosticScores = {
    P: normDim('P'),
    U: normDim('U'),
    A: normDim('A'),
    R: normDim('R'),
  };

  const comp = Math.round(scores.P * 0.35 + scores.U * 0.25 + scores.A * 0.25 + scores.R * 0.15);
  const cat: 'A' | 'B' | 'C' = comp >= 70 ? 'A' : comp >= 45 ? 'B' : 'C';

  // Vendor assignment logic matching original
  const vendorId =
    cat === 'A' || cat === 'B'
      ? vendors[0]?.id || 'felipe'
      : vendors[2]?.id || vendors[0]?.id || 'camila';

  return {
    scores,
    comp,
    cat,
    tags: [...new Set(tags)],
    vendor: vendorId,
  };
}

export function generateAISummary(info: LeadInfo, diagResult: DiagnosticResult): AISummary {
  const t = diagResult.tags || [];
  const s = diagResult.scores || { P: 0, U: 0, A: 0, R: 0 };
  const opps: { type: 'hot' | 'warm' | 'cool' | 'risk'; text: string }[] = [];
  const alerts: { type: 'hot' | 'warm' | 'cool' | 'risk'; text: string }[] = [];

  if (t.includes('switch')) opps.push({ type: 'hot', text: 'Lead insatisfeito com lab atual — excelente oportunidade de migração.' });
  if (t.includes('urgente')) opps.push({ type: 'hot', text: 'Urgência imediata — priorizar resposta rápida do vendedor.' });
  if (t.includes('acreditado')) opps.push({ type: 'hot', text: 'Necessita de lab acreditado — reforçar diferenciais técnicos e ISO.' });
  if (t.includes('recorrente')) opps.push({ type: 'warm', text: 'Potencial de recorrência contínua — sugerir proposta contrato guarda-chuva.' });

  if (t.includes('risco-preco')) alerts.push({ type: 'risk', text: 'Sensibilidade a preço — defender valor técnico, prazos e confiabilidade.' });
  if (t.includes('frio')) alerts.push({ type: 'cool', text: 'Lead em fase de pesquisa — nutrir periodicamente e acompanhar.' });
  if (!info.site) alerts.push({ type: 'cool', text: 'Sem site informado — pesquisar empresa e CNPJ na fase de qualificação.' });

  if (!opps.length) opps.push({ type: 'cool', text: 'Seguir fluxo padrão de qualificação e apresentação institucional.' });

  const approach =
    diagResult.cat === 'A'
      ? 'Abordagem consultiva prioritária, ágil e personalizada por diretor/gerente.'
      : diagResult.cat === 'B'
      ? 'Abordagem ativa com apresentação de diferenciais, proposta clara e follow-up estruturado.'
      : 'Nutrição comercial consultiva e acompanhamento de médio prazo.';

  return {
    summary: `A empresa <b>${info.empresa}</b> apresenta potencial <b>Classe ${diagResult.cat}</b> com score de <b>${diagResult.comp}%</b>. Porte/Potencial ${s.P}%, Urgência ${s.U}%, Aderência ${s.A}% e Risco comercial ${s.R}%.`,
    opps,
    alerts,
    approach,
  };
}

export function buildLeadWhatsAppMessage(lead: LeadRecord, ai: AISummary): string {
  const i = lead.info;
  const r = lead.resultado;
  const urg = lead.diag?.['prazo_o']?.t || 'Não informado';
  const sit = lead.diag?.['situacao_o']?.t || 'Não informado';
  const alerta = ai.opps && ai.opps[0] ? `\nAtenção: ${ai.opps[0].text}\n` : '';

  return (
    `*NOVO LEAD REGISTRADO*\n\n` +
    `*${i.empresa}*\n` +
    `Contato: ${i.nome}${i.cargo ? ` (${i.cargo})` : ''}\n` +
    (i.whatsapp ? `WhatsApp: ${i.whatsapp}\n` : '') +
    (i.email ? `E-mail: ${i.email}\n` : '') +
    `Segmento: ${i.segmento || 'Não informado'}\n` +
    `Análises: ${(i.analises || []).join(', ') || 'Não informado'}\n` +
    `Classificação: POTENCIAL ${r.cat} (Score: ${r.comp}%)\n` +
    `Urgência: ${urg}\n` +
    `Situação Atual: ${sit}\n` +
    (i.obs ? `Obs: ${i.obs}\n` : '') +
    alerta +
    `\nRegistrado por ${lead.operador} em ${formatDateTime(lead.ts)}`
  );
}

export interface ShelfCalculationResult {
  cat: ShelfCategory;
  items: ShelfItem[];
  per: ShelfPeriod;
  qtd: number;
  base: number;
  teores: number;
  unit: number;
  total: number;
  amostraGramas: number;
}

export function calculateShelfLife(
  shelfState: {
    catId: string;
    sel: string[];
    periodId: string;
    periodCustom: number;
  },
  config: ShelfConfig
): ShelfCalculationResult {
  const cat = config.cats.find(c => c.id === shelfState.catId) || config.cats[0] || { id: '', nome: '', base: 0 };
  const items = shelfState.sel.map(id => config.items.find(x => x.id === id)).filter(Boolean) as ShelfItem[];
  const per = config.periods.find(p => p.id === shelfState.periodId) || config.periods[0] || { id: '', nome: '', mult: 1 };
  const qtd = per.id === 'custom' ? Math.max(1, Number(shelfState.periodCustom) || 1) : Math.max(1, Number(per.mult) || 1);

  const base = Number(cat.base) || 0;
  const teores = items.reduce((a, b) => a + (Number(b.preco) || 0), 0);
  let unit = base + teores;
  unit += (unit * (Number(config.params.margem) || 0)) / 100;
  let total = unit * qtd;
  total -= (total * (Number(config.params.desconto) || 0)) / 100;

  return {
    cat,
    items,
    per,
    qtd,
    base,
    teores,
    unit,
    total,
    amostraGramas: Number(config.params.amostraGramas) || 350,
  };
}

export function buildShelfLifeWhatsAppMessage(
  res: ShelfCalculationResult,
  shelfState: { produto: string; cliente: string; obs?: string }
): string {
  let m = '';
  if (shelfState.cliente) m += `Olá, ${shelfState.cliente}! Segue a estimativa do estudo de shelf life:\n\n`;
  m +=
    `*ORÇAMENTO — ESTUDO DE SHELF LIFE*\n\n` +
    `Produto: ${shelfState.produto || 'não informado'}\n` +
    `Categoria: ${res.cat.nome}\n` +
    `Período: ${res.per.nome}\n` +
    `Tempos considerados: ${res.qtd}\n\n` +
    `*Composição do Custo*\n` +
    `Base da categoria: ${formatBRL(res.base)}\n` +
    `Teores (${res.items.length}): ${formatBRL(res.teores)}\n` +
    `Subtotal por tempo: ${formatBRL(res.unit)}\n\n` +
    `*Total estimado: ${formatBRL(res.total)}*\n\n` +
    `Amostras: considerar aproximadamente ${res.amostraGramas} g por tempo de estudo, salvo orientação técnica específica.`;

  if (shelfState.obs) m += `\n\nObs.: ${shelfState.obs}`;
  return m;
}

export interface LogisticsCalculationResult {
  kmIda: number;
  kmTotal: number;
  espera: number;
  subtotal: number;
  valor: number;
  final: number;
  rec: {
    nivel: 'ok' | 'alerta' | 'risco' | 'neutro';
    texto: string;
  };
}

export function calculateLogistics(
  logState: { kmIda: number | string; tempoEspera: number | string },
  config: LogisticsConfig
): LogisticsCalculationResult {
  const kmIda = Math.max(0, Number(logState.kmIda) || 0);
  const kmTotal = kmIda * (config.idaVolta ? 2 : 1);
  const espera = Math.max(0, Number(logState.tempoEspera) || 0);

  const subtotal = kmTotal * (Number(config.km) || 0) + (Number(config.taxaColeta) || 0) + espera * (Number(config.taxaEspera) || 0);
  let val = subtotal + (subtotal * (Number(config.margem) || 0)) / 100;
  val = Math.max(val, Number(config.minimo) || 0);

  const arr = Math.max(1, Number(config.arred) || 1);
  const final = kmIda ? Math.ceil(val / arr) * arr : 0;

  let rec: { nivel: 'ok' | 'alerta' | 'risco' | 'neutro'; texto: string } = {
    nivel: 'neutro',
    texto: 'Informe a distância de ida para calcular o custo.',
  };

  if (kmIda > 0) {
    if (kmIda <= config.limCurta) rec = { nivel: 'ok', texto: 'Coleta técnica altamente recomendada.' };
    else if (kmIda <= config.limNormal) rec = { nivel: 'ok', texto: 'Coleta técnica viável, validar disponibilidade da frota.' };
    else if (kmIda <= config.limGestao) rec = { nivel: 'alerta', texto: 'Distância elevada. Validar agenda e roteirização com a logística.' };
    else rec = { nivel: 'risco', texto: 'Distância acima do limite padrão de gestão. Requer aprovação especial.' };
  }

  return { kmIda, kmTotal, espera, subtotal, valor: val, final, rec };
}

export function buildLogisticsWhatsAppMessage(
  res: LogisticsCalculationResult,
  logState: { cliente: string; destino: string; obs?: string },
  config: LogisticsConfig
): string {
  let m = '';
  if (logState.cliente) m += `Olá, ${logState.cliente}!\n\n`;
  m +=
    `Segue estimativa de custos logísticos, considerando o deslocamento de um técnico PróLab até o seu endereço para realização da coleta de amostras.\n\n` +
    `*COLETA TÉCNICA PRÓLAB*\n\n` +
    `Origem: ${config.origemNome} — ${config.origem}\n` +
    `Destino: ${logState.destino || 'não informado'}\n` +
    `Distância considerada: ${res.kmTotal.toFixed(1)} km (ida e volta)\n\n` +
    `*Valor sugerido: ${formatBRL(res.final)}*\n\n` +
    `Recomendação: ${res.rec.texto}\n` +
    `${config.observacaoPadrao}`;

  if (logState.obs) m += `\n\nObs.: ${logState.obs}`;
  return m;
}

export async function lookupAddressByCEP(cep: string): Promise<{
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
} | null> {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}
