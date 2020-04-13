import fetch from "isomorphic-unfetch";

import ApolloClient from "apollo-boost";

const uri =
  process.env.NODE_ENV === "production"
    ? "https://whispering-coast-31341.herokuapp.com/graphql"
    : "http://localhost:4000/";

export default new ApolloClient({
  uri,
  fetch,
});
