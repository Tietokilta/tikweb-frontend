import { graphql } from "gatsby"
import { useMemo } from "react"
import ContentRenderer from "../components/ContentRenderer"
import { H1 } from "../components/typography"
import Layout from "../components/Layout"
import Meta from "../components/Meta"
import ContentPageLayout from "../components/ContentPageLayout"
import { PageContext, PageInfo } from "../contexts/PageContext"
import { otherLocale, pathWithOtherLocale } from "../paths"
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
        <ContentPageLayout>
          <H1>{strapiPage.title}</H1>
          <ContentRenderer contentBlocks={strapiPage.content} />
        </ContentPageLayout>
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

export const Head: React.FC<Props> = ({ data: { strapiPage } }) => {
  const localeLink = strapiPage.fields.localeLink
    ? {
        locale: otherLocale(strapiPage.locale),
        href: strapiPage.fields.localeLink,
      }
    : undefined
  return <Meta title={strapiPage.title} localeLink={localeLink} />
}

export default Page
