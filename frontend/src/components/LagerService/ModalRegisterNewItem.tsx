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
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import LineBreak from "components/Common/LineBreak";
import RichTextEditor from "components/Common/RichTectEditor";
import React, { useCallback, useState } from "react";
import { FC } from "react";
import { CreateItemCommand } from "services/backend/client.generated";

type Props = {
  onSave: (command: CreateItemCommand) => Promise<void>;
};

const ModalRegisterNewItem: FC<Props> = ({ onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [itemName, setItemName] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [borrowable, setBorrowable] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [reserveItems, setReserveItems] = useState<boolean>(false);
  const [amountToReserve, setReserveAmount] = useState<number>(0);
  const [items, setItem] = useState<CreateItemCommand>({
    name: "",
    amountBought: 1,
    reserveForOffice: 0,
    borrowable: false,
    description: ""
  });

  const prepareSave = useCallback(() => {
    setItem(() => {
      return {
        name: itemName,
        amountBought: amount,
        reserveForOffice: reserveItems ? amountToReserve : 0,
        borrowable: borrowable,
        description: description
      };
    });
  }, [amount, amountToReserve, borrowable, description, itemName, reserveItems]);

  const saveItem = useCallback(() => {
    // prepareSave();
    const item: CreateItemCommand = {
      name: itemName,
      amountBought: amount,
      reserveForOffice: reserveItems ? amountToReserve : 0,
      borrowable: borrowable,
      description: description
    };
    onSave(item)
      .then(() => {
        onClose();
      })
      .catch(() => {
        toast({
          title: "Fejl",
          description: "Noget gik galt",
          status: "error",
          duration: 4000,
          isClosable: true
        });
      });
  }, [
    amount,
    amountToReserve,
    borrowable,
    description,
    itemName,
    onClose,
    onSave,
    reserveItems,
    toast
  ]);

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
              <Input
                placeholder="Name of the new item"
                onChange={e => setItemName(e.target.value)}
              />
            </FormControl>
            <HStack justifyContent={"space-between"}>
              <FormControl mt="1em" maxW="50%">
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  defaultValue={1}
                  onChange={e => setAmount(parseInt(e))}
                  min={1}
                  clampValueOnBlur>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl maxW="30%" mt="1em">
                <FormLabel width="fit-content">Borrowable</FormLabel>
                <Checkbox
                  width="fit-content"
                  defaultChecked={false}
                  onChange={e => setBorrowable(e.target.checked)}>
                  (true/false)
                </Checkbox>
              </FormControl>
            </HStack>
            <FormControl mt="1em">
              <FormLabel>Give an overall description text for the item</FormLabel>
              <RichTextEditor onDescriptionChange={e => setDescription(e)} />
            </FormControl>
            <LineBreak />
            <HStack justifyContent={"space-between"}>
              <FormControl maxW="30%" mt="1em">
                <FormLabel width="fit-content">Reserve items</FormLabel>
                <Checkbox
                  width="fit-content"
                  defaultChecked={false}
                  onChange={e => setReserveItems(e.target.checked)}>
                  (true/false)
                </Checkbox>
              </FormControl>
              <FormControl mt="1em" maxW="50%" isDisabled={!reserveItems}>
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  defaultValue={1}
                  onChange={e => setReserveAmount(parseInt(e))}
                  min={0}
                  max={amount}
                  clampValueOnBlur>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <LineBreak />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveItem}>
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
