import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useKorpa } from '../../../../hooks/useKorpa';
import { useTransakcija } from '../../../../hooks/useTransakcija';
import { IndexedElementKorpe } from '../../../../tipovi';
import { Wrapper } from '../../../utils/ui';

export const KorpaProizvodi = () => {
  const [knjigeIzKorpe, postaviKnjigeIzKorpe] = useState<IndexedElementKorpe>(
    {}
  );
  const { dajKnjigeIzKorpe, izbrisiKnjigu, ocistiKorpu } = useKorpa();
  const { naruciKnjige: naruci } = useTransakcija();
  const toast = useToast();

  useEffect(() => {
    const knjige = dajKnjigeIzKorpe();
    postaviKnjigeIzKorpe(knjige);
  }, []);

  const handleIzbrisiJednuKnjiguKlik = (id: number) => {
    const ostatakKnjiga = izbrisiKnjigu(id);
    postaviKnjigeIzKorpe(ostatakKnjiga);
  };

  const naruciKnjige = () => {
    const narudzbina = Object.keys(knjigeIzKorpe).map((kljuc) => ({
      id: knjigeIzKorpe[kljuc].id,
      kolicina: knjigeIzKorpe[kljuc].kolicina,
    }));

    if (!narudzbina.length) {
      toast({
        title: 'Eror',
        description: 'Nemate ni jednu knjigu u korpi!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    naruci(narudzbina)
      .then((res) =>
        toast({
          title: 'Uspeh',
          description: 'Uspesno ste narucili!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      )
      .catch((e) =>
        toast({
          title: 'Eror',
          description: 'Nesto je poslo po zlu',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      )
      .finally(() => {
        ocistiKorpu();
        postaviKnjigeIzKorpe({});
      });
  };

  return (
    <Wrapper>
      <HStack
        align="center"
        justify={'space-between'}
        mt={'2.5rem'}
        mb={'1rem'}
      >
        <Heading fontSize={'2xl'} color={'gray.700'}>
          Korpa
        </Heading>
        <Button colorScheme={'facebook'} onClick={() => naruciKnjige()}>
          Naruci
        </Button>
      </HStack>
      {Object.keys(knjigeIzKorpe).map((kljuc) => (
        <VStack
          key={knjigeIzKorpe[kljuc].cena + knjigeIzKorpe[kljuc].naslov}
          align={'left'}
          p={4}
        >
          <Box color={'gray.700'}>
            <Text fontWeight="bold">{knjigeIzKorpe[kljuc].naslov}</Text>
            <Text fontSize={'sm'}>
              (kolicina: {knjigeIzKorpe[kljuc].kolicina})
            </Text>
          </Box>
          <Text display={'inline'} fontWeight={'bold'} color={'orange.600'}>
            {knjigeIzKorpe[kljuc].cena} RSD * {knjigeIzKorpe[kljuc].kolicina}
          </Text>
          <Button
            colorScheme={'red'}
            size={'sm'}
            w={'fit-content'}
            onClick={() =>
              handleIzbrisiJednuKnjiguKlik(knjigeIzKorpe[kljuc].id)
            }
          >
            Izbrisi jednu knjigu
          </Button>
          <Divider />
        </VStack>
      ))}
      {Object.keys(knjigeIzKorpe).length === 0 ? (
        <Text>Trenutno nema proizvoda u korpi!</Text>
      ) : (
        <HStack justify={'space-between'} p={4}>
          <Text>Ukupna cena</Text>
          <Text>
            {Object.keys(knjigeIzKorpe).reduce(
              (acc, curr) =>
                acc + knjigeIzKorpe[curr].cena * knjigeIzKorpe[curr].kolicina,
              0
            )}
          </Text>
        </HStack>
      )}
    </Wrapper>
  );
};
