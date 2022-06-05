import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { KorisnikContext } from "../../../../context/KorisnikContext";
import { useKorisnik } from "../../../../hooks/useKorisnik";
import { lowerCamelCaseToDisplay } from "../../../../shared/regex/regex";
import { Wrapper } from "../../../utils/ui";
import { MdVerifiedUser } from "react-icons/md";
import { Korisnik, UlogaKorisnika } from "../../../../tipovi";

export const Profil = () => {
  const { korisnik } = useContext(KorisnikContext);
  const { id, uloga, kreiranDatuma, azuriranDatuma, ...podaci } =
    korisnik || {};
  const [editovanKorisnik, postaviEditovanogKorisnika] = useState<Korisnik>(
    korisnik || ({} as Korisnik)
  );

  const { izmeniKorisnika } = useKorisnik();
  const toast = useToast();

  const handleChange = async (key: keyof typeof korisnik, vrednost: string) => {
    if (editovanKorisnik) {
      postaviEditovanogKorisnika((proslaVrednost) => ({
        ...proslaVrednost,
        [key]: vrednost,
      }));
    }
  };

  const handleSubmit = async (key: keyof typeof korisnik, vrednost: string) => {
    try {
      if (
        korisnik &&
        typeof korisnik[key] === "number" &&
        Number.isNaN(parseInt(vrednost))
      ) {
        throw new Error(`${key} Mora biti broj`);
      }

      const izmenjeniKorisnik =
        korisnik && typeof korisnik[key] === "number"
          ? { ...korisnik, [key]: parseInt(vrednost) }
          : { ...korisnik, [key]: vrednost };

      await izmeniKorisnika(izmenjeniKorisnik);
    } catch (e: any) {
      const errorPoruka = e?.response?.data?.message || e.message;

      // {} as Korisnik samo zbog typescripta, ali zna se da korisnik mora da postoji
      // (ne moze biti null u ovoj komponenti) jer postoji guard za ovu rutu
      postaviEditovanogKorisnika(korisnik || ({} as Korisnik));
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
      <Tag
        size={"md"}
        variant={"solid"}
        colorScheme={uloga && uloga === UlogaKorisnika.ADMIN ? "red" : "teal"}
        mt={10}
        mb={2}
      >
        <TagLeftIcon as={MdVerifiedUser} />
        <TagLabel>{uloga?.toLowerCase()}</TagLabel>
      </Tag>
      <Heading fontSize={"2xl"} color={"gray.700"}>
        Profil {`${korisnik?.ime} ${korisnik?.prezime}`} korisnika
      </Heading>
      <Text mb={4} color={"gray.600"}>
        Kreiran: {new Date(kreiranDatuma || "").toDateString()}
      </Text>
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
                    onChange={(promenjenaVrednost: string) =>
                      handleChange(
                        key as keyof typeof podaci,
                        promenjenaVrednost
                      )
                    }
                    value={
                      editovanKorisnik[key as keyof typeof podaci] + "" || ""
                    }
                    isDisabled={["email"].includes(key)}
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
