export interface ElementKorpe {
  id: number;
  naslov: string;
  cena: number;
  kolicina: number;
}

export interface IndexedElementKorpe {
  [key: string]: ElementKorpe;
}
