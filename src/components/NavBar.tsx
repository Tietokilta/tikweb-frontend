import { useLocation } from "@gatsbyjs/reach-router"
import classNames from "classnames"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useContext, useState } from "react"
import { PageContext } from "../contexts/PageContext"
import { StrapiNavigation } from "../types/strapi"
import BurgerButton from "./BurgerButton"
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
            className="font-mono ml-6 lg:ml-12 text-white"
            activeClassName="underline"
            partiallyActive
          >
            {item.title}
          </Link>
        ))}
        <Link to={localeLink} className="font-mono ml-6 lg:ml-12 text-white">
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
          <div className="p-4 bg-gray-darkest w-[80vw] min-h-full">
            {nav?.items.map((item) => (
              <>
                <Link
                  key={item.path}
                  to={item.path}
                  className="block font-mono text-2xl p-4 text-white"
                  activeClassName="underline"
                  partiallyActive
                >
                  {item.title}
                </Link>
                {pathname.includes(item.path) && <NavPages />}
              </>
            ))}
            <Link
              to={localeLink}
              className="inline-block font-mono text-2xl p-4 text-white overflow-hidden w-60"
            >
              {locale === "fi" ? "In English" : "Suomeksi"}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
