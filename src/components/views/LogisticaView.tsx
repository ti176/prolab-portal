import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  calculateLogistics, 
  buildLogisticsWhatsAppMessage,
  lookupAddressByCEP
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
  HelpCircle
} from 'lucide-react';

export const LogisticaView: React.FC = () => {
  const { isAdmin } = useAuth();
  const { logisticsConfig, setLogisticsConfig, logisticsHistory, addLogisticsHistory, toast } = useApp();

  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [destino, setDestino] = useState('');
  const [cep, setCep] = useState('');
  const [kmIda, setKmIda] = useState<number | string>('');
  const [amostras, setAmostras] = useState(1);
  const [tempoEspera, setTempoEspera] = useState<number | string>(0);
  const [obs, setObs] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);

  const [showFullModal, setShowFullModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const calcResult = calculateLogistics({ kmIda, tempoEspera }, logisticsConfig);
  const message = buildLogisticsWhatsAppMessage(calcResult, { cliente, destino, obs }, logisticsConfig);
  const waUrl = onlyDigits(telefone).length >= 10
    ? `https://wa.me/55${onlyDigits(telefone)}?text=${encodeURIComponent(message)}`
    : '';

  const handleLookupCep = async () => {
    const digits = onlyDigits(cep);
    if (digits.length !== 8) {
      toast('Informe um CEP válido com 8 dígitos.', 'err');
      return;
    }

    setLoadingCep(true);
    const data = await lookupAddressByCEP(digits);
    setLoadingCep(false);

    if (data && !data.erro) {
      const full = `${data.logradouro || ''}, ${data.bairro || ''} - ${data.localidade || ''}/${data.uf || ''}`;
      setDestino(full);
      toast('Endereço preenchido automaticamente via CEP!', 'ok');
    } else {
      toast('CEP não encontrado ou inválido.', 'err');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    toast('Cotação logística copiada para a área de transferência!', 'ok');
  };

  const handleSaveHistory = () => {
    const entry = {
      id: `log_${Date.now()}`,
      ts: Date.now(),
      cliente: cliente || 'Não informado',
      telefone,
      destino: destino || 'Não informado',
      kmTotal: calcResult.kmTotal,
      final: calcResult.final,
      status: calcResult.rec.nivel,
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
            Deslocamento & Amostragem em Campo
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Calculadora de Coleta Técnica
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Estime o custo do deslocamento de técnicos do laboratório PróLab até o local do cliente para amostragem oficial de água, ar ou alimentos.
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

      {/* Main Grid: Form Left, Result Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Origin and Destination Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <span>📍</span> Origem & Destino da Amostragem
            </h2>

            {/* Origin Info Box */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2 text-xs">
              <MapPin className="w-4 h-4 text-prolab-primary shrink-0 mt-0.5" />
              <div>
                <b className="text-gray-900 block font-bold">Origem do Laboratório:</b>
                <span className="text-gray-600">{logisticsConfig.origemNome} — {logisticsConfig.origem}</span>
              </div>
            </div>

            {/* CEP auto-fill */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  CEP do Local
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={cep}
                    onChange={e => setCep(maskCEP(e.target.value))}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                  />
                  <button
                    type="button"
                    onClick={handleLookupCep}
                    disabled={loadingCep}
                    className="px-3 py-2 bg-prolab-primary hover:bg-prolab-light text-white text-xs font-bold rounded-xl transition-colors shrink-0 disabled:opacity-50"
                  >
                    {loadingCep ? '...' : <Search className="w-3.5 h-3.5" />}
                  </button>
                </div>
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

            {/* Distance & Wait Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Distância Ida (km) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={kmIda}
                  onChange={e => setKmIda(e.target.value)}
                  placeholder="Ex: 35.5"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Qtd. Amostras / Volumes
                </label>
                <input
                  type="number"
                  min="1"
                  value={amostras}
                  onChange={e => setAmostras(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tempo de Espera (h)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={tempoEspera}
                  onChange={e => setTempoEspera(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <span>👤</span> Dados do Contato
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cliente / Empresa</label>
                <input
                  type="text"
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  placeholder="Nome do solicitante ou empresa"
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
                placeholder="Ex: Portaria exige agendamento com antecedência de 24h, coleta antes das 11h."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal resize-none"
              />
            </div>
          </div>

          {/* Parameter Details (Audit Box) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                ⚙️ Racional Logístico Aplicado
              </h2>
              <span className="text-[10px] text-gray-400">Parâmetros operacionais</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-400 text-[10px] uppercase block">Por km</span>
                <b className="text-gray-900 text-sm">{formatBRL(logisticsConfig.km)}</b>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-400 text-[10px] uppercase block">Ida e Volta</span>
                <b className="text-gray-900 text-sm">{logisticsConfig.idaVolta ? 'Sim (2x)' : 'Não'}</b>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-400 text-[10px] uppercase block">Margem</span>
                <b className="text-gray-900 text-sm">{logisticsConfig.margem}%</b>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-400 text-[10px] uppercase block">Valor Mínimo</span>
                <b className="text-gray-900 text-sm">{formatBRL(logisticsConfig.minimo)}</b>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Result Box (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Resultado do Deslocamento
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-prolab-primary">
                {calcResult.kmTotal.toFixed(1)} km considerados
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
                <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              )}
              <div className="font-semibold">{calcResult.rec.texto}</div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Distância considerada (ida e volta):</span>
                <span className="font-bold text-gray-900">{calcResult.kmTotal.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal quilometragem:</span>
                <span className="font-bold text-gray-900">
                  {formatBRL(calcResult.kmTotal * logisticsConfig.km)}
                </span>
              </div>
              {calcResult.espera > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Espera em campo ({calcResult.espera}h):</span>
                  <span className="font-bold text-gray-900">
                    {formatBRL(calcResult.espera * logisticsConfig.taxaEspera)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-200">
                <span>Com margem comercial ({logisticsConfig.margem}%):</span>
                <span className="font-bold text-gray-900">{formatBRL(calcResult.valor)}</span>
              </div>
            </div>

            {/* Suggested Final Price */}
            <div className="text-right pt-2 border-t border-gray-100">
              <span className="text-xs font-bold uppercase text-gray-400 block">
                Valor Sugerido da Coleta Técnica
              </span>
              <div className="text-3xl font-black text-prolab-primary tracking-tight">
                {formatBRL(calcResult.final)}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Arredondamento operacional configurado para R$ {logisticsConfig.arred},00
              </span>
            </div>

            {/* Message Preview */}
            <div className="bg-[#ECE5DD] p-3.5 rounded-xl border border-gray-300">
              <span className="text-[11px] font-bold text-gray-700 uppercase block mb-1.5">
                Mensagem Gerada para WhatsApp
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
                  className="py-2.5 px-3 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
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
                <span>Histórico de Cálculos de Coleta Técnica</span>
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
