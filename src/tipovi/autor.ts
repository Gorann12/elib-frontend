export interface Autor {
  id: number;
  ime: string;
  mestoRodjenja: string;
  godinaRodjenja: number;
  biografija: string;
}

export type KreirajAutora = Omit<Autor, "id">;
