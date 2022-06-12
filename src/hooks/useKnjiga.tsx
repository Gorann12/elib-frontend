import axios from "axios";
import { useContext } from "react";
import { KorisnikContext } from "../context/KorisnikContext";
import {
  Knjiga,
  KreirajKnjigu,
  PoredakSortiranja,
  SortiranjePo,
} from "../tipovi";

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

  const dajKnjige: (filter: {
    stranica?: number;
    sortirajPo?: SortiranjePo;
    smerSortiranja?: PoredakSortiranja;
    idKategorije?: number;
  }) => Promise<Knjiga[]> = async ({
    stranica = 0,
    sortirajPo = "cena",
    smerSortiranja = "asc",
    idKategorije = -1,
  }) => {
    const url =
      idKategorije > -1 && idKategorije != null
        ? `/kategorija/${idKategorije}/knjiga`
        : "/knjiga";

    const { data } = await axios.get<Knjiga[]>(url, {
      params: {
        stranica: stranica + "",
        sortirajPo,
        smerSortiranja,
        limit: "5",
      },
    });

    return data;
  };

  const dajKnjigu: (id: number) => Promise<Knjiga> = async (id) => {
    const { data } = await axios.get<Knjiga>(`/knjiga/${id}`);

    return data;
  };

  const izbrisiKnjigu: (id: number) => Promise<Knjiga> = async (id) => {
    const { data } = await axios.delete<Knjiga>(`/knjiga/${id}`, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  return {
    kreirajKnjigu,
    azurirajKnjigu,
    dajKnjige,
    dajKnjigu,
    izbrisiKnjigu,
  };
};
