import { gql } from "apollo-boost";

export const bookQueries = {
  getBooks: gql`
    {
      books {
        id
        name
        genre
      }
    }
  `,
  getBook: gql`
    query GetBook($id: ID!) {
      book(id: $id) {
        id
        name
        genre
        author {
          name
          age
          books {
            id
            name
          }
        }
      }
    }
  `,
};

export const bookMutations = {
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
