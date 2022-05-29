import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/source-code-pro/300.css"
import "@fontsource/source-code-pro/400.css"
import "@fontsource/source-code-pro/700.css"

import Footer from "./Footer"
import Header from "./Header"

const Layout: React.FC = (props) => {
  const { children } = props
  return (
    <div className="flex flex-col items-center flex-grow min-h-full bg-white" style={{alignItems: "stretch"}}>
      <Header />
      <div className="w-full flex-grow">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
