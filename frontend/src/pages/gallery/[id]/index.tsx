import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack
} from "@chakra-ui/react";
import PeopleBorrowing from "components/LagerService/PeopleBorrowing_Table";
import useItemContext from "contexts/useItemContext";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

const ItemDetails: NextPage = () => {
  const { fetchItemDetails, itemDetails } = useItemContext();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    const itemId = parseInt(id?.toString());
    fetchItemDetails(itemId);
  }, [fetchItemDetails, id]);
  return (
    <HStack mt="3em" ml="5rem" height="90vh">
      <VStack justify={"space-between"} minW="25%" h="100%" borderWidth={1}>
        <Box mt="5rem" position="relative">
          <Image width="300%" height="200%" src="/images/mqdefault.jpg" alt="Juan" />
        </Box>

        <Flex direction="column" h="50%">
          <Container
            pt="3rem"
            justifyContent="start"
            borderWidth={1}
            alignSelf="start"
            maxW="container.lg">
            <PeopleBorrowing PeopleBorrowing={itemDetails.borrowedItems} />
          </Container>
        </Flex>
      </VStack>
      <VStack w="60%" h="100%" borderWidth={1} align={"flex-start"} justify={"space-between"}>
        <HStack justify={"center"} width="100%">
          <Heading as="i" size="2xl" mt={"1rem"} fontWeight={500}>
            {itemDetails.name}
          </Heading>
        </HStack>
        <TableContainer pl="5rem" width="50%">
          <Table variant="simple" size="lg">
            <Tbody>
              <Tr>
                <Td>
                  <Text>I alt i virksomheden</Text>
                </Td>
                <Td isNumeric>{itemDetails.totalInStock}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text>Antal brugt på konteret</Text>
                </Td>
                <Td isNumeric>{itemDetails.usedInOffice}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text>Antal lånt ud</Text>
                </Td>
                <Td isNumeric>{itemDetails.amountLentOut}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text>Antal tilgængeligt</Text>
                </Td>
                <Td isNumeric>{itemDetails.amountAvailable}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Box padding={5} width="80%" height={"45%"} borderWidth={1} mb={"1.5rem"} ml="rem">
          {ReactHtmlParser(itemDetails.description)}
        </Box>
      </VStack>
    </HStack>
  );
};

export default ItemDetails;
