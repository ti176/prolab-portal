import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  DIAGNOSTIC_QUESTIONS, 
  SEGS, 
  ANAS, 
  ORIS, 
  DiagnosticOption 
} from '../../data/diagnostic';
import { DEFAULT_VENDORS } from '../../data/users';
import { LeadInfo, LeadRecord } from '../../types';
import { 
  calculateDiagnostic, 
  generateAISummary, 
  buildLeadWhatsAppMessage 
} from '../../utils/calculations';
import { maskPhone, onlyDigits } from '../../utils/formatters';
import { 
  ClipboardCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  Eye, 
  RotateCcw, 
  Save, 
  Sparkles,
  AlertTriangle,
  Flame,
  Lightbulb,
  Info
} from 'lucide-react';

export const TriagemView: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { addLead, setCurrentView, toast } = useApp();

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form info
  const [info, setInfo] = useState<LeadInfo>({
    nome: '',
    cargo: '',
    empresa: '',
    whatsapp: '',
    email: '',
    segmento: '',
    outroSeg: '',
    analises: [],
    outraAna: '',
    origem: '',
    obs: '',
    site: '',
  });

  // Diagnostic answers
  const [diagAnswers, setDiagAnswers] = useState<Record<string, any>>({});
  const [assignedVendor, setAssignedVendor] = useState(DEFAULT_VENDORS[0].id);

  // Saved lead
  const [savedLead, setSavedLead] = useState<LeadRecord | null>(null);
  const [showFullModal, setShowFullModal] = useState(false);

  // Validate Step 0
  const handleValidateStep0 = () => {
    const errs: Record<string, string> = {};
    if (!info.nome.trim()) errs.nome = 'Nome do contato é obrigatório.';
    if (!info.empresa.trim()) errs.empresa = 'Nome da empresa é obrigatório.';
    if (!info.whatsapp.trim() && !info.email.trim()) {
      errs.whatsapp = 'Informe ao menos WhatsApp ou E-mail.';
      errs.email = 'Informe ao menos WhatsApp ou E-mail.';
    }
    if (!info.segmento) errs.segmento = 'Selecione um segmento.';
    if (info.analises.length === 0) errs.analises = 'Selecione ao menos uma análise de interesse.';

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(1);
    }
  };

  // Toggle analysis chip
  const toggleAnalysis = (ana: string) => {
    setInfo(prev => {
      const exists = prev.analises.includes(ana);
      return {
        ...prev,
        analises: exists ? prev.analises.filter(a => a !== ana) : [...prev.analises, ana],
      };
    });
  };

  // Select diagnostic option
  const handleSelectOption = (qid: string, opt: DiagnosticOption) => {
    setDiagAnswers(prev => ({
      ...prev,
      [qid]: opt.v,
      [qid + '_o']: opt,
    }));
  };

  const isAllAnswered = DIAGNOSTIC_QUESTIONS.every(q => diagAnswers[q.id] !== undefined);
  const diagResult = calculateDiagnostic(diagAnswers, DIAGNOSTIC_QUESTIONS, DEFAULT_VENDORS);
  const aiSummary = generateAISummary(info, diagResult);

  // Save Lead
  const handleSaveLead = () => {
    const newLead: LeadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      ts: Date.now(),
      info,
      diag: diagAnswers,
      resultado: diagResult,
      vendor: assignedVendor,
      operador: user?.nome || 'Operador',
      stage: 'Novo',
    };

    addLead(newLead);
    setSavedLead(newLead);
    setStep(3);
    toast('Lead salvo com sucesso no CRM!', 'ok');
  };

  const resetForm = () => {
    setInfo({
      nome: '',
      cargo: '',
      empresa: '',
      whatsapp: '',
      email: '',
      segmento: '',
      outroSeg: '',
      analises: [],
      outraAna: '',
      origem: '',
      obs: '',
      site: '',
    });
    setDiagAnswers({});
    setSavedLead(null);
    setStep(0);
  };

  const savedMessage = savedLead ? buildLeadWhatsAppMessage(savedLead, aiSummary) : '';
  const vendorObj = DEFAULT_VENDORS.find(v => v.id === (savedLead?.vendor || assignedVendor));
  const waUrl = vendorObj?.whatsapp
    ? `https://wa.me/55${onlyDigits(vendorObj.whatsapp)}?text=${encodeURIComponent(savedMessage)}`
    : '';

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(savedMessage);
    toast('Mensagem copiada para a área de transferência!', 'ok');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-prolab-primary/10 text-prolab-primary">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">
              Triagem Comercial de Leads
            </h1>
            <p className="text-xs text-gray-500">
              Padronize o primeiro contato e qualifique com precisão técnica
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
          <span className={`px-2.5 py-1 rounded-lg ${step === 0 ? 'bg-prolab-primary text-white font-bold' : 'bg-gray-100'}`}>
            1. Dados
          </span>
          <span className="text-gray-300">→</span>
          <span className={`px-2.5 py-1 rounded-lg ${step === 1 ? 'bg-prolab-primary text-white font-bold' : 'bg-gray-100'}`}>
            2. Diagnóstico
          </span>
          <span className="text-gray-300">→</span>
          <span className={`px-2.5 py-1 rounded-lg ${step >= 2 ? 'bg-prolab-primary text-white font-bold' : 'bg-gray-100'}`}>
            3. Resultado
          </span>
        </div>
      </div>

      {/* STEP 0: Lead Contact Information */}
      {step === 0 && (
        <div className="space-y-5">
          {/* Welcome steps banner */}
          <div className="bg-gradient-to-r from-[#0F1B2D] to-[#00594C] text-white rounded-2xl p-5 shadow-sm">
            <div className="text-sm font-bold mb-1">🧭 Passo a passo da triagem comercial</div>
            <p className="text-xs text-white/75 leading-relaxed">
              Use este fluxo para padronizar o primeiro atendimento, mapear a exigência regulatória e direcionar o lead ao vendedor responsável.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2">
              <span>👤</span> Dados do Contato
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nome do Contato <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={info.nome}
                  onChange={e => setInfo({ ...info, nome: e.target.value })}
                  placeholder="Nome do solicitante"
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none ${
                    errors.nome ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-prolab-teal'
                  }`}
                />
                {errors.nome && <span className="text-[11px] text-red-600 mt-1 block">{errors.nome}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cargo</label>
                <input
                  type="text"
                  value={info.cargo}
                  onChange={e => setInfo({ ...info, cargo: e.target.value })}
                  placeholder="Ex: Gerente de Qualidade / Compras"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={info.empresa}
                onChange={e => setInfo({ ...info, empresa: e.target.value })}
                placeholder="Razão social ou nome fantasia"
                className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none ${
                  errors.empresa ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-prolab-teal'
                }`}
              />
              {errors.empresa && <span className="text-[11px] text-red-600 mt-1 block">{errors.empresa}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  📱 WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={info.whatsapp}
                  onChange={e => setInfo({ ...info, whatsapp: maskPhone(e.target.value) })}
                  placeholder="(11) 99999-0000"
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none ${
                    errors.whatsapp ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-prolab-teal'
                  }`}
                />
                {errors.whatsapp && <span className="text-[11px] text-red-600 mt-1 block">{errors.whatsapp}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ✉️ E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={info.email}
                  onChange={e => setInfo({ ...info, email: e.target.value })}
                  placeholder="contato@empresa.com.br"
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none ${
                    errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-prolab-teal'
                  }`}
                />
                {errors.email && <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">🌐 Site da Empresa</label>
              <input
                type="text"
                value={info.site}
                onChange={e => setInfo({ ...info, site: e.target.value })}
                placeholder="www.empresa.com.br"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
              />
            </div>
          </div>

          {/* Segment Chips */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2">
                <span>🏭</span> Segmento de Atuação <span className="text-red-500">*</span>
              </h2>
              {errors.segmento && <span className="text-[11px] text-red-600 font-semibold">{errors.segmento}</span>}
            </div>

            <div className="flex flex-wrap gap-2">
              {SEGS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setInfo({ ...info, segmento: s })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    info.segmento === s
                      ? 'bg-prolab-primary text-white border-prolab-primary font-bold shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-prolab-teal'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {info.segmento === 'Outro' && (
              <input
                type="text"
                value={info.outroSeg}
                onChange={e => setInfo({ ...info, outroSeg: e.target.value })}
                placeholder="Qual o segmento?"
                className="w-full mt-2 px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
              />
            )}
          </div>

          {/* Analytical Demands Chips */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2">
                <span>🔬</span> Análises de Interesse <span className="text-red-500">*</span>
              </h2>
              {errors.analises && <span className="text-[11px] text-red-600 font-semibold">{errors.analises}</span>}
            </div>

            <div className="flex flex-wrap gap-2">
              {ANAS.map(a => {
                const selected = info.analises.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAnalysis(a)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selected
                        ? 'bg-prolab-primary text-white border-prolab-primary font-bold shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-prolab-teal'
                    }`}
                  >
                    {selected ? '✓ ' : ''}{a}
                  </button>
                );
              })}
            </div>

            {info.analises.includes('Outro') && (
              <input
                type="text"
                value={info.outraAna}
                onChange={e => setInfo({ ...info, outraAna: e.target.value })}
                placeholder="Quais outras análises?"
                className="w-full mt-2 px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
              />
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2">
              <span>📌</span> Informações Adicionais
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Origem do Lead</label>
                <select
                  value={info.origem}
                  onChange={e => setInfo({ ...info, origem: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal bg-white"
                >
                  <option value="">Selecione a origem...</option>
                  {ORIS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Observações Relevantes</label>
                <input
                  type="text"
                  value={info.obs}
                  onChange={e => setInfo({ ...info, obs: e.target.value })}
                  placeholder="Ex: já possui laudos anteriores, urgência para auditoria"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-prolab-teal"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleValidateStep0}
            className="w-full py-3.5 px-6 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span>Iniciar Perguntas do Diagnóstico</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 1: Diagnostic Questions */}
      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gray-800">
                Diagnóstico Comercial — {info.empresa}
              </span>
              <p className="text-[11px] text-gray-500">
                Responda com base na conversa com o lead para calcular o potencial
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-prolab-primary">
                {Object.keys(diagAnswers).filter(k => !k.endsWith('_o')).length}/{DIAGNOSTIC_QUESTIONS.length}
              </span>
              <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-prolab-primary to-prolab-teal transition-all duration-300"
                  style={{
                    width: `${(Object.keys(diagAnswers).filter(k => !k.endsWith('_o')).length / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Questions Cards */}
          <div className="space-y-4">
            {DIAGNOSTIC_QUESTIONS.map(q => {
              const selectedOpt = diagAnswers[q.id + '_o'];
              return (
                <div key={q.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{q.icon}</span>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">{q.titulo}</h3>
                      <p className="text-[11px] text-gray-500">{q.sub}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {q.opts.map((opt, oi) => {
                      const isSel = selectedOpt === opt;
                      return (
                        <div
                          key={oi}
                          onClick={() => handleSelectOption(q.id, opt)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                            isSel
                              ? 'bg-emerald-50/70 border-prolab-primary ring-2 ring-prolab-primary/20 shadow-sm'
                              : 'bg-white border-gray-200 hover:border-prolab-teal'
                          }`}
                        >
                          <span className="text-xl shrink-0 mt-0.5">{opt.e}</span>
                          <div>
                            <div className="text-xs font-bold text-gray-900 leading-tight mb-1">
                              {opt.t}
                            </div>
                            <div className="text-[11px] text-gray-500 leading-snug">
                              {opt.d}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="py-3 px-5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar aos Dados</span>
            </button>

            <button
              onClick={() => setStep(2)}
              disabled={!isAllAnswered}
              className="flex-1 py-3 px-6 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Ver Resultado do Diagnóstico</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Diagnostic Scorecard & Vendor Allocation */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          {/* Main Scorecard Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md text-center space-y-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Diagnóstico Estratégico Concluído
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">{info.empresa}</h2>

            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xl font-black tracking-wider text-white shadow-sm"
              style={{
                backgroundColor:
                  diagResult.cat === 'A'
                    ? '#00594C'
                    : diagResult.cat === 'B'
                    ? '#C49A2B'
                    : '#B85C38',
              }}
            >
              <span>POTENCIAL CLASSE {diagResult.cat}</span>
            </div>

            <div className="text-xs font-semibold text-gray-600">
              Score Global Ponderado: <b className="text-gray-900">{diagResult.comp}%</b>
            </div>

            {/* Dimension Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {[
                { key: 'P', label: 'Porte / Potencial', val: diagResult.scores.P, color: '#00594C' },
                { key: 'U', label: 'Urgência', val: diagResult.scores.U, color: '#C49A2B' },
                { key: 'A', label: 'Aderência Técnica', val: diagResult.scores.A, color: '#007A68' },
                { key: 'R', label: 'Risco Comercial', val: diagResult.scores.R, color: '#C0392B' },
              ].map(d => (
                <div key={d.key} className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center">
                  <div className="text-lg font-black" style={{ color: d.color }}>{d.val}%</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-0.5">{d.label}</div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${d.val}%`, backgroundColor: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Strategic Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border border-teal-200/60 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-prolab-primary font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-prolab-teal" />
              <span>Resumo Analítico da Triagem</span>
            </div>
            <p className="text-xs text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: aiSummary.summary }} />
            <div className="text-[11px] text-gray-600 pt-1 font-medium">
              <b>Recomendação de Abordagem:</b> {aiSummary.approach}
            </div>
          </div>

          {/* Opportunities and Alerts */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Oportunidades & Alertas Identificados
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {aiSummary.opps.map((o, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    o.type === 'hot'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  {o.type === 'hot' ? (
                    <Flame className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span>{o.text}</span>
                </div>
              ))}

              {aiSummary.alerts.map((a, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    a.type === 'risk'
                      ? 'bg-red-50 border-red-200 text-red-950'
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  {a.type === 'risk' ? (
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  )}
                  <span>{a.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Assignment */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Atribuir Vendedor Responsável
            </h3>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_VENDORS.map(v => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setAssignedVendor(v.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    assignedVendor === v.id
                      ? 'bg-prolab-primary text-white border-prolab-primary shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-prolab-teal'
                  }`}
                >
                  {v.nome} ({v.id === diagResult.vendor ? 'Sugerido' : 'Disponível'})
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="py-3 px-5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Editar Respostas</span>
            </button>

            <button
              onClick={handleSaveLead}
              className="flex-1 py-3 px-6 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Lead no CRM e Gerar Mensagem</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Lead Saved Successfully */}
      {step === 3 && savedLead && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h2 className="text-xl font-black text-gray-900">Lead Salvo com Sucesso!</h2>
            <p className="text-xs text-gray-600">
              {savedLead.info.empresa} ·{' '}
              <span className="font-bold text-prolab-primary">POTENCIAL {savedLead.resultado.cat}</span> · Vendedor: {vendorObj?.nome}
            </p>
          </div>

          {/* WhatsApp Message Preview Box */}
          <div className="bg-[#ECE5DD] rounded-2xl p-4 sm:p-5 shadow-inner border border-gray-300 space-y-3">
            <div className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>📲</span> Pré-visualização da Mensagem Formatada
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm text-xs font-mono whitespace-pre-wrap leading-relaxed text-gray-900 border border-gray-200 max-h-72 overflow-y-auto">
              {savedMessage}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] py-2.5 px-4 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>📲 Abrir no WhatsApp e Enviar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={handleCopyMessage}
                className="py-2.5 px-4 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Mensagem</span>
              </button>

              <button
                onClick={() => setShowFullModal(true)}
                className="py-2.5 px-4 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Integral</span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={resetForm}
              className="flex-1 py-3 px-5 rounded-xl border border-gray-300 bg-white text-gray-800 font-bold text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Realizar Nova Triagem</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setCurrentView('dash')}
                className="py-3 px-6 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Acessar Gestão / CRM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Full Message Modal */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span>👁️</span> Mensagem Integral para o Vendedor
              </h3>
              <button
                onClick={() => setShowFullModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1"
              >
                ×
              </button>
            </div>

            <div className="py-4 overflow-y-auto flex-1">
              <div className="bg-[#ECE5DD] p-4 rounded-xl">
                <div className="bg-white p-4 rounded-lg shadow text-xs whitespace-pre-wrap font-mono leading-relaxed">
                  {savedMessage}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={handleCopyMessage}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </button>
              <button
                onClick={() => setShowFullModal(false)}
                className="px-4 py-2 rounded-xl bg-prolab-primary text-white text-xs font-bold hover:bg-prolab-light transition-colors"
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
