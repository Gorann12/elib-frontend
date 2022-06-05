import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KorisnikContext } from "../../../../context/KorisnikContext";
import { useKategorija } from "../../../../hooks/useKategorija";
import { lowerCamelCaseToDisplay } from "../../../../shared/regex/regex";
import { Kategorija } from "../../../../tipovi/kategorija";
import { Wrapper } from "../../../utils/ui";

export const KategorijaDetaljnije = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { dajKategoriju } = useKategorija();
  const { daLiKorisnikImaUlogu } = useContext(KorisnikContext);
  const [ucitavanje, postaviUcitavanje] = useState(state == null);
  const [kategorija, postaviKategoriju] = useState<Kategorija | null>(
    state as Kategorija
  );
  const { id: idKategorije, ...podaci } = kategorija || {};

  useEffect(() => {
    if (state == null) {
      dajKategoriju(parseInt(id || "-1"))
        .then((preuzetaKategorija) => postaviKategoriju(preuzetaKategorija))
        .catch(() => navigate("/kategorija/lista"))
        .finally(() => postaviUcitavanje(false));
    }
  }, []);

  const handleSubmit = (key: keyof typeof podaci, vrednost: string) => {};

  return (
    <Wrapper>
      {!ucitavanje ? (
        <>
          <Heading fontSize={"2xl"} color={"gray.700"} mt={10}>
            {kategorija?.naziv}
          </Heading>
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
                        isDisabled={["email"].includes(key)}
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
    </Wrapper>
  );
};
