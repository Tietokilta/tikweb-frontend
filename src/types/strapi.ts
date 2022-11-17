type TextBlock = {
  strapi_component: "common-content.text-block"
  id: number
  text: {
    data: {
      text: string
    }
  }
}

export type StrapiPageContentBlock = TextBlock

export type StrapiPage = {
  id: number
  title: string
  content: StrapiPageContentBlock[]
  fields: {
    // Path is always present if a page ends up rendered
    path: string
    localeLink?: string
  }
}

export type NavigatesTo = {
  title: string
  slug: string
}

export type NavigationItem = {
  title: string
  path: string
  items?: NavigationItem[]
}

export type StrapiNavigation = {
  locale: string
  items: NavigationItem[]
}

type Logo = {
  url: string
}

type Partner = {
  logo: Logo
  name: string
  url: string
}

export type StrapiPartners = {
  title: string
  partner: Partner[]
}

export type Locale = "en" | "fi"

export type StrapiLandingPage = {
  headerText: string
  headerPhoto: {
    url: string
  }
  buttonText: string
  buttonColor: string
  content: StrapiPageContentBlock[]
}
