import { Container } from "@chakra-ui/react";

interface WrapperProps {
  children: any;
  [key: string]: any;
}

export const Wrapper = (props: WrapperProps) => {
  const { children, ...ostalo } = props;

  return (
    <Container maxW={"90rem"} {...ostalo}>
      {props.children}
    </Container>
  );
};
