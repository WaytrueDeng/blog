import fs from 'fs';
import path from 'path';
//import {unified} from 'unified'
//import remarkParse from 'remark-parse'
//import remarkRehype from 'remark-rehype'
//import rehypeSanitize from 'rehype-sanitize'
//import rehypeStringify from 'rehype-stringify'
//import  wikiLinkPlugin from 'remark-wiki-link'


const postsDirectory = path.join(process.cwd(), 'posts');

function containSlug (filename,slug){
  const fileContent = fs.readFileSync(postsDirectory+"/"+filename);
  const result = fileContent.toString().includes(slug);
  return result;
}

function getBacklinks() {
  const fileNames = fs.readdirSync(postsDirectory);
  const regex = new RegExp('\.md$')
  const mdfileNames =fileNames.filter(item => regex.test(item));
  const backlinkfileNames = mdfileNames.filter( item => containSlug(item,"[[nixLearning]]"))
  console.log(backlinkfileNames)
}

getBacklinks()




