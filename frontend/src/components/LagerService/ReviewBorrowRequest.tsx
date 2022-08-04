import {
  Button,
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
  useToast
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { UserContext } from "contexts/UserContext";
import { FC, useCallback, useContext, useState } from "react";
import {
  BorrowedItemDto,
  BorrowedStatus,
  ReviewBorrowRequestCommand
} from "services/backend/client.generated";

type Props = {
  request: BorrowedItemDto;
  isOpen: boolean;
  onClose(): void;
  setReviewedRequest: React.Dispatch<React.SetStateAction<BorrowedItemDto>>;
  dateFrom: Date;
  setDateFrom: React.Dispatch<React.SetStateAction<Date>>;
  dateTo: Date;
  setDateTo: React.Dispatch<React.SetStateAction<Date>>;
  dated: Date;
  setDated: React.Dispatch<React.SetStateAction<Date>>;
  onReview(id: number, request: ReviewBorrowRequestCommand): Promise<void>;
};

const ReviewBorrowRequest: FC<Props> = ({
  isOpen,
  onClose,
  request,
  setReviewedRequest,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  dated,
  setDated,
  onReview
}) => {
  const { user, userProfile } = useContext(UserContext);

  const [amount, setAmount] = useState<number>(0);

  const toast = useToast();

  const accept = useCallback(async () => {
    const thing: ReviewBorrowRequestCommand = {
      amount: request.amount,
      reviewerId: user.id,
      borrowedItemId: request.id,
      endDate: dateTo,
      startDate: dateFrom,
      status: BorrowedStatus.Accepted
    };
    onReview(request.id, thing)
      .then(() => {
        userProfile.borrowedItems = userProfile.borrowedItems.splice(
          userProfile.borrowedItems.indexOf(request),
          1
        );
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
  }, [dateFrom, dateTo, onReview, request, toast, user.id, userProfile]);

  const decline = useCallback(async () => {
    const thing: ReviewBorrowRequestCommand = {
      amount: request.amount,
      reviewerId: user.id,
      borrowedItemId: request.id,
      endDate: dateTo,
      startDate: dateFrom,
      status: BorrowedStatus.Declined
    };
    onReview(request.id, thing)
      .then(() => {
        userProfile.borrowedItems = userProfile.borrowedItems.splice(
          userProfile.borrowedItems.indexOf(request),
          1
        );
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
  }, [dateFrom, dateTo, onReview, request, toast, user.id, userProfile]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review request to borrow item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>User</FormLabel>
            <Input readOnly value={request.userDisplayName} />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Item</FormLabel>
            <Input readOnly value={request.item} />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type="number" defaultValue={request.amount} />
          </FormControl>
          <br />
          <HStack>
            <FormControl>
              <FormLabel>Start of period</FormLabel>
              <SingleDatepicker name="date-input" date={dateFrom} onDateChange={setDateFrom} />
            </FormControl>
            <FormControl>
              <FormLabel>End of period</FormLabel>
              <SingleDatepicker name="end-date-picker" date={dateTo} onDateChange={setDateTo} />
            </FormControl>
          </HStack>
        </ModalBody>
        <ModalFooter>
          {userProfile.teamLead === user.email ? (
            <>
              <Button colorScheme="blue" onClick={accept} mr={3}>
                Approve Request
              </Button>
              <Button colorScheme="red" onClick={decline} mr={3}>
                Deny Request
              </Button>
            </>
          ) : (
            <Button colorScheme="orange" mr={3}>
              Cancel Request
            </Button>
          )}

          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewBorrowRequest;
