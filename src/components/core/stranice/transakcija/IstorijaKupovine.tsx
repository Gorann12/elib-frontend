import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useTransakcija } from '../../../../hooks/useTransakcija';
import { Transakcija } from '../../../../tipovi';
import { Wrapper } from '../../../utils/ui';

export const IstorijaKupovine = () => {
  const [transakcije, postaviTransakcije] = useState<Transakcija[]>([]);
  const [ucitavanje, postaviUcitavanje] = useState(true);
  const { dajTransakcijeZaKorisnika } = useTransakcija();

  const toast = useToast();

  useEffect(() => {
    dajTransakcijeZaKorisnika()
      .then((preuzeteTransakcije) => {
        console.log('Preuzete transakcije', preuzeteTransakcije);
        postaviTransakcije(preuzeteTransakcije);
      })
      .catch((e: any) => {
        const poruka = e?.data?.response?.message || e?.message;
        toast({
          title: 'Error',
          description: poruka || 'nesto je poslo po zlu',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => postaviUcitavanje(false));
  }, []);

  return (
    <>
      {!ucitavanje ? (
        <Wrapper>
          <Heading fontSize={'2xl'} color={'gray.700'} mt={'3rem'} mb={'1rem'}>
            Istorija kupovine
          </Heading>
          <Accordion allowMultiple>
            {transakcije.map((transakcija) => (
              <AccordionItem key={transakcija.id}>
                <h3>
                  <AccordionButton pl={0}>
                    <Box flex="1" textAlign="left" lineHeight={1.6}>
                      <Text>
                        Sifra transakcije:{' '}
                        <Text as="span" fontWeight={700}>
                          {transakcija.id}
                        </Text>
                      </Text>
                      <Text>
                        Ukupna cena:{' '}
                        <Text as="span" color={'orange.500'} fontWeight={700}>
                          {transakcija.knjige.reduce(
                            (acc, curr) => acc + curr.cena * curr.kolicina,
                            0
                          )}
                        </Text>
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel>
                  <List>
                    {transakcija.knjige.map((knjiga) => (
                      <ListItem
                        key={knjiga.naslov + knjiga.transakcijaId}
                        lineHeight={1.6}
                      >
                        <ListIcon as={MdKeyboardArrowRight} color="green.500" />
                        <Text as="span" fontWeight={700}>
                          {knjiga.naslov} ({knjiga.kolicina}):
                        </Text>{' '}
                        {knjiga.cena} RSD
                      </ListItem>
                    ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Wrapper>
      ) : (
        <Spinner position="absolute" top="50vh" left="50vw" />
      )}
    </>
  );
};
