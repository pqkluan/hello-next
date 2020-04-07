import Head from "next/head";

import PageLayout from "../components/PageLayout";

function Home() {
  return (
    <PageLayout>
      <Head>
        <title>{"Next.js Demo Homepage"}</title>
      </Head>

      <h1>{"Homepage"}</h1>

      <p>{"Made by NEXT.js"}</p>
    </PageLayout>
  );
}

export default Home;
