import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    size: {
      8: string
      16: string
      24: string
      32: string
      40: string
      48: string
      56: string
      64: string
    }
    color: {
      black: string
      white: string
      darkestGray: string
    }
  }
}
