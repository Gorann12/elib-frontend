import {
  Button,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useKategorija } from '../../../../hooks/useKategorija';
import { Kategorija } from '../../../../tipovi';
import { Wrapper } from '../../../utils/ui';

export const KategorijaLista = () => {
  const { dajSveKategorije } = useKategorija();
  const [ucitavanje, postaviUcitavanje] = useState(true);
  const [kategorije, postaviKategorije] = useState<Kategorija[]>([]);

  useEffect(() => {
    dajSveKategorije()
      .then((sveKategorije) => postaviKategorije(sveKategorije))
      .finally(() => postaviUcitavanje(false));
  }, []);

  return (
    <Wrapper pt={'2rem'}>
      <Heading color={'gray.600'} fontSize={'xl'} mb={5}>
        Kategorije
      </Heading>
      {!ucitavanje ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th pl={0}>Naziv</Th>
                <Th pl={0}>Opis</Th>
              </Tr>
            </Thead>
            <Tbody>
              {kategorije.length === 0 && <Tr>Trenutno nema kategorija</Tr>}
              {kategorije.map((kategorija) => (
                <Tr key={kategorija.id}>
                  <Td pl={0}>
                    <Button
                      variant={'link'}
                      as={Link}
                      to={`/kategorija/${kategorija.id}`}
                      colorScheme={'facebook'}
                      state={kategorija}
                    >
                      {kategorija.naziv}
                    </Button>
                  </Td>
                  <Td pl={0}>
                    {kategorija.opis.substring(0, 50)}
                    {kategorija.opis.length > 50 && '...'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Spinner position="absolute" top={'50vh'} left={'50vw'} />
      )}
    </Wrapper>
  );
};
