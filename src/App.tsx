import { Spinner } from '@chakra-ui/react';
import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './app.css';
import { Prijava, Registracija } from './components/core/autentifikacija';
import { Navbar } from './components/core/navbar/Navbar';
import { AutorDetaljnije } from './components/core/stranice/autor/AutorDetaljnije';
import { AutorForma } from './components/core/stranice/autor/AutorForma';
import { AutorLista } from './components/core/stranice/autor/AutorLista';
import { KategorijaDetaljnije } from './components/core/stranice/kategorija/KategorijaDetaljnije';
import { KategorijaForma } from './components/core/stranice/kategorija/KategorijaForma';
import { KategorijaLista } from './components/core/stranice/kategorija/KategorijaLista';
import { KnjigaDetaljnije } from './components/core/stranice/knjige/KnjigaDetaljnije';
import { KnjigeForma } from './components/core/stranice/knjige/KnjigeForma';
import { KnjigeLista } from './components/core/stranice/knjige/KnjigeLista';
import { Profil } from './components/core/stranice/korisnik/profil';
import { KorpaProizvodi } from './components/core/stranice/korpa/KorpaProizvodi';
import { IstorijaKupovine } from './components/core/stranice/transakcija/IstorijaKupovine';
import {
  GostGuard,
  UlogaGuard,
  UlogovanKorisnikGuard,
} from './components/utils/GuardedRoute';
import { KorisnikContext } from './context/KorisnikContext';
import { UlogaKorisnika } from './tipovi';

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
            <Route path="/" element={<Navigate to="/knjiga/lista" />} />
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
            <Route
              path="/knjiga/edit/:id"
              element={
                <UlogaGuard uloga={UlogaKorisnika.ADMIN}>
                  <KnjigeForma />
                </UlogaGuard>
              }
            />

            <Route
              path="/korpa"
              element={
                <UlogaGuard uloga={UlogaKorisnika.KORISNIK}>
                  <KorpaProizvodi />
                </UlogaGuard>
              }
            />

            <Route
              path="/istorija"
              element={
                <UlogaGuard uloga={UlogaKorisnika.KORISNIK}>
                  <IstorijaKupovine />
                </UlogaGuard>
              }
            />
          </Routes>
        </Router>
      )}
    </>
  );
};
