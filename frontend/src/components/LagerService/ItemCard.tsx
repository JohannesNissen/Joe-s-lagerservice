import { Box, Button, Center, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import React from "react";
import { ItemIdDto } from "services/backend/client.generated";

type Props = {
  item: ItemIdDto;
};

const ItemCard: FC<Props> = ({ item }) => {
  const router = useRouter();

  return (
    <Center py={6}>
      <Stack
        margin="10px"
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "20rem" }}
        height={{ sm: "376px", md: "20rem" }}
        direction={{ base: "row", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={5}>
        <Stack flex={1} flexDirection="column" justifyContent="start" alignItems="center">
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {item.name}
          </Heading>
          <Box borderWidth="1px" borderRadius="lg" width="80%" height="60%">
            Image goes here
          </Box>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {`Total amount: ${item.totalInStock}`}
          </Text>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {`Amount in use: ${item.amountLentOut + item.usedInOffice}`}
          </Text>
          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              color={"#222330"}
              onClick={() => router.push(`/gallery/${item.id}/`)}>
              Redigér
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
};

export default ItemCard;
