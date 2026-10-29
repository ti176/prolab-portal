import { DiagnosticOption, DiagnosticQuestion, DIAGNOSTIC_QUESTIONS } from '../data/diagnostic';
import { Vendor } from '../data/users';
import { LogisticsConfig } from '../data/logistics';
import { ShelfConfig, ShelfCategory, ShelfItem, ShelfPeriod } from '../data/shelf';
import { DiagnosticResult, DiagnosticScores, AISummary, LeadInfo, LeadRecord } from '../types';
import { formatBRL, formatDateTime, onlyDigits, normalizeText } from './formatters';

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

// ==========================================
// LOGÍSTICA & COLETA TÉCNICA (COMBUSTÍVEL, DISTÂNCIA, PEDÁGIO)
// ==========================================

export interface LogisticsCalculationResult {
  kmIda: number;
  kmTotal: number;
  espera: number;
  consumoKmLitro: number;
  litrosCombustivel: number;
  precoGasolina: number;
  custoCombustivel: number;
  custoPedagio: number;
  custoDesgaste: number;
  tempoViagemHoras: number;
  tempoTotalTecnico: number;
  custoHoraTecnica: number;
  custoKit: number;
  subtotal: number;
  valorComMargem: number;
  final: number;
  rec: {
    nivel: 'ok' | 'alerta' | 'risco' | 'neutro';
    texto: string;
  };
}

export function estimateTollRoundTrip(kmIda: number, destino = '', cep = ''): number {
  const km = Math.max(0, Number(kmIda) || 0);
  const dest = normalizeText(destino);
  const cleanCep = onlyDigits(cep);

  // If within Greater São Paulo core / under 35km, no toll
  if (km < 35) return 0;
  if (/osasco|barueri|carapicuiba|cotia|sao paulo|guarulhos|santo andre|sao bernardo|sao caetano|diadema/.test(dest) && km < 48) {
    return 0;
  }

  let oneWayToll = 0;
  if (/braganca|atibaia|extrema|mairipora/.test(dest) || /^129/.test(cleanCep)) {
    oneWayToll = 13.60; // Fernão Dias
  } else if (/campinas|jundiai|vinhedo|valinhos|indaiatuba/.test(dest) || /^13/.test(cleanCep)) {
    oneWayToll = 16.50; // Anhanguera / Bandeirantes
  } else if (/sorocaba|itu/.test(dest)) {
    oneWayToll = 15.80; // Castelo Branco
  } else if (/santos|guaruja|praia grande|cubatao|sao vicente/.test(dest) || /^11/.test(cleanCep)) {
    oneWayToll = 18.00; // Imigrantes / Anchieta
  } else if (km < 70) {
    oneWayToll = 9.00;
  } else if (km < 120) {
    oneWayToll = 16.00;
  } else if (km < 180) {
    oneWayToll = 26.00;
  } else {
    oneWayToll = 40.00;
  }

  return Math.round(oneWayToll * 2 * 100) / 100;
}

