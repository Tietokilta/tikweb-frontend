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
  strapiParent: Pick<StrapiPage, "id">
}
