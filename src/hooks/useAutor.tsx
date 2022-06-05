import axios from "axios";
import { useContext } from "react";
import { KorisnikContext } from "../context/KorisnikContext";
import { Autor, KreirajAutora } from "../tipovi";

export const useAutor = () => {
  const { dajToken } = useContext(KorisnikContext);

  const kreiraj: (podaci: KreirajAutora) => Promise<Autor> = async (podaci) => {
    const { data } = await axios.post<Autor>("/autor", podaci, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  return { kreiraj };
};
