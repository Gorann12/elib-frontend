import axios from "axios";
import { useContext } from "react";
import { KorisnikContext } from "../context/KorisnikContext";
import { Kategorija, KreirajKategoriju } from "../tipovi";

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

  const dajSveKategorije: () => Promise<Kategorija[]> = async () => {
    const { data } = await axios.get<Kategorija[]>("/kategorija");

    return data;
  };

  const dajKategoriju: (id: number) => Promise<Kategorija> = async (id) => {
    const { data } = await axios.get<Kategorija>(`/kategorija/${id}`);

    return data;
  };

  const izmeniKategoriju: (
    id: number,
    podaci: Partial<Kategorija>
  ) => Promise<Kategorija> = async (id, podaci) => {
    const { data } = await axios.patch<Kategorija>(
      `/kategorija/${id}`,
      podaci,
      {
        headers: {
          Authorization: `Bearer ${dajToken()}`,
        },
      }
    );

    return data;
  };

  const izbrisiKategoriju: (id: number) => Promise<Kategorija> = async (id) => {
    const { data } = await axios.delete<Kategorija>(`/kategorija/${id}`, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  return {
    kreiraj,
    dajSveKategorije,
    dajKategoriju,
    izmeniKategoriju,
    izbrisiKategoriju,
  };
};
