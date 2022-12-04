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
import { Link } from "gatsby"
import { timezone } from "./config"
import {
  EventsRouteProps,
  otherLocalePaths,
  RouteWrapper,
  useEventsPaths,
} from "./utils"
import Spinner from "./Spinner"
import TableRow from "./TableRow"
import H1 from "../H1"

const EventsListView: React.FC = () => {
  const { events, error, pending } = useEventListContext()
  const paths = useEventsPaths()

  if (error) {
    return (
      <>
        <H1>Hups, jotain meni pieleen</H1>
        <p>Tapahtumien lataus epäonnistui</p>
      </>
    )
  }

  if (pending) {
    return (
      <>
        <H1>Tapahtumat</H1>
        <Spinner />
      </>
    )
  }

  const tableRows = eventsToRows(events!).map((row, index) => {
    if (row.isEvent) {
      const { slug, title, date, signupState, signupCount, quotaSize } = row
      const stateText = signupStateText(signupState)
      return (
        <TableRow
          className={stateText.class}
          title={<Link to={paths.eventDetails(slug)}>{title}</Link>}
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
        <TableRow
          className="ilmo--quota-row"
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
            <th className="text-left p-3">Nimi</th>
            <th className="text-left p-3">Ajankohta</th>
            <th className="text-left p-3">Ilmoittautuminen</th>
            <th className="text-left p-3">Ilmoittautuneita</th>
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
