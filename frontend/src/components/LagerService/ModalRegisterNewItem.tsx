import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure
} from "@chakra-ui/react";
import RichTextEditor from "components/Common/RichTectEditor";
import React from "react";
import { FC } from "react";

const ModalRegisterNewItem: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //TODO: Modify this component to successfully create a new item
  return (
    <React.Fragment>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register new item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Item</FormLabel>
              <Input placeholder="Name of the new item" />
            </FormControl>
            <HStack justifyContent={"space-between"}>
              <FormControl mt="1em" maxW="50%">
                <FormLabel>Amount</FormLabel>
                <NumberInput defaultValue={10} min={1} clampValueOnBlur>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl maxW="30%" mt="1em">
                <FormLabel width="fit-content">Borrowable</FormLabel>
                <Checkbox width="fit-content">oushdfkjsdhfl</Checkbox>
              </FormControl>
            </HStack>
            <FormControl mt="1em">
              <FormLabel>Give an overall description text for the item</FormLabel>
              <RichTextEditor />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={onOpen}>Open Modal</Button>
    </React.Fragment>
  );
};

export default ModalRegisterNewItem;
