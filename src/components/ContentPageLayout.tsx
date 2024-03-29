import { useLocation } from "@gatsbyjs/reach-router"
import { graphql, useStaticQuery } from "gatsby"
import { useContext } from "react"
import NavPages from "./NavPages"
import { PageContext } from "../contexts/PageContext"
import { StrapiNavigation } from "../types/strapi"

export type SideBarProps = {
  children: React.ReactNode
}

type NavQuery = {
  allStrapiPublicNavigation: {
    nodes: StrapiNavigation[]
  }
}

const ContentPageLayout: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { children } = props
  const { locale } = useContext(PageContext)

  // get the nav structure in the current locale
  const navigations = useStaticQuery(graphql`
    query {
      allStrapiPublicNavigation {
        nodes {
          locale
          items {
            title
            path
            items {
              title
              path
              items {
                title
                path
              }
            }
          }
        }
      }
    }
  `) as NavQuery
  const nav = navigations.allStrapiPublicNavigation.nodes.find(
    (n) => n.locale === locale
  )

  // use browser location to figure out which nav item to show in the sidebar
  const { pathname } = useLocation()
  const pathParts = pathname
    .split("/")
    .slice(1) // remove empty part before /
    .filter((part, index) => index !== 0 || part !== locale) // remove locale name as first part
  const rootItem = nav?.items?.find((item) =>
    item.path.startsWith(`/${pathParts[0]}`)
  )

  return (
    <main className="flex-grow flex min-h-full">
      <div className="hidden md:block">
        <NavPages rootItem={rootItem} />
      </div>
      <div className="px-5 py-4 grow overflow-hidden">{children}</div>
    </main>
  )
}

export default ContentPageLayout
