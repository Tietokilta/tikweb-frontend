import NavBar from "./NavBar"
import logo from "../assets/logo.svg"
import { FullWidthContainer } from "./Containers"

const Header: React.FC = () => {
  return (
    <>
      <div className="flex justify-center w-full h-12 px-16 bg-black text-white">
        <FullWidthContainer className="flex justify-between">
          <a href="/" className="flex items-center text-2xl font-normal">
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            Tietokilta Ry
          </a>
          <NavBar />
        </FullWidthContainer>
      </div>
    </>
  )
}

export default Header
