import { DiagnosticOption, DiagnosticQuestion } from '../data/diagnostic';
import { User, Vendor } from '../data/users';

export interface LeadInfo {
  nome: string;
  cargo: string;
  empresa: string;
  whatsapp: string;
  email: string;
  segmento: string;
  outroSeg?: string;
  analises: string[];
  outraAna?: string;
  origem: string;
  obs?: string;
  site?: string;
}

export interface DiagnosticScores {
  P: number;
  U: number;
  A: number;
  R: number;
}

export interface DiagnosticResult {
  scores: DiagnosticScores;
  comp: number;
  cat: 'A' | 'B' | 'C';
  tags: string[];
  vendor: string;
}

export interface AIOpportunity {
  type: 'hot' | 'warm' | 'cool' | 'risk';
  text: string;
}

export interface AISummary {
  summary: string;
  opps: AIOpportunity[];
  alerts: AIOpportunity[];
  approach: string;
}

export interface LeadRecord {
  id: string;
  ts: number;
  info: LeadInfo;
  diag: Record<string, any>;
  resultado: DiagnosticResult;
  vendor: string;
  operador: string;
  stage: string;
  notes?: string[];
}

export interface InternalMessage {
  id: string;
  ts: number;
  de: string;
  para: string;
  titulo: string;
  texto: string;
  prioridade: 'normal' | 'alta' | 'urgente';
  lido: boolean;
  leadId?: string;
}

export interface SelectedPriceItem {
  id: string;
  nome: string;
  valor: number;
  qtd: number;
  segmento?: string;
  categoria?: string;
  tipo?: string;
}
