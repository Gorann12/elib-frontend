import axios from "axios";
import { useContext } from "react";
import { KorisnikContext } from "../context/KorisnikContext";
import { Knjiga, KreirajKnjigu } from "../tipovi";

export const useKnjiga = () => {
  const { dajToken } = useContext(KorisnikContext);

  const kreirajKnjigu: (podaci: KreirajKnjigu) => Promise<Knjiga> = async (
    podaci
  ) => {
    const { data } = await axios.post<Knjiga>("/knjiga", podaci, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  const azurirajKnjigu: (
    id: number,
    podaci: Partial<KreirajKnjigu>
  ) => Promise<Knjiga> = async (id, podaci) => {
    const { data } = await axios.patch<Knjiga>(`/knjiga/${id}`, podaci, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  return { kreirajKnjigu, azurirajKnjigu };
};
