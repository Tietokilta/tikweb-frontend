import styled, { ThemeProvider } from "styled-components"

import GlobalStyle from "../styles/global-style"
import theme from "../styles/theme"
import Header from "./Header"

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
      </LayoutContainer>
    </ThemeProvider>
  )
}

export default Layout
