import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import ModalEditItem from "components/LagerService/ModalEditItem";
import ModalSubmitBorrowRequest from "components/LagerService/ModalSubmitBorrowRequest";
import PageHeader from "components/LagerService/PageHeader";
import UploadImageModal from "components/LagerService/UploadImageModal";
import { ImageContext } from "contexts/ImageContext";
import { ItemContext } from "contexts/ItemContext";
import { NotificationContext } from "contexts/notificationContext";
import { UserContext } from "contexts/UserContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { isAdmin } from "utils/isAdmin";

const ItemDetails: NextPage = () => {
  const { fetchItemDetails, EditItem, itemDetails, setItemDetails, submitRequestToBorrowNewItem } =
    useContext(ItemContext);
  const { user } = useContext(UserContext);
  const { notifications } = useContext(NotificationContext);
  const { uploadImage } = useContext(ImageContext);
  const router = useRouter();
  const { id } = router.query;

  const [itemId, setItemId] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!id) return;
    const itemId = parseInt(id?.toString());
    setItemId(itemId);
    fetchItemDetails(itemId);
  }, [fetchItemDetails, id]);

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const displayNotifocations = useCallback(() => {
    setShowNotifications(!showNotifications);
  }, [showNotifications]);

  return (
    <div style={{ position: "relative" }}>
      <PageHeader
        toggleNotifications={displayNotifocations}
        sizeMultiplier={1}
        pageTitle="Details"
      />
      <HStack mt="2em" ml="5rem" height="90vh">
        <VStack justify={"flex-start"} minW="25%" width={"min-content"} h="100%">
          <Box mt="2rem" position="relative">
            <UploadImageModal
              title="Upload billede"
              buttonName="Upload billede"
              buttonColor="blue.400"
              onSubmit={uploadImage}
              galleryId={itemId}
            />
          </Box>
          <Text>
            {itemDetails?.borrowable ? "This item can be borrowed" : "This item cannot be borrowed"}
          </Text>
        </VStack>
        <VStack w="60%" h="100%" align={"center"} justify={"space-between"}>
          <HStack justify={"center"} width="100%">
            <Heading as="i" size="2xl" mt={"0.5rem"} fontWeight={500}>
              {itemDetails?.name}
            </Heading>
          </HStack>
          <Stack flex={1} />

          <Grid
            w="80%"
            h="100px"
            templateColumns="repeat(7, 1fr)"
            templateRows="repeat(2, 1fr)"
            rowGap={4}>
            <GridItem colSpan={2} pl={2} borderBottomWidth={1}>
              <Text>I alt i virksomheden</Text>
            </GridItem>
            <GridItem colSpan={1} pl={2} borderBottomWidth={1}>
              {itemDetails?.totalInStock}
            </GridItem>
            <GridItem colStart={5} pl={2} colSpan={2} borderBottomWidth={1}>
              Antal brugt på konteret
            </GridItem>
            <GridItem colSpan={1} pl={2} borderBottomWidth={1}>
              {itemDetails?.usedInOffice}
            </GridItem>
            <GridItem colSpan={2} pl={2} borderBottomWidth={1}>
              <Text>Antal lånt ud</Text>
            </GridItem>
            <GridItem colSpan={1} pl={2} borderBottomWidth={1}>
              {itemDetails?.amountLentOut}
            </GridItem>
            <GridItem colStart={5} pl={2} colSpan={2} borderBottomWidth={1}>
              Antal tilgængligt
            </GridItem>
            <GridItem colSpan={1} pl={2} borderBottomWidth={1}>
              {itemDetails?.amountAvailable}
            </GridItem>
          </Grid>
          <Stack flex={2} />
          <Box padding={5} width="80%" height={"45%"} borderWidth={1} mb={"1.5rem"} ml="rem">
            {ReactHtmlParser(itemDetails?.description)}
          </Box>
          <Flex align="flex-start" direction="row" wrap="wrap" gap={"15px"}>
            {isAdmin(user) && (
              <ModalEditItem
                setItemDetails={setItemDetails}
                onSave={EditItem}
                itemDetails={itemDetails}
                itemId={itemId}
              />
            )}
            {itemDetails.borrowable && (
              <ModalSubmitBorrowRequest itemId={itemId} onSubmit={submitRequestToBorrowNewItem} />
            )}
          </Flex>

          <Stack flex={3} />
        </VStack>
      </HStack>
    </div>
  );
};

export default ItemDetails;
