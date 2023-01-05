import {
  EventListProvider,
  useEventListContext,
} from "@tietokilta/ilmomasiina-components"
import {
  OPENQUOTA,
  WAITLIST,
  eventsToRows,
} from "@tietokilta/ilmomasiina-components/dist/utils/eventListUtils"
import { signupStateText } from "@tietokilta/ilmomasiina-components/dist/utils/signupStateText"
import { timezone } from "../config"
import {
  EventsRouteProps,
  otherLocalePaths,
  RouteWrapper,
  useEventsPaths,
} from "../utils"
import { Loading } from "../Spinner"
import EventsListRow from "./EventsListRow"
import { A, H1, P } from "../../typography"

const EventsListView: React.FC = () => {
  const { events, error, pending } = useEventListContext()
  const paths = useEventsPaths()

  if (pending) {
    return (
      <>
        <H1>Tapahtumat</H1>
        <Loading />
      </>
    )
  }
  if (error || !events) {
    return (
      <>
        <H1>Virhe</H1>
        <P>Tapahtumien lataus epäonnistui</P>
      </>
    )
  }

  const tableRows = eventsToRows(events).map((row, index) => {
    if (row.isEvent) {
      const { slug, title, date, signupState, signupCount, quotaSize } = row
      const stateText = signupStateText(signupState)
      return (
        <EventsListRow
          stateClass={stateText.class}
          title={<A href={paths.eventDetails(slug)}>{title}</A>}
          date={date ? date.tz(timezone).format("DD.MM.YYYY") : ""}
          signupStatus={stateText}
          signupCount={signupCount}
          quotaSize={quotaSize}
          key={slug}
        />
      )
    }
    if (row.title !== WAITLIST) {
      const { title, signupCount, quotaSize } = row
      return (
        <EventsListRow
          isQuota
          title={title === OPENQUOTA ? "Avoin" : title}
          signupCount={signupCount}
          quotaSize={quotaSize}
          // No real alternatives for key :(
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      )
    }
    return null
  })

  return (
    <>
      <H1>Tapahtumat</H1>
      <table className="w-full">
        <thead className="hidden sm:table-header-group">
          <tr className="font-mono">
            <th className="text-left py-3 px-2 border-b border-solid border-gray-lightest">
              Nimi
            </th>
            <th className="text-left py-3 px-2 border-b border-solid border-gray-lightest">
              Ajankohta
            </th>
            <th className="text-left py-3 px-2 border-b border-solid border-gray-lightest">
              Ilmoittautuminen
            </th>
            <th className="text-left py-3 px-2 border-b border-solid border-gray-lightest">
              Ilmoittautuneita
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  )
}

const EventsList: React.FC<EventsRouteProps> = ({ locale }) => {
  const localeLink = otherLocalePaths(locale).eventsList
  return (
    <RouteWrapper locale={locale} localeLink={localeLink}>
      <EventListProvider>
        <EventsListView />
      </EventListProvider>
    </RouteWrapper>
  )
}

export default EventsList
