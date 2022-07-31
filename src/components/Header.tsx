import { Link } from "gatsby"

import NavBar from "./NavBar"
import logo from "../assets/logo.svg"
import { FullWidthContainer } from "./Containers"

const Header: React.FC = () => {
  return (
    <div className="z-50 sticky top-0 left-0 flex justify-center w-full h-12 px-4 md:px-8 lg:px-16 bg-black text-white">
      <FullWidthContainer className="flex justify-between max-w-[90rem]">
        <Link
          to="/"
          className="sticky flex items-center font-normal text-2xl text-white"
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Tietokilta Ry
        </Link>
        <NavBar />
      </FullWidthContainer>
    </div>
  )
}

export default Header
