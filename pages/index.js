import Link from "next/link";

import PageLayout from "../components/PageLayout";

function PostLink(props) {
  return (
    <li>
      <Link href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  );
}

export default function Home() {
  return (
    <PageLayout>
      <h1>My Blog</h1>
      <ul>
        <PostLink title="Hello Next.js" />
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
    </PageLayout>
  );
}