export function fallbackKmByCepCity(cep = '', destino = '', cidade = ''): number {
  const cleanCep = onlyDigits(cep);
  const txt = normalizeText(`${destino} ${cidade}`);

  const cityTable: [RegExp, number][] = [
    [/osasco/, 8],
    [/carapicuiba/, 10],
    [/barueri|alphaville|santana de parnaiba/, 18],
    [/cotia|vargem grande/, 25],
    [/sao paulo|capital|sp - sp/, 28],
    [/guarulhos/, 38],
    [/santo andre|sao bernardo|sao caetano|diadema|maua/, 45],
    [/mairipora/, 58],
    [/jundiai/, 60],
    [/atibaia/, 82],
    [/sorocaba/, 92],
    [/valinhos|vinhedo/, 92],
    [/santos|guaruja|praia grande/, 95],
    [/itu/, 96],
    [/campinas/, 98],
    [/indaiatuba/, 105],
    [/braganca paulista|braganca/, 108],
    [/sao jose dos campos/, 112],
    [/jacarei/, 115],
    [/taubate/, 150],
    [/sorocaba/, 95],
    [/piracicaba/, 145],
    [/ribeirao preto/, 315],
  ];

  for (const [pattern, km] of cityTable) {
    if (pattern.test(txt)) return km;
  }

  // CEP prefix fallback
  if (/^060|^061|^062/.test(cleanCep)) return 8;   // Osasco
  if (/^064|^065/.test(cleanCep)) return 18;        // Barueri / Santana de Parnaíba
  if (/^067/.test(cleanCep)) return 25;             // Cotia
  if (/^01|^02|^03|^04|^05|^08/.test(cleanCep)) return 28; // SP Capital
  if (/^07/.test(cleanCep)) return 38;             // Guarulhos
  if (/^09/.test(cleanCep)) return 45;             // ABC
  if (/^132/.test(cleanCep)) return 60;            // Jundiaí
  if (/^129/.test(cleanCep)) return 108;           // Bragança / Atibaia
  if (/^130|^131/.test(cleanCep)) return 98;       // Campinas
  if (/^11/.test(cleanCep)) return 95;             // Baixada Santista
  if (/^12/.test(cleanCep)) return 120;            // Vale do Paraíba

  return 35; // Default local metropolitan average
}

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;
  // Apply a standard 1.30 road circuity/traffic routing factor
  return Math.round(straightLine * 1.3 * 10) / 10;
}

