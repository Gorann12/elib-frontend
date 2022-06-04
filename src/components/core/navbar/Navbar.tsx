import { Box, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import { KorisnikContext } from "../../../context/KorisnikContext";
import { UlogaKorisnika } from "../../../tipovi";
import { Autocomplete } from "../../utils/ui";
import { Wrapper } from "../../utils/ui";
import { AdminMeni } from "./AdminMeni";
import { GostMeni } from "./GostMeni";
import { KorisnikMeni } from "./KorisnikMeni";

export const Navbar = () => {
  const { daLiKorisnikImaUlogu } = useContext(KorisnikContext);

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
        {daLiKorisnikImaUlogu(UlogaKorisnika.ADMIN) ? (
          <AdminMeni />
        ) : daLiKorisnikImaUlogu(UlogaKorisnika.KORISNIK) ? (
          <KorisnikMeni />
        ) : (
          <GostMeni />
        )}
      </Wrapper>
    </Box>
  );
};
