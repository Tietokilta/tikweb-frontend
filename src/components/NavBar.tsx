// FIXME: delete this when using real links
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "gatsby"
import styled from "styled-components"

const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;

  font-family: "Source Code Pro";
  font-size: 1.8rem;

  a {
    color: ${({ theme }) => theme.color.white};

    + a {
      margin-left: ${({ theme }) => theme.size[48]};
    }
  }
`

const NavBar: React.FC = () => {
  // TODO: Generate links from actual data and make them functional

  return (
    <NavBarContainer>
      <Link to="#">Tapahtumat</Link>
      <Link to="#">Kilta</Link>
      <Link to="#">Fuksit</Link>
      <Link to="#">Abeille</Link>
      <Link to="#">Yritykset</Link>
    </NavBarContainer>
  )
}

export default NavBar
