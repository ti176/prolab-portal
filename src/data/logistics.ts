export interface LogisticsConfig {
  origemNome: string;
  origem: string;
  km: number;
  margem: number;
  minimo: number;
  arred: number;
  idaVolta: boolean;
  limCurta: number;
  limNormal: number;
  limGestao: number;
  taxaColeta: number;
  taxaEspera: number;
  observacaoPadrao: string;
}

export const DEFAULT_LOGISTICS_CONFIG: LogisticsConfig = {
  "origemNome": "PróLab Biotecnologia",
  "origem": "R. Ângelo Máglio, 65 - Vila Yara, Osasco - SP, 06020-020",
  "km": 2.6,
  "margem": 20,
  "minimo": 120,
  "arred": 10,
  "idaVolta": true,
  "limCurta": 20,
  "limNormal": 60,
  "limGestao": 120,
  "taxaColeta": 0,
  "taxaEspera": 0,
  "observacaoPadrao": "Valor estimado com base nas informações fornecidas, sujeito à validação logística."
};
