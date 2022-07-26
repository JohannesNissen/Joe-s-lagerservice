import { Container, HStack } from "@chakra-ui/react";
import NotificationsComponent from "components/LagerService/NotificationsComponent";
import PageHeader from "components/LagerService/PageHeader";
import useItemContext from "contexts/useItemContext";
import useNotificationContext from "contexts/useNotificationContext";
import useUserContext from "contexts/useUserContext";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";

type Props = {
  userId: string;
};

const IndexPage: NextPage<Props> = ({ userId }) => {
  const { items, fetchItems, saveNewItem } = useItemContext();
  const { notifications, getNotifications } = useNotificationContext();
  const { user, fetchUserProfile } = useUserContext();

  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetchUserProfile(parseInt(userId)).then(() => {
      getNotifications(1);
      setDone(true);
    });
  }, [fetchUserProfile, getNotifications, userId]);

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const displayNotifocations = useCallback(() => {
    setShowNotifications(!showNotifications);
  }, [showNotifications]);

  return !done ? (
    <Container centerContent={true}>
      <ReactLoading type="balls" color="#0000FF" height={400} width={200} />
    </Container>
  ) : (
    <React.Fragment>
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
        {notifications && (
          <NotificationsComponent
            notifications={notifications}
            width={20}
            show={showNotifications}
          />
        )}
      </HStack>
    </React.Fragment>
  );
};

export default IndexPage;

IndexPage.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { userId: id as string };
};
