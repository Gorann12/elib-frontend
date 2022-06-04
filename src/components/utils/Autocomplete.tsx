import {
  Box,
  Flex,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState, FocusEvent } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

enum FOKUSIRANI_ELEMENT {
  LISTA = "lista",
  INPUT = "input",
  VAN = "van",
}

export const Autocomplete = () => {
  const [knjige, postaviKnjige] = useState<{ naslov: string; id: number }[]>(
    []
  );
  const [vrednostPretrage, postaviVrednostPretrage] = useState("");
  const [prikaziSugestije, postaviPrikaziSugestije] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("Request sent");
      axios
        .get("knjiga", {
          params: {
            terminZaPretragu: vrednostPretrage,
          },
        })
        .then((rezultat) => postaviKnjige(rezultat.data));
    }, 1200);

    return () => clearTimeout(timer);
  }, [vrednostPretrage]);

  const promeniVrednostPretrage = async (e: ChangeEvent<HTMLInputElement>) => {
    const vrednost = e.target.value;

    postaviVrednostPretrage(vrednost);

    if (vrednost === "") {
      postaviKnjige([]);
    }
  };

  const handleClick = () => {
    postaviKnjige([]);
    postaviVrednostPretrage("");
  };

  const skloniSugestije = (e: FocusEvent<HTMLDivElement, Element>) => {
    if (!e.relatedTarget?.attributes.getNamedItem("data-suggestion")) {
      postaviPrikaziSugestije(false);
    }
  };

  return (
    <Flex maxW="15rem" position={"relative"} onBlur={skloniSugestije}>
      <Input
        borderColor={"gray.400"}
        bgColor="white"
        aria-label={"pronadji knjigu"}
        placeholder={"pronadji knjigu"}
        value={vrednostPretrage}
        onChange={promeniVrednostPretrage}
        onFocus={() => postaviPrikaziSugestije(true)}
      />
      {prikaziSugestije && knjige.length > 0 && (
        <List
          position={"absolute"}
          top={"110%"}
          maxW={"20rem"}
          w={"100%"}
          bgColor={"white"}
          boxShadow={"md"}
          rounded={"md"}
          maxHeight={"120px"}
          height={knjige.length * 40 + "px"}
          overflowY={"scroll"}
        >
          {knjige.map((knjiga) => (
            <ListItem
              key={knjiga.id}
              cursor={"pointer"}
              _hover={{ bgColor: "gray.100" }}
              onClick={handleClick}
              data-suggestion
            >
              <Link
                data-suggestion
                to={`${knjiga.id}`}
                style={{ width: "100%" }}
              >
                <Box
                  pl={2}
                  h={10}
                  display={"flex"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <ListIcon
                    as={FaChevronCircleRight}
                    color={"messenger.400"}
                    size={"1px"}
                  />
                  <Text lineHeight={1}>{knjiga.naslov}</Text>
                </Box>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Flex>
  );
};
