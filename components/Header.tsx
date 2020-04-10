import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function getHeaderLinks() {
  return [
    { title: "Home", path: "/" },
    { title: "Books", path: "/books" },
    { title: "Authors", path: "/authors" },
    { title: "Shows", path: "/shows" },
    { title: "Random Quote", path: "/quote" },
    { title: "About us", path: "/about" },
  ];
}

function HeaderItem(props: {
  item: { title: string; path: string };
  selected: boolean;
}) {
  const { item, selected } = props;

  return (
    <Link href={item.path}>
      <a>
        {item.title}
        <style jsx>
          {`
            a:link,
            a:visited {
              marign-right: 15px;
              text-decoration: none;
              padding: 16px;
            }

            a:hover {
              text-decoration: underline;
            }
          `}
        </style>

        <style jsx>
          {`
            a:link,
            a:visited {
              color: ${selected ? "black" : "white"};
              background: ${selected ? "white" : "cornflowerblue"};
            }
          `}
        </style>
      </a>
    </Link>
  );
}

function Header() {
  const headerItems = React.useMemo(getHeaderLinks, []);
  const router = useRouter();

  return (
    <div className={"header-container"}>
      {headerItems.map((item) => (
        <HeaderItem
          key={item.title}
          item={item}
          selected={router.pathname === item.path}
        />
      ))}

      <style jsx>
        {`
          .header-container {
            background: cornflowerblue;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  );
}

export default Header;
