import { createGlobalStyle, DefaultTheme } from "styled-components"

// Import fonts
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/source-code-pro/300.css"
import "@fontsource/source-code-pro/400.css"
import "@fontsource/source-code-pro/700.css"

import normalize from "./normalize"

export default createGlobalStyle<{ theme: DefaultTheme }>`
  ${normalize}

  html {
    /* By default browser font size is 16px. By using font-size: 62.5% we can
       make the base font size 10px, which works nicely with rem units:
       1rem = 10px
       2.4rem = 24px etc.*/
    font-size: 62.5%;
  }

  * {
    // SEE: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
    // Affects how padding and border behave with width/height. With border-box,
    // padding and border are included in width/height so that width: 200px is
    // still 200px even if the element has padding or border.
    box-sizing: border-box;
  }

  body {
    font-family: "Roboto";
    font-size: ${({ theme }) => theme.size[16]};
    color: ${({ theme }) => theme.color.black};
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
    padding: 0;
    margin-bottom: ${({ theme }) => theme.size[8]};
    font-weight: 700;
  }

  h1 {
    font-size: ${({ theme }) => theme.size[40]};
  }

  h2 {
    font-size: ${({ theme }) => theme.size[32]};
  }

  h3 {
    font-size: ${({ theme }) => theme.size[24]};
  }

  h4 {
    font-size: ${({ theme }) => theme.size[16]};
  }

`
