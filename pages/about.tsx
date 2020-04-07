import PageLayout from "../components/PageLayout";
import Head from "next/head";

export default function About() {
  return (
    <PageLayout>
      <Head>
        <title>{"About us"}</title>
      </Head>

      <p>This is the about page</p>
      <p>This is a second line of about page</p>
    </PageLayout>
  );
}
