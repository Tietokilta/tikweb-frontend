type TextBlock = {
  strapi_component: "common-content.text-block"
  id: number
  text: {
    data: {
      text: string
    }
  }
}

type CommitteeBlock = {
  strapi_component: "common-content.committee"
  id: number
  name: string
  members: CommitteeMember[]
}

export type CommitteeMember = {
  id: number
  name: string
  position: string
  email: string
  phoneNumber: string
  telegramUsername: string
  picture: Picture
}

export type StrapiPageContentBlock = TextBlock | CommitteeBlock

export type StrapiPage = {
  id: number
  title: string
  locale: Locale
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

type Picture = {
  url: string
}

type Partner = {
  logo: Picture
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
