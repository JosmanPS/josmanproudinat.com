import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
  source: MDXRemoteSerializeResult
}

const PostBody = ({ content, source }: Props) => {
  return (
    <div className="max-w-4xl mx-auto prose lg:prose-xl">
      {/* <div
        // className={markdownStyles['markdown']}
        className='prose lg:prose-xl'
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <MDXRemote {...source} />
    </div>
  )
}

export default PostBody
