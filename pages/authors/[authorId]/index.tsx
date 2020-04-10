import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "../../../graphql";
import PageLayout from "../../../components/PageLayout";
import { AuthorDetails } from "../../../components/authors";

export default function AuthorDetailsPage(props: any) {
  const authorId = props?.url?.query?.authorId;
  return (
    <PageLayout>
      <ApolloProvider client={client}>
        {!!authorId ? (
          <AuthorDetails authorId={authorId} />
        ) : (
          <p>{"Missing author id"}</p>
        )}
      </ApolloProvider>
    </PageLayout>
  );
}
