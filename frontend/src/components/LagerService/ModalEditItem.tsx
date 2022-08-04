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
  Stack,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import LineBreak from "components/Common/LineBreak";
import RichTextEditor from "components/Common/RichTectEditor";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FC } from "react";
import { EditItemDto, ItemDetailsDto, ItemIdDto } from "services/backend/client.generated";

type Props = {
  onSave: (_id: number, _editDto: EditItemDto) => Promise<void>;
  setItemDetails: Dispatch<SetStateAction<ItemIdDto>>;
  itemDetails: ItemDetailsDto;
  itemId: number;
};

const ModalEditItem: FC<Props> = ({ onSave, itemDetails, itemId, setItemDetails }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { itemDetails } = useContext(ItemContext);
  const toast = useToast();

  const [itemName, setItemName] = useState<string>(itemDetails?.name);
  const [borrowable, setBorrowable] = useState<boolean>(itemDetails?.borrowable);
  const [description, setDescription] = useState<string>(itemDetails?.description);
  const [amountInOffice, setAmountInOffice] = useState<number>(itemDetails?.amountLentOut);
  const [amount, setAmount] = useState<number>(itemDetails?.totalInStock);
  const [items, setItem] = useState<EditItemDto>({
    name: "",
    totalInStock: 0,
    usedInOffice: 0,
    borrowable: false,
    description: ""
  });

  const prepareSave = useCallback(() => {
    setItem(() => {
      return {
        name: itemName ? itemName : itemDetails?.name,
        totalInStock: amount ? amount : itemDetails?.totalInStock,
        usedInOffice: amountInOffice ? amountInOffice : itemDetails?.usedInOffice,
        borrowable: borrowable,
        description: description ? description : itemDetails?.description
      };
    });
  }, [amount, amountInOffice, borrowable, description, itemDetails, itemName]);

  const saveItem = useCallback(() => {
    // prepareSave();
    const item: EditItemDto = {
      name: itemName ? itemName : itemDetails?.name,
      totalInStock: amount ? amount : itemDetails?.totalInStock,
      usedInOffice: amountInOffice ? amountInOffice : itemDetails?.usedInOffice,
      borrowable: borrowable !== undefined ? borrowable : itemDetails.borrowable,
      description: description ? description : itemDetails?.description
    };
    onSave(itemId, item)
      .then(() => {
        toast({
          title: "Success",
          description: "Dine input blev gemt",
          status: "success",
          duration: 4000,
          isClosable: true
        });
        const amountAvailable =
          (amount ? amount : itemDetails?.totalInStock) -
          (amountInOffice ? amountInOffice : itemDetails?.usedInOffice) -
          itemDetails?.amountLentOut;
        setItemDetails(() => {
          return {
            ...itemDetails,
            name: itemName ? itemName : itemDetails?.name,
            totalInStock: amount ? amount : itemDetails?.totalInStock,
            usedInOffice: amountInOffice ? amountInOffice : itemDetails?.usedInOffice,
            borrowable: borrowable !== undefined ? borrowable : itemDetails.borrowable,
            description: description ? description : itemDetails?.description,
            amountAvailable: amountAvailable
          };
        });
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
    amountInOffice,
    borrowable,
    description,
    itemDetails,
    itemId,
    itemName,
    onClose,
    onSave,
    setItemDetails,
    toast
  ]);

  return (
    <React.Fragment>
      <Button colorScheme="cyan" onClick={onOpen}>
        Edit item
      </Button>
      <Modal size="xl" scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader justifyContent={"center"}>Edit item - {itemDetails?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Item</FormLabel>
              <Input
                defaultValue={itemDetails?.name}
                placeholder="Name of the new item"
                onChange={e => setItemName(e.target.value)}
              />
            </FormControl>
            <Stack>
              <HStack justifyContent={"space-between"}>
                <FormControl mt="1em" maxW="50%">
                  <FormLabel>Amount in stock</FormLabel>
                  <NumberInput
                    defaultValue={itemDetails?.totalInStock}
                    onChange={e => setAmount(parseInt(e))}
                    min={
                      (amountInOffice ? amountInOffice : itemDetails?.usedInOffice) +
                      itemDetails?.amountLentOut
                    }
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
                    defaultChecked={itemDetails?.borrowable}
                    onChange={e => setBorrowable(e.target.checked)}>
                    (true/false)
                  </Checkbox>
                </FormControl>
              </HStack>
              <FormControl mt="1em" maxW="50%">
                <FormLabel>Amount used in office</FormLabel>
                <NumberInput
                  defaultValue={itemDetails?.usedInOffice}
                  onChange={e => setAmountInOffice(parseInt(e))}
                  min={0}
                  max={(amount ? amount : itemDetails?.totalInStock) - itemDetails?.amountLentOut}
                  clampValueOnBlur>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <LineBreak />
            </Stack>
            <FormControl mt="1em">
              <FormLabel>Give an overall description text for the item</FormLabel>
              <RichTextEditor
                initialDesctiption={itemDetails?.description}
                onDescriptionChange={e => setDescription(e)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="linkedin" mr={3} onClick={saveItem}>
              Submit
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ModalEditItem;
