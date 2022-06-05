import axios from "axios";
import { useContext } from "react";
import { KorisnikContext } from "../context/KorisnikContext";
import { Autor, KreirajAutora } from "../tipovi";

export const useAutor = () => {
  const { dajToken } = useContext(KorisnikContext);

  const kreirajAutora: (podaci: KreirajAutora) => Promise<Autor> = async (
    podaci
  ) => {
    const { data } = await axios.post<Autor>("/autor", podaci, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  const dajSveAutore: () => Promise<{ data: Autor[] }> = () => {
    return axios.get<Autor[]>("/autor");
  };

  const dajAutora: (id: number) => Promise<Autor> = async (id) => {
    const { data } = await axios.get<Autor>(`/autor/${id}`);

    return data;
  };

  const izmeniAutora: (
    id: number,
    podaci: Partial<Autor>
  ) => Promise<Autor> = async (id, podaci) => {
    const { data } = await axios.patch(`/autor/${id}`, podaci, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  const izbrisiAutora: (id: number) => Promise<Autor> = async (id) => {
    const { data } = await axios.delete(`/autor/${id}`, {
      headers: {
        Authorization: `Bearer ${dajToken()}`,
      },
    });

    return data;
  };

  return {
    kreirajAutora,
    dajSveAutore,
    dajAutora,
    izmeniAutora,
    izbrisiAutora,
  };
};
