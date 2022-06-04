import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useKorisnik } from "../../../hooks/useKorisnik";
import { daLiJeValidanFormatEmailAdrese } from "../../utils/regex/regex";
import { FormWrapper, Wrapper } from "../../utils/ui";
import { PrijavaKorisnika } from "../../../tipovi";
import { useNavigate } from "react-router-dom";

export const Prijava = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<PrijavaKorisnika>();
  const [ucitava, postaviUcitava] = useState(false);
  const { prijava } = useKorisnik();
  const toast = useToast();
  const ruter = useNavigate();

  const prijaviKorisnika = async (podaci: PrijavaKorisnika) => {
    postaviUcitava(true);
    try {
      await prijava(podaci);
      ruter("/profil");
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
      postaviUcitava(false);
    }
  };

  return (
    <Wrapper>
      {!ucitava ? (
        <form onSubmit={handleSubmit(prijaviKorisnika)}>
          <FormWrapper>
            <Text fontSize={"xl"}>Prijava</Text>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="email"
                {...register("email", {
                  required: "Ovo polje je obavezno",
                  pattern: {
                    value: daLiJeValidanFormatEmailAdrese,
                    message: "Mora biti validna mejl adresa",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lozinka}>
              <FormLabel htmlFor="lozinka">Lozinka</FormLabel>
              <Input
                id="lozinka"
                placeholder="lozinka"
                type="password"
                {...register("lozinka", {
                  required: "Ovo polje je obavezno",
                })}
              />
              <FormErrorMessage>
                {errors.lozinka && errors.lozinka.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              colorScheme={"linkedin"}
              type={"submit"}
              disabled={isSubmitting}
            >
              Prijava
            </Button>
          </FormWrapper>
        </form>
      ) : (
        <Spinner position={"absolute"} top={"50vh"} left={"50vw"} />
      )}
    </Wrapper>
  );
};
