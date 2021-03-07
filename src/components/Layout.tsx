import styled, { ThemeProvider } from "styled-components"

import Footer from "./Footer"
import Header from "./Header"
import GlobalStyle from "../styles/global-style"
import theme from "../styles/theme"

const LayoutContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
`

const PageContent = styled.main`
  flex-grow: 1;
`

const Layout: React.FC = (props) => {
  const { children } = props
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LayoutContainer>
        <Header />
        <PageContent>{children}</PageContent>
        <Footer />
      </LayoutContainer>
    </ThemeProvider>
  )
}

export default Layout
