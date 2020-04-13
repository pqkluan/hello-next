import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";

import { queries } from "../../graphql";

interface Author {
  id: string;
  name: string;
}

function AuthorItem(props: { author: Author }) {
  const { author } = props;

  return (
    <li>
      <Link href={"/authors/" + author.id}>
        <a>{author.name}</a>
      </Link>

      <style jsx>{`
        a {
          text-decoration: none;
          color: blue;
        }
      `}</style>
    </li>
  );
}

export default function BookList() {
  const { loading, error, data } = useQuery<{
    authors: Author[];
  }>(queries.author.getAuthors);

  if (error) return <p>{error}</p>;
  if (loading) return <p>{"Loading"}</p>;
  if (data?.authors?.length === 0) return <p>{"There is no data"}</p>;

  return (
    <>
      <h1>{"Authors"}</h1>

      <ul>
        {data?.authors?.map((author) => (
          <AuthorItem key={author.id} author={author} />
        ))}
      </ul>

      <Link href={"/authors/create"}>
        <button>Add new author</button>
      </Link>

      <style jsx>{`
        button {
          font-size: 1em;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
