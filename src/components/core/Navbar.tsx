import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/all";
import { Link } from "react-router-dom";
import { Autocomplete } from "../utils/ui";
import { Wrapper } from "../utils/ui";

export const Navbar = () => {
  return (
    <Box bgColor={"gray.200"}>
      <Wrapper
        px={4}
        py={2}
        mx={"auto"}
        justify={"space-between"}
        as={HStack}
        spacing={2}
      >
        <Autocomplete />
        <HStack spacing={"1rem"} display={{ base: "none", md: "block" }}>
          <Button
            colorScheme={"linkedin"}
            variant={"link"}
            as={Link}
            to="/prijava"
          >
            Prijava
          </Button>
          <Button
            colorScheme={"linkedin"}
            variant={"link"}
            as={Link}
            to="/registracija"
          >
            Registracija
          </Button>
        </HStack>
        <Box display={{ md: "none" }}>
          <Menu closeOnBlur={true} closeOnSelect={true}>
            <MenuButton
              as={IconButton}
              aria-label="Opcije"
              icon={<GiHamburgerMenu />}
              variant={"outline"}
            />
            <MenuList>
              <MenuItem as={Link} to={"prijava"}>
                Prijava
              </MenuItem>
              <MenuItem as={Link} to={"registracija"}>
                Registracija
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Wrapper>
    </Box>
  );
};
