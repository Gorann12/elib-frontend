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
import { lowerCamelCaseToDisplay } from "../../../../shared/regex/regex";
import { Autor, UlogaKorisnika } from "../../../../tipovi";
import { Wrapper } from "../../../utils/ui";
import { FaTrash } from "react-icons/fa";
import { Dijalog } from "../../../utils/ui/Dijalog";
import { useAutor } from "../../../../hooks/useAutor";

export const AutorDetaljnije = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dajAutora, izmeniAutora, izbrisiAutora } = useAutor();
  const { daLiKorisnikImaUlogu, daLiJeGost } = useContext(KorisnikContext);
  const toast = useToast();
  const [ucitavanje, postaviUcitavanje] = useState(state == null);
  const [autor, postaviAutora] = useState<Autor | null>(state as Autor);
  const [editovanAutor, postaviEditovanogAutora] = useState<Autor>(
    state as Autor
  );
  const { id: idAutora, ...podaci } = autor || {};

  useEffect(() => {
    if (state == null) {
      dajAutora(parseInt(id || "-1"))
        .then((preuzetAutor) => {
          postaviEditovanogAutora(preuzetAutor);
          postaviAutora(preuzetAutor);
        })
        .catch(() => navigate("/autor/lista"))
        .finally(() => postaviUcitavanje(false));
    }
  }, []);

  const izbrisi = () => {
    if (id) {
      onClose();
      postaviUcitavanje(true);

      izbrisiAutora(parseInt(id))
        .then(() => navigate("/autor/lista"))
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
    if (editovanAutor) {
      postaviEditovanogAutora((proslaVrednost) => ({
        ...proslaVrednost,
        [key]: vrednost,
      }));
    }
  };

  const handleSubmit = async (key: keyof typeof podaci, vrednost: string) => {
    try {
      if (id) {
        if (
          autor &&
          typeof autor[key] === "number" &&
          Number.isNaN(parseInt(vrednost))
        ) {
          throw new Error(`${key} Mora biti broj`);
        }

        const izmenjeniAutor =
          autor && typeof autor[key] === "number"
            ? { ...autor, [key]: parseInt(vrednost) }
            : { ...autor, [key]: vrednost };

        const novAutor = await izmeniAutora(parseInt(id), izmenjeniAutor);
        postaviAutora(novAutor);
      }
    } catch (e: any) {
      const errorPoruka = e?.response?.data?.message || e.message || "";

      postaviEditovanogAutora(autor || ({} as Autor));
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
              {autor?.ime}
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
                          editovanAutor[key as keyof typeof editovanAutor] +
                            "" || ""
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
