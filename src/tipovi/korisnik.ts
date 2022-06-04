export enum UlogaKorisnika {
  ADMIN = "ADMIN",
  KORISNIK = "KORISNIK",
}

export interface Korisnik {
  id: number;
  email: string;
  ime: string;
  prezime: string;
  ulicaStanovanja: string;
  brojUlice: number;
  telefon: string;
  godinaRodjenja: string;
  uloga: UlogaKorisnika;
  kreiranDatuma: Date;
  azuriranDatuma: Date;
}

export interface PrijavaKorisnika {
  email: string;
  lozinka: string;
}

export interface AuthResponse {
  token: string;
  korisnik: Korisnik;
}

export type RegistrujKorisnika = Omit<
  Korisnik,
  "id" | "uloga" | "kreiran" | "azuriran"
> & {
  lozinka: string;
};
