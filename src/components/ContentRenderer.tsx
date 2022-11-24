import { graphql } from "gatsby"
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
            <div className="font-sans pb-3 text-sm">
              <ReactMarkdown key={block.id} components={markdownComponents}>
                {block.text.data.text}
              </ReactMarkdown>
            </div>
          )
        }
        if (block.strapi_component === "common-content.committee") {
          return <p>{block.name}</p>
        }
        return null
      })}
    </FullWidthContainer>
  )
}

// THIS ONLY WORKS FOR STRAPI_PAGE, AND NOT FOR STRAPI_LANDING_PAGE
export const query = graphql`
  fragment CommonContent on COMMON_CONTENT {
    ... on STRAPI__COMPONENT_COMMON_CONTENT_TEXT_BLOCK {
      strapi_component
      id
      text {
        data {
          text
        }
      }
    }
    ... on STRAPI__COMPONENT_COMMON_CONTENT_COMMITTEE {
      strapi_component
      id
      name
    }
  }
`

export default ContentRenderer
