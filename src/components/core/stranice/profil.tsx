import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { KorisnikContext } from "../../../context/KorisnikContext";
import { useKorisnik } from "../../../hooks/useKorisnik";
import { lowerCamelCaseToDisplay } from "../../../shared/regex/regex";
import { Wrapper } from "../../utils/ui";

export const Profil = () => {
  const { korisnik } = useContext(KorisnikContext);
  const { id, uloga, kreiranDatuma, azuriranDatuma, email, ...podaci } =
    korisnik || {};
  const { izmeniKorisnika } = useKorisnik();
  const toast = useToast();

  const handleSubmit = async (key: keyof typeof korisnik, vrednost: string) => {
    try {
      const izmenjeniKorisnik =
        korisnik && typeof korisnik[key] === "number"
          ? { ...korisnik, [key]: parseInt(vrednost) }
          : { ...korisnik, [key]: vrednost };

      await izmeniKorisnika(izmenjeniKorisnik);
    } catch (e: any) {
      const errorPoruka = e.response.data.message;

      toast({
        title: "Error",
        description: Array.isArray(errorPoruka)
          ? errorPoruka.join(", ")
          : errorPoruka,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Wrapper>
      <Heading fontSize={"2xl"} color={"gray.700"} mt={10}>
        Profil {`${korisnik?.ime} ${korisnik?.prezime}`} korisnika
      </Heading>
      <VStack bgColor={"blue.50"} p={3} align={"left"} spacing={6}>
        {podaci &&
          Object.keys(podaci).map(
            (key: string) =>
              podaci.hasOwnProperty(key) && (
                <Box key={key}>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"gray.700"}>
                    {lowerCamelCaseToDisplay(key)}
                  </Text>
                  <Editable
                    defaultValue={podaci[key as keyof typeof podaci] + "" || ""}
                    color={"gray.700"}
                    onSubmit={(vrednost: string) =>
                      handleSubmit(key as keyof typeof podaci, vrednost)
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Box>
              )
          )}
      </VStack>
    </Wrapper>
  );
};
