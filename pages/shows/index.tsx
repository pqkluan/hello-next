import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import PageLayout from "../../components/PageLayout";

export interface Show {
  id: string;
  name: string;
  summary: string;
  image?: { medium: string };
}

function ShowLink(props: { show: Show }) {
  const { show } = props;
  return (
    <li>
      <Link href="/shows/[id]" as={`/shows/${show.id}`}>
        <a>{show.name}</a>
      </Link>

      <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </li>
  );
}

function Shows(props: { shows: Show[] }) {
  const [keyword, setKeyword] = React.useState<string>("");
  const [shows, setShows] = React.useState<Show[]>([]);

  const onInputChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      // TODO: find a way to de-bounce
      setKeyword(event?.currentTarget?.value);
    },
    [setKeyword]
  );

  React.useEffect(() => {
    const storedKeyword = localStorage.getItem("showsKeyword");
    if (typeof storedKeyword === "string") setKeyword(storedKeyword);
  }, []);

  React.useEffect(() => {
    if (typeof keyword !== "string") return;

    localStorage.setItem("showsKeyword", keyword);

    if (!keyword) return;

    fetch(`https://api.tvmaze.com/search/shows?q=${keyword}`)
      .then((res) => res.json())
      .then((data: { show: Show }[]) =>
        setShows(data.map((entry) => entry.show))
      )
      .catch((e) => console.error(e));
  }, [keyword]);

  return (
    <PageLayout>
      <h1>{"TV Shows"}</h1>

      <label>{"Search for TV shows: "}</label>
      <input
        type="search"
        id="gsearch"
        name="gsearch"
        value={keyword}
        onChange={onInputChange}
      />

      {!keyword ? (
        <p>{"Use the search box above^"}</p>
      ) : (
        <ul>
          {shows.map((show) => (
            <ShowLink key={show.id} show={show} />
          ))}
        </ul>
      )}

      <style jsx>{`
        h1,
        ul {
          padding: 0;
        }
      `}</style>
    </PageLayout>
  );
}

export default Shows;
