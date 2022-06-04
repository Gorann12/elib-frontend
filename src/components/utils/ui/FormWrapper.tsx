import { VStack } from "@chakra-ui/react";

interface FormWrapperProps {
  children: any;
  [key: string]: any;
}

export const FormWrapper = (props: FormWrapperProps) => {
  const { children, ...ostalo } = props;

  return (
    <VStack
      maxW={"25rem"}
      m={"4rem auto"}
      spacing={6}
      boxShadow={"xl"}
      borderTop={"3px solid lightblue"}
      p={4}
      {...ostalo}
    >
      {children}
    </VStack>
  );
};
