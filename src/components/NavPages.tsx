import { Link } from "gatsby"
import { NavigationItem } from "../types/strapi"

type ItemProps = {
  item: NavigationItem
}

const SubItem: React.FC<ItemProps> = ({ item: { title, path } }) => {
  return (
    <Link
      className="pt-1 px-2 text-lg font-normal text-white"
      activeClassName="underline"
      to={path}
    >
      {title}
    </Link>
  )
}

const Item: React.FC<ItemProps> = ({ item: { title, path, items } }) => {
  return (
    <>
      <Link
        className="mt-4 font-mono text-xl font-semibold text-white"
        activeClassName="underline"
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

type Props = {
  rootItem: NavigationItem | undefined
}

const NavPages: React.FC<Props> = ({ rootItem }) => {
  return (
    <nav className="flex flex-col items-start min-h-full bg-gray-darkest text-white pl-10 pr-5">
      {rootItem?.items?.map((item) => (
        <Item key={item.path} item={item} />
      ))}
    </nav>
  )
}

export default NavPages
