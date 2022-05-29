import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/source-code-pro/300.css"
import "@fontsource/source-code-pro/400.css"
import "@fontsource/source-code-pro/700.css"

import Footer from "./Footer"
import Header from "./Header"
import { FullWidthContainer } from "./Containers"

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <div className="flex flex-col items-center min-h-full bg-white">
      <Header />
      <div className="flex-grow">
        <FullWidthContainer>{children}</FullWidthContainer>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
