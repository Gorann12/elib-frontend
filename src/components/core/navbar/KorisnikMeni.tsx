import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaCartPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { KorisnikContext } from '../../../context/KorisnikContext';

const KorisnikMobilniMeni = () => {
  const { korisnik, odjaviKorisnika } = useContext(KorisnikContext);

  return (
    <Box display={{ lg: 'none' }}>
      <Menu closeOnBlur={true} closeOnSelect={true}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              aria-label="Opcije"
              rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
              variant={'outline'}
            >
              {korisnik && korisnik.ime}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to={'/profil'}>
                Moj profil
              </MenuItem>
              <MenuItem as={Link} to={'/knjiga/lista'}>
                Knjige
              </MenuItem>
              <MenuItem as={Link} to={'/istorija'}>
                Istorija kupovine
              </MenuItem>
              <MenuItem as={Link} to={'/korpa'}>
                Korpa
              </MenuItem>
              <MenuItem onClick={odjaviKorisnika}>Odjava</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

const KorisnikDesktopMeni = () => {
  const { odjaviKorisnika } = useContext(KorisnikContext);

  return (
    <HStack spacing={'1rem'} display={{ base: 'none', lg: 'block' }}>
      <NavLink
        to="/profil"
        style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}
      >
        <Button
          colorScheme={'facebook'}
          variant={'link'}
          fontWeight={'inherit'}
        >
          Profil
        </Button>
      </NavLink>
      <NavLink
        to="/knjiga/lista"
        style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}
      >
        <Button
          colorScheme={'facebook'}
          variant={'link'}
          fontWeight={'inherit'}
        >
          Knjige
        </Button>
      </NavLink>
      <NavLink
        to="/istorija"
        style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}
      >
        <Button
          colorScheme={'facebook'}
          variant={'link'}
          fontWeight={'inherit'}
        >
          Istorija kupovine
        </Button>
      </NavLink>
      <Button
        colorScheme={'facebook'}
        variant={'link'}
        onClick={odjaviKorisnika}
        fontWeight={400}
      >
        Odjavi se
      </Button>
      <IconButton
        colorScheme={'facebook'}
        icon={<FaCartPlus />}
        aria-label="Korpa"
        variant={'outline'}
        as={Link}
        to={'/korpa'}
        fontWeight={400}
      />
    </HStack>
  );
};

export const KorisnikMeni = () => {
  return (
    <>
      <KorisnikMobilniMeni />
      <KorisnikDesktopMeni />
    </>
  );
};
