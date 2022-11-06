import { useStaticQuery, graphql } from "gatsby"
import { FullWidthContainer } from "./Containers"
import EventCard from "./EventCard"
import Hero from "./Hero"
import { TextContainer } from "./TextContainer"
import Title from "./Title"

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

const FrontPage: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiFrontPage {
        heroText
        heroImage {
          url
        }
        heroButtonText
        heroButtonLink
        description {
          data {
            description
          }
        }
        descriptionTitle
      }
    }
  `)

  interface StrappiFrontPageData {
    heroText: string
    heroImage: {
      url: string
    }
    heroButtonText: string
    heroButtonLink: string
    description: {
      data: {
        description: string
      }
    }
    descriptionTitle: string
  }

  const {
    heroText,
    heroButtonText,
    heroImage,
    heroButtonLink,
    description: descriptionData,
    descriptionTitle,
  }: StrappiFrontPageData = data.strapiFrontPage

  const { description } = descriptionData.data

  return (
    <>
      <Hero
        {...{
          heroText,
          heroButtonLink,
          heroImageUrl: heroImage.url,
          heroButtonText,
        }}
      />
      <div className="justify-center flex">
        <TextContainer title={descriptionTitle} content={description} />
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
    </>
  )
}

export default FrontPage
