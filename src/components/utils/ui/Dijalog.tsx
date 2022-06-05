import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

const DEFAULT_PORUKE = {
  header: "Brisanje",
  body: "Da li ste sigurni da zelite ovo da uradite?",
  noButton: "Ne",
  yesButton: "Da",
};

interface DijalogProps {
  onClose: () => void;
  isOpen: boolean;
  onConfirmation: () => void;
  poruke?: {
    header?: string;
    body?: string;
    noButton?: string;
    yesButton?: string;
  };
}

export const Dijalog = (props: DijalogProps) => {
  const { isOpen, poruke, onClose, onConfirmation } = props;
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {poruke?.header || DEFAULT_PORUKE.header}
          </AlertDialogHeader>
          <AlertDialogBody>
            {poruke?.body || DEFAULT_PORUKE.body}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {poruke?.noButton || DEFAULT_PORUKE.noButton}
            </Button>
            <Button colorScheme="red" onClick={onConfirmation} ml={3}>
              {poruke?.yesButton || DEFAULT_PORUKE.yesButton}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
