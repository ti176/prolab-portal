export interface ShelfCategory {
  id: string;
  nome: string;
  base: number;
}

export interface ShelfItem {
  id: string;
  nome: string;
  preco: number;
  catId?: string;
}

export interface ShelfPeriod {
  id: string;
  nome: string;
  mult: number;
}

export interface ShelfParams {
  desconto: number;
  margem: number;
  amostraGramas: number;
}

export interface ShelfConfig {
  cats: ShelfCategory[];
  items: ShelfItem[];
  periods: ShelfPeriod[];
  params: ShelfParams;
}

export const DEFAULT_SHELF_CONFIG: ShelfConfig = {
  "cats": [
    {
      "id": "po",
      "nome": "Suplementos em pó",
      "base": 980
    },
    {
      "id": "cap",
      "nome": "Suplementos em cápsulas",
      "base": 980
    },
    {
      "id": "liq",
      "nome": "Suplementos líquidos",
      "base": 1100
    },
    {
      "id": "cosm",
      "nome": "Cosméticos",
      "base": 1200
    },
    {
      "id": "alim",
      "nome": "Alimentos",
      "base": 950
    }
  ],
  "items": [
    {
      "id": "creat",
      "nome": "Creatina",
      "preco": 2000
    },
    {
      "id": "lact",
      "nome": "Lactose",
      "preco": 900
    },
    {
      "id": "caf",
      "nome": "Cafeína",
      "preco": 1100
    },
    {
      "id": "calc",
      "nome": "Cálcio",
      "preco": 185
    },
    {
      "id": "ferro",
      "nome": "Ferro",
      "preco": 185
    },
    {
      "id": "zinco",
      "nome": "Zinco",
      "preco": 185
    },
    {
      "id": "mag",
      "nome": "Magnésio",
      "preco": 185
    },
    {
      "id": "vitc",
      "nome": "Vitamina C",
      "preco": 1100
    },
    {
      "id": "vitd",
      "nome": "Vitamina D3",
      "preco": 1800
    },
    {
      "id": "b12",
      "nome": "Vitamina B12",
      "preco": 1100
    },
    {
      "id": "colag",
      "nome": "Colágeno",
      "preco": 2700
    },
    {
      "id": "omega",
      "nome": "Ômega 3 / 6 / 9",
      "preco": 1250
    },
    {
      "id": "coq10",
      "nome": "Coenzima Q10",
      "preco": 2000
    },
    {
      "id": "beta",
      "nome": "Beta alanina",
      "preco": 2000
    },
    {
      "id": "arg",
      "nome": "L-arginina",
      "preco": 2000
    },
    {
      "id": "mel",
      "nome": "Melatonina",
      "preco": 2000
    },
    {
      "id": "sema",
      "nome": "Semaglutida",
      "preco": 2730
    },
    {
      "id": "tirz",
      "nome": "Tirzepatida",
      "preco": 2730
    }
  ],
  "periods": [
    {
      "id": "a3",
      "nome": "Acelerado — 3 meses (T0/T3/T6)",
      "mult": 3
    },
    {
      "id": "a6",
      "nome": "Acelerado — 6 meses (T0/T3/T6/T9/T12)",
      "mult": 5
    },
    {
      "id": "r12",
      "nome": "Tempo real — 12 meses",
      "mult": 4
    },
    {
      "id": "r24",
      "nome": "Tempo real — 24 meses",
      "mult": 5
    },
    {
      "id": "custom",
      "nome": "Personalizado",
      "mult": 1
    }
  ],
  "params": {
    "desconto": 0,
    "margem": 0,
    "amostraGramas": 350
  }
};
