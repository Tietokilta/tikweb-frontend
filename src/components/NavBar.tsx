import { useLocation } from "@gatsbyjs/reach-router"
import classNames from "classnames"
import { graphql, useStaticQuery } from "gatsby"
import { Fragment, useContext, useState } from "react"
import { PageContext } from "../contexts/PageContext"
import { StrapiNavigation } from "../types/strapi"
import BurgerButton from "./BurgerButton"
import Link from "./Link"
import NavPages from "./NavPages"

type NavQuery = {
  allStrapiPublicNavigation: {
    nodes: StrapiNavigation[]
  }
}

const NavBar: React.FC = () => {
  const { locale, localeLink } = useContext(PageContext)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
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

  return (
    <>
      <nav className="hidden md:flex items-center font-mono text-lg">
        {nav?.items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="font-mono font-bold ml-6 lg:ml-12 text-white"
            activeClassName="underline"
            partiallyActive
          >
            {item.title}
          </Link>
        ))}
        <Link
          to={localeLink}
          className="font-mono font-bold ml-6 lg:ml-12 text-white"
        >
          {locale === "fi" ? "In English" : "Suomeksi"}
        </Link>
      </nav>
      <div className="flex md:hidden items-center">
        <BurgerButton
          open={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        />
        <div
          className={classNames(
            "fixed top-0 left-0 w-full h-full transition-[max-width] ease-in-out duration-500 pt-12",
            {
              "max-w-[80%] overflow-x-hidden overflow-y-auto": open,
              "max-w-0 overflow-hidden": !open,
            }
          )}
        >
          <nav className="flex flex-col items-start p-4 bg-gray-darkest w-[80vw] min-h-full">
            {nav?.items.map((item) => (
              <Fragment key={item.path}>
                <Link
                  to={item.path}
                  className="block font-mono font-bold text-2xl p-4 text-white"
                  activeClassName="underline"
                  partiallyActive
                >
                  {item.title}
                </Link>
                {pathname.includes(item.path) && <NavPages rootItem={item} />}
              </Fragment>
            ))}
            <Link
              to={localeLink}
              className="block font-mono font-bold text-2xl p-4 text-white"
            >
              {locale === "fi" ? "In English" : "Suomeksi"}
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default NavBar