export async function lookupAddressByCEP(cep: string): Promise<{
  cep: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  lat?: number;
  lon?: number;
  erro?: boolean;
} | null> {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (res.ok) {
      const data = await res.json();
      if (!data.erro) {
        return {
          cep: digits,
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          localidade: data.localidade || '',
          uf: data.uf || '',
        };
      }
    }
  } catch (e) {
    // fallback to BrasilAPI
  }

  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${digits}`);
    if (res.ok) {
      const b = await res.json();
      return {
        cep: digits,
        logradouro: b.street || '',
        bairro: b.neighborhood || '',
        localidade: b.city || '',
        uf: b.state || '',
        lat: b.location?.coordinates?.latitude ? Number(b.location.coordinates.latitude) : undefined,
        lon: b.location?.coordinates?.longitude ? Number(b.location.coordinates.longitude) : undefined,
      };
    }
  } catch (e2) {
    //
  }

  return null;
}

export async function calculateRouteDistance(
  cep: string,
  destinationAddress = '',
  config: LogisticsConfig
): Promise<{
  kmIda: number;
  pedagio: number;
  enderecoFormatado: string;
  cidade: string;
  uf: string;
  source: 'osrm' | 'haversine' | 'tabela';
}> {
  const cleanCep = onlyDigits(cep);
  let addrInfo = await lookupAddressByCEP(cleanCep);
  
  const rua = addrInfo?.logradouro || '';
  const bairro = addrInfo?.bairro || '';
  const cidade = addrInfo?.localidade || '';
  const uf = addrInfo?.uf || '';

  const partes = [rua, bairro, cidade ? `${cidade} - ${uf}` : '', cleanCep ? `CEP ${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}` : ''].filter(Boolean);
  const enderecoFormatado = destinationAddress.trim() || partes.join(', ');

  let lat = addrInfo?.lat;
  let lon = addrInfo?.lon;

  // Try geocoding with OpenStreetMap Nominatim if coords not yet present
  if ((!lat || !lon) && (rua || cidade)) {
    try {
      const searchTxt = encodeURIComponent(`${rua || ''}, ${cidade || ''}, ${uf || 'SP'}, Brasil`);
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=${searchTxt}`, {
        headers: { 'Accept': 'application/json' },
      });
      if (geoRes.ok) {
        const geoArr = await geoRes.json();
        if (Array.isArray(geoArr) && geoArr.length > 0) {
          lat = Number(geoArr[0].lat);
          lon = Number(geoArr[0].lon);
        }
      }
    } catch (_) {}
  }

  // 1. Try OSRM Real Driving Distance
  if (lat && lon) {
    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${config.origemLon},${config.origemLat};${lon},${lat}?overview=false`;
      const osrmRes = await fetch(osrmUrl);
      if (osrmRes.ok) {
        const osrmData = await osrmRes.json();
        const meters = osrmData?.routes?.[0]?.distance;
        if (meters && meters > 0) {
          const km = Math.round((meters / 1000) * 10) / 10;
          const pedagio = estimateTollRoundTrip(km, enderecoFormatado, cleanCep);
          return { kmIda: km, pedagio, enderecoFormatado, cidade, uf, source: 'osrm' };
        }
      }
    } catch (_) {}

    // 2. Fallback to Haversine with road circuity factor
    const havKm = haversineDistanceKm(config.origemLat, config.origemLon, lat, lon);
    const pedagio = estimateTollRoundTrip(havKm, enderecoFormatado, cleanCep);
    return { kmIda: havKm, pedagio, enderecoFormatado, cidade, uf, source: 'haversine' };
  }

  // 3. Fallback to City/CEP mapping
  const tableKm = fallbackKmByCepCity(cleanCep, enderecoFormatado, cidade);
  const pedagio = estimateTollRoundTrip(tableKm, enderecoFormatado, cleanCep);
  return { kmIda: tableKm, pedagio, enderecoFormatado, cidade, uf, source: 'tabela' };
}

export function calculateLogistics(
  params: {
    kmIda: number | string;
    tempoEspera?: number | string;
    pedagio?: number | string;
    precoGasolina?: number | string;
    consumoKmLitro?: number | string;
    incluirDesgaste?: boolean;
    incluirHoraTecnica?: boolean;
    incluirKitAmostragem?: boolean;
  },
  config: LogisticsConfig
): LogisticsCalculationResult {
  const kmIda = Math.max(0, Number(params.kmIda) || 0);
  const kmTotal = kmIda * (config.idaVolta ? 2 : 1);
  const espera = Math.max(0, Number(params.tempoEspera) || 0);

  // Gasolina & Consumo médio (9 km/L padrão ou customizado)
  const consumoKmLitro = Math.max(1, Number(params.consumoKmLitro) || config.consumoKmLitro || 9.0);
  const precoGasolina = Math.max(0, Number(params.precoGasolina) || config.precoGasolina || 6.20);
  const litrosCombustivel = kmTotal > 0 ? kmTotal / consumoKmLitro : 0;
  const custoCombustivel = litrosCombustivel * precoGasolina;

  // Pedágios
  const custoPedagio = Math.max(0, Number(params.pedagio) || 0);

  // Desgaste / Manutenção veicular (pneus, óleo, depreciação)
  const incluirDesgaste = params.incluirDesgaste !== false;
  const custoDesgaste = incluirDesgaste ? kmTotal * (Number(config.desgasteKm) || 0.40) : 0;

  // Hora técnica / Deslocamento e amostragem
  const incluirHoraTecnica = params.incluirHoraTecnica !== false;
  const tempoViagemHoras = kmTotal > 0 ? kmTotal / 50 : 0; // média 50 km/h
  const tempoTotalTecnico = tempoViagemHoras + espera;
  const custoHoraTecnica = incluirHoraTecnica ? tempoTotalTecnico * (Number(config.horaTecnica) || 50.00) : 0;

  // Kit de Coleta Esterilizada & Preservantes
  const incluirKitAmostragem = params.incluirKitAmostragem !== false;
  const custoKit = incluirKitAmostragem ? (Number(config.taxaKitAmostragem) || 35.00) : 0;

  // Subtotal dos custos diretos da coleta
  const subtotal = custoCombustivel + custoPedagio + custoDesgaste + custoHoraTecnica + custoKit;

  // Margem operacional
  let val = subtotal + (subtotal * (Number(config.margem) || 20)) / 100;
  const valorComMargem = val;

  // Valor Mínimo Operacional
  val = kmIda > 0 ? Math.max(val, Number(config.minimo) || 120) : 0;

  // Arredondamento comercial
  const arr = Math.max(1, Number(config.arred) || 10);
  const final = kmIda > 0 ? Math.ceil(val / arr) * arr : 0;

  let rec: { nivel: 'ok' | 'alerta' | 'risco' | 'neutro'; texto: string } = {
    nivel: 'neutro',
    texto: 'Digite o CEP ou a distância de ida para calcular o custo.',
  };

  if (kmIda > 0) {
    if (kmIda <= config.limCurta) {
      rec = { nivel: 'ok', texto: 'Coleta técnica local recomendada (Grande SP / Região Metropolitana).' };
    } else if (kmIda <= config.limNormal) {
      rec = { nivel: 'ok', texto: 'Coleta técnica viável, validar disponibilidade da agenda técnica.' };
    } else if (kmIda <= config.limGestao) {
      rec = { nivel: 'alerta', texto: 'Distância intermunicipal moderada. Rota com pedágios considerada.' };
    } else {
      rec = { nivel: 'risco', texto: 'Distância superior a 120 km. Avaliar viabilidade de envio de kit esterilizado pelos Correios/Sedex.' };
    }
  }

  return {
    kmIda,
    kmTotal,
    espera,
    consumoKmLitro,
    litrosCombustivel,
    precoGasolina,
    custoCombustivel,
    custoPedagio,
    custoDesgaste,
    tempoViagemHoras,
    tempoTotalTecnico,
    custoHoraTecnica,
    custoKit,
    subtotal,
    valorComMargem,
    final,
    rec,
  };
}

export function buildLogisticsWhatsAppMessage(
  res: LogisticsCalculationResult,
  logState: { cliente: string; destino: string; cep?: string; obs?: string },
  config: LogisticsConfig
): string {
  let m = '';
  if (logState.cliente) m += `Olá, ${logState.cliente}!\n\n`;
  m +=
    `Segue a estimativa de custos para *COLETA TÉCNICA DE AMOSTRAS*, considerando deslocamento de técnico habilitado PróLab até o local indicado:\n\n` +
    `*ROTA DA COLETA*\n` +
    `• Origem: ${config.origemNome} (${config.origem})\n` +
    `• Destino: ${logState.destino || 'não informado'}` + (logState.cep ? ` (CEP ${logState.cep})` : '') + `\n` +
    `• Distância percorrida: ${res.kmTotal.toFixed(1)} km (ida e volta inclusas)\n\n` +
    `*COMPOSIÇÃO DO INVESTIMENTO*\n` +
    `• Combustível: ${res.litrosCombustivel.toFixed(1)} L (méd. ${res.consumoKmLitro} km/L a ${formatBRL(res.precoGasolina)}/L): ${formatBRL(res.custoCombustivel)}\n` +
    (res.custoPedagio > 0 ? `• Pedágios estimados (ida e volta): ${formatBRL(res.custoPedagio)}\n` : '') +
    `• Desgaste e manutenção veicular: ${formatBRL(res.custoDesgaste)}\n` +
    `• Tempo técnico de deslocamento e amostragem: ${formatBRL(res.custoHoraTecnica)}\n` +
    `• Kit esterilizado, frascos e cadeia de custódia: ${formatBRL(res.custoKit)}\n\n` +
    `*VALOR SUGERIDO DA COLETA TÉCNICA: ${formatBRL(res.final)}*\n\n` +
    `Status operacional: ${res.rec.texto}\n` +
    `${config.observacaoPadrao}`;

  if (logState.obs) m += `\n\nObs.: ${logState.obs}`;
  return m;
}
