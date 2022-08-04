import {
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import useItemContext from "contexts/useItemContext";
import React, { FC, useState } from "react";
import { NotificationIdDto, NotificationTypes } from "services/backend/client.generated";

import ReviewNotificationPopup from "./ReviewNotificationPopupContent";

type Props = {
  notifications?: NotificationIdDto[];
  width?: number;
};

const NotificationsComponent: FC<Props> = ({ notifications, width = 30 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchBorrowRequest } = useItemContext();

  const [contentId, setContentId] = useState<number>(0);
  const [notificationType, setNotificationType] = useState<NotificationTypes>(
    NotificationTypes.BorrowAnswer
  );

  const ReviewNotification = async (notification: NotificationIdDto) => {
    if (notification.notificationType == NotificationTypes.BorrowRequest)
      await fetchBorrowRequest(notification.contentId);
    onOpen();
  };

  return (
    <React.Fragment>
      <Menu>
        <MenuButton>
          <Image
            cursor="pointer"
            alt=""
            boxSize="2.5rem"
            fill="blue.200"
            src="/images/NotificationBell/Blue.svg"
          />
        </MenuButton>
        <MenuList>
          {!notifications ? (
            <MenuItem>
              <p>There is no notifications</p>
            </MenuItem>
          ) : (
            notifications?.map((notification, index) => (
              <HStack
                cursor="pointer"
                key={index}
                width={`${width - 1}vw`}
                minH={50}
                height="inherit"
                onClick={() => ReviewNotification(notification)}
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
            ))
          )}
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalHeader>Modal Title</ModalHeader>
        <ModalContent>
          <ReviewNotificationPopup
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
