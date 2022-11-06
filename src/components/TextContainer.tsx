import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import { FullWidthContainer } from "./Containers"
import Title from "./Title"

export const TextContainer: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiFrontPage {
        description {
          data {
            description
          }
        }
        descriptionTitle
      }
    }
  `)

  interface StrapiHeroData {
    description: {
      data: {
        description: string
      }
    }
    descriptionTitle: string
  }

  const { description: descriptionData, descriptionTitle }: StrapiHeroData =
    data.strapiFrontPage

  const { description } = descriptionData.data

  return (
    <FullWidthContainer className="relative p-3">
      <Title>{descriptionTitle}</Title>
      {description.split("\n\n").map((paragraph: string) => (
        <div
          className="font-sans pb-3 text-sm"
          key={paragraph.length + paragraph[0]}
        >
          <ReactMarkdown>{paragraph}</ReactMarkdown>
        </div>
      ))}
    </FullWidthContainer>
  )
}
