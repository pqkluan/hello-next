import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { mutations, queries } from "../../graphql";

function AuthorOptions() {
  const { loading, error, data } = useQuery(queries.books.getAuthors);

  if (error) return <option>{"Error:" + JSON.stringify(error)}</option>;
  if (loading) return <option>{"Loading"}</option>;
  if (data?.authors?.length === 0) return <option>{"No author"}</option>;

  return data?.authors?.map((author: any) => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  ));
}

export default function AddBook() {
  const [name, setName] = React.useState<string>();
  const [genre, setGenre] = React.useState<string>();
  const [authorId, setAuthorId] = React.useState<string>();

  const [addBook, addBookResult] = useMutation(mutations.books.addBook);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<EventTarget>) => {
      // Block page reload
      e.preventDefault();

      if (!name) return alert("Missing book name");
      if (!genre) return alert("Missing book genre");
      if (!authorId) return alert("No selected author");

      addBook({
        variables: { name, genre, authorId },
        refetchQueries: [{ query: queries.books.getBooks }],
      });
    },
    [name, genre, authorId]
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>{"Add new book"}</h3>

        <div className="field">
          <label>{"Book name:"}</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="field">
          <label>{"Genre:"}</label>
          <input type="text" onChange={(e) => setGenre(e.target.value)} />
        </div>

        <div className="field">
          <label>{"Author:"}</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
            <option>{"Select author"}</option>
            <AuthorOptions />
          </select>
        </div>

        <button>{addBookResult.loading ? "Processing" : "Submit"}</button>
        {!!addBookResult.error && <p>{"Error: " + addBookResult.error}</p>}
      </form>

      <style jsx>{`
        h3 {
          margin-top: 0px;
        }

        form {
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          padding: 16px;
          margin-top: 16px;
          max-width: 400px;
        }

        form .field {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 8px;
        }

        form label {
          text-align: "right";
          padding: 8px;
        }

        form select,
        form input {
          margin: 4px;
          padding: 8px;
          box-sizing: border-box;
        }

        form button {
          font-size: 1em;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
