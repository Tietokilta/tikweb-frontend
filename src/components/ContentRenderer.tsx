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
          return <ReactMarkdown>{contentBlock.text}</ReactMarkdown>
        }

        return null
      })}
    </>
  )
}

export default ContentRenderer
