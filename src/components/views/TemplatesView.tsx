import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  TPL_STAGES, 
  TPL_SERVICES, 
  CommercialTemplate, 
  DEFAULT_TEMPLATES 
} from '../../data/templates';
import { normalizeText } from '../../utils/formatters';
import { 
  MessageSquare, 
  Search, 
  Copy, 
  Eye, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  ChevronDown, 
  ChevronUp,
  FileText
} from 'lucide-react';

export const TemplatesView: React.FC = () => {
  const { isAdmin } = useAuth();
  const { templates, setTemplates, toast } = useApp();

  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [fieldValues, setFieldValues] = useState<Record<string, Record<string, string>>>({});
  
  // Modals
  const [previewTemplate, setPreviewTemplate] = useState<CommercialTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<CommercialTemplate | null>(null);
  const [isNewTemplate, setIsNewTemplate] = useState(false);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    const q = normalizeText(searchTerm);
    return templates.filter(t => {
      if (selectedStage && t.stage !== selectedStage) return false;
      if (selectedService !== 'todos' && !(t.services || []).includes(selectedService)) return false;
      if (!q) return true;

      const fullText = normalizeText(`${t.title} ${t.body} ${t.when || ''}`);
      return fullText.includes(q);
    });
  }, [templates, selectedStage, selectedService, searchTerm]);

  // Counts by stage
  const countsByStage = useMemo(() => {
    const map: Record<string, number> = {};
    templates.forEach(t => {
      map[t.stage] = (map[t.stage] || 0) + 1;
    });
    return map;
  }, [templates]);

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFieldChange = (templateId: string, fieldName: string, value: string) => {
    setFieldValues(prev => ({
      ...prev,
      [templateId]: {
        ...(prev[templateId] || {}),
        [fieldName]: value,
      },
    }));
  };

  const getProcessedBody = (t: CommercialTemplate) => {
    let text = t.body;
    const vals = fieldValues[t.id] || {};
    (t.fields || []).forEach(f => {
      const val = (vals[f.name] || '').trim();
      const fallback = f.placeholder ? f.placeholder.replace(/^ex:\s*/i, '') : `[${f.label}]`;
      text = text.replace(new RegExp(`{{${f.name}}}`, 'g'), val || fallback);
    });
    return text;
  };

  const handleCopy = (t: CommercialTemplate) => {
    const text = getProcessedBody(t);
    navigator.clipboard.writeText(text);
    toast('Template copiado com sucesso! Pode colar no WhatsApp.', 'ok');
  };

  const handleDeleteTemplate = (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este template?')) return;
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast('Template removido com sucesso.', 'ok');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    if (!editingTemplate.title.trim() || !editingTemplate.body.trim()) {
      toast('Título e texto são obrigatórios.', 'err');
      return;
    }

    if (isNewTemplate) {
      setTemplates(prev => [editingTemplate, ...prev]);
      toast('Novo template cadastrado com sucesso!', 'ok');
    } else {
      setTemplates(prev => prev.map(t => (t.id === editingTemplate.id ? editingTemplate : t)));
      toast('Template atualizado com sucesso!', 'ok');
    }

    setEditingTemplate(null);
  };

  const handleExportTemplates = () => {
    const blob = new Blob([JSON.stringify(templates, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prolab_templates_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Templates exportados em JSON!', 'ok');
  };

  const handleImportTemplates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed)) {
          setTemplates(parsed);
          toast(`${parsed.length} templates importados com sucesso!`, 'ok');
        } else {
          toast('Formato de arquivo inválido.', 'err');
        }
      } catch (err) {
        toast('Erro ao ler arquivo JSON.', 'err');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDefaults = () => {
    if (!confirm('Deseja restaurar os templates padrão do sistema? Suas edições locais serão substituídas.')) return;
    setTemplates(DEFAULT_TEMPLATES);
    toast('Templates restaurados para o padrão original.', 'ok');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2D] via-[#00594C] to-[#007A68] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Comunicação Comercial Padronizada
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Templates de Mensagens WhatsApp
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Respostas comerciais prontas para cada fase da negociação: qualificação técnica, orçamentos, formalização de propostas e orientações de coleta.
          </p>
        </div>

        {isAdmin && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setIsNewTemplate(true);
                setEditingTemplate({
                  id: `tpl_${Date.now()}`,
                  stage: 'qualificacao',
                  services: ['geral'],
                  title: '',
                  when: '',
                  body: '',
                  fields: [],
                });
              }}
              className="px-3 py-2 rounded-xl bg-prolab-teal hover:bg-teal-500 text-prolab-navy text-xs font-bold transition-all flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Template</span>
            </button>

            <button
              onClick={handleExportTemplates}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1"
              title="Exportar templates em JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>

            <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Importar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportTemplates}
                className="hidden"
              />
            </label>

            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1"
              title="Restaurar padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Sales Stages Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Etapas da Venda
          </span>
          {selectedStage && (
            <button
              onClick={() => setSelectedStage(null)}
              className="text-xs font-semibold text-prolab-primary hover:underline"
            >
              Mostrar todas as etapas
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {TPL_STAGES.map(s => {
            const isSel = selectedStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStage(isSel ? null : s.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSel
                    ? 'bg-emerald-50/70 border-prolab-primary ring-2 ring-prolab-primary/20 shadow-md'
                    : 'bg-white border-gray-200 hover:border-prolab-teal shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.num}
                  </span>
                  <span className="font-bold text-xs text-gray-900">{s.label}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug line-clamp-2 mb-2">
                  {s.desc}
                </p>
                <span className="text-[10px] font-bold text-prolab-primary block">
                  {countsByStage[s.id] || 0} templates
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Service Filter */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar template por palavra-chave (ex: água bruta, time kill, shelf life, dados cadastrais, contrato aberto)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal focus:ring-2 focus:ring-prolab-teal/20"
          />
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 mr-1">Serviço:</span>
            {TPL_SERVICES.map(svc => (
              <button
                key={svc.id}
                onClick={() => setSelectedService(svc.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap transition-all ${
                  selectedService === svc.id
                    ? 'bg-prolab-primary text-white border-prolab-primary shadow-xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-prolab-teal'
                }`}
              >
                {svc.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-gray-500 font-medium">
            <b>{filteredTemplates.length}</b> template(s) encontrado(s)
          </span>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500">
            <MessageSquare className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <h3 className="font-bold text-sm text-gray-800">Nenhum template encontrado</h3>
            <p className="text-xs text-gray-400 mt-1">Experimente remover os filtros de busca ou etapa.</p>
          </div>
        ) : (
          filteredTemplates.map(t => {
            const isExp = expandedCards.has(t.id);
            const stageObj = TPL_STAGES.find(s => s.id === t.stage);
            const hasFields = t.fields && t.fields.length > 0;
            const vals = fieldValues[t.id] || {};

            return (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-white font-bold text-[10px] uppercase tracking-wider"
                      style={{ backgroundColor: stageObj?.color || '#00594C' }}
                    >
                      {stageObj?.label || 'Geral'}
                    </span>
                    <div className="flex items-center gap-1">
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => {
                              setIsNewTemplate(false);
                              setEditingTemplate(t);
                            }}
                            className="p-1 rounded text-gray-400 hover:text-prolab-primary transition-colors"
                            title="Editar template"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(t.id)}
                            className="p-1 rounded text-gray-400 hover:text-red-600 transition-colors"
                            title="Excluir template"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-gray-900 leading-snug">
                    {t.title}
                  </h3>

                  {t.when && (
                    <div className="p-2.5 rounded-xl bg-teal-50/50 border-l-2 border-prolab-teal text-xs text-gray-600 leading-relaxed">
                      <b className="text-prolab-primary">Quando usar:</b> {t.when}
                    </div>
                  )}

                  {/* Body Preview */}
                  <div className="relative">
                    <div
                      className={`text-xs font-mono text-gray-800 bg-[#F8FAF9] p-3 rounded-xl border border-gray-200 whitespace-pre-wrap leading-relaxed overflow-hidden transition-all ${
                        isExp ? 'max-h-[500px]' : 'max-h-24'
                      }`}
                    >
                      {t.body}
                    </div>
                    {t.body.length > 150 && (
                      <button
                        onClick={() => toggleExpand(t.id)}
                        className="mt-1 text-[11px] font-bold text-prolab-primary hover:underline flex items-center gap-1"
                      >
                        {isExp ? (
                          <>
                            <ChevronUp className="w-3 h-3" />
                            <span>Recolher</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            <span>Ver completo</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Fillable Fields (if any) */}
                  {hasFields && (
                    <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                      <div className="text-[11px] font-bold uppercase text-amber-800 tracking-wider flex items-center gap-1">
                        <span>✏️</span> Preencher antes de copiar:
                      </div>
                      <div className="space-y-1.5">
                        {t.fields!.map(f => (
                          <div key={f.name} className="flex items-center gap-2 text-xs">
                            <label className="text-gray-600 min-w-[120px] shrink-0 font-medium truncate">
                              {f.label}:
                            </label>
                            <input
                              type="text"
                              value={vals[f.name] || ''}
                              onChange={e => handleFieldChange(t.id, f.name, e.target.value)}
                              placeholder={f.placeholder || 'Informe o valor'}
                              className="flex-1 px-2.5 py-1 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(t)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copiar Template</span>
                  </button>

                  <button
                    onClick={() => setPreviewTemplate(t)}
                    className="p-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    title="Visualizar mensagem formatada"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">{previewTemplate.title}</h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="py-4 overflow-y-auto flex-1">
              <div className="bg-[#ECE5DD] p-4 rounded-xl">
                <div className="bg-white p-4 rounded-lg shadow text-xs whitespace-pre-wrap font-mono leading-relaxed text-gray-900">
                  {getProcessedBody(previewTemplate)}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => handleCopy(previewTemplate)}
                className="px-4 py-2 rounded-xl bg-prolab-primary text-white text-xs font-bold hover:bg-prolab-light transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </button>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">
                {isNewTemplate ? 'Criar Novo Template' : 'Editar Template'}
              </h3>
              <button
                onClick={() => setEditingTemplate(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="py-4 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={editingTemplate.title}
                  onChange={e => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                  placeholder="Ex: Água Tratada — 2 opções de pacote"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Etapa Comercial</label>
                  <select
                    value={editingTemplate.stage}
                    onChange={e => setEditingTemplate({ ...editingTemplate, stage: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
                  >
                    {TPL_STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.num}. {s.label}</option>
                    ))}
                    <option value="referencia">★ Referência</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Quando usar</label>
                  <input
                    type="text"
                    value={editingTemplate.when || ''}
                    onChange={e => setEditingTemplate({ ...editingTemplate, when: e.target.value })}
                    placeholder="Dica para o vendedor..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Texto da Mensagem * (use {'{{variavel}}'} para criar campos dinâmicos)
                </label>
                <textarea
                  value={editingTemplate.body}
                  onChange={e => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                  rows={8}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono focus:outline-none focus:border-prolab-teal leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingTemplate(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-prolab-primary text-white text-xs font-bold hover:bg-prolab-light"
                >
                  Salvar Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
