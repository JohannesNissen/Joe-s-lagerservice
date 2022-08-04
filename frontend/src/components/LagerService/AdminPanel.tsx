import {
  Container,
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
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect } from "react";
import { UserIdDto, UserRole } from "services/backend/client.generated";

const TABLE_HEADERS = [
  { name: "Display name", id: "Name" },
  { name: "Email", id: "Email date" },
  { name: "Role", id: "Role" },
  { name: "Teamlead", id: "Lead" }
];

type Props = {
  users: UserIdDto[];
  fetchAllUsers: () => Promise<void>;
};

const AdminPanl: FC<Props> = ({ users, fetchAllUsers }) => {
  const router = useRouter();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const showProfile = useCallback(
    (id: number) => {
      router.push(`/profile/${id}`);
    },
    [router]
  );

  return (
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
  );
};

export default AdminPanl;
