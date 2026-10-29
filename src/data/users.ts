export interface User {
  user: string;
  pass: string;
  nome: string;
  role: 'admin' | 'op' | 'vendedor';
  foto?: string;
}

export interface Vendor {
  id: string;
  nome: string;
  whatsapp: string;
  foto?: string;
}

export const DEFAULT_USERS: User[] = [
  {
    "user": "admin",
    "pass": "admin2024",
    "nome": "Administrador",
    "role": "admin"
  },
  {
    "user": "gerente",
    "pass": "gerente2024",
    "nome": "Gerente Comercial",
    "role": "admin"
  },
  {
    "user": "felipe",
    "pass": "felipe2024",
    "nome": "Felipe",
    "role": "admin"
  },
  {
    "user": "suporte",
    "pass": "suporte2024",
    "nome": "Suporte Comercial",
    "role": "op"
  },
  {
    "user": "vendas",
    "pass": "vendas2024",
    "nome": "Equipe de Vendas",
    "role": "op"
  },
  {
    "user": "halina",
    "pass": "halina2024",
    "nome": "Halina",
    "role": "op"
  },
  {
    "user": "camila",
    "pass": "camila2024",
    "nome": "Camila",
    "role": "op"
  }
];

export const DEFAULT_VENDORS: Vendor[] = [
  {
    "id": "felipe",
    "nome": "Felipe",
    "whatsapp": "11988843888",
    "foto": ""
  },
  {
    "id": "halina",
    "nome": "Halina",
    "whatsapp": "11994816363",
    "foto": ""
  },
  {
    "id": "camila",
    "nome": "Camila",
    "whatsapp": "11969170479",
    "foto": ""
  }
];
