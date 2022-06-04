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
    <Box display={{ md: "none" }}>
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
  const { korisnik } = useContext(KorisnikContext);

  return (
    <HStack spacing={"1rem"} display={{ base: "none", md: "block" }}>
      <Button colorScheme={"linkedin"} variant={"link"} as={Link} to="/profil">
        {korisnik && korisnik.ime}
      </Button>
      <Button
        colorScheme={"linkedin"}
        variant={"link"}
        as={Link}
        to="/istorija-kupovine"
      >
        Istorija kupovine
      </Button>
      <IconButton icon={<FaCartPlus />} aria-label="Korpa" />
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
