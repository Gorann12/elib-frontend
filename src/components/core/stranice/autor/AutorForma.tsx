import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormWrapper, Wrapper } from "../../../utils/ui";

export const AutorForma = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const kreiraj = () => {
    console.log("HELLO WORLD");
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

// id, ime, mestoRodjenja, godinaRodjenja, biografija;
