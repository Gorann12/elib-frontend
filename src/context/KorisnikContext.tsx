import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Korisnik, AuthResponse, UlogaKorisnika } from "../tipovi";

const token_key = "loginToken";

type KorisnikContextType = {
  korisnik: Korisnik | null;
  inicijalnoUcitavanje: boolean;
  ulogujKorisnika: (podaci: AuthResponse) => void;
  daLiKorisnikImaUlogu: (uloga: UlogaKorisnika) => boolean;
  dajToken: () => string;
  odjaviKorisnika: () => void;
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
        .get<Korisnik>("/korisnik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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

  const daLiKorisnikImaUlogu = (uloga: UlogaKorisnika) => {
    if (!korisnik) return false;

    return korisnik.uloga === uloga;
  };

  const dajToken = () => (token ? token : "");

  const odjaviKorisnika = () => {
    localStorage.removeItem(token_key);

    postaviToken("");
    postaviKorisnika(null);
  };

  return (
    <KorisnikContext.Provider
      value={{
        korisnik,
        inicijalnoUcitavanje,
        ulogujKorisnika,
        daLiKorisnikImaUlogu,
        dajToken,
        odjaviKorisnika,
      }}
    >
      {props.children}
    </KorisnikContext.Provider>
  );
};
