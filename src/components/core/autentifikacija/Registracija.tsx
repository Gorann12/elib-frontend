import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { daLiJeValidanFormatEmailAdrese } from "../../utils/regex/regex";
import { FormWrapper, Wrapper } from "../../utils/ui";
import { RegistrujKorisnika } from "../tipovi";

export const Registracija = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegistrujKorisnika>();

  const registrujKorisnika = (podaci: RegistrujKorisnika) => {
    console.log("Podaci", podaci);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(registrujKorisnika)}>
        <FormWrapper>
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
              type="password"
              placeholder="lozinka"
              {...register("lozinka", {
                required: "Obavezno polje",
                minLength: {
                  value: 8,
                  message: "Mora imati minimum 8 karaktera",
                },
              })}
            />
            <FormErrorMessage>
              {errors.lozinka && errors.lozinka.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.ime}>
            <FormLabel htmlFor="ime">Ime</FormLabel>
            <Input
              id="ime"
              type="text"
              placeholder="ime"
              {...register("ime", {
                required: "Obavezno polje",
              })}
            />
            <FormErrorMessage>
              {errors.ime && errors.ime.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.prezime}>
            <FormLabel htmlFor="prezime">Prezime</FormLabel>
            <Input
              id="prezime"
              type="text"
              placeholder="prezime"
              {...register("prezime", {
                required: "Obavezno polje",
              })}
            />
            <FormErrorMessage>
              {errors.prezime && errors.prezime.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.ulicaStanovanja}>
            <FormLabel htmlFor="ulicaStanovanja">Ulica Stanovanja</FormLabel>
            <Input
              id="ulicaStanovanja"
              type="text"
              placeholder="ulica stanovanja"
              {...register("ulicaStanovanja", {
                required: "Obavezno polje",
              })}
            />
            <FormErrorMessage>
              {errors.ulicaStanovanja && errors.ulicaStanovanja.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.brojUlice}>
            <FormLabel htmlFor="brojUlice">Broj ulice</FormLabel>
            <Input
              id="brojUlice"
              type="number"
              placeholder="broj ulice"
              {...register("brojUlice", {
                valueAsNumber: true,
                required: "Obavezno polje",
              })}
            />
            <FormErrorMessage>
              {errors.brojUlice && errors.brojUlice.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.telefon}>
            <FormLabel htmlFor="telefon">Telefon</FormLabel>
            <Input
              id="telefon"
              type="number"
              placeholder="telefon"
              {...register("telefon", {
                required: "Obavezno polje",
                maxLength: {
                  value: 15,
                  message: "Ovo polje ne sme imati vise od 15 karaktera",
                },
              })}
            />
            <FormErrorMessage>
              {errors.telefon && errors.telefon.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.godinaRodjenja}>
            <FormLabel htmlFor="godinaRodjenja">Godina rodjenja</FormLabel>
            <Input
              id="godinaRodjenja"
              type="number"
              placeholder="godina rodjenja"
              {...register("godinaRodjenja", {
                required: "Obavezno polje",
                min: {
                  value: 1900,
                  message: "Mora biti veca vrednost od 1900",
                },
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.godinaRodjenja && errors.godinaRodjenja.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme={"linkedin"}
            type={"submit"}
            disabled={isSubmitting}
          >
            Registruj se
          </Button>
        </FormWrapper>
      </form>
    </Wrapper>
  );
};
