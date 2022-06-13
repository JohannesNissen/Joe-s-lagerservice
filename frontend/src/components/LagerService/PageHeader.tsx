import { Avatar, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  sizeMultiplier?: number;
  frontPage?: boolean;
  invert?: boolean;
};

const HEADERSIZE = {
  1: "lg",
  2: "xl",
  3: "2xl",
  4: "3xl",
  5: "4xl",
  10: "9xl"
};

const PageHeader: FC<Props> = ({ sizeMultiplier = 1, invert, frontPage }) => {
  const router = useRouter();

  if (!frontPage)
    return (
      <>
        <Stack
          position="sticky"
          top="0"
          direction="row"
          pt="1rem"
          mb="2rem"
          pb="1rem"
          borderBottomWidth="2px"
          bgColor="gray.100">
          <Stack justify="center" align="center" flex={1}>
            <Heading
              color={invert ? "White" : "Black"}
              size={HEADERSIZE[sizeMultiplier]}
              cursor="pointer"
              onClick={() => router.push("/")}>
              Easy storage
            </Heading>
          </Stack>
          <Stack flex={5} direction="row"></Stack>

          <Stack flex={1} align="center">
            <Avatar name="Test User" />
          </Stack>
        </Stack>
      </>
    );
  else
    return (
      <>
        <Stack direction="row" my="3rem"></Stack>
        <Stack flex={4} direction="row" justify="center" align="center">
          <Heading
            color={invert ? "whitesmoke" : "Black"}
            fontSize={HEADERSIZE[sizeMultiplier]}
            cursor="pointer"
            onClick={() => router.push("/")}>
            Easy storage
          </Heading>
        </Stack>
        <Stack flex={1}></Stack>
      </>
    );
};

export default PageHeader;
