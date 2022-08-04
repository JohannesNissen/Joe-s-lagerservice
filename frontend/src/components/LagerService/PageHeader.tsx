import { Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { ItemContext } from "contexts/ItemContext";
import { NotificationContext } from "contexts/notificationContext";
import { UserContext } from "contexts/UserContext";
import { useRouter } from "next/router";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { CreateItemCommand, ItemIdDto } from "services/backend/client.generated";
import { isAdmin } from "utils/isAdmin";

import NavigationSettingsComponent from "./NavigationSettingComponent";
import NotificationsComponent from "./NotificationsComponent";

type Props = {
  sizeMultiplier?: number;
  frontPage_styling?: boolean;
  frontPage?: boolean;
  invert?: boolean;
  pageTitle?: string;
  toggleNotifications: (boolean) => void;
};

const HEADERSIZE = {
  0: "md",
  1: "lg",
  2: "xl",
  3: "2xl",
  4: "3xl",
  5: "4xl",
  6: "5xl",
  7: "6xl",
  8: "7xl",
  9: "8xl",
  10: "9xl"
};

const FRONTPAGE_STYLE = {
  WebkitTextStroke: "2px black"
};

const PageHeader: FC<Props> = ({
  sizeMultiplier = 1,
  invert,
  frontPage,
  frontPage_styling = false,
  pageTitle = null,
  toggleNotifications
}) => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const { user, resetUser } = useContext(UserContext);
  const { items, fetchItems, saveNewItem, resetItems, EditItem } = useContext(ItemContext);
  const { resetNotifications, notifications } = useContext(NotificationContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const LogOut = useCallback(() => {
    resetItems();
    resetNotifications();
    resetUser();
    router.push("/");
  }, [resetItems, resetNotifications, resetUser, router]);

  useEffect(() => {
    if (user === null) LogOut();
  }, [router.pathname, user]);

  const registerNewItem = useCallback(
    (command: CreateItemCommand) => {
      return saveNewItem(command);
    },
    [saveNewItem]
  );

  const addAmoutToItem = useCallback(
    (item: ItemIdDto) => {
      EditItem(item.id, item);
    },
    [EditItem]
  );

  const displayNotifocations = useCallback(() => {
    setShowNotifications(!showNotifications);
    toggleNotifications(!showNotifications);
  }, [showNotifications, toggleNotifications]);

  if (!frontPage)
    return (
      <Stack direction="column" position="sticky" shadow={"2xl"}>
        <Stack
          top="0"
          direction="row"
          pt="1rem"
          pb="1rem"
          borderBottomWidth="2px"
          bgColor="gray.50">
          <Stack justify="center" px={20} align="center">
            <Heading
              color={invert ? "White" : "Black"}
              size={HEADERSIZE[sizeMultiplier]}
              cursor="pointer"
              onClick={() => {
                if (isAdmin(user)) router.push("/gallery");
                else router.push("/");
              }}>
              Easy storage{pageTitle ? ` - ${pageTitle}` : ""}
            </Heading>
          </Stack>
          <Stack flex={5} direction="row"></Stack>

          <Stack direction="row" flex={1} pr="1rem" justify="flex-end" px={10} zIndex="dropdown">
            <NotificationsComponent notifications={notifications} width={20} />
            <NavigationSettingsComponent
              LogOut={LogOut}
              registerNewItem={registerNewItem}
              addAmoutToItem={addAmoutToItem}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  else
    return (
      <>
        <Stack direction="row" my="3rem"></Stack>
        <Stack flex={4} direction="row" justify="center" align="center">
          <Heading
            textShadow={frontPage_styling ? "3px 3px black" : ""}
            filter="auto"
            backdropFilter="auto"
            backdropBlur={"30%"}
            sx={frontPage_styling ? FRONTPAGE_STYLE : {}}
            color={invert ? "whitesmoke" : "Black"}
            fontSize={HEADERSIZE[sizeMultiplier]}
            cursor="pointer"
            onClick={() => router.push("/")}>
            Easy storage
          </Heading>
        </Stack>
        <Stack flex={1}></Stack>
      </>
    );
};

export default PageHeader;
