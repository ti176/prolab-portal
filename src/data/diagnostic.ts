export const PIPE = ["Novo", "Em contato", "Proposta enviada", "Negociação", "Fechado", "Perdido"];

export const SEGS = [
  "Alimentício", "Cosméticos", "Hospitalar", "Embalagens", 
  "Farmacêutico", "Saúde", "Indústrias", "Químico", "Serviços", "Outro"
];

export const ANAS = [
  "Água", "Alimentos", "Shelf Life", "Cosméticos", "Ar", 
  "Embalagens descartáveis", "Farmácia de manipulação", "Endotoxinas", 
  "Máq. e equipamentos", "Microbiológicas", "Físico-químicas", "Estabilidade", "Outro"
];

export const ORIS = [
  "Google", "Indicação", "Redes sociais", "Evento/Feira", 
  "E-mail marketing", "Site PróLab", "WhatsApp", "Telefone", "Outro"
];

export interface DiagnosticOption {
  v: number;
  e: string;
  t: string;
  d: string;
  tags: string[];
}

export interface DiagnosticQuestion {
  id: string;
  titulo: string;
  sub: string;
  icon: string;
  dims: { P?: number; A?: number; U?: number; R?: number };
  opts: DiagnosticOption[];
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    "id": "volume",
    "titulo": "Volume estimado de amostras",
    "sub": "Quantas amostras/mês o cliente prevê?",
    "icon": "📦",
    "dims": {
      "P": 2,
      "A": 0.5
    },
    "opts": [
      {
        "v": 3,
        "e": "🏭",
        "t": "Alto volume (+50/mês)",
        "d": "Demanda contínua e recorrente",
        "tags": [
          "recorrente",
          "alto-valor",
          "premium"
        ]
      },
      {
        "v": 2,
        "e": "🏢",
        "t": "Moderado (10-50/mês)",
        "d": "Demanda regular",
        "tags": [
          "regular"
        ]
      },
      {
        "v": 1,
        "e": "🏠",
        "t": "Baixo (<10/mês)",
        "d": "Demanda esporádica",
        "tags": [
          "pontual",
          "baixo-volume"
        ]
      }
    ]
  },
  {
    "id": "situacao",
    "titulo": "Situação com laboratórios",
    "sub": "Já trabalha com algum lab?",
    "icon": "🔍",
    "dims": {
      "U": 1.5,
      "P": 0.5
    },
    "opts": [
      {
        "v": 3,
        "e": "😤",
        "t": "Insatisfeito — quer trocar",
        "d": "Problemas com prazo ou qualidade",
        "tags": [
          "switch",
          "urgente",
          "oportunidade"
        ]
      },
      {
        "v": 3,
        "e": "🆕",
        "t": "Primeira contratação",
        "d": "Nunca terceirizou",
        "tags": [
          "educacao",
          "desenvolvimento"
        ]
      },
      {
        "v": 2,
        "e": "🔄",
        "t": "Busca segundo lab",
        "d": "Quer alternativa",
        "tags": [
          "backup",
          "comparacao"
        ]
      },
      {
        "v": 1,
        "e": "🔎",
        "t": "Apenas pesquisando",
        "d": "Sem projeto concreto",
        "tags": [
          "frio",
          "nutrir"
        ]
      }
    ]
  },
  {
    "id": "decisor",
    "titulo": "Nível do contato",
    "sub": "Quem está nos procurando?",
    "icon": "👤",
    "dims": {
      "P": 1,
      "U": 0.5
    },
    "opts": [
      {
        "v": 3,
        "e": "👑",
        "t": "Diretor / Dono",
        "d": "Tomador de decisão",
        "tags": [
          "decisor",
          "rapido"
        ]
      },
      {
        "v": 3,
        "e": "🎯",
        "t": "Ger. Qualidade / Técnico",
        "d": "Influenciador-chave",
        "tags": [
          "tecnico",
          "influenciador"
        ]
      },
      {
        "v": 2,
        "e": "📋",
        "t": "Analista / Coordenador",
        "d": "Decisão passa por superior",
        "tags": [
          "cotacao"
        ]
      },
      {
        "v": 1,
        "e": "🛒",
        "t": "Compras",
        "d": "Foco em preço",
        "tags": [
          "preco",
          "competitivo"
        ]
      }
    ]
  },
  {
    "id": "prazo",
    "titulo": "Urgência para iniciar",
    "sub": "Quando pretende começar?",
    "icon": "⏰",
    "dims": {
      "U": 2.5
    },
    "opts": [
      {
        "v": 3,
        "e": "🔥",
        "t": "Imediato",
        "d": "Esta semana",
        "tags": [
          "urgente",
          "quente"
        ]
      },
      {
        "v": 2,
        "e": "📅",
        "t": "2 a 4 semanas",
        "d": "Projeto em andamento",
        "tags": [
          "ativo",
          "pipeline"
        ]
      },
      {
        "v": 2,
        "e": "📆",
        "t": "1 a 3 meses",
        "d": "Planejando",
        "tags": [
          "planejamento"
        ]
      },
      {
        "v": 1,
        "e": "🕐",
        "t": "Sem prazo",
        "d": "Levantamento inicial",
        "tags": [
          "frio",
          "nutrir"
        ]
      }
    ]
  },
  {
    "id": "regulatorio",
    "titulo": "Exigência regulatória",
    "sub": "Precisa de lab acreditado?",
    "icon": "📜",
    "dims": {
      "A": 2,
      "P": 0.5
    },
    "opts": [
      {
        "v": 3,
        "e": "✅",
        "t": "Exigência rigorosa (ANVISA/ISO)",
        "d": "Lab acreditado obrigatório",
        "tags": [
          "acreditado",
          "diferencial",
          "alto-valor"
        ]
      },
      {
        "v": 2,
        "e": "📝",
        "t": "Em adequação",
        "d": "Buscando certificação",
        "tags": [
          "oportunidade",
          "consultoria"
        ]
      },
      {
        "v": 2,
        "e": "👥",
        "t": "Exigido pelo cliente deles",
        "d": "Requisito do comprador",
        "tags": [
          "cadeia",
          "b2b"
        ]
      },
      {
        "v": 1,
        "e": "❌",
        "t": "Sem exigência",
        "d": "Boa prática",
        "tags": [
          "basico",
          "educacao"
        ]
      }
    ]
  },
  {
    "id": "orcamento",
    "titulo": "Sensibilidade a preço",
    "sub": "Como reagiu sobre valores?",
    "icon": "💰",
    "dims": {
      "P": 1,
      "R": 2
    },
    "opts": [
      {
        "v": 3,
        "e": "💎",
        "t": "Valoriza qualidade",
        "d": "Entende o custo",
        "tags": [
          "qualidade",
          "premium",
          "margem"
        ]
      },
      {
        "v": 2,
        "e": "⚖️",
        "t": "Custo-benefício",
        "d": "Aceita diferencial",
        "tags": [
          "negociacao",
          "comparativo"
        ]
      },
      {
        "v": 1,
        "e": "💲",
        "t": "Foco em preço",
        "d": "Difícil justificar",
        "tags": [
          "preco",
          "margem-baixa",
          "risco-preco"
        ]
      }
    ]
  },
  {
    "id": "recorrencia",
    "titulo": "Potencial de recorrência",
    "sub": "Tende a voltar?",
    "icon": "🔁",
    "dims": {
      "P": 2,
      "A": 0.5
    },
    "opts": [
      {
        "v": 3,
        "e": "♾️",
        "t": "Alta recorrência",
        "d": "Demanda contínua",
        "tags": [
          "recorrente",
          "contrato",
          "alto-valor"
        ]
      },
      {
        "v": 2,
        "e": "📊",
        "t": "Moderada",
        "d": "Periódica",
        "tags": [
          "sazonal"
        ]
      },
      {
        "v": 1,
        "e": "1️⃣",
        "t": "Compra única",
        "d": "Sem continuidade",
        "tags": [
          "pontual",
          "one-shot"
        ]
      }
    ]
  },
  {
    "id": "complexidade",
    "titulo": "Complexidade técnica",
    "sub": "Simples ou avançado?",
    "icon": "🧬",
    "dims": {
      "A": 1.5,
      "P": 1
    },
    "opts": [
      {
        "v": 3,
        "e": "🔬",
        "t": "Alta complexidade",
        "d": "Múltiplas análises, customização",
        "tags": [
          "complexo",
          "consultoria",
          "alto-valor"
        ]
      },
      {
        "v": 2,
        "e": "📐",
        "t": "Média",
        "d": "Uma ou duas áreas",
        "tags": [
          "intermediario"
        ]
      },
      {
        "v": 1,
        "e": "📏",
        "t": "Simples",
        "d": "Análises convencionais",
        "tags": [
          "basico",
          "commodity"
        ]
      }
    ]
  }
];
