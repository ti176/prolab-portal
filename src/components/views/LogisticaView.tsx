import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  calculateLogistics, 
  buildLogisticsWhatsAppMessage,
  calculateRouteDistance
} from '../../utils/calculations';
import { formatBRL, maskCEP, maskPhone, onlyDigits } from '../../utils/formatters';
import { 
  Truck, 
  MapPin, 
  Copy, 
  ExternalLink, 
  Eye, 
  Save, 
  History, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert,
  Fuel,
  Receipt,
  Wrench,
  Clock,
  Sparkles,
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const LogisticaView: React.FC = () => {
  const { isAdmin } = useAuth();
  const { logisticsConfig, setLogisticsConfig, logisticsHistory, addLogisticsHistory, toast } = useApp();

  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [destino, setDestino] = useState('');
  const [cep, setCep] = useState('');
  const [kmIda, setKmIda] = useState<number | string>('');
  const [pedagio, setPedagio] = useState<number | string>(0);
  const [tempoEspera, setTempoEspera] = useState<number | string>(0);
  const [obs, setObs] = useState('');

  // Fuel and consumption parameters (as requested: 9 km/L and gasoline price)
  const [precoGasolina, setPrecoGasolina] = useState<number | string>(logisticsConfig.precoGasolina || 6.20);
  const [consumoKmLitro, setConsumoKmLitro] = useState<number | string>(logisticsConfig.consumoKmLitro || 9.0);

  // Relevant cost additions toggles
  const [incluirDesgaste, setIncluirDesgaste] = useState(true);
  const [incluirHoraTecnica, setIncluirHoraTecnica] = useState(true);
  const [incluirKitAmostragem, setIncluirKitAmostragem] = useState(true);
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);

  // Loading and routing states
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeSource, setRouteSource] = useState<string>('');
  const [showFullModal, setShowFullModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Trigger calculation when CEP reaches 8 digits
  const handleAutoCalculateByCep = async (targetCep: string) => {
    const clean = onlyDigits(targetCep);
    if (clean.length !== 8) return;

    setLoadingRoute(true);
    try {
      const result = await calculateRouteDistance(clean, destino, logisticsConfig);
      setKmIda(result.kmIda);
      setPedagio(result.pedagio);
      if (result.enderecoFormatado && (!destino.trim() || destino.length < 15)) {
        setDestino(result.enderecoFormatado);
      }
      setRouteSource(
        result.source === 'osrm'
          ? 'Rota real calculada via OSRM'
          : result.source === 'haversine'
          ? 'Distância estimada por coordenadas geográficas'
          : 'Distância estimada por polo metropolitano'
      );
      toast(`Distância (${result.kmIda} km ida) e pedágios calculados para o CEP ${targetCep}!`, 'ok');
    } catch (err) {
      toast('Não foi possível calcular automaticamente a rota. Informe a distância manualmente.', 'err');
    } finally {
      setLoadingRoute(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = maskCEP(e.target.value);
    setCep(formatted);
    const clean = onlyDigits(formatted);
    if (clean.length === 8) {
      handleAutoCalculateByCep(formatted);
    }
  };

  const calcResult = calculateLogistics(
    {
      kmIda,
      tempoEspera,
      pedagio,
      precoGasolina,
      consumoKmLitro,
      incluirDesgaste,
      incluirHoraTecnica,
      incluirKitAmostragem,
    },
    logisticsConfig
  );

  const message = buildLogisticsWhatsAppMessage(
    calcResult,
    { cliente, destino, cep, obs },
    logisticsConfig
  );

  const waUrl = onlyDigits(telefone).length >= 10
    ? `https://wa.me/55${onlyDigits(telefone)}?text=${encodeURIComponent(message)}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    toast('Cotação de coleta técnica copiada para a área de transferência!', 'ok');
  };

  const handleSaveHistory = () => {
    const entry = {
      id: `log_${Date.now()}`,
      ts: Date.now(),
      cliente: cliente || 'Não informado',
      telefone,
      destino: destino || 'Não informado',
      cep,
      kmTotal: calcResult.kmTotal,
      final: calcResult.final,
      status: calcResult.rec.nivel,
      detalhes: {
        combustivel: calcResult.custoCombustivel,
        pedagio: calcResult.custoPedagio,
        horaTecnica: calcResult.custoHoraTecnica,
        kit: calcResult.custoKit,
      },
    };
    addLogisticsHistory(entry);
    toast('Cálculo salvo no histórico!', 'ok');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2D] via-[#00594C] to-[#007A68] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
            <Truck className="w-3.5 h-3.5" />
            Cálculo Inteligente por CEP & Consumo Real
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Calculadora de Coleta Técnica
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Calcule automaticamente a rota do técnico a partir do CEP do cliente, considerando consumo médio de combustível (9 km/L), valor da gasolina, pedágios rodoviários e tempo técnico de amostragem.
          </p>
        </div>

        <button
          onClick={() => setShowHistoryModal(true)}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
        >
          <History className="w-4 h-4 text-prolab-teal" />
          <span>Histórico de Cálculos ({logisticsHistory.length})</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Origin and Destination Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <span>📍</span> Origem & Local de Coleta
              </h2>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Ida e Volta Inclusas
              </span>
            </div>

            {/* Origin Info Box */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-prolab-primary shrink-0 mt-0.5" />
              <div>
                <b className="text-gray-900 block font-bold">Origem Fixa (Laboratório Central):</b>
                <span className="text-gray-600">{logisticsConfig.origemNome} — {logisticsConfig.origem}</span>
              </div>
            </div>

            {/* CEP and Destination Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  CEP do Local de Coleta *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full pl-3 pr-8 py-2 rounded-xl border border-gray-300 text-xs font-bold focus:outline-none focus:border-prolab-teal focus:ring-2 focus:ring-prolab-teal/20"
                  />
                  {loadingRoute && (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <div className="w-3.5 h-3.5 border-2 border-prolab-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Digite para calcular rota e pedágios
                </span>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Endereço Completo do Cliente
                </label>
                <input
                  type="text"
                  value={destino}
                  onChange={e => setDestino(e.target.value)}
                  placeholder="Rua, número, bairro, cidade - UF"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>
            </div>

            {/* Calculated Distance & Tolls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Distância de Ida (km) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={kmIda}
                  onChange={e => setKmIda(e.target.value)}
                  placeholder="0.0"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-black text-prolab-primary focus:outline-none focus:border-prolab-teal"
                />
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  Ida e volta: <b>{calcResult.kmTotal.toFixed(1)} km</b>
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Pedágios Estimados (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">R$</span>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    value={pedagio}
                    onChange={e => setPedagio(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-300 text-xs font-bold focus:outline-none focus:border-prolab-teal"
                  />
                </div>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  Ida e volta automática
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tempo de Espera / Coleta (h)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={tempoEspera}
                  onChange={e => setTempoEspera(e.target.value)}
                  placeholder="0.0"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  Permanência na empresa
                </span>
              </div>
            </div>

            {routeSource && (
              <div className="p-2 rounded-lg bg-teal-50 border border-teal-200/80 text-[11px] text-teal-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-prolab-teal shrink-0" />
                <span>{routeSource}</span>
              </div>
            )}
          </div>

          {/* Fuel & Vehicle Parameters Card (Requested by User) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-prolab-primary" />
                <span>Parâmetros de Combustível & Consumo</span>
              </h2>
              <span className="text-[10px] text-gray-400">Regra Comercial PróLab</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  Consumo Médio do Veículo (km/L)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={consumoKmLitro}
                    onChange={e => setConsumoKmLitro(e.target.value)}
                    className="w-24 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold bg-white focus:outline-none focus:border-prolab-teal"
                  />
                  <span className="text-xs text-gray-500 font-semibold">km por litro</span>
                </div>
                <span className="text-[10px] text-gray-500 block">
                  Configurado conforme média padrão solicitada (<b>9 km/L</b>).
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  Preço do Combustível (R$/L)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold">R$</span>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    value={precoGasolina}
                    onChange={e => setPrecoGasolina(e.target.value)}
                    className="w-24 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold bg-white focus:outline-none focus:border-prolab-teal"
                  />
                  <span className="text-xs text-gray-500 font-semibold">/ litro</span>
                </div>
                <span className="text-[10px] text-gray-500 block">
                  Preço médio de bomba na Grande SP.
                </span>
              </div>
            </div>

            {/* Live Fuel Result Summary */}
            {calcResult.kmTotal > 0 && (
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs flex items-center justify-between">
                <span className="text-gray-600">
                  Volume de combustível estimado: <b>{calcResult.litrosCombustivel.toFixed(1)} Litros</b> ({calcResult.kmTotal.toFixed(1)} km ÷ {calcResult.consumoKmLitro} km/L)
                </span>
                <span className="font-bold text-prolab-primary">
                  {formatBRL(calcResult.custoCombustivel)}
                </span>
              </div>
            )}
          </div>

          {/* Relevant Cost Additions & Operational Factors */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-prolab-primary" />
                <span>Adições Relevantes de Custo Operacional</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowAdvancedParams(!showAdvancedParams)}
                className="text-xs font-semibold text-prolab-primary hover:underline flex items-center gap-1"
              >
                {showAdvancedParams ? 'Ocultar detalhes' : 'Ajustar valores unitários'}
                {showAdvancedParams ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="space-y-2">
              {/* Wear & Tear */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={incluirDesgaste}
                  onChange={e => setIncluirDesgaste(e.target.checked)}
                  className="mt-0.5 rounded text-prolab-primary focus:ring-prolab-teal"
                />
                <div className="flex-1 text-xs">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Manutenção e Desgaste do Veículo</span>
                    <span>{formatBRL(calcResult.custoDesgaste)}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Depreciação veicular, pneus, óleo e revisão preventiva ({formatBRL(logisticsConfig.desgasteKm)}/km rodado).
                  </p>
                </div>
              </label>

              {/* Technician Time */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={incluirHoraTecnica}
                  onChange={e => setIncluirHoraTecnica(e.target.checked)}
                  className="mt-0.5 rounded text-prolab-primary focus:ring-prolab-teal"
                />
                <div className="flex-1 text-xs">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Hora Técnica de Amostragem & Trânsito</span>
                    <span>{formatBRL(calcResult.custoHoraTecnica)}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Remuneração de técnico especializado ({formatBRL(logisticsConfig.horaTecnica)}/h) · Tempo estimado: <b>{calcResult.tempoTotalTecnico.toFixed(1)}h</b> ({calcResult.tempoViagemHoras.toFixed(1)}h trânsito + {calcResult.espera}h coleta).
                  </p>
                </div>
              </label>

              {/* Sampling Kit & Sterile Supplies */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={incluirKitAmostragem}
                  onChange={e => setIncluirKitAmostragem(e.target.checked)}
                  className="mt-0.5 rounded text-prolab-primary focus:ring-prolab-teal"
                />
                <div className="flex-1 text-xs">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Kit de Amostragem & Frascos Esterilizados</span>
                    <span>{formatBRL(calcResult.custoKit)}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Frascos estéreis com tiossulfato, bolsa térmica calibrada, gelox reutilizável e cadeia de custódia oficial.
                  </p>
                </div>
              </label>
            </div>

            {/* Advanced unit values editor */}
            {showAdvancedParams && (
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-3 mt-3 animate-fade-in text-xs">
                <div className="font-bold text-gray-700">Personalizar Taxas Base:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Desgaste por km</label>
                    <input
                      type="number"
                      step="0.05"
                      value={logisticsConfig.desgasteKm}
                      onChange={e => setLogisticsConfig({ ...logisticsConfig, desgasteKm: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 rounded border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Hora Técnica (R$/h)</label>
                    <input
                      type="number"
                      step="5"
                      value={logisticsConfig.horaTecnica}
                      onChange={e => setLogisticsConfig({ ...logisticsConfig, horaTecnica: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 rounded border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Kit Estéril (R$)</label>
                    <input
                      type="number"
                      step="5"
                      value={logisticsConfig.taxaKitAmostragem}
                      onChange={e => setLogisticsConfig({ ...logisticsConfig, taxaKitAmostragem: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 rounded border border-gray-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <span>👤</span> Dados do Cliente & Instruções
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cliente / Solicitante</label>
                <input
                  type="text"
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  placeholder="Nome do cliente ou empresa"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={telefone}
                  onChange={e => setTelefone(maskPhone(e.target.value))}
                  placeholder="(11) 99999-0000"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Observações Operacionais</label>
              <textarea
                value={obs}
                onChange={e => setObs(e.target.value)}
                placeholder="Ex: Coleta antes das 10h, necessária credencial na portaria, pontos de torneira e caixa d'água."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Result Box (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Resultado da Coleta Técnica
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-prolab-primary">
                {calcResult.kmTotal.toFixed(1)} km totais
              </span>
            </div>

            {/* Audit Recommendation Badge */}
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                calcResult.rec.nivel === 'ok'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : calcResult.rec.nivel === 'alerta'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : calcResult.rec.nivel === 'risco'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}
            >
              {calcResult.rec.nivel === 'ok' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : calcResult.rec.nivel === 'alerta' ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : calcResult.rec.nivel === 'risco' ? (
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <Truck className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              )}
              <div className="font-semibold leading-relaxed">{calcResult.rec.texto}</div>
            </div>

            {/* Detailed Cost Composition */}
            <div className="space-y-2 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
              <div className="font-bold text-gray-800 pb-1 border-b border-gray-200 text-[11px] uppercase tracking-wider">
                Composição do Investimento:
              </div>

              <div className="flex justify-between text-gray-600">
                <span>⛽ Combustível ({calcResult.litrosCombustivel.toFixed(1)} L a {formatBRL(calcResult.precoGasolina)}):</span>
                <span className="font-bold text-gray-900">{formatBRL(calcResult.custoCombustivel)}</span>
              </div>

              {calcResult.custoPedagio > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>🛣️ Pedágios (ida e volta):</span>
                  <span className="font-bold text-gray-900">{formatBRL(calcResult.custoPedagio)}</span>
                </div>
              )}

              {calcResult.custoDesgaste > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>🚗 Desgaste e manutenção ({calcResult.kmTotal.toFixed(1)} km):</span>
                  <span className="font-bold text-gray-900">{formatBRL(calcResult.custoDesgaste)}</span>
                </div>
              )}

              {calcResult.custoHoraTecnica > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>⏱️ Tempo técnico ({calcResult.tempoTotalTecnico.toFixed(1)}h):</span>
                  <span className="font-bold text-gray-900">{formatBRL(calcResult.custoHoraTecnica)}</span>
                </div>
              )}

              {calcResult.custoKit > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>🧪 Kit estéril e frascos:</span>
                  <span className="font-bold text-gray-900">{formatBRL(calcResult.custoKit)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600 pt-1.5 border-t border-gray-200 font-semibold">
                <span>Subtotal custos diretos:</span>
                <span>{formatBRL(calcResult.subtotal)}</span>
              </div>

              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Margem operacional ({logisticsConfig.margem}%):</span>
                <span>+{formatBRL((calcResult.subtotal * logisticsConfig.margem) / 100)}</span>
              </div>
            </div>

            {/* Final Suggested Value */}
            <div className="text-right pt-2 border-t border-gray-100">
              <span className="text-xs font-bold uppercase text-gray-400 block">
                Valor Sugerido da Coleta Técnica
              </span>
              <div className="text-3xl font-black text-prolab-primary tracking-tight">
                {formatBRL(calcResult.final)}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Valor mínimo garantido: {formatBRL(logisticsConfig.minimo)} · Arredondamento R$ {logisticsConfig.arred},00
              </span>
            </div>

            {/* Generated WhatsApp Message Preview */}
            <div className="bg-[#ECE5DD] p-3.5 rounded-xl border border-gray-300">
              <span className="text-[11px] font-bold text-gray-700 uppercase block mb-1.5">
                Mensagem Formatada para WhatsApp
              </span>
              <div className="bg-white p-3 rounded-lg shadow-xs text-xs font-mono whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
                {message}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copiar Proposta</span>
                </button>

                <button
                  onClick={() => setShowFullModal(true)}
                  className="py-2.5 px-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Integral</span>
                </button>
              </div>

              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>📲 Abrir no WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={handleSaveHistory}
                className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar no Histórico</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-fade-in max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <History className="w-4 h-4 text-prolab-primary" />
                <span>Histórico de Cotações de Coleta Técnica</span>
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-2 flex-1">
              {logisticsHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  Nenhum cálculo salvo no histórico ainda.
                </div>
              ) : (
                logisticsHistory.map((h: any, idx) => (
                  <div
                    key={h.id || idx}
                    className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <b className="text-gray-900 block font-bold">{h.cliente}</b>
                      <span className="text-gray-500 text-[11px] block truncate max-w-xs">
                        {h.destino} ({h.kmTotal?.toFixed(1)} km)
                      </span>
                    </div>
                    <div className="text-right">
                      <b className="text-prolab-primary font-black block">{formatBRL(h.final)}</b>
                      <span className="text-[10px] text-gray-400">
                        {new Date(h.ts).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 rounded-xl bg-prolab-primary text-white text-xs font-bold hover:bg-prolab-light"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Message Modal */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">
                Visualização Integral — Proposta de Coleta Técnica
              </h3>
              <button
                onClick={() => setShowFullModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="py-4 overflow-y-auto flex-1">
              <div className="bg-[#ECE5DD] p-4 rounded-xl">
                <div className="bg-white p-4 rounded-lg shadow text-xs whitespace-pre-wrap font-mono leading-relaxed text-gray-900">
                  {message}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-prolab-primary text-white text-xs font-bold hover:bg-prolab-light transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </button>
              <button
                onClick={() => setShowFullModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
