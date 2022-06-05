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

  const dajKnjige: (
    stranica: number,
    sortirajPo: "naslov" | "cena",
    smerSortiranja: "asc" | "desc"
  ) => Promise<Knjiga[]> = async (
    stranica = 0,
    sortirajPo = "cena",
    smerSortiranja = "asc"
  ) => {
    const { data } = await axios.get<Knjiga[]>(`/knjiga`, {
      params: {
        stranica: stranica + "",
        sortirajPo,
        smerSortiranja,
        limit: "5",
      },
    });

    return data;
  };

  const dajKnjigePoKategoriji: (
    stranica: number,
    idKategorije: number,
    sortirajPo: "naslov" | "cena",
    smerSortiranja: "asc" | "desc"
  ) => Promise<{ brojKnjiga: number; knjige: Knjiga[] }> = async (
    idKategorije,
    stranica = 0,
    sortirajPo = "cena",
    smerSortiranja = "asc"
  ) => {
    const { data } = await axios.get(`/kategorija/${idKategorije}/knjiga`, {
      params: {
        stranica: stranica + "",
        limit: "5",
        sortirajPo,
        smerSortiranja,
      },
    });

    return data;
  };

  return { kreirajKnjigu, azurirajKnjigu, dajKnjige, dajKnjigePoKategoriji };
};
