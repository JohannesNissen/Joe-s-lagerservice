import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { ItemContext } from "contexts/ItemContext";
import { UserContext } from "contexts/UserContext";
import React, { FC, useCallback, useContext, useState } from "react";
import { BorrowItemCommand } from "services/backend/client.generated";

type Props = {
  itemId: number;
  onSubmit(request: BorrowItemCommand): Promise<void>;
};

const ModalSubmitBorrowRequest: FC<Props> = ({ itemId, onSubmit }) => {
  const { user, userProfile } = useContext(UserContext);
  const { fetchItemDetails, itemDetails } = useContext(ItemContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [amount, setAmount] = useState<number>(1);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const toast = useToast();

  const accept = useCallback(async () => {
    const thing: BorrowItemCommand = {
      amount: amount,
      itemId: itemId,
      endDate: dateTo,
      startDate: dateFrom
    };
    onSubmit(thing)
      .then(() => {
        toast({
          title: "Success",
          description: "Dine input blev gemt",
          status: "success",
          duration: 4000,
          isClosable: true
        });
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
  }, [amount, dateFrom, dateTo, itemId, onSubmit, toast]);

  return (
    <React.Fragment>
      <Tooltip label="Submit a request to borrow this equipment">
        <Button onClick={onOpen} colorScheme="linkedin">
          Borrow item
        </Button>
      </Tooltip>
      <Modal onClose={onClose} isOpen={isOpen} size="lg" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request to borrow item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>User</FormLabel>
              <Input readOnly value={user?.name} />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Item</FormLabel>
              <Input readOnly value={itemDetails?.name} />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                onChange={e => setAmount(parseInt(e.target.value))}
                defaultValue={1}
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Start of period</FormLabel>
              <SingleDatepicker name="date-input" date={dateFrom} onDateChange={setDateFrom} />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>End of period</FormLabel>
              <SingleDatepicker name="end-date-picker" date={dateTo} onDateChange={setDateTo} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={accept} mr={3}>
              Submit Request
            </Button>
            <Button onClick={onClose} colorScheme="orange" mr={3}>
              Cancel Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ModalSubmitBorrowRequest;
