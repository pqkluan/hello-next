import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../graphql";

interface Author {
  id: string;
  name: string;
  age: number;
  books: {
    id: string;
    name: string;
  }[];
}

export default function AuthorDetails(props: { authorId: string }) {
  const { authorId } = props;
  const { loading, error, data } = useQuery<{ author: Author }>(
    queries.books.getAuthor,
    { variables: { id: authorId } }
  );

  if (error) return <p>{error}</p>;
  if (loading) return <p>{"Loading"}</p>;
  if (!data?.author)
    return <p>{"No author with this id " + authorId + " was found"}</p>;

  return (
    <>
      <h1>{data.author.name}</h1>

      <h2>{"Age - " + data.author.age}</h2>

      {data.author.books.length > 0 ? (
        <ul>
          {data.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      ) : (
        <p>{"This author has not published any book"}</p>
      )}

      <Link href={"/authors/" + authorId + "/edit"}>
        <button>{"Edit"}</button>
      </Link>
    </>
  );
}
