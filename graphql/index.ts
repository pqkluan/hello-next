export { default as client } from "./client";

import { authorMutations, authorQueries } from "./Author";
import { bookMutations, bookQueries } from "./Book";

export const queries = {
  author: authorQueries,
  book: bookQueries,
};

export const mutations = {
  author: authorMutations,
  book: bookMutations,
};
