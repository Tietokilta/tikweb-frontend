import { createContext } from "react"
import { StrapiPage } from "../types/strapi"

export const LocaleContext = createContext<string>("")

export const PageContext = createContext<StrapiPage>(null!)
