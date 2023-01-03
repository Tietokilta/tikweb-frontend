import { graphql } from "gatsby"
import { useMemo } from "react"
import { FullWidthContainer } from "../components/Containers"
import EventCard from "../components/EventCard"
import Hero from "../components/Hero"
import ContentRenderer from "../components/ContentRenderer"
import { H2 } from "../components/typography"
import { PageContext, PageInfo } from "../contexts/PageContext"
import Layout from "../components/Layout"
import { Locale, StrapiLandingPage } from "../types/strapi"
import { pathWithOtherLocale } from "../paths"
import Meta from "../components/Meta"
import firstSentenceFromContent from "../utils/firstSentenceFromContent"

const testEvents = [
  {
    title: "Nappusitsit",
    location: "Smökki",
    date: new Date("2022-01-01T10:00:00Z"),
    signUpLink: "https://tietokilta.fi",
  },
  {
    title: "Fappusitsit",
    location: "Smökki",
    date: new Date("2022-01-01T10:00:00Z"),
    signUpLink: "https://tietokilta.fi",
  },
  {
    title: "Sappusitsit",
    location: "Smökki",
    date: new Date("2022-01-01T10:00:00Z"),
    signUpLink: "https://tietokilta.fi",
  },
]

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
          <FullWidthContainer>
            <H2>Juuri Nyt</H2>
            <EventCard
              title="Wappusitsit"
              location="Smökki"
              date={new Date("2022-01-01T10:00:00Z")}
              numberOfAttendees={76}
              maxCapacity={250}
              description="Teekkareiden vuoden tärkein tapahtuma lähenee ja mikä olisi parempi tapa juhlistaa sitä jo ennakkoon kuin Wappusitsit! Tänäkin vuonna paikan päällä raikaa"
              signUpLink="https://tietokilta.fi"
            />
            <H2 className="pt-3">Tulevat tapahtumat</H2>
            {testEvents.map((x) => (
              <EventCard
                key={x.title} // todo replace
                className="mb-3"
                title={x.title}
                location={x.location}
                date={x.date}
                signUpLink={x.signUpLink}
              />
            ))}
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

export const Head: React.FC<Props> = () => {
  return <Meta title="Tietokilta" titleSuffix={false} />
}

export default LandingPage
