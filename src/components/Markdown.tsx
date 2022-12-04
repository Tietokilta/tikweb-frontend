import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import H1 from "./H1"
import H2 from "./H2"

const markdownComponents: Components = {
  h1: H1,
  h2: H2,
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
