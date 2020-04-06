import Link from "next/link";
import fetch from "isomorphic-unfetch";

import PageLayout from "../components/PageLayout";

function PostLink(props) {
  return (
    <li>
      <Link href="/p/[id]" as={`/p/${props.id}`}>
        <a>{props.name}</a>
      </Link>
    </li>
  );
}

function Home(props) {
  const { shows = [] } = props;

  return (
    <PageLayout>
      <h1>Batman TV Shows</h1>

      <ul>
        {shows.map(({ id, name }) => (
          <PostLink key={id} id={id} name={name} />
        ))}
      </ul>
    </PageLayout>
  );
}

Home.getInitialProps = async function () {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map((entry) => entry.show),
  };
};

export default Home;
