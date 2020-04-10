import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const uri =
  process.env.NODE_ENV === "production"
    ? "https://whispering-coast-31341.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";

// TODO: move to graphql dir
const client = new ApolloClient({
  uri,
  fetch,
});

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
        h1,
        ul {
          padding: 0;
        }
      `}</style>
    </PageLayout>
  );
}
