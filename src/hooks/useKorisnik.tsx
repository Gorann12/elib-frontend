import axios from "axios";
import { useContext } from "react";
import { AuthResponse, PrijavaKorisnika, RegistrujKorisnika } from "../tipovi";
import { KorisnikContext } from "../context/KorisnikContext";

const endpoint = {
  prijava: "/autentifikacija/prijava",
  registracija: "/autentifikacija/registracija",
};

export const useKorisnik = () => {
  const { ulogujKorisnika } = useContext(KorisnikContext);

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

  return { prijava, registracija };
};
