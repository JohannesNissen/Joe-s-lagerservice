import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { I18nProps } from "next-rosetta";
import React, { useEffect } from "react";

const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/gallery/`);
  }, [router]);

  return <p>Hello World!</p>;
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
