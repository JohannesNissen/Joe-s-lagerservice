import { Avatar, Heading, Image, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  sizeMultiplier?: number;
  frontPage_styling?: boolean;
  frontPage?: boolean;
  invert?: boolean;
};

const HEADERSIZE = {
  0: "md",
  1: "lg",
  2: "xl",
  3: "2xl",
  4: "3xl",
  5: "4xl",
  6: "5xl",
  7: "6xl",
  8: "7xl",
  9: "8xl",
  10: "9xl"
};

const FRONTPAGE_STYLE = {
  "-webkit-text-stroke": "2px black"
};

const PageHeader: FC<Props> = ({
  sizeMultiplier = 1,
  invert,
  frontPage,
  frontPage_styling = false
}) => {
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

          <Stack direction="row" flex={1} pr="1rem" justify="flex-end">
            <Image
              cursor="pointer"
              alt=""
              boxSize="3.5rem"
              fill="blue.200"
              src="/images/NotificationBell/Blue.svg"
            />
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
            textShadow={frontPage_styling ? "3px 3px black" : ""}
            filter="auto"
            backdropFilter="auto"
            backdropBlur={"30%"}
            sx={frontPage_styling ? FRONTPAGE_STYLE : {}}
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
