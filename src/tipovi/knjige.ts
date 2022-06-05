import { Autor } from "./autor";
import { Kategorija } from "./kategorija";

export interface Knjiga {
  id: number;
  naslov: string;
  autorId: number;
  autor: Autor;
  opis: string;
  brojStrana: number;
  pismo: string;
  povez: string;
  dimenzije: string;
  cena: number;
  kategorije: Kategorija[];
}

export type KreirajKnjigu = Omit<Knjiga, "autor" | "kategorije"> & {
  idKategorija: number[];
};
