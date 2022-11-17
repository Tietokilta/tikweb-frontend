import { graphql } from "gatsby"
import { useMemo } from "react"
import ContentRenderer from "../components/ContentRenderer"
import Layout from "../components/Layout"
import SideBar from "../components/SideBar"
import { PageContext, PageInfo } from "../contexts/PageContext"
import { pathWithOtherLocale } from "../paths"
import { Locale, StrapiPage } from "../types/strapi"

type Props = {
  pageContext: {
    locale: Locale
  }
  data: {
    strapiPage: StrapiPage
  }
}

const Page: React.FC<Props> = ({
  pageContext: { locale },
  data: { strapiPage },
}) => {
  const context: PageInfo = useMemo(
    () => ({
      locale,
      path: strapiPage.fields.path,
      localeLink:
        strapiPage.fields.localeLink ?? pathWithOtherLocale("", locale),
    }),
    [locale, strapiPage]
  )
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <SideBar>
          <article>
            <h1>{strapiPage.title}</h1>
            <ContentRenderer contentBlocks={strapiPage.content} />
          </article>
        </SideBar>
      </Layout>
    </PageContext.Provider>
  )
}

export const pageQuery = graphql`
  query ($pageId: String) {
    strapiPage(id: { eq: $pageId }) {
      title
      content {
        ... on STRAPI__COMPONENT_COMMON_CONTENT_TEXT_BLOCK {
          strapi_component
          id
          text {
            data {
              text
            }
          }
        }
      }
      fields {
        path
        localeLink
      }
    }
  }
`

export default Page
