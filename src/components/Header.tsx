import logo from "../assets/logo.svg"
import Link from "./Link"
import NavBar from "./NavBar"

const Header: React.FC = () => (
  <div className="w-full z-50 sticky top-0 left-0 flex justify-center h-12 px-4 md:px-8 lg:px-16 bg-black text-white">
    <div className="w-full max-w-[90rem] flex justify-between">
      <Link
        to="/"
        className="sticky flex items-center font-bold text-2xl text-white"
      >
        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
        Tietokilta Ry
      </Link>
      <NavBar />
    </div>
  </div>
)

export default Header
