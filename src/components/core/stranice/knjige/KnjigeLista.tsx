import {
  FormControl,
  FormLabel,
  HStack,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKategorija } from "../../../../hooks/useKategorija";
import {
  Kategorija,
  PoredakSortiranja,
  SortiranjePo,
} from "../../../../tipovi";
import { Wrapper } from "../../../utils/ui";

export const KnjigeLista = () => {
  const [kategorije, postaviKategorije] = useState<Kategorija[]>([]);
  const [ucitavanje, postaviUcitavanje] = useState(true);

  const { dajSveKategorije } = useKategorija();

  const navigate = useNavigate();

  useEffect(() => {
    dajSveKategorije()
      .then((preuzeteKategorije) => {
        postaviKategorije(preuzeteKategorije);
      })
      .catch((e) => navigate("/"))
      .finally(() => postaviUcitavanje(false));
  }, []);

  const promeniPoredakSortiranja = (vrednost: PoredakSortiranja) => {};

  const promeniSortiranjePo = (vrednost: SortiranjePo) => {};

  const promeniKategoriju = (vrednost: string) => {};

  return (
    <Wrapper>
      {!ucitavanje ? (
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
                promeniKategoriju(e.target.value)
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
      ) : (
        <Spinner position="absolute" top="50vh" left="50vh" />
      )}
    </Wrapper>
  );
};
