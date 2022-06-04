import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FaBeer, FaBook } from "react-icons/fa";
import { Autocomplete } from "../utils/Autocomplete";
import { Wrapper } from "../utils/Wrapper";

export const Navbar = () => {
  return (
    <Box bgColor={"gray.200"}>
      <Wrapper
        px={2}
        py={2}
        mx={"auto"}
        justify={"space-between"}
        as={Flex}
        align={"center"}
      >
        <IconButton
          aria-label={"Home button"}
          size={"lg"}
          color={"messenger.500"}
          bgColor={"transparent"}
          icon={<FaBook />}
        />
        <Autocomplete />
        <IconButton
          aria-label={"Home button"}
          size={"lg"}
          color={"messenger.500"}
          bgColor={"transparent"}
          icon={<FaBeer />}
        />
      </Wrapper>
    </Box>
  );
};
