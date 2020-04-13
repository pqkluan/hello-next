import React from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";

import { mutations, queries } from "../../graphql";

export default function AddAuthorForm() {
  const [name, setName] = React.useState<string>();
  const [age, setAge] = React.useState<number>(18);

  const [addAuthor, addAuthorResult] = useMutation(mutations.author.addAuthor);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<EventTarget>) => {
      // Block page reload
      e.preventDefault();

      if (!name) return alert("Missing author name");
      if (!age) return alert("Missing author age");

      addAuthor({ variables: { name, age } }).then((result) => {
        const id = result?.data?.addAuthor?.id;
        if (!id) return;
        Router.push("/authors/" + id);
      });
    },
    [name, age]
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>{"Add new author"}</h3>

        <div className="field">
          <label>{"Author name"}</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
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

        <button>{addAuthorResult.loading ? "Creating" : "Submit"}</button>
        {!!addAuthorResult.error && (
          <p>{JSON.stringify(addAuthorResult.error)}</p>
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
