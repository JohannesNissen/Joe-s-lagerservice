import "draft-js/dist/Draft.css";

import { Heading, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import GalleryItem from "components/LagerService/GalleryItem";
import ModalRegisterNewItem from "components/LagerService/ModalRegisterNewItem";
import NotificationsComponent from "components/LagerService/NotificationsComponent";
import PageHeader from "components/LagerService/PageHeader";
import useItemContext from "contexts/useItemContext";
import useNotificationContext from "contexts/useNotificationContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { CreateItemCommand } from "services/backend/client.generated";

const NewItemHeaders = {
  Choose_operation: "",
  Register_new: "Register new item",
  Add_to_existing: ""
};

const IndexPage: NextPage = () => {
  const { items, fetchItems, saveNewItem } = useItemContext();
  const { notifications, getNotifications } = useNotificationContext();

  useRouter();

  const registerNewItem = useCallback(
    (command: CreateItemCommand) => {
      return saveNewItem(command);
    },
    [saveNewItem]
  );

  useEffect(() => {
    fetchItems();
    getNotifications(1);
  }, [fetchItems, getNotifications]);

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const displayNotifocations = useCallback(() => {
    setShowNotifications(!showNotifications);
  }, [showNotifications]);

  return (
    <div style={{ position: "relative" }}>
      <PageHeader
        toggleNotifications={displayNotifocations}
        sizeMultiplier={1}
        notifications={notifications}
      />
      <HStack
        justify="flex-end"
        position="absolute"
        right={0}
        mr={10}
        zIndex={100}
        bgColor="white"
        borderRadius={5}
        display={showNotifications ? "flex" : "none"}>
        <NotificationsComponent notifications={notifications} width={20} show={showNotifications} />
      </HStack>
      <Tabs isFitted mx={8} align="start" mt="1rem" size="lg" isLazy={true}>
        <TabList mb="1em">
          <Tab _active={{ color: "blue.100", borderBottom: "solid 1px" }}>
            <Stack>
              <Heading fontWeight={900} fontSize={{ base: "sm", sm: "sm", md: "lg" }}>
                Storage
              </Heading>
            </Stack>
          </Tab>
          <Tab _active={{ color: "blue.100", borderBottom: "solid 1px" }}>
            <Stack>
              <Heading fontWeight={900} fontSize={{ base: "sm", sm: "sm", md: "lg" }}>
                Admin panel
              </Heading>
            </Stack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GalleryItem storage={items} />
          </TabPanel>
          <TabPanel>
            <Stack align="center">
              <Heading size={"md"}>Kun for Admins</Heading>
            </Stack>
            {/* <ServiceMessageList
              serviceMessages={serviceMessages}
              deleteServiceMessage={deleteServiceMessage}
            /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ModalRegisterNewItem onSave={registerNewItem} />
    </div>
  );
};

export default IndexPage;
