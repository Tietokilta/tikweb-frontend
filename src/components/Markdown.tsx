import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { H1, H2, H3, H4, P } from "./typography"

const markdownComponents: Components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
}

type Props = {
  children: string
}

const Markdown: React.FC<Props> = ({ children }) => (
  <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
    {children}
  </ReactMarkdown>
)

export default Markdown
