# PróLab Biotecnologia — Portal do Colaborador 2.0 (Rebuilt)

Projeto reconstruído a partir do arquivo monolítico original (`prolab_portal_colaborador_versao_final_2_0.html` de 15.576 linhas e 71 scripts sobrepostos), agora com uma arquitetura modular, tipada, performática e 100% fiel a todas as regras de negócio.

---

## 🚀 Tecnologias Utilizadas

- **React 19 + TypeScript**: Componentização moderna com tipagem estrita de dados e contratos de API/modelos.
- **Vite 6**: Ferramenta de build ultrarrápida com divisão estratégica de chunks (*code splitting*).
- **Tailwind CSS 3**: Sistema de design moderno, responsivo e baseado na paleta institucional oficial da PróLab:
  - Primária: `#00594C`
  - Acento: `#00B4A0` (Teal)
  - Dark Navy: `#0F1B2D`
  - Dourado: `#C49A2B`
- **Lucide React**: Biblioteca de ícones vetoriais modernos e consistentes.
- **XLSX (SheetJS)**: Exportação e importação de relatórios comerciais e tabelas analíticas em `.xlsx` e `.csv`.

---

## 📂 Estrutura do Projeto

```
PL Antigravity/
├── dist/                               # Build de produção otimizado
│   ├── prolab_portal_colaborador_rebuilt.html  # Versão standalone 100% offline
│   └── assets/                         # Chunks modulares JS/CSS
├── scripts/
│   └── bundle-singlefile.cjs          # Script para empacotar standalone HTML
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Barra superior institucional com abas e usuário
│   │   │   └── Footer.tsx              # Rodapé com dados de contato da PróLab
│   │   └── views/
│   │       ├── LoginView.tsx           # Tela de login com perfis e passos comerciais
│   │       ├── HomeView.tsx            # Dashboard inicial, mural de recados e blog
│   │       ├── TriagemView.tsx         # Funil de triagem (Dados -> Diagnóstico -> Score)
│   │       ├── PrecoView.tsx           # Catálogo analítico (601 ensaios), carrinho e normas
│   │       ├── TemplatesView.tsx       # 31 templates WhatsApp com campos dinâmicos
│   │       ├── ShelfLifeView.tsx       # Calculadora de estudo de validade (Shelf Life)
│   │       ├── LogisticaView.tsx       # Calculadora de coleta técnica com busca por CEP
│   │       ├── GestaoView.tsx          # CRM Kanban, gestão de leads e parâmetros
│   │       └── UniversidadeView.tsx    # Treinamentos e biblioteca normativa
│   ├── context/
│   │   ├── AuthContext.tsx             # Autenticação, sessão e níveis de permissão
│   │   └── AppContext.tsx              # Estado global do CRM, catálogo e orçamentos
│   ├── data/                           # Bases de dados extraídas e limpas
│   │   ├── diagnostic.ts               # Matriz de diagnóstico e 8 perguntas ponderadas
│   │   ├── logistics.ts                # Parâmetros de coleta técnica e frota
│   │   ├── prices.ts                   # Catálogo com 601 ensaios laboratoriais
│   │   ├── shelf.ts                    # Parâmetros e ensaios de shelf life
│   │   ├── templates.ts                # 31 templates comerciais oficiais
│   │   ├── university.ts               # Módulos da academia corporativa e normas
│   │   └── users.ts                    # Colaboradores e consultores comerciais
│   ├── types/
│   │   └── index.ts                    # Contratos de tipos TypeScript
│   ├── utils/
│   │   ├── calculations.ts             # Cálculos de diagnóstico, shelf life e logística
│   │   ├── excel.ts                    # Exportação e importação de planilhas Excel
│   │   └── formatters.ts               # Máscaras de telefone, CEP, moeda (BRL) e data
│   ├── App.tsx                         # Roteamento e orquestração de telas
│   ├── index.css                       # Diretivas Tailwind e estilização base
│   └── main.tsx                        # Ponto de entrada React
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Como Executar o Projeto

### 1. Modo de Desenvolvimento (Vite Dev Server)
Para rodar localmente com recarga automática (*Hot Module Replacement*):
```bash
npm run dev
```
O servidor iniciará normalmente em `http://localhost:5173`.

### 2. Gerar o Build de Produção
Para compilar os arquivos otimizados e minificados:
```bash
npm run build
```
Os arquivos finais serão gerados na pasta `dist/`.

### 3. Gerar Arquivo Único HTML (Standalone Offline)
Se desejar abrir o sistema em qualquer computador com um duplo clique sem necessidade de servidor:
```bash
npm run bundle:html
```
O arquivo standalone será gerado em:
`dist/prolab_portal_colaborador_rebuilt.html`

---

## 👥 Credenciais de Acesso de Teste

| Usuário | Senha | Perfil | Nome |
| :--- | :--- | :--- | :--- |
| `admin` | `admin2024` | Gestão (Admin) | Administrador Geral |
| `gerente` | `gerente2024` | Gestão (Admin) | Gerente Comercial |
| `felipe` | `felipe2024` | Gestão (Admin) | Felipe |
| `suporte` | `suporte2024` | Operação | Suporte Comercial |
| `vendas` | `vendas2024` | Operação | Equipe de Vendas |
| `halina` | `halina2024` | Operação | Halina |
| `camila` | `camila2024` | Operação | Camila |

---

## ✨ Principais Melhorias Implementadas na Versão 2.0

1. **Eliminação de Débito Técnico Crítico**: Substituição de 71 scripts monkey-patched e blocos duplicados de dados por uma arquitetura componentizada em React e TypeScript.
2. **Redução e Otimização de Código**: De um arquivo poluído de 2.7 MB para bundles modulares e otimizados com carregamento instantâneo.
3. **Catálogo Completo Preservado**: Todos os 601 parâmetros e ensaios analíticos foram mantidos, estruturados e integrados à busca instantânea.
4. **Precisão Matemática**: Fórmulas de diagnóstico com pesos de dimensões (P, U, A, R), algoritmo de pontuação de leads (Classes A, B e C), cálculo logístico (ida e volta, margens, mínimos) e estudo de Shelf Life mantidos com 100% de conformidade.
5. **Integração ViaCEP Ativa**: Preenchimento automático do endereço na aba de Coleta Técnica via CEP.
6. **Exportação & Importação Excel**: Geração de orçamentos e relatórios em formato `.xlsx` nativo.
