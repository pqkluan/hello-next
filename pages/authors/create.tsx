import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "../../graphql";
import PageLayout from "../../components/PageLayout";
import { AddAuthorForm } from "../../components/authors";

export default function BooksPage() {
  return (
    <PageLayout>
      <Head>
        <title>{"Create new Author"}</title>
      </Head>

      <ApolloProvider client={client}>
        <AddAuthorForm />
      </ApolloProvider>
    </PageLayout>
  );
}
