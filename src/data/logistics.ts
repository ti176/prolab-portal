export interface LogisticsConfig {
  origemNome: string;
  origem: string;
  origemCep: string;
  origemLat: number;
  origemLon: number;
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
  precoGasolina: number;
  consumoKmLitro: number;
  desgasteKm: number;
  horaTecnica: number;
  taxaKitAmostragem: number;
  observacaoPadrao: string;
}

export const DEFAULT_LOGISTICS_CONFIG: LogisticsConfig = {
  origemNome: "PróLab Biotecnologia",
  origem: "R. Ângelo Máglio, 65 - Vila Yara, Osasco - SP, 06020-020",
  origemCep: "06020-020",
  origemLat: -23.5329,
  origemLon: -46.7754,
  km: 2.6,
  margem: 20,
  minimo: 120,
  arred: 10,
  idaVolta: true,
  limCurta: 25,
  limNormal: 60,
  limGestao: 120,
  taxaColeta: 0,
  taxaEspera: 50,
  precoGasolina: 6.20,
  consumoKmLitro: 9.0,
  desgasteKm: 0.40,
  horaTecnica: 50.00,
  taxaKitAmostragem: 35.00,
  observacaoPadrao: "Valor estimado com base nas informações fornecidas, sujeito à validação logística e disponibilidade de agenda técnica."
};
