import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import MDXComponents from './mdx-components'

type Props = {
  content: string
  source?: MDXRemoteSerializeResult
}

const PostBody = ({ content, source }: Props) => {
  return (
    <div className="max-w-4xl mx-auto prose lg:prose-xl dark:prose-invert substack-content">
      {source ? (
        <MDXRemote {...source} components={MDXComponents} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  )
}

export default PostBody
