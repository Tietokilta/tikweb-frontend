import { graphql } from "gatsby"
import { StrapiPageContentBlock } from "../types/strapi"
import CommitteeCard from "./CommitteeCard"
import Markdown from "./Markdown"
import { H2 } from "./typography"

type Props = {
  contentBlocks: StrapiPageContentBlock[]
}

const ContentRenderer: React.FC<Props> = ({ contentBlocks }) => {
  return (
    <>
      {(contentBlocks ?? []).map((block) => {
        if (
          block.strapi_component === "common-content.text-block" &&
          block?.text?.data?.text
        ) {
          return (
            <div className="font-sans pb-3" key={block.id}>
              <Markdown>{block.text.data.text}</Markdown>
            </div>
          )
        }
        if (block.strapi_component === "common-content.committee") {
          return (
            <div key={block.id}>
              <H2 className="font-mono">{block.name}</H2>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr max-w-[96rem]">
                {block?.members?.map((member) => {
                  return <CommitteeCard member={member} key={member.id} />
                })}
              </div>
            </div>
          )
        }
        return null
      })}
    </>
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
