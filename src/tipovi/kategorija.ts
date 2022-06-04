export interface Kategorija {
  id: number;
  naziv: string;
  opis: string;
}

export type KreirajKategoriju = Omit<Kategorija, "id">;
