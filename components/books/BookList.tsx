import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../graphql";
import BookDetails from "./BookDetails";

interface Book {
  id: string;
  name: string;
}

function BookItem(props: {
  book: Book;
  selected: boolean;
  onClick: (id: string) => void;
}) {
  const { book, selected, onClick } = props;

  const _onClick = React.useCallback(() => onClick(book.id), [book.id]);

  return (
    <li key={book.id} onClick={_onClick}>
      {book.name}
      <style jsx>{`
        li {
          display: inline-block;
          margin: 8px;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid cornflowerblue;
          cursor: pointer;
        }
        li:hover {
          background: cornflowerblue;
          color: white;
          opacity: 0.8;
        }
      `}</style>

      <style jsx>{`
        li {
          color: ${selected ? "white" : "cornflowerblue"};
          background: ${selected ? "cornflowerblue" : "white"};
        }
      `}</style>
    </li>
  );
}

export default function BookList() {
  const { loading, error, data } = useQuery<{
    books: { id: string; name: string }[];
  }>(queries.books.getBooks);
  const [selectedBookId, setSelectedBookId] = React.useState<string>("");

  React.useEffect(() => {
    if (!data?.books.some((b) => b.id === selectedBookId)) {
      setSelectedBookId(data?.books?.[0]?.id || "");
    }
  }, [data?.books.length]);

  const onItemClick = React.useCallback((id: string) => setSelectedBookId(id), [
    setSelectedBookId,
  ]);

  if (error) return <p>{"Error: " + error}</p>;
  if (loading) return <p>{"Loading"}</p>;
  if (data?.books?.length === 0) return <p>{"There is no data"}</p>;

  return (
    <>
      <div className={"some_place"}>
        <div className={"column1"}>
          <h1>{"Books"}</h1>

          <ul>
            {data?.books?.map((book: any) => (
              <BookItem
                key={book.id}
                book={book}
                selected={book.id === selectedBookId}
                onClick={onItemClick}
              />
            ))}
          </ul>
        </div>

        <div className={"column2"}>
          {!!selectedBookId && <BookDetails bookId={selectedBookId} />}
        </div>
      </div>

      <style jsx>{`
        .some_place {
          display: flex;
        }

        .column1 {
          flex: 50%;
        }

        .column2 {
          flex: 50%;
          border: 1px solid cornflowerblue;
          border-radius: 5px;
          margin-top: 16px;
          padding-left: 16px;
          padding-right: 16px;
          padding-bottom: 16px;
        }

        ul {
          padding: 0;
        }
      `}</style>
    </>
  );
}
