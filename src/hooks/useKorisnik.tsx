import axios from "axios";
import { useContext } from "react";
import { AuthResponse, PrijavaKorisnika } from "../components/core/tipovi";
import { KorisnikContext } from "../context/KorisnikContext";

const endpoint = {
  prijava: "/autentifikacija/prijava",
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

  return { prijava };
};
