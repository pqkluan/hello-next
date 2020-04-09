import { NextPage } from "next";

import PageLayout from "../../components/PageLayout";
import { Show } from "./index";

const ShowDetails: NextPage<{ show: Show }> = (props) => {
  const { show } = props;

  return (
    <PageLayout>
      <h1>{show.name}</h1>
      <p>{show.summary.replace(/<[/]?[pb]>/g, "")}</p>
      {show.image ? <img src={show.image.medium} /> : null}

      <style jsx global>{`
        h1 {
          text-transform: uppercase;
        }

        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </PageLayout>
  );
};

ShowDetails.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show: Show = await res.json();

  return { show };
};

export default ShowDetails;
