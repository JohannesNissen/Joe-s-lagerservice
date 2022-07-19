import {
  Box,
  Divider,
  HStack,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import useItemContext from "contexts/useItemContext";
import React, { FC, useCallback, useRef, useState } from "react";
import { NotificationIdDto, NotificationTypes } from "services/backend/client.generated";

import ReviewNotificationPopup from "./ReviewNotificationPopupContent";

type Props = {
  notifications?: NotificationIdDto[];
  show: boolean;
  width?: number;
  borderRadius?: number;
};

const NotificationsComponent: FC<Props> = ({
  notifications,
  show = false,
  width = 30,
  borderRadius = 5
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchBorrowRequest } = useItemContext();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [contentId, setContentId] = useState<number>(0);
  const [notificationType, setNotificationType] = useState<NotificationTypes>(
    NotificationTypes.BorrowAnswer
  );

  const ReviewNotification = useCallback(
    async (notification: NotificationIdDto) => {
      if (notification.notificationType == NotificationTypes.BorrowRequest)
        await fetchBorrowRequest(notification.contentId);
      onOpen;
    },
    [fetchBorrowRequest]
  );

  if (notifications === undefined)
    return (
      <VStack width={`${width}vw`} border="solid 1px black" position="absolute">
        <p>There is no notifications</p>
      </VStack>
    );
  else
    return (
      <React.Fragment>
        <VStack
          width={`${width}vw`}
          borderRadius={borderRadius}
          // border="solid 1px black"
          bgColor="gray.100"
          mt={-2}
          px={3}
          zIndex={1}
          shadow={2}
          position="sticky">
          {notifications?.map((notification, index) => (
            <Box
              key={index}
              bgColor="transparent"
              borderRadius="inherit"
              width="inherit"
              height="inherit"
              padding={2}
              cursor="pointer"
              sx={{
                marginTop: "0"
              }}>
              <HStack
                width={`${width - 1}vw`}
                minH={50}
                height="inherit"
                onClick={async () => await ReviewNotification(notification)}
                _hover={{ bgColor: "whitesmoke", borderRadius: "inherit" }}>
                <Stack pl={2} pr={2} height="inherit" flex={1}>
                  <Icon
                    viewBox="0 0 200 200"
                    stroke="black"
                    color={notification.seen ? "whiteAlpha.100" : "gray.300"}>
                    <path
                      stroke="currentStroke"
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                </Stack>
                <Stack flex={20} direction="row">
                  <VStack align="flex-start" pl={5}>
                    <Text fontSize="xs" maxWidth="75%">
                      {notification.text}
                    </Text>
                  </VStack>
                </Stack>
              </HStack>
              <Divider orientation="horizontal" />
            </Box>
          ))}
        </VStack>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ReviewNotificationPopup
              initialRef={initialRef}
              onClose={onClose}
              contentId={contentId}
              notificationType={notificationType}
            />
          </ModalContent>
        </Modal>
      </React.Fragment>
    );
};

export default NotificationsComponent;
