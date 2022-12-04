import {
  SingleEventProps,
  SingleEventProvider,
  useSingleEventContext,
} from "@tietokilta/ilmomasiina-components"
import { Link } from "gatsby"
import H1 from "../H1"
import EventDescription from "./EventDescription"
import SignupList from "./SignupList"
import Spinner from "./Spinner"
import {
  EventsRouteProps,
  otherLocalePaths,
  RouteWrapper,
  useEventsPaths,
} from "./utils"

const SingleEventView: React.FC = () => {
  const { event, signupsByQuota, pending, error } = useSingleEventContext()
  const paths = useEventsPaths()

  if (error) {
    return (
      <div className="ilmo--loading-container">
        <H1>Hups, jotain meni pieleen</H1>
        <p>
          Tapahtumaa ei löytynyt. Se saattaa olla menneisyydessä tai poistettu.
        </p>
        <Link to={paths.eventsList}>Palaa tapahtumalistaukseen</Link>
      </div>
    )
  }

  if (pending) {
    return <Spinner />
  }

  return (
    <>
      <Link to={paths.eventsList} style={{ margin: 0 }}>
        &#8592; Takaisin
      </Link>
      <div className="md:flex">
        <EventDescription />
        <div className="md:w-1/3">
          {/* <SignupCountdown /> */}
          {/* <QuotaStatus /> */}
          here be dragons
        </div>
      </div>
      {event!.signupsPublic && (
        <>
          <h2>Ilmoittautuneet</h2>
          {signupsByQuota!.map((quota) => (
            <SignupList key={quota.id} quota={quota} />
          ))}
        </>
      )}
    </>
  )
}

const EventDetails: React.FC<EventsRouteProps<SingleEventProps>> = ({
  locale,
  slug,
}) => {
  const localeLink = otherLocalePaths(locale).eventDetails(slug!)
  return (
    <RouteWrapper locale={locale} localeLink={localeLink}>
      <SingleEventProvider slug={slug!}>
        <SingleEventView />
      </SingleEventProvider>
    </RouteWrapper>
  )
}

export default EventDetails
