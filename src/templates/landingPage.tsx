import { graphql } from "gatsby"
import { useMemo } from "react"
import { FullWidthContainer } from "../components/Containers"
import ContentRenderer from "../components/ContentRenderer"
import EventCards from "../components/events/EventCards"
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import { Locale, StrapiLandingPage } from "../types/strapi"
import { otherLocale, pathWithOtherLocale } from "../paths"
import Meta from "../components/Meta"
import { PageContext, PageInfo } from "../contexts/PageContext"

type Props = {
  pageContext: {
    locale: Locale
  }
  data: {
    strapiLandingPage: StrapiLandingPage
  }
}
const LandingPage: React.FC<Props> = ({
  pageContext: { locale },
  data: {
    strapiLandingPage: {
      headerText,
      headerPhoto,
      buttonText,
      buttonColor,
      content,
    },
  },
}) => {
  const context: PageInfo = useMemo(
    () => ({
      locale,
      localeLink: pathWithOtherLocale("", locale),
    }),
    [locale]
  )
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <Hero
          text={headerText}
          image={headerPhoto.url}
          buttonText={buttonText}
          buttonColor={buttonColor}
          buttonLink="/"
        />
        <main className="flex-grow justify-center flex flex-col md:flex-row gap-3 p-3">
          <ContentRenderer contentBlocks={content} />
          <FullWidthContainer className="p-3">
            <EventCards />
          </FullWidthContainer>
        </main>
      </Layout>
    </PageContext.Provider>
  )
}

export const pageQuery = graphql`
  query ($locale: String) {
    strapiLandingPage(locale: { eq: $locale }) {
      headerText
      headerPhoto {
        url
      }
      buttonText
      buttonColor
      buttonLink {
        id
      }
      content {
        ...CommonContent
      }
    }
  }
`

export const Head: React.FC<Props> = ({ pageContext: { locale } }) => {
  const localeLink = {
    locale: otherLocale(locale),
    href: pathWithOtherLocale("", locale),
  }
  return <Meta title="Tietokilta" titleSuffix={false} localeLink={localeLink} />
}

export default LandingPage
