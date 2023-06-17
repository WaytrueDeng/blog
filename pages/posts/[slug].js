import Layout from '../../components/layout';
import { getAllPostSlugs,getPostData } from '../../lib/posts';

export default function Post({postData}) {
  return (<Layout>
    <h1>{postData.title}</h1>

    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>);
}

export async function getStaticPaths() {
  // Return a list of possible value for id
const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}

