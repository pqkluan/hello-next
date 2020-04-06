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

interface Props {
  shows: Show;
}

function Shows(props: { shows: Show[] }) {
  const { shows = [] } = props;

  return (
    <PageLayout>
      <h1>Batman TV Shows</h1>

      <b>TODO: implement search</b>

      <ul>
        {shows.map((show) => (
          <ShowLink key={show.id} show={show} />
        ))}
      </ul>

      <style jsx>{`
        h1,
        ul {
          padding: 0;
        }
      `}</style>
    </PageLayout>
  );
}

Shows.getInitialProps = async function () {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data: { show: Show }[] = await res.json();

  return {
    shows: data.map((entry) => entry.show),
  };
};

export default Shows;
