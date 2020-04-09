import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { queries, mutations } from "../../graphql";

export default function RemoveButton(props: { bookId: string }) {
  const { bookId } = props;

  const [removeBook, removeResult] = useMutation(mutations.books.removeBook);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<EventTarget>) => {
      // Block page reload
      e.preventDefault();

      removeBook({
        variables: { id: bookId },
        refetchQueries: [{ query: queries.books.getBooks }],
      });
    },
    [bookId]
  );

  return (
    <div onClick={handleSubmit}>
      {removeResult.loading ? "Processing" : "Remove this book"}
      {!!removeResult.error && (
        <p className={"error"}>{"Error: " + removeResult.error}</p>
      )}

      <style jsx>
        {`
          div {
            border: 1px solid red;
            color: red;
            display: inline-block;
            float: right;
            font-size: 0.8em;
            opacity: 0.5;
            padding: 8px;
          }
          div:hover {
            opacity: 0.8;
            background: red;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
