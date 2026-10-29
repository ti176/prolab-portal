import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { PriceItem } from '../../data/prices';
import { formatBRL, normalizeText } from '../../utils/formatters';
import { exportPriceTableToExcel, parseUploadedPriceFile } from '../../utils/excel';
import { 
  Search, 
  Tag, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Download, 
  Upload, 
  Copy, 
  MessageSquare, 
  Check, 
  X, 
  BookOpen,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const PrecoView: React.FC = () => {
  const { isAdmin } = useAuth();
  const { 
    priceCatalog, 
    setPriceCatalog,
    selectedPrices, 
    addPriceToCart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal,
    toast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showNormsModal, setShowNormsModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientObs, setClientObs] = useState('');

  // Extract unique segments
  const segments = useMemo(() => {
    const set = new Set<string>(['Todos']);
    priceCatalog.forEach(p => {
      if (p.segmento) set.add(p.segmento);
    });
    return Array.from(set);
  }, [priceCatalog]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>(['Todos']);
    priceCatalog.forEach(p => {
      if (p.categoria) set.add(p.categoria);
    });
    return Array.from(set);
  }, [priceCatalog]);

  // Filtered price items
  const filteredPrices = useMemo(() => {
    const q = normalizeText(searchTerm);
    return priceCatalog.filter(item => {
      if (selectedSegment !== 'Todos' && item.segmento !== selectedSegment) return false;
      if (selectedCategory !== 'Todos' && item.categoria !== selectedCategory) return false;
      if (!q) return true;

      const text = normalizeText(`${item.nome} ${item.segmento || ''} ${item.categoria || ''} ${item.enquadramento || ''} ${item.tipo || ''}`);
      return text.includes(q);
    });
  }, [priceCatalog, searchTerm, selectedSegment, selectedCategory]);

  // Build WhatsApp proposal message
  const buildProposalMessage = () => {
    let msg = '';
    if (clientName.trim()) {
      msg += `Olá, ${clientName.trim()}!\n\n`;
    }
    msg += `*PROPOSTA COMERCIAL — PRÓLAB BIOTECNOLOGIA*\n`;
    msg += `Segue cotação dos ensaios e análises laboratoriais solicitados:\n\n`;

    selectedPrices.forEach((item, idx) => {
      const sub = (item.valor || 0) * (item.qtd || 1);
      msg += `${idx + 1}. *${item.nome}*\n`;
      msg += `   Qtd: ${item.qtd}x · Valor unit: ${formatBRL(item.valor)} · Subtotal: ${formatBRL(sub)}\n`;
    });

    msg += `\n*VALOR TOTAL DO INVESTIMENTO: ${formatBRL(cartTotal)}*\n\n`;
    msg += `Condições gerais:\n`;
    msg += `• Prazo de liberação de laudos: conforme escopo e chegada das amostras;\n`;
    msg += `• Ensaios executados em conformidade com normas oficiais e acreditação;\n`;
    if (clientObs.trim()) {
      msg += `• Obs: ${clientObs.trim()}\n`;
    }
    msg += `\nFicamos à disposição para darmos andamento à formalização da proposta!`;
    return msg;
  };

  const handleCopyProposal = () => {
    const msg = buildProposalMessage();
    navigator.clipboard.writeText(msg);
    toast('Proposta copiada para a área de transferência!', 'ok');
  };

  const handleExportCartExcel = () => {
    if (selectedPrices.length === 0) {
      toast('Adicione ao menos um item ao orçamento.', 'err');
      return;
    }
    exportPriceTableToExcel(selectedPrices, 'Orçamento Comercial');
    toast('Planilha Excel gerada com sucesso!', 'ok');
  };

  const handleExportFullCatalog = () => {
    exportPriceTableToExcel(priceCatalog, 'Tabela Geral de Preços');
    toast('Catálogo completo exportado para Excel!', 'ok');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await parseUploadedPriceFile(file);
      if (imported.length === 0) {
        toast('Nenhum item válido encontrado no arquivo.', 'err');
        return;
      }
      setPriceCatalog(imported);
      toast(`${imported.length} itens importados com sucesso!`, 'ok');
    } catch (err: any) {
      toast(`Erro ao importar arquivo: ${err.message}`, 'err');
    }
    e.target.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2D] via-[#00594C] to-[#007A68] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
            <Tag className="w-3.5 h-3.5" />
            Catálogo Analítico Oficial
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Tabela de Preços & Cotações
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Consulte ensaios, consulte enquadramentos regulatórios oficiais (Portaria 888, IN 161, RDC 481), monte o carrinho e gere a proposta em segundos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowNormsModal(true)}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-prolab-teal" />
            <span>Normas Oficiais</span>
          </button>

          {isAdmin && (
            <>
              <button
                onClick={handleExportFullCatalog}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
                title="Exportar catálogo completo para Excel"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar Base</span>
              </button>

              <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Importar</span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </>
          )}

          <button
            onClick={() => setShowCartDrawer(true)}
            className="px-4 py-2 rounded-xl bg-white text-prolab-primary hover:bg-emerald-50 text-xs font-black shadow transition-all flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4 text-prolab-teal" />
            <span>Orçamento ({selectedPrices.length})</span>
            {cartTotal > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded bg-emerald-100 text-prolab-primary text-[11px]">
                {formatBRL(cartTotal)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome do ensaio, parâmetro, norma ou palavra-chave (ex: coliformes, agrotóxicos, shelf life, umidade)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal focus:ring-2 focus:ring-prolab-teal/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm p-0.5"
            >
              ×
            </button>
          )}
        </div>

        {/* Segments Pill Filter */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Segmentos ({segments.length - 1})
          </span>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {segments.map(seg => (
              <button
                key={seg}
                onClick={() => setSelectedSegment(seg)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  selectedSegment === seg
                    ? 'bg-prolab-primary text-white border-prolab-primary shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-prolab-teal'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>
          Exibindo <b>{filteredPrices.length}</b> de <b>{priceCatalog.length}</b> ensaios cadastrados
        </span>
        {searchTerm && (
          <span className="text-prolab-primary font-medium">
            Filtro ativo: "{searchTerm}"
          </span>
        )}
      </div>

      {/* Price Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredPrices.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500">
            <Tag className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <h3 className="font-bold text-sm text-gray-800">Nenhum ensaio encontrado</h3>
            <p className="text-xs text-gray-400 mt-1">Tente buscar por sinônimos ou altere os filtros de segmento.</p>
          </div>
        ) : (
          filteredPrices.map(item => {
            const inCart = selectedPrices.find(x => x.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:border-prolab-teal/60 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-prolab-primary font-bold text-[10px] uppercase tracking-wider">
                      {item.segmento || 'Geral'}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {item.tipo || 'Ensaio'}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-gray-900 group-hover:text-prolab-primary transition-colors leading-snug">
                    {item.nome}
                  </h3>

                  {item.categoria && (
                    <div className="text-[11px] text-gray-500">
                      Categoria: <b>{item.categoria}</b>
                    </div>
                  )}

                  {item.enquadramento && item.enquadramento !== item.categoria && (
                    <div className="text-[11px] text-gray-400">
                      Enquadramento: {item.enquadramento}
                    </div>
                  )}

                  {item.prazo && (
                    <div className="text-[10px] text-gray-400">
                      Prazo padrão: {item.prazo}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-base font-black text-prolab-primary">
                    {formatBRL(item.valor)}
                  </div>

                  {inCart ? (
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-xl p-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, inCart.qtd - 1)}
                        className="p-1 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold px-1.5 text-prolab-primary">
                        {inCart.qtd}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, inCart.qtd + 1)}
                        className="p-1 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addPriceToCart(item)}
                      className="px-3 py-1.5 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Drawer / Slide-Over Modal */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col animate-fade-in">
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#0F1B2D] to-[#00594C] text-white">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-prolab-teal" />
                <h3 className="font-bold text-sm">Orçamento Analítico</h3>
              </div>
              <button
                onClick={() => setShowCartDrawer(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client input for WhatsApp proposal */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-0.5">Nome do Cliente</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-0.5">Observação na Proposta</label>
                  <input
                    type="text"
                    value={clientObs}
                    onChange={e => setClientObs(e.target.value)}
                    placeholder="Ex: Entrega de laudo em 5 dias"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {selectedPrices.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-xs">
                  <ShoppingCart className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  Nenhum ensaio adicionado ao orçamento ainda.
                </div>
              ) : (
                selectedPrices.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-gray-900 truncate">{item.nome}</div>
                      <div className="text-[11px] text-gray-500">
                        {formatBRL(item.valor)} un.
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg p-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.qtd - 1)}
                        className="p-1 rounded bg-white text-gray-700 hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1.5">{item.qtd}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.qtd + 1)}
                        className="p-1 rounded bg-white text-gray-700 hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-black text-prolab-primary min-w-[70px] text-right">
                      {formatBRL(item.valor * item.qtd)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Total do Orçamento</span>
                <span className="text-2xl font-black text-prolab-primary">{formatBRL(cartTotal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyProposal}
                  disabled={selectedPrices.length === 0}
                  className="py-2.5 px-3 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Copiar WhatsApp</span>
                </button>

                <button
                  onClick={handleExportCartExcel}
                  disabled={selectedPrices.length === 0}
                  className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar Excel</span>
                </button>
              </div>

              {selectedPrices.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-center text-xs font-semibold text-gray-400 hover:text-red-600 transition-colors"
                >
                  Limpar todo o orçamento
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Norms Reference Modal */}
      {showNormsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-fade-in max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-prolab-primary" />
                <h3 className="text-sm font-bold text-gray-900">
                  Normas Oficiais & Enquadramento Regulatório
                </h3>
              </div>
              <button
                onClick={() => setShowNormsModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 font-bold text-lg"
              >
                ×
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-3 flex-1 text-xs text-gray-700">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <b className="text-blue-900 block font-bold text-xs">Portaria GM/MS nº 888/2021</b>
                <p className="text-gray-600">
                  Padrão de potabilidade da água para consumo humano. Exige análises bacteriológicas (Escherichia coli, Coliformes totais, Bactérias Heterotróficas) e físico-químicas (Cloro, Turbidez, Cor, pH, Flúor, Metais pesados e Agrotóxicos).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <b className="text-emerald-900 block font-bold text-xs">Instrução Normativa IN nº 161/2022 (ANVISA)</b>
                <p className="text-gray-600">
                  Estabelece os padrões microbiológicos para alimentos prontos para consumo, incluindo Salmonella spp., Listeria monocytogenes, Enterobactérias, Estafilococos coagulase positiva e bolores/leveduras.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <b className="text-amber-900 block font-bold text-xs">RDC nº 481/1999 & RDC nº 722/2022 (Cosméticos)</b>
                <p className="text-gray-600">
                  Controle microbiológico de produtos cosméticos, de higiene pessoal e perfumes. Classificação em Grau 1 (baixo risco) e Grau 2 (área dos olhos, bebês, íntimo) com limites de contagem de mesófilos e ausência de patógenos (Pseudomonas, Staphylococcus, Candida).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <b className="text-purple-900 block font-bold text-xs">Resolução RE nº 09/2003 (ANVISA) — Qualidade do Ar</b>
                <p className="text-gray-600">
                  Padrões referenciais de qualidade do ar interior em ambientes climatizados de uso público e coletivo. Recomenda amostragem semestral de fungos viáveis, temperatura, umidade, velocidade do ar e CO₂.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowNormsModal(false)}
                className="px-4 py-2 rounded-xl bg-prolab-primary text-white text-xs font-bold hover:bg-prolab-light transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
