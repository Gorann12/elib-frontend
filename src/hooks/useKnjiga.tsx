import { useContext } from "react";
import { KorisnikContext } from "../context/KorisnikContext";

export const useKnjiga = () => {
  const { dajToken } = useContext(KorisnikContext);
};
