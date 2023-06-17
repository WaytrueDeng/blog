import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
    <h1>WaytrueDeng's Blog</h1>
    <p>hi there my name is WaytrueDeng, I build this blog to store my notes, if you wanna see them you could <Link href="/posts/home">click here</Link></p>
    </Layout>
  );
}


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
