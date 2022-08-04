import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader
} from "@chakra-ui/react";
import useItemContext from "contexts/useItemContext";
import React from "react";
import { FC } from "react";
import { NotificationTypes } from "services/backend/client.generated";

import ReviewBorrowRequest from "./ReviewBorrowRequest";

type Props = {
  onClose: () => void;
  contentId: number;
  notificationType: NotificationTypes;
};

const ReviewNotificationPopup: FC<Props> = ({ onClose, notificationType, contentId }) => {
  const { singleBorrowRequest } = useItemContext();

  // const notification: any = useMemoAsync(async () => {
  //   if (notificationType == NotificationTypes.BorrowRequest)
  //     return await fetchBorrowRequest(contentId);
  // }, []);

  if (notificationType == NotificationTypes.BorrowRequest) return <ReviewBorrowRequest />;

  return (
    <React.Fragment>
      <ModalHeader>Review request to borrow equipment</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>First name</FormLabel>
          <Input placeholder="First name" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Last name</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </React.Fragment>
  );
};

export default ReviewNotificationPopup;
