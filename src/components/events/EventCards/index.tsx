import { useEventListState } from "@tietokilta/ilmomasiina-components"
import { Event } from "@tietokilta/ilmomasiina-models"
import { FC, memo, useContext } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { PageContext } from "../../../contexts/PageContext"
import { H2, P } from "../../typography"
import "../config"
import { Loading } from "../Spinner"
import EventCard from "./EventCard"

const MAX_UPCOMING_EVENTS = 3

const FallbackComponent: FC = () => {
  const { locale } = useContext(PageContext)
  return locale === "fi" ? (
    <>
      <H2>Tulevat tapahtumat</H2>
      <p>Virhe ladattaessa tapahtumia</p>
    </>
  ) : (
    <>
      <H2>Upcoming events</H2>
      <p>Error loading events</p>
    </>
  )
}
const EventCardList: FC<{
  events: Event.List
}> = memo(({ events }) => {
  const { locale } = useContext(PageContext)

  const currentDayStart = new Date()
  currentDayStart.setHours(0, 0, 0, 0)
  const currentDayEnd = new Date()
  currentDayEnd.setHours(23, 59, 59, 999)

  const currentEvents = events.filter((event) => {
    // An event is not current if it has no date...
    if (!event.date) return false
    // ...if it starts after today...
    if (new Date(event.date) > currentDayEnd) return false
    // ...if it has ended already...
    if (event.endDate && new Date(event.endDate) < new Date()) return false
    // ...or if it has no end date but started earlier than today
    if (!event.endDate && new Date(event.date) < currentDayStart) return false
    return true
  })
  // An event is upcoming if it starts after today
  const upcomingEvents = events
    .filter((event) => event.date && new Date(event.date) > currentDayEnd)
    .slice(0, MAX_UPCOMING_EVENTS)

  return (
    <>
      {currentEvents.length > 0 && (
        <>
          <H2>{locale === "fi" ? "Juuri nyt!" : "Right now!"}</H2>
          {currentEvents.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              className="mb-3"
              expanded
            />
          ))}
        </>
      )}
      <H2>{locale === "fi" ? "Tulevat tapahtumat" : "Upcoming events"}</H2>
      {upcomingEvents.map((event) => (
        <EventCard key={event.slug} event={event} className="mb-3" />
      ))}
      {!upcomingEvents.length && (
        <P>
          {locale === "fi" ? "Ei tulevia tapahtumia." : "No upcoming events."}
        </P>
      )}
    </>
  )
})
const EventCards: FC = () => {
  const { locale } = useContext(PageContext)
  const { events, pending, error } = useEventListState()

  if (pending) {
    return (
      <>
        <H2>{locale === "fi" ? "Tulevat tapahtumat" : "Upcoming events"}</H2>
        <Loading />
      </>
    )
  }
  if (error || !events) {
    return <FallbackComponent />
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <EventCardList events={events} />
    </ErrorBoundary>
  )
}
export default EventCards
