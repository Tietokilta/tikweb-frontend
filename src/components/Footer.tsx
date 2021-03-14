import styled from "styled-components"

import { FullWidthContainer } from "./Containers"

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;

  background: ${({ theme }) => theme.color.darkestGray};
  color: white;
  padding: ${({ theme }) => `${theme.size[32]} ${theme.size[64]}`};
`

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FullWidthContainer>Footer</FullWidthContainer>
    </FooterContainer>
  )
}

export default Footer
