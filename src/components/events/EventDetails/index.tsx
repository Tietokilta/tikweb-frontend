import {
  SingleEventProps,
  SingleEventProvider,
  useSingleEventContext,
} from "@tietokilta/ilmomasiina-components"
import {
  SignupState,
  signupState,
} from "@tietokilta/ilmomasiina-components/dist/utils/signupStateText"
import { A, H1, H2, P } from "../../typography"
import EventDescription from "./EventDescription"
import QuotaBars from "./QuotaBars"
import SignupButtons from "./SignupButtons"
import SignupList from "./SignupList"
import Spinner from "../Spinner"
import {
  EventsRouteProps,
  otherLocalePaths,
  RouteWrapper,
  useEventsPaths,
} from "../utils"

const SingleEventView: React.FC = () => {
  const { event, signupsByQuota, pending, error } = useSingleEventContext()
  const paths = useEventsPaths()

  if (pending) {
    return (
      <>
        <A href={paths.eventsList}>&#8592; Takaisin</A>
        <div className="mt-3" />
        <Spinner />
      </>
    )
  }
  if (error || !event) {
    return (
      <>
        <H1>Tapahtumaa ei löytynyt</H1>
        <P>Tapahtuma saattaa olla menneisyydessä tai poistettu.</P>
        <P>
          <A href={paths.eventsList}>Palaa tapahtumalistaukseen</A>
        </P>
      </>
    )
  }

  const { registrationStartDate, registrationEndDate, signupsPublic } = event
  const eventState = signupState(registrationStartDate, registrationEndDate)

  return (
    <>
      <A href={paths.eventsList}>&#8592; Takaisin</A>
      <div className="md:flex gap-4">
        <EventDescription />
        {eventState.state !== SignupState.disabled && (
          <div className="basis-1/3 flex flex-col gap-3 mb-6">
            <SignupButtons />
            <QuotaBars />
          </div>
        )}
      </div>
      {signupsPublic && (
        <>
          <H2>Ilmoittautuneet</H2>
          {signupsByQuota?.map((quota) => (
            <SignupList key={quota.id} quota={quota} />
          ))}
        </>
      )}
    </>
  )
}

const EventDetails: React.FC<EventsRouteProps<SingleEventProps>> = ({
  locale,
  /** Injected from URL by reach-router */
  slug = "",
}) => {
  const localeLink = otherLocalePaths(locale).eventDetails(slug)
  return (
    <RouteWrapper locale={locale} localeLink={localeLink}>
      <SingleEventProvider slug={slug}>
        <SingleEventView />
      </SingleEventProvider>
    </RouteWrapper>
  )
}

export default EventDetails
