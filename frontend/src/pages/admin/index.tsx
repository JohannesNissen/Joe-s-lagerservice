import {
  Center,
  Container,
  Heading,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import PageHeader from "components/LagerService/PageHeader";
import useItemContext from "contexts/useItemContext";
import useNotificationContext from "contexts/useNotificationContext";
import useUserContext from "contexts/useUserContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { UserRole } from "services/backend/client.generated";

const TABLE_HEADERS = [
  { name: "Display name", id: "Name" },
  { name: "Email", id: "Email date" },
  { name: "Role", id: "Role" },
  { name: "Teamlead", id: "Lead" }
];

const IndexPage: NextPage = () => {
  const { items, fetchItems, saveNewItem } = useItemContext();
  const { users, fetchAllUsers } = useUserContext();
  const { notifications, getNotifications } = useNotificationContext();

  const router = useRouter();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const displayNotifocations = useCallback(() => {
    setShowNotifications(!showNotifications);
  }, [showNotifications]);

  const showProfile = useCallback(
    (id: number) => {
      router.push(`/profile/${id}`);
    },
    [router]
  );

  return (
    <div style={{ position: "relative" }}>
      <PageHeader toggleNotifications={displayNotifocations} sizeMultiplier={1} />
      <Center pt={5}>
        <Heading>Registered Users</Heading>
      </Center>
      <Container mt="2rem" maxW="container.xl" border="1px black">
        <Table variant="simple" size="md">
          <TableCaption>Registered users</TableCaption>
          <Thead>
            <Tr>
              {TABLE_HEADERS.map(({ name, id }) => {
                return (
                  <Th
                    background={"gray.200"}
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
                      <Text textTransform={"capitalize"} flex="1" fontWeight={900} fontSize="md">
                        {name}
                      </Text>
                    </Stack>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index) => (
              <React.Fragment key={index}>
                <Tr
                  onClick={() => showProfile(user.id)}
                  cursor="pointer"
                  _hover={{ bgColor: "gray.50" }}>
                  <Td _hover={{ textDecoration: "underline" }}>{user.name}</Td>
                  <Td _hover={{ textDecoration: "underline" }}>
                    <Text>{user.email}</Text>
                  </Td>
                  <Td textAlign="center">{UserRole[user.userRole]}</Td>
                  <Td textAlign="center" isNumeric>
                    {12}
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Container>
    </div>
  );
};

export default IndexPage;
