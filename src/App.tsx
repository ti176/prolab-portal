import React from 'react';
import { useAuth } from './context/AuthContext';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LoginView } from './components/views/LoginView';
import { HomeView } from './components/views/HomeView';
import { TriagemView } from './components/views/TriagemView';
import { PrecoView } from './components/views/PrecoView';
import { TemplatesView } from './components/views/TemplatesView';
import { ShelfLifeView } from './components/views/ShelfLifeView';
import { LogisticaView } from './components/views/LogisticaView';
import { GestaoView } from './components/views/GestaoView';
import { UniversidadeView } from './components/views/UniversidadeView';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const MainApp: React.FC = () => {
  const { user } = useAuth();
  const { currentView, toasts } = useApp();

  if (!user) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F3]">
      <Header />
      <main className="flex-1 pb-12">
        {currentView === 'home' && <HomeView />}
        {currentView === 'form' && <TriagemView />}
        {currentView === 'preco' && <PrecoView />}
        {currentView === 'templates' && <TemplatesView />}
        {currentView === 'shelf' && <ShelfLifeView />}
        {currentView === 'logistica' && <LogisticaView />}
        {currentView === 'dash' && <GestaoView />}
        {currentView === 'treinamentos' && <UniversidadeView />}
      </main>
      <Footer />

      {/* Global Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold text-white transition-all transform animate-fade-in pointer-events-auto ${
              t.type === 'ok' ? 'bg-[#00594C]' : 'bg-[#C0392B]'
            }`}
          >
            {t.type === 'ok' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
