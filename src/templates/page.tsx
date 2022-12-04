import { graphql } from "gatsby"
import { useMemo } from "react"
import ContentRenderer from "../components/ContentRenderer"
import { H1 } from "../components/typography"
import Layout from "../components/Layout"
import SideBar from "../components/SideBar"
import { PageContext, PageInfo } from "../contexts/PageContext"
import { pathWithOtherLocale } from "../paths"
import { StrapiPage } from "../types/strapi"

type Props = {
  data: {
    strapiPage: StrapiPage
  }
}

const Page: React.FC<Props> = ({ data: { strapiPage } }) => {
  const context: PageInfo = useMemo(
    () => ({
      locale: strapiPage.locale,
      path: strapiPage.fields.path,
      localeLink:
        strapiPage.fields.localeLink ??
        pathWithOtherLocale("", strapiPage.locale),
    }),
    [strapiPage]
  )
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <SideBar>
          <H1>{strapiPage.title}</H1>
          <ContentRenderer contentBlocks={strapiPage.content} />
        </SideBar>
      </Layout>
    </PageContext.Provider>
  )
}

export const pageQuery = graphql`
  query ($pageId: String) {
    strapiPage(id: { eq: $pageId }) {
      title
      locale
      content {
        ...CommonContent
      }
      fields {
        path
        localeLink
      }
    }
  }
`

export default Page
