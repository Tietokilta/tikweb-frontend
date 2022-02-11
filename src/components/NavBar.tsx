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
      <div className="hidden md:flex items-center font-mono text-lg">
        {menuItems.map((menuItem) => (
          <Link
            className="font-normal ml-6 lg:ml-12"
            to={menuItem.url}
            key={`menu-item-${menuItem.title}-${menuItem.url}`}
          >
            {menuItem.title}
          </Link>
        ))}
      </div>
      <div className="flex md:hidden items-center">
        <BurgerButton
          open={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        />
      </div>
    </>
  )
}

export default NavBar
