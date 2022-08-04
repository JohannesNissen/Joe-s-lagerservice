import "draft-js/dist/Draft.css";

import { HStack } from "@chakra-ui/react";
import GalleryItem from "components/LagerService/GalleryItem";
import PageHeader from "components/LagerService/PageHeader";
import { ItemContext } from "contexts/ItemContext";
import { NotificationContext } from "contexts/notificationContext";
import { UserContext } from "contexts/UserContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CreateItemCommand } from "services/backend/client.generated";
import { isAdmin } from "utils/isAdmin";

const NewItemHeaders = {
  Choose_operation: "",
  Register_new: "Register new item",
  Add_to_existing: ""
};

const IndexPage: NextPage = () => {
  const { items, fetchItems, saveNewItem } = useContext(ItemContext);
  const { notifications, getNotifications } = useContext(NotificationContext);

  const { user, users, fetchAllUsers } = useContext(UserContext);

  const router = useRouter();

  const registerNewItem = useCallback(
    (command: CreateItemCommand) => {
      return saveNewItem(command);
    },
    [saveNewItem]
  );

  useEffect(() => {
    fetchItems();
    getNotifications(1);
  }, [fetchItems, getNotifications, router, user]);

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const displayNotifocations = useCallback(() => {
    setShowNotifications(!showNotifications);
  }, [showNotifications]);

  return (
    <div>
      <PageHeader
        toggleNotifications={displayNotifocations}
        sizeMultiplier={1}
        pageTitle="Storage"
      />
      <HStack w="fit-content" justify="center" align="start" mt="1rem">
        <GalleryItem
          storage={isAdmin(user) ? items : items.filter(item => item?.borrowable === true)}
        />
      </HStack>
    </div>
  );
};

export default IndexPage;
