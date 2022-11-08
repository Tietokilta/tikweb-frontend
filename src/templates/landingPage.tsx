import { useStaticQuery, graphql } from "gatsby"
import { FullWidthContainer } from "../components/Containers"
import EventCard from "../components/EventCard"
import Hero from "../components/Hero"
import ContentRenderer from "../components/ContentRenderer"
import Title from "../components/Title"
import { LocaleContext } from "../contexts/PageContext"
import Layout from "../components/Layout"
import { Locale, StrapiPageContentBlock } from "../types/strapi"

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
    locale: "fi" | "en"
  }
}

const LandingPage: React.FC<Props> = ({ pageContext: { locale } }) => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiLandingPage {
        nodes {
          headerText
          headerPhoto {
            url
          }
          buttonText
          buttonLink {
            id
          }
          content {
            id
            strapi_component
            text {
              data {
                text
              }
            }
          }
          locale
        }
      }
    }
  `)

  interface StrappiFrontPageData {
    headerText: string
    headerPhoto: {
      url: string
    }
    buttonText: string
    content: StrapiPageContentBlock[]
    locale: Locale
  }

  const { headerText, headerPhoto, buttonText, content }: StrappiFrontPageData =
    data.allStrapiLandingPage.nodes.find(
      (node: StrappiFrontPageData) => node.locale === locale
    )

  return (
    <LocaleContext.Provider value={locale}>
      <Layout>
        <Hero
          {...{
            heroText: headerText,
            heroImageUrl: headerPhoto.url,
            heroButtonText: buttonText,
            heroButtonLink: "/",
          }}
        />
        <div className="justify-center flex">
          <ContentRenderer contentBlocks={content} />
          <FullWidthContainer className="p-3">
            <Title>Juuri Nyt</Title>
            <EventCard
              title="Wappusitsit"
              location="Smökki"
              date={new Date("2022-01-01T10:00:00Z")}
              numberOfAttendees={76}
              maxCapacity={250}
              description="Teekkareiden vuoden tärkein tapahtuma lähenee ja mikä olisi parempi tapa juhlistaa sitä jo ennakkoon kuin Wappusitsit! Tänäkin vuonna paikan päällä raikaa"
              signUpLink="https://tietokilta.fi"
            />
            <Title className="pt-3">Tulevat tapahtumat</Title>
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
        </div>
      </Layout>
    </LocaleContext.Provider>
  )
}

export default LandingPage
