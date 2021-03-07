import styled from "styled-components"

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.color.darkestGray};
  color: white;
  padding: ${({ theme }) => `${theme.size[32]} ${theme.size[64]}`};
`

const FooterContent = styled.div`
  // Max width is 1440 minus 64px padding on each side.
  max-width: calc(144rem - 2 * ${({ theme }) => theme.size[64]});
  width: 100%;
`

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>Footer</FooterContent>
    </FooterContainer>
  )
}

export default Footer
