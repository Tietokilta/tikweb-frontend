import { v4 as uuid } from "uuid"
import ReactMarkdown from "react-markdown"
import { StrapiPageContentBlock } from "../types/strapi"

type Props = {
  contentBlocks: StrapiPageContentBlock[]
}

const ContentRenderer: React.FC<Props> = ({ contentBlocks }) => {
  return (
    <>
      {contentBlocks.map((contentBlock) => {
        if (contentBlock.strapi_component === "common-content.text-block") {
          return <ReactMarkdown key={uuid()}>{contentBlock.text}</ReactMarkdown>
        }

        return null
      })}
    </>
  )
}

export default ContentRenderer
