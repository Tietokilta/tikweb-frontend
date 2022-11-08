import ReactMarkdown from "react-markdown"
import { StrapiPageContentBlock } from "../types/strapi"
import { FullWidthContainer } from "./Containers"
import Title from "./Title"

type Props = {
  contentBlocks: StrapiPageContentBlock[]
}

const ContentRenderer: React.FC<Props> = ({ contentBlocks }) => {
  return (
    <FullWidthContainer className="relative p-3">
      {contentBlocks.map((block) => {
        if (
          block.strapi_component === "common-content.text-block" &&
          block?.text?.data?.text
        ) {
          return (
            <div className="font-sans pb-3 text-sm">
              <ReactMarkdown
                key={block.id}
                components={{
                  // eslint-disable-next-line react/no-unstable-nested-components
                  h1: ({ children }) => <Title>{children}</Title>,
                }}
              >
                {block.text.data.text}
              </ReactMarkdown>
            </div>
          )
        }
        return null
      })}
    </FullWidthContainer>
  )
}

export default ContentRenderer
