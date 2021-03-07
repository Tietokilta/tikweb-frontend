import { ThemeProvider } from "styled-components"

import GlobalStyle from "../styles/global-style"
import theme from "../styles/theme"
import Header from "./Header"

const Layout: React.FC = (props) => {
  const { children } = props
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}

export default Layout
