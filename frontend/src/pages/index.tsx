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
import React, { useCallback, useState } from "react";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const [, setEmail] = useState<string>("");
  const [, setPassword] = useState<string>("");

  const Login = useCallback(() => {
    router.push(`/gallery/`);
  }, [router]);

  //TODO: BackGrounds for input fields must be white when focused, and some other meaningful color when not

  return (
    <Container
      height="100vh"
      padding={"3vh"}
      maxW="1x1"
      bgGradient="linear(to-b, navi.500, navi.900)">
      <PageHeader sizeMultiplier={8} invert frontPage_styling frontPage />
      <HStack justify={"center"} height="70vh">
        <VStack
          px="5vw"
          py="5vh"
          bgColor={"whiteAlpha.100"}
          width="25vw"
          minW="500px"
          align={"flex-start"}
          boxShadow="md"
          borderRadius={"10px"}>
          <Stack flex={2} />
          <Stack flex={4} width="100%" direction={"column"} align={"flex-start"} fontSize="lg">
            <FormControl>
              <FormLabel color={"whitesmoke"}>Email</FormLabel>
              <Input
                type="email"
                backgroundColor={"white"}
                _focus={{
                  border: "1px black"
                }}
                placeholder="larsen.lars@gmail.com"
                _placeholder={{
                  opacity: 0.75,
                  color: "gray.300"
                }}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <LineBreak breaks={1} />
            <FormControl>
              <FormLabel color={"whitesmoke"}>Password</FormLabel>
              <Input
                type="password"
                backgroundColor={"white"}
                _focus={{
                  border: "1px black"
                }}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <LineBreak />
            <Button onClick={Login} alignSelf="center" width={"50%"} colorScheme="green">
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
