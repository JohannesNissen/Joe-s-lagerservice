import { Container } from "@chakra-ui/react";
import FormWithErrors from "components/Demo/Form/FormWithErrors";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import React from "react";
import { withAuth } from "services/auth/withAuth";

const FormPage: NextPage = () => {
  return (
    <Container size="lg">
      <FormWithErrors />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../../i18n/${locale}`);

  return {
    props: { table }
  };
};

FormPage.displayName = "form demo page";

export default withAuth(FormPage);
