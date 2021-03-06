import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KorisnikContext } from "../../../../context/KorisnikContext";
import { useKategorija } from "../../../../hooks/useKategorija";
import { lowerCamelCaseToDisplay } from "../../../../shared/regex/regex";
import { UlogaKorisnika } from "../../../../tipovi";
import { Kategorija } from "../../../../tipovi";
import { Wrapper } from "../../../utils/ui";
import { FaTrash } from "react-icons/fa";
import { Dijalog } from "../../../utils/ui/Dijalog";

export const KategorijaDetaljnije = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dajKategoriju, izmeniKategoriju, izbrisiKategoriju } =
    useKategorija();
  const { daLiKorisnikImaUlogu, daLiJeGost } = useContext(KorisnikContext);
  const toast = useToast();
  const [ucitavanje, postaviUcitavanje] = useState(state == null);
  const [kategorija, postaviKategoriju] = useState<Kategorija | null>(
    state as Kategorija
  );
  const [editovanaKategorija, postaviEditovanuKategoriju] =
    useState<Kategorija>(state as Kategorija);
  const { id: idKategorije, ...podaci } = kategorija || {};

  useEffect(() => {
    if (state == null) {
      dajKategoriju(parseInt(id || "-1"))
        .then((preuzetaKategorija) => {
          postaviEditovanuKategoriju(preuzetaKategorija);
          postaviKategoriju(preuzetaKategorija);
        })
        .catch(() => navigate("/kategorija/lista"))
        .finally(() => postaviUcitavanje(false));
    }
  }, []);

  const izbrisi = () => {
    if (id) {
      onClose();
      postaviUcitavanje(true);

      izbrisiKategoriju(parseInt(id))
        .then(() => navigate("/kategorija/lista"))
        .catch((e: any) => {
          const errorPoruka = e.response.data.message;

          postaviUcitavanje(false);
          onClose();
          toast({
            title: "Error",
            description: Array.isArray(errorPoruka)
              ? errorPoruka.join(", ")
              : errorPoruka,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const handleChange = (key: keyof typeof podaci, vrednost: string) => {
    if (editovanaKategorija) {
      postaviEditovanuKategoriju((proslaVrednost) => ({
        ...proslaVrednost,
        [key]: vrednost,
      }));
    }
  };

  const handleSubmit = async (key: keyof typeof podaci, vrednost: string) => {
    try {
      if (id) {
        const novaKategorija = await izmeniKategoriju(parseInt(id), {
          ...kategorija,
          [key]: vrednost,
        });

        postaviKategoriju(novaKategorija);
      }
    } catch (e: any) {
      const errorPoruka = e.response.data.message;

      postaviEditovanuKategoriju(kategorija || ({} as Kategorija));
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
      {!ucitavanje ? (
        <>
          <HStack justify={"space-between"} mt={10} mb={3}>
            <Heading fontSize={"2xl"} color={"gray.700"}>
              {kategorija?.naziv}
            </Heading>
            {daLiKorisnikImaUlogu(UlogaKorisnika.ADMIN) && (
              <Button
                rightIcon={<FaTrash />}
                colorScheme={"red"}
                size={"sm"}
                onClick={onOpen}
              >
                Izbrisi
              </Button>
            )}
          </HStack>
          <VStack bgColor={"blue.50"} p={3} align={"left"} spacing={6}>
            {podaci &&
              Object.keys(podaci).map(
                (key: string) =>
                  podaci.hasOwnProperty(key) && (
                    <Box key={key}>
                      <Text
                        fontSize={"md"}
                        fontWeight={"bold"}
                        color={"gray.700"}
                      >
                        {lowerCamelCaseToDisplay(key)}
                      </Text>
                      <Editable
                        defaultValue={
                          podaci[key as keyof typeof podaci] + "" || ""
                        }
                        value={
                          editovanaKategorija[key as keyof typeof podaci] +
                            "" || ""
                        }
                        onChange={(promenjenaVrednost: string) =>
                          handleChange(
                            key as keyof typeof podaci,
                            promenjenaVrednost
                          )
                        }
                        color={"gray.700"}
                        onSubmit={(vrednost: string) =>
                          handleSubmit(key as keyof typeof podaci, vrednost)
                        }
                        isDisabled={
                          daLiKorisnikImaUlogu(UlogaKorisnika.KORISNIK) ||
                          daLiJeGost()
                        }
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Box>
                  )
              )}
          </VStack>
        </>
      ) : (
        <Spinner position="absolute" top="50vh" left="50vw" />
      )}
      <Dijalog isOpen={isOpen} onClose={onClose} onConfirmation={izbrisi} />
    </Wrapper>
  );
};
