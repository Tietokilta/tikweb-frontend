// FIXME: delete this when using real links
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "gatsby"

const NavBar: React.FC = () => {
  // TODO: Generate links from actual data and make them functional

  return (
    <div className="flex items-center font-mono text-lg">
      <Link className="font-normal ml-12" to="#">
        Tapahtumat
      </Link>
      <Link className="font-normal ml-12" to="#">
        Kilta
      </Link>
      <Link className="font-normal ml-12" to="#">
        Fuksit
      </Link>
      <Link className="font-normal ml-12" to="#">
        Abeille
      </Link>
      <Link className="font-normal ml-12" to="#">
        Yritykset
      </Link>
    </div>
  )
}

export default NavBar
