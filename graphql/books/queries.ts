import { gql } from "apollo-boost";

export default {
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
        books {
          id
          name
        }
      }
    }
  `,
};
