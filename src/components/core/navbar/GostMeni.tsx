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
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, NavLink } from 'react-router-dom';

const GostMobilniMeni = () => {
  return (
    <Box display={{ md: 'none' }}>
      <Menu closeOnBlur={true} closeOnSelect={true}>
        <MenuButton
          as={IconButton}
          aria-label="Opcije"
          icon={<GiHamburgerMenu />}
          variant={'outline'}
        />
        <MenuList>
          <MenuItem as={Link} to={'/prijava'}>
            Prijava
          </MenuItem>
          <MenuItem as={Link} to={'/registracija'}>
            Registracija
          </MenuItem>
          <MenuItem as={Link} to={'/knjiga/lista'}>
            Knjige
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const GostDesktopMeni = () => {
  return (
    <HStack spacing={'1rem'} display={{ base: 'none', md: 'block' }}>
      <NavLink
        to="knjiga/lista"
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
        to="/prijava"
        style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}
      >
        <Button
          colorScheme={'facebook'}
          variant={'link'}
          fontWeight={'inherit'}
        >
          Prijava
        </Button>
      </NavLink>
      <NavLink
        to="/registracija"
        style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}
      >
        <Button
          colorScheme={'facebook'}
          variant={'link'}
          fontWeight={'inherit'}
        >
          Registracija
        </Button>
      </NavLink>
    </HStack>
  );
};

export const GostMeni = () => {
  return (
    <>
      <GostMobilniMeni></GostMobilniMeni>
      <GostDesktopMeni></GostDesktopMeni>
    </>
  );
};
