import axios from 'axios';
import { useContext } from 'react';
import { KorisnikContext } from '../context/KorisnikContext';
import { Transakcija } from '../tipovi';

export const useTransakcija = () => {
  const { dajToken } = useContext(KorisnikContext);

  const naruciKnjige: (
    narudzbina: { id: number; kolicina: number }[]
  ) => Promise<{
    id: number;
    idKorisnika: number;
    datumKreiranja: string;
  }> = async (narudzbina) => {
    const token = dajToken();
    const { data } = await axios.post(
      '/transakcija',
      { narudzbine: narudzbina },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  const dajTransakcijeZaKorisnika: () => Promise<Transakcija[]> = async () => {
    const token = dajToken();

    const { data } = await axios.get<{ transakcije: Transakcija[] }>(
      '/korisnik/transakcija',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.transakcije;
  };

  return { naruciKnjige, dajTransakcijeZaKorisnika };
};
