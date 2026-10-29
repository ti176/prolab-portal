export interface TemplateField {
  name: string;
  label: string;
  placeholder?: string;
}

export interface CommercialTemplate {
  id: string;
  stage: 'qualificacao' | 'preco' | 'proposta' | 'orientacao' | 'referencia';
  services: string[];
  title: string;
  when?: string;
  fields?: TemplateField[];
  body: string;
}

export const TPL_STAGES = [
  { id: 'qualificacao', num: 1, label: 'Qualificação', desc: 'Entenda a demanda antes de orçar', color: '#00594C' },
  { id: 'preco', num: 2, label: 'Orçamento', desc: 'Apresente pacotes e valores', color: '#27AE60' },
  { id: 'proposta', num: 3, label: 'Proposta', desc: 'Formalize, negocie e faça follow-up', color: '#C49A2B' },
  { id: 'orientacao', num: 4, label: 'Orientação', desc: 'Pós-venda: preparo das amostras', color: '#B85C38' },
];

export const TPL_SERVICES = [
  { id: 'todos', label: 'Todos' },
  { id: 'agua', label: '💧 Água' },
  { id: 'ar', label: '💨 Ar-climatizado' },
  { id: 'farmacia', label: '💊 Farmácia' },
  { id: 'alimentos', label: '🍽️ Alimentos' },
  { id: 'cosmeticos', label: '🧪 Cosméticos' },
  { id: 'geral', label: '📋 Geral' },
];

