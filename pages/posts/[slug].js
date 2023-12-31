import Link from 'next/link'
import Layout from '../../components/layout';
import { getAllPostSlugs,getPostData } from '../../lib/posts';
import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import  wikiLinkPlugin from 'remark-wiki-link'
import Image from 'next/image' 
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {nord} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function Post({postData}) {


  return (<Layout backLinks={postData.backlinks} title={postData.title}>
    <ReactMarkdown children={postData.mdcontent} remarkPlugins={[[wikiLinkPlugin,{hrefTemplate: (permalink) => `${permalink}`,pageResolver: (name) => [name.replace(/ /g, '_')]}]]}
    
    components={
  {
    a:({node,href,title}) => {const text= node.children[0] ? node.children[0].value : "clickme";return <Link href={href}>{text}</Link>},
    img:({node,src})=> {
    const imageStyle = {
  border: '1px solid #fff',
}
    return <Image width={500} height={500} src={src} 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    style={imageStyle} alt="image missing"
      />

    },
        code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            style={nord}
            PreTag="div"
          />
        ) : (
          <code {...props} className={className}>
            {children}
          </code>
        )
      }

  }
    }

    />
    {/*<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />*/}
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

