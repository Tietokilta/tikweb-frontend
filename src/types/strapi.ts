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
  content: StrapiPageContentBlock[]
  id: number
  slug: string
  title: string
  unlisted: boolean
  strapiChildren: Pick<StrapiPage, "id" | "slug" | "title">[]
  strapi_parent: Pick<StrapiPage, "id">
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
