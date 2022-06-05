import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { KorisnikContext } from "../../../context/KorisnikContext";

export const AdminMeni = () => {
  const { odjaviKorisnika } = useContext(KorisnikContext);

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            colorScheme={"teal"}
            rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
          >
            Opcije
          </MenuButton>
          <MenuList>
            <MenuGroup title={"Izlistaj"}>
              <MenuItem as={Link} to={"/knjiga/lista"}>
                knjige
              </MenuItem>
              <MenuItem as={Link} to={"/autor/lista"}>
                autore
              </MenuItem>
              <MenuItem as={Link} to={"/kategorija/lista"}>
                kategorije
              </MenuItem>
            </MenuGroup>
            <MenuGroup title={"Kreiraj"}>
              <MenuItem as={Link} to={"/knjiga/novo"}>
                knjigu
              </MenuItem>
              <MenuItem as={Link} to={"/autor/novo"}>
                autora
              </MenuItem>
              <MenuItem as={Link} to={"/kategorija/novo"}>
                kategoriju
              </MenuItem>
            </MenuGroup>
            <MenuGroup title={"Profil"}>
              <MenuItem as={Link} to={"/profil"}>
                Moj profil
              </MenuItem>
              <MenuItem
                onClick={odjaviKorisnika}
                as={Button}
                variant="link"
                color={"blackalpha"}
              >
                Odjavi se
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
