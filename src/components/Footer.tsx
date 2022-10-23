import { FullWidthContainer } from "./Containers"
import Logo1 from "../assets/futuriceLogoBlack.png"
import Logo2 from "../assets/vector.png"
import Logo3 from "../assets/smartly_logo.png"

const Footer: React.FC = () => {
  return (
    <div className="flex w-full text-white justify-center bg-gray-darkest px-4 md:px-8 lg:px-16 py-6">
      <FullWidthContainer className="max-w-[90rem] flex flex-col items-center">
        <p className="text-3xl pt-4 pb-16">Tietokilta Main Partners</p>
        <div className="w-[60vw] flex mx-auto justify-center pb-40">
          <img src={Logo1} alt="Futurice" className="h-[5vw]" />
          <img src={Logo2} alt="Vector" className="h-[5vw] mx-[4vw]" />
          <img src={Logo3} alt="Smartly" className="h-[5vw]" />
        </div>
      </FullWidthContainer>
    </div>
  )
}

export default Footer
