import classNames from "classnames"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useContext, useState } from "react"
import { LocaleContext } from "../contexts/PageContext"
import { StrapiNavigation } from "../types/strapi"
import BurgerButton from "./BurgerButton"

type NavQuery = {
  allStrapiPublicNavigation: {
    nodes: StrapiNavigation[]
  }
}

const NavBar: React.FC = () => {
  const locale = useContext(LocaleContext)
  const [open, setOpen] = useState(false)
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
      </nav>
      <div className="flex md:hidden items-center">
        <BurgerButton
          open={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        />
        <div
          className={classNames(
            "fixed top-0 left-0 h-full bg-gray-darkest transition-[max-width] ease-in-out duration-500",
            {
              "max-w-[80%] w-full overflow-y-auto": open,
              "max-w-0 w-0 overflow-hidden": !open,
            }
          )}
        >
          <div className="p-4">
            {nav?.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block font-mono text-2xl p-4 text-white"
                activeClassName="underline"
                partiallyActive
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
