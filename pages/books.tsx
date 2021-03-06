import React from "react";
import Head from "next/head";

import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "../graphql";

import PageLayout from "../components/PageLayout";
import { AddBook, BookList } from "../components/books";

export default function BooksPage() {
  return (
    <PageLayout>
      <Head>
        <title>{"Books Management"}</title>
      </Head>

      <ApolloProvider client={client}>
        <BookList />
        <AddBook />
      </ApolloProvider>

      <style jsx>{`
        h1 {
          padding: 0;
        }
      `}</style>
    </PageLayout>
  );
}
