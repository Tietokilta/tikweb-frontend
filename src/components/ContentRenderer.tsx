import ReactMarkdown from "react-markdown"
import { StrapiPageContentBlock } from "../types/strapi"

type Props = {
  contentBlocks: StrapiPageContentBlock[]
}

const ContentRenderer: React.FC<Props> = ({ contentBlocks }) => {
  return (
    <>
      {contentBlocks.map((block) => {
        if (block.strapi_component === "common-content.text-block") {
          return (
            <ReactMarkdown key={block.id}>{block.text.data.text}</ReactMarkdown>
          )
        }

        return null
      })}
    </>
  )
}

export default ContentRenderer
