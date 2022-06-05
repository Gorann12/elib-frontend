import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FaBook, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useKategorija } from "../../../../hooks/useKategorija";
import { useKnjiga } from "../../../../hooks/useKnjiga";
import {
  Kategorija,
  Knjiga,
  PoredakSortiranja,
  SortiranjePo,
} from "../../../../tipovi";
import { Wrapper } from "../../../utils/ui";

interface ReducerState {
  stranica: number;
  sortirajPo: SortiranjePo;
  poredakSortiranja: PoredakSortiranja;
  kategorijaId: number | null;
}

type ReducerActions = "inkrementuj" | "dekrementuj";

const initialState: ReducerState = {
  stranica: 0,
  sortirajPo: "cena",
  poredakSortiranja: "asc",
  kategorijaId: null,
};

const reducer = (state: ReducerState, action: ReducerActions) => {};

export const KnjigeLista = () => {
  const [kategorije, postaviKategorije] = useState<Kategorija[]>([]);
  const [knjige, postaviKnjige] = useState<Knjiga[]>([]);
  const [ucitavanje, postaviUcitavanje] = useState(true);

  const { dajSveKategorije } = useKategorija();
  const { dajKnjige, dajKnjigePoKategoriji } = useKnjiga();

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all<Kategorija[] | Knjiga[]>([dajSveKategorije(), dajKnjige()])
      .then((res) => {
        const [preuzeteKategorije, preuzeteKnjige] = res;

        postaviKategorije(preuzeteKategorije as Kategorija[]);
        postaviKnjige(preuzeteKnjige as Knjiga[]);
      })
      .catch((e) => navigate("/"))
      .finally(() => postaviUcitavanje(false));
  }, []);

  const promeniPoredakSortiranja = (vrednost: PoredakSortiranja) => {
    postaviUcitavanje(true);
  };

  const promeniSortiranjePo = (vrednost: SortiranjePo) => {};

  const promeniKategoriju = (vrednost: number) => {};

  const promeniStranicu = (dodaj: number) => {};

  return (
    <Wrapper>
      {!ucitavanje ? (
        <>
          <HStack
            mt={10}
            spacing={{ base: 0, lg: 10 }}
            wrap={{ base: "wrap", lg: "nowrap" }}
          >
            <FormControl>
              <FormLabel htmlFor="kategorije">
                Filtrirajte po kategoriji
              </FormLabel>
              <Select
                id="kategorije"
                placeholder="Izaberite kategoriju"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  promeniKategoriju(parseInt(e.target.value))
                }
              >
                {kategorije.map((kategorija) => (
                  <option key={kategorija.id} value={kategorija.id}>
                    {kategorija.naziv}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="sortirajPo">Sortirajte po</FormLabel>
              <Select
                id="sortirajPo"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  promeniSortiranjePo(e.target.value as SortiranjePo)
                }
              >
                <option value="cena" defaultChecked={true}>
                  Ceni
                </option>
                <option value="naslov">Naslovu</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="poredak">Poredak sortiranja</FormLabel>
              <Select
                id="poredak"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  promeniPoredakSortiranja(e.target.value as PoredakSortiranja)
                }
              >
                <option value="asc" defaultChecked={true}>
                  Rastuce
                </option>
                <option value="desc">Opadajuce</option>
              </Select>
            </FormControl>
          </HStack>
          <TableContainer>
            <Table variant="simple" mt={10}>
              {/* <TableCaption>Stranica: {stranica}</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Naslov</Th>
                  <Th>Kategorije</Th>
                  <Th isNumeric>Cena</Th>
                  <Th isNumeric>Broj Strana</Th>
                </Tr>
              </Thead>
              <Tbody>
                {knjige.map((knjiga) => (
                  <Tr key={knjiga.id}>
                    <Td>
                      <Button
                        leftIcon={<FaBook />}
                        variant="link"
                        colorScheme={"facebook"}
                      >
                        {knjiga.naslov}
                      </Button>
                    </Td>
                    <Td>
                      {knjiga.kategorije
                        .map((kategorija) => kategorija.naziv)
                        .join(", ")}
                    </Td>
                    <Td isNumeric fontWeight={"bold"}>
                      {knjiga.cena} RSD
                    </Td>
                    <Td isNumeric>{knjiga.brojStrana}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <HStack justify={"right"} mt={7}>
            <IconButton
              aria-label="Prethodna stranica"
              icon={<FaChevronLeft />}
              // isDisabled={stranica === 0}
              onClick={() => promeniStranicu(-1)}
            />
            <IconButton
              aria-label="Sledeca stranica"
              icon={<FaChevronRight />}
              isDisabled={knjige.length < 5}
              onClick={() => promeniStranicu(1)}
            />
          </HStack>
        </>
      ) : (
        <Spinner position="absolute" top="50vh" left="50vh" />
      )}
    </Wrapper>
  );
};
