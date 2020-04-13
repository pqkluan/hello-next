import React from "react";
import Router from "next/router";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { mutations, queries } from "../../graphql";

interface Author {
  id: string;
  name: string;
  age: number;
}

function EditAuthorForm(props: { author: Author }) {
  const { author } = props;
  const [name, setName] = React.useState<string>(author.name);
  const [age, setAge] = React.useState<number>(author.age);

  const [updateAuthor, updateAuthorResult] = useMutation(
    mutations.author.updateAuthor
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<EventTarget>) => {
      // Block page reload
      e.preventDefault();

      if (!name) return alert("Missing author name");
      if (!age) return alert("Missing author age");

      updateAuthor({ variables: { id: author.id, name, age } }).then(
        (result) => {
          const id = result?.data?.updateAuthor?.id;
          if (!id) return;
          Router.push("/authors/" + id);
        }
      );
    },
    [name, age]
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>{"Edit author"}</h3>

        <div className="field">
          <label>{"Author name"}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>{`Age - ${age}`}</label>
          <input
            type="range"
            min="18"
            max="100"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        <button>{updateAuthorResult.loading ? "Updating" : "Submit"}</button>
        {!!updateAuthorResult.error && (
          <p>{JSON.stringify(updateAuthorResult.error)}</p>
        )}
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

export default function EditAuthorFormWrap(props: { authorId: string }) {
  const { authorId } = props;
  const { loading, error, data } = useQuery<{ author: Author }>(
    queries.author.getAuthor,
    { variables: { id: authorId } }
  );

  return (
    <div>
      {!!loading && <p>{"Loading author details..."}</p>}
      {!!authorId && !!error && (
        <p className={"error"}>{JSON.stringify(error)}</p>
      )}

      {!!data?.author && <EditAuthorForm author={data.author} />}

      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
}
