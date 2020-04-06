import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import PageLayout from "../components/PageLayout";

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
      <main className="center">
        <div className="quote">{quote}</div>
        {author && <span className="author">- {author}</span>}

        <style jsx>{`
          main {
            width: 90%;
            max-width: 900px;
            margin: 300px auto;
            text-align: center;
          }
          .quote {
            font-family: cursive;
            color: #e243de;
            font-size: 24px;
            padding-bottom: 10px;
          }
          .author {
            font-family: sans-serif;
            color: #559834;
            font-size: 20px;
          }
        `}</style>
      </main>

      <p>
        Tip: You could add author param this this page url for that author
        specific quote
      </p>

      <p>
        {"Example: "}
        <Link href={"/quote?author=pqkluan"}>
          <a>{"/quote?author=pqkluan"}</a>
        </Link>
      </p>
    </PageLayout>
  );
}
