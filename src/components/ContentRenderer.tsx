import ReactMarkdown, { Components } from "react-markdown"
import { StrapiPageContentBlock } from "../types/strapi"
import { FullWidthContainer } from "./Containers"
import Title from "./Title"

const markdownComponents: Components = {
  h1: Title,
}

type Props = {
  contentBlocks: StrapiPageContentBlock[]
}

const ContentRenderer: React.FC<Props> = ({ contentBlocks }) => {
  return (
    <FullWidthContainer className="relative p-3">
      {(contentBlocks ?? []).map((block) => {
        if (
          block.strapi_component === "common-content.text-block" &&
          block?.text?.data?.text
        ) {
          return (
            <article key={block.id} className="font-sans leading-normal prose pb-3 text-sm">
              <ReactMarkdown className="leading-normal" components={markdownComponents}>
                {block.text.data.text}
              </ReactMarkdown>
            </article>
          )
        }
        return null
      })}
    </FullWidthContainer>
  )
}

export default ContentRenderer
