import { FullWidthContainer } from "./Containers"
import HeroImage from "../assets/hero_image.png"

const Hero: React.FC = () => {
  return (
    <div className="w-full bg-black flex justify-center">
      <FullWidthContainer
        className="relative h-[calc(100vh-48px-48px)] bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}
      >
        <div className="absolute top-0 left-0 h-full w-1/2 from-black bg-gradient-to-r flex flex-col justify-end items-start p-16">
          <p className="md:text-5xl sm:text-4xl text-white font-mono font-bold mb-8">
            Kiinnostaako tietotekniikan opiskelu?
          </p>
          <a
            className="md:text-2xl sm:text-xl whitespace-nowrap inline-block bg-orange px-8 py-4 font-sans text-white uppercase tracking-wider"
            href="/"
          >
            Lue lisää
          </a>
        </div>
      </FullWidthContainer>
    </div>
  )
}

export default Hero
