import {
  Button,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAutor } from "../../../../hooks/useAutor";
import { Autor } from "../../../../tipovi";
import { Wrapper } from "../../../utils/ui";

export const AutorLista = () => {
  const { dajSveAutore } = useAutor();
  const toast = useToast();
  const [autori, postaviAutore] = useState<Autor[]>([]);
  const [ucitavanje, postaviUcitavanje] = useState(true);

  useEffect(() => {
    dajSveAutore()
      .then((res) => {
        const { data } = res;

        postaviAutore(data);
      })
      .catch((e: any) => {
        const errorPoruka = e.response.data.message;

        toast({
          title: "Eror",
          description: errorPoruka,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => postaviUcitavanje(false));
  }, []);

  return (
    <Wrapper pt={"2rem"}>
      <Heading color={"gray.600"} fontSize={"xl"} mb={5}>
        Autori
      </Heading>
      {!ucitavanje ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Ime</Th>
                <Th>Biografija</Th>
                <Th>Mesto Rodjenja</Th>
                <Th>Godina Rodjenja</Th>
              </Tr>
            </Thead>
            <Tbody>
              {autori.length === 0 && <Tr>Trenutno nema autora</Tr>}
              {autori.map((autor) => (
                <Tr key={autor.id}>
                  <Td>
                    <Button
                      variant={"link"}
                      as={Link}
                      to={`/autor/${autor.id}`}
                      colorScheme={"teal"}
                      state={autor}
                    >
                      {autor.ime}
                    </Button>
                  </Td>
                  <Td>
                    {autor.biografija.substring(0, 50)}
                    {autor.biografija.length > 50 && "..."}
                  </Td>
                  <Td>{autor.mestoRodjenja}</Td>
                  <Td>{autor.godinaRodjenja}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Spinner position="absolute" top={"50vh"} left={"50vw"} />
      )}
    </Wrapper>
  );
};
