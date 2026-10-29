export interface TrainingItem {
  id: string;
  title?: string;
  titulo?: string;
  path?: string;
  category?: string;
  categoria?: string;
  desc?: string;
  descricao?: string;
  duration?: string;
  duracao?: string;
  url?: string;
  [key: string]: any;
}

export interface NormItem {
  id?: string;
  title?: string;
  titulo?: string;
  org?: string;
  classe?: string;
  scope?: string;
  summary?: string;
  resumo?: string;
  keyTests?: string[];
  link?: string;
  [key: string]: any;
}

export interface TechKbItem {
  id: string;
  title?: string;
  titulo?: string;
  category?: string;
  categoria?: string;
  tema?: string;
  desc?: string;
  descricao?: string;
  solution?: string;
  solucao?: string;
  [key: string]: any;
}

export const DEFAULT_TRAININGS: TrainingItem[] = [
  {
    "id": "challenge",
    "title": "Challenge Test e Sistema Conservante",
    "path": "servicos",
    "category": "Challenge Test",
    "level": "Avançado",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": true,
    "videoLink": "",
    "tags": [
      "Challenge Test",
      "servicos",
      "playbook"
    ],
    "summary": "Avaliação do sistema conservante e segurança microbiológica da formulação.",
    "overview": "Treinamento técnico-comercial para entender Challenge Test e Sistema Conservante, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Challenge Test e Sistema Conservante, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Challenge Test e Sistema Conservante: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Challenge Test e Sistema Conservante\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "timekill",
    "title": "Time Kill",
    "path": "servicos",
    "category": "Time Kill",
    "level": "Avançado",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Time Kill",
      "servicos",
      "playbook"
    ],
    "summary": "Avaliação de redução microbiana em tempos de contato definidos.",
    "overview": "Treinamento técnico-comercial para entender Time Kill, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Time Kill, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Time Kill: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Time Kill\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "comparativo",
    "title": "Challenge Test x Time Kill x Shelf-life x Estabilidade",
    "path": "fundamentos",
    "category": "Comparativos",
    "level": "Avançado",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": true,
    "videoLink": "",
    "tags": [
      "Comparativos",
      "fundamentos",
      "playbook"
    ],
    "summary": "Comparativo para evitar erro de escopo em demandas parecidas.",
    "overview": "Treinamento técnico-comercial para entender Challenge Test x Time Kill x Shelf-life x Estabilidade, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Challenge Test x Time Kill x Shelf-life x Estabilidade, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Challenge Test x Time Kill x Shelf-life x Estabilidade: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Challenge Test x Time Kill x Shelf-life x Estabilidade\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "shelf",
    "title": "Shelf-life de alimentos",
    "path": "servicos",
    "category": "Shelf-life",
    "level": "Intermediário",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Shelf-life",
      "servicos",
      "playbook"
    ],
    "summary": "Como conduzir clientes que querem definir ou confirmar validade.",
    "overview": "Treinamento técnico-comercial para entender Shelf-life de alimentos, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Shelf-life de alimentos, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Shelf-life de alimentos: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Shelf-life de alimentos\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "micro-alimentos",
    "title": "Análise microbiológica de alimentos",
    "path": "servicos",
    "category": "Alimentos",
    "level": "Básico",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Alimentos",
      "servicos",
      "playbook"
    ],
    "summary": "Triagem para análises microbiológicas e IN 161.",
    "overview": "Treinamento técnico-comercial para entender Análise microbiológica de alimentos, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Análise microbiológica de alimentos, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Análise microbiológica de alimentos: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Análise microbiológica de alimentos\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "cosmeticos",
    "title": "Cosméticos",
    "path": "segmentos",
    "category": "Cosméticos",
    "level": "Intermediário",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Cosméticos",
      "segmentos",
      "playbook"
    ],
    "summary": "Como separar microbiologia, estabilidade, challenge e físico-químico em cosméticos.",
    "overview": "Treinamento técnico-comercial para entender Cosméticos, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Cosméticos, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Cosméticos: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Cosméticos\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "farmacia",
    "title": "Farmácia de manipulação",
    "path": "segmentos",
    "category": "Farmácias",
    "level": "Intermediário",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Farmácias",
      "segmentos",
      "playbook"
    ],
    "summary": "Raciocínio comercial para base galênica, água, produto acabado e rotina.",
    "overview": "Treinamento técnico-comercial para entender Farmácia de manipulação, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Farmácia de manipulação, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Farmácia de manipulação: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Farmácia de manipulação\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "endotoxinas",
    "title": "Endotoxinas",
    "path": "servicos",
    "category": "Endotoxinas",
    "level": "Avançado",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Endotoxinas",
      "servicos",
      "playbook"
    ],
    "summary": "Demanda crítica em saúde/farma que exige validação técnica.",
    "overview": "Treinamento técnico-comercial para entender Endotoxinas, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Endotoxinas, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Endotoxinas: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Endotoxinas\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "embalagens",
    "title": "Embalagens descartáveis",
    "path": "segmentos",
    "category": "Embalagens",
    "level": "Intermediário",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Embalagens",
      "segmentos",
      "playbook"
    ],
    "summary": "Como orientar embalagem para contato com alimentos, migração e microbiologia.",
    "overview": "Treinamento técnico-comercial para entender Embalagens descartáveis, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Embalagens descartáveis, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Embalagens descartáveis: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Embalagens descartáveis\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "maquinas",
    "title": "Máquinas e equipamentos",
    "path": "segmentos",
    "category": "Máquinas e Equipamentos",
    "level": "Básico",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Máquinas e Equipamentos",
      "segmentos",
      "playbook"
    ],
    "summary": "Como conduzir demandas de higienização, superfície, swab e controle de processo.",
    "overview": "Treinamento técnico-comercial para entender Máquinas e equipamentos, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Máquinas e equipamentos, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Máquinas e equipamentos: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Máquinas e equipamentos\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "precos",
    "title": "Como usar a aba Preço",
    "path": "suporte",
    "category": "Comercial",
    "level": "Básico",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": true,
    "videoLink": "",
    "tags": [
      "Comercial",
      "suporte",
      "playbook"
    ],
    "summary": "Como consultar preços de análises, parâmetros, pacotes e serviços PróLab sem confundir com proposta final.",
    "overview": "Treinamento técnico-comercial para entender Como usar a aba Preço, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Como usar a aba Preço, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Como usar a aba Preço: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Como usar a aba Preço\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "case-cosmetico",
    "title": "Caso: cliente cosmético quer validade, mas fala de conservante",
    "path": "argumentacao",
    "category": "Estudos de Caso",
    "level": "Intermediário",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Estudos de Caso",
      "argumentacao",
      "playbook"
    ],
    "summary": "Separar estabilidade/shelf de Challenge Test.",
    "overview": "Treinamento técnico-comercial para entender Caso: cliente cosmético quer validade, mas fala de conservante, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Caso: cliente cosmético quer validade, mas fala de conservante, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Caso: cliente cosmético quer validade, mas fala de conservante: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Caso: cliente cosmético quer validade, mas fala de conservante\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "case-999",
    "title": "Caso: cliente quer alegar “mata 99,9%”",
    "path": "argumentacao",
    "category": "Estudos de Caso",
    "level": "Intermediário",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Estudos de Caso",
      "argumentacao",
      "playbook"
    ],
    "summary": "Direcionar para avaliação de eficácia, geralmente Time Kill.",
    "overview": "Treinamento técnico-comercial para entender Caso: cliente quer alegar “mata 99,9%”, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Caso: cliente quer alegar “mata 99,9%”, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Caso: cliente quer alegar “mata 99,9%”: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Caso: cliente quer alegar “mata 99,9%”\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "case-alimento",
    "title": "Caso: cliente de alimentos quer validade",
    "path": "argumentacao",
    "category": "Estudos de Caso",
    "level": "Básico",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Estudos de Caso",
      "argumentacao",
      "playbook"
    ],
    "summary": "Conduzir como shelf-life, levantando validade pretendida e condições.",
    "overview": "Treinamento técnico-comercial para entender Caso: cliente de alimentos quer validade, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Caso: cliente de alimentos quer validade, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Caso: cliente de alimentos quer validade: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Caso: cliente de alimentos quer validade\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  },
  {
    "id": "case-endotoxina",
    "title": "Caso: cliente saúde/farma pergunta sobre endotoxinas",
    "path": "argumentacao",
    "category": "Estudos de Caso",
    "level": "Avançado",
    "audience": "Suporte Comercial, Vendedor e Gestão",
    "time": "25–40 min",
    "active": true,
    "pinned": false,
    "videoLink": "",
    "tags": [
      "Estudos de Caso",
      "argumentacao",
      "playbook"
    ],
    "summary": "Demanda sensível: levantar requisito e acionar técnico/gestão.",
    "overview": "Treinamento técnico-comercial para entender Caso: cliente saúde/farma pergunta sobre endotoxinas, qualificar a demanda e evitar erro de escopo.",
    "concept": "Conceito em linguagem simples: antes de vender ou informar preço, entenda a pergunta técnica por trás do pedido do cliente.",
    "purpose": "Serve para padronizar a triagem, reduzir retrabalho e aumentar segurança no atendimento comercial.",
    "whenOffer": "Use quando o cliente apresentar demanda relacionada ao tema e precisar de direcionamento para proposta ou orientação inicial.",
    "whenNot": "Tome cuidado quando houver risco regulatório, matriz incomum, alegação sensível ou escopo que precise validação técnica.",
    "questions": "• Qual produto/matriz?\n• Qual objetivo do laudo?\n• Existe norma, auditoria ou cliente final exigindo algo?\n• Quantas amostras/lotes?\n• Qual prazo e condição de envio?",
    "minimumData": "Razão social, CNPJ, contato técnico, matriz, finalidade, requisito/norma, quantidade de amostras, condição de envio e prazo.",
    "checklist": "☐ Entendi o objetivo real\n☐ Confirmei matriz\n☐ Confirmei quantidade\n☐ Confirmei requisito\n☐ Registrei no CRM\n☐ Sei se devo acionar técnico/gestão",
    "script": "Olá, tudo bem? Para avaliarmos corretamente Caso: cliente saúde/farma pergunta sobre endotoxinas, preciso confirmar produto/matriz, objetivo, quantidade de amostras, requisito técnico e prazo esperado.",
    "example": "Cliente pede algo genérico. O atendimento correto é investigar objetivo, matriz, requisito, quantidade e logística antes de seguir.",
    "arguments": "Atendimento consultivo, proposta com escopo correto, redução de retrabalho e maior clareza ao cliente.",
    "errors": "Enviar preço sem escopo, confundir testes, prometer prazo sem validação e não registrar informações.",
    "escalate": "Acione técnico/gestão quando houver dúvida regulatória, produto crítico, cliente estratégico ou escopo fora do padrão.",
    "quickSummary": "Caso: cliente saúde/farma pergunta sobre endotoxinas: confirme objetivo, matriz, quantidade, requisito, prazo e logística.",
    "quiz": "1. Qual pergunta técnica este tema responde?\n2. Qual dado mínimo não pode faltar?\n3. Quando acionar técnico/gestão?",
    "videoScript": "Título: Caso: cliente saúde/farma pergunta sobre endotoxinas\nDuração: 8 a 12 min\nCapítulos: conceito, quando oferecer, perguntas, erros comuns e exemplo prático."
  }
];

