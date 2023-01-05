import { Event } from "@tietokilta/ilmomasiina-models"
import classNames from "classnames"
import { Link } from "gatsby"
import sumBy from "lodash/sumBy"
import { useContext } from "react"
import { PageContext } from "../../../contexts/PageContext"
import Markdown from "../../Markdown"
import { dateTimeFormat } from "../dateFormat"
import { useEventsPaths } from "../utils"

type Props = {
  event: Event.List.Event
  expanded?: boolean
  className?: string
}

const EventCard: React.FC<Props> = ({ event, expanded, className }: Props) => {
  const { locale } = useContext(PageContext)
  const paths = useEventsPaths()

  const { slug, title, date: dateString, location, description } = event
  if (!dateString) return null

  const date = new Date(dateString)
  const hasSignup = Boolean(event.registrationStartDate)
  const signupCount = sumBy(event.quotas, "signupCount")
  const maxCapacity =
    sumBy(event.quotas, (quota) => quota.size ?? Infinity) + event.openQuotaSize

  return (
    <div
      className={classNames(
        className,
        "text-xl rounded-xl shadow-md bg-gray-darkest text-white p-4"
      )}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-mono text-base font-bold mt-0 mb-1">
            <Link to={paths.eventDetails(slug)}>
              {title}
              {location && ` @ ${location}`}
            </Link>
          </h3>
          <p className="font-mono text-sm font-bold">
            {dateTimeFormat(locale).format(new Date(date))}
          </p>
        </div>
        {expanded && hasSignup && (
          // Signup count pill
          <div className="py-1 px-3 rounded-2xl my-auto bg-white text-black font-mono text-sm font-bold">
            {signupCount}/{maxCapacity !== Infinity ? maxCapacity : "\u221E"}
          </div>
        )}
        {!expanded && (
          // Non-expanded signup/learn more link
          <Link
            to={paths.eventDetails(slug)}
            className="my-auto font-mono text-sm font-bold text-orange"
          >
            {hasSignup ? "Ilmoittaudu" : "Lue lisää"}
          </Link>
        )}
      </div>
      {expanded && (
        // Description and bottom signup/learn more link
        <>
          {description && (
            <div className="relative text-sm font-sans max-h-20 overflow-hidden">
              <Markdown plainText>{description}</Markdown>
              {/* Cancel margin of last paragraph to get consistent space at end */}
              <div className="-mt-2" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-gray-darkest" />
            </div>
          )}
          <Link
            to={paths.eventDetails(slug)}
            className="block mt-3 font-mono text-sm font-bold text-orange"
          >
            {hasSignup ? "Ilmoittaudu" : "Lue lisää"}
          </Link>
        </>
      )}
    </div>
  )
}

export default EventCard
