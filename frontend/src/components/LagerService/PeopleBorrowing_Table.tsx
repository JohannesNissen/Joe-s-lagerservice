import { Stack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { BorrowedItem } from "services/backend/client.generated";

const TABLE_HEADERS = [
  { name: "Medarbejder", id: "Name" },
  { name: "Udlånt den", id: "start date" },
  { name: "Afleveres tilbage senest", id: "Expiring date" },
  { name: "Mængde", id: "Amount" }
];

type Props = {
  PeopleBorrowing?: BorrowedItem[];
};

const PeopleBorrowing: FC<Props> = ({ PeopleBorrowing }) => {
  return (
    <React.Fragment>
      <Table variant="simple" size="sm" maxW="30%">
        <TableCaption>These poeple have borrowed this item</TableCaption>
        <Thead>
          <Tr>
            {TABLE_HEADERS.map(({ name, id }) => {
              return (
                <Th
                  background={"gray.100"}
                  cursor="pointer"
                  textAlign={name == "Titel" ? "left" : "center"}
                  key={id}
                  _hover={{ borderBottom: "solid 1px" }}>
                  <Stack
                    direction="row"
                    align="center"
                    _hover={{
                      color: "drupalBlue.100"
                    }}>
                    <Text>{name}</Text>
                  </Stack>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {PeopleBorrowing?.map((person, index) => (
            <React.Fragment key={index}>
              <Tr>
                <Td cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  <Text>{person.user.email}</Text>
                </Td>
                <Td textAlign="center">{person.startDate}</Td>
                {/* <Tooltip label={event.path}>
                <Td cursor="pointer" textAlign="center" onClick={() => router.push(event.path)}>
                  <Text>Link</Text>
                </Td>
                </Tooltip> */}
                <Td textAlign="center">{person.expirationDate}</Td>
                <Td textAlign="center">{person.amount}</Td>
                {/* <Td textAlign="center">
                <Flex>
                  <Button
                    flex={1}
                    fontSize={"sm"}
                    color={"#222330"}
                    onClick={() => router.push(`/events/edit/${event.languageCode}/${event.id}`)}>
                    Redigér
                  </Button>
                </Flex> 
                </Td>);*/}
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export default PeopleBorrowing;
