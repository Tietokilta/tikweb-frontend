import classNames from "classnames"
import { Link } from "gatsby"
import { useState } from "react"
import BurgerButton from "./BurgerButton"

type MenuItem = {
  title: string
  url: string
  items?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { title: "Tapahtumat", url: "#" },
  { title: "Kilta", url: "#" },
  { title: "Fuksit", url: "#" },
  { title: "Abeille", url: "#" },
  { title: "Yritykset", url: "#" },
]

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="hidden md:flex items-center font-mono text-lg">
        {menuItems.map((menuItem) => (
          <Link
            className="font-mono ml-6 lg:ml-12 text-white"
            to={menuItem.url}
            key={`menu-item-${menuItem.title}-${menuItem.url}`}
          >
            {menuItem.title}
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
            {menuItems.map((menuItem) => (
              <Link
                className="block font-mono text-2xl p-4 text-white"
                to={menuItem.url}
                key={`menu-item-${menuItem.title}-${menuItem.url}`}
              >
                {menuItem.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
