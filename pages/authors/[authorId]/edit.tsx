import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "../../../graphql";
import PageLayout from "../../../components/PageLayout";
import { EditAuthorForm } from "../../../components/authors";

export default function EditAuthorPage(props: any) {
  const authorId = props?.url?.query?.authorId;

  return (
    <PageLayout>
      <ApolloProvider client={client}>
        {!!authorId ? (
          <EditAuthorForm authorId={authorId} />
        ) : (
          <p>{"Missing author id"}</p>
        )}
      </ApolloProvider>
    </PageLayout>
  );
}
