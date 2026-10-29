import * as XLSX from 'xlsx';
import { LeadRecord, SelectedPriceItem } from '../types';
import { PriceItem } from '../data/prices';
import { formatDateTime } from './formatters';

export function exportLeadsToExcel(leads: LeadRecord[]): void {
  const rows = leads.map(l => ({
    'Data de Cadastro': formatDateTime(l.ts),
    'Empresa': l.info.empresa,
    'Nome Contato': l.info.nome,
    'Cargo': l.info.cargo || '',
    'WhatsApp': l.info.whatsapp,
    'E-mail': l.info.email,
    'Segmento': l.info.segmento,
    'Análises de Interesse': (l.info.analises || []).join('; '),
    'Classificação': `Classe ${l.resultado.cat} (${l.resultado.comp}%)`,
    'Score Porte/Potencial (P)': `${l.resultado.scores.P}%`,
    'Score Urgência (U)': `${l.resultado.scores.U}%`,
    'Score Aderência (A)': `${l.resultado.scores.A}%`,
    'Score Risco (R)': `${l.resultado.scores.R}%`,
    'Vendedor Responsável': l.vendor,
    'Operador': l.operador,
    'Etapa CRM': l.stage,
    'Observações': l.info.obs || '',
    'Tags Estratégicas': (l.resultado.tags || []).join(', '),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads PróLab');
  
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `prolab_relatorio_leads_${dateStr}.xlsx`);
}

export function exportPriceTableToExcel(items: PriceItem[] | SelectedPriceItem[], sheetName = 'Tabela de Preços'): void {
  const rows = items.map(p => ({
    'Código': p.id,
    'Segmento': (p as PriceItem).segmento || '',
    'Categoria': (p as PriceItem).categoria || '',
    'Tipo': p.tipo || '',
    'Ensaio / Parâmetro': p.nome,
    'Valor (R$)': p.valor,
    'Quantidade': (p as SelectedPriceItem).qtd || 1,
    'Total (R$)': ((p as SelectedPriceItem).qtd || 1) * p.valor,
    'Prazo': (p as PriceItem).prazo || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `prolab_orcamento_${dateStr}.xlsx`);
}

export async function parseUploadedPriceFile(file: File): Promise<PriceItem[]> {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.json')) {
    const text = await file.text();
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.items || [];
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet);

  return rawRows.map((r, i) => ({
    id: String(r['Código'] || r['id'] || `imp_${Date.now()}_${i}`),
    nome: String(r['Ensaio / Parâmetro'] || r['nome'] || r['Nome'] || r['Item'] || 'Sem nome'),
    valor: Number(r['Valor (R$)'] || r['valor'] || r['Preco'] || r['Preço'] || 0),
    segmento: String(r['Segmento'] || r['segmento'] || 'Geral'),
    categoria: String(r['Categoria'] || r['categoria'] || 'Análises'),
    tipo: String(r['Tipo'] || r['tipo'] || 'Ensaio'),
    prazo: r['Prazo'] || r['prazo'] || '',
  }));
}
