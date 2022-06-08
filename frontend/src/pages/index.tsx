import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  VStack
} from "@chakra-ui/react";
import LineBreak from "components/Common/LineBreak";
import PageHeader from "components/LagerService/PageHeader";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { I18nProps } from "next-rosetta";
import React, { useCallback } from "react";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const Login = useCallback(() => {
    router.push(`/gallery/`);
  }, [router]);

  //TODO: BackGrounds for input fields must be white when focused, and some other meaningful color when not

  return (
    <Container
      height="100vh"
      padding={"10rem"}
      maxW="1x1"
      bgGradient="linear(to-t, blue.400, blue.600)">
      <PageHeader sizeMultiplier={10} invert />
      <HStack justify={"center"} height="70vh">
        <VStack width="25vw" align={"flex-start"}>
          <Stack flex={2} />
          <Stack flex={4} width="100%">
            <FormControl color={"whitesmoke"} fontSize="lg">
              <FormLabel color={"whitesmoke"} fontSize="lg">
                Email
              </FormLabel>
              <Input type="email" />
            </FormControl>
            <LineBreak breaks={2} />
            <FormControl color={"whitesmoke"} fontSize="lg">
              <FormLabel color={"whitesmoke"} fontSize="lg">
                Password
              </FormLabel>
              <Input type="password" />
            </FormControl>
            <LineBreak />
            <Button onClick={Login} type="submit" colorScheme="teal">
              Login
            </Button>
          </Stack>
          <Stack flex={1} />
        </VStack>
      </HStack>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../i18n/${locale}`);

  return {
    props: { table }
  };
};

export default IndexPage;
// export default withAuth(IndexPage, { authSkip: true });
