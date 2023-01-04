import { graphql } from "gatsby"
import { StrapiPageContentBlock } from "../types/strapi"
import CommitteeCard from "./CommitteeCard"
import { FullWidthContainer } from "./Containers"
import Markdown from "./Markdown"

type Props = {
  contentBlocks: StrapiPageContentBlock[]
  className?: string
}

const ContentRenderer: React.FC<Props> = ({ contentBlocks, className }) => {
  return (
    <FullWidthContainer className={className}>
      {(contentBlocks ?? []).map((block) => {
        if (
          block.strapi_component === "common-content.text-block" &&
          block?.text?.data?.text
        ) {
          return (
            <div className="font-sans pb-3 text-sm" key={block.id}>
              <Markdown>{block.text.data.text}</Markdown>
            </div>
          )
        }
        if (block.strapi_component === "common-content.committee") {
          return (
            <div key={block.id}>
              <h2 className="font-mono">{block.name}</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 auto-rows-fr max-w-4xl">
                {block?.members?.map((member) => {
                  return <CommitteeCard member={member} key={member.id} />
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
