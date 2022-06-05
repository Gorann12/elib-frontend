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
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { FaBook, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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

type ReducerActions =
  | { type: "inkrementuj" | "dekrementuj" }
  | { type: "sortirajPo"; payload: SortiranjePo }
  | { type: "poredakSortiranja"; payload: PoredakSortiranja }
  | { type: "kategorija"; payload: number | null };

const initialState: ReducerState = {
  stranica: parseInt(localStorage.getItem("stranica") || "0"),
  sortirajPo: (localStorage.getItem("sortirajPo") as SortiranjePo) || "cena",
  poredakSortiranja:
    (localStorage.getItem("poredakSortiranja") as PoredakSortiranja) || "asc",
  kategorijaId: parseInt(localStorage.getItem("kategorijaId") || "") || null,
};

const reducer = (state: ReducerState, action: ReducerActions) => {
  switch (action.type) {
    case "inkrementuj":
      return { ...state, stranica: state.stranica + 1 };
    case "dekrementuj":
      return { ...state, stranica: state.stranica - 1 };
    case "sortirajPo":
      return { ...state, sortirajPo: action.payload };
    case "poredakSortiranja":
      return { ...state, poredakSortiranja: action.payload };
    case "kategorija":
      return { ...state, kategorijaId: action.payload };
  }
};

const ucitavanje_queue: number[] = [];

export const KnjigeLista = () => {
  const [kategorije, postaviKategorije] = useState<Kategorija[]>([]);
  const [knjige, postaviKnjige] = useState<Knjiga[]>([]);
  const [ucitavanje, postaviUcitavanje] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { dajSveKategorije } = useKategorija();
  const { dajKnjige, dajKnjigePoKategoriji } = useKnjiga();

  const navigate = useNavigate();
  const toast = useToast();

  // useEffect(() => {
  // dajSveKategorije()
  //   .then((res) => {
  //     const preuzeteKategorije = res;

  //     postaviKategorije(preuzeteKategorije);
  //   })
  //   .catch((e) => navigate("/"))
  //   .finally(() => postaviUcitavanje(false));
  // }, []);

  const postaviLocalStorage = () => {
    const { stranica, sortirajPo, poredakSortiranja, kategorijaId } = state;

    localStorage.setItem("stranica", stranica + "");
    localStorage.setItem("sortirajPo", sortirajPo);
    localStorage.setItem("poredakSortiranja", poredakSortiranja);
    localStorage.setItem("kategorijaId", kategorijaId + "");
  };

  useEffect(() => {
    postaviUcitavanje(true);
    ucitavanje_queue.push(1);

    const { stranica, sortirajPo, poredakSortiranja, kategorijaId } = state;
    postaviLocalStorage();
    if (!kategorije.length) {
      ucitavanje_queue.push(2);
      dajSveKategorije()
        .then((res) => {
          const preuzeteKategorije = res;

          postaviKategorije(preuzeteKategorije);
        })
        .catch((e) => navigate("/"))
        .finally(() => {
          ucitavanje_queue.pop();

          if (!ucitavanje_queue.length) postaviUcitavanje(false);
        });
    }

    if (!kategorijaId) {
      dajKnjige(stranica, sortirajPo, poredakSortiranja)
        .then((preuzeteKnjige) => postaviKnjige(preuzeteKnjige))
        .catch(odgovorNaError)
        .finally(() => {
          ucitavanje_queue.pop();

          if (!ucitavanje_queue.length) postaviUcitavanje(false);
        });
    } else {
      dajKnjigePoKategoriji(
        kategorijaId,
        stranica,
        sortirajPo,
        poredakSortiranja
      )
        .then((preuzeteKnjige) => postaviKnjige(preuzeteKnjige.knjige))
        .catch(odgovorNaError)
        .finally(() => {
          ucitavanje_queue.pop();

          if (!ucitavanje_queue.length) postaviUcitavanje(false);
        });
    }
  }, [
    state.stranica,
    state.sortirajPo,
    state.poredakSortiranja,
    state.kategorijaId,
  ]);

  const odgovorNaError = (e: any) => {
    toast({
      title: "Eror",
      description: e.message || "Nesto je poslo po zlu",
      duration: 5000,
      isClosable: true,
      status: "error",
    });
    postaviKnjige([]);
  };

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
                  dispatch({
                    type: "kategorija",
                    payload: Number.isNaN(parseInt(e.target.value))
                      ? null
                      : parseInt(e.target.value),
                  })
                }
                value={state.kategorijaId || ""}
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
                  dispatch({
                    type: "sortirajPo",
                    payload: e.target.value as SortiranjePo,
                  })
                }
                value={state.sortirajPo}
              >
                <option value="cena">Ceni</option>
                <option value="naslov">Naslovu</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="poredak">Poredak sortiranja</FormLabel>
              <Select
                id="poredak"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  dispatch({
                    type: "poredakSortiranja",
                    payload: e.target.value as PoredakSortiranja,
                  })
                }
                value={state.poredakSortiranja}
              >
                <option value="asc">Rastuce</option>
                <option value="desc">Opadajuce</option>
              </Select>
            </FormControl>
          </HStack>
          <TableContainer>
            <Table variant="simple" mt={10}>
              <TableCaption>Stranica: {state.stranica}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Naslov</Th>
                  <Th>Kategorije</Th>
                  <Th isNumeric>Cena</Th>
                  <Th>Broj Strana</Th>
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
                        as={Link}
                        to={`/knjiga/${knjiga.id}`}
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
                    <Td>{knjiga.brojStrana}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <HStack justify={"right"} mt={7}>
            <IconButton
              aria-label="Prethodna stranica"
              icon={<FaChevronLeft />}
              isDisabled={state.stranica === 0}
              onClick={() => dispatch({ type: "dekrementuj" })}
            />
            <IconButton
              aria-label="Sledeca stranica"
              icon={<FaChevronRight />}
              isDisabled={knjige.length < 5}
              onClick={() => dispatch({ type: "inkrementuj" })}
            />
          </HStack>
        </>
      ) : (
        <Spinner position="absolute" top="50vh" left="50vh" />
      )}
    </Wrapper>
  );
};
