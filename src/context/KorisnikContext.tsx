import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  Korisnik,
  AuthResponse,
  UlogaKorisnika,
} from "../components/core/tipovi";

const token_key = "loginToken";

type KorisnikContextType = {
  korisnik: Korisnik | null;
  inicijalnoUcitavanje: boolean;
  ulogujKorisnika: (podaci: AuthResponse) => void;
  daLiJeAdmin: () => boolean;
  daLiJeKorisnikUlogovan: () => boolean;
  dajToken: () => string;
};

export const KorisnikContext = createContext<KorisnikContextType>(
  {} as KorisnikContextType
);

export const KorisnikProvider = (props: { children: any }) => {
  const [korisnik, postaviKorisnika] = useState<Korisnik | null>(null);
  const [token, postaviToken] = useState<string | null>(null);
  const [inicijalnoUcitavanje, postaviInicijalnoUcitavanje] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(token_key);

    if (token) {
      axios
        .get<Korisnik>("/me")
        .then(({ data }) => {
          ulogujKorisnika({ korisnik: data, token });
        })
        .finally(() => postaviInicijalnoUcitavanje(false));
    } else {
      postaviInicijalnoUcitavanje(false);
    }
  }, []);

  const ulogujKorisnika = (podaci: AuthResponse) => {
    const { korisnik, token } = podaci;

    localStorage.setItem(token_key, token);
    postaviKorisnika(korisnik);
    postaviToken(token);
  };

  const daLiJeAdmin = (): boolean => {
    return !!korisnik && korisnik.uloga === UlogaKorisnika.ADMIN;
  };

  const daLiJeKorisnikUlogovan = () => Boolean(korisnik);

  const dajToken = () => (token ? token : "");

  return (
    <KorisnikContext.Provider
      value={{
        korisnik,
        inicijalnoUcitavanje,
        ulogujKorisnika,
        daLiJeAdmin,
        daLiJeKorisnikUlogovan,
        dajToken,
      }}
    >
      {props.children}
    </KorisnikContext.Provider>
  );
};
