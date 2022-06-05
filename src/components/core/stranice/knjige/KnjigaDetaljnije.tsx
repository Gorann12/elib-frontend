import {
  HStack,
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArchive } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useKnjiga } from "../../../../hooks/useKnjiga";
import { Knjiga } from "../../../../tipovi";
import { Wrapper } from "../../../utils/ui/Wrapper";

const colors = ["orange", "teal", "messenger"];

export const KnjigaDetaljnije = () => {
  const [ucitavanje, postaviUcitavanje] = useState(true);
  const [knjiga, postaviKnjigu] = useState<Knjiga>();
  const { dajKnjigu } = useKnjiga();
  const { id } = useParams();
  const toast = useToast();

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
  });

  return (
    <Wrapper>
      {!ucitavanje ? (
        <>
          <HStack align="center" mt={10}>
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
        </>
      ) : (
        <Spinner position="absolute" top="50vh" left="50vw" />
      )}
    </Wrapper>
  );
};
