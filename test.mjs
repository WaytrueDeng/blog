import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import  wikiLinkPlugin from 'remark-wiki-link'

main()

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(wikiLinkPlugin,{hrefTemplate: (permalink) => `#/posts/${permalink}`})
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process('# Hello, Neptune! [[aa]]')

  console.log(String(file))
}
