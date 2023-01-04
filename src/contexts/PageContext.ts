import { createContext } from "react"
import { Locale } from "../types/strapi"

export type PageInfo = {
  locale: Locale
  path?: string
  localeLink: string
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const PageContext = createContext<PageInfo>(null!)
