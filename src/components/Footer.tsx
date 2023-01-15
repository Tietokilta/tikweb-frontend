import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { StrapiPartners } from "../types/strapi"
import parseImageUrl from "../utils/parseImageUrl"
import Link from "./Link"

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
      <div className="w-full max-w-[90rem] flex flex-col items-center">
        <p className="text-3xl pt-4 pb-16 font-mono">{partners.title}</p>
        <div className="flex flex-wrap justify-center pb-40 items-center">
          {partners.partner.map(({ logo, name, url }, index) => {
            const img = (
              <img
                // This is more correct than using any of the potentially duplicate fields...
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                src={parseImageUrl(logo.url)}
                alt={name}
                className="max-h-[10vw] mx-auto"
              />
            )
            return url ? (
              <Link
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                to={url}
                className="grow-1 shrink-0 basis-full md:basis-1/2 lg:basis-1/3 p-3 justify-center"
              >
                {img}
              </Link>
            ) : (
              img
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Footer
