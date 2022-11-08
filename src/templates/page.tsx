import { graphql } from "gatsby"
import ContentRenderer from "../components/ContentRenderer"
import Layout from "../components/Layout"
import SideBar from "../components/SideBar"
import { LocaleContext } from "../contexts/PageContext"
import { StrapiPage } from "../types/strapi"

type Props = {
  pageContext: {
    locale: string
  }
  data: {
    strapiPage: StrapiPage
  }
}

const Page: React.FC<Props> = ({
  pageContext: { locale },
  data: { strapiPage },
}) => {
  return (
    <LocaleContext.Provider value={locale}>
      <Layout>
        <SideBar>
          <article>
            <h1>{strapiPage.title}</h1>
            <ContentRenderer contentBlocks={strapiPage.content} />
          </article>
        </SideBar>
      </Layout>
    </LocaleContext.Provider>
  )
}

export const pageQuery = graphql`
  query ($pageId: Int) {
    strapiPage(strapi_id: { eq: $pageId }) {
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
    }
  }
`

export default Page
