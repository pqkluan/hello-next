import { gql } from "apollo-boost";

export const authorQueries = {
  getAuthors: gql`
    {
      authors {
        id
        name
      }
    }
  `,
  getAuthor: gql`
    query GetAuthor($id: ID!) {
      author(id: $id) {
        id
        name
        age
      }
    }
  `,
  getAuthorWithBook: gql`
    query GetAuthorWithBook($id: ID!) {
      author(id: $id) {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  `,
};

export const authorMutations = {
  addAuthor: gql`
    mutation AddAuthor($name: String!, $age: Int!) {
      addAuthor(name: $name, age: $age) {
        id
        name
        age
      }
    }
  `,
  updateAuthor: gql`
    mutation UpdateAuthor($id: ID!, $name: String!, $age: Int!) {
      updateAuthor(id: $id, name: $name, age: $age) {
        id
        name
        age
      }
    }
  `,
};
