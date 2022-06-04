import { Navbar } from "./components/core/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import { Prijava, Registracija } from "./components/core/autentifikacija";
import { useContext } from "react";
import { KorisnikContext } from "./context/KorisnikContext";
import { Spinner } from "@chakra-ui/react";

export const App = () => {
  const { inicijalnoUcitavanje } = useContext(KorisnikContext);

  return (
    <>
      {inicijalnoUcitavanje ? (
        <Spinner top="50vh" left="50vw" />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="prijava" element={<Prijava />} />
            <Route path="registracija" element={<Registracija />} />
          </Routes>
        </Router>
      )}
    </>
  );
};
