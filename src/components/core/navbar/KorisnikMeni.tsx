import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaCartPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { KorisnikContext } from "../../../context/KorisnikContext";

const KorisnikMobilniMeni = () => {
  const { korisnik, odjaviKorisnika } = useContext(KorisnikContext);

  return (
    <Box display={{ lg: "none" }}>
      <Menu closeOnBlur={true} closeOnSelect={true}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              aria-label="Opcije"
              rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
              variant={"outline"}
            >
              {korisnik && korisnik.ime}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to={"/profil"}>
                Moj profil
              </MenuItem>
              <MenuItem as={Link} to={"/knjige"}>
                Knjige
              </MenuItem>
              <MenuItem as={Link} to={"/kategorija/lista"}>
                Kategorije
              </MenuItem>
              <MenuItem as={Link} to={"/istorija-kupovine"}>
                Istorija kupovine
              </MenuItem>
              <MenuItem>Korpa</MenuItem>
              <MenuItem onClick={odjaviKorisnika}>Odjava</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

const KorisnikDesktopMeni = () => {
  const { odjaviKorisnika } = useContext(KorisnikContext);

  return (
    <HStack spacing={"1rem"} display={{ base: "none", lg: "block" }}>
      <Button colorScheme={"teal"} variant={"link"} as={Link} to="/profil">
        Profil
      </Button>
      <Button colorScheme={"teal"} variant={"link"} as={Link} to="/knjige">
        Knjige
      </Button>
      <Button
        colorScheme={"teal"}
        variant={"link"}
        as={Link}
        to="/istorija-kupovine"
      >
        Istorija kupovine
      </Button>
      <Button
        colorScheme={"teal"}
        variant={"link"}
        as={Link}
        to="/kategorija/lista"
      >
        Kategorije
      </Button>
      <Button colorScheme={"teal"} variant={"link"} onClick={odjaviKorisnika}>
        Odjavi se
      </Button>
      <IconButton
        colorScheme={"teal"}
        icon={<FaCartPlus />}
        aria-label="Korpa"
        variant={"outline"}
      />
    </HStack>
  );
};

export const KorisnikMeni = () => {
  return (
    <>
      <KorisnikMobilniMeni />
      <KorisnikDesktopMeni />
    </>
  );
};
