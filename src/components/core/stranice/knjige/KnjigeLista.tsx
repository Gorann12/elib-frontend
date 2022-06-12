import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
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
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  Reducer,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  FaBook,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useKategorija } from "../../../../hooks/useKategorija";
import { useKnjiga } from "../../../../hooks/useKnjiga";
import { useQuery } from "../../../../hooks/useQuery";
import {
  Kategorija,
  Knjiga,
  PoredakSortiranja,
  SortiranjePo,
  validirajPoredakSortiranja,
  validirajSortiranjePo,
} from "../../../../tipovi";
import { Wrapper } from "../../../utils/ui";

interface ReducerState {
  sortirajPo: SortiranjePo;
  poredakSortiranja: PoredakSortiranja;
  kategorijaId: number | null;
}

type ReducerActions =
  | { type: "sortirajPo"; payload: SortiranjePo }
  | { type: "poredakSortiranja"; payload: PoredakSortiranja }
  | { type: "kategorija"; payload: number | null };

const initialState: ReducerState = {
  sortirajPo: "cena",
  poredakSortiranja: "asc",
  kategorijaId: -1,
};

const reducer = (state: ReducerState, action: ReducerActions) => {
  switch (action.type) {
    case "sortirajPo":
      return { ...state, sortirajPo: action.payload };
    case "poredakSortiranja":
      return { ...state, poredakSortiranja: action.payload };
    case "kategorija":
      return { ...state, kategorijaId: action.payload, stranica: 0 };
  }
};

export const KnjigeLista = () => {
  const [kategorije, postaviKategorije] = useState<Kategorija[]>([]);
  const [knjige, postaviKnjige] = useState<Knjiga[]>([]);
  const [ucitavanje, postaviUcitavanje] = useState(true);
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer<Reducer<ReducerState, ReducerActions>>(
    reducer,
    initialState
  );
  const { dajSveKategorije } = useKategorija();
  const { dajKnjige } = useKnjiga();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const btnRef = useRef(null);
  const toast = useToast();
  const query = useQuery();

  useEffect(() => {
    postaviUcitavanje(true);

    const { sortirajPo, poredakSortiranja, kategorijaId } = state;
    const filter = {
      stranica: parseInt(query.get("stranica") || "0"),
      sortirajPo: validirajSortiranjePo(query.get("sortirajPo")) || sortirajPo,
      poredakSortiranja:
        validirajPoredakSortiranja(query.get("po;redakSortiranja")) ||
        poredakSortiranja,
      idKategorije: parseInt(query.get("idKategorije") || kategorijaId + ""),
    };

    Promise.all<Knjiga[] | Kategorija[]>([
      dajKnjige(filter),
      dajSveKategorije(),
    ]).then((rezultat) => {
      console.log("REZULTAT", rezultat);
      postaviUcitavanje(false);
    });
  }, []);

  const odgovorNaError = (e: any) => {
    toast({
      title: "Eror",
      description: e.message || "Nesto je poslo po zlu",
      duration: 5000,
      isClosable: true,
      status: "error",
    });
    // postaviKnjige([]);
  };

  return (
    <Wrapper>
      {!ucitavanje ? (
        <>
          <HStack
            alignContent={"center"}
            justify={"space-between"}
            mb={2}
            mt={10}
          >
            <Heading color={"gray.600"} fontSize={"xl"}>
              Knjige
            </Heading>
            <IconButton
              aria-label="Filtriraj"
              icon={<FaFilter />}
              colorScheme={"facebook"}
              variant={"outline"}
              ref={btnRef}
              onClick={onOpen}
            />
            <Drawer
              isOpen={isOpen}
              placement={"right"}
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filtriraj knjige</DrawerHeader>
                <DrawerBody>
                  <FormControl>
                    <FormLabel
                      htmlFor="kategorije"
                      fontSize={12}
                      fontWeight={"bold"}
                    >
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
                    <FormLabel
                      htmlFor="sortirajPo"
                      fontSize={12}
                      fontWeight={"bold"}
                      mt={4}
                    >
                      Sortirajte po
                    </FormLabel>
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
                    <FormLabel
                      htmlFor="poredak"
                      fontSize={12}
                      fontWeight={"bold"}
                      mt={4}
                    >
                      Poredak sortiranja
                    </FormLabel>
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
                </DrawerBody>
                <DrawerFooter>
                  <Button
                    variant="outline"
                    colorScheme={"facebook"}
                    mr={3}
                    onClick={onClose}
                  >
                    Odustani
                  </Button>
                  <Button colorScheme={"facebook"}>Filtriraj</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </HStack>
          <TableContainer>
            <Table variant="simple" mt={10}>
              <TableCaption>
                Stranica: {query.get("stranica") || 0}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Naslov</Th>
                  <Th>Kategorije</Th>
                  <Th isNumeric>Cena</Th>
                  <Th>Pisac</Th>
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
                    <Td>{knjiga.autor.ime}</Td>
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
              isDisabled={parseInt(query.get("stranica") || "0") === 0}
              onClick={() => console.log("STRANICA DOLE")}
            />
            <IconButton
              aria-label="Sledeca stranica"
              icon={<FaChevronRight />}
              isDisabled={knjige.length < 5}
              onClick={() => console.log("STRANICA GORE")}
            />
          </HStack>
        </>
      ) : (
        <Spinner position="absolute" top="50vh" left="50vw" />
      )}
    </Wrapper>
  );
};
