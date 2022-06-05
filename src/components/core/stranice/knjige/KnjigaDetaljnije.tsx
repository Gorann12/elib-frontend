import {
  Button,
  Heading,
  HStack,
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { KorisnikContext } from "../../../../context/KorisnikContext";
import { useKnjiga } from "../../../../hooks/useKnjiga";
import { lowerCamelCaseToDisplay } from "../../../../shared/regex/regex";
import { Knjiga, UlogaKorisnika } from "../../../../tipovi";
import { Dijalog } from "../../../utils/ui/Dijalog";
import { Wrapper } from "../../../utils/ui/Wrapper";

const colors = ["orange", "teal", "messenger"];

export const KnjigaDetaljnije = () => {
  const [ucitavanje, postaviUcitavanje] = useState(true);
  const [knjiga, postaviKnjigu] = useState<Knjiga>();
  const { dajKnjigu, izbrisiKnjigu } = useKnjiga();
  const { daLiKorisnikImaUlogu } = useContext(KorisnikContext);
  const { id: idKnjige, autor, kategorije, autorId, ...podaci } = knjiga || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dajKnjigu(parseInt(id))
        .then((preuzetaKnjiga) => postaviKnjigu(preuzetaKnjiga))
        .catch((e) =>
          toast({
            title: "Eror",
            description: e.message || "",
            isClosable: true,
            duration: 5000,
            status: "error",
          })
        )
        .finally(() => postaviUcitavanje(false));
    }
  }, []);

  const izbrisi = () => {
    if (id) {
      onClose();
      postaviUcitavanje(true);

      izbrisiKnjigu(parseInt(id))
        .then(() => navigate("/knjiga/lista"))
        .catch((e: any) => {
          const errorPoruka = e.response.data.message;

          console.log(e);
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

  return (
    <Wrapper>
      {!ucitavanje ? (
        <>
          <HStack align="center" mt={"3rem"}>
            {knjiga?.kategorije.map((kategorija, index) => (
              <Tag
                size={"sm"}
                variant={"solid"}
                colorScheme={colors[index % colors.length]}
                key={kategorija.id}
              >
                <TagLeftIcon as={FaArchive} />
                <TagLabel>{kategorija.naziv}</TagLabel>
              </Tag>
            ))}
          </HStack>
          <Heading fontSize={"2xl"} mt={"1rem"} color={"gray.700"}>
            {knjiga?.naslov}
          </Heading>
          <Text fontSize={"md"} mb={"2rem"} color={"gray.700"}>
            {autor?.ime}
          </Text>
          <VStack bgColor={"blue.50"} p={3} align={"left"} spacing={6}>
            {Object.keys(podaci).map((key) => (
              <VStack key={key} justify="left" align="left">
                <Text fontWeight="700" fontSize={"md"}>
                  {lowerCamelCaseToDisplay(key)}
                </Text>
                <Text fontWeight="500" fontSize={"sm"}>
                  {podaci[key as keyof typeof podaci]}
                </Text>
              </VStack>
            ))}
            {daLiKorisnikImaUlogu(UlogaKorisnika.KORISNIK) && (
              <Button colorScheme={"messenger"}>Dodaj u korpu</Button>
            )}
            {daLiKorisnikImaUlogu(UlogaKorisnika.ADMIN) && (
              <HStack>
                <Button size={"sm"} colorScheme={"red"} onClick={onOpen}>
                  Izbrisi knjigu
                </Button>
                <Button size={"sm"} colorScheme={"telegram"}>
                  Edituj knjigu
                </Button>
              </HStack>
            )}
            <Dijalog
              isOpen={isOpen}
              onClose={onClose}
              onConfirmation={izbrisi}
            />
          </VStack>
        </>
      ) : (
        <Spinner position={"absolute"} top={"50vh"} left={"50vw"} />
      )}
    </Wrapper>
  );
};
