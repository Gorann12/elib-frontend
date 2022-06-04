import axios from "axios";
import { useContext } from "react";
import {
  AuthResponse,
  Korisnik,
  PrijavaKorisnika,
  RegistrujKorisnika,
} from "../tipovi";
import { KorisnikContext } from "../context/KorisnikContext";

const endpoint = {
  prijava: "/autentifikacija/prijava",
  registracija: "/autentifikacija/registracija",
  korisnik: "/korisnik",
};

export const useKorisnik = () => {
  const { ulogujKorisnika, postaviPodatkeZaKorisnika, dajToken } =
    useContext(KorisnikContext);

  const prijava: (podaci: PrijavaKorisnika) => Promise<AuthResponse> = async (
    podaci
  ) => {
    const { data } = await axios.post<AuthResponse>(endpoint.prijava, podaci);
    ulogujKorisnika(data);

    return data;
  };

  const registracija: (
    podaci: RegistrujKorisnika
  ) => Promise<AuthResponse> = async (podaci) => {
    const { data } = await axios.post<AuthResponse>(
      endpoint.registracija,
      podaci
    );
    ulogujKorisnika(data);

    return data;
  };

  const izmeniKorisnika: (
    podaci: Partial<RegistrujKorisnika>
  ) => Promise<Korisnik> = async (podaci) => {
    const token = dajToken();
    const { data } = await axios.patch<Korisnik>(endpoint.korisnik, podaci, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    postaviPodatkeZaKorisnika(data);

    return data;
  };

  return { prijava, registracija, izmeniKorisnika };
};
