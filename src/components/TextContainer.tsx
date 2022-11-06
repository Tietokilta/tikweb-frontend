import ReactMarkdown from "react-markdown"
import { FullWidthContainer } from "./Containers"
import Title from "./Title"

interface Props {
  title: string
  content: string
}

export const TextContainer = ({ title, content }: Props) => {
  return (
    <FullWidthContainer className="relative p-3">
      <Title>{title}</Title>
      {content.split("\n\n").map((paragraph: string) => (
        <div
          className="font-sans pb-3 text-sm"
          key={paragraph.length + paragraph[0]}
        >
          <ReactMarkdown>{paragraph}</ReactMarkdown>
        </div>
      ))}
    </FullWidthContainer>
  )
}
