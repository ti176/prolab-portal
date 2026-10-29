import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { PIPE } from '../../data/diagnostic';
import { DEFAULT_VENDORS } from '../../data/users';
import { LeadRecord } from '../../types';
import { formatBRL, formatDateTime, maskPhone, onlyDigits } from '../../utils/formatters';
import { exportLeadsToExcel } from '../../utils/excel';
import { 
  BarChart3, 
  Users, 
  Kanban, 
  FileSpreadsheet, 
  Settings, 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Shield,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const GestaoView: React.FC = () => {
  const { isAdmin } = useAuth();
  const { 
    leads, 
    updateLeadStage, 
    deleteLead, 
    logisticsConfig, 
    setLogisticsConfig,
    shelfConfig,
    setShelfConfig,
    toast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'leads' | 'resumo' | 'equipe' | 'config'>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('Todos');
  const [catFilter, setCatFilter] = useState('Todos');

  // Logistics form state
  const [logForm, setLogForm] = useState({ ...logisticsConfig });

  // Shelf params state
  const [shelfParams, setShelfParams] = useState({ ...shelfConfig.params });

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (stageFilter !== 'Todos' && l.stage !== stageFilter) return false;
      if (catFilter !== 'Todos' && l.resultado.cat !== catFilter) return false;
      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase();
      const text = `${l.info.empresa} ${l.info.nome} ${l.vendor} ${l.info.segmento}`.toLowerCase();
      return text.includes(q);
    });
  }, [leads, stageFilter, catFilter, searchTerm]);

  // Counts for KPIs
  const totalLeads = leads.length;
  const countA = leads.filter(l => l.resultado.cat === 'A').length;
  const countB = leads.filter(l => l.resultado.cat === 'B').length;
  const countC = leads.filter(l => l.resultado.cat === 'C').length;
  const countFechado = leads.filter(l => l.stage === 'Fechado').length;

  const handleExportExcel = () => {
    if (leads.length === 0) {
      toast('Nenhum lead cadastrado para exportar.', 'err');
      return;
    }
    exportLeadsToExcel(leads);
    toast('Relatório geral de leads exportado para Excel!', 'ok');
  };

  const handleSaveLogisticsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setLogisticsConfig(logForm);
    toast('Parâmetros de custos logísticos salvos com sucesso!', 'ok');
  };

  const handleSaveShelfConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setShelfConfig({ ...shelfConfig, params: shelfParams });
    toast('Parâmetros de Shelf Life salvos com sucesso!', 'ok');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2D] via-[#00594C] to-[#007A68] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Painel Executivo Comercial
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Gestão Comercial & Pipeline CRM
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Acompanhe o funil de vendas, gerencie carteiras de vendedores, exporte relatórios consolidados e ajuste parâmetros estratégicos do laboratório.
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          className="px-4 py-2.5 rounded-xl bg-white text-prolab-primary hover:bg-emerald-50 text-xs font-black shadow transition-all flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
          <span>Exportar Relatório Excel</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-1.5 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        {[
          { id: 'pipeline', label: 'Funil CRM (Kanban)', icon: <Kanban className="w-4 h-4" /> },
          { id: 'leads', label: `Lista de Leads (${leads.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'resumo', label: 'Métricas & KPIs', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'equipe', label: 'Equipe Comercial', icon: <UserCheck className="w-4 h-4" /> },
          { id: 'config', label: 'Parâmetros do Sistema', icon: <Settings className="w-4 h-4" /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-prolab-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-prolab-primary hover:bg-gray-50'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: PIPELINE KANBAN */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Arraste ou selecione a etapa do lead para atualizar seu progresso comercial no funil:</span>
            <span className="font-semibold text-prolab-primary">{leads.length} leads ativos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5 items-start">
            {PIPE.map(stage => {
              const stageLeads = leads.filter(l => l.stage === stage);
              return (
                <div
                  key={stage}
                  className="bg-gray-50/80 rounded-2xl p-3 border border-gray-200/90 shadow-2xs flex flex-col min-h-[500px]"
                >
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-200">
                    <span className="font-bold text-xs text-gray-900 truncate">
                      {stage}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-gray-700 font-bold text-[10px] border border-gray-200 shadow-xs">
                      {stageLeads.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px] pr-0.5">
                    {stageLeads.length === 0 ? (
                      <div className="text-center py-12 text-[11px] text-gray-400">
                        Nenhum lead
                      </div>
                    ) : (
                      stageLeads.map(lead => {
                        const vendor = DEFAULT_VENDORS.find(v => v.id === lead.vendor);
                        return (
                          <div
                            key={lead.id}
                            className="bg-white rounded-xl p-3 border border-gray-200 shadow-xs hover:border-prolab-teal hover:shadow-md transition-all space-y-2"
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <span
                                className="px-2 py-0.5 rounded text-white font-bold text-[9px] uppercase tracking-wider"
                                style={{
                                  backgroundColor:
                                    lead.resultado.cat === 'A'
                                      ? '#00594C'
                                      : lead.resultado.cat === 'B'
                                      ? '#C49A2B'
                                      : '#B85C38',
                                }}
                              >
                                Classe {lead.resultado.cat} ({lead.resultado.comp}%)
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {new Date(lead.ts).toLocaleDateString('pt-BR')}
                              </span>
                            </div>

                            <div>
                              <b className="text-xs font-bold text-gray-900 block truncate">
                                {lead.info.empresa}
                              </b>
                              <span className="text-[11px] text-gray-500 block truncate">
                                {lead.info.nome} {lead.info.cargo ? `· ${lead.info.cargo}` : ''}
                              </span>
                            </div>

                            <div className="text-[10px] text-gray-400 truncate">
                              Segmento: {lead.info.segmento}
                            </div>

                            {/* Stage Selector */}
                            <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
                              <select
                                value={lead.stage}
                                onChange={e => updateLeadStage(lead.id, e.target.value)}
                                className="text-[10px] font-semibold bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-700 focus:outline-none"
                              >
                                {PIPE.map(p => (
                                  <option key={p} value={p}>{p}</option>
                                ))}
                              </select>

                              {vendor?.whatsapp && (
                                <a
                                  href={`https://wa.me/55${onlyDigits(lead.info.whatsapp || vendor.whatsapp)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                  title="WhatsApp"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: LEADS TABLE */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar por empresa, contato ou vendedor..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
              />
            </div>

            <div>
              <select
                value={stageFilter}
                onChange={e => setStageFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
              >
                <option value="Todos">Todas as Etapas do CRM</option>
                {PIPE.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
              >
                <option value="Todos">Todas as Classificações</option>
                <option value="A">Classe A (Alto Potencial)</option>
                <option value="B">Classe B (Médio Potencial)</option>
                <option value="C">Classe C (Baixo Potencial)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
                  <th className="p-3">Data</th>
                  <th className="p-3">Empresa</th>
                  <th className="p-3">Contato</th>
                  <th className="p-3">Segmento</th>
                  <th className="p-3">Potencial</th>
                  <th className="p-3">Vendedor</th>
                  <th className="p-3">Etapa CRM</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-400">
                      Nenhum lead encontrado com os filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(l => (
                    <tr key={l.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-3 text-gray-500 whitespace-nowrap">
                        {formatDateTime(l.ts)}
                      </td>
                      <td className="p-3 font-bold text-gray-900">
                        {l.info.empresa}
                      </td>
                      <td className="p-3 text-gray-600">
                        <div>{l.info.nome}</div>
                        <div className="text-[11px] text-gray-400">{l.info.whatsapp || l.info.email}</div>
                      </td>
                      <td className="p-3 text-gray-600">
                        {l.info.segmento}
                      </td>
                      <td className="p-3">
                        <span
                          className="px-2 py-0.5 rounded text-white font-bold text-[10px] uppercase"
                          style={{
                            backgroundColor:
                              l.resultado.cat === 'A'
                                ? '#00594C'
                                : l.resultado.cat === 'B'
                                ? '#C49A2B'
                                : '#B85C38',
                          }}
                        >
                          Classe {l.resultado.cat}
                        </span>
                      </td>
                      <td className="p-3 text-gray-800 font-semibold">
                        {DEFAULT_VENDORS.find(v => v.id === l.vendor)?.nome || l.vendor}
                      </td>
                      <td className="p-3">
                        <select
                          value={l.stage}
                          onChange={e => updateLeadStage(l.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-gray-200 text-xs font-semibold bg-white"
                        >
                          {PIPE.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remover lead da empresa ${l.info.empresa}?`)) {
                              deleteLead(l.id);
                              toast('Lead removido.', 'ok');
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Excluir lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: METRICS & RESUMO */}
      {activeTab === 'resumo' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total de Leads</span>
              <div className="text-3xl font-black text-gray-900 mt-1">{totalLeads}</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Potencial A (Alto)</span>
              <div className="text-3xl font-black text-prolab-primary mt-1">{countA}</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Potencial B (Médio)</span>
              <div className="text-3xl font-black text-prolab-gold mt-1">{countB}</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">Contratos Fechados</span>
              <div className="text-3xl font-black text-purple-700 mt-1">{countFechado}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900">
              Distribuição por Etapa do Pipeline
            </h3>
            <div className="space-y-3">
              {PIPE.map(stage => {
                const count = leads.filter(l => l.stage === stage).length;
                const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                return (
                  <div key={stage} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>{stage}</span>
                      <span>{count} leads ({pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-prolab-primary to-prolab-teal rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB: TEAM / EQUIPE */}
      {activeTab === 'equipe' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEFAULT_VENDORS.map(v => {
            const vLeads = leads.filter(l => l.vendor === v.id);
            const vFechados = vLeads.filter(l => l.stage === 'Fechado').length;
            return (
              <div key={v.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-prolab-primary font-black text-lg flex items-center justify-center border border-emerald-200">
                    {v.nome.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{v.nome}</h3>
                    <span className="text-xs text-gray-500">Consultor Comercial</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>WhatsApp:</span>
                    <b className="text-gray-900">{maskPhone(v.whatsapp)}</b>
                  </div>
                  <div className="flex justify-between">
                    <span>Leads na Carteira:</span>
                    <b className="text-prolab-primary">{vLeads.length}</b>
                  </div>
                  <div className="flex justify-between">
                    <span>Contratos Fechados:</span>
                    <b className="text-emerald-700">{vFechados}</b>
                  </div>
                </div>

                <a
                  href={`https://wa.me/55${onlyDigits(v.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-gray-200"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Conversar via WhatsApp</span>
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: SYSTEM CONFIGURATION */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logistics Rates Editor */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <span>🚚</span> Parâmetros de Custos Logísticos
            </h3>
            <form onSubmit={handleSaveLogisticsConfig} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">R$ por km</label>
                  <input
                    type="number"
                    step="0.1"
                    value={logForm.km}
                    onChange={e => setLogForm({ ...logForm, km: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Margem (%)</label>
                  <input
                    type="number"
                    value={logForm.margem}
                    onChange={e => setLogForm({ ...logForm, margem: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Valor Mínimo (R$)</label>
                  <input
                    type="number"
                    value={logForm.minimo}
                    onChange={e => setLogForm({ ...logForm, minimo: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Passo Arredondamento (R$)</label>
                  <input
                    type="number"
                    value={logForm.arred}
                    onChange={e => setLogForm({ ...logForm, arred: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Taxa Espera (R$/h)</label>
                <input
                  type="number"
                  value={logForm.taxaEspera}
                  onChange={e => setLogForm({ ...logForm, taxaEspera: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-xs transition-colors shadow-sm"
              >
                Salvar Parâmetros Logísticos
              </button>
            </form>
          </div>

          {/* Shelf Life Params Editor */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <span>💰</span> Parâmetros de Shelf Life
            </h3>
            <form onSubmit={handleSaveShelfConfig} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Desconto Comercial Padrão (%)</label>
                <input
                  type="number"
                  value={shelfParams.desconto}
                  onChange={e => setShelfParams({ ...shelfParams, desconto: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Margem Adicional (%)</label>
                <input
                  type="number"
                  value={shelfParams.margem}
                  onChange={e => setShelfParams({ ...shelfParams, margem: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gramas por Ponto de Teste (g)</label>
                <input
                  type="number"
                  value={shelfParams.amostraGramas}
                  onChange={e => setShelfParams({ ...shelfParams, amostraGramas: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-xs transition-colors shadow-sm"
              >
                Salvar Parâmetros de Shelf Life
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
