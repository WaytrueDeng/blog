import Link from "next/link";
export default function Layout({ children,backLinks,title }) {
  const backLinktoslug = backLinks ? backLinks.map((item) => item.replace(/\.md$/g,"" )) : [];
  const backLinksFragment = backLinktoslug.map((backlink) => <li key={backlink}><Link href={backlink} >{backlink}</Link></li>);
  return (<><div className="nav"><h1>{title}</h1></div><div className="container">{children}<div className="backlink">Go <Link href="/posts/home">home</Link><br /><ul>backlinks {backLinksFragment}</ul></div></div></>);
}
