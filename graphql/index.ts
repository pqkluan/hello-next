import { booksMutations, booksQueries } from "./books";

export const mutations = {
  books: booksMutations,
};

export const queries = {
  books: booksQueries,
};

export { default as client } from "./client";
