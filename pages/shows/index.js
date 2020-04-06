import Link from "next/link";
import fetch from "isomorphic-unfetch";

import PageLayout from "../../components/PageLayout";

function ShowLink(props) {
  return (
    <li>
      <Link href="/shows/[id]" as={`/shows/${props.id}`}>
        <a>{props.name}</a>
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

function Shows(props) {
  const { shows = [] } = props;

  return (
    <PageLayout>
      <h1>Batman TV Shows</h1>

      <b>TODO: implement search</b>

      <ul>
        {shows.map(({ id, name }) => (
          <ShowLink key={id} id={id} name={name} />
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
  const data = await res.json();

  return {
    shows: data.map((entry) => entry.show),
  };
};

export default Shows;
