import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import React from "react";
import { ItemIdDto } from "services/backend/client.generated";

const StatusColors = {
  Plenty: "green.500",
  Empty: "red.500",
  NearEmpty: "orange.500"
};

type Props = {
  item: ItemIdDto;
};

const ItemCard: FC<Props> = ({ item }) => {
  const router = useRouter();

  const accesibilityIconColor = useCallback(() => {
    const amountAvailble = item.totalInStock - item.amountLentOut - item.usedInOffice;
    if (amountAvailble === 0) return StatusColors.Empty;
    if (amountAvailble < 10) return StatusColors.NearEmpty;
    return StatusColors.Plenty;
  }, [item]);

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
          {/* <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {`Total amount: ${item.totalInStock}`}
          </Text> */}
          <HStack pl="1rem" justify={"flex-start"} width="100%">
            <Icon viewBox="0 0 200 200" color={accesibilityIconColor()}>
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {`Amount avaibable: ${item.totalInStock - item.amountLentOut - item.usedInOffice}`}
            </Text>
          </HStack>
          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Button
              colorScheme={"telegram"}
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              color={"#222330"}
              onClick={() => router.push(`/gallery/${item.id}/`)}>
              Info
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
};

export default ItemCard;
