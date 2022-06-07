import { Box, Container, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import PeopleBorrowing from "components/LagerService/PeopleBorrowing_Table";
import useItemContext from "contexts/useItemContext";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
          <HStack justify="center" w="100%" background={"gray.200"} justifyContent="center">
            {/* <Text textTransform={"capitalize"} fontWeight={700} fontSize="md">
              These poeple have borrowed this item
            </Text> */}
          </HStack>
          <Text>{itemDetails.totalInStock}</Text>
          <Text>{itemDetails.usedInOffice}</Text>
          <Text>{itemDetails.amountLentOut}</Text>
        </Flex>
      </VStack>
      <VStack w="60%" h="100%" borderWidth={1}>
        <Heading as="i" size="2xl" mr="10rem" fontWeight={500}>
          {itemDetails.name}
        </Heading>
        <Container
          pt="3rem"
          justifyContent="start"
          borderWidth={1}
          alignSelf="start"
          maxW="container.md">
          <PeopleBorrowing PeopleBorrowing={itemDetails.borrowedItems} />
        </Container>
      </VStack>
    </HStack>
  );
};

export default ItemDetails;
