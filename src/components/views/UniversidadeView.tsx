import React, { useState } from 'react';
import { 
  DEFAULT_TRAININGS, 
  DEFAULT_NORMS, 
  DEFAULT_TECH_KB, 
  TrainingItem, 
  NormItem, 
  TechKbItem 
} from '../../data/university';
import { normalizeText } from '../../utils/formatters';
import { 
  GraduationCap, 
  BookOpen, 
  Search, 
  FileCheck, 
  ExternalLink, 
  CheckCircle, 
  Sparkles,
  HelpCircle,
  Video,
  Award
} from 'lucide-react';

export const UniversidadeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'treinamentos' | 'normas' | 'faq'>('treinamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'servicos', 'vendas', 'normas', 'procedimentos'];

  const filteredTrainings = DEFAULT_TRAININGS.filter(t => {
    if (selectedCategory !== 'Todos' && t.path !== selectedCategory && t.category !== selectedCategory) return false;
    if (!searchTerm.trim()) return true;
    const q = normalizeText(searchTerm);
    const text = `${t.title || t.titulo || ''} ${t.desc || t.descricao || ''}`;
    return normalizeText(text).includes(q);
  });

  const filteredNorms = DEFAULT_NORMS.filter(n => {
    if (!searchTerm.trim()) return true;
    const q = normalizeText(searchTerm);
    const text = `${n.title || n.titulo || ''} ${n.scope || n.classe || ''} ${n.summary || n.resumo || ''}`;
    return normalizeText(text).includes(q);
  });

  const filteredFaq = DEFAULT_TECH_KB.filter(f => {
    if (!searchTerm.trim()) return true;
    const q = normalizeText(searchTerm);
    const text = `${f.title || f.titulo || ''} ${f.desc || f.descricao || ''} ${f.solution || f.solucao || ''}`;
    return normalizeText(text).includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2D] via-[#00594C] to-[#007A68] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            Capacitação Contínua PróLab
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Universidade Corporativa & Base Técnica
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Aprimore seu conhecimento técnico em normas da ANVISA, Ministério da Saúde, ensaios microbiológicos, físico-químicos e técnicas de negociação comercial consultiva.
          </p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveTab('treinamentos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'treinamentos' ? 'bg-white text-prolab-primary shadow-xs' : 'text-gray-600 hover:text-prolab-primary'
              }`}
            >
              Módulos de Treinamento ({DEFAULT_TRAININGS.length})
            </button>
            <button
              onClick={() => setActiveTab('normas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'normas' ? 'bg-white text-prolab-primary shadow-xs' : 'text-gray-600 hover:text-prolab-primary'
              }`}
            >
              Normas & Regulatórios ({DEFAULT_NORMS.length})
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'faq' ? 'bg-white text-prolab-primary shadow-xs' : 'text-gray-600 hover:text-prolab-primary'
              }`}
            >
              Base de Conhecimento / FAQ ({DEFAULT_TECH_KB.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar conteúdos..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
            />
          </div>
        </div>

        {activeTab === 'treinamentos' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase mr-1">Categoria:</span>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize transition-all ${
                  selectedCategory === c
                    ? 'bg-prolab-primary text-white border-prolab-primary font-bold'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-prolab-teal'
                }`}
              >
                {c === 'servicos' ? 'Serviços Laboratoriais' : c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Panels */}
      {activeTab === 'treinamentos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrainings.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-prolab-teal hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-prolab-primary font-bold text-[10px] uppercase tracking-wider">
                    {item.path || item.category || 'Treinamento'}
                  </span>
                  {item.duration && (
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.duration}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-gray-900 group-hover:text-prolab-primary transition-colors leading-snug">
                  {item.title || item.titulo}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc || item.descricao || 'Diretrizes técnicas, metodologias aplicadas e procedimentos para orientação de clientes.'}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-prolab-primary font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Conteúdo Oficial</span>
                </span>
                <span className="text-gray-400 text-[11px]">PróLab Lab Academy</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'normas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNorms.map((norm, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[10px] uppercase tracking-wider">
                  {norm.org || 'Regulatório'}
                </span>
                {norm.scope && (
                  <span className="text-[11px] text-gray-400 font-medium">
                    {norm.scope}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm text-gray-900 leading-snug">
                {norm.title || norm.titulo}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                {norm.summary || norm.resumo || 'Diretriz regulatória para conformidade e laudos analíticos oficiais.'}
              </p>

              {norm.keyTests && norm.keyTests.length > 0 && (
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Principais Parâmetros Exigidos:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {norm.keyTests.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-3">
          {filteredFaq.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-prolab-primary shrink-0" />
                <h3 className="font-bold text-xs text-gray-900">{item.title || item.titulo}</h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed pl-6">
                {item.desc || item.descricao || item.solution || item.solucao}
              </p>

              {(item.solution || item.solucao) && (item.desc || item.descricao) && (
                <div className="ml-6 p-3 rounded-xl bg-emerald-50/50 border-l-2 border-prolab-teal text-xs text-gray-700">
                  <b className="text-prolab-primary">Orientação recomendada:</b> {item.solution || item.solucao}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
