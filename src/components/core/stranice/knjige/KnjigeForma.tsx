import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select as ChakraSelect,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAutor } from '../../../../hooks/useAutor';
import { useKategorija } from '../../../../hooks/useKategorija';
import { useKnjiga } from '../../../../hooks/useKnjiga';
import { Autor, Kategorija, Knjiga, KreirajKnjigu } from '../../../../tipovi';
import { FormWrapper, Wrapper } from '../../../utils/ui';

export const KnjigeForma = () => {
  const [ucitavanje, postaviUcitavanje] = useState(true);
  const [kategorije, postaviKategorije] = useState<Kategorija[]>([]);
  const [autori, postaviAutore] = useState<Autor[]>([]);
  const [knjiga, postaviKnjigu] = useState<Knjiga | null>(null);

  const { dajSveKategorije } = useKategorija();
  const { dajSveAutore } = useAutor();
  const { kreirajKnjigu, dajKnjigu, azurirajKnjigu } = useKnjiga();

  const { id } = useParams();

  const toast = useToast();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<KreirajKnjigu>();

  useEffect(() => {
    const daLiJeIdValidan = id && !Number.isNaN(parseInt(id));
    const promises = daLiJeIdValidan
      ? [dajSveKategorije(), dajSveAutore(), dajKnjigu(parseInt(id))]
      : [dajSveKategorije(), dajSveAutore()];

    Promise.all(promises)
      .then((res) => {
        const [preuzeteKategorije, preuzetiAutori] = res;

        postaviKategorije(preuzeteKategorije as Kategorija[]);
        postaviAutore(preuzetiAutori as Autor[]);

        if (res.length === 3) {
          const knjiga = res[2] as Knjiga;
          const { kategorije, autor, ...ostalo } = knjiga;

          postaviKnjigu(knjiga);
          reset({
            ...ostalo,
            idKategorija: kategorije.map((kategorija) => kategorija.id),
          } as KreirajKnjigu);
        }
      })
      .catch((e: any) => {
        const errorPoruka = e?.response?.data?.message;

        toast({
          title: 'Eror',
          description: errorPoruka,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        postaviUcitavanje(false);
      });
  }, []);

  const kreiraj = async (podaci: KreirajKnjigu) => {
    try {
      if (knjiga?.id) {
        await azurirajKnjigu(knjiga?.id, podaci);
        navigate(`/knjiga/${knjiga?.id}`);
      } else {
        await kreirajKnjigu(podaci);
        reset();
        toast({
          title: 'Success',
          description: `Knjiga ${podaci.naslov} je uspesno kreirana`,
          duration: 5000,
          status: 'success',
          isClosable: true,
        });
      }
    } catch (e: any) {
      const errorPoruka = e.response.data.message;

      toast({
        title: 'Error',
        description: Array.isArray(errorPoruka)
          ? errorPoruka.join(', ')
          : errorPoruka,
        duration: 5000,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Wrapper>
      {!ucitavanje ? (
        <form onSubmit={handleSubmit(kreiraj)}>
          <FormWrapper>
            <Text fontSize={'2xl'}>
              {knjiga?.id ? 'Azuriraj' : 'Kreiraj'} knjigu
            </Text>
            <FormControl isInvalid={!!errors.naslov}>
              <FormLabel htmlFor="naslov">Naslov</FormLabel>
              <Input
                id="naslov"
                type="text"
                {...register('naslov', {
                  required: 'Ovo polje je obavezno',
                })}
              />
              <FormErrorMessage>
                {errors.naslov && errors.naslov.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.autorId}>
              <FormLabel htmlFor="autorId">Autor</FormLabel>
              <ChakraSelect
                placeholder="Izaberite autora"
                id="authorId"
                {...register('autorId', {
                  required: 'Obavezno polje',
                  valueAsNumber: true,
                })}
              >
                {autori.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.ime}
                  </option>
                ))}
              </ChakraSelect>
              <FormErrorMessage>
                {errors.autorId && errors.autorId.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.opis}>
              <FormLabel htmlFor="opis">Opis</FormLabel>
              <Input
                id={'opis'}
                type={'text'}
                {...register('opis', {
                  required: 'Ovo polje je obavezno',
                })}
              />
              <FormErrorMessage>
                {errors.opis && errors.opis.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.brojStrana}>
              <FormLabel htmlFor="brojStrana">Broj strana</FormLabel>
              <Input
                id={'brojStrana'}
                type={'number'}
                {...register('brojStrana', {
                  required: 'Ovo polje je obavezno',
                  valueAsNumber: true,
                  min: {
                    message: 'Mora biti vec broj od 0',
                    value: 0,
                  },
                })}
                min={0}
              />
              <FormErrorMessage>
                {errors.brojStrana && errors.brojStrana.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.pismo}>
              <FormLabel htmlFor="pismo">Pismo</FormLabel>
              <Input
                id={'pismo'}
                type={'text'}
                {...register('pismo', {
                  required: 'Ovo polje je obavezno',
                })}
              />
              <FormErrorMessage>
                {errors.pismo && errors.pismo.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.povez}>
              <FormLabel htmlFor="povez">Povez</FormLabel>
              <Input
                id={'povez'}
                type={'text'}
                {...register('povez', {
                  required: 'Ovo polje je obavezno',
                })}
              />
              <FormErrorMessage>
                {errors.povez && errors.povez.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.dimenzije}>
              <FormLabel htmlFor="dimenzije">Dimenzije</FormLabel>
              <Input
                id={'dimenzije'}
                type={'text'}
                {...register('dimenzije', {
                  required: 'Ovo polje je obavezno',
                })}
              />
              <FormErrorMessage>
                {errors.dimenzije && errors.dimenzije.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.cena}>
              <FormLabel htmlFor="cena">Cena</FormLabel>
              <Input
                id={'cena'}
                type={'number'}
                {...register('cena', {
                  required: 'Ovo polje je obavezno',
                  valueAsNumber: true,
                  min: {
                    message: 'Mora biti vec broj od 0',
                    value: 0,
                  },
                })}
                min={0}
                step={0.01}
              />
              <FormErrorMessage>
                {errors.cena && errors.cena.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.idKategorija}>
              <FormLabel htmlFor="idKategorija">Kategorije</FormLabel>
              <Controller
                control={control}
                name="idKategorija"
                rules={{
                  required: 'Ovo polje je obavezno',
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    // @ts-ignore
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    // @ts-ignore
                    options={kategorije.map((kategorija) => ({
                      value: kategorija.id,
                      label: kategorija.naziv,
                    }))}
                    defaultValue={
                      knjiga
                        ? knjiga.kategorije.map((kategorija) => ({
                            value: kategorija.id,
                            label: kategorija.naziv,
                          }))
                        : []
                    }
                    isMulti
                  />
                )}
              />
              <FormErrorMessage>
                {/* @ts-ignore */}
                {errors.idKategorija && errors.idKategorija.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              colorScheme={'linkedin'}
              type={'submit'}
              disabled={isSubmitting}
            >
              {knjiga?.id ? 'Izmeni' : 'Kreiraj'}
            </Button>
          </FormWrapper>
        </form>
      ) : (
        <Spinner position="absolute" top="50vh" left="50vw" />
      )}
    </Wrapper>
  );
};

// id, naslov (unique), autorId/autor, opis, brojStrana, pismo, povez, dimenzije, cena,
// kategorije[ids], transakcije
