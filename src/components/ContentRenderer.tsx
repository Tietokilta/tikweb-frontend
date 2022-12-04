import { StrapiPageContentBlock } from "../types/strapi"
import { FullWidthContainer } from "./Containers"
import Markdown from "./Markdown"

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
            <div className="font-sans pb-3 text-sm">
              <Markdown key={block.id}>{block.text.data.text}</Markdown>
            </div>
          )
        }
        return null
      })}
    </FullWidthContainer>
  )
}

export default ContentRenderer
