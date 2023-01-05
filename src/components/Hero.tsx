import parseImageUrl from "../utils/parseImageUrl"
import { FullWidthContainer } from "./Containers"
import Link from "./Link"

type Props = {
  image: string
  text: string
  buttonText: string
  buttonColor: string
  buttonLink: string
}

const Hero: React.FC<Props> = ({
  image,
  text,
  buttonLink,
  buttonColor,
  buttonText,
}) => {
  return (
    <div className="w-full bg-black flex justify-center">
      <FullWidthContainer
        className="relative h-[calc(100vh-48px-48px)] bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${parseImageUrl(image)})`,
        }}
      >
        <div className="absolute inset-0 sm:right-1/3 md:right-1/2 from-black bg-gradient-to-r flex flex-col items-start px-12 sm:px-16">
          <div className="grow-[4]" />
          <p className="text-3xl sm:text-4xl md:text-5xl text-white font-mono font-bold mb-8">
            {text}
          </p>
          <Link
            className="text-lg sm:text-xl md:text-2xl whitespace-nowrap inline-block px-6 py-3 sm:px-8 sm:py-4 font-sans font-bold text-white uppercase tracking-wider rounded-md"
            style={{ backgroundColor: buttonColor }}
            to={buttonLink}
          >
            {buttonText}
          </Link>
          <div className="grow" />
        </div>
      </FullWidthContainer>
    </div>
  )
}

export default Hero