export const DEFAULT_NORMS: NormItem[] = [
  {
    "id": "norm_in161",
    "titulo": "IN 161/2022 — Padrões microbiológicos de alimentos",
    "segmento": "Alimentos",
    "aplicacao": "Produtos alimentícios, ingredientes, alimentos prontos para consumo, frutas, vegetais, carnes, leite, ovos, refeições e demais categorias microbiológicas.",
    "preconiza": "Define padrões microbiológicos, categorias de alimentos e microrganismos/indicadores aplicáveis conforme o enquadramento do produto.",
    "analises": "Pode envolver Salmonella, E. coli, coliformes, bolores e leveduras, Bacillus cereus, Listeria, estafilococos coagulase positiva e outros parâmetros conforme categoria.",
    "frequencia": "A frequência depende do plano de controle do cliente, exigência de auditoria, liberação de lote, rotina interna ou requisito do cliente final.",
    "obrigacao": "Alta quando há exigência regulatória, auditoria, liberação de lote ou controle sanitário formal. Média quando é controle preventivo. Baixa quando é apenas avaliação inicial sem requisito definido.",
    "perguntas": [
      "Qual alimento/matriz?",
      "Produto é pronto para consumo?",
      "É refrigerado, congelado ou temperatura ambiente?",
      "Qual objetivo: rotina, auditoria, liberação, investigação ou validade?",
      "Há norma/categoria solicitada pelo cliente final?"
    ],
    "keywords": [
      "in 161",
      "microbiologia alimentos",
      "salmonella",
      "e coli",
      "bolores",
      "leveduras",
      "alimento",
      "palmito",
      "leite",
      "fruta",
      "ovo",
      "carne",
      "polpa",
      "refeição",
      "racao",
      "ração"
    ],
    "classe": "Norma/RDC/Legislação"
  },
  {
    "id": "norm_rdc429",
    "titulo": "RDC 429/2020 e IN 75/2020 — Rotulagem nutricional",
    "segmento": "Alimentos",
    "aplicacao": "Alimentos embalados e produtos que necessitam de tabela nutricional, rotulagem nutricional ou revisão de informação nutricional.",
    "preconiza": "Estabelece regras para declaração nutricional, tabela nutricional e critérios de rotulagem.",
    "analises": "Pode envolver valor energético, carboidratos, açúcares totais/adicionados, proteínas, gorduras totais/saturadas/trans, fibras, sódio e outros nutrientes conforme produto.",
    "frequencia": "Normalmente por desenvolvimento/reformulação, validação de rotulagem, alteração de fornecedor ou auditoria.",
    "obrigacao": "Alta para produtos embalados sujeitos à rotulagem. Média quando é desenvolvimento. Baixa quando é apenas estudo interno exploratório.",
    "perguntas": [
      "Produto será comercializado embalado?",
      "Já possui fórmula fechada?",
      "Quais nutrientes precisam constar?",
      "É suplemento, alimento comum ou ingrediente?",
      "A demanda é tabela completa ou parâmetro específico?"
    ],
    "keywords": [
      "tabela nutricional",
      "rotulagem",
      "rdc 429",
      "in 75",
      "nutricional",
      "açucares",
      "açúcares",
      "proteina",
      "proteína",
      "gordura",
      "fibra",
      "sodio",
      "sódio"
    ],
    "classe": "Norma/RDC/Legislação"
  },
  {
    "id": "norm_portaria888",
    "titulo": "Portaria GM/MS 888/2021 — Potabilidade de água",
    "segmento": "Águas",
    "aplicacao": "Água para consumo humano, potabilidade, água tratada, poço, rede, condomínios, indústrias, hospitais e estabelecimentos.",
    "preconiza": "Define padrões de potabilidade e controle de qualidade da água para consumo humano.",
    "analises": "Pode envolver microbiologia, pH, cloro residual livre, turbidez, cor, metais, dureza, sólidos dissolvidos, sulfato, fluoreto e outros parâmetros conforme pacote.",
    "frequencia": "Depende do tipo de estabelecimento, plano de controle, exigência legal, auditoria ou uso da água.",
    "obrigacao": "Alta quando é água para consumo humano, auditoria, vigilância sanitária ou requisito contratual.",
    "perguntas": [
      "Água é para consumo humano?",
      "É poço, rede/tratada, mineral, processo ou purificada?",
      "Quantos pontos?",
      "Qual cidade/local?",
      "Coleta técnica ou kit?"
    ],
    "keywords": [
      "potabilidade",
      "portaria 888",
      "agua potavel",
      "água potável",
      "p. 888",
      "consumo humano",
      "poço",
      "poco",
      "agua tratada",
      "água tratada"
    ],
    "classe": "Norma/RDC/Legislação"
  },
  {
    "id": "norm_nbr17037",
    "titulo": "ABNT NBR 17037 — Qualidade do ar interior em ambientes climatizados",
    "segmento": "Ar, Ambiente e Superfícies",
    "aplicacao": "Ambientes climatizados, PMOC, ar-condicionado, hospitais, clínicas, escritórios, hotéis, ambientes industriais e comerciais.",
    "preconiza": "Orienta avaliação da qualidade do ar interior em ambientes climatizados, incluindo parâmetros microbiológicos e físico-químicos conforme escopo.",
    "analises": "Fungos, CO₂, temperatura, umidade, velocidade do ar, partículas, aerodispersoides, TVOC e outros parâmetros conforme necessidade.",
    "frequencia": "A frequência usual citada comercialmente é semestral quando vinculada ao PMOC/NBR, mas deve ser validada conforme necessidade do cliente.",
    "obrigacao": "Alta quando PMOC, auditoria, hospital/saúde ou exigência contratual. Média em controle preventivo.",
    "perguntas": [
      "Quantos pontos internos e externos?",
      "Qual tipo de ambiente?",
      "Há PMOC?",
      "Precisa escopo completo ou apenas microbiologia?",
      "Qual cidade/local para coleta?"
    ],
    "keywords": [
      "nbr 17037",
      "pmoc",
      "qualidade do ar",
      "ar climatizado",
      "fungo no ar",
      "fungos no ar",
      "co2",
      "tvoc",
      "particulas",
      "partículas"
    ],
    "classe": "Norma/RDC/Legislação"
  },
  {
    "id": "norm_cosmeticos",
    "titulo": "Cosméticos — estabilidade, microbiologia, challenge test e eficácia",
    "segmento": "Cosméticos, Saneantes e Eficácia",
    "aplicacao": "Cosméticos, saneantes, produtos de higiene, formulações com conservante, estabilidade e alegações de eficácia.",
    "preconiza": "A necessidade pode variar entre estabilidade, controle microbiológico, challenge test, time kill ou estudos de segurança/eficácia conforme alegação e finalidade.",
    "analises": "Estabilidade, microbiologia, físico-química, challenge test, time kill, eficácia, segurança terceirizada quando aplicável.",
    "frequencia": "Conforme desenvolvimento, registro/notificação, alteração de fórmula, controle de qualidade ou exigência de cliente.",
    "obrigacao": "Alta quando relacionada a segurança, registro, alegação antimicrobiana ou exigência regulatória/cliente. Média para desenvolvimento.",
    "perguntas": [
      "Qual produto e fórmula final?",
      "Possui conservante?",
      "Quer validade, eficácia ou sistema conservante?",
      "Qual alegação será feita?",
      "Qual embalagem e validade pretendida?"
    ],
    "keywords": [
      "cosmetico",
      "cosmético",
      "challenge",
      "time kill",
      "conservante",
      "estabilidade cosmético",
      "saneante",
      "mata 99",
      "eficacia",
      "eficácia",
      "micro cosmético"
    ],
    "classe": "Norma/RDC/Legislação"
  },
  {
    "id": "norm_endotoxinas",
    "titulo": "Ensaios críticos — Endotoxinas, esterilidade e bioburden",
    "segmento": "Saúde, Farma e Dispositivos",
    "aplicacao": "Produtos farmacêuticos, água purificada, injetáveis, dispositivos médicos, processos críticos e ambientes de saúde.",
    "preconiza": "Ensaios críticos exigem validação técnica de matriz, limite, método e referência aplicável antes da proposta.",
    "analises": "Endotoxinas, esterilidade, bioburden, limites microbianos, água purificada/ultrapurificada e ensaios relacionados.",
    "frequencia": "Depende de rotina de controle, validação, lote, exigência farmacopeica ou requisito regulatório.",
    "obrigacao": "Alta em produtos/processos críticos, farmacêuticos, injetáveis, dispositivos e água de uso crítico.",
    "perguntas": [
      "Qual matriz?",
      "Qual finalidade?",
      "Existe limite requerido?",
      "Qual referência farmacopeica/regulatória?",
      "É rotina, validação ou investigação?"
    ],
    "keywords": [
      "endotoxina",
      "endotoxinas",
      "esterilidade",
      "bioburden",
      "lal",
      "injetavel",
      "injetável",
      "farmaceutico",
      "farmacêutico",
      "dispositivo medico",
      "dispositivo médico"
    ],
    "classe": "Norma/RDC/Legislação"
  },
  {
    "id": "norm_in161_palmito_conservas",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Palmito / conservas vegetais",
    "segmento": "Alimentos",
    "aplicacao": "Palmito / conservas vegetais",
    "preconiza": "Item 4 / conservas vegetais — validar subitem aplicável",
    "analises": "Microbiologia de alimentos conforme IN 161, com parâmetros variando por categoria. Exemplo histórico: palmito não foi tratado como produto pronto consumo genérico; foi enquadrado em item específico de conservas.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Alto. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É conserva?",
      "Produto é acidificado ou em salmoura?",
      "É pronto para consumo?",
      "Embalagem final?",
      "Quantidade de amostras/lotes?"
    ],
    "keywords": [
      "palmito",
      "conserva",
      "conservas",
      "vegetais em conserva",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_leite",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Leite e derivados",
    "segmento": "Alimentos",
    "aplicacao": "Leite e derivados",
    "preconiza": "Item 9 / leite e derivados — validar subitem, exemplo citado: leite item 9A",
    "analises": "Parâmetros microbiológicos conforme categoria do produto, processamento e condição antes/depois de pasteurização.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Alto. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É leite, derivado, bebida láctea ou ingrediente?",
      "Pasteurizado?",
      "Antes/depois de processo?",
      "Refrigerado?",
      "Objetivo: validação de processo ou rotina?"
    ],
    "keywords": [
      "leite",
      "lacteo",
      "lácteo",
      "queijo",
      "bebida lactea",
      "pasteurização",
      "pasteurizacao",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_frutas",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Frutas, salada de frutas, polpas e vegetais",
    "segmento": "Alimentos",
    "aplicacao": "Frutas, salada de frutas, polpas e vegetais",
    "preconiza": "Frutas/polpas/salada de frutas — validar categoria e processamento",
    "analises": "Pode envolver Salmonella, E. coli, bolores/leveduras e outros conforme processamento, consumo e conservação.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Médio/Alto. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É fruta inteira, polpa, salada pronta ou processada?",
      "Pronto consumo?",
      "Refrigerado/congelado?",
      "Tem tratamento térmico?",
      "Objetivo do laudo?"
    ],
    "keywords": [
      "fruta",
      "frutas",
      "salada de frutas",
      "polpa",
      "polpas",
      "vegetal",
      "hortaliça",
      "hortalica",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_ovos",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Ovos e preparações com ovos",
    "segmento": "Alimentos",
    "aplicacao": "Ovos e preparações com ovos",
    "preconiza": "Ovos/preparações — validar subcategoria conforme produto",
    "analises": "Microbiologia conforme categoria e condição de consumo. Histórico indicou custo específico para ovos mexidos.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Alto. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É ovo cru, pasteurizado ou preparação pronta?",
      "Produto é pronto para consumo?",
      "Refrigerado?",
      "Será aquecido antes do consumo?"
    ],
    "keywords": [
      "ovo",
      "ovos",
      "ovos mexidos",
      "omelete",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_carnes",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Carnes, bacon, defumados e produtos cárneos",
    "segmento": "Alimentos",
    "aplicacao": "Carnes, bacon, defumados e produtos cárneos",
    "preconiza": "Carnes/produtos cárneos — validar categoria, processamento e armazenamento",
    "analises": "Parâmetros microbiológicos variam conforme produto cru, cozido, defumado, fatiado, refrigerado ou congelado.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Alto. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É carne crua, cozida, defumada ou fatiada?",
      "Refrigerada ou congelada?",
      "Pronto consumo?",
      "Validade pretendida?",
      "Embalagem final?"
    ],
    "keywords": [
      "carne",
      "bacon",
      "defumado",
      "defumados",
      "frango",
      "boi",
      "suino",
      "suíno",
      "carnes",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_petfood",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Alimentos para animais / pet food",
    "segmento": "Alimentos",
    "aplicacao": "Alimentos para animais / pet food",
    "preconiza": "Alimentos para animais — validar escopo e referência aplicável",
    "analises": "Pode envolver microbiologia e parâmetros específicos conforme matriz e exigência do cliente.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Médio. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É alimento pet, ingrediente ou suplemento animal?",
      "Qual matriz?",
      "Há norma/cliente final exigindo?",
      "Qual objetivo do laudo?"
    ],
    "keywords": [
      "pet",
      "ração",
      "racao",
      "nutrição animal",
      "nutricao animal",
      "biscoito pet",
      "alimento animal",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_panetone_biscoitos",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Panetone, biscoitos, panificação e snacks",
    "segmento": "Alimentos",
    "aplicacao": "Panetone, biscoitos, panificação e snacks",
    "preconiza": "Panificação/snacks — validar composição, recheio e condição de armazenamento",
    "analises": "Pode envolver microbiologia, shelf-life, bolores/leveduras, Salmonella/E. coli e parâmetros nutricionais conforme objetivo.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Médio. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É panificação, biscoito ou snack?",
      "Possui recheio/frutas/lácteos?",
      "Validade pretendida?",
      "Temperatura ambiente?",
      "É para tabela nutricional ou microbiologia?"
    ],
    "keywords": [
      "panetone",
      "biscoito",
      "bolacha",
      "snack",
      "panificação",
      "panificacao",
      "pão",
      "pao",
      "cocada",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_pronto_consumo",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Alimentos prontos para consumo / refeições prontas",
    "segmento": "Alimentos",
    "aplicacao": "Alimentos prontos para consumo / refeições prontas",
    "preconiza": "IN 161 — alimentos prontos para consumo: validar grupo específico da tabela conforme matriz, processo e conservação",
    "analises": "Microbiologia de alimentos conforme categoria. Avaliar Salmonella, E. coli, estafilococos coagulase positiva, Bacillus cereus, bolores/leveduras e Listeria quando aplicável.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Alto. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É pronto para consumo?",
      "Tem tratamento térmico?",
      "É refrigerado, congelado ou ambiente?",
      "Possui ingrediente de risco?",
      "É rotina, auditoria, liberação de lote ou shelf-life?"
    ],
    "keywords": [
      "pronto consumo",
      "pronto para consumo",
      "refeicao",
      "refeição",
      "salada pronta",
      "comida pronta",
      "prato pronto",
      "rotisserie",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_suplementos",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Suplementos alimentares / pós / cápsulas / gummies",
    "segmento": "Alimentos",
    "aplicacao": "Suplementos alimentares / pós / cápsulas / gummies",
    "preconiza": "IN 161 — suplementos e produtos alimentícios específicos: validar composição e forma de apresentação",
    "analises": "Microbiologia, teores/dosagens, contaminantes e tabela nutricional podem ser aplicáveis conforme composição, alegação e finalidade.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Médio/Alto. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É suplemento em pó, cápsula, líquido ou gummy?",
      "Quais ativos/nutrientes precisam de teor?",
      "Existe alegação no rótulo?",
      "É para tabela nutricional, shelf-life ou liberação?",
      "Há contaminantes/micotoxinas solicitados?"
    ],
    "keywords": [
      "suplemento",
      "suplementos",
      "whey",
      "gummy",
      "capsula",
      "cápsula",
      "colageno",
      "colágeno",
      "creatina",
      "melatonina",
      "vitamina",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_bebidas",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Bebidas, sucos, chás, cafés e similares",
    "segmento": "Alimentos",
    "aplicacao": "Bebidas, sucos, chás, cafés e similares",
    "preconiza": "IN 161 — bebidas e produtos líquidos: validar se pronto consumo, concentrado, refrigerado, pasteurizado ou fermentado",
    "analises": "Microbiologia conforme tipo de bebida, além de shelf-life, físico-químicas, teores e rotulagem quando aplicável.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Médio. Validar categoria antes de enviar preço.",
    "perguntas": [
      "É bebida pronta ou concentrado?",
      "É pasteurizada?",
      "Tem gás/fermentação?",
      "Refrigerada ou ambiente?",
      "Objetivo: validade, rotina ou tabela nutricional?"
    ],
    "keywords": [
      "bebida",
      "suco",
      "cha",
      "chá",
      "cafe",
      "café",
      "kombucha",
      "refrigerante",
      "nectar",
      "néctar",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  },
  {
    "id": "norm_in161_confeitaria_chocolate",
    "classe": "Enquadramento IN 161",
    "titulo": "IN 161/2022 — Chocolates, confeitaria, doces e recheados",
    "segmento": "Alimentos",
    "aplicacao": "Chocolates, confeitaria, doces e recheados",
    "preconiza": "IN 161 — confeitaria/doces: validar presença de recheio, lácteos, castanhas, frutas e atividade de água",
    "analises": "Pode envolver microbiologia, bolores/leveduras, Salmonella, shelf-life, atividade de água, tabela nutricional e alérgenos.",
    "frequencia": "Depende do plano de controle, rotina, liberação de lote, auditoria, shelf-life ou exigência do cliente final.",
    "obrigacao": "Risco de erro/criticidade: Médio. Validar categoria antes de enviar preço.",
    "perguntas": [
      "Possui recheio?",
      "Tem lácteos, castanhas ou frutas?",
      "É armazenado em temperatura ambiente?",
      "Validade pretendida?",
      "É para tabela nutricional ou microbiologia?"
    ],
    "keywords": [
      "chocolate",
      "doce",
      "confeitaria",
      "brigadeiro",
      "recheio",
      "bombom",
      "cocada",
      "sobremesa",
      "castanha",
      "in 161",
      "alimento",
      "microbiologia alimentos"
    ]
  }
];

export const DEFAULT_TECH_KB: TechKbItem[] = [
  {
    "id": "kb_tab_nut_panetone",
    "tema": "Tabela nutricional",
    "segmento": "Alimentos",
    "solicitacao": "Composição centesimal e açúcares totais para panetone funcional sem glúten/lactose.",
    "realizamos": "Sim",
    "enquadramento": "Tabela nutricional / composição centesimal",
    "valor": "R$ 2.541,00",
    "resposta": "Enquadrar como tabela nutricional/composição centesimal e açúcares totais.",
    "perguntas": [
      "Confirmar fórmula/matriz",
      "Confirmar nutrientes necessários",
      "Verificar se é produto final embalado"
    ],
    "alerta": "Revisar valor atual antes de enviar.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_shelf_biscoito_120",
    "tema": "Shelf-life",
    "segmento": "Alimentos",
    "solicitacao": "Biscoito de polvilho, shelf-life acelerado para validação de 120 dias.",
    "realizamos": "Sim",
    "enquadramento": "Shelf-life acelerado",
    "valor": "R$ 1.848,00",
    "resposta": "Estudo de shelf-life acelerado para validade pretendida de 120 dias.",
    "perguntas": [
      "Validade pretendida",
      "Condição de armazenamento",
      "Embalagem final",
      "Quantidade de amostras"
    ],
    "alerta": "Valor histórico; validar tabela atual.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_agua_al_fluoreto",
    "tema": "Água",
    "segmento": "Águas",
    "solicitacao": "Alumínio e fluoreto para água bruta.",
    "realizamos": "Sim",
    "enquadramento": "Parâmetros físico-químicos em água bruta",
    "valor": "R$ 340,00",
    "resposta": "Realizamos análise apenas desses parâmetros em água bruta.",
    "perguntas": [
      "Origem da água",
      "Finalidade",
      "Quantidade de pontos",
      "Coleta técnica ou kit"
    ],
    "alerta": "Confirmar valor atual e se parâmetros permanecem disponíveis.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_swab_carpete",
    "tema": "Swab/Superfície",
    "segmento": "Ar, Ambiente e Superfícies",
    "solicitacao": "Análises microbiológicas de superfície em carpetes.",
    "realizamos": "Sim",
    "enquadramento": "Microbiologia de superfície / swab",
    "valor": "R$ 145,00",
    "resposta": "Realizamos microbiologia de superfície em carpete.",
    "perguntas": [
      "Quantos pontos",
      "Objetivo da análise",
      "Tipo de coleta",
      "Microrganismos desejados"
    ],
    "alerta": "Confirmar se valor é por ponto/amostra.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_micro_alimentos_variacao",
    "tema": "Microbiologia de alimentos",
    "segmento": "Alimentos",
    "solicitacao": "Valor da análise microbiológica em alimentos é padrão?",
    "realizamos": "Sim",
    "enquadramento": "IN 161 / categoria do alimento",
    "valor": "",
    "resposta": "Varia conforme o alimento, porque dependendo do item da RDC/IN 161 há mais ou menos parâmetros.",
    "perguntas": [
      "Qual alimento?",
      "Qual categoria?",
      "Pronto consumo?",
      "Temperatura de armazenamento?",
      "Objetivo do laudo?"
    ],
    "alerta": "Não enviar valor sem enquadrar o alimento.",
    "status": "Validar"
  },
  {
    "id": "kb_damasco",
    "tema": "Damasco desidratado",
    "segmento": "Alimentos",
    "solicitacao": "Dióxido de enxofre, microbiologia e aflatoxina em damasco desidratado.",
    "realizamos": "Parcial",
    "enquadramento": "Alimentos / contaminantes / microbiologia",
    "valor": "Afla R$ 709,50; Micro R$ 231,00; Dióxido de enxofre R$ 690,00 via provedor",
    "resposta": "Aflatoxina e microbiologia foram precificadas; dióxido de enxofre via provedor.",
    "perguntas": [
      "Matriz exata",
      "Parâmetros solicitados",
      "Técnica requerida",
      "Quantidade de amostras"
    ],
    "alerta": "Dióxido de enxofre depende de provedor; validar prazo e custo.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_efluente",
    "tema": "Efluente",
    "segmento": "Físico-Químicas, Teores e Outros",
    "solicitacao": "Análise de efluente completa e prazo de laudo.",
    "realizamos": "Sim",
    "enquadramento": "Efluente / Artigo 19A / descarte em esgoto",
    "valor": "",
    "resposta": "Prazo histórico citado: 20 dias úteis. Rush considerado arriscado em alguns casos.",
    "perguntas": [
      "Tipo de efluente",
      "Legislação aplicável",
      "Pontos",
      "Cidade/coleta",
      "Urgência"
    ],
    "alerta": "Evitar prometer rush sem validação técnica/logística.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_swab_perguntas",
    "tema": "Swab",
    "segmento": "Ar, Ambiente e Superfícies",
    "solicitacao": "Quais perguntas fazer para swab?",
    "realizamos": "Sim",
    "enquadramento": "Swab / Rodac / superfície",
    "valor": "",
    "resposta": "Confirmar tipo de superfície, alimentos envolvidos, pontos, objetivo e forma de coleta.",
    "perguntas": [
      "Qual superfície?",
      "Quantos pontos?",
      "Existe alimento/processo relacionado?",
      "É validação de limpeza, rotina ou investigação?",
      "Cliente coleta ou PróLab coleta?"
    ],
    "alerta": "Distinguir swab de superfície, Rodac e custos logísticos.",
    "status": "Validar"
  },
  {
    "id": "kb_enxoval",
    "tema": "Enxoval hospitalar",
    "segmento": "Saúde, Farma e Dispositivos",
    "solicitacao": "Análise microbiológica de roupa/enxoval hospitalar pós-lavagem.",
    "realizamos": "Validar",
    "enquadramento": "Microbiologia em enxoval hospitalar",
    "valor": "",
    "resposta": "Foi solicitado esclarecer tipo de enxoval e referência normativa; número informado não foi localizado na conversa.",
    "perguntas": [
      "Tipo de enxoval",
      "Norma/referência correta",
      "Quantidade de peças",
      "Pós-lavagem seco/embalado?",
      "REBLAS obrigatório?"
    ],
    "alerta": "Necessita validação técnica e normativa antes de enviar preço.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_challenge_metodo",
    "tema": "Challenge Test",
    "segmento": "Cosméticos, Saneantes e Eficácia",
    "solicitacao": "Metodologia para challenge em cosméticos/sistema conservante.",
    "realizamos": "Sim",
    "enquadramento": "Challenge Test / sistema conservante",
    "valor": "R$ 1.000,00 por formulação (histórico)",
    "resposta": "Metodologia informada: Farmacopeia.",
    "perguntas": [
      "Fórmula final",
      "Conservantes",
      "Tipo de produto",
      "Objetivo regulatório/desenvolvimento",
      "Quantidade de formulações"
    ],
    "alerta": "Validar metodologia e valor atual com técnico antes de proposta.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_alergenos",
    "tema": "Alérgenos",
    "segmento": "Alimentos",
    "solicitacao": "Detecção de alérgenos em equipamentos/produtos plásticos; látex.",
    "realizamos": "Parcial",
    "enquadramento": "Alérgenos / glúten / provedores",
    "valor": "Glúten R$ 440,00 (histórico)",
    "resposta": "Internamente fazemos glúten; demais alérgenos/provedores. Látex precisava validação.",
    "perguntas": [
      "Qual alérgeno?",
      "Matriz/equipamento?",
      "Superfície ou produto?",
      "Referência exigida?",
      "Amostra em pó, plástico ou superfície?"
    ],
    "alerta": "Não prometer látex sem confirmação de provedor.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_cosmeticos_pacote",
    "tema": "Cosméticos",
    "segmento": "Cosméticos, Saneantes e Eficácia",
    "solicitacao": "Estabilidade, segurança, microbiologia, eficácia, físico-químicas e apoio ANVISA para cosméticos.",
    "realizamos": "Parcial",
    "enquadramento": "Cosméticos / estabilidade / eficácia / segurança",
    "valor": "Eficácia R$ 1.000; Micro R$ 165; FQ R$ 335; Segurança R$ 6.000 por amostra; Estabilidade R$ 3.960 (histórico)",
    "resposta": "Realizamos parte dos ensaios; segurança pode depender de terceiros/provedores.",
    "perguntas": [
      "Produto e fórmula",
      "Alegação",
      "Validade pretendida",
      "Embalagem",
      "Quantidade de amostras"
    ],
    "alerta": "Validar quais estudos são internos e quais são terceirizados.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_fibras",
    "tema": "Fibras",
    "segmento": "Alimentos",
    "solicitacao": "Fibras solúveis/insolúveis em fruta e fibras totais.",
    "realizamos": "Sim",
    "enquadramento": "Teores / fibras / nutricional",
    "valor": "Fibras solúveis/insolúveis R$ 2.800; fibras totais R$ 2.145 (histórico)",
    "resposta": "Realizamos fibras; valor varia conforme escopo.",
    "perguntas": [
      "Fibras totais ou solúveis/insolúveis?",
      "Matriz",
      "Objetivo: tabela ou controle?",
      "Quantidade de amostras"
    ],
    "alerta": "Confirmar escopo exato antes de enviar valor.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_toc",
    "tema": "TOC em águas",
    "segmento": "Águas",
    "solicitacao": "Análise de TOC em águas.",
    "realizamos": "Sim",
    "enquadramento": "TOC / água",
    "valor": "R$ 420,00",
    "resposta": "Realizamos TOC em águas.",
    "perguntas": [
      "Tipo de água",
      "Finalidade",
      "Quantidade de pontos",
      "Limite/referência"
    ],
    "alerta": "Confirmar valor atual e matriz.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_pmoc",
    "tema": "PMOC",
    "segmento": "Ar, Ambiente e Superfícies",
    "solicitacao": "Realizamos análises para PMOC?",
    "realizamos": "Sim",
    "enquadramento": "Análise de ar climatizado / NBR 17037",
    "valor": "",
    "resposta": "Sim, enquadrar como análise de ar climatizado.",
    "perguntas": [
      "Quantidade de pontos",
      "Ambiente",
      "Cidade",
      "Escopo completo ou parcial",
      "Frequência"
    ],
    "alerta": "Confirmar NBR 17037 e pontos internos/externos.",
    "status": "Validar"
  },
  {
    "id": "kb_citotox",
    "tema": "Citotoxicidade",
    "segmento": "Saúde, Farma e Dispositivos",
    "solicitacao": "Citotoxicidade em lençol hospitalar de papel.",
    "realizamos": "Não/Provedor",
    "enquadramento": "Citotoxicidade / provedor",
    "valor": "",
    "resposta": "Não fazemos internamente; provedor poderia fazer, aguardando custos.",
    "perguntas": [
      "Material",
      "Norma exigida",
      "Finalidade",
      "Quantidade de amostras"
    ],
    "alerta": "Não prometer internamente; validar provedor/custo.",
    "status": "Revisar/validar"
  },
  {
    "id": "kb_agua_mineral",
    "tema": "Água mineral",
    "segmento": "Águas",
    "solicitacao": "Água mineral natural seria água purificada?",
    "realizamos": "Sim",
    "enquadramento": "Água envasada/mineral",
    "valor": "",
    "resposta": "Não é água purificada; no sistema estava como água envasada.",
    "perguntas": [
      "É mineral envasada?",
      "Origem",
      "Finalidade",
      "Parâmetros solicitados"
    ],
    "alerta": "Não confundir mineral/envasada com purificada.",
    "status": "Validar"
  },
  {
    "id": "kb_teores_cloreto_carbonato",
    "tema": "Teores",
    "segmento": "Saúde, Farma e Dispositivos",
    "solicitacao": "Teores de cloreto/carbonato em excipientes farmacêuticos.",
    "realizamos": "Validar/Provedor",
    "enquadramento": "Teores / USP / excipientes",
    "valor": "",
    "resposta": "Provedor solicitou a fonte/natureza química de cloreto e carbonato para precificar.",
    "perguntas": [
      "Qual fonte química do cloreto?",
      "Qual fonte do carbonato?",
      "Matriz/excipiente",
      "Metodologia USP requerida",
      "Quantidade de amostras"
    ],
    "alerta": "Sem fonte química, não precificar.",
    "status": "Validar"
  }
];
