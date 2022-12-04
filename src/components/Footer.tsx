import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FullWidthContainer } from "./Containers"

import { StrapiPartners } from "../types/strapi"
import parseImageUrl from "../utils/parseImageUrl"

const Footer: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiPartners {
        nodes {
          title
          partner {
            logo {
              url
            }
            name
            url
          }
        }
      }
    }
  `)
  const partners: StrapiPartners = data.allStrapiPartners.nodes[0]

  return (
    <div className="flex w-full text-white justify-center bg-black px-4 md:px-8 lg:px-16 py-6">
      <FullWidthContainer className="max-w-[90rem] flex flex-col items-center">
        <p className="text-3xl pt-4 pb-16 font-mono">{partners.title}</p>
        <div className="flex flex-wrap justify-center pb-40 items-center">
          {partners.partner.map(({ logo, name, url }) => {
            return (
              <a href={url} key={name} className="grow-1 shrink-0 basis-full md:basis-1/2 lg:basis-1/3 p-3 justify-center">
                <img
                  src={parseImageUrl(logo.url)}
                  alt={name}
                  className="max-h-[10vw] mx-auto"
                />
              </a>
            )
          })}
        </div>
      </FullWidthContainer>
    </div>
  )
}

export default Footer
