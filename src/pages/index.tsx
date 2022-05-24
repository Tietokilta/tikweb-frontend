import { FullWidthContainer } from "../components/Containers"
import EventCard from "../components/EventCard"
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import { TextContainer } from "../components/TextContainer"
import Title from "../components/Title"

const testEvents = [
  { title: "Nappusitsit", location: "Smökki", date: new Date(), signUpLink: "https://tietokilta.fi" },
  { title: "Fappusitsit", location: "Smökki", date: new Date(), signUpLink: "https://tietokilta.fi" },
  { title: "Sappusitsit", location: "Smökki", date: new Date(), signUpLink: "https://tietokilta.fi" },
]

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <div className="justify-center flex">
        <TextContainer />
        <FullWidthContainer className="p-3">
          <Title>Juuri Nyt</Title>
          <EventCard
            title={"Wappusitsit"}
            location={"Smökki"}
            date={new Date()}
            numberOfAttendees={76}
            maxCapacity={250}
            description={"Teekkareiden vuoden tärkein tapahtuma lähenee ja mikä olisi parempi tapa juhlistaa sitä jo ennakkoon kuin Wappusitsit! Tänäkin vuonna paikan päällä raikaa"}
            signUpLink={"https://tietokilta.fi"}
          />
          <Title className="pt-3">Tulevat tapahtumat</Title>
          {testEvents.map(x => 
            <EventCard
              className={"mb-3"}
              title={x.title}
              location={x.location}
              date={x.date}
              signUpLink={x.signUpLink}
            />
          )}
        </FullWidthContainer>
      </div>
    </Layout>
  )
}

export default IndexPage
