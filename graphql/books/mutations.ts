import { gql } from "apollo-boost";

export default {
  addBook: gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
      addBook(name: $name, genre: $genre, authorId: $authorId) {
        id
        name
      }
    }
  `,
  removeBook: gql`
    mutation RemoveBook($id: ID!) {
      removeBook(id: $id) {
        id
        name
      }
    }
  `,
};
