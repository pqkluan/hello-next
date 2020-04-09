import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../graphql";
import RemoveBookButton from "./RemoveBookButton";

interface Book {
  id: string;
  name: string;
  genre: string;
  author: {
    name: string;
    books: {
      id: string;
      name: string;
    }[];
  };
}

function BookContent(props: { book?: Book }) {
  const { book } = props;

  if (!book) return <p>{"No book selected"}</p>;

  const otherBooks = React.useMemo(() => {
    return book.author.books.filter((b) => b.id !== book.id);
  }, [book.author.books]);

  return (
    <>
      <h2>{book.name}</h2>
      <p>
        <b>{"Genre: "}</b>
        {book.genre}
      </p>
      <p>
        <b>{"Author: "}</b>
        {book.author.name}
      </p>

      {otherBooks.length !== 0 && (
        <>
          <p>{`Other book${
            otherBooks.length > 1 ? "s" : ""
          } by this author`}</p>
          <ul className={"other-books"}>
            {otherBooks.map((b: { id: string; name: string }) => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        </>
      )}

      <RemoveBookButton bookId={book.id} />

      <style jsx>{`
         {
          h2 {
            font-weight: bold;
            color: cornflowerblue;
          }
        }
      `}</style>
    </>
  );
}

export default function BookDetails(props: { bookId: string }) {
  const { bookId } = props;
  const { loading, error, data } = useQuery<{ book: Book }>(
    queries.books.getBook,
    { variables: { id: bookId } }
  );

  return (
    <div>
      {!!loading && <p>{"Loading book details..."}</p>}
      {!!bookId && !!error && <p className={"error"}>{"Error: " + error}</p>}

      <BookContent book={data?.book} />

      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
}