export const DEFAULT_TEMPLATES: CommercialTemplate[] = [
  {
    "id": "q_agua",
    "stage": "qualificacao",
    "services": [
      "agua"
    ],
    "title": "Água — Perguntas iniciais",
    "when": "Primeiro contato quando o cliente pede análise de água. Use antes de qualquer orçamento.",
    "body": "Poderia por gentileza nos informar:\n\n- Qual é a origem da água? Exemplo: Tratada, filtrada, bruta (poço)\n\n- Qual seria o intuito dessa análise? Exemplo: Controle, consumo humano, reuso etc.\n\n- Qual é o endereço completo para calcularmos os custos logísticos da custos logísticos ou para o envio do kit esterilizado para você realizar a coleta das amostras?\n\n- Gostaria de análises algum/alguns parâmetros específicos na análise?\n\n- Em quantos pontos gostaria e qual a frequência gostaria de realizar essas análises?"
  },
  {
    "id": "q_ar",
    "stage": "qualificacao",
    "services": [
      "ar"
    ],
    "title": "Ar-climatizado — Perguntas iniciais",
    "when": "Cliente mencionou análise de ar-condicionado ou a NBR ABNT 17037. Use para levantar pontos e logística.",
    "body": "Para análises de ar-climatizado poderia por gentileza nos informar:\n\n- Em quantos pontos de ar-climatizado (Internos e Externos) gostaria de analisar?\n\n- Qual é o endereço completo para calcularmos os custos logísticos para realizarmos a custos logísticos? (Envio de um técnico até o local para realizar a coleta)\n\n- Qual é a frequência dessas análises? Gostaria de seguir a NBR ABNT 17037 que preconiza a frequência de análises a cada 6 meses?\n\n- O ambiente que será realizado a coleta se trata de algum ambiente controlado como: hospitalar/clinica médica ou segmento alimentar?"
  },
  {
    "id": "q_farm_inj",
    "stage": "qualificacao",
    "services": [
      "farmacia"
    ],
    "title": "Farmácia Manipulação — Injetáveis",
    "when": "Cliente é farmácia de manipulação que trabalha com injetáveis (alta complexidade).",
    "body": "- Quais análises gostariam de realizar?\n\n- Trabalha com Antibióticos, hormônios e citostáticos?\n\n- Trabalha com água de injetáveis ou ultra purificadas?\n\n- Realizam testes de esterilidade e endotoxina em produtos acabados? Quais?"
  },
  {
    "id": "q_farm_hom",
    "stage": "qualificacao",
    "services": [
      "farmacia"
    ],
    "title": "Farmácia Manipulação — Homeopatia",
    "when": "Cliente é farmácia especializada em homeopatia.",
    "body": "- Quais análises gostariam de realizar?\n\n- Realiza o pool de matrizes?\n\n- Realiza microbiologia em glóbulos?\n\n- Análises de água potável/tratada?\n\n- Análises de água ultrapurificada?"
  },
  {
    "id": "q_farm_derm",
    "stage": "qualificacao",
    "services": [
      "farmacia"
    ],
    "title": "Farmácia Manipulação — Dermatológicas e Cápsulas",
    "when": "Cliente manipula cápsulas e/ou produtos dermatológicos.",
    "body": "- Quais análises gostariam de realizar?\n\n- Base galênica?\n\n- Análises de água potável/tratada?\n\n- Análises de água purificada?\n\n- Análises de cápsulas prontas ≤ 25mg?\n\n- Se cápsulas prontas ≥ 100mg, quais cabines? Antibiótico - Hormônio - Cistático?"
  },
  {
    "id": "q_timekill",
    "stage": "qualificacao",
    "services": [
      "cosmeticos"
    ],
    "title": "Time Kill — Perguntas iniciais",
    "when": "Cliente cosmético precisa comprovar eficácia bactericida (ex: álcool em gel).",
    "body": "- Qual é o seu produto?\n\n- Qual tipo de cosmético seria? Tipo II/grau I ou Tipo I/grau II?\n\n- Qual o tempo de ação da eficácia bactericida? Ou qual tempo de contato?\n\n- Para facilitarmos o levantamento dos custos desse teste poderia por gentileza nos enviar a ficha técnica do seu produto?"
  },
  {
    "id": "q_alim_micro",
    "stage": "qualificacao",
    "services": [
      "alimentos"
    ],
    "title": "Alimentos — Análises microbiológicas",
    "when": "Cliente da indústria alimentícia pedindo análise microbiológica.",
    "body": "- Para facilitarmos o levantamento dos custos desse teste poderia por gentileza nos enviar a ficha técnica do seu produto?\n\n- Quais seriam os alimentos?\n\n- Poderia fazer uma breve descrição do alimento? Ex: Carne com molho/macarrão\n\n- Os alimentos estão prontos para o consumo? Ex: Carne assada, frango assado, feijão cozido (produtos que serão aquecidos e estão prontos)\n\n- Para qual intuito gostaria de realizar essas análises?\n\n- Qual é a temperatura de armazenagem do seu produto? Ex: Congelado/Resfriado/Temperatura Ambiente\n\n- Qual é o tipo de embalagem e qual a quantidade de produto por embalagem?\n\n- Qual é a quantidade de amostras gostaria de realizar essas análises? E qual frequência?"
  },
  {
    "id": "q_shelf",
    "stage": "qualificacao",
    "services": [
      "alimentos",
      "cosmeticos"
    ],
    "title": "Shelf-life — Perguntas iniciais",
    "when": "Cliente quer saber o prazo de validade de um produto alimentício ou cosmético.",
    "body": "- Poderia por gentileza nos encaminhar a ficha técnica ou a tabela nutricional do seu produto?\n\n- Qual é o prazo de validade pretendida estimado?\n\n- Qual é a temperatura de armazenagem do seu produto?"
  },
  {
    "id": "q_estab",
    "stage": "qualificacao",
    "services": [
      "cosmeticos"
    ],
    "title": "Estabilidade Cosméticos — Perguntas iniciais",
    "when": "Cliente cosmético precisa validar estabilidade do produto.",
    "body": "- Poderia por gentileza nos encaminhar a ficha técnica do seu produto?\n- Qual é o prazo de validade pretendida estimado?\n- Qual é a condição de armazenamento?\n- Qual é o tipo de embalagem que condiciona o produto?"
  },
  {
    "id": "q_challenge",
    "stage": "qualificacao",
    "services": [
      "cosmeticos"
    ],
    "title": "Challenge Test — Perguntas iniciais",
    "when": "Cliente cosmético precisa testar a eficácia dos conservantes do produto.",
    "body": "1. Você poderia nos encaminhar a ficha técnica desses cosméticos?\n\n2. Possui conservantes? Se sim, quais?\n\n3. O estudo é para:\n• Registro regulatório?\n• Desenvolvimento interno?\n• Exportação?\n\n4. Qual o tipo de embalagem?\n\n5. Como o produto será armazenado? Temperatura ambiente, refrigerado, etc.?\n\n6. Produto será comercializado onde? Existe exigência de cliente (ex: grandes varejistas)?"
  },
  {
    "id": "p_agua_bruta",
    "stage": "preco",
    "services": [
      "agua"
    ],
    "title": "Água Bruta (Poço) — 3 opções de pacote",
    "when": "Após qualificar — cliente tem poço / fonte de água bruta.",
    "fields": [
      {
        "name": "coleta_tec",
        "label": "Coleta técnica R$",
        "placeholder": "ex: 350,00"
      },
      {
        "name": "kit",
        "label": "Envio do kit R$",
        "placeholder": "ex: 150,00"
      }
    ],
    "body": "Temos 3 opções de análises de água bruta (poço):\n\n1 - Básica (Contempla 23 parâmetros que serão analisados) - R$: 600,00\n\n2 - Média (Contempla 30 parâmetros que serão analisados) - R$: 1.500,00\n\n3 - Completa (Contempla 92 parâmetros que serão analisados) - R$: 4.800,00\n\nColeta de amostras:\n\n1 - Coleta técnica - R$: {{coleta_tec}}\n\n2 - Envio do kit esterilizado para você realizar a coleta e depois nos enviar as amostras para realizarmos as análises - R$: {{kit}}\n\nQual dessas opções de análises (opção 1, 2 ou 3) e coleta de amostras (opção 1 ou 2) gostaria de seguir?"
  },
  {
    "id": "p_agua_trat",
    "stage": "preco",
    "services": [
      "agua"
    ],
    "title": "Água Tratada — 2 opções de pacote",
    "when": "Após qualificar — cliente tem água tratada/rede pública.",
    "fields": [
      {
        "name": "coleta_tec",
        "label": "Coleta técnica R$",
        "placeholder": "ex: 350,00"
      },
      {
        "name": "kit",
        "label": "Envio do kit R$",
        "placeholder": "ex: 150,00"
      }
    ],
    "body": "Temos 2 opções de análises de água tratada:\n\n1 - Análises de água tratada Básica (Contempla 12 parâmetros que serão analisados) - R$: 250,00 por ponto\n\n2 - Análises de água tratada Completa (Contempla 23 parâmetros que serão analisados) - R$: 400,00 por ponto\n\nColeta de amostras:\n\n1 - Coleta técnica - R$: {{coleta_tec}}\n\n2 - Envio do kit esterilizado para você realizar a coleta e depois nos enviar as amostras para realizarmos as análises - R$: {{kit}}\n\nQual dessas opções de análises (opção 1 ou 2) e coleta de amostras (opção 1 ou 2) gostaria de seguir?"
  },
  {
    "id": "p_ar",
    "stage": "preco",
    "services": [
      "ar"
    ],
    "title": "Ar-climatizado — Custos",
    "when": "Depois de qualificar os pontos e o endereço, apresente o custo consolidado.",
    "fields": [
      {
        "name": "analise",
        "label": "Análise R$",
        "placeholder": "ex: 280,00/ponto"
      },
      {
        "name": "coleta",
        "label": "Coleta R$",
        "placeholder": "ex: 450,00"
      },
      {
        "name": "total",
        "label": "Total R$",
        "placeholder": "ex: 1.290,00"
      }
    ],
    "body": "Segue custo das análises:\n\nAnálise de ar-climatizado - R$: {{analise}}\n\nCustos Logísticos: - R$: {{coleta}}\n\nTotal (pontos internos + Coleta técnica) - R$: {{total}}"
  },
  {
    "id": "p_shelf",
    "stage": "preco",
    "services": [
      "alimentos"
    ],
    "title": "Shelf-life — Mensagem padrão",
    "when": "Formato completo de proposta de shelf-life com tempos acelerado + real.",
    "fields": [
      {
        "name": "produto",
        "label": "Produto",
        "placeholder": "ex: Creatina"
      },
      {
        "name": "val_acel",
        "label": "Validade acelerado",
        "placeholder": "ex: 12 meses"
      },
      {
        "name": "val_real",
        "label": "Validade real",
        "placeholder": "ex: 24 meses"
      },
      {
        "name": "val1",
        "label": "Valor acelerado",
        "placeholder": "ex: 8.940,00"
      },
      {
        "name": "val2",
        "label": "Valor real",
        "placeholder": "ex: 11.920,00"
      },
      {
        "name": "total",
        "label": "Total",
        "placeholder": "ex: 20.860,00"
      }
    ],
    "body": "Produto: {{produto}}\n\nEstudo de Shelf-life em Tempo Acelerado\n\nValidade pretendida estimada: {{val_acel}}\nTempos de estudo: T0/T3/T6\nValor: R$ {{val1}}\n\nEstudo de Shelf-life em Tempo Real (Sem T0 que será aproveitado do Acelerado)\n\nValidade pretendida estimada: {{val_real}}\nTempos de estudo: T0/T6/T12/T24\nValor: R$ {{val2}}\n\nTotal - Estudo de Shelf-life em Tempo Acelerado + Tempo Real associados = R$: {{total}}"
  },
  {
    "id": "pr_tec",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Consultar departamento técnico",
    "when": "Quando não souber o valor de cara e precisar ganhar tempo com o cliente.",
    "body": "Vou levantar os custos com o time técnico e te retorno assim que tiver o posicionamento deles."
  },
  {
    "id": "pr_cad",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Dados cadastrais",
    "when": "Cliente aceitou o valor. Solicite os dados para formalizar a proposta.",
    "body": "Para fins cadastrais e formalização da proposta comercial por gentileza informar:\n\n• Razão Social\n• CNPJ\n• Email para o envio da proposta\n• Email para envio da Nota Fiscal e Boleto de pagamento\n• Email para acesso ao portal para consultar laudo"
  },
  {
    "id": "pr_dir",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Seguir cadastro — Direcionamento Gerente",
    "when": "Cliente enviou dados. Transfere para o gerente de novos negócios.",
    "body": "Vamos seguir com seu cadastro e com a formalização da sua proposta. Depois, nosso gerente de novos negócios entrará em contato para o envio da proposta e para negociar os custos e formas de pagamento."
  },
  {
    "id": "pr_form",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Seguir cadastro e formalização",
    "when": "Convite para o próximo passo após alinhamento de escopo.",
    "body": "Podemos seguir com seu cadastro e com a formalização da sua proposta para sua aprovação?"
  },
  {
    "id": "pr_aguap",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Aguardo aprovação para seguirmos",
    "when": "Cliente já recebeu a proposta e você está aguardando resposta.",
    "body": "Aguardo sua aprovação para seguirmos com a efetivação da proposta e para agendarmos a retirada das amostras."
  },
  {
    "id": "pr_guarda",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Explicação — Contrato aberto (guarda-chuva)",
    "when": "Cliente tem demanda recorrente sem volume fixo definido. Explica como funciona.",
    "body": "Queria te explicar rapidamente como funciona a proposta no formato contrato aberto (ou guarda-chuva).\n\nEsse modelo é ideal quando não há uma quantidade exata de amostras ou definição prévia dos produtos que serão analisados, ou ainda quando a produção acontece conforme a demanda de vendas. Ele traz flexibilidade total: você pode enviar amostras quando e quantas vezes quiser, escolhendo livremente as análises a serem realizadas ao longo da vigência do contrato.\n\nFunciona de forma semelhante a um cartão de crédito: você utiliza os serviços ao longo do mês, no final ocorre o fechamento da fatura com a discriminação das análises realizadas, e o pagamento acontece apenas no mês subsequente. Isso traz previsibilidade financeira e organização para o seu planejamento.\n\nOutro ponto importante é que o valor das análises fica fixado durante toda a vigência do contrato (12 meses). Ou seja, mesmo que haja algum reajuste interno no laboratório, você não será impactado.\n\nNa proposta comercial, o que consideramos é o custo unitário de cada análise, para que você consiga estimar seus gastos conforme a demanda real. A cobrança mensal será sempre baseada exatamente no que foi utilizado naquele período."
  },
  {
    "id": "pr_wa",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Proposta enviada por e-mail — Aviso no WhatsApp",
    "when": "Você acabou de mandar a proposta por e-mail. Avise o cliente no WhatsApp.",
    "body": "Conforme solicitado, segue a proposta comercial formalizada para sua conferência e aprovação.\n\nFico à disposição para qualquer dúvida ou ajuste.\n\nAssim que receber seu retorno, seguimos com a efetivação da proposta e com as orientações para envio das amostras."
  },
  {
    "id": "pr_conf",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Conforme solicitado, segue proposta",
    "when": "Versão alternativa para anunciar o envio da proposta comercial.",
    "body": "Conforme solicitado, encaminho a proposta comercial para sua validação e aprovação.\n\nAssim que recebermos o seu ok (pode ser por aqui mesmo), daremos sequência à efetivação da proposta e enviaremos as orientações para o envio das amostras."
  },
  {
    "id": "pr_ret",
    "stage": "proposta",
    "services": [
      "geral"
    ],
    "title": "Aguardo retorno para efetivação",
    "when": "Segundo lembrete/follow-up detalhado depois que a proposta já foi enviada.",
    "body": "Aguardo seu retorno com a aprovação para seguirmos com a efetivação da proposta.\n\nNa sequência, enviaremos todas as orientações para o preparo e envio das amostras, incluindo as quantidades necessárias, a ficha de amostragem para preenchimento e o endereço para envio das amostras."
  },
  {
    "id": "pr_cam",
    "stage": "proposta",
    "services": [
      "geral",
      "alimentos"
    ],
    "title": "Camila — Ajustar proposta (interno)",
    "when": "Comunicação interna: pedir à Camila para incluir análises específicas via EPICFLOW.",
    "fields": [
      {
        "name": "obs",
        "label": "Obs",
        "placeholder": "observação adicional"
      }
    ],
    "body": "Ca, por gentileza incluir análises microbiológica, glúten e lactose em alimentos conforme tratado e conversado via EPICFLOW no cliente da PC Abaixo:\n\nObs: {{obs}}"
  },
  {
    "id": "o_kit",
    "stage": "orientacao",
    "services": [
      "geral"
    ],
    "title": "Kit esterilizado — O que contempla",
    "when": "Cliente optou pelo kit (em vez de custos logísticos). Explique o que vai receber.",
    "body": "O kit contempla:\n\n- Frascos esterilizados, na quantidade exata para a coleta das amostras;\n\n- Luva esterilizada para garantir a assepsia durante o manuseio;\n\n- Lenço com álcool para higienização adequada do ponto de coleta;\n\n- Manual de instruções com orientações passo a passo para a correta realização da coleta;\n\n- Ficha de amostragem, que deverá ser devidamente preenchida com as informações da amostra e anexada no momento do envio."
  },
  {
    "id": "o_shelf_prep",
    "stage": "orientacao",
    "services": [
      "alimentos"
    ],
    "title": "Shelf-life — Preparo de amostras (retirada no local)",
    "when": "Cliente aprovou shelf-life com retirada no local. Oriente o preparo.",
    "fields": [
      {
        "name": "unidade1",
        "label": "Unidade 1",
        "placeholder": "ex: Pinheiros"
      },
      {
        "name": "unidade2",
        "label": "Unidade 2",
        "placeholder": "ex: Itaim Bibi"
      },
      {
        "name": "produto",
        "label": "Produto",
        "placeholder": "ex: lasanha de vitelo"
      },
      {
        "name": "gramas_tempo",
        "label": "Gramas por tempo",
        "placeholder": "ex: 300"
      },
      {
        "name": "total_gramas",
        "label": "Total em gramas",
        "placeholder": "ex: 900"
      }
    ],
    "body": "Conforme alinhado e considerando as duas as unidades {{unidade1}} e {{unidade2}}, seguem as orientações para o preparo das amostras para que possamos realizar a retirada no local.\n\nQuantidade de amostras necessárias para realizarmos o estudo:\n\nPor gentileza, separar {{gramas_tempo}} gramas de amostra por tempo de estudo.\n\nConsiderando que o estudo contempla três tempos (T0, T3 e T5), será necessário o total de {{total_gramas}} gramas da amostra do alimento ({{produto}}) por estudo para cada unidade/CNPJ.\n\nAcondicionamento das amostras:\n\nPedimos também que as amostras sejam acondicionadas em uma caixa de isopor ou bolsa térmica. Se possível, adicionar gelox ou gelo, para ajudar na conservação das amostras e evitar qualquer alteração durante o transporte, desde o local da retirada até a chegada ao nosso laboratório, onde iniciaremos as análises.\n\nFico à disposição caso tenham qualquer dúvida. Assim que estiverem organizadas, nos sinalizem para alinharmos a retirada das amostras."
  },
  {
    "id": "o_shelf_peso",
    "stage": "orientacao",
    "services": [
      "alimentos"
    ],
    "title": "Shelf-life alimentos — Perguntar peso do produto",
    "when": "Antes de orientar quantidades de amostra, você precisa saber o peso do produto final.",
    "body": "Para que eu possa te enviar corretamente as orientações sobre as quantidades de amostras que deverão ser enviadas para cada tempo do estudo de shelf life, poderia me informar qual é o peso do produto final que será comercializado (em gramas ou quilogramas)? Assim consigo calcular e te passar a quantidade necessária por tempo de análise e também o total de amostras para todo o estudo."
  },
  {
    "id": "r_farm",
    "stage": "referencia",
    "services": [
      "farmacia"
    ],
    "title": "Exigências regulatórias — Farmácias",
    "when": "Consulta rápida para lembrar das frequências exigidas por tipo de farmácia.",
    "body": "Exigência para Todas as Farmácias de Manipulação:\n\n- Análise de água potável/tratada – (Frequência exigida SEMESTRAL)\n   Obs: Incluir Pacote com 12 parâmetros com sólidos totais\n\n- Análises de água ultrapurificada – (Frequência Exigida MENSAL)\n\nApenas para Farmácias de Manipulação Dermatológicas e Cápsulas:\n\n- Base galênica – (Frequência exigida 1 vez ao MÊS sendo realizado todas as suas bases pelo menos 1 vez ao ano)\n\n- Análises de cápsulas prontas ≤ 25mg – (Frequência exigida BIMESTRAL) - RDC 87 (Complementar da RDC 67)\n\n- Análises de cápsulas prontas ≥ 100mg – (Frequência exigida TRIMESTRAL)"
  },
  {
    "id": "r_cosm",
    "stage": "referencia",
    "services": [
      "cosmeticos"
    ],
    "title": "Classificação — Cosméticos Tipo I e Tipo II",
    "when": "Consulta rápida para classificar o cosmético durante a conversa.",
    "body": "Cosméticos Tipo I:\na) produtos para uso infantil;\nb) produtos para área dos olhos;\nc) produtos que entram em contato com mucosas;\n\nCosméticos Tipo II:\na) todos os demais"
  },
  {
    "id": "r_tk",
    "stage": "referencia",
    "services": [
      "cosmeticos"
    ],
    "title": "Time Kill — O que é (explicação técnica)",
    "when": "Use quando o cliente quiser entender o conceito antes de pedir o teste.",
    "body": "Time Kill é o \"Ensaio de tempo de morte\" quando o produto tem apelo bactericida. Esse teste determina o tempo da morte do micro-organismo, se o produto é eficaz.\n\nExemplo: Álcool em gel para mãos etc."
  },
  {
    "id": "r_in161",
    "stage": "referencia",
    "services": [
      "alimentos"
    ],
    "title": "Alimentos — Normativa IN 161 (link)",
    "when": "Link oficial da normativa de referência para alimentos.",
    "body": "Normativa IN 161 (link oficial):\n\nhttps://www.in.gov.br/en/web/dou/-/instrucao-normativa-in-n-161-de-1-de-julho-de-2022-413366880"
  }
];
