import { Autor } from "./autor";
import { Kategorija } from "./kategorija";

export interface Knjige {
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

export type KreirajKnjigu =
  | Omit<Knjige, "autor" | "kategorije">
  | { idKategorija: number[] };
