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
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const GostMobilniMeni = () => {
  return (
    <Box display={{ md: "none" }}>
      <Menu closeOnBlur={true} closeOnSelect={true}>
        <MenuButton
          as={IconButton}
          aria-label="Opcije"
          icon={<GiHamburgerMenu />}
          variant={"outline"}
        />
        <MenuList>
          <MenuItem as={Link} to={"/prijava"}>
            Prijava
          </MenuItem>
          <MenuItem as={Link} to={"/registracija"}>
            Registracija
          </MenuItem>
          <MenuItem as={Link} to={"/knjiga/lista"}>
            Knjige
          </MenuItem>
          <MenuItem as={Link} to={"/autor/lista"}>
            Autori
          </MenuItem>
          <MenuItem as={Link} to={"/kategorija/lista"}>
            Kategorije
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const GostDesktopMeni = () => {
  return (
    <HStack spacing={"1rem"} display={{ base: "none", md: "block" }}>
      <Button
        colorScheme={"teal"}
        variant={"link"}
        as={Link}
        to="/knjiga/lista"
      >
        Knjige
      </Button>
      <Button colorScheme={"teal"} variant={"link"} as={Link} to="/autor/lista">
        Autori
      </Button>
      <Button
        colorScheme={"teal"}
        variant={"link"}
        as={Link}
        to="/kategorija/lista"
      >
        Kategoije
      </Button>
      <Button colorScheme={"teal"} variant={"link"} as={Link} to="/prijava">
        Prijava
      </Button>
      <Button
        colorScheme={"teal"}
        variant={"link"}
        as={Link}
        to="/registracija"
      >
        Registracija
      </Button>
    </HStack>
  );
};

export const GostMeni = () => {
  return (
    <>
      <GostMobilniMeni></GostMobilniMeni>
      <GostDesktopMeni></GostDesktopMeni>
    </>
  );
};
