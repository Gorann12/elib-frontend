import { useContext } from "react";
import { UlogaKorisnika } from "../../tipovi";
import { KorisnikContext } from "../../context/KorisnikContext";
import { Route, Navigate } from "react-router-dom";

interface GuardedRouteProps {
  uloga: UlogaKorisnika;
  children: any;
}

export const UlogovanKorisnikGuard = (props: GuardedRouteProps) => {
  const { uloga, children } = props;
  const { daLiKorisnikImaUlogu } = useContext(KorisnikContext);

  if (!daLiKorisnikImaUlogu(uloga)) {
    return <Navigate to="/prijava" replace={true} />;
  }

  return children;
};

export const GostGuard = (props: { children: any }) => {
  const { daLiJeGost } = useContext(KorisnikContext);

  if (!daLiJeGost()) {
    return <Navigate to="/profil" replace={true} />;
  }

  return props.children;
};
