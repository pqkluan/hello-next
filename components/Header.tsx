import React from "react";
import Link from "next/link";

function getHeaderLinks() {
  return [
    { title: "Home", path: "/" },
    { title: "Shows", path: "/shows" },
    { title: "Random Quote", path: "/quote" },
    { title: "About us", path: "/about" },
  ];
}

function Header() {
  const links = React.useMemo(getHeaderLinks, []);

  return (
    <div>
      {links.map((link) => (
        <Link key={link.title} href={link.path}>
          <a>{link.title}</a>
        </Link>
      ))}

      <style jsx>
        {`
          a:link,
          a:visited {
            padding-right: 15px;
            text-decoration: none;
            color: blue;
          }

          a:hover,
          a:active {
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  );
}

export default Header;
