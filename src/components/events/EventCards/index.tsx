import {
  IlmoPaths,
  useEventListState,
} from "@tietokilta/ilmomasiina-components"
import { EventListItem } from "@tietokilta/ilmomasiina-models/dist/services/events/list"
import { StringifyApi } from "@tietokilta/ilmomasiina-models/dist/utils"
import { FC, memo, useContext } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { PageContext } from "../../../contexts/PageContext"
import { H2 } from "../../typography"
import "../config"
import { Loading } from "../Spinner"
import { useEventsPaths } from "../utils"
import EventCard from "./EventCard"

const MAX_EVENTS = 3

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
  events: StringifyApi<EventListItem>[]
  paths: IlmoPaths
}> = memo(({ events, paths }) => {
  const { locale } = useContext(PageContext)
  const currentDayEnd = new Date()
  currentDayEnd.setHours(23, 59, 59, 999)
  const currentEvents = events.filter(
    (event) => event.date && new Date(event.date) < currentDayEnd
  )
  const restofEvents = events
    .filter((event) => event.date && !currentEvents.includes(event))
    .slice(0, MAX_EVENTS)

  const renderEvent = (event: StringifyApi<EventListItem>) =>
    event.date && (
      <EventCard
        key={event.title} // todo replace
        className="mb-3"
        title={event.title}
        location="lorem ipsum"
        date={event.date}
        signUpLink={paths.eventDetails(event.slug)}
      />
    )
  return locale === "fi" ? (
    <>
      <H2>Juuri nyt</H2>
      {currentEvents.map(renderEvent)}
      <H2>Tulevat tapahtumat</H2>
      {restofEvents.map(renderEvent)}
    </>
  ) : (
    <>
      <H2>Right now</H2>
      {currentEvents.map(renderEvent)}
      <H2>Upcoming events</H2>
      {restofEvents.map(renderEvent)}
    </>
  )
})
const EventCards: FC = () => {
  const { locale } = useContext(PageContext)
  const { events, pending, error } = useEventListState({})
  const paths = useEventsPaths()

  if (pending) {
    return locale === "fi" ? (
      <>
        <H2>Tulevat tapahtumat</H2>
        <Loading />
      </>
    ) : (
      <>
        <H2>Upcoming events</H2>
        <Loading />
      </>
    )
  }
  if (error || !events) {
    return <FallbackComponent />
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <EventCardList events={events} paths={paths} />
    </ErrorBoundary>
  )
}
export default EventCards
