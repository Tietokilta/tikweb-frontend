import { graphql } from "gatsby"
import ReactMarkdown, { Components } from "react-markdown"
import { StrapiPageContentBlock } from "../types/strapi"
import { FullWidthContainer } from "./Containers"
import CommitteeCard from "./CommitteeCard"
import Title from "./Title"

const markdownComponents: Components = {
  h1: Title,
}

type Props = {
  contentBlocks: StrapiPageContentBlock[]
}

const ContentRenderer: React.FC<Props> = ({ contentBlocks }) => {
  return (
    <FullWidthContainer className="relative">
      {(contentBlocks ?? []).map((block) => {
        if (
          block.strapi_component === "common-content.text-block" &&
          block?.text?.data?.text
        ) {
          return (
            <div className="font-sans pb-3 text-sm" key={block.id}>
              <ReactMarkdown components={markdownComponents}>
                {block.text.data.text}
              </ReactMarkdown>
            </div>
          )
        }
        if (block.strapi_component === "common-content.committee") {
          return (
            <div key={block.id}>
              <h2 className="font-mono">{block.name}</h2>
              <div className="flex flex-wrap">
                {block?.members?.map((member) => {
                  return (
                    <div
                      className="md:mr-8 mb-4 w-full md:w-5/12 ld"
                      key={member.id}
                    >
                      <CommitteeCard member={member} />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
        return null
      })}
    </FullWidthContainer>
  )
}

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
      members {
        id
        name
        position
        email
        telegramUsername
        phoneNumber
        picture {
          url
        }
      }
    }
  }
`

export default ContentRenderer
