import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import NotificationsComponent from "components/LagerService/NotificationsComponent";
import PageHeader from "components/LagerService/PageHeader";
import ReviewBorrowRequest from "components/LagerService/ReviewBorrowRequest";
import { ItemContext } from "contexts/ItemContext";
import { NotificationContext } from "contexts/notificationContext";
import { UserContext } from "contexts/UserContext";
import { NextPage } from "next";
import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { BorrowedItemDto, BorrowedStatus } from "services/backend/client.generated";

const HEADERS = [
  { name: "Item", id: "item" },
  { name: "Amount", id: "amount" },
  { name: "Start of period", id: "Start" },
  { name: "End of period", id: "end" }
];

type Props = {
  userId: string;
};

const IndexPage: NextPage<Props> = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { items, fetchItems, saveNewItem, reviewBorrowRequest } = useContext(ItemContext);
  const { notifications, getNotifications } = useContext(NotificationContext);
  const { user, userProfile, fetchUserProfile } = useContext(UserContext);

  const [reviewRequest, setReviewedRequest] = useState<BorrowedItemDto>({});

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [dateTod, setDateTod] = useState<Date>(new Date());
  // const [timeFrom, setTimeFrom] = useState("");
  // const [timeTo, setTimeTo] = useState("");

  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetchUserProfile(parseInt(userId)).then(() => {
      setDone(true);
    });
    getNotifications(parseInt(userId));
  }, [fetchUserProfile, getNotifications, userId]);

  const openReviewModal = useCallback(
    (request: BorrowedItemDto) => {
      setReviewedRequest(request);
      const resolvedFromDate = new Date(request.startDate);
      dateFrom.setFullYear(
        resolvedFromDate.getFullYear(),
        resolvedFromDate.getMonth(),
        resolvedFromDate.getDate()
      );
      const resolvedToDate = new Date(request.expirationDate);
      dateTo.setFullYear(
        resolvedToDate.getFullYear(),
        resolvedToDate.getMonth(),
        resolvedToDate.getDate()
      );
      onOpen();
    },
    [dateFrom, dateTo, onOpen]
  );

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
      <PageHeader toggleNotifications={displayNotifocations} sizeMultiplier={1} />
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
      <HStack justify={"center"} width="100%" pr={20}>
        <Heading sx={{ textDecoration: "underline" }} size="2xl">
          {user.name}
        </Heading>
      </HStack>
      <HStack mt="1em" ml="5rem" height="80vh">
        <VStack justify={"space-around"} minW="25%" h="100%" borderWidth={1}>
          <Box position="relative">
            <Image width="300%" height="200%" src="/images/mqdefault.jpg" alt="Juan" />
          </Box>
          <TableContainer width="100%">
            <Table variant="simple" size="lg">
              <Tbody>
                <Tr>
                  <Td>
                    <Text>workMail:</Text>
                  </Td>
                  <Td isNumeric>{userProfile.email}</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text>Telefon:</Text>
                  </Td>
                  <Td isNumeric>{userProfile.email}</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text>Team lead</Text>
                  </Td>
                  <Td isNumeric>{userProfile.teamLead}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Stack flex={3} />
        </VStack>
        <VStack w="70%" h="100%" align={"flex-start"}>
          <Accordion allowToggle w="100%">
            <AccordionItem>
              <AccordionButton fontSize="2xl">
                <Box textAlign="left">BorrowedItems</Box>
                <Spacer />
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                {userProfile.borrowedItems.filter(item => item.status == BorrowedStatus.Accepted)
                  .length > 0 ? (
                  <TableContainer width="100%">
                    <Table variant="simple" size="md">
                      <Thead>
                        <Tr>
                          {HEADERS.map(({ name, id }) => {
                            return (
                              <Th
                                background="navi.200"
                                cursor="pointer"
                                pl="3"
                                pr="3"
                                textAlign={name == "Titel" ? "left" : "center"}
                                key={id}
                                _hover={{ borderBottom: "solid 1px" }}>
                                <Stack
                                  direction="row"
                                  align="center"
                                  _hover={{
                                    color: "blue.300"
                                  }}>
                                  <Text
                                    textTransform={"capitalize"}
                                    flex="1"
                                    fontWeight={700}
                                    fontSize="md">
                                    {name}
                                  </Text>
                                </Stack>
                              </Th>
                            );
                          })}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {userProfile.borrowedItems
                          .filter(item => item.status == BorrowedStatus.Accepted)
                          ?.map((item, index) => (
                            <React.Fragment key={index}>
                              <Tr cursor="pointer" _hover={{ bgColor: "gray.50" }}>
                                <Td _hover={{ textDecoration: "underline" }}>{item.item}</Td>
                                <Td _hover={{ textDecoration: "underline" }}>
                                  <Text>{item.amount}</Text>
                                </Td>
                                <Td textAlign="center">{item.startDate}</Td>
                                <Td textAlign="center" isNumeric>
                                  {item.expirationDate}
                                </Td>
                              </Tr>
                            </React.Fragment>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Center>
                    <Text>There is no items registered borrowed</Text>
                  </Center>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion allowToggle w="100%">
            <AccordionItem>
              <AccordionButton fontSize="2xl">
                <Box textAlign="left">Pending requests</Box>
                <Spacer />
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <React.Fragment>
                  <TableContainer width="100%">
                    <Table variant="simple" size="md">
                      <Thead>
                        <Tr>
                          {HEADERS.map(({ name, id }) => {
                            return (
                              <Th
                                background="navi.200"
                                cursor="pointer"
                                pl="3"
                                pr="3"
                                textAlign={name == "Titel" ? "left" : "center"}
                                key={id}
                                _hover={{ borderBottom: "solid 1px" }}>
                                <Stack
                                  direction="row"
                                  align="center"
                                  _hover={{
                                    color: "blue.300"
                                  }}>
                                  <Text
                                    textTransform={"capitalize"}
                                    flex="1"
                                    fontWeight={700}
                                    fontSize="md">
                                    {name}
                                  </Text>
                                </Stack>
                              </Th>
                            );
                          })}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {userProfile.borrowedItems
                          .filter(item => item.status == BorrowedStatus.Requested)
                          ?.map((item, index) => (
                            <React.Fragment key={index}>
                              <Tr
                                cursor="pointer"
                                _hover={{ bgColor: "gray.50" }}
                                onClick={() => openReviewModal(item)}>
                                <Td _hover={{ textDecoration: "underline" }}>{item.item}</Td>
                                <Td _hover={{ textDecoration: "underline" }}>
                                  <Text>{item.amount}</Text>
                                </Td>
                                <Td textAlign="center">{item.startDate}</Td>
                                <Td textAlign="center" isNumeric>
                                  {item.expirationDate}
                                </Td>
                              </Tr>
                            </React.Fragment>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </React.Fragment>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </HStack>
      <ReviewBorrowRequest
        request={reviewRequest}
        isOpen={isOpen}
        onClose={onClose}
        setReviewedRequest={setReviewedRequest}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        dated={dateTo}
        setDated={setDateTo}
        onReview={reviewBorrowRequest}
      />
    </React.Fragment>
  );
};

export default IndexPage;

IndexPage.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { userId: id as string };
};
