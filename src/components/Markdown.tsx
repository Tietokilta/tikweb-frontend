import { PropsWithChildren } from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { A, H1, H2, H3, H4, P } from "./typography"

// Fragment is necessary for react-markdown typings
// eslint-disable-next-line react/jsx-no-useless-fragment
export const Ignore = ({ children }: PropsWithChildren) => <>{children}</>

const markdownComponents: Components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
}

const plainTextComponents: Components = {
  h1: P,
  h2: P,
  h3: P,
  h4: P,
  p: P,
  a: Ignore,
}

type Props = {
  children: string
  plainText?: boolean
}

const Markdown: React.FC<Props> = ({ children, plainText }) => (
  <ReactMarkdown
    components={plainText ? plainTextComponents : markdownComponents}
    remarkPlugins={[remarkGfm]}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
