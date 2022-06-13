import { Avatar, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

type Props = {
  sizeMultiplier?: number;
  frontPage?: boolean;
  invert?: boolean;
};

const HEADERSIZE = {
  1: "lg",
  2: "xl"
};

const PageHeader: FC<Props> = ({ sizeMultiplier = 1, invert, frontPage }) => {
  const [showButton, setShowButton] = useState<boolean>(true);

  const router = useRouter();
  const path = router.asPath;

  if (!frontPage)
    return (
      <React.Fragment>
        <Stack direction="row" mt="1rem" mb="3rem" border="2px black">
          <Stack flex={1} direction="row" justify="center" align="center">
            <Heading
              color={invert ? "White" : "Black"}
              size={HEADERSIZE[sizeMultiplier]}
              cursor="pointer"
              onClick={() => router.push("/")}>
              Easy storage
            </Heading>
          </Stack>
          <Stack flex={4} direction="row" justify="flex-start" align="center"></Stack>

          <Stack flex={1}>
            <Avatar name="Test User" />
          </Stack>
        </Stack>
        {/* <Box height={"2px"} width="auto" borderWidth={"1px"} /> */}
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <Stack direction="row" my="3rem"></Stack>
        <Stack flex={4} direction="row" justify="flex-start" align="center"></Stack>
        <Stack flex={1} direction="row" justify="center" align="center">
          <Heading
            color={invert ? "White" : "Black"}
            size={HEADERSIZE[sizeMultiplier]}
            cursor="pointer"
            onClick={() => router.push("/")}>
            Easy storage
          </Heading>
          <Stack flex={1}>
            <Avatar name="Test User" />
          </Stack>
        </Stack>
        {/* <Box height={"2px"} width="auto" borderWidth={"1px"} /> */}
      </React.Fragment>
    );
};

export default PageHeader;
