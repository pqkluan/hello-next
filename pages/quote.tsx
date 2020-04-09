import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import PageLayout from "../components/PageLayout";
import Head from "next/head";

export default function Quote() {
  const { query } = useRouter();

  const { data, error } = useSWR(
    `/api/randomQuote${query.author ? "?author=" + query.author : ""}`,
    (url) => fetch(url).then((r) => r.json())
  );

  const author = data?.author;
  let quote = data?.quote;

  if (!data) quote = "Loading...";
  if (error) quote = "Failed to fetch the quote.";

  return (
    <PageLayout>
      <Head>
        <title>{"Random Quote"}</title>
      </Head>

      <main className="center">
        <div className="quote">{"`" + quote + "`"}</div>
        {author && <span className="author">- {author}</span>}

        <style jsx>{`
          main {
            width: 90%;
            margin-top: 100px;
            margin-bottom: 100px;
            text-align: center;
          }
          .quote {
            font-family: cursive;
            font-size: 24px;
            padding-bottom: 10px;
          }
          .author {
            color: cornflowerblue;
            font-size: 20px;
          }
        `}</style>
      </main>

      <p>
        Tip: You could add author param this this page url to filter for an
        author specific quote
      </p>

      <p>
        {"Example: "}
        <Link href={"/quote?author=luan"}>
          <a>{"/quote?author=luan"}</a>
        </Link>
      </p>
    </PageLayout>
  );
}
