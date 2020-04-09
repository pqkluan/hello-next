import { booksMutations, booksQueries } from "./books";

export const mutations = {
  books: booksMutations,
};

export const queries = {
  books: booksQueries,
};
