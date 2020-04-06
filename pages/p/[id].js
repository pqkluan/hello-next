import { useRouter } from "next/router";

import PageLayout from "../../components/PageLayout";

function PostContent() {
  const router = useRouter();

  return (
    <>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
    </>
  );
}

export default function Post() {
  return (
    <PageLayout>
      <PostContent />
    </PageLayout>
  );
}
