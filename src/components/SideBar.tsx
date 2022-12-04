import { useLocation } from "@gatsbyjs/reach-router"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useContext } from "react"
import { PageContext } from "../contexts/PageContext"
import { NavigationItem, StrapiNavigation } from "../types/strapi"

type ItemProps = {
  item: NavigationItem
}

const SubItem: React.FC<ItemProps> = ({ item: { title, path } }) => {
  return (
    <Link className="pt-1 px-2 text-lg font-normal text-white" to={path}>
      {title}
    </Link>
  )
}

const Item: React.FC<ItemProps> = ({ item: { title, path, items } }) => {
  return (
    <>
      <Link
        className="mt-4 font-mono text-xl font-semibold text-white"
        to={path}
      >
        {title}
      </Link>
      {items?.map((item) => (
        <SubItem key={item.path} item={item} />
      ))}
    </>
  )
}

type NavQuery = {
  allStrapiPublicNavigation: {
    nodes: StrapiNavigation[]
  }
}

export type SideBarProps = {
  children: React.ReactNode
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
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
    <div className="flex flex-row min-h-full">
      <nav className="flex flex-col min-h-full bg-gray-darkest text-white pl-10 pr-5">
        {rootItem?.items?.map((item) => (
          <Item key={item.path} item={item} />
        ))}
      </nav>
      <div className="px-5 py-4 w-full">{children}</div>
    </div>
  )
}

export default SideBar
