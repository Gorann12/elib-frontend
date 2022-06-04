import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useKategorija } from "../../../../hooks/useKategorija";
import { KreirajKategoriju } from "../../../../tipovi/kategorija";
import { FormWrapper, Wrapper } from "../../../utils/ui";

export const KategorijaForma = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<KreirajKategoriju>();
  const [ucitava, postaviUcitava] = useState(false);
  const { kreiraj } = useKategorija();
  const toast = useToast();

  const kreirajKategoriju = async (podaci: KreirajKategoriju) => {
    postaviUcitava(true);
    try {
      const kategorija = await kreiraj(podaci);

      toast({
        title: "Uspesno kreiranje",
        description: `Kategorija "${kategorija.naziv}" je uspesno kreirana!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      reset();
    } catch (e: any) {
      const errorPoruka = e.response.data.message;

      toast({
        title: "Neuspesno kreiranje",
        description: errorPoruka,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      postaviUcitava(false);
    }
  };

  return (
    <Wrapper>
      {!ucitava ? (
        <form onSubmit={handleSubmit(kreirajKategoriju)}>
          <FormWrapper>
            <Text fontSize={"xl"}>Kreiraj kategoriju</Text>
            <FormControl isInvalid={!!errors.naziv}>
              <FormLabel htmlFor="naziv">Naziv</FormLabel>
              <Input
                id="naziv"
                placeholder="naziv"
                {...register("naziv", {
                  required: "Ovo polje je obavezno",
                })}
              />
              <FormErrorMessage>
                {errors.naziv && errors.naziv.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.opis}>
              <FormLabel htmlFor="opis">Opis</FormLabel>
              <Textarea
                id="opis"
                placeholder="opis"
                {...register("opis", {
                  required: "Ovo polje je obavezno",
                  maxLength: {
                    value: 1024,
                    message: "maksimalna duzina je 1024 karaktera",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.opis && errors.opis.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              colorScheme={"linkedin"}
              type={"submit"}
              disabled={isSubmitting}
            >
              Kreiraj
            </Button>
          </FormWrapper>
        </form>
      ) : (
        <Spinner position={"absolute"} top={"50vh"} left={"50vw"} />
      )}
    </Wrapper>
  );
};
