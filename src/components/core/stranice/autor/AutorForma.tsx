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
import { useAutor } from "../../../../hooks/useAutor";
import { KreirajAutora } from "../../../../tipovi";
import { FormWrapper, Wrapper } from "../../../utils/ui";

export const AutorForma = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<KreirajAutora>();
  const [ucitavanje, postaviUcitavanje] = useState(false);
  const { kreirajAutora } = useAutor();
  const toast = useToast();

  const kreiraj = async (podaci: KreirajAutora) => {
    postaviUcitavanje(true);
    try {
      await kreirajAutora(podaci);

      reset();
      toast({
        title: "Uspeh",
        description: `Autor ${podaci.ime} je uspesno kreiran`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e: any) {
      const errorPoruka = e.response.data.message;

      toast({
        title: "Error",
        description: Array.isArray(errorPoruka)
          ? errorPoruka.join(", ")
          : errorPoruka,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      postaviUcitavanje(false);
    }
  };

  return (
    <Wrapper>
      {!ucitavanje ? (
        <form onSubmit={handleSubmit(kreiraj)}>
          <FormWrapper>
            <Text>Kreiraj Autora</Text>
            <FormControl isInvalid={!!errors.ime}>
              <FormLabel htmlFor="ime">Ime</FormLabel>
              <Input
                id="ime"
                type="text"
                {...register("ime", {
                  required: "Ovo polje je obavezno",
                })}
              />
              <FormErrorMessage>
                {errors.ime && errors.ime.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.mestoRodjenja}>
              <FormLabel htmlFor="mestoRodjenja">Mesto rodjenja</FormLabel>
              <Input
                id="mestoRodjenja"
                type="text"
                {...register("mestoRodjenja", {
                  required: "Ovo polje je obavezno",
                })}
              />
              <FormErrorMessage>
                {errors.mestoRodjenja && errors.mestoRodjenja.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.godinaRodjenja}>
              <FormLabel htmlFor="godinaRodjenja">Godina rodjenja</FormLabel>
              <Input
                id="godinaRodjenja"
                type="number"
                {...register("godinaRodjenja", {
                  required: "Ovo polje je obavezno",
                  valueAsNumber: true,
                })}
              />
              <FormErrorMessage>
                {errors.godinaRodjenja && errors.godinaRodjenja.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.biografija}>
              <FormLabel htmlFor="biografija">Biografija</FormLabel>
              <Textarea
                id="biografija"
                {...register("biografija", {
                  required: "Ovo polje je obavezno",
                  maxLength: {
                    value: 1024,
                    message: "Maksimalan broj karaktera je 1024",
                  },
                })}
                maxLength={1024}
              />
              <FormErrorMessage>
                {errors.biografija && errors.biografija.message}
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
        <Spinner position="absolute" top="50vh" left="50vw" />
      )}
    </Wrapper>
  );
};

// id, ime, mestoRodjenja, godinaRodjenja, biografija;
