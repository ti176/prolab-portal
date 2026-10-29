import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  ClipboardCheck, 
  Tag, 
  Truck, 
  MessageSquare, 
  Clock, 
  BarChart3, 
  Bell, 
  Plus, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

export const HomeView: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { 
    setCurrentView, 
    leads, 
    messages, 
    addMessage, 
    toggleMessageRead, 
    priceCatalog 
  } = useApp();

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTo, setNoteTo] = useState('Todos');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [notePriority, setNotePriority] = useState<'normal' | 'alta' | 'urgente'>('normal');

  const leadsA = leads.filter(l => l.resultado.cat === 'A').length;
  const unreadMessages = messages.filter(m => !m.lido).length;

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteText.trim()) return;

    addMessage({
      de: user?.nome || 'Operador',
      para: noteTo,
      titulo: noteTitle.trim(),
      texto: noteText.trim(),
      prioridade: notePriority,
    });

    setNoteTitle('');
    setNoteText('');
    setShowNoteModal(false);
  };

  const blogPosts = [
    {
      title: 'Portaria GM/MS nº 888/2021: Parâmetros e Padrão de Potabilidade de Água',
      desc: 'Compreenda as exigências de ensaios microbiológicos, físico-químicos e agrotóxicos para empresas e condomínios.',
      tag: 'Legislação Água',
      link: 'https://prolabnet.com.br/blog',
    },
    {
      title: 'Estudo de Shelf Life em Alimentos: Métodos Acelerados e Tempo Real',
      desc: 'Como determinar com precisão a data de validade de produtos alimentícios garantindo segurança sanitária.',
      tag: 'Shelf Life',
      link: 'https://prolabnet.com.br/blog',
    },
    {
      title: 'Controle de Qualidade em Farmácias de Manipulação e Injetáveis',
      desc: 'Ensaios de esterilidade, endotoxinas bacterianas e teor de princípio ativo para fórmulas estéreis.',
      tag: 'Farmacêutico',
      link: 'https://prolabnet.com.br/blog',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 py-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F1B2D] via-[#00594C] to-[#007A68] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-emerald-200 mb-3 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-prolab-teal" />
            Portal PróLab Biotecnologia 2.0
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Olá, {user?.nome}!
          </h1>
          <p className="text-sm text-white/80 mt-1 leading-relaxed">
            Bem-vindo ao seu painel operacional comercial. Faça triagens inteligentes, consulte preços analíticos, elabore orçamentos e envie propostas assertivas.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => setCurrentView('form')}
              className="px-4 py-2.5 rounded-xl bg-white text-prolab-primary font-bold text-xs shadow-md hover:bg-emerald-50 transition-all flex items-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4 text-prolab-teal" />
              Nova Triagem de Lead
            </button>
            <button
              onClick={() => setCurrentView('preco')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Tag className="w-4 h-4" />
              Tabela de Preços ({priceCatalog.length})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setCurrentView('dash')}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm cursor-pointer hover:border-prolab-teal transition-all group"
        >
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total de Leads</span>
            <TrendingUp className="w-4 h-4 text-prolab-primary group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-gray-900">{leads.length}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Registrados no sistema</span>
        </div>

        <div 
          onClick={() => setCurrentView('dash')}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm cursor-pointer hover:border-prolab-teal transition-all group"
        >
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Potencial A (Ouro)</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Alta prioridade</span>
          </div>
          <div className="text-2xl font-black text-prolab-primary">{leadsA}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Leads de alto valor</span>
        </div>

        <div 
          onClick={() => setCurrentView('preco')}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm cursor-pointer hover:border-prolab-teal transition-all group"
        >
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Catálogo de Ensaios</span>
            <Tag className="w-4 h-4 text-prolab-gold group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-gray-900">{priceCatalog.length}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Parâmetros analíticos</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Recados Pendentes</span>
            <Bell className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{unreadMessages}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Mensagens internas</span>
        </div>
      </div>

      {/* Quick Action Shortcuts Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
          Acesso Rápido aos Módulos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'form', title: 'Triagem', desc: 'Qualificação de lead', icon: <ClipboardCheck className="w-5 h-5 text-prolab-primary" /> },
            { id: 'preco', title: 'Preços', desc: 'Ensaios e cotações', icon: <Tag className="w-5 h-5 text-prolab-teal" /> },
            { id: 'templates', title: 'Templates', desc: 'WhatsApp de vendas', icon: <MessageSquare className="w-5 h-5 text-prolab-gold" /> },
            { id: 'shelf', title: 'Shelf Life', desc: 'Estudo de validade', icon: <Clock className="w-5 h-5 text-orange-600" /> },
            { id: 'logistica', title: 'Coleta Técnica', desc: 'Custos logísticos', icon: <Truck className="w-5 h-5 text-blue-600" /> },
            { id: 'dash', title: 'Gestão CRM', desc: 'Pipeline e relatórios', icon: <BarChart3 className="w-5 h-5 text-purple-600" /> },
          ].map(mod => (
            <button
              key={mod.id}
              onClick={() => setCurrentView(mod.id as any)}
              className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-prolab-teal hover:shadow-md transition-all text-left flex flex-col justify-between group h-28"
            >
              <div className="p-2 rounded-lg bg-gray-50 w-fit group-hover:bg-emerald-50 transition-colors">
                {mod.icon}
              </div>
              <div>
                <b className="block text-xs font-bold text-gray-900 group-hover:text-prolab-primary transition-colors">
                  {mod.title}
                </b>
                <span className="text-[11px] text-gray-500 leading-tight block">
                  {mod.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column: Internal Messages & Blog Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Internal Messages Billboard */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">
                Mural de Recados & Anotações
              </h3>
            </div>
            <button
              onClick={() => setShowNoteModal(true)}
              className="px-3 py-1.5 rounded-lg bg-prolab-primary hover:bg-prolab-light text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Anotar Recado</span>
            </button>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-xs">
                Nenhum recado pendente no momento.
              </div>
            ) : (
              messages.map(m => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    m.lido
                      ? 'bg-gray-50/70 border-gray-200 opacity-60'
                      : m.prioridade === 'urgente'
                      ? 'bg-red-50/70 border-red-200'
                      : m.prioridade === 'alta'
                      ? 'bg-amber-50/70 border-amber-200'
                      : 'bg-emerald-50/40 border-emerald-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-bold text-xs text-gray-900">{m.titulo}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      m.prioridade === 'urgente'
                        ? 'bg-red-200 text-red-800'
                        : m.prioridade === 'alta'
                        ? 'bg-amber-200 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {m.prioridade}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    {m.texto}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-200/50">
                    <span>
                      De: <b>{m.de}</b> → Para: <b>{m.para}</b>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{formatDateTime(m.ts)}</span>
                      <button
                        onClick={() => toggleMessageRead(m.id)}
                        className={`text-xs p-1 rounded hover:bg-gray-200 transition-colors ${
                          m.lido ? 'text-gray-400' : 'text-prolab-primary font-bold'
                        }`}
                        title={m.lido ? 'Marcar como não lido' : 'Marcar como lido'}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Technical Blog & News */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-prolab-primary">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">
                Base Técnica & Legislação Laboratorial
              </h3>
            </div>
            <a
              href="https://prolabnet.com.br/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-prolab-primary hover:text-prolab-teal flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-3">
            {blogPosts.map((post, i) => (
              <a
                key={i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3.5 rounded-xl border border-gray-200 hover:border-prolab-teal hover:shadow-sm transition-all group"
              >
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-prolab-primary font-bold text-[10px] uppercase tracking-wider mb-1.5">
                  {post.tag}
                </span>
                <h4 className="font-bold text-xs text-gray-900 group-hover:text-prolab-primary transition-colors leading-snug">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {post.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Anotar Recado */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📝</span> Anotar Recado Interno
            </h3>
            <form onSubmit={handleSaveNote} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Destinatário
                </label>
                <select
                  value={noteTo}
                  onChange={e => setNoteTo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                >
                  <option value="Todos">Todos os Colaboradores</option>
                  <option value="Felipe">Felipe (Gerência)</option>
                  <option value="Camila">Camila (Comercial)</option>
                  <option value="Halina">Halina (Comercial)</option>
                  <option value="Suporte">Suporte Técnico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Título / Assunto
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  placeholder="Ex: Retorno cliente X, coleta agendada"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Prioridade
                </label>
                <div className="flex gap-2">
                  {(['normal', 'alta', 'urgente'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNotePriority(p)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase border transition-all ${
                        notePriority === p
                          ? 'bg-prolab-primary text-white border-prolab-primary'
                          : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mensagem / Descrição
                </label>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Escreva os detalhes do recado..."
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-prolab-primary text-white text-xs font-bold hover:bg-prolab-light transition-colors"
                >
                  Salvar Recado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
