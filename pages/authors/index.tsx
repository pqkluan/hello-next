import React from "react";
import Head from "next/head";

import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "../../graphql";
import PageLayout from "../../components/PageLayout";
import { AuthorList } from "../../components/authors";

export default function BooksPage() {
  return (
    <PageLayout>
      <Head>
        <title>{"Authors"}</title>
      </Head>

      <ApolloProvider client={client}>
        <AuthorList />
      </ApolloProvider>

      <style jsx>{`
        h1 {
          padding: 0;
        }
      `}</style>
    </PageLayout>
  );
}
