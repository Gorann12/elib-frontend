import { Navbar } from "./components/core/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import { Prijava, Registracija } from "./components/core/autentifikacija";
import { useContext } from "react";
import { KorisnikContext } from "./context/KorisnikContext";
import { Spinner } from "@chakra-ui/react";
import { Profil } from "./components/core/stranice/korisnik/profil";
import {
  UlogovanKorisnikGuard,
  GostGuard,
  UlogaGuard,
} from "./components/utils/GuardedRoute";
import { UlogaKorisnika } from "./tipovi";
import { KategorijaForma } from "./components/core/stranice/kategorija/KategorijaForma";
import { KategorijaLista } from "./components/core/stranice/kategorija/KategorijaLista";
import { KategorijaDetaljnije } from "./components/core/stranice/kategorija/KategorijaDetaljnije";
import { AutorForma } from "./components/core/stranice/autor/AutorForma";
import { AutorLista } from "./components/core/stranice/autor/AutorLista";
import { AutorDetaljnije } from "./components/core/stranice/autor/AutorDetaljnije";
import { KnjigeForma } from "./components/core/stranice/knjige/KnjigeForma";
import { KnjigeLista } from "./components/core/stranice/knjige/KnjigeLista";
import { KnjigaDetaljnije } from "./components/core/stranice/knjige/KnjigaDetaljnije";

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
              path="/prijava"
              element={
                <GostGuard>
                  <Prijava />
                </GostGuard>
              }
            />
            <Route
              path="/registracija"
              element={
                <GostGuard>
                  <Registracija />
                </GostGuard>
              }
            />
            <Route
              path="/profil"
              element={
                <UlogovanKorisnikGuard>
                  <Profil />
                </UlogovanKorisnikGuard>
              }
            />

            <Route
              path="/kategorija/novo"
              element={
                <UlogaGuard uloga={UlogaKorisnika.ADMIN}>
                  <KategorijaForma />
                </UlogaGuard>
              }
            />
            <Route path="/kategorija/lista" element={<KategorijaLista />} />
            <Route path="/kategorija/:id" element={<KategorijaDetaljnije />} />

            <Route
              path="/autor/novo"
              element={
                <UlogaGuard uloga={UlogaKorisnika.ADMIN}>
                  <AutorForma />
                </UlogaGuard>
              }
            />
            <Route path="/autor/lista" element={<AutorLista />} />
            <Route path="/autor/:id" element={<AutorDetaljnije />} />

            <Route
              path="/knjiga/novo"
              element={
                <UlogaGuard uloga={UlogaKorisnika.ADMIN}>
                  <KnjigeForma />
                </UlogaGuard>
              }
            />

            <Route path="/knjiga/lista" element={<KnjigeLista />} />
            <Route path="/knjiga/:id" element={<KnjigaDetaljnije />} />
          </Routes>
        </Router>
      )}
    </>
  );
};
