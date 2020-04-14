import fetch from "isomorphic-unfetch";

import ApolloClient from "apollo-boost";

const uri =
  process.env.NODE_ENV === "production"
    ? "https://pqkluan-hello-graphql.herokuapp.com/"
    : "http://localhost:4000/";

export default new ApolloClient({
  uri,
  fetch,
});
