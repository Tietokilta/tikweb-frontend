import styled from "styled-components"

import logo from "../assets/logo.svg"

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

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;

  // Max width is 1440 minus 64px padding on each side.
  max-width: calc(144rem - 2 * ${({ theme }) => theme.size[64]});
  width: 100%;
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
        <div>Navigation here</div>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
