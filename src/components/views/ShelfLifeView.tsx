import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  calculateShelfLife, 
  buildShelfLifeWhatsAppMessage 
} from '../../utils/calculations';
import { formatBRL, maskPhone, onlyDigits } from '../../utils/formatters';
import { 
  Clock, 
  Search, 
  Copy, 
  ExternalLink, 
  Eye, 
  Save, 
  History, 
  Trash2, 
  Plus, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export const ShelfLifeView: React.FC = () => {
  const { isAdmin } = useAuth();
  const { shelfConfig, setShelfConfig, shelfHistory, addShelfHistory, toast } = useApp();

  const [produto, setProduto] = useState('');
  const [catId, setCatId] = useState(shelfConfig.cats[0]?.id || '');
  const [periodId, setPeriodId] = useState(shelfConfig.periods[0]?.id || '');
  const [periodCustom, setPeriodCustom] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTeor, setSearchTeor] = useState('');

  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [obs, setObs] = useState('');
  const [showFullModal, setShowFullModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const calcResult = calculateShelfLife(
    { catId, sel: selectedItems, periodId, periodCustom },
    shelfConfig
  );

  const message = buildShelfLifeWhatsAppMessage(calcResult, { produto, cliente, obs });
  const waUrl = onlyDigits(telefone).length >= 10
    ? `https://wa.me/55${onlyDigits(telefone)}?text=${encodeURIComponent(message)}`
    : '';

  const filteredItems = shelfConfig.items.filter(item => {
    if (!searchTeor.trim()) return true;
    return item.nome.toLowerCase().includes(searchTeor.toLowerCase());
  });

  const toggleItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    toast('Orçamento de Shelf Life copiado para a área de transferência!', 'ok');
  };

  const handleSaveHistory = () => {
    const entry = {
      id: `sh_${Date.now()}`,
      ts: Date.now(),
      produto: produto || 'Não informado',
      cliente: cliente || 'Não informado',
      telefone,
      total: calcResult.total,
      tempos: calcResult.qtd,
      categoria: calcResult.cat.nome,
    };
    addShelfHistory(entry);
    toast('Cálculo salvo no histórico!', 'ok');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2D] via-[#00594C] to-[#007A68] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            Estudos de Estabilidade & Validade
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Calculadora de Shelf Life
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Projete o estudo de vida de prateleira combinando testes acelerados e em tempo real, calcule o investimento por ponto no tempo e gere a mensagem oficial.
          </p>
        </div>

        <button
          onClick={() => setShowHistoryModal(true)}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
        >
          <History className="w-4 h-4 text-prolab-teal" />
          <span>Histórico de Orçamentos ({shelfHistory.length})</span>
        </button>
      </div>

      {/* Main Grid: Form Left, Sticky Result Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Product & Category Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <span>📦</span> Produto & Configuração do Estudo
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={produto}
                  onChange={e => setProduto(e.target.value)}
                  placeholder="Ex: Creatina Creapure, Molho Barbecue"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Categoria de Matriz
                </label>
                <select
                  value={catId}
                  onChange={e => setCatId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
                >
                  {shelfConfig.cats.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nome} — Base: {formatBRL(c.base)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Período / Pontos de Teste
                </label>
                <select
                  value={periodId}
                  onChange={e => setPeriodId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
                >
                  {shelfConfig.periods.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nome} ({p.mult} tempos)
                    </option>
                  ))}
                  <option value="custom">Outro (Personalizado)</option>
                </select>
              </div>

              {periodId === 'custom' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Qtd. de Tempos
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={periodCustom}
                    onChange={e => setPeriodCustom(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Additional Analytes / Teores Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <span>🧪</span> Teores e Ensaios Adicionais por Ponto no Tempo
              </h2>
              {selectedItems.length > 0 && (
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Limpar ({selectedItems.length})
                </button>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={searchTeor}
                onChange={e => setSearchTeor(e.target.value)}
                placeholder="Buscar parâmetro (ex: Salmonella, acidez, umidade)..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-1 border border-gray-100 rounded-xl">
              {filteredItems.map(item => {
                const isSel = selectedItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isSel
                        ? 'bg-prolab-primary text-white border-prolab-primary font-bold shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-prolab-teal'
                    }`}
                  >
                    {isSel ? '✓ ' : ''}{item.nome} · <b className={isSel ? 'text-white' : 'text-prolab-primary'}>{formatBRL(item.preco)}</b>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Client Destination Info */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <span>📲</span> Informações do Cliente para o Envio
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  placeholder="Ex: Ana Paula"
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Observações da Proposta</label>
              <textarea
                value={obs}
                onChange={e => setObs(e.target.value)}
                placeholder="Ex: Fornecimento de frascos pela contratante, laudos parciais a cada tempo."
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
                Resultado do Orçamento
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-prolab-primary">
                {calcResult.qtd} tempos calculados
              </span>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-2 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Base da categoria ({calcResult.cat.nome}):</span>
                <span className="font-bold text-gray-900">{formatBRL(calcResult.base)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Teores adicionais ({calcResult.items.length}):</span>
                <span className="font-bold text-gray-900">{formatBRL(calcResult.teores)}</span>
              </div>
              <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-200">
                <span>Subtotal por tempo:</span>
                <span className="font-bold text-prolab-primary">{formatBRL(calcResult.unit)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Multiplicador de tempos:</span>
                <span className="font-bold text-gray-900">× {calcResult.qtd}</span>
              </div>
              {shelfConfig.params.desconto > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Desconto aplicado:</span>
                  <span>-{shelfConfig.params.desconto}%</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="text-right pt-2 border-t border-gray-100">
              <span className="text-xs font-bold uppercase text-gray-400 block">Total Estimado do Estudo</span>
              <div className="text-3xl font-black text-prolab-primary tracking-tight">
                {formatBRL(calcResult.total)}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Considerar aprox. {calcResult.amostraGramas}g de amostra por tempo.
              </span>
            </div>

            {/* Formatted Message Preview */}
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
                <span>Histórico de Orçamentos de Shelf Life</span>
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-2 flex-1">
              {shelfHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  Nenhum orçamento salvo no histórico ainda.
                </div>
              ) : (
                shelfHistory.map((h: any, idx) => (
                  <div
                    key={h.id || idx}
                    className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <b className="text-gray-900 block font-bold">{h.produto}</b>
                      <span className="text-gray-500 text-[11px]">
                        {h.cliente} · {h.categoria} ({h.tempos} tempos)
                      </span>
                    </div>
                    <div className="text-right">
                      <b className="text-prolab-primary font-black block">{formatBRL(h.total)}</b>
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
                Visualização Integral — Proposta Shelf Life
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
