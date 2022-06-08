import { Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  sizeMultiplier?: number;
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

const PageHeader: FC<Props> = ({ sizeMultiplier = 1, invert }) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Stack direction="row">
        <Stack flex={1}></Stack>
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
      </Stack>
    </React.Fragment>
  );
};

export default PageHeader;
