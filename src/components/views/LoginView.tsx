import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, ShieldCheck, UserCheck, Lock, User, ArrowRight } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, users, savedUser, rememberMe: initialRemember } = useAuth();
  const [username, setUsername] = useState(savedUser || 'admin');
  const [password, setPassword] = useState('admin2024');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(initialRemember);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password, remember);
      if (!res.success) {
        setError(res.error || 'Erro ao realizar login.');
      }
      setLoading(false);
    }, 150);
  };

  const handleSelectQuickUser = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0A1628] via-[#0F1B2D] to-[#00594C]">
      <div className="bg-white/98 rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl border border-white/20 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center">
            <span className="text-4xl font-black tracking-tight text-[#0F1B2D]">Pró</span>
            <span className="text-4xl font-black tracking-tight text-prolab-teal">Lab</span>
          </div>
          <div className="text-[11px] font-bold text-prolab-textMuted tracking-[6px] uppercase mt-1">
            Biotecnologia
          </div>
          <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
            Sistema Integrado Comercial — Triagem, Templates, Shelf Life e Custos Logísticos
          </p>
        </div>

        {/* Feature Steps */}
        <div className="space-y-2 mb-6">
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
            <span className="text-lg leading-none shrink-0">📋</span>
            <div>
              <b className="text-gray-900 block font-semibold">1. Suporte Comercial faz a triagem</b>
              <span className="text-gray-600">Capta dados obrigatórios, demanda, segmento, análises e contexto do lead.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
            <span className="text-lg leading-none shrink-0">🎯</span>
            <div>
              <b className="text-gray-900 block font-semibold">2. Sistema classifica o potencial</b>
              <span className="text-gray-600">O diagnóstico orienta Potencial A/B/C e indica o vendedor responsável.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
            <span className="text-lg leading-none shrink-0">📲</span>
            <div>
              <b className="text-gray-900 block font-semibold">3. Mensagem integral e editável</b>
              <span className="text-gray-600">Visualize a mensagem completa antes de copiar ou abrir no WhatsApp.</span>
            </div>
          </div>
        </div>

        {/* Access Pills */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[11px]">
            <b className="block text-prolab-primary font-bold">Gestão</b>
            <span className="text-gray-500">Parâmetros, templates, custos e histórico.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[11px]">
            <b className="block text-prolab-primary font-bold">Operação</b>
            <span className="text-gray-500">Triagem, templates e cálculos comerciais.</span>
          </div>
        </div>

        {/* Quick User Selection Chips */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
            Acesso Rápido para Demonstração
          </label>
          <div className="flex flex-wrap gap-1.5">
            {users.slice(0, 5).map(u => (
              <button
                key={u.user}
                type="button"
                onClick={() => handleSelectQuickUser(u.user, u.pass)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  username === u.user
                    ? 'bg-prolab-primary text-white border-prolab-primary font-semibold'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-prolab-teal'
                }`}
              >
                {u.nome} ({u.role === 'admin' ? 'Gestão' : 'Operador'})
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Usuário
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Seu usuário"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-prolab-teal focus:ring-2 focus:ring-prolab-teal/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
                className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-prolab-teal focus:ring-2 focus:ring-prolab-teal/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="rounded border-gray-300 text-prolab-primary focus:ring-prolab-teal"
              />
              <span>Lembrar meu usuário</span>
            </label>
            <span className="text-gray-400 text-[11px]">v2.0 Segura</span>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 text-center animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-prolab-primary hover:bg-prolab-light text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center text-[11px] text-gray-400">
          Esqueceu a senha? Solicite ao seu gestor. Dados salvos localmente neste navegador.
        </div>
      </div>
    </div>
  );
};
