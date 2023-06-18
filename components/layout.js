import Link from "next/link";
export default function Layout({ children,backLinks,title }) {
  const backLinktoslug = backLinks ? backLinks.map((item) => item.replace(/\.md$/g,"" )) : [];
  const backLinksFragment = backLinktoslug.map((backlink) => <li key={backlink}><Link href={backlink} >{backlink}</Link></li>);
  return (<><div className="nav"><h1>{title}</h1></div><div className="ml-[20vw] mr-[2vw] ">{children}</div><div className="backlink">Go <Link href="/posts/home">home</Link><br /><ul>backlinks {backLinksFragment}</ul></div></>);
}
