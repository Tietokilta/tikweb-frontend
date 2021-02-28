import GlobalStyle from "../global-style"

const Layout: React.FC = (props) => {
  const { children } = props
  return (
    <>
      <GlobalStyle />
      <div>{children}</div>
    </>
  )
}

export default Layout
