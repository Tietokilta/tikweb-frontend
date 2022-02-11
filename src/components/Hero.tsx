/* eslint-disable jsx-a11y/anchor-is-valid */
import { FullWidthContainer } from "./Containers"
import tempLandingPagePicture from "../assets/Landing_page_picture.png"
const Hero: React.FC = () => {
  return (
    <div className="w-full bg-black flex justify-center">
      <FullWidthContainer className="relative">
        <img
          src={tempLandingPagePicture}
          alt=""
        />
        <div className="absolute top-0 left-0 h-full w-1/2 from-black bg-gradient-to-r font-mono flex flex-col justify-end">
          <div className="p-16 text-5xl text-white leading-tight">
            <p className="mb-8">Kiinnostaako tietotekniikan opiskelu?</p>
            <a
              className="inline-block bg-orange px-8 py-4 text-2xl font-sans uppercase tracking-wider"
              href="#"
            >
              Lue lisää
            </a>
          </div>
        </div>
      </FullWidthContainer>
    </div>
  )
}

export default Hero
