/* eslint-disable import/prefer-default-export */
import styled from "styled-components"

export const FullWidthContainer = styled.div`
  max-width: calc(144rem - 2 * ${({ theme }) => theme.size[64]});
  width: 100%;
`
