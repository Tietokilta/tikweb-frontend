type TextBlock = {
  id: number
  strapi_component: "common-content.text-block"
  text: string
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
  navigatesTo: NavigatesTo
  parentSlug?: string
  subItems?: NavigationItem[]
}

export type StrapiNavigation = {
  items: NavigationItem[]
}