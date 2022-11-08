import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/source-code-pro/300.css"
import "@fontsource/source-code-pro/400.css"
import "@fontsource/source-code-pro/700.css"

import Footer from "./Footer"
import Header from "./Header"

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="flex flex-col items-center flex-grow min-h-[100vh] bg-white"
      style={{ alignItems: "stretch" }}
    >
      <Header />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
