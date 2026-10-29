import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp, NavView } from '../../context/AppContext';
import { 
  Home, 
  ClipboardCheck, 
  GraduationCap, 
  Tag, 
  MessageSquare, 
  Clock, 
  Truck, 
  BarChart3, 
  LogOut, 
  ExternalLink,
  ShoppingCart
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { currentView, setCurrentView, selectedPrices } = useApp();

  const navItems: { id: NavView; label: string; icon: React.ReactNode; badge?: number; adminOnly?: boolean }[] = [
    { id: 'home', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'form', label: 'Triagem', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'treinamentos', label: 'Universidade', icon: <GraduationCap className="w-4 h-4" /> },
    { 
      id: 'preco', 
      label: 'Preços', 
      icon: <Tag className="w-4 h-4" />,
      badge: selectedPrices.length > 0 ? selectedPrices.length : undefined 
    },
    { id: 'templates', label: 'Templates', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'shelf', label: 'Shelf Life', icon: <Clock className="w-4 h-4" /> },
    { id: 'logistica', label: 'Coleta Técnica', icon: <Truck className="w-4 h-4" /> },
    { id: 'dash', label: 'Gestão', icon: <BarChart3 className="w-4 h-4" />, adminOnly: true },
  ];

  const roleLabel = isAdmin ? 'Gestão' : user?.role === 'vendedor' ? 'Vendedor' : 'Operação';

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0F1B2D] to-[#00594C] text-white shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="flex items-baseline">
            <span className="text-xl font-black tracking-tight text-white group-hover:text-prolab-teal transition-colors">Pró</span>
            <span className="text-xl font-black tracking-tight text-prolab-teal">Lab</span>
          </div>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-white/50 hidden sm:inline ml-1">
            Biotecnologia
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {navItems.map(item => {
            if (item.adminOnly && !isAdmin) return null;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-prolab-primary shadow-sm font-bold scale-[1.02]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-prolab-primary text-white' : 'bg-prolab-teal text-prolab-navy'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* External Blog Link */}
          <a
            href="https://prolabnet.com.br/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-200 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            title="Blog e Notícias PróLab"
          >
            <span>Blog</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </nav>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-xs font-bold leading-tight text-white">{user?.nome}</span>
            <span className="text-[10px] font-medium text-emerald-200/80 leading-tight">
              {roleLabel}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-400/30 text-prolab-teal flex items-center justify-center font-bold text-xs uppercase shadow-inner">
            {user?.nome ? user.nome.slice(0, 2) : 'PL'}
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white/70 hover:text-red-300 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-400/20"
            title="Sair do Sistema"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};
