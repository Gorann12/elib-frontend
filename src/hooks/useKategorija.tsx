import axios from "axios";
import { useContext } from "react";
import { KorisnikContext } from "../context/KorisnikContext";
import { Kategorija, KreirajKategoriju } from "../tipovi/kategorija";

export const useKategorija = () => {
  const { dajToken } = useContext(KorisnikContext);

  const kreiraj: (podaci: KreirajKategoriju) => Promise<Kategorija> = async (
    podaci
  ) => {
    const { data } = await axios.post("/kategorija", podaci, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  return { kreiraj };
};
