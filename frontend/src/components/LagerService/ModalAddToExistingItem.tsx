import {
  Button,
  FormControl,
  FormLabel,
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
  Select,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { ItemContext } from "contexts/ItemContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { EditItemDto, ItemIdDto } from "services/backend/client.generated";

export enum openingType {
  Icon,
  Button
}

type Props = {
  type: openingType;
  item?: ItemIdDto;
  addAmoutToItem: (item: ItemIdDto) => void;
};

const ModalAddToExistingItem: FC<Props> = ({
  type = openingType.Button,
  item = {},
  addAmoutToItem
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, dispatchItems, EditItem } = useContext(ItemContext);

  const [chosenItem, chooseItem] = useState<ItemIdDto>(item);
  const [amount, setAmount] = useState<number>(1);

  const handleDropdownChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      const pickedItem: ItemIdDto = items.find(item => item.id === parseInt(e.target.value));
      chooseItem(pickedItem);
    },
    [items]
  );

  const onSubmit = useCallback(() => {
    const item: EditItemDto = {
      name: chosenItem.name,
      totalInStock: chosenItem.totalInStock + amount,
      usedInOffice: chosenItem.usedInOffice,
      borrowable: chosenItem.borrowable,
      description: chosenItem.description
    };
    EditItem(chosenItem.id, item).then(() => {
      const ItemsArray = [...items];
      const updatedItem = items.findIndex(item => item.id === chosenItem.id);
      ItemsArray[updatedItem].totalInStock = item.totalInStock;
      dispatchItems(ItemsArray);
      onClose();
    });
  }, [EditItem, amount, chosenItem, dispatchItems, items, onClose]);

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to existing item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Choose an existing item</FormLabel>
              <Select placeholder="Select option" onChange={handleDropdownChange}>
                {items.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
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
          </ModalBody>

          <ModalFooter>
            <Button isDisabled={!chosenItem} onClick={onSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {type === openingType.Button && (
        <Text cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={onOpen}>
          Add items
        </Text>
      )}
    </React.Fragment>
  );
};

export default ModalAddToExistingItem;
function newAmount(newAmount: any) {
  throw new Error("Function not implemented.");
}
