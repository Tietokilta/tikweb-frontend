/* eslint-disable jsx-a11y/anchor-is-valid */
import { FullWidthContainer } from "./Containers"
import tempLandingPagePicture from "../assets/Landing_page_picture.png"

const Hero: React.FC = () => {
  return (
    <div className="w-full bg-black flex justify-center">
      <FullWidthContainer className="relative h-[calc(100vh-48px-48px)]">
        <div
          style={{ backgroundImage: `url(${tempLandingPagePicture})` }}
          className="w-full h-full bg-cover bg-no-repeat bg-center"
        />
        <div
          className="absolute top-0 left-0 h-full w-1/2 from-black bg-gradient-to-r font-mono flex flex-col justify-end">
          <div className="md:text-5xl sm:text-4xl p-16 text-white leading-tight">
            <p className="mb-8">Kiinnostaako tietotekniikan opiskelu?</p>
            <a 
              className="lg:text-4xl md:text-3xl sm:text-2xl whitespace-nowrap inline-block bg-orange px-8 py-4 font-sans uppercase tracking-wider"
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
