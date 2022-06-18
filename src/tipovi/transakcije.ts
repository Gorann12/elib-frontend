export interface Transakcija {
  id: number;
  korisnikId: number;
  datumKreiranja: string;
  knjige: ProizvodTransakcije[];
}

export interface ProizvodTransakcije {
  transakcijaId: number;
  naslov: string;
  cena: number;
  kolicina: number;
}
