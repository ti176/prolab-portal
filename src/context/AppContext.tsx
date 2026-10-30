import React, { createContext, useContext, useState, useEffect } from 'react';
import { LeadRecord, InternalMessage, SelectedPriceItem } from '../types';
import { DEFAULT_PRICES, PriceItem } from '../data/prices';
import { DEFAULT_TEMPLATES, CommercialTemplate } from '../data/templates';
import { DEFAULT_LOGISTICS_CONFIG, LogisticsConfig } from '../data/logistics';
import { DEFAULT_SHELF_CONFIG, ShelfConfig } from '../data/shelf';

export type NavView = 'home' | 'form' | 'treinamentos' | 'preco' | 'templates' | 'shelf' | 'logistica' | 'dash';

interface ToastState {
  id: number;
  message: string;
  type: 'ok' | 'err';
}

interface AppContextType {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;

  // Leads & Pipeline
  leads: LeadRecord[];
  addLead: (lead: LeadRecord) => void;
  updateLeadStage: (id: string, newStage: string) => void;
  deleteLead: (id: string) => void;

  // Internal Messages / Recados
  messages: InternalMessage[];
  addMessage: (msg: Omit<InternalMessage, 'id' | 'ts' | 'lido'>) => void;
  toggleMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Price Cart
  selectedPrices: SelectedPriceItem[];
  addPriceToCart: (item: PriceItem) => void;
  updateCartQuantity: (id: string, qtd: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;

  // Catalogs & Configs
  priceCatalog: PriceItem[];
  setPriceCatalog: React.Dispatch<React.SetStateAction<PriceItem[]>>;
  templates: CommercialTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<CommercialTemplate[]>>;
  logisticsConfig: LogisticsConfig;
  setLogisticsConfig: React.Dispatch<React.SetStateAction<LogisticsConfig>>;
  shelfConfig: ShelfConfig;
  setShelfConfig: React.Dispatch<React.SetStateAction<ShelfConfig>>;

  // Histories
  shelfHistory: any[];
  addShelfHistory: (entry: any) => void;
  logisticsHistory: any[];
  addLogisticsHistory: (entry: any) => void;

  // Toast
  toast: (message: string, type?: 'ok' | 'err') => void;
  toasts: ToastState[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<NavView>('home');

  // Leads
  const [leads, setLeads] = useState<LeadRecord[]>(() => {
    try {
      const saved = localStorage.getItem('prolab_leads') || localStorage.getItem('plx_leads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('prolab_leads', JSON.stringify(leads));
  }, [leads]);

  const addLead = (lead: LeadRecord) => {
    setLeads(prev => [lead, ...prev]);
  };

  const updateLeadStage = (id: string, newStage: string) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, stage: newStage } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  // Messages / Recados
  const [messages, setMessages] = useState<InternalMessage[]>(() => {
    try {
      const saved = localStorage.getItem('prolab_messages');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'msg_1',
          ts: Date.now() - 3600000 * 2,
          de: 'Felipe (Gerente)',
          para: 'Todos',
          titulo: 'Alinhamento Comercial Água Potável',
          texto: 'Atenção ao verificar a quantidade de pontos de coleta na Portaria GM/MS 888. Priorizar cotações com coleta técnica inclusa.',
          prioridade: 'alta',
          lido: false,
        },
        {
          id: 'msg_2',
          ts: Date.now() - 3600000 * 6,
          de: 'Camila',
          para: 'Halina',
          titulo: 'Retorno cliente Alimentos São Paulo',
          texto: 'Cliente solicitou formalização com shelf life acelerado e real. Cotação já calculada na ferramenta.',
          prioridade: 'normal',
          lido: false,
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('prolab_messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (msg: Omit<InternalMessage, 'id' | 'ts' | 'lido'>) => {
    const newMsg: InternalMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      ts: Date.now(),
      lido: false,
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const toggleMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => (m.id === id ? { ...m, lido: !m.lido } : m)));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Price Cart
  const [selectedPrices, setSelectedPrices] = useState<SelectedPriceItem[]>(() => {
    try {
      const saved = localStorage.getItem('prolab_selected_prices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('prolab_selected_prices', JSON.stringify(selectedPrices));
  }, [selectedPrices]);

  const addPriceToCart = (item: PriceItem) => {
    setSelectedPrices(prev => {
      const existing = prev.find(x => x.id === item.id);
      if (existing) {
        return prev.map(x => (x.id === item.id ? { ...x, qtd: x.qtd + 1 } : x));
      }
      return [
        ...prev,
        {
          id: item.id,
          nome: item.nome,
          valor: item.valor,
          qtd: 1,
          segmento: item.segmento,
          categoria: item.categoria,
          tipo: item.tipo,
        },
      ];
    });
    toast(`"${item.nome}" adicionado ao orçamento`, 'ok');
  };

  const updateCartQuantity = (id: string, qtd: number) => {
    if (qtd <= 0) {
      removeFromCart(id);
      return;
    }
    setSelectedPrices(prev => prev.map(x => (x.id === id ? { ...x, qtd } : x)));
  };

  const removeFromCart = (id: string) => {
    setSelectedPrices(prev => prev.filter(x => x.id !== id));
  };

  const clearCart = () => {
    setSelectedPrices([]);
  };

  const cartTotal = selectedPrices.reduce((acc, curr) => acc + (curr.valor || 0) * (curr.qtd || 1), 0);

  // Price Catalog (v2: tabela reajustada com +10% em todas as análises)
  const CATALOG_VERSION = 'prolab_price_catalog_v2_plus10';
  const [priceCatalog, setPriceCatalog] = useState<PriceItem[]>(() => {
    try {
      const version = localStorage.getItem('prolab_price_version');
      if (version !== CATALOG_VERSION) {
        localStorage.setItem('prolab_price_version', CATALOG_VERSION);
        localStorage.setItem('prolab_price_catalog', JSON.stringify(DEFAULT_PRICES));
        return DEFAULT_PRICES;
      }
      const saved = localStorage.getItem('prolab_price_catalog');
      return saved ? JSON.parse(saved) : DEFAULT_PRICES;
    } catch {
      return DEFAULT_PRICES;
    }
  });

  useEffect(() => {
    localStorage.setItem('prolab_price_catalog', JSON.stringify(priceCatalog));
  }, [priceCatalog]);

  // Templates
  const [templates, setTemplates] = useState<CommercialTemplate[]>(() => {
    try {
      const saved = localStorage.getItem('prolab_templates');
      return saved ? JSON.parse(saved) : DEFAULT_TEMPLATES;
    } catch {
      return DEFAULT_TEMPLATES;
    }
  });

  useEffect(() => {
    localStorage.setItem('prolab_templates', JSON.stringify(templates));
  }, [templates]);

  // Logistics Config
  const [logisticsConfig, setLogisticsConfig] = useState<LogisticsConfig>(() => {
    try {
      const saved = localStorage.getItem('prolab_logistics_config');
      return saved ? JSON.parse(saved) : DEFAULT_LOGISTICS_CONFIG;
    } catch {
      return DEFAULT_LOGISTICS_CONFIG;
    }
  });

  useEffect(() => {
    localStorage.setItem('prolab_logistics_config', JSON.stringify(logisticsConfig));
  }, [logisticsConfig]);

  // Shelf Config
  const [shelfConfig, setShelfConfig] = useState<ShelfConfig>(() => {
    try {
      const saved = localStorage.getItem('prolab_shelf_config');
      return saved ? JSON.parse(saved) : DEFAULT_SHELF_CONFIG;
    } catch {
      return DEFAULT_SHELF_CONFIG;
    }
  });

  useEffect(() => {
    localStorage.setItem('prolab_shelf_config', JSON.stringify(shelfConfig));
  }, [shelfConfig]);

  // Histories
  const [shelfHistory, setShelfHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('plx_shelf_hist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addShelfHistory = (entry: any) => {
    const updated = [entry, ...shelfHistory];
    setShelfHistory(updated);
    localStorage.setItem('plx_shelf_hist', JSON.stringify(updated));
  };

  const [logisticsHistory, setLogisticsHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('plx_log_hist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addLogisticsHistory = (entry: any) => {
    const updated = [entry, ...logisticsHistory];
    setLogisticsHistory(updated);
    localStorage.setItem('plx_log_hist', JSON.stringify(updated));
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const toast = (message: string, type: 'ok' | 'err' = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        leads,
        addLead,
        updateLeadStage,
        deleteLead,
        messages,
        addMessage,
        toggleMessageRead,
        deleteMessage,
        selectedPrices,
        addPriceToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        priceCatalog,
        setPriceCatalog,
        templates,
        setTemplates,
        logisticsConfig,
        setLogisticsConfig,
        shelfConfig,
        setShelfConfig,
        shelfHistory,
        addShelfHistory,
        logisticsHistory,
        addLogisticsHistory,
        toast,
        toasts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
};
