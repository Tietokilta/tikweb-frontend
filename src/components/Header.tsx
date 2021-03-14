import styled from "styled-components"

import NavBar from "./NavBar"
import logo from "../assets/logo.svg"
import { FullWidthContainer } from "./Containers"

const HeaderContainer = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.size[48]};
  padding: 0 ${({ theme }) => theme.size[64]};

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
`

const HeaderContent = styled(FullWidthContainer)`
  display: flex;
  justify-content: space-between;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.size[24]};

  img {
    height: ${({ theme }) => theme.size[32]};
    width: ${({ theme }) => theme.size[32]};
    margin-right: ${({ theme }) => theme.size[8]};
  }
`

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <TitleContainer>
          <img src={logo} alt="logo" />
          Tietokilta Ry
        </TitleContainer>
        <NavBar />
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
