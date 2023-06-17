import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h2 >Blog</h2>
        <ul >
          {allPostsData.map(({ id, title }) => (
            <li >
              {title}
            </li>
          ))}
        </ul>
      </section>
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
