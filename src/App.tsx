import { Navbar } from "./components/core/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import { Prijava, Registracija } from "./components/core/autentifikacija";
import { useContext } from "react";
import { KorisnikContext } from "./context/KorisnikContext";
import { Spinner } from "@chakra-ui/react";
import { Profil } from "./components/core/stranice/profil";
import {
  UlogovanKorisnikGuard,
  GostGuard,
} from "./components/utils/GuardedRoute";
import { UlogaKorisnika } from "./tipovi";

export const App = () => {
  const { inicijalnoUcitavanje } = useContext(KorisnikContext);

  return (
    <>
      {inicijalnoUcitavanje ? (
        <Spinner position="absolute" top="50vh" left="50vw" />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="prijava"
              element={
                <GostGuard>
                  <Prijava />
                </GostGuard>
              }
            />
            <Route
              path="registracija"
              element={
                <GostGuard>
                  <Registracija />
                </GostGuard>
              }
            />
            <Route
              path="profil"
              element={
                <UlogovanKorisnikGuard uloga={UlogaKorisnika.KORISNIK}>
                  <Profil />
                </UlogovanKorisnikGuard>
              }
            />
          </Routes>
        </Router>
      )}
    </>
  );
};
