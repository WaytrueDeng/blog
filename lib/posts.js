import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import  wikiLinkPlugin from 'remark-wiki-link'


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const regex = new RegExp('\.md$')
  /*const mdfileNames = fileNames.map(
  (filename) => {
    if (regex.test(filename)) {
    return filename;
    } 
  }
  )*/

  const mdfileNames =fileNames.filter(item => regex.test(item));

  const allPostsData = mdfileNames.map((mdfileName) => {
    // Remove ".md" from file name to get id
    const id = mdfileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, mdfileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs (){
  const fileNames=fs.readdirSync(postsDirectory);
  const regex = new RegExp('\.md$')
  const mdfileNames =fileNames.filter(item => regex.test(item));
  return mdfileNames.map(
    (mdfileName) => {
    return {
      params: {
      slug: mdfileName.replace(/\.md$/,''),
      },

    }


    }


  );
};


export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  /*const processedContent = await remark()
  .use(remarkParse)
  .process(matterResult.content);*/
  const processedContent = await unified()
    .use(remarkParse)
    .use(wikiLinkPlugin,{hrefTemplate: (permalink) => `${permalink}`,pageResolver: (name) => [name.replace(/ /g, '_')]})
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(matterResult.content)


  const contentHtml = processedContent.toString();
  // Combine the data with the id
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}









